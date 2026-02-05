// Counter Animation - ENHANCED for smooth performance
function animateCounters() {
  const counters = document.querySelectorAll('.stat__number[data-target]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuad = progress * (2 - progress);
      const current = Math.floor(easeOutQuad * target);
      
      counter.textContent = current + '+';
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        counter.textContent = target + '+';
      }
    };
    
    requestAnimationFrame(animate);
  });
}

// Intersection Observer for animations with enhanced settings
const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        if (entry.target.classList.contains('counter-animation')) {
          animateCounters();
        }
        
        // Add stagger effect for child elements
        if (entry.target.classList.contains('skills__grid') || 
            entry.target.classList.contains('projects__grid') ||
            entry.target.classList.contains('courses__grid')) {
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('fade-in-up');
            }, index * 100);
          });
        }
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.counter-animation, .slide-in-left, .skills__grid, .projects__grid, .courses__grid').forEach(el => {
    observer.observe(el);
  });
};

// Smooth scroll behavior for navigation
const setupSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
};

// Parallax effect for hero section - ENHANCED with better performance
const parallaxEffect = () => {
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    const hero = document.querySelector('.hero__img-container');
    
    if (hero && scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0001})`;
    }
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
};

// Add hover effects to cards
const setupCardEffects = () => {
  const cards = document.querySelectorAll('.project__card, .course__card, .timeline__content');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
};

// Navbar scroll effect
const setupNavbarScroll = () => {
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Hide navbar on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  observeElements();
  parallaxEffect();
  setupSmoothScroll();
  setupCardEffects();
  setupNavbarScroll();
  
  // Skill tag animations disabled for immediate visibility
  const skillTags = document.querySelectorAll('.skill__tag');
  skillTags.forEach((tag, index) => {
    // Ensure skills are immediately visible without animations
    tag.style.opacity = '1';
    tag.style.visibility = 'visible';
    tag.style.display = 'inline-block';
  });
});