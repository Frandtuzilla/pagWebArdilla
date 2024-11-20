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

});

document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('#main-nav a');

    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
            mainNav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Prevent clicks inside menu from closing it
    mainNav.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

/* Carrito */
document.addEventListener("DOMContentLoaded", () => {
    const productos = [
        { id: 1, nombre: "Camiseta Ardilla", precio: 20000, imagen: "images/camisetaArdilla.jpg" },
        { id: 2, nombre: "Taza Ardilla", precio: 6000, imagen: "images/tazaArdilla.jpg" },
        { id: 3, nombre: "Gorra Ardilla", precio: 12000, imagen: "images/gorraArdilla.jpg" },
        { id: 4, nombre: "Peluche Ardilla", precio: 19000, imagen: "images/pelucheArdilla.jpg" },
        { id: 5, nombre: "Botella Ardilla", precio: 14000, imagen: "images/botellaArdilla.jpg" },
        { id: 6, nombre: "Mochila Ardilla", precio: 29000, imagen: "images/mochilaArdilla.jpg" },
    ];

    const carrito = [];

    const renderizarProductos = () => {
        const contenedor = document.getElementById("productos");
        contenedor.innerHTML = "";
        productos.forEach(producto => {
            const productoDiv = document.createElement("div");
            productoDiv.className = "producto";
            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio.toFixed(2)}</p>
                <button class="agregar-carrito" data-id="${producto.id}">Agregar al Carrito</button>
            `;
            contenedor.appendChild(productoDiv);
        });
    };

    const actualizarCarrito = () => {
        const contenedor = document.getElementById("items-carrito");
        const totalCarrito = document.getElementById("total-carrito");
        contenedor.innerHTML = "";
        let total = 0;

        carrito.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "item-carrito";
            itemDiv.innerHTML = `
                <p>${item.nombre} x ${item.cantidad}</p>
                <p>$${(item.precio * item.cantidad).toFixed(2)}</p>
                <button class="eliminar-item" data-id="${item.id}">Eliminar</button>
            `;
            contenedor.appendChild(itemDiv);
            total += item.precio * item.cantidad;
        });

        totalCarrito.textContent = `$${total.toFixed(2)}`;
    };

    const agregarAlCarrito = (id) => {
        const producto = productos.find(p => p.id === id);
        const itemCarrito = carrito.find(item => item.id === id);
        if (itemCarrito) {
            itemCarrito.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        actualizarCarrito();
    };

    const eliminarDelCarrito = (id) => {
        const index = carrito.findIndex(item => item.id === id);
        if (index !== -1) carrito.splice(index, 1);
        actualizarCarrito();
    };

    document.getElementById("productos").addEventListener("click", (e) => {
        if (e.target.classList.contains("agregar-carrito")) {
            const id = parseInt(e.target.dataset.id);
            agregarAlCarrito(id);
        }
    });

    document.getElementById("items-carrito").addEventListener("click", (e) => {
        if (e.target.classList.contains("eliminar-item")) {
            const id = parseInt(e.target.dataset.id);
            eliminarDelCarrito(id);
        }
    });

    document.getElementById("vaciar-carrito").addEventListener("click", () => {
        carrito.length = 0;
        actualizarCarrito();
    });

    const comprarAhoraBtn = document.getElementById("comprar-ahora");

    comprarAhoraBtn.addEventListener("click", () => {
        if (carrito.length > 0) {
            alert("Gracias por tu compra! Procesaremos tu pedido.");
            carrito.length = 0;
            actualizarCarrito();
        } else {
            alert("El carrito está vacío. Agrega productos antes de comprar.");
        }
    });

    renderizarProductos();
});