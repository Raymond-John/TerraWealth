/**
 * TerraWealth Agro - Wallet Module
 * Handles wallet balance, funding, withdrawals, and transaction history
 */

// Initialize wallet data in LocalStorage
function initWallet() {
  if (!localStorage.getItem('terrawealth_transactions')) {
    localStorage.setItem('terrawealth_transactions', JSON.stringify([]));
  }
}

// Get all transactions
function getTransactions() {
  return JSON.parse(localStorage.getItem('terrawealth_transactions') || '[]');
}

// Save transactions
function saveTransactions(transactions) {
  localStorage.setItem('terrawealth_transactions', JSON.stringify(transactions));
}

// Get user transactions
function getUserTransactions(userId) {
  const transactions = getTransactions();
  return transactions.filter(t => t.userId === userId).sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
}

// Add transaction
function addTransaction(userId, type, amount, description, status = 'completed') {
  const transactions = getTransactions();
  
  const newTransaction = {
    id: 'txn_' + Date.now(),
    userId: userId,
    type: type, // 'deposit', 'withdrawal', 'investment', 'return'
    amount: amount,
    description: description,
    status: status,
    date: new Date().toISOString()
  };
  
  transactions.push(newTransaction);
  saveTransactions(transactions);
  
  return newTransaction;
}

// Fund wallet (add money)
function fundWallet(userId, amount) {
  if (amount <= 0) {
    return { success: false, message: 'Amount must be greater than 0.' };
  }
  
  const users = JSON.parse(localStorage.getItem('terrawealth_users') || '[]');
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return { success: false, message: 'User not found.' };
  }
  
  // Update wallet balance
  const newBalance = (users[userIndex].walletBalance || 0) + amount;
  users[userIndex].walletBalance = newBalance;
  localStorage.setItem('terrawealth_users', JSON.stringify(users));
  
  // Add transaction record
  addTransaction(
    userId,
    'deposit',
    amount,
    'Wallet funded via simulated payment'
  );
  
  // Update session
  const currentUser = JSON.parse(localStorage.getItem('terrawealth_current_user') || 'null');
  if (currentUser && currentUser.id === userId) {
    currentUser.walletBalance = newBalance;
    localStorage.setItem('terrawealth_current_user', JSON.stringify(currentUser));
  }
  
  return { 
    success: true, 
    message: `Successfully added $${amount.toLocaleString()} to your wallet.`,
    newBalance: newBalance
  };
}

// Withdraw from wallet
function withdrawFromWallet(userId, amount) {
  if (amount <= 0) {
    return { success: false, message: 'Amount must be greater than 0.' };
  }
  
  const users = JSON.parse(localStorage.getItem('terrawealth_users') || '[]');
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return { success: false, message: 'User not found.' };
  }
  
  const currentBalance = users[userIndex].walletBalance || 0;
  
  if (amount > currentBalance) {
    return { success: false, message: 'Insufficient balance.' };
  }
  
  // Update wallet balance
  const newBalance = currentBalance - amount;
  users[userIndex].walletBalance = newBalance;
  localStorage.setItem('terrawealth_users', JSON.stringify(users));
  
  // Add transaction record
  addTransaction(
    userId,
    'withdrawal',
    -amount,
    'Withdrawal request processed'
  );
  
  // Update session
  const currentUser = JSON.parse(localStorage.getItem('terrawealth_current_user') || 'null');
  if (currentUser && currentUser.id === userId) {
    currentUser.walletBalance = newBalance;
    localStorage.setItem('terrawealth_current_user', JSON.stringify(currentUser));
  }
  
  return { 
    success: true, 
    message: `Successfully withdrew $${amount.toLocaleString()} from your wallet.`,
    newBalance: newBalance
  };
}

// Invest from wallet
function investFromWallet(userId, projectId, amount) {
  if (amount <= 0) {
    return { success: false, message: 'Amount must be greater than 0.' };
  }
  
  const users = JSON.parse(localStorage.getItem('terrawealth_users') || '[]');
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return { success: false, message: 'User not found.' };
  }
  
  const currentBalance = users[userIndex].walletBalance || 0;
  
  if (amount > currentBalance) {
    return { success: false, message: 'Insufficient balance. Please fund your wallet.' };
  }
  
  // Get project info
  const projects = getProjects();
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return { success: false, message: 'Project not found.' };
  }
  
  // Update wallet balance
  const newBalance = currentBalance - amount;
  users[userIndex].walletBalance = newBalance;
  
  // Update total invested
  users[userIndex].totalInvested = (users[userIndex].totalInvested || 0) + amount;
  
  localStorage.setItem('terrawealth_users', JSON.stringify(users));
  
  // Add transaction record
  addTransaction(
    userId,
    'investment',
    -amount,
    `Investment in ${project.name}`
  );
  
  // Create investment record
  createInvestment(userId, projectId, amount);
  
  // Update session
  const currentUser = JSON.parse(localStorage.getItem('terrawealth_current_user') || 'null');
  if (currentUser && currentUser.id === userId) {
    currentUser.walletBalance = newBalance;
    currentUser.totalInvested = users[userIndex].totalInvested;
    localStorage.setItem('terrawealth_current_user', JSON.stringify(currentUser));
  }
  
  return { 
    success: true, 
    message: `Successfully invested $${amount.toLocaleString()} in ${project.name}.`,
    newBalance: newBalance
  };
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Initialize wallet on load
document.addEventListener('DOMContentLoaded', initWallet);
