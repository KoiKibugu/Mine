// Store JavaScript - Enhanced with Cart, Search, Checkout, and User Profile Functionality
// This file powers the storefront UI and e-commerce features

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle Functionality
    const menuBtn = document.getElementById('menuBtn');
    const navContainer = document.querySelector('.nav-container'); // This is the container we will collapse/expand

    if (menuBtn && navContainer) {
        menuBtn.addEventListener('click', () => {
            // Toggle an 'active' class on the hamburger icon for potential animation
            menuBtn.classList.toggle('active');
            // Toggle a 'nav-open' class on the container to show/hide the menu items (requires CSS)
            navContainer.classList.toggle('nav-open');
            
            // Accessibility improvement: toggle aria-expanded attribute
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
            menuBtn.setAttribute('aria-expanded', !isExpanded);
        });
    } else {
        console.error("Error: Menu button or navigation container not found.");
    }

    // 2. Search Functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (searchBtn && searchInput) {
        // Add event listener for the button click
        searchBtn.addEventListener('click', handleSearch);

        // Add event listener for pressing 'Enter' key in the input field
        searchInput.addEventListener('keypress', (event) => {
            // Check if the key pressed is 'Enter' (keyCode 13 or event.key 'Enter')
            if (event.key === 'Enter') {
                handleSearch();
            }
        });
    } else {
        console.error("Error: Search input or button not found.");
    }

    function handleSearch() {
        const query = searchInput.value.trim();
        if (query) {
            console.log("Search initiated for:", query);
            // In a real application, you would redirect the user to a search results page

            alert(`Searching for: ${query}`); // Placeholder for actual search logic
            searchInput.value = ''; // Optional: clear input after search
        } else {
            alert("Please enter a search term.");
        }
    }

    // 3. User Action Button Handlers (Cart and Sign In)
    const cartBtn = document.getElementById('cartBtn');
    const signInBtn = document.getElementById('signInBtn');

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            // Placeholder: Redirect to cart page or open a modal
            // window.location.href = '/cart.html';
            alert('Opening the shopping cart...');
        });
    }

    if (signInBtn) {
        signInBtn.addEventListener('click', () => {
            // Placeholder: Redirect to sign-in page or open a modal
            // window.location.href = '/sign-in.html';
            alert('Redirecting to sign-in page...');
        });
    }
});

//Cart optimization
let currentSlideIndex = 1; // current active slide index (1-based)

// Product data structure for cart management
const productData = {
    "Nomad Cans - 10L": {  image: "../images/NOMAD%2010%20LTRS.png" },
    "Nomad Cans - 25L": { image: "../images/nomad%2025.JPG" },
    "Nomad Cans - 50L": {  image: "../images/NOMAD%20CANS.jpeg" },
    "IWD Ice Water Dispenser": {  image: "../images/IWD.jpg" },
    "Eco-Sav Thermal Bags": {  image: "../images/Eco-Sav%20bag.jpg" },
    "MaziwaPlus Prechillers 300-1000L": {  image: "../images/M+%20PRE%20CHILLER.JPG" },
    "MaziwaPlus Prechillers Pro 200-2000L": {  image: "../images/pre%20chillers%20PRO.jpg" },
    "BMC Hybrid Milk Cooler": { image: "../images/HYBRID%20BMC.jpeg" },
    "BMC Solar Milk Cooler": { image: "../images/SOLAR%20BMC.jpg" },
    "Eco-Sav Pasteurizer 100-500L": {  image: "../images/PASTUERIZER.jpg" },
    "MaziwaPlus DMS": {  image: "../images/M+%20DMS.png", subscription: true },
    "Eco-Sav Solar Dryer": {  image: "../images/dryer.JPG" }
};

// Cart management using localStorage
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
    }

    loadCart() {
        const saved = localStorage.getItem('savanna_cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('savanna_cart', JSON.stringify(this.items));
        this.updateCartBadge();
    }

    addItem(productName) {
        const existingItem = this.items.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            const product = productData[productName];
            if (product) {
                this.items.push({
                    name: productName,
                    quantity: 1,
                    image: product.image,
                    subscription: product.subscription || false
                });
            }
        }
        this.saveCart();
    }

    removeItem(productName) {
        this.items = this.items.filter(item => item.name !== productName);
        this.saveCart();
    }

    updateQuantity(productName, quantity) {
        const item = this.items.find(item => item.name === productName);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    clear() {
        this.items = [];
        this.saveCart();
    }

    updateCartBadge() {
        const count = this.getItemCount();
        let badge = document.querySelector('.cart-badge');
        
        if (count > 0) {
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'cart-badge';
                document.getElementById('cartBtn').appendChild(badge);
            }
            badge.textContent = count;
        } else if (badge) {
            badge.remove();
        }
    }
}

