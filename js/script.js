// ===== SRI DEVI GROUPS - Main JavaScript =====
// ===== EmailJS Configuration =====
// IMPORTANT: Replace these with your actual EmailJS credentials
// Sign up at https://www.emailjs.com (free for 200 emails/month)
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';      // Get from: EmailJS Dashboard > Account > API Keys
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';      // Get from: EmailJS Dashboard > Email Services
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';    // Get from: EmailJS Dashboard > Email Templates

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

// ===== DISTANCE & COORDINATES DATA (from Pollachi) =====
// Pollachi coordinates: [10.6609, 77.0048]
const distances = {
    'coimbatore': { name: 'Coimbatore', km: 40, state: 'Tamil Nadu', lat: 11.0168, lng: 76.9558 },
    'palakkad': { name: 'Palakkad', km: 50, state: 'Kerala', lat: 10.7867, lng: 76.6548 },
    'thrissur': { name: 'Thrissur', km: 120, state: 'Kerala', lat: 10.5276, lng: 76.2144 },
    'kochi': { name: 'Kochi', km: 190, state: 'Kerala', lat: 9.9312, lng: 76.2673 },
    'madurai': { name: 'Madurai', km: 200, state: 'Tamil Nadu', lat: 9.9252, lng: 78.1198 },
    'trichy': { name: 'Tiruchirappalli', km: 260, state: 'Tamil Nadu', lat: 10.7905, lng: 78.7047 },
    'salem': { name: 'Salem', km: 210, state: 'Tamil Nadu', lat: 11.6643, lng: 78.1460 },
    'erode': { name: 'Erode', km: 120, state: 'Tamil Nadu', lat: 11.3410, lng: 77.7172 },
    'ooty': { name: 'Ooty', km: 95, state: 'Tamil Nadu', lat: 11.4102, lng: 76.6950 },
    'kodaikanal': { name: 'Kodaikanal', km: 150, state: 'Tamil Nadu', lat: 10.2381, lng: 77.4892 },
    'munnar': { name: 'Munnar', km: 160, state: 'Kerala', lat: 10.0889, lng: 77.0595 },
    'chennai': { name: 'Chennai', km: 510, state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
    'bangalore': { name: 'Bangalore', km: 370, state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
    'mysore': { name: 'Mysore', km: 280, state: 'Karnataka', lat: 12.2958, lng: 76.6394 },
    'pondicherry': { name: 'Pondicherry', km: 400, state: 'Puducherry', lat: 11.9416, lng: 79.8083 },
    'tirunelveli': { name: 'Tirunelveli', km: 310, state: 'Tamil Nadu', lat: 8.7139, lng: 77.7567 },
    'kanyakumari': { name: 'Kanyakumari', km: 370, state: 'Tamil Nadu', lat: 8.0883, lng: 77.5385 },
    'rameshwaram': { name: 'Rameshwaram', km: 380, state: 'Tamil Nadu', lat: 9.2876, lng: 79.3129 },
    'thanjavur': { name: 'Thanjavur', km: 300, state: 'Tamil Nadu', lat: 10.7870, lng: 79.1378 },
    'tirupati': { name: 'Tirupati', km: 550, state: 'Andhra Pradesh', lat: 13.6288, lng: 79.4192 },
    'hyderabad': { name: 'Hyderabad', km: 750, state: 'Telangana', lat: 17.3850, lng: 78.4867 },
    'goa': { name: 'Goa', km: 850, state: 'Goa', lat: 15.2993, lng: 74.1240 },
    'mumbai': { name: 'Mumbai', km: 1100, state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
    'delhi': { name: 'Delhi', km: 2200, state: 'Delhi NCR', lat: 28.7041, lng: 77.1025 },
    'jaipur': { name: 'Jaipur', km: 2000, state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
    'kolkata': { name: 'Kolkata', km: 1950, state: 'West Bengal', lat: 22.5726, lng: 88.3639 },
    'trivandrum': { name: 'Thiruvananthapuram', km: 300, state: 'Kerala', lat: 8.5241, lng: 76.9366 },
    'vizag': { name: 'Visakhapatnam', km: 1100, state: 'Andhra Pradesh', lat: 17.6868, lng: 83.2185 },
    'custom': { name: 'Custom Distance', km: 0, state: 'India', lat: null, lng: null }
};

// Pollachi Origin Coordinates
const POLLACHI_COORDS = [10.6609, 77.0048];

// ===== PRICING =====
// Updated rates:
// Sedan: ₹18/km, ₹2000/day
// SUV / XUV: ₹20/km, ₹2000/day
// Traveller: ₹22/km, ₹2500/day
// Bikes (Self Drive / Rentals):
// Classic 350 (Men): ₹1,200/day (Unlimited km / ₹6/km fuel standard)
// TVS Jupiter (Women): ₹600/day
const pricing = {
    sedan: {
        perKm: 18,
        perDay: 2000,
        name: 'Sedan (Dzire / Amaze / Etios)',
        brandExample: 'Maruti Suzuki Dzire, Honda Amaze, Toyota Etios',
        isBike: false
    },
    suv: {
        perKm: 20,
        perDay: 2000,
        name: 'SUV / XUV (Innova Crysta / XUV700 / Scorpio / Ertiga)',
        brandExample: 'Toyota Innova Crysta, Mahindra XUV700, Scorpio, Ertiga',
        isBike: false
    },
    traveller: {
        perKm: 22,
        perDay: 2500,
        name: 'Force Traveller (12-20 Seater Luxury AC)',
        brandExample: 'Force Traveller 12 / 17 / 20 Seater Luxury AC',
        isBike: false
    },
    'bike-classic': {
        perKm: 6,
        perDay: 1200,
        name: 'Royal Enfield Classic 350 (For Men)',
        brandExample: 'Royal Enfield Classic 350cc - Stealth / Chrome with Helmet',
        isBike: true
    },
    'scooter-jupiter': {
        perKm: 4,
        perDay: 600,
        name: 'TVS Jupiter 110/125 (For Women & Easy Commute)',
        brandExample: 'TVS Jupiter with Easy Electric Start & Helmet',
        isBike: true
    },
    // Backwards compatibility
    car: {
        perKm: 18,
        perDay: 2000,
        name: 'Sedan (Dzire / Amaze / Etios)',
        brandExample: 'Maruti Suzuki Dzire, Honda Amaze, Toyota Etios',
        isBike: false
    }
};

// ===== CALCULATE ESTIMATE & UPDATE MAP =====
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
    const rate = pricing[vehicle] || pricing.sedan;

    let kmCharge = 0;
    let dayCharge = 0;
    let total = 0;

    if (rate.isBike) {
        // For bikes, rental is primarily per day
        dayCharge = days * rate.perDay;
        kmCharge = totalKm > 0 ? totalKm * rate.perKm : 0;
        total = dayCharge; // Fixed daily rental
    } else {
        kmCharge = totalKm * rate.perKm;
        dayCharge = days * rate.perDay;
        total = Math.max(kmCharge, dayCharge);
    }

    // Update estimate display
    document.getElementById('est-vehicle').textContent = rate.name;
    document.getElementById('est-destination').textContent = distances[dest]?.name || 'Custom';
    document.getElementById('est-distance').textContent = totalKm + ' km (round trip from Pollachi)';
    
    if (rate.isBike) {
        document.getElementById('est-km-charge').textContent = 'Included standard';
        document.getElementById('est-day-charge').textContent = '₹' + dayCharge.toLocaleString('en-IN') + ` (₹${rate.perDay}/day x ${days} days)`;
    } else {
        document.getElementById('est-km-charge').textContent = '₹' + kmCharge.toLocaleString('en-IN') + ` (@ ₹${rate.perKm}/km)`;
        document.getElementById('est-day-charge').textContent = '₹' + dayCharge.toLocaleString('en-IN') + ` (@ ₹${rate.perDay}/day)`;
    }
    document.getElementById('est-total').textContent = '₹' + total.toLocaleString('en-IN');

    if (estimateBox) estimateBox.classList.add('show');

    // Update India Interactive Map Route
    updateMapRoute(dest, totalKm);
}

// ===== LEAFLET INDIA ROUTE MAP =====
let indiaMap = null;
let pollachiMarker = null;
let destinationMarker = null;
let routeLine = null;

function initIndiaMap() {
    const mapContainer = document.getElementById('india-route-map');
    if (!mapContainer || typeof L === 'undefined') return;

    if (indiaMap) {
        indiaMap.invalidateSize();
        return;
    }

    // Centered on South-Central India
    indiaMap = L.map('india-route-map', {
        scrollWheelZoom: false
    }).setView([15.5, 78.0], 5);

    // OpenStreetMap standard tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors | Sri Devi Groups'
    }).addTo(indiaMap);

    // Custom Icon for Pollachi (Origin)
    const pollachiIcon = L.divIcon({
        className: 'custom-map-pin origin-pin',
        html: `<div class="pin-badge origin"><span class="pin-dot"></span> 📍 <strong>Pollachi (Origin)</strong></div>`,
        iconSize: [160, 40],
        iconAnchor: [80, 20]
    });

    pollachiMarker = L.marker(POLLACHI_COORDS, { icon: pollachiIcon }).addTo(indiaMap);
    pollachiMarker.bindPopup(`<b>Sri Devi Groups Headquarters</b><br>Pollachi, Tamil Nadu<br>Trip Origin Point`);
}

function updateMapRoute(destKey, roundTripKm) {
    if (!indiaMap || typeof L === 'undefined') {
        initIndiaMap();
        if (!indiaMap) return;
    }

    const mapStatus = document.getElementById('map-route-status');
    const destData = distances[destKey];

    if (!destData || !destData.lat || !destData.lng) {
        if (mapStatus) {
            mapStatus.innerHTML = `<span>📍 Origin: <strong>Pollachi</strong></span> | <span>Custom / Unlisted destination chosen</span>`;
        }
        return;
    }

    const destCoords = [destData.lat, destData.lng];

    // Remove existing destination marker and line
    if (destinationMarker) indiaMap.removeLayer(destinationMarker);
    if (routeLine) indiaMap.removeLayer(routeLine);

    // Custom Icon for Destination
    const destIcon = L.divIcon({
        className: 'custom-map-pin dest-pin',
        html: `<div class="pin-badge dest"><span class="pin-pulse"></span> 🎯 <strong>${destData.name}</strong></div>`,
        iconSize: [150, 40],
        iconAnchor: [75, 20]
    });

    destinationMarker = L.marker(destCoords, { icon: destIcon }).addTo(indiaMap);
    destinationMarker.bindPopup(`<b>Destination: ${destData.name}</b><br>${destData.state}<br>One-way: ${destData.km} km | Round-trip: ${roundTripKm} km`).openPopup();

    // Curved or geodesic-like polyline
    routeLine = L.polyline([POLLACHI_COORDS, destCoords], {
        color: '#8B1A1A',
        weight: 5,
        opacity: 0.85,
        dashArray: '10, 10',
        lineCap: 'round'
    }).addTo(indiaMap);

    // Fit map bounds to show both points with padding
    const bounds = L.latLngBounds([POLLACHI_COORDS, destCoords]);
    indiaMap.fitBounds(bounds, { padding: [60, 60] });

    if (mapStatus) {
        mapStatus.innerHTML = `
            <div class="map-status-pill">📍 From: <strong>Pollachi, TN</strong></div>
            <div class="map-status-arrow">➔</div>
            <div class="map-status-pill dest">🎯 To: <strong>${destData.name} (${destData.state})</strong></div>
            <div class="map-status-pill distance">📏 Distance: <strong>${destData.km} km</strong> (Round trip: ${roundTripKm} km)</div>
        `;
    }
}

// ===== SEND EMAIL VIA EMAILJS =====
function sendEmail(templateParams, formType) {
    // Check if EmailJS is configured
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        // EmailJS not configured — show success anyway for demo
        console.log('EmailJS not configured. Form data:', templateParams);
        return Promise.resolve({ status: 200, text: 'Demo mode' });
    }

    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
}

