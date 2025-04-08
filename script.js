document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.querySelector('.navbar');
    const menuButton = document.querySelector('.menu-button');
    const closeButton = document.querySelector('.close-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-contact-button');
    
    // Handle scroll effect
    function handleScroll() {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    // Toggle mobile menu
    function openMobileMenu() {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    }
    
    function closeMobileMenu() {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Close menu when screen size changes to desktop
    function handleResize() {
      if (window.innerWidth >= 1024) {
        closeMobileMenu();
      }
    }
    
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    menuButton.addEventListener('click', openMobileMenu);
    closeButton.addEventListener('click', closeMobileMenu);
    
    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
    
    // Initialize
    handleScroll(); // Check initial scroll position
  });


  document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
        rect.bottom >= 0
      );
    }
    
    // Function to handle fade-in animations
    function handleFadeIn() {
      fadeElements.forEach(element => {
        if (isInViewport(element)) {
          element.classList.add('visible');
        }
      });
    }
    
    // Event listeners
    window.addEventListener('scroll', handleFadeIn);
    window.addEventListener('resize', handleFadeIn);
    
    // Initialize - trigger initial fade-ins with a slight delay for a staggered effect
    fadeElements.forEach((element, index) => {
      setTimeout(() => {
        if (isInViewport(element)) {
          element.classList.add('visible');
        }
      }, 100 * index);
    });
    
    // Initial check
    handleFadeIn();
  });

  document.addEventListener('DOMContentLoaded', function() {
    const marqueeContainer = document.querySelector('.marquee-container');
    const marqueeContents = document.querySelectorAll('.marquee-content');
    
    // Function to adjust animation speed based on screen width
    function adjustSpeed() {
      const containerWidth = marqueeContainer.offsetWidth;
      const contentWidth = marqueeContents[0].offsetWidth;
      
      // Calculate appropriate duration based on content width
      // Faster for wider screens, slower for mobile
      const duration = Math.max(20, contentWidth / 100);
      
      marqueeContents.forEach(content => {
        content.style.animationDuration = `${duration}s`;
      });
    }
    
    // Initial adjustment
    adjustSpeed();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustSpeed);
    
    // Pause animation on hover
    marqueeContainer.addEventListener('mouseenter', () => {
      marqueeContents.forEach(content => {
        content.style.animationPlayState = 'paused';
      });
    });
    
    // Resume animation when mouse leaves
    marqueeContainer.addEventListener('mouseleave', () => {
      marqueeContents.forEach(content => {
        content.style.animationPlayState = 'running';
      });
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Set the correct width for progress bars with animation
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.setProperty('--width', width);
        bar.style.width = '0';
        
        // Ensure the label moves with the progress bar during animation
        const label = bar.querySelector('.progress-label');
        if (label) {
            setTimeout(() => {
                label.style.opacity = 1;
            }, 1000);
        }
    });
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
    });
});


 // JavaScript for accordion functionality
 document.querySelectorAll('.query-button').forEach(button => {
  button.addEventListener('click', () => {
      const item = button.parentNode;
      const isActive = item.classList.contains('active');
      
      // Close all items
      document.querySelectorAll('.query-item').forEach(el => {
          el.classList.remove('active');
      });
      
      // If the clicked item wasn't active, open it
      if (!isActive) {
          item.classList.add('active');
      }
  });
});