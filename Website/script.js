// Load Header
fetch("../Website/Header.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("Header").innerHTML = data;
        activateNavLink();
        initHamburger();
    });

// Highlight Active Page
function activateNavLink() {
    const links = document.querySelectorAll(".nav-link");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
}

// Mobile Hamburger Menu
function initHamburger() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}
// Slideshow Functionality
let slideIndex = 1;

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("fade");
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].classList.add("fade");
    dots[slideIndex - 1].classList.add("active");
}

// Initialize slideshow
document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        changeSlide(1);
    }, 5000);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation to specific elements
document.querySelectorAll('.step, .impact-card, .testimonial-card, .cta-card').forEach(el => {
    observer.observe(el);
});

// Add fade-in-up animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Counter Animation for Impact Section
function animateCounters() {
    const impactCards = document.querySelectorAll('.impact-card h3');
    
    impactCards.forEach(card => {
        const finalValue = card.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        const isPercentage = finalValue.includes('%');
        const isMillion = finalValue.includes('M+');
        const isThousand = finalValue.includes(',');
        
        let currentValue = 0;
        const increment = Math.ceil(numericValue / 50);
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(timer);
            }
            
            let display = currentValue;
            if (isMillion) display += 'M+';
            if (isPercentage) display += '%';
            if (isThousand && currentValue < 10000) display = currentValue.toLocaleString() + '+';
            
            card.textContent = display;
        }, 30);
    });
}

// Trigger counter animation when section comes into view
const impactSection = document.querySelector('.impact-highlights');
if (impactSection) {
    const impactObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            impactObserver.unobserve(impactSection);
        }
    }, { threshold: 0.5 });
    
    impactObserver.observe(impactSection);
}


//FOOTER
const footerHTML = `
    <!-- Footer Start -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="products.html">Products</a></li>
                    <li><a href="../store-app/index.html">Store</a></li>
                    <li><a href="impact.html">Impact</a></li>
                    <li><a href="careers.html">Careers</a></li>
                    
                </ul>
            </div>
            <div class="footer-section">
                <h4>Company</h4>
                <ul>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="about.html#partners">Partners</a></li>
                    <li><a href="https://sav-circuit.com/privacy-policy/">Privacy Policy</a></li>
                    <li><a href="https://sav-circuit.com/terms-of-operations/">Terms of Service</a></li>
                    <li><a href="product quality policy">Product Policy</a></li>
                    </li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Follow Us</h4>
                <div class="social-links">
                    <a href="https://www.facebook.com/savannacircuit/" aria-label="Facebook" class="social-facebook" target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" height="1em" width="1em" aria-hidden="true"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.1 5.66 21.24 10.44 22v-7.01H7.9v-2.92h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.92h-2.34V22C18.34 21.24 22 17.1 22 12.07z"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/company/savanna-circuit-technologies/about/" aria-label="LinkedIn" class="social-linkedin" target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" height="1em" width="1em" aria-hidden="true"><path d="M19 3A2.94 2.94 0 0 1 22 6v12a2.94 2.94 0 0 1-3 3H5a2.94 2.94 0 0 1-3-3V6a2.94 2.94 0 0 1 3-3h14Zm-9.54 19V10.5H7.06V19h2.4Zm-1.2-9.81a1.39 1.39 0 1 0 0-2.78 1.39 1.39 0 0 0 0 2.78ZM20 19v-5.2c0-2.8-1.49-4.1-3.47-4.1a3 3 0 0 0-2.72 1.49h-.06V10.5h-2.4V19h2.4v-4.48c0-1.18.21-2.32 1.69-2.32s1.5 1.36 1.5 2.4V19H20Z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/savannacircuit/" aria-label="Instagram" class="social-instagram" target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" height="1em" width="1em" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.4.4.6.2 1 .4 1.4.8.4.4.6.8.8 1.4.2.5.3 1.2.4 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.4-.2.6-.4 1-.8 1.4-.4.4-.8.6-1.4.8-.5.2-1.2.3-2.4.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.4-.4-.6-.2-1-.4-1.4-.8-.4-.4-.6-.8-.8-1.4-.2-.5-.3-1.2-.4-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.4.2-.6.4-1 .8-1.4.4-.4.8-.6 1.4-.8.5-.2 1.2-.3 2.4-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-1 .1-1.6.2-2 .4-.5.2-.8.4-1.1.7-.3.3-.5.6-.7 1.1-.2.4-.3 1-.4 2-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1 .2 1.6.4 2 .2.5.4.8.7 1.1.3.3.6.5 1.1.7.4.2 1 .3 2 .4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1-.1 1.6-.2 2-.4.5-.2.8-.4 1.1-.7.3-.3.5-.6.7-1.1.2-.4.3-1 .4-2 .1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1-.2-1.6-.4-2-.2-.5-.4-.8-.7-1.1-.3-.3-.6-.5-1.1-.7-.4-.2-1-.3-2-.4-1.2-.1-1.6-.1-4.9-.1Zm0 3.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm0 2.2a4.3 4.3 0 1 0 0 8.6 4.3 4.3 0 0 0 0-8.6Zm5.3-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/></svg>
                    </a>
                    <a href="https://twitter.com/sav_circuittech" aria-label="X (Twitter)" class="social-x" target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" height="1em" width="1em" aria-hidden="true"><path d="M17.53 3h3.13l-6.84 7.82L22 21h-6.7l-5.23-6.82L3.9 21H.75l7.3-8.34L1 3h6.86l4.73 6.2L17.53 3Zm-1.17 16.2h1.73L7.72 4.68H5.86L16.36 19.2Z"/></svg>
                    </a>
                    <a href="https://api.whatsapp.com/send/?phone=+254714574007&text=Hello,%20From%20SCT%20Website." aria-label="WhatsApp" class="social-whatsapp" target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" height="1em" width="1em" aria-hidden="true"><path d="M20.5 3.5A10.5 10.5 0 0 0 3.8 17.9L2 22l4.3-1.7A10.5 10.5 0 1 0 20.5 3.5Zm-8.4 16.6c-1.8 0-3.5-.6-4.9-1.7l-.3-.2-2.9 1.1 1.1-2.8-.2-.3a8.5 8.5 0 1 1 7.2 4.9Zm4.9-6.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.4 0-.5.2-.7.2-.2.3-.3.4-.5.2-.2.1-.4 0-.6-.1-.2-.7-1.6-.9-2.2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 3s1.2 3.5 1.3 3.7c.2.2 2.3 3.6 5.7 5 2.1.9 2.9 1 3.9.8.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4 0-.1-.1-.2-.3-.3Z"/></svg>
                    </a>
                </div>
            </div>
            <div class="footer-section">
                <h4>Contact</h4>
                <address>
                    <span class="address-line">
                        <a href="https://goo.gl/maps/8NZGZXvDicZS7rgp9"target="_blank"><span class="address-text">Savanna Businness Park</span></a> 
                        <svg class="pin" viewBox="0 0 24 24" height="1em" width="1em" aria-hidden="true"><path d="M12 2C8.7 2 6 4.7 6 8c0 4.6 6 12 6 12s6-7.4 6-12c0-3.3-2.7-6-6-6Zm0 8.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 5.5 12 5.5s2.5 1.1 2.5 2.5S13.4 10.5 12 10.5Z"/></svg>
                        </span><br>
                    P.O. Box 5107-00200, Nairobi, Kenya
                </address>
                <ul class="contact-list">
                    <li>Tel: <a href="tel:0208000265">020 800 0265</a></li>
                    <li>Mobile: <a href="tel:+254714574007">+254 714 574 007</a></li>
                    <li>Email: <a href="mailto:info@sav-circuit.com">info@sav-circuit.com</a></li>
                
                </ul>
            </div>
           </div>
            <div class="footer-bottom">
               <p>&copy; 2025 Savanna Circuit Technologies. All rights reserved. | <a href="https://techvannah.com" target="_blank">Created by TechVannah</a></p>

        </div>
    </footer>
    <!-- Footer End -->
`;

