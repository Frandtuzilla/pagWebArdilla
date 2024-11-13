document.addEventListener("DOMContentLoaded", function() {
    // **Sticky Navigation**
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 0) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    });

    // **Dropdown Navigation Menu**
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const targetSection = document.querySelector(this.getAttribute("href"));
            e.preventDefault();
            targetSection.scrollIntoView({ behavior: "smooth" });

            // Activar clase 'active' en el enlace actual
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // **Contact Form Validation**
    const form = document.querySelector("form");
    const nameInput = document.querySelector("#nombre");
    const emailInput = document.querySelector("#email");
    const messageInput = document.querySelector("#mensaje");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        validateForm();
        showPopup(); // Muestra el popup después de la validación
    });
    
    function validateForm() {
        let valid = true;

        if (!nameInput.value.trim()) {
            setError(nameInput, "El nombre es obligatorio");
            valid = false;
        } else clearError(nameInput);

        if (!isValidEmail(emailInput.value)) {
            setError(emailInput, "Por favor, ingresa un correo válido");
            valid = false;
        } else clearError(emailInput);

        if (!messageInput.value.trim()) {
            setError(messageInput, "El mensaje no puede estar vacío");
            valid = false;
        } else clearError(messageInput);

        if (valid) form.submit();
    }

    function setError(input, message) {
        const errorElement = document.createElement("p");
        errorElement.className = "error-message";
        errorElement.textContent = message;
        input.parentNode.appendChild(errorElement);
    }

    function clearError(input) {
        const error = input.parentNode.querySelector(".error-message");
        if (error) error.remove();
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showPopup() {
        const modal = document.createElement("div");
        modal.className = "modal";
        
        const modalContent = document.createElement("div");
        modalContent.className = "modal-content";
        modalContent.innerText = "Mensaje Enviado!";
    
        const closeButton = document.createElement("span");
        closeButton.className = "close-button";
        closeButton.innerHTML = "&times;";
        closeButton.addEventListener("click", () => modal.remove());
    
        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    
        modal.style.display = "flex";
    
        setTimeout(() => {
            modal.remove();
        }, 5000);
    }

    // **Smooth Scroll**
    const scrollLinks = document.querySelectorAll("a[href^='#']");
    scrollLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // **Slider Functionality**
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".dots-container");
    const totalSlides = slides.length;
    let autoPlayInterval;

    // Crear puntos de navegación
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active"); // Activar el primer punto por defecto
        dot.addEventListener("click", () => {
            goToSlide(i);
            resetAutoPlay(); // Reinicia el temporizador al hacer clic en un punto
        });
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll(".dot");

    document.getElementById("next").addEventListener("click", () => {
        changeSlide(1);
        resetAutoPlay(); // Reinicia el temporizador al hacer clic en 'next'
    });

    document.getElementById("prev").addEventListener("click", () => {
        changeSlide(-1);
        resetAutoPlay(); // Reinicia el temporizador al hacer clic en 'prev'
    });

    function changeSlide(direction) {
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    function goToSlide(index) {
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");
        currentSlide = index;
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            changeSlide(1);
        }, 7000); // Cambia de diapositiva cada 7 segundos
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval); // Detiene el temporizador
        startAutoPlay(); // Reinicia el temporizador
    }

    slides[0].classList.add("active"); // Activa la primera diapositiva
    startAutoPlay(); // Inicia la reproducción automática

    // **Toggle Navigation Menu for Mobile**
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', function () {
        mainNav.querySelector('ul').classList.toggle('active');
    });

});
