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
    // Animate each letter with a delay
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        letter.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Replace YOUR_FORMSPARK_ID with your actual Formspark form ID
    const form = document.getElementById('contactForm');
    if (form) {
        const formAction = form.getAttribute('action');
        if (formAction.includes('YOUR_FORMSPARK_ID')) {
            console.warn('Remember to replace YOUR_FORMSPARK_ID with your actual Formspark form ID');
        }
    }
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