// Select header and navigation elements
let header = document.querySelector('.header');
let btnMenu = document.getElementById('btnMenu');
let NavLinks = document.querySelector('.nav-links');

// Menu on scroll
window.addEventListener("scroll", () => {
    if (window.scrollY >= 100) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
});

// Menu toggle for mobile
btnMenu.addEventListener("click", () => {
    btnMenu.classList.toggle("fa-times");
    NavLinks.classList.toggle("active");
});

// Smooth Scroll with Delay
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener("click", function (e) {
        if (this.classList.contains("btn")) {
            return; // Let the login button open in a new tab
        }

        e.preventDefault();
        let targetId = this.getAttribute("href");
        let targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50,
                behavior: "smooth"
            });
        }

        // Close mobile menu after clicking
        NavLinks.classList.remove("active");
        btnMenu.classList.remove("fa-times");
    });
});

// Swiper Slider
var swiper = new Swiper(".swip-test-imo", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// Highlight active menu item on scroll
let sections = document.querySelectorAll('section');
let links = document.querySelectorAll('.nav-links a');

window.addEventListener("scroll", () => {
    let currentPos = window.scrollY + 100;

    sections.forEach((section, index) => {
        if (currentPos >= section.offsetTop && currentPos < section.offsetTop + section.offsetHeight) {
            links.forEach(link => link.classList.remove("active"));
            links[index].classList.add("active");
        }
    });
});

// Lightbox functionality
function openLightbox(src, type) {
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    const video = document.getElementById("lightbox-video");

    lightbox.style.display = "flex";

    if (type === "image") {
        img.src = src;
        img.style.display = "block";
        video.style.display = "none";
    } else if (type === "video") {
        video.src = src;
        video.style.display = "block";
        img.style.display = "none";
    }
}
