/**
 * TerraWealth Agro - Investment Module
 * Handles user investments and portfolio tracking
 */

// Initialize investments in LocalStorage
function initInvestments() {
  if (!localStorage.getItem('terrawealth_investments')) {
    localStorage.setItem('terrawealth_investments', JSON.stringify([]));
  }
}

// Get all investments
function getInvestments() {
  return JSON.parse(localStorage.getItem('terrawealth_investments') || '[]');
}

// Save investments
function saveInvestments(investments) {
  localStorage.setItem('terrawealth_investments', JSON.stringify(investments));
}

// Get user investments
function getUserInvestments(userId) {
  const investments = getInvestments();
  return investments.filter(inv => inv.userId === userId).sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
}

// Get active user investments
function getActiveUserInvestments(userId) {
  const investments = getUserInvestments(userId);
  return investments.filter(inv => inv.status === 'active');
}

// Create new investment
function createInvestment(userId, projectId, amount) {
  const projects = getProjects();
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return { success: false, message: 'Project not found.' };
  }
  
  const investments = getInvestments();
  
  // Calculate estimated returns (using average of min and max)
  const avgReturn = (project.returnRange.min + project.returnRange.max) / 2;
  const estimatedReturn = amount * (avgReturn / 100);
  
  const newInvestment = {
    id: 'inv_' + Date.now(),
    userId: userId,
    projectId: projectId,
    projectName: project.name,
    projectType: project.type,
    amount: amount,
    estimatedReturn: estimatedReturn,
    returnRate: avgReturn,
    status: 'active',
    date: new Date().toISOString(),
    maturityDate: calculateMaturityDate(project.duration),
    progress: 0,
    returnsPaid: 0
  };
  
  investments.push(newInvestment);
  saveInvestments(investments);
  
  // Update project funding
  updateProjectFunding(projectId, amount);
  
  return { 
    success: true, 
    message: 'Investment created successfully!',
    investment: newInvestment
  };
}

// Calculate maturity date based on duration string
function calculateMaturityDate(duration) {
  const now = new Date();
  const match = duration.match(/(\d+)\s*months?/i);
  
  if (match) {
    const months = parseInt(match[1]);
    now.setMonth(now.getMonth() + months);
  } else {
    // Default to 12 months
    now.setFullYear(now.getFullYear() + 1);
  }
  
  return now.toISOString();
}

// Calculate investment progress
function calculateInvestmentProgress(investment) {
  const startDate = new Date(investment.date);
  const maturityDate = new Date(investment.maturityDate);
  const now = new Date();
  
  const totalDuration = maturityDate - startDate;
  const elapsed = now - startDate;
  
  let progress = Math.round((elapsed / totalDuration) * 100);
  progress = Math.min(progress, 100);
  progress = Math.max(progress, 0);
  
  return progress;
}

// Update all investment progress
function updateInvestmentsProgress() {
  const investments = getInvestments();
  let updated = false;
  
  investments.forEach(inv => {
    if (inv.status === 'active') {
      const newProgress = calculateInvestmentProgress(inv);
      if (newProgress !== inv.progress) {
        inv.progress = newProgress;
        updated = true;
        
        // If investment matures, mark as completed
        if (newProgress >= 100) {
          inv.status = 'completed';
        }
      }
    }
  });
  
  if (updated) {
    saveInvestments(investments);
  }
  
  return investments;
}

// Get portfolio summary for user
function getPortfolioSummary(userId) {
  const investments = getUserInvestments(userId);
  const activeInvestments = investments.filter(inv => inv.status === 'active');
  const completedInvestments = investments.filter(inv => inv.status === 'completed');
  
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const activeInvested = activeInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturns = investments.reduce((sum, inv) => sum + (inv.returnsPaid || 0), 0);
  const estimatedReturns = activeInvestments.reduce((sum, inv) => sum + (inv.estimatedReturn || 0), 0);
  
  // Calculate weighted average return rate
  const avgReturnRate = activeInvestments.length > 0
    ? activeInvestments.reduce((sum, inv) => sum + inv.returnRate, 0) / activeInvestments.length
    : 0;
  
  return {
    totalInvested,
    activeInvested,
    totalReturns,
    estimatedReturns,
    avgReturnRate: avgReturnRate.toFixed(1),
    activeCount: activeInvestments.length,
    completedCount: completedInvestments.length,
    totalCount: investments.length
  };
}

// Get portfolio growth data for chart
function getPortfolioGrowthData(userId, months = 6) {
  const investments = getUserInvestments(userId);
  const data = [];
  const labels = [];
  
  const now = new Date();
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = date.toLocaleString('default', { month: 'short' });
    labels.push(monthName);
    
    // Calculate total invested up to this month
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const totalAtMonth = investments
      .filter(inv => new Date(inv.date) <= monthEnd)
      .reduce((sum, inv) => sum + inv.amount, 0);
    
    data.push(totalAtMonth);
  }
  
  return { labels, data };
}

// Get returns projection data for chart
function getReturnsProjectionData(userId) {
  const investments = getUserInvestments(userId);
  const activeInvestments = investments.filter(inv => inv.status === 'active');
  
  const labels = [];
  const data = [];
  
  // Project returns for next 6 months
  const now = new Date();
  let cumulativeReturns = investments.reduce((sum, inv) => sum + (inv.returnsPaid || 0), 0);
  
  for (let i = 0; i < 6; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const monthName = date.toLocaleString('default', { month: 'short' });
    labels.push(monthName);
    
    // Calculate monthly returns from active investments
    const monthlyReturns = activeInvestments.reduce((sum, inv) => {
      const monthlyReturn = (inv.estimatedReturn || 0) / getDurationInMonths(inv.date, inv.maturityDate);
      return sum + monthlyReturn;
    }, 0);
    
    cumulativeReturns += monthlyReturns;
    data.push(Math.round(cumulativeReturns));
  }
  
  return { labels, data };
}

// Helper function to get duration in months
function getDurationInMonths(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
}

// Get asset allocation data for chart
function getAssetAllocationData(userId) {
  const investments = getUserInvestments(userId);
  const activeInvestments = investments.filter(inv => inv.status === 'active');
  
  const agriculture = activeInvestments
    .filter(inv => inv.projectType === 'agriculture')
    .reduce((sum, inv) => sum + inv.amount, 0);
  
  const realEstate = activeInvestments
    .filter(inv => inv.projectType === 'real-estate')
    .reduce((sum, inv) => sum + inv.amount, 0);
  
  return {
    labels: ['Agriculture', 'Real Estate'],
    data: [agriculture, realEstate]
  };
}

// Simulate returns payment (for demo purposes)
function simulateReturnsPayment() {
  const investments = getInvestments();
  let updated = false;
  
  investments.forEach(inv => {
    if (inv.status === 'active' && Math.random() > 0.7) {
      // Simulate a small return payment
      const monthlyReturn = (inv.estimatedReturn || 0) / 12;
      inv.returnsPaid = (inv.returnsPaid || 0) + monthlyReturn;
      updated = true;
      
      // Add transaction record
      addTransaction(
        inv.userId,
        'return',
        monthlyReturn,
        `Returns from ${inv.projectName}`
      );
    }
  });
  
  if (updated) {
    saveInvestments(investments);
  }
}

// Initialize investments on load
document.addEventListener('DOMContentLoaded', initInvestments);