// Initialize cart
const cart = new ShoppingCart();

// User authentication management
class UserAuth {
    constructor() {
        this.currentUser = this.loadUser();
    }

    loadUser() {
        const saved = localStorage.getItem('savanna_user');
        return saved ? JSON.parse(saved) : null;
    }

    saveUser(user) {
        localStorage.setItem('savanna_user', JSON.stringify(user));
        this.currentUser = user;
        this.updateUserIcon();
    }

    signIn(name, password) {
        // Simple validation - in production, this would call an API
        if (name && password.length >= 6) {
            const user = { name: name.split('')[0] };
            this.saveUser(user);
            return true;
        }
        return false;
    }

    signUp(name, password) {
        // Simple validation - in production, this would call an API
        if (name && password.length >= 6) {
            const user = { name:name.split('')[0] };
            this.saveUser(user);
            return true;
        }
        return false;
    }

    signOut() {
        localStorage.removeItem('savanna_user');
        this.currentUser = null;
        this.updateUserIcon();
    }

    isSignedIn() {
        return this.currentUser !== null;
    }

    updateUserIcon() {
        const signInBtn = document.getElementById('signInBtn');
        if (this.isSignedIn()) {
            signInBtn.title = `Signed in as ${this.currentUser.name}`;
            signInBtn.innerHTML = '<div class="icon" id="signInBtn" title="Sign In" aria-label="Sign In"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="Black" class="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg></div>✓';
        } else {
            signInBtn.title = 'Sign In';
            signInBtn.innerHTML = '<div class="icon" id="signInBtn" title="Sign In" aria-label="Sign In"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="Black" class="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg></div>';
        }
    }
}

// Initialize user auth
const userAuth = new UserAuth();

// Initialize slideshow and filter button state when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    showSlide(currentSlideIndex);
    setupFilterButtons();
    setupAddToCartButtons();
    cart.updateCartBadge();
    userAuth.updateUserIcon();
});

// Slideshow navigation handlers
function changeSlide(n) {
    showSlide(currentSlideIndex += n);
}

function currentSlide(n) {
    showSlide(currentSlideIndex = n);
}

// Render slide state and dot indicators
function showSlide(n) {
    const slides = document.getElementsByClassName('slide');
    const dots = document.getElementsByClassName('dot');

    if (slides.length === 0) return;

    if (n > slides.length) currentSlideIndex = 1;
    if (n < 1) currentSlideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) slides[i].classList.remove('active');
    for (let i = 0; i < dots.length; i++) dots[i].classList.remove('active');

    slides[currentSlideIndex - 1].classList.add('active');
    if (dots.length > 0) dots[currentSlideIndex - 1].classList.add('active');
}

// Auto-advance slideshow every 8 seconds
setInterval(function() { 
    if (document.getElementsByClassName('slide').length > 0) {
        changeSlide(1); 
    }
}, 8000);

// Search functionality
document.getElementById("searchBtn").addEventListener("click", performSearch);
document.getElementById("searchInput").addEventListener("keypress", function(e) {
    if (e.key === 'Enter') performSearch();
});

