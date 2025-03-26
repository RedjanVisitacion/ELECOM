document.addEventListener("DOMContentLoaded", function () {
    let header = document.querySelector('.header');
    let btnMenu = document.querySelector('.burger'); // Burger button
    let navLinks = document.querySelector('.nav-links'); // Navigation menu
    let navItems = document.querySelectorAll('.nav-links a'); // Navigation links

    if (!btnMenu || !navLinks) return; // Exit if elements are missing

    // Function to show/hide the menu
    function toggleMenu() {
        navLinks.classList.toggle("active");
        btnMenu.classList.toggle("active");
    }

    // Click event on burger button to toggle menu
    btnMenu.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevents the menu from closing immediately
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
        if (!navLinks.contains(e.target) && !btnMenu.contains(e.target)) {
            navLinks.classList.remove("active");
            btnMenu.classList.remove("active");
        }
    });

    // Close menu when clicking a navigation link
    navItems.forEach(link => {
        link.addEventListener("click", function (e) {
            navLinks.classList.remove("active");
            btnMenu.classList.remove("active");

            // Smooth scroll to section
            let targetId = this.getAttribute("href");
            if (targetId.startsWith("#")) {
                e.preventDefault();
                let targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 50,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Close menu when scrolling
    window.addEventListener("scroll", function () {
        if (navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
            btnMenu.classList.remove("active");
        }

        // Change header style when scrolling
        if (window.scrollY >= 100) {
            header.classList.add('active');
        } else {
            header.classList.remove('active');
        }
    });
});
