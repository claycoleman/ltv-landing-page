// Main JavaScript for Comm-It Level 2

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navList = document.querySelector('.nav-list');
  
  if (mobileMenuBtn && navList) {
    mobileMenuBtn.addEventListener('click', function() {
      navList.classList.toggle('active');
      // Toggle hamburger/close icon
      this.classList.toggle('active');
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        // Close mobile menu if open
        if (navList && navList.classList.contains('active')) {
          navList.classList.remove('active');
          if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
        }
        
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Form validation and submission handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      let valid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      // Email validation
      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
          valid = false;
          emailField.classList.add('error');
        }
      }
      
      if (valid) {
        // Simulate form submission
        const formData = new FormData(contactForm);
        const formValues = {};
        
        formData.forEach((value, key) => {
          formValues[key] = value;
        });
        
        // Show success message (in practice, you'd send this data to a server)
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.textContent = 'Thanks for joining our waitlist! We\'ll keep you updated about Comm-It.';
        
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
      }
    });
  }
  
  // Highlight active navigation based on scroll position
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  
  // Trigger animations when elements come into view
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animateElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
      observer.observe(el);
    });
  }
  
  // Testimonial carousel (if exists)
  const testimonialSlider = document.querySelector('.testimonial-slider');
  
  if (testimonialSlider) {
    const testimonials = testimonialSlider.querySelectorAll('.testimonial-card');
    const prevBtn = testimonialSlider.querySelector('.slider-prev');
    const nextBtn = testimonialSlider.querySelector('.slider-next');
    
    let currentIndex = 0;
    
    // Show the active testimonial and hide others
    function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
      });
    }
    
    // Initial setup
    showTestimonial(currentIndex);
    
    // Next button
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
      });
    }
    
    // Previous button
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
      });
    }
    
    // Auto advance every 5 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    }, 5000);
  }
}); 