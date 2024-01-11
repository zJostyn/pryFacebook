let currentIndex = 0;
document.getElementById('prev-btn').style.visibility = 'hidden';

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const prevSelectedBtn = document.getElementById("prev-selected-btn");
const nextSelectedBtn = document.getElementById("next-selected-btn");
const closeSelectedBtn = document.getElementById("close-selected-btn");
const selectedImageContainer = document.getElementById("selected-image-container");

document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".carousel-image");

    images.forEach((image, index) => {
        image.addEventListener("click", () => showSelectedImage(image, index));
    });

    prevSelectedBtn.addEventListener("click", () => changeSelectedImage(-1));
    nextSelectedBtn.addEventListener("click", () => changeSelectedImage(1));
    closeSelectedBtn.addEventListener("click", () => hideSelectedImage());
});

function showSelectedImage(image, index) {
    const carouselContainer = document.getElementById("carousel-container");
    const selectedImage = document.getElementById("selected-image");

    selectedImage.src = image.src;
    selectedImage.alt = image.alt;
    selectedImageContainer.style.display = "flex";

    carouselContainer.style.display = "none";
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";

    prevSelectedBtn.style.display = "block";
    nextSelectedBtn.style.display = "block";

    currentIndex = index;
}

function hideSelectedImage() {
    const carouselContainer = document.getElementById("carousel-container");

    selectedImageContainer.style.display = "none";
    carouselContainer.style.display = "flex";
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";

    prevSelectedBtn.style.display = "none";
    nextSelectedBtn.style.display = "none";
}

function changeSelectedImage(n) {
    const images = document.querySelectorAll(".carousel-image");
    const selectedImage = document.getElementById("selected-image");
    let newIndex = currentIndex + n;

    if (newIndex < 0) {
        newIndex = images.length - 1;
    } else if (newIndex >= images.length) {
        newIndex = 0;
    }

    selectedImage.src = images[newIndex].src;
    selectedImage.alt = images[newIndex].alt;
    currentIndex = newIndex;
}


function resetMainCarouselVisibility() {
    const totalSlides = document.querySelectorAll('.carousel-image').length;

    if (currentIndex === 0) {
        prevSelectedBtn.style.visibility = 'hidden';
        nextSelectedBtn.style.visibility = 'visible';
    } else if (currentIndex === totalSlides - 1) {
        prevSelectedBtn.style.visibility = 'visible';
        nextSelectedBtn.style.visibility = 'hidden';
    } else {
        prevSelectedBtn.style.visibility = 'visible';
        nextSelectedBtn.style.visibility = 'visible';
    }
}

closeSelectedBtn.addEventListener("click", () => {
    hideSelectedImage();
    setTimeout(() => {
        resetMainCarouselVisibility();
    }, 500);
});


function changeSlide(direction) {
    const carousel = document.getElementById('image-carousel');
    const totalSlides = document.querySelectorAll('.carousel-image').length;

    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    const translateValue = -currentIndex * 100 + '%';
    carousel.style.transform = 'translateX(' + translateValue + ')';

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (currentIndex === 0) {
        prevBtn.style.visibility = 'hidden';
    } else {
        prevBtn.style.visibility = 'visible';
    }

    if (currentIndex === totalSlides - 1) {
        nextBtn.style.visibility = 'hidden';
    } else {
        nextBtn.style.visibility = 'visible';
    }
}

const boton = document.getElementById('casita');
const textoMostrado = document.getElementById('textoInicio');

boton.addEventListener('mouseover', () => {
    textoMostrado.style.display = 'block';
});

boton.addEventListener('mouseout', () => {
    textoMostrado.style.display = 'none';
});

const boton1 = document.getElementById('videos');
const textoMostrado1 = document.getElementById('textoVideo');

boton1.addEventListener('mouseover', () => {
    textoMostrado1.style.display = 'block';
});

boton1.addEventListener('mouseout', () => {
    textoMostrado1.style.display = 'none';
});


const boton2 = document.getElementById('market');
const textoMostrado2 = document.getElementById('textoMarketplace');

boton2.addEventListener('mouseover', () => {
    textoMostrado2.style.display = 'block';
});

boton2.addEventListener('mouseout', () => {
    textoMostrado2.style.display = 'none';
});

const boton3 = document.getElementById('comuni');
const textoMostrado3 = document.getElementById('textoGrupos');

boton3.addEventListener('mouseover', () => {
    textoMostrado3.style.display = 'block';
});

boton3.addEventListener('mouseout', () => {
    textoMostrado3.style.display = 'none';
});

const boton4 = document.getElementById('juegos');
const textoMostrado4 = document.getElementById('textoVideojuegos');

boton4.addEventListener('mouseover', () => {
    textoMostrado4.style.display = 'block';
});

boton4.addEventListener('mouseout', () => {
    textoMostrado4.style.display = 'none';
});

function publicar() {
    const mensaje = document.getElementById('mensaje').value;

    console.log('Publicando:', mensaje);

    document.getElementById('mensaje').value = '';
}

function showUploadModal() {
    const modal = document.getElementById('uploadModal');
    modal.style.display = 'block';
}

function closeUploadModal() {
    const modal = document.getElementById('uploadModal');
    modal.style.display = 'none';
}

function uploadPhoto() {
    const fileInput = document.getElementById('fileInput');
    const selectedFile = fileInput.files[0];

    if (selectedFile) {
        console.log('Subiendo foto:', selectedFile.name);

        closeUploadModal();
    } else {
        alert('Selecciona una foto para subir a tu historia.');
    }
}

const crearHistoriaBtn = document.getElementById('crearHistoriaBtn');
crearHistoriaBtn.addEventListener('click', showUploadModal);