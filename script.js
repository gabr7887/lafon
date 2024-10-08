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

function rightImage() {
  currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
  showImage(currentImageIndex);
}

let slideTimer = setInterval(rightImage, 5000);

leftArrow.addEventListener('click', () => {
  currentImageIndex =
    (currentImageIndex - 1 + sliderImages.length) % sliderImages.length;
  showImage(currentImageIndex);
  clearInterval(slideTimer);
  slideTimer = setInterval(rightImage, 5000);
});

rightArrow.addEventListener('click', () => {
  rightImage();
  clearInterval(slideTimer);
  slideTimer = setInterval(rightImage, 5000);
});

// Hamburger menu functionality
const hamburgerMenu = document.getElementById('hamburgerMenu');
const navMenu = document.getElementById('navMenu');

function openMenu() {
  navMenu.classList.toggle('active');
  hamburgerMenu.classList.toggle('active');
}

function closeMenu() {
  navMenu.classList.remove('active');
  hamburgerMenu.classList.remove('active');
}

hamburgerMenu.addEventListener('click', openMenu);

// Close menu when a link is clicked
navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
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

//Form
const contato = document.forms[0];

const email = contato.querySelector('#email');
function validarEmail(event) {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!regex.test(event.target.value)) {
    event.target.parentNode.classList.add('errorState');
  } else {
    event.target.parentNode.classList.remove('errorState');
  }
}
email.addEventListener('change', validarEmail);

const telefone = contato.querySelector('#telefone');
function validarTelefone(event) {
  const regex =
    /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[0-9])[0-9]{3}\-?[0-9]{4}$/;
  if (!regex.test(event.target.value)) {
    event.target.parentNode.classList.add('errorState');
  } else {
    event.target.parentNode.classList.remove('errorState');
  }
}
telefone.addEventListener('change', validarTelefone);

const inputs = contato.querySelectorAll('[data-inputs]');
function validarInputs(event) {
  if (!event.target.value.length) {
    event.target.parentNode.classList.add('errorState');
  } else {
    event.target.parentNode.classList.remove('errorState');
  }
}

inputs.forEach((input) => input.addEventListener('change', validarInputs));

//api
const responseDiv = document.querySelector('.response-container');
function enviarForm(event) {
  event.preventDefault();
  emailjs.sendForm('service_ws2z79z', 'template_80e8pzc', contato).then(
    () => {
      responseDiv.classList.add('active');
      responseDiv.children[0].innerText = `Solicitação enviada, Por favor aguarde nosso contato.`;
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    },
    () => {
      responseDiv.classList.add('activeError');
      responseDiv.children[0].innerText = `Um erro ocorreu, Por favor reenvie o formulario.`;
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    },
  );
}

contato.addEventListener('submit', enviarForm);
