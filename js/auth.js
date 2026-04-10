/**
 * TerraWealth Agro - Authentication Module
 * Handles user registration, login, logout, and session management
 */

// Initialize users in LocalStorage if not exists
function initAuth() {
  if (!localStorage.getItem('terrawealth_users')) {
    localStorage.setItem('terrawealth_users', JSON.stringify([]));
  }
}

// Get all users
function getUsers() {
  return JSON.parse(localStorage.getItem('terrawealth_users') || '[]');
}

// Save users
function saveUsers(users) {
  localStorage.setItem('terrawealth_users', JSON.stringify(users));
}

// Get current user session
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('terrawealth_current_user') || 'null');
}

// Set current user session
function setCurrentUser(user) {
  if (user) {
    localStorage.setItem('terrawealth_current_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('terrawealth_current_user');
  }
}

// Register new user
function registerUser(name, email, phone, password) {
  const users = getUsers();
  
  // Check if email already exists
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, message: 'Email already registered. Please login.' };
  }
  
  // Create new user
  const newUser = {
    id: 'user_' + Date.now(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    phone: phone.trim(),
    password: password, // In real app, this would be hashed
    walletBalance: 0,
    totalInvested: 0,
    createdAt: new Date().toISOString(),
    avatar: null
  };
  
  users.push(newUser);
  saveUsers(users);
  
  // Set as current user (auto login)
  const sessionUser = { ...newUser };
  delete sessionUser.password;
  setCurrentUser(sessionUser);
  
  return { success: true, message: 'Account created successfully!', user: sessionUser };
}

// Login user
function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    return { success: false, message: 'Email not found. Please register.' };
  }
  
  if (user.password !== password) {
    return { success: false, message: 'Incorrect password. Please try again.' };
  }
  
  // Create session (without password)
  const sessionUser = { ...user };
  delete sessionUser.password;
  setCurrentUser(sessionUser);
  
  return { success: true, message: 'Login successful!', user: sessionUser };
}

// Logout user
function logoutUser() {
  setCurrentUser(null);
  return { success: true, message: 'Logged out successfully!' };
}

// Update user profile
function updateUserProfile(updates) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, message: 'Not logged in.' };
  }
  
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  
  if (userIndex === -1) {
    return { success: false, message: 'User not found.' };
  }
  
  // Update user data
  const updatedUser = { ...users[userIndex], ...updates };
  users[userIndex] = updatedUser;
  saveUsers(users);
  
  // Update session
  const sessionUser = { ...updatedUser };
  delete sessionUser.password;
  setCurrentUser(sessionUser);
  
  return { success: true, message: 'Profile updated successfully!', user: sessionUser };
}

// Update user wallet balance
function updateUserWallet(userId, newBalance) {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex].walletBalance = newBalance;
    saveUsers(users);
    
    // Update session if current user
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      currentUser.walletBalance = newBalance;
      setCurrentUser(currentUser);
    }
  }
}

// Update user total invested
function updateUserInvestment(userId, amount) {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex].totalInvested = (users[userIndex].totalInvested || 0) + amount;
    saveUsers(users);
    
    // Update session if current user
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      currentUser.totalInvested = users[userIndex].totalInvested;
      setCurrentUser(currentUser);
    }
  }
}

// Check if user is logged in (for protected pages)
function requireAuth() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    // Redirect to login page
    window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
    return false;
  }
  return currentUser;
}

// Initialize auth on load
document.addEventListener('DOMContentLoaded', initAuth);
