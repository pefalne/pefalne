document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Active Link logic
  const currentPath = window.location.pathname.split('/').pop();
  const links = document.querySelectorAll('.nav-links a');
  
  links.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // GSAP Animations (Wait for elements to render)
  setTimeout(() => {
    if (typeof gsap !== 'undefined') {
      
      // Register ScrollTrigger if available
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }

      // Hero Elements Animation
      if (document.querySelector('.hero-title')) {
        const tl = gsap.timeline();
        tl.from('.hero-subtitle', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' })
          .from('.hero-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
          .from('.hero-text', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
          .from('.hero-buttons', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
          .from('.img-wrapper', { scale: 0.8, opacity: 0, rotationY: -15, duration: 1.5, ease: 'power3.out' }, '-=1');
      }

      // Page Header Animation
      if (document.querySelector('.page-header h1')) {
        gsap.from('.page-header h1', { y: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
        gsap.from('.page-header p', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.4 });
      }

      // Fade up elements with ScrollTrigger
      if (typeof ScrollTrigger !== 'undefined') {
        const fadeUps = document.querySelectorAll('.gsap-fade-up');
        fadeUps.forEach((el) => {
          gsap.fromTo(el, 
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });

        // Image Tilt effect on mousemove for Hero Image
        const heroImg = document.querySelector('.img-wrapper');
        if (heroImg) {
          heroImg.addEventListener('mousemove', (e) => {
            const rect = heroImg.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(heroImg, {
              rotationY: x * 0.05,
              rotationX: -y * 0.05,
              transformPerspective: 1000,
              ease: 'power2.out',
              duration: 0.5
            });
          });
          heroImg.addEventListener('mouseleave', () => {
            gsap.to(heroImg, { rotationY: 0, rotationX: 0, ease: 'power3.out', duration: 1 });
          });
        }
      } else {
        // Fallback if ScrollTrigger fails
        const fadeUps = document.querySelectorAll('.gsap-fade-up');
        fadeUps.forEach(el => {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
        });
      }
    }
  }, 100); // short delay to ensure DOM is ready
});
