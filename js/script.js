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
    sedan: {
        perKm: 16,
        perDay: 2000,
        name: 'Sedan (Dzire / Amaze / Etios)',
        brandExample: 'Maruti Suzuki Dzire, Honda Amaze, Toyota Etios'
    },
    suv: {
        perKm: 18,
        perDay: 2000,
        name: 'SUV (Innova Crysta / XUV700 / Scorpio)',
        brandExample: 'Toyota Innova Crysta, Mahindra XUV700, Scorpio, Ertiga'
    },
    traveller: {
        perKm: 20,
        perDay: 3000,
        name: 'Force Traveller (12-20 Seater)',
        brandExample: 'Force Traveller 12 / 17 / 20 Seater Luxury AC'
    },
    // Backwards compatibility for legacy 'car'
    car: {
        perKm: 16,
        perDay: 2000,
        name: 'Sedan (Dzire / Amaze / Etios)',
        brandExample: 'Maruti Suzuki Dzire, Honda Amaze, Toyota Etios'
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
    const rate = pricing[vehicle] || pricing.sedan;

    const kmCharge = totalKm * rate.perKm;
    const dayCharge = days * rate.perDay;
    const total = Math.max(kmCharge, dayCharge);

    // Update estimate display
    document.getElementById('est-vehicle').textContent = rate.name;
    document.getElementById('est-destination').textContent = distances[dest]?.name || 'Custom';
    document.getElementById('est-distance').textContent = totalKm + ' km (round trip)';
    document.getElementById('est-km-charge').textContent = '₹' + kmCharge.toLocaleString('en-IN') + ` (@ ₹${rate.perKm}/km)`;
    document.getElementById('est-day-charge').textContent = '₹' + dayCharge.toLocaleString('en-IN') + ` (@ ₹${rate.perDay}/day)`;
    document.getElementById('est-total').textContent = '₹' + total.toLocaleString('en-IN');

    if (estimateBox) estimateBox.classList.add('show');
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
    const kmCharge = totalKm * rate.perKm;
    const dayCharge = parseInt(numDays) * rate.perDay;
    const total = Math.max(kmCharge, dayCharge);

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
