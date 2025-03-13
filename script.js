// Navigation Toggle
function toggleNav() {
  const nav = document.querySelector('nav ul');
  nav.classList.toggle('active');
}

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

window.addEventListener('load', () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Hero Animation with GSAP
gsap.from('.animate-hero', {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.3,
  ease: 'power2.out',
});

// Interactive 3D-Style Campus Gallery
let currentItem = 0;
const galleryItems = document.querySelectorAll('.gallery-item');
const totalItems = galleryItems.length;

function showItem(index) {
  galleryItems.forEach((item, i) => {
    item.classList.remove('active');
    item.style.transform = `translateX(${(i - index) * 110}%) rotateY(${(i - index) * 15}deg) scale(${i === index ? 1 : 0.9})`;
    item.style.opacity = i === index ? 1 : 0.5;
    item.style.zIndex = totalItems - Math.abs(i - index);
  });
  galleryItems[index].classList.add('active');
}

function nextItem() {
  currentItem = (currentItem + 1) % totalItems;
  showItem(currentItem);
}

function prevItem() {
  currentItem = (currentItem - 1 + totalItems) % totalItems;
  showItem(currentItem);
}

function toggleZoom() {
  const activeItem = galleryItems[currentItem];
  const media = activeItem.querySelector('.gallery-media');
  openModal(media.src);
}

function openModal(src) {
  const modal = document.getElementById('modal');
  const modalMedia = document.getElementById('modal-media');
  if (src.endsWith('.mp4')) {
    const video = document.createElement('video');
    video.src = src;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;
    modalMedia.innerHTML = '';
    modalMedia.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = src;
    modalMedia.innerHTML = '';
    modalMedia.appendChild(img);
  }
  modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Animated Stats Section
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach((number) => {
    const target = parseInt(number.getAttribute('data-target'));
    gsap.to(number, {
      innerHTML: target,
      duration: 2,
      ease: 'power1.out',
      snap: { innerHTML: 1 }, // Ensure whole numbers
      onUpdate: function () {
        number.textContent = Math.floor(number.innerHTML);
      },
    });
  });
}

// Trigger stats animation with ScrollTrigger
document.addEventListener('DOMContentLoaded', () => {
  // Initialize gallery
  showItem(currentItem);

  // Add mouse move parallax effect for gallery
  const container = document.querySelector('.gallery-container');
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (mouseY - centerY) / 20;
    const rotateY = (mouseX - centerX) / -20;
    container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  container.addEventListener('mouseleave', () => {
    container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });

  // Stats Animation with GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.stat-item', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '#stats',
      start: 'top 80%', // Start animation when 80% of the section is in view
      toggleActions: 'play none none reset',
    },
    onComplete: animateStats,
  });
});

// Testimonial Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

// Student Portal Modal
function openStudentPortal() {
  document.getElementById('student-portal').style.display = 'flex';
}

function closeStudentPortal() {
  document.getElementById('student-portal').style.display = 'none';
}

function handlePortalLogin(event) {
  event.preventDefault();
  const message = document.getElementById('portal-message');
  message.textContent = 'Logging in...';
  setTimeout(() => {
    message.textContent = 'Login successful! (Demo)';
  }, 1000);
}

