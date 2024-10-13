(function ($) {
    "use strict";

    // ICONO DE CARGANDO
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // INICIO DE LA LIBRERIA WOWJS
    new WOW().init();


    // BARRA DE NAVEGACIÓN ESTATICA
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // MENU DESPLEGABLE DE NIVELES
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    // BOTON DE REGRESO AL INICIO
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1200, 'easeInOutExpo');
        return false;
    });


    // CARRUSEL PRINCIPAL
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // CARRUSEL DE RESEÑAS
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
})(jQuery);

// CARRUSEL DOCENTES y SELECCION DE BOTONES
let currentSlide = 0;  

function showCarousel(carouselId, button) {  
    const buttons = document.querySelectorAll('.course-btn');  
    buttons.forEach(btn => btn.classList.remove('selected'));  
    button.classList.add('selected');  

    const carousels = document.querySelectorAll('.carousel');  
    carousels.forEach(carousel => {  
        carousel.classList.remove('active');  
    });  

    const selectedCarousel = document.getElementById(carouselId);  
    if (selectedCarousel) {  
        selectedCarousel.classList.add('active');  
        currentSlide = 0; // Reiniciar el índice al seleccionar un nuevo carrusel  
        updateCarousel(selectedCarousel);  
    }  
}  

function nextSlide() {  
    const activeCarousel = document.querySelector('.carousel.active');  
    const items = activeCarousel.querySelectorAll('.carousel-item');  
    items[currentSlide].classList.remove('active');  
    currentSlide = (currentSlide + 1) % items.length; // Cambia al siguiente  
    items[currentSlide].classList.add('active');  
}  

function prevSlide() {  
    const activeCarousel = document.querySelector('.carousel.active');  
    const items = activeCarousel.querySelectorAll('.carousel-item');  
    items[currentSlide].classList.remove('active');  
    currentSlide = (currentSlide - 1 + items.length) % items.length; // Cambia al anterior  
    items[currentSlide].classList.add('active');  
}  

function updateCarousel(carousel) {  
    const items = carousel.querySelectorAll('.carousel-item');  
    items.forEach((item, index) => {  
        item.classList.remove('active');  
        if (index === currentSlide) {  
            item.classList.add('active');  
        }  
    });  
}

document.addEventListener("DOMContentLoaded", function() {  
    const lazyImages = document.querySelectorAll('.lazy');  

    const observer = new IntersectionObserver((entries, observer) => {  
        entries.forEach(entry => {  
            if (entry.isIntersecting) {  
                const img = entry.target;  
                img.src = img.dataset.src;  
                img.classList.remove('lazy');  
                observer.unobserve(img);  
            }  
        });  
    });  

    lazyImages.forEach(image => {  
        observer.observe(image);  
    });  
});  