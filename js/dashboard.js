/**
 * TerraWealth Agro - Dashboard Module
 * Handles dashboard UI rendering and interactions
 */

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on the dashboard page
  if (!document.querySelector('.dashboard')) return;
  
  // Require authentication
  const currentUser = requireAuth();
  if (!currentUser) return;
  
  // Update investments progress
  updateInvestmentsProgress();
  
  // Render dashboard
  renderDashboard(currentUser);
  
  // Initialize charts
  initDashboardCharts(currentUser.id);
});

// Render dashboard content
function renderDashboard(user) {
  // Update user info
  const userNameElements = document.querySelectorAll('.user-name');
  const userAvatarElements = document.querySelectorAll('.user-avatar');
  
  userNameElements.forEach(el => {
    el.textContent = user.name;
  });
  
  userAvatarElements.forEach(el => {
    el.textContent = user.name.charAt(0).toUpperCase();
  });
  
  // Update welcome message
  const welcomeName = document.getElementById('welcome-name');
  if (welcomeName) {
    welcomeName.textContent = user.name.split(' ')[0];
  }
  
  // Get portfolio summary
  const portfolio = getPortfolioSummary(user.id);
  
  // Update stats cards
  updateStatCard('wallet-balance', user.walletBalance || 0);
  updateStatCard('total-invested', portfolio.totalInvested);
  updateStatCard('estimated-returns', portfolio.estimatedReturns);
  updateStatCard('active-investments', portfolio.activeCount, '', '');
  
  // Render active investments
  renderActiveInvestments(user.id);
  
  // Render recent transactions
  renderRecentTransactions(user.id);
}

// Update stat card value
function updateStatCard(id, value, prefix = '', suffix = '') {
  const element = document.getElementById(id);
  if (element) {
    if (typeof value === 'number' && prefix !== undefined) {
      element.textContent = prefix + Format.currency(value);
    } else {
      element.textContent = prefix + value + suffix;
    }
  }
}

// Render active investments
function renderActiveInvestments(userId) {
  const container = document.getElementById('active-investments-list');
  if (!container) return;
  
  const investments = getActiveUserInvestments(userId);
  
  if (investments.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📊</div>
        <h3 class="empty-title">No Active Investments</h3>
        <p class="empty-text">Start building your portfolio by exploring our investment opportunities.</p>
        <a href="invest.html" class="btn btn-primary">Explore Projects</a>
      </div>
    `;
    return;
  }
  
  container.innerHTML = investments.slice(0, 3).map(inv => `
    <div class="investment-card">
      <div class="investment-header">
        <span class="investment-type">${inv.projectType === 'agriculture' ? '🌱 Agriculture' : '🏘️ Real Estate'}</span>
        <span class="investment-status active">Active</span>
      </div>
      <div class="investment-body">
        <h4 class="investment-title">${inv.projectName}</h4>
        <div class="investment-meta">
          <div class="investment-meta-item">
            <span class="investment-meta-label">Invested</span>
            <span class="investment-meta-value">${Format.currency(inv.amount)}</span>
          </div>
          <div class="investment-meta-item">
            <span class="investment-meta-label">Est. Return</span>
            <span class="investment-meta-value" style="color: var(--success);">${Format.currency(inv.estimatedReturn)}</span>
          </div>
          <div class="investment-meta-item">
            <span class="investment-meta-label">Return Rate</span>
            <span class="investment-meta-value">${inv.returnRate.toFixed(1)}%</span>
          </div>
        </div>
        <div class="investment-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${inv.progress}%"></div>
          </div>
          <div class="progress-text">
            <span>Progress</span>
            <span>${inv.progress}%</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Render recent transactions
function renderRecentTransactions(userId) {
  const container = document.getElementById('recent-transactions-list');
  if (!container) return;
  
  const transactions = getUserTransactions(userId).slice(0, 5);
  
  if (transactions.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 2rem;">
        <div class="empty-icon">💳</div>
        <h3 class="empty-title">No Transactions Yet</h3>
        <p class="empty-text">Your transaction history will appear here.</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = transactions.map(txn => {
    const icons = {
      deposit: '💰',
      withdrawal: '💸',
      investment: '📈',
      return: '💵'
    };
    
    const isPositive = txn.amount > 0;
    
    return `
      <div class="transaction-item">
        <div class="transaction-info">
          <div class="transaction-icon ${txn.type}">${icons[txn.type]}</div>
          <div class="transaction-details">
            <h4>${txn.description}</h4>
            <p>${Format.dateTime(txn.date)}</p>
          </div>
        </div>
        <span class="transaction-amount ${isPositive ? 'positive' : 'negative'}">
          ${isPositive ? '+' : ''}${Format.currency(txn.amount)}
        </span>
      </div>
    `;
  }).join('');
}

// Initialize dashboard charts
function initDashboardCharts(userId) {
  // Portfolio Growth Chart
  const growthCtx = document.getElementById('portfolio-growth-chart');
  if (growthCtx) {
    const growthData = getPortfolioGrowthData(userId, 6);
    
    new Chart(growthCtx, {
      type: 'line',
      data: {
        labels: growthData.labels,
        datasets: [{
          label: 'Portfolio Value',
          data: growthData.data,
          borderColor: '#0B5D3B',
          backgroundColor: 'rgba(11, 93, 59, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#C9A646',
          pointBorderColor: '#0B5D3B',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return 'Value: ' + Format.currency(context.raw);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + (value / 1000) + 'k';
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
  
  // Asset Allocation Chart
  const allocationCtx = document.getElementById('asset-allocation-chart');
  if (allocationCtx) {
    const allocationData = getAssetAllocationData(userId);
    const hasData = allocationData.data.some(val => val > 0);
    
    if (hasData) {
      new Chart(allocationCtx, {
        type: 'doughnut',
        data: {
          labels: allocationData.labels,
          datasets: [{
            data: allocationData.data,
            backgroundColor: ['#0B5D3B', '#C9A646'],
            borderColor: '#FFFFFF',
            borderWidth: 3,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                usePointStyle: true,
                pointStyle: 'circle'
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((context.raw / total) * 100).toFixed(1);
                  return context.label + ': ' + Format.currency(context.raw) + ' (' + percentage + '%)';
                }
              }
            }
          },
          cutout: '65%'
        }
      });
    } else {
      // Show empty state
      allocationCtx.parentElement.innerHTML = `
        <div class="empty-state" style="padding: 2rem;">
          <div class="empty-icon">📊</div>
          <h3 class="empty-title">No Allocation Data</h3>
          <p class="empty-text">Invest in projects to see your asset allocation.</p>
        </div>
      `;
    }
  }
  
  // Returns Projection Chart
  const returnsCtx = document.getElementById('returns-projection-chart');
  if (returnsCtx) {
    const returnsData = getReturnsProjectionData(userId);
    
    new Chart(returnsCtx, {
      type: 'bar',
      data: {
        labels: returnsData.labels,
        datasets: [{
          label: 'Projected Returns',
          data: returnsData.data,
          backgroundColor: 'rgba(201, 166, 70, 0.8)',
          borderColor: '#C9A646',
          borderWidth: 2,
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return 'Returns: ' + Format.currency(context.raw);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + (value / 1000) + 'k';
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
}

// Handle logout
function handleLogout() {
  logoutUser();
  Toast.success('You have been logged out successfully.');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
}
