// Dark mode functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
});

// Scroll to top button functionality
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.display = 'flex';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

scrollTopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Image Slider Functionality
const sliderImages = document.querySelectorAll('.slider-image');
const leftArrow = document.querySelector('.slider-arrow-left');
const rightArrow = document.querySelector('.slider-arrow-right');
let currentImageIndex = 0;

function showImage(index) {
  sliderImages.forEach((img, i) => {
    if (i === index) {
      img.classList.add('active');
    } else {
      img.classList.remove('active');
    }
  });
}

leftArrow.addEventListener('click', () => {
  currentImageIndex =
    (currentImageIndex - 1 + sliderImages.length) % sliderImages.length;
  showImage(currentImageIndex);
});

rightArrow.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
  showImage(currentImageIndex);
});

// Auto-rotate images every 5 seconds
setInterval(() => {
  currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
  showImage(currentImageIndex);
}, 8000);

// Hamburger menu functionality
const hamburgerMenu = document.getElementById('hamburgerMenu');
const navMenu = document.getElementById('navMenu');

hamburgerMenu.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburgerMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', (e) => {
    navMenu.classList.remove('active');
    hamburgerMenu.classList.remove('active');
  });
});

const headerHeight = document.querySelector('header').clientHeight;
document.querySelector('main').style.paddingTop = `${64 + headerHeight}px`;

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const linkedElement = document.querySelector(this.getAttribute('href'));
    window.scrollTo({
      top: linkedElement.offsetTop - (headerHeight + 20),
      left: 0,
      behavior: 'smooth',
    });
  });
});
