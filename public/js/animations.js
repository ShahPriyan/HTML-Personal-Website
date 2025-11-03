// Counter Animation - OPTIMIZED for performance
function animateCounters() {
  const counters = document.querySelectorAll('.stat__number[data-target]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 50; // Reduced from 100 to 50 for faster animation
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      counter.textContent = Math.floor(current) + '+';
      
      if (current >= target) {
        counter.textContent = target + '+';
        clearInterval(timer);
      }
    }, 40); // Increased from 20ms to 40ms for less frequent updates
  });
}

// Intersection Observer for animations
const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('counter-animation')) {
          entry.target.classList.add('animate');
          animateCounters();
        }
        
        if (entry.target.classList.contains('slide-in-left')) {
          entry.target.classList.add('animate');
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.counter-animation, .slide-in-left').forEach(el => {
    observer.observe(el);
  });
};

// Parallax effect for hero section - THROTTLED for performance
const parallaxEffect = () => {
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.25; // Reduced effect intensity
    const hero = document.querySelector('.hero__img-container');
    if (hero) {
      hero.style.transform = `translateY(${rate}px)`;
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

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  observeElements();
  parallaxEffect();
  
  // Skill tag animations disabled for immediate visibility
  const skillTags = document.querySelectorAll('.skill__tag');
  skillTags.forEach((tag, index) => {
    // Ensure skills are immediately visible without animations
    tag.style.opacity = '1';
    tag.style.visibility = 'visible';
    tag.style.display = 'inline-block';
  });
});