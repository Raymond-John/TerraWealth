/**
 * TerraWealth Agro - Main Module
 * Shared utilities, toast notifications, and UI helpers
 */

// Toast notification system
const Toast = {
  container: null,
  
  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },
  
  show(message, type = 'info', title = '', duration = 5000) {
    this.init();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    
    const titles = {
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Information'
    };
    
    toast.innerHTML = `
      <span class="toast-icon">${icons[type]}</span>
      <div class="toast-content">
        <div class="toast-title">${title || titles[type]}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="Toast.dismiss(this.parentElement)">×</button>
    `;
    
    this.container.appendChild(toast);
    
    // Auto dismiss
    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(toast);
      }, duration);
    }
    
    return toast;
  },
  
  success(message, title = '') {
    return this.show(message, 'success', title);
  },
  
  error(message, title = '') {
    return this.show(message, 'error', title);
  },
  
  warning(message, title = '') {
    return this.show(message, 'warning', title);
  },
  
  info(message, title = '') {
    return this.show(message, 'info', title);
  },
  
  dismiss(toast) {
    if (toast && toast.parentElement) {
      toast.classList.add('hiding');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }
  }
};

// Modal system
const Modal = {
  overlay: null,
  modal: null,
  
  init() {
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.className = 'modal-overlay';
      this.overlay.innerHTML = `
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title"></h3>
            <button class="modal-close" onclick="Modal.close()">×</button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer"></div>
        </div>
      `;
      document.body.appendChild(this.overlay);
      
      this.modal = this.overlay.querySelector('.modal');
      
      // Close on overlay click
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.close();
        }
      });
    }
  },
  
  open(title, content, footer = '') {
    this.init();
    
    this.modal.querySelector('.modal-title').textContent = title;
    this.modal.querySelector('.modal-body').innerHTML = content;
    this.modal.querySelector('.modal-footer').innerHTML = footer;
    
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  },
  
  close() {
    if (this.overlay) {
      this.overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
};

// Form validation helpers
const Validation = {
  email(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  phone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone.replace(/\s/g, ''));
  },
  
  password(password) {
    return password.length >= 6;
  },
  
  required(value) {
    return value.trim().length > 0;
  },
  
  minLength(value, length) {
    return value.trim().length >= length;
  },
  
  number(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },
  
  min(value, min) {
    return parseFloat(value) >= min;
  }
};

// Format helpers
const Format = {
  currency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  },
  
  number(num) {
    return new Intl.NumberFormat('en-US').format(num);
  },
  
  percent(value, decimals = 1) {
    return value.toFixed(decimals) + '%';
  },
  
  date(dateString, options = {}) {
    const date = new Date(dateString);
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(date);
  },
  
  dateTime(dateString) {
    return this.date(dateString, {
      hour: '2-digit',
      minute: '2-digit'
    });
  },
  
  relativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return this.date(dateString);
  }
};

// Mobile menu toggle
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Animate elements on scroll
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animation = entry.target.dataset.animate;
        entry.target.classList.add(animation);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => observer.observe(el));
}

// Counter animation
function animateCounter(element, target, duration = 2000, prefix = '', suffix = '') {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = prefix + Format.number(Math.floor(current)) + suffix;
  }, 16);
}

// Initialize counters
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.counter);
        const prefix = entry.target.dataset.prefix || '';
        const suffix = entry.target.dataset.suffix || '';
        animateCounter(entry.target, target, 2000, prefix, suffix);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// Update navigation based on auth state
function updateNavigation() {
  const currentUser = getCurrentUser();
  const authLinks = document.querySelectorAll('.auth-link');
  const dashboardLinks = document.querySelectorAll('.dashboard-link');
  
  authLinks.forEach(link => {
    link.style.display = currentUser ? 'none' : 'inline-flex';
  });
  
  dashboardLinks.forEach(link => {
    link.style.display = currentUser ? 'inline-flex' : 'none';
  });
}

// Initialize sidebar toggle for dashboard
function initSidebarToggle() {
  const toggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
        sidebar.classList.remove('active');
      }
    });
  }
}

// Initialize all common functionality
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initNavbarScroll();
  initSmoothScroll();
  initScrollAnimations();
  initCounters();
  updateNavigation();
  initSidebarToggle();
});
