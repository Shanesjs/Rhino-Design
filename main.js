import './style.css'

// Mobile Menu Elements
const menuBtn = document.getElementById('menu-btn');
const mobileOverlay = document.getElementById('mobile-overlay');

// Cinematic Page Loader Management
const createPageLoader = () => {
  if (document.querySelector('.page-loader')) return document.querySelector('.page-loader');
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  document.body.prepend(loader);
  return loader;
};

const loader = createPageLoader();

// Handle page entry (Fade Out)
const fadeOutLoader = () => {
  if (loader) {
    loader.classList.add('fade-out');
    document.body.style.overflow = ''; // Ensure body is scrollable
  }
};

// Initial state: prevent scroll while loader is essentially visible
document.body.style.overflow = 'hidden';

// Faster entry: Try to fade out as soon as DOM is ready, 
// but give it a tiny buffer for a smooth premium feel.
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(fadeOutLoader, 300);
});

// Fallback for safety - if DOMContentLoaded already fired or for older browsers
window.addEventListener('load', fadeOutLoader);

// Intercept clicks for internal navigation (Fade In)
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link) return;
  
  const href = link.getAttribute('href');
  
  // Only intercept internal page links, skip hashes or externals
  if (href && (href.endsWith('.html') || (href.includes('.html') && !href.startsWith('http'))) && !href.startsWith('#')) {
    e.preventDefault();
    loader.classList.remove('fade-out');
    loader.classList.add('active');
    
    // Lock scroll during transition for premium feel
    document.body.style.overflow = 'hidden';
    
    // Close mobile menu if open
    if (menuBtn) menuBtn.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    
    setTimeout(() => {
      window.location.href = href;
    }, 500); 
  }
});

// Add simple parallax effect to hero cursor movement
document.addEventListener('mousemove', (e) => {
  const hero = document.getElementById('hero-section');
  if (!hero) return;
  const xAxis = (window.innerWidth / 2 - e.pageX) / 80;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 80;
  hero.style.backgroundPosition = `calc(50% + ${xAxis}px) calc(50% + ${yAxis}px)`;
});

// Intersection Observer for elegant scroll reveal animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Mobile Menu Toggle
if (menuBtn && mobileOverlay) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
  });
}
