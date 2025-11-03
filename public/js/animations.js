// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat__number[data-target]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      counter.textContent = Math.floor(current) + '+';
      
      if (current >= target) {
        counter.textContent = target + '+';
        clearInterval(timer);
      }
    }, 20);
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

// Parallax effect for hero section
const parallaxEffect = () => {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const hero = document.querySelector('.hero__img-container');
    if (hero) {
      hero.style.transform = `translateY(${rate}px)`;
    }
  });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  observeElements();
  parallaxEffect();
  
  // Add stagger animation to skill tags
  const skillTags = document.querySelectorAll('.skill__tag');
  skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.classList.add('fade-in-up');
  });
});