// Function to inject the footer HTML into the page.
function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    } else {
        console.error('Target element #footer-placeholder not found. Footer could not be loaded.');
    }
}

// Ensure the function runs when the script is loaded.
document.addEventListener('DOMContentLoaded', (event) => {
    loadFooter();
});

// footer auto updates year
document.getElementById('footer-placeholder').textContent = new Date().getFullYear();


// Form Validation Helper (for future contact/partnership forms)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
        
        if (input.type === 'email' && !validateEmail(input.value)) {
            input.style.borderColor = 'red';
            isValid = false;
        }
    });
    
    return isValid;
}

// Sticky Header on Scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// Log page load for analytics
console.log('Homepage loaded successfully');



//support  and contact page only
// Function to handle the visibility logic ON SUPPORT FORM
function handleCategoryChange() {
  // Get the selected value from the dropdown
  const selectedCategory = document.getElementById('category-select').value;
  
  // Get all category-specific field containers
  const specificFields = document.querySelectorAll('.category-specific');
  
  // Hide all specific field containers first
  specificFields.forEach(field => {
    field.style.display = 'none';
  });
  
  // Determine which specific container to show based on the selection
  if (selectedCategory === 'Farmer' || selectedCategory === 'Distributor') {
    document.getElementById('farmer-fields').style.display = 'block';
  } else if (selectedCategory === 'Partner') {
    document.getElementById('partner-fields').style.display = 'block';
  } else if (selectedCategory === 'Media') {
    document.getElementById('media-fields').style.display = 'block';
  }
  // If 'Other' or 'Select Category' is chosen, none will be shown (as intended)
}

// Get the category select element
const categorySelect = document.getElementById('category-select');

// Add an event listener to call the function whenever the selection changes
categorySelect.addEventListener('change', handleCategoryChange);

// Optional: Call the function once on page load to set the initial state (hidden)
handleCategoryChange();


