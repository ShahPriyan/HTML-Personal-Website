document.addEventListener('DOMContentLoaded', () => {
  // Initialize Enhanced Text & Icon Animations
  initializeEnhancedAnimations();
  
  // Initialize AOS with enhanced settings
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-out-cubic',
    offset: 50,
    delay: 100
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navbarMenu = document.querySelector('.navbar__menu');

  if (menuToggle && navbarMenu) {
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
  }

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

  // Courses data with fixed symbols - keep your existing 9 courses
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

  // Populate courses
  function populateCourses() {
    const coursesContainer = document.querySelector('.courses__grid');
    if (!coursesContainer) return;

    coursesContainer.innerHTML = '';

    coursesData.forEach((course, index) => {
      const courseCard = document.createElement('div');
      courseCard.className = 'course__card interactive-course';
      courseCard.setAttribute('data-aos', 'fade-up');
      courseCard.setAttribute('data-aos-delay', (index * 100).toString());

      // Determine grade class
      let gradeClass = 'grade-b';
      if (course.grade.includes('A')) gradeClass = 'grade-a';
      else if (course.grade.includes('Currently')) gradeClass = 'grade-in-progress';

      courseCard.innerHTML = `
        <div class="course__header">
          <div class="course__icon" style="color: ${course.color}">${course.icon}</div>
          <div class="course__grade ${gradeClass}">
            <span class="grade__indicator">${course.grade}</span>
          </div>
        </div>
        <div class="course__content">
          <h3 class="course__code">${course.code}</h3>
          <h4 class="course__name">${course.name}</h4>
          <p class="course__description">${course.description}</p>
        </div>
      `;

      coursesContainer.appendChild(courseCard);
    });
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

  // Populate projects
  function populateProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = '';

    projectsData.forEach((project, index) => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project__card card-hover threejs-hover';
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
      const activeContent = document.getElementById(`category-${category}`);
      if (activeContent) {
        activeContent.classList.add('active');
        
        // Add subtle animation
        activeContent.style.animation = 'none';
        activeContent.offsetHeight; // Trigger reflow
        activeContent.style.animation = 'fadeInUp 0.6s ease-out';
      }
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
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeToggle.classList.toggle('open');
    });
  }

  // Close theme panel when clicking outside
  document.addEventListener('click', (e) => {
    if (themeToggle && !themeToggle.contains(e.target)) {
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
    if (themeIndicator) {
      themeIndicator.className = 'theme-toggle__indicator';
      if (theme === 'dark') {
        themeIndicator.classList.add('dark');
      } else if (theme === 'surprise') {
        themeIndicator.classList.add('surprise');
      }
    }

    // Apply theme-specific animations
    applyThemeAnimations(theme);
    
    // Save theme
    localStorage.setItem('theme', theme);
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

  // Enhanced icon interactions
  // Add sparkle effect to icons on hover
  function addSparkleEffect(element) {
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-effect';
    sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
    
    const rect = element.getBoundingClientRect();
    sparkle.style.cssText = `
      position: fixed;
      left: ${rect.left + Math.random() * rect.width}px;
      top: ${rect.top + Math.random() * rect.height}px;
      font-size: ${Math.random() * 20 + 10}px;
      pointer-events: none;
      z-index: 9999;
      animation: sparkleFloat 1.5s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1500);
  }

  // Add sparkle animation styles
  const sparkleStyles = `
    @keyframes sparkleFloat {
      0% {
        opacity: 1;
        transform: translateY(0px) scale(0);
      }
      50% {
        opacity: 1;
        transform: translateY(-30px) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateY(-60px) scale(0);
      }
    }
  `;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = sparkleStyles;
  document.head.appendChild(styleSheet);

  // Enhanced skill tag interactions
  document.querySelectorAll('.skill__tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      addSparkleEffect(tag);
      
      // Add sound effect (optional)
      if (window.AudioContext) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      }
    });
  });

  // Enhanced project card interactions
  document.querySelectorAll('.project__card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.project__icon');
      if (icon) {
        addSparkleEffect(icon);
        
        // Add color cycling
        let hue = 0;
        const colorCycle = setInterval(() => {
          hue += 10;
          icon.style.filter = `hue-rotate(${hue}deg) brightness(1.2)`;
        }, 50);
        
        card.addEventListener('mouseleave', () => {
          clearInterval(colorCycle);
          icon.style.filter = '';
        }, { once: true });
      }
    });
  });

  // Enhanced contact card interactions
  document.querySelectorAll('.contact__card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.contact__icon');
      if (icon) {
        addSparkleEffect(icon);
        
        // Add magnetic effect
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
          
          icon.style.transform = `scale(1.3) rotateY(180deg) translate(${x}px, ${y}px)`;
        });
        
        card.addEventListener('mouseleave', () => {
          icon.style.transform = 'scale(1) rotateY(0deg) translate(0px, 0px)';
        }, { once: true });
      }
    });
  });

  // Enhanced course card interactions
  document.querySelectorAll('.course__card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.course__icon');
      if (icon) {
        addSparkleEffect(icon);
        
        // Add floating animation
        let float = 0;
        const floatAnimation = setInterval(() => {
          float += 0.1;
          icon.style.transform = `scale(1.3) rotateY(360deg) translateY(${Math.sin(float) * 5}px)`;
        }, 16);
        
        card.addEventListener('mouseleave', () => {
          clearInterval(floatAnimation);
          icon.style.transform = '';
        }, { once: true });
      }
    });
  });

  // Enhanced timeline interactions
  document.querySelectorAll('.timeline__item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const marker = item.querySelector('.timeline__marker');
      if (marker) {
        // Add explosion effect
        for (let i = 0; i < 8; i++) {
          const particle = document.createElement('div');
          particle.className = 'timeline-particle';
          particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            left: 50%;
            top: 50%;
            pointer-events: none;
            animation: timelineExplode 1s ease-out forwards;
            animation-delay: ${i * 0.1}s;
            transform: rotate(${i * 45}deg);
          `;
          
          marker.appendChild(particle);
          
          setTimeout(() => particle.remove(), 1000);
        }
      }
    });
  });

  // Add timeline explosion animation
  const timelineStyles = `
    @keyframes timelineExplode {
      0% {
        transform: rotate(var(--rotation, 0deg)) translateX(0px);
        opacity: 1;
      }
      100% {
        transform: rotate(var(--rotation, 0deg)) translateX(30px);
        opacity: 0;
      }
    }
  `;
  
  const timelineStyleSheet = document.createElement('style');
  timelineStyleSheet.textContent = timelineStyles;
  document.head.appendChild(timelineStyleSheet);

  // Enhanced button interactions
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Create ripple effect
      const ripple = document.createElement('div');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: buttonRipple 0.6s ease-out;
        pointer-events: none;
      `;
      
      btn.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add button ripple animation
  const buttonStyles = `
    @keyframes buttonRipple {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  
  const buttonStyleSheet = document.createElement('style');
  buttonStyleSheet.textContent = buttonStyles;
  document.head.appendChild(buttonStyleSheet);

  // Initialize all content
  populateCourses();
  populateProjects();

  // Initialize Three.js animations when sections come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const threeJSObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && window.threeJSAnimations) {
        const sectionId = entry.target.id;
        
        switch(sectionId) {
          case 'home':
            window.threeJSAnimations.initHeroAnimation('hero-animation');
            break;
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
  ['home', 'courses', 'projects', 'experience'].forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      threeJSObserver.observe(section);
    }
  });

  // Handle window resize for Three.js
  window.addEventListener('resize', () => {
    if (window.threeJSAnimations) {
      ['education-animation', 'projects-animation', 'experience-animation'].forEach(id => {
        window.threeJSAnimations.handleResize(id);
      });
    }
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

  // Enhanced Text & Icon Animation System
  function initializeEnhancedAnimations() {
    // Add dynamic text effects to all headings
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading, index) => {
      // Stagger the animation delays
      heading.style.animationDelay = `${index * 0.2}s`;
      
      // Add interactive hover effects
      heading.addEventListener('mouseenter', () => {
        heading.style.animation = 'none';
        heading.style.transform = 'perspective(1000px) rotateX(10deg) scale(1.05)';
        heading.style.textShadow = `
          0 10px 30px rgba(99, 102, 241, 0.8),
          0 0 50px rgba(99, 102, 241, 0.5),
          0 0 100px rgba(99, 102, 241, 0.3)
        `;
      });
      
      heading.addEventListener('mouseleave', () => {
        heading.style.animation = 'floatText 4s ease-in-out infinite';
        heading.style.transform = 'perspective(1000px) rotateX(0deg) scale(1)';
        heading.style.textShadow = '0 5px 15px rgba(99, 102, 241, 0.3)';
      });
    });

    // Enhanced icon animations
    const icons = document.querySelectorAll('.fab, .fas, .far, i[class*="fa"], i[class*="icon"], .icon');
    icons.forEach((icon, index) => {
      icon.style.animationDelay = `${index * 0.1}s`;
      
      // Add magnetic hover effect
      icon.addEventListener('mouseenter', () => {
        icon.style.animation = 'iconExplosion 0.6s ease-out';
        icon.style.transform = 'perspective(1000px) rotateY(360deg) scale(1.4)';
        icon.style.filter = `
          drop-shadow(0 0 20px currentColor) 
          drop-shadow(0 0 40px currentColor)
          brightness(1.5) 
          saturate(1.3)
        `;
      });
      
      icon.addEventListener('mouseleave', () => {
        icon.style.animation = 'pulseIcon 3s ease-in-out infinite';
        icon.style.transform = 'perspective(1000px) scale(1)';
        icon.style.filter = 'drop-shadow(0 5px 15px rgba(99, 102, 241, 0.4))';
      });
    });

    // Add particle effects to buttons
    const buttons = document.querySelectorAll('button, .btn, .button');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        createParticleExplosion(e.target, e.clientX, e.clientY);
      });
    });

    // Enhanced scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Add text typing effect for paragraphs
          if (entry.target.tagName === 'P') {
            addTypingEffect(entry.target);
          }
          
          // Add number counting effect
          if (entry.target.classList.contains('stat-number')) {
            animateNumber(entry.target);
          }
        }
      });
    }, { threshold: 0.1 });

    // Observe all text elements
    document.querySelectorAll('p, .course__card, .project__card, .timeline__content').forEach(el => {
      observer.observe(el);
    });

    // Add parallax effect to background elements
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelectorAll('.parallax-bg');
      
      parallax.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }

  // Particle explosion effect for button clicks
  function createParticleExplosion(element, x, y) {
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'click-particle';
      particle.innerHTML = ['✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 4)];
      
      const angle = (i / 12) * Math.PI * 2;
      const velocity = 50 + Math.random() * 50;
      
      particle.style.cssText = `
        position: fixed;
        top: ${y}px;
        left: ${x}px;
        font-size: ${0.8 + Math.random() * 0.4}rem;
        pointer-events: none;
        z-index: 1000;
        animation: particleExplosion 1s ease-out forwards;
        --angle: ${angle}rad;
        --velocity: ${velocity}px;
      `;
      
      document.body.appendChild(particle);
      
      setTimeout(() => particle.remove(), 1000);
    }
  }

  // Typing effect for text
  function addTypingEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--text-accent)';
    
    let i = 0;
    const typeTimer = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(typeTimer);
        setTimeout(() => {
          element.style.borderRight = 'none';
        }, 500);
      }
    }, 50);
  }

  // Number animation effect
  function animateNumber(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 60; // 60 frames for 1 second at 60fps
    
    const timer = setInterval(() => {
      current += increment;
      element.textContent = Math.floor(current);
      
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  }

  // Add CSS for particle explosion
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleExplosion {
      0% {
        opacity: 1;
        transform: translate(0, 0) scale(1);
      }
      100% {
        opacity: 0;
        transform: 
          translate(
            calc(cos(var(--angle)) * var(--velocity)), 
            calc(sin(var(--angle)) * var(--velocity))
          ) 
          scale(0.3);
      }
    }
    
    .animate-in {
      opacity: 1;
      transform: translateY(0);
      transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .parallax-bg {
      will-change: transform;
    }
  `;
  document.head.appendChild(style);
});