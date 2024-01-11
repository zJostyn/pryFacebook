let currentIndex = 0;
let autoChangeInterval; // Variable para almacenar el identificador del intervalo


document.getElementById('prev-btn').style.visibility = 'hidden';

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const prevSelectedBtn = document.getElementById("prev-selected-btn");
const nextSelectedBtn = document.getElementById("next-selected-btn");
const closeSelectedBtn = document.getElementById("close-selected-btn");
const selectedImageContainer = document.getElementById("selected-image-container");
const likeBtn = document.getElementById("like-btn");
const loveBtn = document.getElementById("love-btn");
const wowBtn = document.getElementById("wow-btn");
const commentInput = document.getElementById("comment-input");
const commentBtn = document.getElementById("comment-btn");
const commentsContainer = document.getElementById("comments-container");
const imageCarousel = document.getElementById("image-carousel");

let imageDetails = {};

document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".carousel-image");

    images.forEach((image, index) => {
        image.addEventListener("click", () => showSelectedImage(image, index));
    });

    prevSelectedBtn.addEventListener("click", () => changeSelectedImage(-1));
    nextSelectedBtn.addEventListener("click", () => changeSelectedImage(1));
    closeSelectedBtn.addEventListener("click", () => hideSelectedImage());

    likeBtn.addEventListener("click", () => react("like"));
    loveBtn.addEventListener("click", () => react("love"));
    wowBtn.addEventListener("click", () => react("wow"));
    commentBtn.addEventListener("click", () => addComment());
});

function changeSlide(direction) {
    const totalSlides = document.querySelectorAll('.carousel-image').length;
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;

    const translateValue = -currentIndex * 100 + '%';
    const carousel = document.getElementById('image-carousel');
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

    startAutoChangeInterval();

    currentIndex = index;

    // Obtener o inicializar los detalles de la imagen
    const imageKey = getImageKey(selectedImage.src);
    if (!imageDetails[imageKey]) {
        imageDetails[imageKey] = { reactions: { like: 0, love: 0, wow: 0 }, comments: [] };
    }

    // Mostrar reacciones y comentarios
    updateReactionsUI(imageKey);
    showComments(commentsContainer, imageKey);
}

function hideSelectedImage() {
    const carouselContainer = document.getElementById("carousel-container");

    selectedImageContainer.style.display = "none";
    carouselContainer.style.display = "flex";
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";

    prevSelectedBtn.style.display = "none";
    nextSelectedBtn.style.display = "none";

    // Limpiar el campo de comentarios
    commentInput.value = "";
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

    // Obtener o inicializar los detalles de la imagen
    const imageKey = getImageKey(selectedImage.src);
    if (!imageDetails[imageKey]) {
        imageDetails[imageKey] = { reactions: { like: 0, love: 0, wow: 0 }, comments: [] };
    }

    // Mostrar reacciones y comentarios
    updateReactionsUI(imageKey);
    showComments(commentsContainer, imageKey);
}

function react(type) {
    const selectedImage = document.getElementById("selected-image");
    const imageKey = getImageKey(selectedImage.src);

    imageDetails[imageKey].reactions[type]++;
    updateReactionsUI(imageKey);
}

function updateReactionsUI(imageKey) {
    document.getElementById("like-count").textContent = imageDetails[imageKey].reactions.like;
    document.getElementById("love-count").textContent = imageDetails[imageKey].reactions.love;
    document.getElementById("wow-count").textContent = imageDetails[imageKey].reactions.wow;
}

function addComment() {
    const selectedImage = document.getElementById("selected-image");
    const imageKey = getImageKey(selectedImage.src);
    const commentText = commentInput.value.trim();

    if (commentText !== "") {
        imageDetails[imageKey].comments.push(commentText);
        commentInput.value = ""; // Limpiar el campo de entrada

        showComments(commentsContainer, imageKey);
    }
}

function showComments(container, imageKey) {
    container.innerHTML = ""; // Limpiar el contenedor de comentarios

    if (imageDetails[imageKey].comments.length > 0) {
        const commentsList = document.createElement("ul");

        imageDetails[imageKey].comments.forEach((comment) => {
            const commentItem = document.createElement("li");
            commentItem.textContent = comment;
            commentsList.appendChild(commentItem);
        });

        container.appendChild(commentsList);
    }
}

function getImageKey(imageSrc) {
    // Puedes personalizar esta función según cómo quieras identificar las imágenes (puedes usar la URL como clave o cualquier otro criterio)
    return imageSrc;
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
        // Crear un nuevo elemento de imagen
        const newImage = document.createElement('img');
        newImage.src = URL.createObjectURL(selectedFile);
        newImage.alt = 'Imagen Personalizada';
        newImage.classList.add('carousel-image'); // Agregar clase para mantener el formato

        // Insertar la nueva imagen después del div con la clase 'additional-component'
        const additionalComponent = document.querySelector('.additional-component');
        additionalComponent.parentNode.insertBefore(newImage, additionalComponent.nextSibling);

        console.log('Subiendo foto:', selectedFile.name);

        closeUploadModal();

        // Actualizar las imágenes y agregar el evento click
        const images = document.querySelectorAll('.carousel-image');
        images.forEach((image, index) => {
            image.addEventListener('click', () => showSelectedImage(image, index));
        });

        // Asegurarse de que las flechas y el carrusel principal funcionen correctamente
        currentIndex = images.length - 1;
        changeSlide(1);
    } else {
        alert('Selecciona una foto para subir a tu historia.');
    }
}

const crearHistoriaBtn = document.getElementById('crearHistoriaBtn');
crearHistoriaBtn.addEventListener('click', showUploadModal);

document.getElementById('pause-btn').addEventListener('click', toggleAutoChange);

function toggleAutoChange() {
    const pauseBtn = document.getElementById('pause-btn');

    if (autoChangeInterval) {
        // Si el intervalo está activo, pausarlo y cambiar el texto del botón
        pauseAutoChangeInterval();
        pauseBtn.textContent = 'Reanudar';
    } else {
        // Si el intervalo está pausado, reanudarlo y cambiar el texto del botón
        startAutoChangeInterval();
        pauseBtn.textContent = 'Pausar';
    }
}

function startAutoChangeInterval() {
    autoChangeInterval = setInterval(() => {
        changeSelectedImage(1);
    }, 5000); // Cambia de imagen cada 5 segundos
}

function pauseAutoChangeInterval() {
    clearInterval(autoChangeInterval);
    autoChangeInterval = null;
}