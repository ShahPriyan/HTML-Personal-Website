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
        body: JSON.stringify(Object.fromEntries(formData))
      });

      const result = await response.json();

      if (result.success) {
        // Success animation
        button.textContent = '✓ Sent!';
        button.style.background = '#10b981';
        form.reset();
        
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = '';
          button.style.opacity = '1';
        }, 2000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      button.textContent = '✗ Error';
      button.style.background = '#ef4444';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.style.opacity = '1';
      }, 2000);
    } finally {
      button.disabled = false;
    }
  });

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
});