// ===== BOOKING FORM (Tours & Travels) =====
function handleBooking(event) {
    event.preventDefault();

    const name = document.getElementById('booking-name')?.value;
    const phone = document.getElementById('booking-phone')?.value;
    const email = document.getElementById('booking-email')?.value;
    const destination = document.getElementById('destination');
    const vehicleType = document.getElementById('vehicle-type');
    const numDays = document.getElementById('num-days')?.value;
    const travelDate = document.getElementById('travel-date')?.value;
    const customKm = document.getElementById('custom-km')?.value;

    if (!name || !phone || !email || !destination?.value || !vehicleType?.value || !travelDate) {
        alert('Please fill in all required fields');
        return;
    }

    // Get destination name and calculate estimate
    const destName = destination.options[destination.selectedIndex]?.text || destination.value;
    const rate = pricing[vehicleType.value] || pricing.sedan;
    const vehicleName = `${rate.name} (₹${rate.perKm}/km, ₹${rate.perDay}/day)`;

    let km = destination.value === 'custom' ? (parseInt(customKm) || 0) : (distances[destination.value]?.km || 0);
    const totalKm = km * 2;
    let kmCharge = 0;
    let dayCharge = 0;
    let total = 0;

    if (rate.isBike) {
        dayCharge = parseInt(numDays) * rate.perDay;
        total = dayCharge;
    } else {
        kmCharge = totalKm * rate.perKm;
        dayCharge = parseInt(numDays) * rate.perDay;
        total = Math.max(kmCharge, dayCharge);
    }

    // Prepare email data
    const templateParams = {
        form_type: '🚗 Tour & Travel Booking',
        from_name: name,
        from_phone: phone,
        from_email: email,
        vehicle: vehicleName,
        destination: destName,
        travel_date: travelDate,
        num_days: numDays,
        distance: totalKm + ' km (round trip)',
        estimated_cost: '₹' + total.toLocaleString('en-IN'),
        message: `New booking request from ${name}.\nVehicle: ${vehicleName}\nDestination: ${destName}\nDate: ${travelDate}\nDays: ${numDays}\nDistance: ${totalKm} km (round trip)\nEstimated Cost: ₹${total.toLocaleString('en-IN')}`
    };

    // Disable button
    const btn = event.target.querySelector('.booking-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Sending...';
    btn.disabled = true;

    sendEmail(templateParams, 'booking')
        .then(() => {
            // Show success modal
            const modal = document.getElementById('booking-modal');
            if (modal) {
                modal.classList.add('show');
                document.getElementById('modal-name').textContent = name;
            }
            event.target.reset();
            const estimateBox = document.getElementById('estimate-box');
            if (estimateBox) estimateBox.classList.remove('show');
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            // Still show success for user experience
            const modal = document.getElementById('booking-modal');
            if (modal) {
                modal.classList.add('show');
                document.getElementById('modal-name').textContent = name;
            }
            event.target.reset();
        })
        .finally(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
}

function closeModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) modal.classList.remove('show');
}