// Curriculum Filter
function filterCurriculum() {
  const filter = document.getElementById('curriculum-filter').value;
  const cards = document.querySelectorAll('.academics-card');
  cards.forEach(card => {
    if (filter === 'all' || card.getAttribute('data-category') === filter) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Tab Switching
function openTab(tabName) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
  document.querySelector(`[onclick="openTab('${tabName}')"]`).classList.add('active');
}

// Fees Calculator
function calculateFees() {
  const level = document.getElementById('fee-level').value;
  const extra = parseInt(document.getElementById('extra-fees').value) || 0;
  let baseFee = 0;
  switch (level) {
    case 'junior': baseFee = 500000; break;
    case 'senior': baseFee = 600000; break;
    case 'boarding': baseFee = 200000; break;
  }
  const total = baseFee + extra;
  document.getElementById('base-fees').textContent = `₦${baseFee.toLocaleString()}`;
  document.getElementById('additional-fees').textContent = `₦${extra.toLocaleString()}`;
  document.getElementById('fee-result').textContent = `₦${total.toLocaleString()}`;
}

// Payment Gateway Mock
function handlePayment(event) {
  event.preventDefault();
  const message = document.getElementById('payment-message');
  message.textContent = 'Payment processed successfully! (Mock)';
  message.style.color = 'green';
}

// Admission Form
function handleAdmissionSubmit(event) {
  event.preventDefault();
  const message = document.getElementById('form-message');
  message.textContent = 'Application submitted successfully! We will contact you soon.';
  message.style.color = 'green';
}

// Faculty Search and Filter
function searchFaculty() {
  const input = document.getElementById('faculty-search').value.toLowerCase();
  const cards = document.querySelectorAll('.faculty-card');
  cards.forEach(card => {
    const name = card.getAttribute('data-name').toLowerCase();
    if (name.includes(input)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function filterFaculty() {
  const filter = document.getElementById('faculty-filter').value;
  const cards = document.querySelectorAll('.faculty-card');
  cards.forEach(card => {
    if (filter === 'all' || card.getAttribute('data-category') === filter) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Virtual Tour Slider
let tourIndex = 0;
function changeTourSlide(n) {
  const slides = document.querySelectorAll('.tour-slide');
  tourIndex += n;
  if (tourIndex >= slides.length) tourIndex = 0;
  if (tourIndex < 0) tourIndex = slides.length - 1;
  slides.forEach(slide => slide.classList.remove('active'));
  slides[tourIndex].classList.add('active');
}

// Map Initialization
function initMap() {
  const location = { lat: 6.6437, lng: 3.3174 }; // Approximate Lagos coordinates
  const map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 15,
  });
  new google.maps.Marker({ position: location, map, title: 'Winsome Model Schools' });
}
window.initMap = initMap;

// Booking Form
function handleBooking(event) {
  event.preventDefault();
  const message = document.getElementById('booking-message');
  message.textContent = 'Booking request submitted! We will confirm soon.';
  message.style.color = 'green';
}

// Event Countdown
function updateCountdown(id, targetDate) {
  const countdown = document.getElementById(id);
  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = new Date(targetDate).getTime() - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    if (distance < 0) {
      clearInterval(interval);
      countdown.textContent = 'Event Started!';
    }
  }, 1000);
}

updateCountdown('countdown-sports', 'April 15, 2025 08:00:00');
updateCountdown('countdown-culture', 'May 20, 2025 09:00:00');
updateCountdown('countdown-science', 'June 10, 2025 08:00:00');

// News Search and Filter
function searchNews() {
  const input = document.getElementById('news-search').value.toLowerCase();
  const items = document.querySelectorAll('.news-item');
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(input)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function filterNews() {
  const filter = document.getElementById('news-filter').value;
  const items = document.querySelectorAll('.news-item');
  items.forEach(item => {
    if (filter === 'all' || item.getAttribute('data-category') === filter) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// News Carousel
let newsIndex = 0;
function showNewsSlides() {
  const slides = document.querySelectorAll('.news-slide');
  if (newsIndex >= slides.length) newsIndex = 0;
  if (newsIndex < 0) newsIndex = slides.length - 1;
  slides.forEach(slide => slide.classList.remove('active'));
  slides[newsIndex].classList.add('active');
}

function prevNewsSlide() {
  newsIndex--;
  showNewsSlides();
}

function nextNewsSlide() {
  newsIndex++;
  showNewsSlides();
}

setInterval(nextNewsSlide, 5000);

// Pagination (Basic Implementation)
let currentPage = 1;
const itemsPerPage = 3;
function updatePagination() {
  const items = document.querySelectorAll('.news-item');
  const totalPages = Math.ceil(items.length / itemsPerPage);
  items.forEach((item, index) => {
    item.style.display = index < currentPage * itemsPerPage && index >= (currentPage - 1) * itemsPerPage ? 'block' : 'none';
  });
  document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePagination();
  }
}

function nextPage() {
  const items = document.querySelectorAll('.news-item');
  const totalPages = Math.ceil(items.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    updatePagination();
  }
}

updatePagination();

// Contact Form
function handleContactSubmit(event) {
  event.preventDefault();
  const message = document.getElementById('form-message');
  message.textContent = 'Message sent successfully! We will get back to you soon.';
  message.style.color = 'green';
}

// Chat Widget
function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');
  if (input.value.trim()) {
    const message = document.createElement('p');
    message.textContent = `You: ${input.value}`;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
    input.value = '';
    setTimeout(() => {
      const response = document.createElement('p');
      response.textContent = 'Admin: Thank you for your message! We will assist you soon.';
      response.style.color = '#003087';
      messages.appendChild(response);
      messages.scrollTop = messages.scrollHeight;
    }, 1000);
  }
}

// Appointment Scheduler
function handleAppointment(event) {
  event.preventDefault();
  const message = document.getElementById('appointment-message');
  message.textContent = 'Appointment scheduled successfully! Check your email for confirmation.';
  message.style.color = 'green';
}

// Newsletter Signup
function handleNewsletter(event) {
  event.preventDefault();
  const message = document.getElementById('newsletter-message');
  message.textContent = 'Subscription successful! Welcome to our newsletter.';
  message.style.color = 'green';
}

