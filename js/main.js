// ========== SMOOTH SCROLLING ==========
// Makes navigation links scroll smoothly to sections instead of jumping

// Select all links that start with "#" (internal page links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Add click event listener to each link
    anchor.addEventListener('click', function (e) {
    anchor.addEventListener('click', function (e) {
        // Prevent default jump behavior
        e.preventDefault();

        // Get the element this link points to (e.g., #about gets the element with id="about")
        const target = document.querySelector(this.getAttribute('href'));

        // If target element exists
        if (target) {
            // Scroll to it smoothly
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if it's open
            navMenu.classList.remove('active');
        }
    });
});

// ========== MOBILE MENU TOGGLE ==========
// Opens and closes navigation menu on mobile devices

// Get hamburger button element
const hamburger = document.querySelector('.hamburger');
// Get navigation menu element
const navMenu = document.querySelector('.nav-menu');

// Add click event to hamburger
hamburger.addEventListener('click', () => {
    // Toggle 'active' class (adds if not present, removes if present)
    navMenu.classList.toggle('active');
});

// ========== NAVBAR BACKGROUND ON SCROLL ==========
// Changes navbar appearance when user scrolls down

// Get navbar element
const navbar = document.getElementById('navbar');

// Add scroll event listener to window
window.addEventListener('scroll', () => {
    // If user has scrolled more than 50 pixels down
    if (window.scrollY > 50) {
        // Make navbar more opaque and increase shadow
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        // Return to original style
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ========== ACTIVE NAVIGATION LINK HIGHLIGHTING ==========
// Highlights current section in navigation as user scrolls

// Get all sections that have an id attribute
const sections = document.querySelectorAll('section[id]');
// Get all navigation links
const navLinks = document.querySelectorAll('.nav-link');

// Function that determines which section is currently visible
function highlightNavigation() {
    // Get current scroll position
    const scrollY = window.pageYOffset;

    // Loop through each section
    sections.forEach(section => {
        // Get section's height
        const sectionHeight = section.offsetHeight;
        // Get section's distance from top of page (minus 100px offset for navbar)
        const sectionTop = section.offsetTop - 100;
        // Get section's id attribute
        const sectionId = section.getAttribute('id');

        // If current scroll position is within this section
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Loop through all nav links
            navLinks.forEach(link => {
                // Remove 'active' class from all links
                link.classList.remove('active');
                // If this link points to current section, add 'active' class
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Run highlight function whenever user scrolls
window.addEventListener('scroll', highlightNavigation);

// ========== CONTACT FORM HANDLING ==========
// Handles form submission without reloading page

// Get contact form element
const contactForm = document.getElementById('contact-form');

// Add submit event listener to form
contactForm.addEventListener('submit', (e) => {
    // Prevent default form submission (which would reload page)
    e.preventDefault();

    // Get values from form fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Here you would typically send this data to a server
    // For now, we'll just show an alert
    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);

    // Reset form (clears all fields)
    contactForm.reset();
});

// ========== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ==========
// Makes elements fade in as they come into view when scrolling

// Configuration for observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

// Create new Intersection Observer
const observer = new IntersectionObserver((entries) => {
    // Loop through each observed element
    entries.forEach(entry => {
        // If element is visible (intersecting with viewport)
        if (entry.isIntersecting) {
            // Make element visible
            entry.target.style.opacity = '1';
            // Move element to normal position (from below)
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Select all elements we want to animate (removed .skill-card)
document.querySelectorAll('.research-card, .academic-item, .about-content').forEach(el => {
    // Start elements invisible and positioned below
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    // Add transition for smooth animation
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    // Tell observer to watch this element
    observer.observe(el);
});

// ========== TYPING EFFECT FOR HERO SUBTITLE ==========
// Creates typewriter effect for subtitle text

// Get hero subtitle element
const subtitle = document.querySelector('.hero-subtitle');
// Store original text
const text = subtitle.textContent;
// Clear text to prepare for typing effect
subtitle.textContent = '';
// Counter for current character position
let i = 0;

// Function that types one character at a time
function typeWriter() {
    // If we haven't typed all characters yet
    if (i < text.length) {
        // Add next character to subtitle
        subtitle.textContent += text.charAt(i);
        // Increment counter
        i++;
        // Call this function again after 100 milliseconds
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect after page loads
window.addEventListener('load', () => {
    // Wait 500ms after page load, then start typing
    setTimeout(typeWriter, 500);
});

// ========== SCROLL TO TOP ON PAGE LOAD ==========
// Ensures page starts at top when loaded/refreshed
window.addEventListener('load', () => {
    // Scroll to top of page
    window.scrollTo(0, 0);
});

// ========== SMOOTH SCROLL REVEAL FOR ACADEMIC ITEMS ==========
// Additional animation specifically for academic section items

// Select all academic categories
const academicCategories = document.querySelectorAll('.academic-category');

// Create separate observer for academic section with different timing
const academicObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Get all items within this category
            const items = entry.target.querySelectorAll('.academic-item');

            // Animate each item with staggered delay
            items.forEach((item, index) => {
                // Delay increases for each item (creates cascading effect)
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100); // 100ms delay between each item
            });
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px'
});

// Observe each academic category
academicCategories.forEach(category => {
    academicObserver.observe(category);
});

// ========== CV BUTTON ANIMATION ==========
// Add subtle animation to CV button

// Get CV button element
const cvButton = document.querySelector('.btn-cv');

// Add hover effect to CV button icon
if (cvButton) {
    cvButton.addEventListener('mouseenter', () => {
        const icon = cvButton.querySelector('svg');
        if (icon) {
            icon.style.transform = 'translateY(3px)';
        }
    });

    cvButton.addEventListener('mouseleave', () => {
        const icon = cvButton.querySelector('svg');
        if (icon) {
            icon.style.transform = 'translateY(0)';
        }
    });
}

// ========== CONSOLE WELCOME MESSAGE ==========
// Fun message for developers who open browser console
console.log('%c Welcome to my portfolio! ', 'background: #0058ff; color: white; font-size: 20px; padding: 10px;');
console.log('%c If you\'re checking out the code, feel free to reach out! ', 'font-size: 14px; color: #0058ff;');