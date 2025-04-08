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

  // Intersection Observer for animation
  document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add a small delay between animations for a cascade effect
                setTimeout(() => {
                    entry.target.style.transitionDelay = "0s";
                }, 300);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    // Observe all timeline items with staggered delay
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
});