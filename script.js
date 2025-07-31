// Animación de entrada de las tarjetas 
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.fabric-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'all 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 200);
  });

  // Slider automático para cada .fabric-slider
  const sliders = document.querySelectorAll('.fabric-slider');
  sliders.forEach(slider => {
    const images = slider.querySelectorAll('.slider-img');
    if (images.length <= 1) return; // Si solo hay 1 imagen, no animar
    let current = 0;

    setInterval(() => {
      images[current].classList.remove('active');
      current = (current + 1) % images.length;
      images[current].classList.add('active');
    }, 3000);
  });

  // Auto scroll horizontal para .tendencia-carousel en móviles
  const carousel = document.querySelector('.tendencia-carousel');
  if (carousel) {
    let scrollAmount = 0;
    const scrollStep = 1; // píxeles que avanza cada vez
    const delay = 15;     // ms entre cada paso (velocidad)

    function autoScroll() {
      scrollAmount += scrollStep;
      if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
        scrollAmount = 0; // vuelve al inicio
      }
      carousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }

    let autoScrollInterval = setInterval(autoScroll, delay);

    // Pausar auto scroll si el usuario interactúa (mouse o touch)
    let isUserInteracting = false;

    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoScrollInterval);
    });
    carousel.addEventListener('mouseleave', () => {
      autoScrollInterval = setInterval(autoScroll, delay);
    });

    carousel.addEventListener('touchstart', () => {
      clearInterval(autoScrollInterval);
      isUserInteracting = true;
    });
    carousel.addEventListener('touchend', () => {
      if (isUserInteracting) {
        autoScrollInterval = setInterval(autoScroll, delay);
        isUserInteracting = false;
      }
    });
  }
});

// WhatsApp consulta con mensaje personalizado
function enviarConsulta(element) {
  const nombreTela = element.getAttribute('data-name') || 'tela';
  const mensaje = `Hola, buenas, ¿cómo va? Vi su página y quería consultar por esta tela: ${nombreTela}`;
  const numero = "541565903806";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

// Modal para mostrar imágenes en grande y navegar entre ellas
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeBtn = modal.querySelector('.close');
const prevBtn = modal.querySelector('.prev');
const nextBtn = modal.querySelector('.next');

let currentImages = [];
let currentIndex = 0;

function openModal(sliderDiv) {
  currentImages = Array.from(sliderDiv.querySelectorAll('.slider-img')).map(img => img.src);
  currentIndex = 0;
  showModalImage();
  modal.style.display = 'block';
}

function showModalImage() {
  modalImg.src = currentImages[currentIndex];
  modalCaption.textContent = `Imagen ${currentIndex + 1} de ${currentImages.length}`;
}

closeBtn.onclick = () => {
  modal.style.display = 'none';
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  showModalImage();
};

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  showModalImage();
};

// Cerrar modal al hacer click fuera de la imagen
window.onclick = event => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Añadir listeners a botones consultar (para que funcionen)
document.addEventListener('DOMContentLoaded', () => {
  const consultButtons = document.querySelectorAll('.contact-btn');
  consultButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      enviarConsulta(btn);
    });
  });

  // Añadir apertura modal al hacer click en la imagen del slider
  const sliders = document.querySelectorAll('.fabric-slider');
  sliders.forEach(slider => {
    slider.style.cursor = 'pointer';
    slider.addEventListener('click', () => {
      openModal(slider);
    });
  });
});