function performSearch() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();
    
    if (searchTerm === "") {
        alert("Please enter a search term.");
        return;
    }

    const productCards = document.querySelectorAll('.product-card');
    let foundCount = 0;

    productCards.forEach(card => {
        const productName = card.querySelector('h4').textContent.toLowerCase();
        const productDesc = card.querySelector('.product-description')?.textContent.toLowerCase() || '';
        
        if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
            card.style.display = 'block';
            card.parentElement.parentElement.style.display = 'block';
            foundCount++;
            
            // Highlight the search term
            card.style.border = '2px solid #6c3f18';
            card.style.boxShadow = '0 4px 12px rgba(108, 63, 24, 0.3)';
        } else {
            card.style.display = 'none';
        }
    });

    if (foundCount === 0) {
        alert(`No products found matching "${searchTerm}"`);
        // Reset all products to visible
        productCards.forEach(card => {
            card.style.display = 'block';
            card.style.border = '';
            card.style.boxShadow = '';
        });
    } else {
        // Scroll to products section
        const productsSection = document.querySelector('.products-showcase');
        if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Cart button - show cart modal
document.getElementById("cartBtn").addEventListener("click", showCartModal);

function showCartModal() {
    const modal = createCartModal();
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function createCartModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content cart-modal">
            <div class="modal-header">
                <h2><div class="icon" id="cartBtn" title="Cart" aria-label="Cart"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="black" class="bi bi-cart4" viewBox="0 0 16 16"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/></svg></div>Shopping Cart</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove(); document.body.style.overflow='auto';">&times;</button>
            </div>
            <div class="modal-body">
                ${cart.items.length === 0 ? 
                    '<p class="empty-cart">Your cart is empty. Start shopping!</p>' :
                    `<div class="cart-items">
                        ${cart.items.map(item => `
                            <div class="cart-item">
                                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                                <div class="cart-item-details">
                                    <h4>${item.name}</h4>
                                    <p class="cart-item-price">KSH ${item.price.toLocaleString()}${item.subscription ? '/month' : ''}</p>
                                </div>
                                <div class="cart-item-quantity">
                                    <button onclick="updateCartItemQuantity('${item.name}', ${item.quantity - 1})">-</button>
                                    <span>${item.quantity}</span>
                                    <button onclick="updateCartItemQuantity('${item.name}', ${item.quantity + 1})">+</button>
                                </div>
                                <div class="cart-item-total">
                                    KSH ${(item.price * item.quantity).toLocaleString()}
                                </div>
                                <button class="cart-item-remove" onclick="removeCartItem('${item.name}')"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="black" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg></button>
                            </div>
                        `).join('')}
                    </div>
                    <div class="cart-summary">
                        <div class="cart-total">
                            <strong>Total:</strong>
                            <strong>KSH ${cart.getTotal().toLocaleString()}</strong>
                        </div>
                    </div>`
                }
            </div>
            <div class="modal-footer">
                ${cart.items.length > 0 ? `
                    <button class="cta-button secondary" onclick="cart.clear(); this.closest('.modal-overlay').remove(); document.body.style.overflow='auto';">Clear Cart</button>
                    <button class="cta-button primary" onclick="proceedToCheckout()">Proceed to Checkout</button>
                ` : `
                    <button class="cta-button primary" onclick="this.closest('.modal-overlay').remove(); document.body.style.overflow='auto';">Continue Shopping</button>
                `}
            </div>
        </div>
    `;
    return modal;
}

function updateCartItemQuantity(productName, newQuantity) {
    if (newQuantity < 1) {
        removeCartItem(productName);
        return;
    }
    cart.updateQuantity(productName, newQuantity);
    // Refresh modal
    document.querySelector('.modal-overlay').remove();
    showCartModal();
}

function removeCartItem(productName) {
    if (confirm(`Remove ${productName} from cart?`)) {
        cart.removeItem(productName);
        document.querySelector('.modal-overlay').remove();
        document.body.style.overflow = 'auto';
        if (cart.items.length > 0) {
            showCartModal();
        }
    }
}

// Checkout functionality
function proceedToCheckout() {
    if (!userAuth.isSignedIn()) {
        alert('Please sign in to proceed with checkout.');
        document.querySelector('.modal-overlay').remove();
        document.body.style.overflow = 'auto';
        showSignInModal();
        return;
    }

    // Create WhatsApp message with cart items
    const items = cart.items.map(item => 
        `${item.name} x${item.quantity} - KSH ${(item.price * item.quantity).toLocaleString()}`
    ).join('%0A');
    
    const total = cart.getTotal().toLocaleString();
    const message = `Hello Savanna Circuit,%0A%0AI would like to place an order:%0A%0A${items}%0A%0ATotal: KSH ${total}%0A%0AName: ${userAuth.currentUser.name}%0AEmail: ${userAuth.currentUser.email}`;
    
    const whatsappUrl = `https://wa.me/254714574007?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank', 'noopener');
    
    // Clear cart after checkout
    setTimeout(() => {
        if (confirm('Your order has been sent via WhatsApp. Would you like to clear your cart?')) {
            cart.clear();
            document.querySelector('.modal-overlay').remove();
            document.body.style.overflow = 'auto';
        }
    }, 1000);
}

// Sign in button
document.getElementById("signInBtn").addEventListener("click", function() {
    if (userAuth.isSignedIn()) {
        showUserProfileModal();
    } else {
        showSignInModal();
    }
});

function showSignInModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content auth-modal">
            <div class="modal-header">
                <h2><div class="icon" id="signInBtn" title="Sign In" aria-label="Sign In"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="black" class="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg></div>Sign In</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove(); document.body.style.overflow='auto';">&times;</button>
            </div>
            <div class="modal-body">
                <form id="signInForm" onsubmit="handleSignIn(event)">
                    <div class="form-group">
                        <label for="signUpName">Name</label>
                        <input type="Name" id="signUpName" required placeholder="Your Name">
                    </div>
                    <div class="form-group">
                        <label for="signInPassword">Password</label>
                        <input type="password" id="signInPassword" required placeholder="Min. 6 characters" minlength="6">
                    </div>
                    <button type="submit" class="cta-button primary full-width">Sign In</button>
                </form>
                <div class="auth-divider">
                    <span>Don't have an account?</span>
                </div>
                <button class="cta-button secondary full-width" onclick="showSignUpModal()">Create Account</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function showSignUpModal() {
    document.querySelector('.modal-overlay')?.remove();
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content auth-modal">
            <div class="modal-header">
                <h2><div class="icon" id="signInBtn" title="Sign In" aria-label="Sign In"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="Black" class="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg></div> Create Account</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove(); document.body.style.overflow='auto';">&times;</button>
            </div>
            <div class="modal-body">
                <form id="signUpForm" onsubmit="handleSignUp(event)">
                    <div class="form-group">
                        <label for="signUpName">Full Name</label>
                        <input type="text" id="signUpName" required placeholder="John Doe">
                    </div>
                    <div class="form-group">
                        <label for="signUpPassword">Password</label>
                        <input type="password" id="signUpPassword" required placeholder="Min. 6 characters" minlength="6">
                    </div>
                    <button type="submit" class="cta-button primary full-width">Create Account</button>
                </form>
                <div class="auth-divider">
                    <span>Already have an account?</span>
                </div>
                <button class="cta-button secondary full-width" onclick="showSignInModal()">Sign In</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function showUserProfileModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content profile-modal">
            <div class="modal-header">
                <h2><div class="icon" id="signInBtn" title="Sign In" aria-label="Sign In"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="Black" class="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg></div>My Profile</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove(); document.body.style.overflow='auto';">&times;</button>
            </div>
            <div class="modal-body">
                <div class="profile-info">
                    <div class="profile-avatar"<div class="icon" id="signInBtn" title="Sign In" aria-label="Sign In"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="Black" class="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg></div></div>
                    <h3>${userAuth.currentUser.name}</h3>
                </div>
                <div class="profile-actions">
                    <button class="cta-button secondary full-width" onclick="showCartModal(); document.querySelector('.profile-modal').closest('.modal-overlay').remove();">
                    <div class="icon" id="cartBtn" title="Cart" aria-label="Cart"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="black" class="bi bi-cart4" viewBox="0 0 16 16"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/></svg></div>View Cart (${cart.getItemCount()} items)
                    </button>
                    <button class="cta-button secondary full-width" onclick="handleSignOut()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="black" class="bi bi-door-closed-nofill" viewBox="0 0 16 16"><path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/></svg>Sign Out
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function handleSignIn(event) {
    event.preventDefault();
    const name = document.getElementById('signUpName').value;
    const password = document.getElementById('signInPassword').value;
    
    if (userAuth.signIn(name, password)) {
        alert('Successfully signed in!');
        document.querySelector('.modal-overlay').remove();
        document.body.style.overflow = 'auto';
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

function handleSignUp(event) {
    event.preventDefault();
    const name = document.getElementById('signUpName').value;
    const password = document.getElementById('signUpPassword').value;
    
    if (userAuth.signUp(name, email, password)) {
        alert('Account created successfully!');
        document.querySelector('.modal-overlay').remove();
        document.body.style.overflow = 'auto';
    } else {
        alert('Error creating account. Please try again.');
    }
}

function handleSignOut() {
    if (confirm('Are you sure you want to sign out?')) {
        userAuth.signOut();
        document.querySelector('.modal-overlay').remove();
        document.body.style.overflow = 'auto';
        alert('You have been signed out.');
    }
}

// Setup Add to Cart buttons
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.getAttribute('data-product');
            cart.addItem(productName);
            
            // Visual feedback
            const originalText = this.textContent;
            this.textContent = '✓ Added!';
            this.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 1500);
        });
    });
}

// Initialize category filter button active state and click behavior
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Clear any search highlights
            document.querySelectorAll('.product-card').forEach(card => {
                card.style.border = '';
                card.style.boxShadow = '';
            });
        });
    });
}

// Filter product categories
function filterProducts(category) {
    const categories = document.querySelectorAll('.product-category');

    if (category === 'all') {
        categories.forEach(cat => { cat.style.display = 'block'; });
    } else {
        categories.forEach(cat => { cat.style.display = 'none'; });

        if (category === 'solar-cooling') {
            document.getElementById('solar-cooling').style.display = 'block';
        } else if (category === 'solar-thrive') {
            document.getElementById('solar-thrive').style.display = 'block';
        } else if (category === 'management-systems') {
            document.getElementById('management-systems').style.display = 'block';
        } else if (category === 'drying-systems') {
            document.getElementById('drying-systems').style.display = 'block';
        }
    }

    const productsSection = document.querySelector('.products-showcase');
    if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Mobile hamburger menu support
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth scroll for in-page anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#checkout') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

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