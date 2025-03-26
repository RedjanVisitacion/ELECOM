document.addEventListener("DOMContentLoaded", function () {
    let header = document.querySelector('.header');
    let btnMenu = document.querySelector('.burger'); // Burger button
    let navLinks = document.querySelector('.nav-links'); // Navigation menu
    let navItems = document.querySelectorAll('.nav-links a'); // Navigation links

    if (!btnMenu || !navLinks) return; // Exit if elements are missing

    // Function to toggle the mobile menu
    function toggleMenu() {
        navLinks.classList.toggle("active");
        btnMenu.classList.toggle("active");
    }

    // Add click event to the burger button
    btnMenu.addEventListener("click", toggleMenu);

    // Close menu when clicking a navigation link
    navItems.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active"); // Hide menu
            btnMenu.classList.remove("active"); // Reset burger animation
        });
    });

    // Close menu when scrolling
    window.addEventListener("scroll", () => {
        if (navLinks.classList.contains("active")) {
            navLinks.classList.remove("active"); // Hide menu
            btnMenu.classList.remove("active"); // Reset burger animation
        }

        // Change header style on scroll
        if (window.scrollY >= 100) {
            header.classList.add('active');
        } else {
            header.classList.remove('active');
        }
    });

    // Smooth Scroll with Delay
    navItems.forEach(link => {
        link.addEventListener("click", function (e) {
            if (this.classList.contains("btn")) {
                return; // Allow login button to function normally
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
        });
    });
});
