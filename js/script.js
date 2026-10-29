// ===== SRI DEVI GROUPS - Main JavaScript =====

// ===== LOGIN FUNCTIONALITY =====
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('login-error');
    
    // Demo credentials
    const validUsers = {
        'admin': 'admin123',
        'sridevi': 'sridevi123',
        'user': 'user123'
    };
    
    if (validUsers[username] && validUsers[username] === password) {
        // Store login state
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username', username);
        
        // Show success animation
        const btn = event.target.querySelector('.login-btn');
        btn.innerHTML = '✓ Success! Redirecting...';
        btn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        errorEl.style.display = 'block';
        errorEl.textContent = '⚠ Invalid username or password. Try admin/admin123';
        
        // Shake animation
        const container = document.querySelector('.login-container');
        container.style.animation = 'shake 0.5s ease';
        setTimeout(() => container.style.animation = '', 500);
    }
}

// ===== CHECK AUTH =====
function checkAuth() {
    const loggedIn = sessionStorage.getItem('loggedIn');
    const protectedPages = ['dashboard.html', 'tours.html', 'catering.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !loggedIn) {
        window.location.href = 'index.html';
    }
}

// ===== LOGOUT =====
function logout() {
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('username');
    window.location.href = 'index.html';
}

// ===== NAVBAR SCROLL =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// ===== WELCOME USERNAME =====
function setWelcomeUser() {
    const usernameEl = document.getElementById('welcome-user');
    if (usernameEl) {
        const username = sessionStorage.getItem('username') || 'User';
        usernameEl.textContent = username.charAt(0).toUpperCase() + username.slice(1);
    }
}

// ===== DISTANCE DATA (from Pollachi) =====
const distances = {
    'coimbatore': { name: 'Coimbatore', km: 40 },
    'palakkad': { name: 'Palakkad', km: 50 },
    'thrissur': { name: 'Thrissur', km: 120 },
    'kochi': { name: 'Kochi', km: 190 },
    'madurai': { name: 'Madurai', km: 200 },
    'trichy': { name: 'Tiruchirappalli', km: 260 },
    'salem': { name: 'Salem', km: 210 },
    'erode': { name: 'Erode', km: 120 },
    'ooty': { name: 'Ooty', km: 95 },
    'kodaikanal': { name: 'Kodaikanal', km: 150 },
    'munnar': { name: 'Munnar', km: 160 },
    'chennai': { name: 'Chennai', km: 510 },
    'bangalore': { name: 'Bangalore', km: 370 },
    'mysore': { name: 'Mysore', km: 280 },
    'pondicherry': { name: 'Pondicherry', km: 400 },
    'tirunelveli': { name: 'Tirunelveli', km: 310 },
    'kanyakumari': { name: 'Kanyakumari', km: 370 },
    'rameshwaram': { name: 'Rameshwaram', km: 380 },
    'thanjavur': { name: 'Thanjavur', km: 300 },
    'tirupati': { name: 'Tirupati', km: 550 },
    'hyderabad': { name: 'Hyderabad', km: 750 },
    'goa': { name: 'Goa', km: 850 },
    'mumbai': { name: 'Mumbai', km: 1100 },
    'delhi': { name: 'Delhi', km: 2200 },
    'jaipur': { name: 'Jaipur', km: 2000 },
    'kolkata': { name: 'Kolkata', km: 1950 },
    'trivandrum': { name: 'Thiruvananthapuram', km: 300 },
    'vizag': { name: 'Visakhapatnam', km: 1100 },
    'custom': { name: 'Custom Distance', km: 0 }
};

// ===== PRICING =====
const pricing = {
    car: {
        perKm: 16,
        perDay: 2000,
        name: 'Standard Car'
    },
    traveller: {
        perKm: 20,
        perDay: 3000,
        name: 'Traveller'
    }
};

// ===== CALCULATE ESTIMATE =====
function calculateEstimate() {
    const destination = document.getElementById('destination');
    const vehicleType = document.getElementById('vehicle-type');
    const numDays = document.getElementById('num-days');
    const customKmGroup = document.getElementById('custom-km-group');
    const customKm = document.getElementById('custom-km');
    const estimateBox = document.getElementById('estimate-box');
    
    if (!destination || !vehicleType) return;
    
    // Show/hide custom km input
    if (destination.value === 'custom') {
        if (customKmGroup) customKmGroup.style.display = 'block';
    } else {
        if (customKmGroup) customKmGroup.style.display = 'none';
    }
    
    const dest = destination.value;
    const vehicle = vehicleType.value;
    const days = parseInt(numDays?.value) || 1;
    
    if (!dest || !vehicle) {
        if (estimateBox) estimateBox.classList.remove('show');
        return;
    }
    
    let km;
    if (dest === 'custom') {
        km = parseInt(customKm?.value) || 0;
        if (km === 0) {
            if (estimateBox) estimateBox.classList.remove('show');
            return;
        }
    } else {
        km = distances[dest]?.km || 0;
    }
    
    // Round trip
    const totalKm = km * 2;
    const rate = pricing[vehicle];
    
    const kmCharge = totalKm * rate.perKm;
    const dayCharge = days * rate.perDay;
    const total = Math.max(kmCharge, dayCharge);
    
    // Update estimate display
    document.getElementById('est-vehicle').textContent = rate.name;
    document.getElementById('est-destination').textContent = distances[dest]?.name || 'Custom';
    document.getElementById('est-distance').textContent = totalKm + ' km (round trip)';
    document.getElementById('est-km-charge').textContent = '₹' + kmCharge.toLocaleString('en-IN');
    document.getElementById('est-day-charge').textContent = '₹' + dayCharge.toLocaleString('en-IN');
    document.getElementById('est-total').textContent = '₹' + total.toLocaleString('en-IN');
    
    if (estimateBox) estimateBox.classList.add('show');
}

// ===== BOOKING FORM =====
function handleBooking(event) {
    event.preventDefault();
    
    const name = document.getElementById('booking-name')?.value;
    const phone = document.getElementById('booking-phone')?.value;
    const destination = document.getElementById('destination')?.value;
    const vehicleType = document.getElementById('vehicle-type')?.value;
    const travelDate = document.getElementById('travel-date')?.value;
    
    if (!name || !phone || !destination || !vehicleType || !travelDate) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Show success modal
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.classList.add('show');
        document.getElementById('modal-name').textContent = name;
    }
}

function closeModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) modal.classList.remove('show');
}

// ===== CONTACT FORM =====
function handleContact(event) {
    event.preventDefault();
    alert('✅ Thank you for your message! We will get back to you shortly.');
    event.target.reset();
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== PAGE LOADER =====
function initLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => loader.classList.add('hide'), 500);
        });
    }
}

// ===== ROUTE CARDS CLICK =====
function selectRoute(destination) {
    const destSelect = document.getElementById('destination');
    if (destSelect) {
        destSelect.value = destination;
        calculateEstimate();
        destSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ===== CATERING MENU TABS =====
function switchMenuTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // Show/hide menu items
    const category = tab.dataset.category;
    document.querySelectorAll('.menu-item').forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// ===== SMOOTH SCROLL =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== CSS SHAKE ANIMATION =====
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initNavbar();
    setWelcomeUser();
    initBackToTop();
    initLoader();
    
    // Set minimum date for travel date picker
    const dateInput = document.getElementById('travel-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Menu tabs
    document.querySelectorAll('.menu-tab').forEach(tab => {
        tab.addEventListener('click', () => switchMenuTab(tab));
    });
});

