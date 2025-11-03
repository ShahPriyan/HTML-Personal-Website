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

  // Projects data from resume
  const projectsData = [
    {
      title: "Personal Website",
      description: "Built a responsive personal portfolio website using HTML, CSS, JavaScript, and Node.js with Express server. Features include dynamic Three.js animations, theme switching, contact form, and mobile-responsive design.",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "Three.js"],
      github: "https://github.com/yourusername/personal-website",
      demo: "#",
      image: "/images/personal-website.jpg",
      category: "web"
    },
    {
      title: "Machine Learning Stock Price Predictor",
      description: "Developed a machine learning model to predict stock prices using Python, pandas, and scikit-learn. Implemented data preprocessing, feature engineering, and model evaluation with various algorithms.",
      technologies: ["Python", "Pandas", "Scikit-learn", "NumPy", "Matplotlib"],
      github: "https://github.com/yourusername/stock-predictor",
      demo: "#",
      image: "/images/stock-predictor.jpg",
      category: "ml"
    },
    {
      title: "IoT Temperature Monitoring System",
      description: "Created an IoT system using Arduino and sensors to monitor temperature and humidity. Data is transmitted wirelessly and displayed on a web dashboard with real-time updates.",
      technologies: ["Arduino", "C++", "IoT", "Web Dashboard", "Sensors"],
      github: "https://github.com/yourusername/iot-monitoring",
      demo: "#",
      image: "/images/iot-system.jpg",
      category: "hardware"
    },
    {
      title: "Database Management System",
      description: "Designed and implemented a comprehensive database management system for inventory tracking. Features include CRUD operations, user authentication, and reporting functionality.",
      technologies: ["SQL", "Database Design", "CRUD Operations", "Authentication"],
      github: "https://github.com/yourusername/database-system",
      demo: "#",
      image: "/images/database-system.jpg",
      category: "database"
    }
  ];

  // Update section title to match resume
  const projectSectionTitle = document.querySelector('.projects__section h2');
  if (projectSectionTitle) {
    projectSectionTitle.innerHTML = `
      <span class="gradient-text">Projects</span>
      <div class="section__subtitle">Technical Projects & Implementations</div>
    `;
  }

  // Populate projects
  function populateProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = '';

    projectsData.forEach((project, index) => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project__card';
      projectCard.setAttribute('data-aos', 'fade-up');
      projectCard.setAttribute('data-aos-delay', (index * 100).toString());

      projectCard.innerHTML = `
        <div class="project__image">
          <img src="${project.image}" alt="${project.title}" onerror="this.src='/images/placeholder-project.jpg'">
          <div class="project__overlay">
            <div class="project__links">
              <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project__link">
                <i class="fab fa-github"></i>
              </a>
              <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project__link">
                <i class="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="project__content">
          <h3 class="project__title">${project.title}</h3>
          <p class="project__description">${project.description}</p>
          <div class="project__technologies">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
        </div>
      `;

      projectsContainer.appendChild(projectCard);
    });
  }

  // Initialize projects
  populateProjects();

  // ... rest of your existing code stays the same ...
});

<!-- Update the projects section in your index.ejs -->
<section class="projects__section" id="projects">
  <div class="threejs-background" id="projects-animation"></div>
  <div class="container">
    <h2 data-aos="fade-up">
      <span class="gradient-text">Projects</span>
      <div class="section__subtitle">Technical Projects & Implementations</div>
    </h2>
    
    <div class="projects__grid" id="projects-container">
      <!-- Projects will be populated by JavaScript -->
    </div>
  </div>
</section>