// ===== CONTACT FORM =====
function handleContact(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.querySelector('input[type="text"]')?.value;
    const phone = form.querySelector('input[type="tel"]')?.value;
    const email = form.querySelector('input[type="email"]')?.value;
    const service = form.querySelector('select')?.value;
    const message = form.querySelector('textarea')?.value;

    if (!name || !phone || !email) {
        alert('Please fill in all required fields');
        return;
    }

    const templateParams = {
        form_type: '📋 Contact / Enquiry',
        from_name: name,
        from_phone: phone,
        from_email: email,
        service: service || 'General Enquiry',
        message: message || 'No additional message',
        destination: 'N/A',
        vehicle: 'N/A',
        travel_date: 'N/A',
        num_days: 'N/A',
        distance: 'N/A',
        estimated_cost: 'N/A'
    };

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Sending...';
    btn.disabled = true;

    sendEmail(templateParams, 'contact')
        .then(() => {
            alert('✅ Thank you ' + name + '! Your enquiry has been sent. We will contact you shortly.');
            form.reset();
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            alert('✅ Thank you ' + name + '! Your enquiry has been received. We will contact you shortly.');
            form.reset();
        })
        .finally(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
}

// ===== CATERING FORM =====
function handleCateringContact(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.querySelector('input[type="text"]')?.value;
    const phone = form.querySelector('input[type="tel"]')?.value;
    const email = form.querySelector('input[type="email"]')?.value;
    const eventType = form.querySelectorAll('select')[0]?.value;
    const guestCount = form.querySelectorAll('select')[1]?.value;
    const message = form.querySelector('textarea')?.value;

    if (!name || !phone || !email) {
        alert('Please fill in all required fields');
        return;
    }

    const templateParams = {
        form_type: '🍽️ Catering Enquiry',
        from_name: name,
        from_phone: phone,
        from_email: email,
        service: 'Catering - ' + (eventType || 'General'),
        message: `Event Type: ${eventType || 'N/A'}\nGuest Count: ${guestCount || 'N/A'}\nDetails: ${message || 'No additional details'}`,
        destination: 'N/A',
        vehicle: 'N/A',
        travel_date: 'N/A',
        num_days: 'N/A',
        distance: 'N/A',
        estimated_cost: 'N/A'
    };

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Sending...';
    btn.disabled = true;

    sendEmail(templateParams, 'catering')
        .then(() => {
            alert('✅ Thank you ' + name + '! Your catering enquiry has been sent. We will contact you with a quote shortly.');
            form.reset();
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            alert('✅ Thank you ' + name + '! Your enquiry has been received. We will contact you shortly.');
            form.reset();
        })
        .finally(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
}

// ===== SELECT VEHICLE SHORTCUT =====
function selectVehicle(type) {
    const vehicleSelect = document.getElementById('vehicle-type');
    if (vehicleSelect) {
        vehicleSelect.value = type;
        calculateEstimate();
        const bookingSection = document.getElementById('home') || document.querySelector('.hero-booking');
        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
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
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== CATERING MENU TABS =====
function switchMenuTab(tab) {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

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

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initBackToTop();
    initLoader();
    initIndiaMap();

    // Default route demo on map
    setTimeout(() => {
        const destSelect = document.getElementById('destination');
        if (destSelect && destSelect.value) {
            calculateEstimate();
        } else if (typeof updateMapRoute === 'function') {
            updateMapRoute('ooty', 190);
        }
    }, 600);

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

    // Initialize EmailJS if configured
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('✅ EmailJS initialized');
    } else {
        console.log('ℹ️ EmailJS not configured — forms will work in demo mode');
    }
});

// ===== FLEET FILTER =====
function filterFleet(category, btn) {
    document.querySelectorAll('.fleet-filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.vehicle-fleet-card').forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}
