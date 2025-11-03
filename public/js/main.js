document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out',
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navbarMenu = document.querySelector('.navbar__menu');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.navbar__links').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navbarMenu.classList.remove('active');
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Enhanced contact form handling
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const button = form.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      
      // Add loading animation
      button.textContent = 'Sending...';
      button.disabled = true;
      button.style.opacity = '0.7';

      try {
        const response = await fetch('/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
          })
        });

        const result = await response.json();

        if (result.success) {
          // Success animation
          button.textContent = '✓ Message Sent!';
          button.style.background = '#10b981';
          form.reset();
          
          // Show success message
          showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
          
          setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.opacity = '1';
            button.disabled = false;
          }, 3000);
        } else {
          throw new Error(result.message || 'Failed to send message');
        }
      } catch (error) {
        console.error('Error:', error);
        button.textContent = '✗ Send Failed';
        button.style.background = '#ef4444';
        
        // Show error message
        showNotification('Message received! I\'ll respond via email soon.', 'info');
        
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = '';
          button.style.opacity = '1';
          button.disabled = false;
        }, 3000);
      }
    });
  }

  // Notification function
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">
          ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
        </span>
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.remove();
    });
    
    // Animate in
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
  }

  // Navbar background on scroll with smooth transition
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Hide navbar on scroll down, show on scroll up
    if (currentScroll > lastScrollTop && currentScroll > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll;
  });

  // Add loading animation to page
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // Interactive Education Tabs
  const educationTabs = document.querySelectorAll('.education__tab');
  const courseContents = document.querySelectorAll('.course__category-content');

  educationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;
      
      // Remove active class from all tabs and contents
      educationTabs.forEach(t => t.classList.remove('active'));
      courseContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      tab.classList.add('active');
      document.getElementById(`category-${category}`).classList.add('active');
      
      // Add subtle animation
      const activeContent = document.getElementById(`category-${category}`);
      activeContent.style.animation = 'none';
      activeContent.offsetHeight; // Trigger reflow
      activeContent.style.animation = 'fadeInUp 0.6s ease-out';
    });

    // Add hover effects for Lottie animations
    tab.addEventListener('mouseenter', () => {
      const lottiePlayer = tab.querySelector('lottie-player');
      if (lottiePlayer) {
        lottiePlayer.setSpeed(1.5);
      }
    });

    tab.addEventListener('mouseleave', () => {
      const lottiePlayer = tab.querySelector('lottie-player');
      if (lottiePlayer) {
        lottiePlayer.setSpeed(1);
      }
    });
  });

  // Interactive course cards
  const courseCards = document.querySelectorAll('.interactive-course');
  courseCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Add particle effect
      createParticles(card);
    });
  });

  // Particle effect function
  function createParticles(element) {
    const particles = document.createElement('div');
    particles.className = 'particles';
    particles.innerHTML = '✨';
    particles.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 1.2rem;
      animation: float 2s ease-out forwards;
      pointer-events: none;
      z-index: 10;
    `;
    
    element.appendChild(particles);
    
    setTimeout(() => {
      particles.remove();
    }, 2000);
  }

  // Initialize Three.js animations when sections come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const threeJSObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        
        switch(sectionId) {
          case 'courses':
            window.threeJSAnimations.initEducationAnimation('education-animation');
            break;
          case 'projects':
            window.threeJSAnimations.initProjectsAnimation('projects-animation');
            break;
          case 'experience':
            window.threeJSAnimations.initExperienceAnimation('experience-animation');
            break;
        }
      }
    });
  }, observerOptions);

  // Observe sections
  ['courses', 'projects', 'experience'].forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      threeJSObserver.observe(section);
    }
  });

  // Handle window resize for Three.js
  window.addEventListener('resize', () => {
    ['education-animation', 'projects-animation', 'experience-animation'].forEach(id => {
      window.threeJSAnimations.handleResize(id);
    });
  });

  // Add mouse tracking for enhanced effects
  document.querySelectorAll('.project__card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });

  // Theme Toggle Functionality
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeOptions = document.querySelectorAll('.theme-option');
  const themeIndicator = document.querySelector('.theme-toggle__indicator');

  // Get saved theme or default to light
  let currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply saved theme on load
  applyTheme(currentTheme);

  // Toggle theme panel
  themeToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    themeToggle.classList.toggle('open');
  });

  // Close theme panel when clicking outside
  document.addEventListener('click', (e) => {
    if (!themeToggle.contains(e.target)) {
      themeToggle.classList.remove('open');
    }
  });

  // Handle theme selection
  themeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const selectedTheme = option.dataset.theme;
      applyTheme(selectedTheme);
      themeToggle.classList.remove('open');
    });
  });

  function applyTheme(theme) {
    currentTheme = theme;
    
    // Update document theme
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update active button
    themeOptions.forEach(option => {
      option.classList.remove('active');
      if (option.dataset.theme === theme) {
        option.classList.add('active');
      }
    });

    // Update indicator position
    themeIndicator.className = 'theme-toggle__indicator';
    if (theme === 'dark') {
      themeIndicator.classList.add('dark');
    } else if (theme === 'surprise') {
      themeIndicator.classList.add('surprise');
    }

    // Apply theme-specific animations
    applyThemeAnimations(theme);
    
    // Save theme
    localStorage.setItem('theme', theme);
    
    // Update Three.js scenes for theme
    updateThreeJSForTheme(theme);
  }

  function applyThemeAnimations(theme) {
    const body = document.body;
    
    // Add theme-specific classes
    body.classList.remove('light-theme', 'dark-theme', 'surprise-theme');
    body.classList.add(`${theme}-theme`);

    // Surprise theme special effects
    if (theme === 'surprise') {
      startSurpriseEffects();
    } else {
      stopSurpriseEffects();
    }
  }

  function startSurpriseEffects() {
    // Add rainbow border animation
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.borderBottom = '2px solid';
      navbar.style.borderImage = 'linear-gradient(45deg, #e74c3c, #f39c12, #f1c40f, #27ae60, #3498db, #9b59b6, #e74c3c) 1';
      navbar.style.animation = 'rainbowBorder 3s linear infinite';
    }

    // Add floating particles
    createFloatingParticles();
    
    // Add subtle screen glow
    document.body.style.boxShadow = 'inset 0 0 100px rgba(231, 76, 60, 0.1)';
  }

  function stopSurpriseEffects() {
    // Remove effects
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.borderImage = 'none';
      navbar.style.animation = 'none';
      navbar.style.borderBottom = 'none';
    }
    
    // Remove particles
    document.querySelectorAll('.floating-particle').forEach(particle => {
      particle.remove();
    });
    
    // Remove screen glow
    document.body.style.boxShadow = 'none';
  }

  function createFloatingParticles() {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.innerHTML = ['✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 4)];
        
        particle.style.cssText = `
          position: fixed;
          font-size: ${Math.random() * 20 + 10}px;
          left: ${Math.random() * 100}vw;
          top: 100vh;
          pointer-events: none;
          z-index: 999;
          animation: floatUp ${Math.random() * 10 + 15}s linear infinite;
          opacity: ${Math.random() * 0.7 + 0.3};
        `;
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
          particle.remove();
        }, 25000);
      }, Math.random() * 2000);
    }
  }

  function updateThreeJSForTheme(theme) {
    // Update Three.js colors based on theme
    if (window.threeJSAnimations) {
      const colors = {
        light: { primary: 0x6366f1, secondary: 0x8b5cf6 },
        dark: { primary: 0x8b5cf6, secondary: 0xec4899 },
        surprise: { primary: 0xe74c3c, secondary: 0xf39c12 }
      };
      
      // This would update your Three.js materials
      // Implementation depends on your Three.js setup
    }
  }

  // Update courses data with correct electrical engineering symbols
  const coursesData = [
    {
      code: "ECE 20001",
      name: "Electrical Engineering Fundamentals I",
      description: "Basic circuit analysis, Ohm's law, Kirchhoff's laws, and DC circuits",
      grade: "A+",
      icon: "⚡", // Fixed electrical symbol
      color: "#f39c12"
    },
    {
      code: "ECE 20002", 
      name: "Electrical Engineering Fundamentals II",
      description: "AC circuits, phasors, frequency response, and operational amplifiers",
      grade: "Currently Enrolled in",
      icon: "🔌", // Fixed electrical symbol
      color: "#e74c3c"
    },
    {
      code: "ECE 36800",
      name: "Data Structures",
      description: "Algorithm analysis, arrays, linked lists, stacks, queues, trees, and graphs",
      grade: "A+", 
      icon: "🌳",
      color: "#27ae60"
    },
    {
      code: "ENGR 13100",
      name: "Transforming Ideas to Innovation I", 
      description: "Engineering design process, teamwork, and project management fundamentals",
      grade: "A+",
      icon: "⚙️", // Fixed engineering symbol
      color: "#9b59b6"
    },
    {
      code: "ENGR 13200",
      name: "Transforming Ideas to Innovation II",
      description: "Advanced design methodologies, prototyping, and engineering solutions",
      grade: "A",
      icon: "🔧", // Fixed engineering symbol
      color: "#e67e22"
    },
    {
      code: "MA 26100", 
      name: "Multivariate Calculus",
      description: "Vector calculus, partial derivatives, multiple integrals, and vector fields",
      grade: "B",
      icon: "∇",
      color: "#1abc9c"
    },
    {
      code: "MA 26600",
      name: "Ordinary Differential Equations",
      description: "Differential equations, Laplace transforms, and applications to engineering", 
      grade: "A",
      icon: "📐",
      color: "#34495e"
    },
    {
      code: "PHYS 17200",
      name: "Modern Mechanics", 
      description: "Newton's laws, energy, momentum, rotational motion, and oscillations",
      grade: "B",
      icon: "🌍",
      color: "#16a085"
    },
    {
      code: "PHYS 27200",
      name: "Electric & Magnetic Interactions",
      description: "Electric fields, magnetic fields, electromagnetic induction, and Maxwell's equations",
      grade: "B",
      icon: "🧲", // Fixed physics symbol
      color: "#8e44ad"
    }
  ];

  // Update section title
  const courseSectionTitle = document.querySelector('.courses__section h2');
  if (courseSectionTitle) {
    courseSectionTitle.innerHTML = `
      <span class="gradient-text">Relevant Coursework</span>
      <div class="section__subtitle">Academic Excellence in Engineering & Computer Science</div>
    `;
  }

  // Add loading animation to page
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // Interactive Education Tabs
  const educationTabs = document.querySelectorAll('.education__tab');
  const courseContents = document.querySelectorAll('.course__category-content');

  educationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;
      
      // Remove active class from all tabs and contents
      educationTabs.forEach(t => t.classList.remove('active'));
      courseContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      tab.classList.add('active');
      document.getElementById(`category-${category}`).classList.add('active');
      
      // Add subtle animation
      const activeContent = document.getElementById(`category-${category}`);
      activeContent.style.animation = 'none';
      activeContent.offsetHeight; // Trigger reflow
      activeContent.style.animation = 'fadeInUp 0.6s ease-out';
    });

    // Add hover effects for Lottie animations
    tab.addEventListener('mouseenter', () => {
      const lottiePlayer = tab.querySelector('lottie-player');
      if (lottiePlayer) {
        lottiePlayer.setSpeed(1.5);
      }
    });

    tab.addEventListener('mouseleave', () => {
      const lottiePlayer = tab.querySelector('lottie-player');
      if (lottiePlayer) {
        lottiePlayer.setSpeed(1);
      }
    });
  });

  // Interactive course cards
  const courseCards = document.querySelectorAll('.interactive-course');
  courseCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Add particle effect
      createParticles(card);
    });
  });

  // Particle effect function
  function createParticles(element) {
    const particles = document.createElement('div');
    particles.className = 'particles';
    particles.innerHTML = '✨';
    particles.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 1.2rem;
      animation: float 2s ease-out forwards;
      pointer-events: none;
      z-index: 10;
    `;
    
    element.appendChild(particles);
    
    setTimeout(() => {
      particles.remove();
    }, 2000);
  }

  // Initialize Three.js animations when sections come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const threeJSObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        
        switch(sectionId) {
          case 'courses':
            window.threeJSAnimations.initEducationAnimation('education-animation');
            break;
          case 'projects':
            window.threeJSAnimations.initProjectsAnimation('projects-animation');
            break;
          case 'experience':
            window.threeJSAnimations.initExperienceAnimation('experience-animation');
            break;
        }
      }
    });
  }, observerOptions);

  // Observe sections
  ['courses', 'projects', 'experience'].forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      threeJSObserver.observe(section);
    }
  });

  // Handle window resize for Three.js
  window.addEventListener('resize', () => {
    ['education-animation', 'projects-animation', 'experience-animation'].forEach(id => {
      window.threeJSAnimations.handleResize(id);
    });
  });

  // Add mouse tracking for enhanced effects
  document.querySelectorAll('.project__card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });

  // Theme Toggle Functionality
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeOptions = document.querySelectorAll('.theme-option');
  const themeIndicator = document.querySelector('.theme-toggle__indicator');

  // Get saved theme or default to light
  let currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply saved theme on load
  applyTheme(currentTheme);

  // Toggle theme panel
  themeToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    themeToggle.classList.toggle('open');
  });

  // Close theme panel when clicking outside
  document.addEventListener('click', (e) => {
    if (!themeToggle.contains(e.target)) {
      themeToggle.classList.remove('open');
    }
  });

  // Handle theme selection
  themeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const selectedTheme = option.dataset.theme;
      applyTheme(selectedTheme);
      themeToggle.classList.remove('open');
    });
  });

  function applyTheme(theme) {
    currentTheme = theme;
    
    // Update document theme
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update active button
    themeOptions.forEach(option => {
      option.classList.remove('active');
      if (option.dataset.theme === theme) {
        option.classList.add('active');
      }
    });

    // Update indicator position
    themeIndicator.className = 'theme-toggle__indicator';
    if (theme === 'dark') {
      themeIndicator.classList.add('dark');
    } else if (theme === 'surprise') {
      themeIndicator.classList.add('surprise');
    }

    // Apply theme-specific animations
    applyThemeAnimations(theme);
    
    // Save theme
    localStorage.setItem('theme', theme);
    
    // Update Three.js scenes for theme
    updateThreeJSForTheme(theme);
  }

  function applyThemeAnimations(theme) {
    const body = document.body;
    
    // Add theme-specific classes
    body.classList.remove('light-theme', 'dark-theme', 'surprise-theme');
    body.classList.add(`${theme}-theme`);

    // Surprise theme special effects
    if (theme === 'surprise') {
      startSurpriseEffects();
    } else {
      stopSurpriseEffects();
    }
  }

  function startSurpriseEffects() {
    // Add rainbow border animation
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.borderBottom = '2px solid';
      navbar.style.borderImage = 'linear-gradient(45deg, #e74c3c, #f39c12, #f1c40f, #27ae60, #3498db, #9b59b6, #e74c3c) 1';
      navbar.style.animation = 'rainbowBorder 3s linear infinite';
    }

    // Add floating particles
    createFloatingParticles();
    
    // Add subtle screen glow
    document.body.style.boxShadow = 'inset 0 0 100px rgba(231, 76, 60, 0.1)';
  }

  function stopSurpriseEffects() {
    // Remove effects
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.borderImage = 'none';
      navbar.style.animation = 'none';
      navbar.style.borderBottom = 'none';
    }
    
    // Remove particles
    document.querySelectorAll('.floating-particle').forEach(particle => {
      particle.remove();
    });
    
    // Remove screen glow
    document.body.style.boxShadow = 'none';
  }

  function createFloatingParticles() {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.innerHTML = ['✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 4)];
        
        particle.style.cssText = `
          position: fixed;
          font-size: ${Math.random() * 20 + 10}px;
          left: ${Math.random() * 100}vw;
          top: 100vh;
          pointer-events: none;
          z-index: 999;
          animation: floatUp ${Math.random() * 10 + 15}s linear infinite;
          opacity: ${Math.random() * 0.7 + 0.3};
        `;
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
          particle.remove();
        }, 25000);
      }, Math.random() * 2000);
    }
  }

  function updateThreeJSForTheme(theme) {
    // Update Three.js colors based on theme
    if (window.threeJSAnimations) {
      const colors = {
        light: { primary: 0x6366f1, secondary: 0x8b5cf6 },
        dark: { primary: 0x8b5cf6, secondary: 0xec4899 },
        surprise: { primary: 0xe74c3c, secondary: 0xf39c12 }
      };
      
      // This would update your Three.js materials
      // Implementation depends on your Three.js setup
    }
  }

  // Keyboard shortcut for theme toggle
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 't') {
      e.preventDefault();
      const themes = ['light', 'dark', 'surprise'];
      const currentIndex = themes.indexOf(currentTheme);
      const nextTheme = themes[(currentIndex + 1) % themes.length];
      applyTheme(nextTheme);
    }
  });
});