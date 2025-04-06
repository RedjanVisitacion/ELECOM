const listItems = document.querySelectorAll("ul li");

// Add click event to each list item
listItems.forEach(item => {
  item.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent click from bubbling to document

    const isLargeScreen = window.innerWidth >= 1024;

    if (!item.classList.contains("active")) {
      listItems.forEach(li => {
        li.classList.remove("active");
        const arrow = li.querySelector(".arrow");
        if (arrow) arrow.style.display = "none";
      });

      item.classList.add("active");

      // Only show arrow on large screens
      if (isLargeScreen) {
        const arrow = item.querySelector(".arrow");
        if (arrow) arrow.style.display = "inline";
      }
    }
  });
});

// If user clicks anywhere else on the page, remove active from all
document.addEventListener("click", () => {
  listItems.forEach(li => {
    li.classList.remove("active");
    const arrow = li.querySelector(".arrow");
    if (arrow) arrow.style.display = "none";
  });
});




function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("show");
  }

  function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const toggleIcon = document.querySelector(".toggle-icon i");

    sidebar.classList.toggle("mini");

    if (sidebar.classList.contains("mini")) {
      toggleIcon.classList.remove("fa-angle-left");
      toggleIcon.classList.add("fa-angle-right");
    } else {
      toggleIcon.classList.remove("fa-angle-right");
      toggleIcon.classList.add("fa-angle-left");
    }
  }

  // Auto-close sidebar on outside click (mobile only)
  document.addEventListener("click", function (event) {
    const sidebar = document.getElementById("sidebar");
    const menuIcon = document.querySelector(".menu-icon");

    if (
      !sidebar.contains(event.target) &&
      !menuIcon.contains(event.target) &&
      window.innerWidth <= 768
    ) {
      sidebar.classList.remove("show");
    }
  });

  const profileDropdown = document.querySelector('.profile-dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Function to toggle the dropdown
function toggleDropdown(event) {
    event.preventDefault(); // Prevent default anchor behavior (if needed)
    dropdownMenu.classList.toggle('show');
}


function closeDropdown(event) {
    if (!profileDropdown.contains(event.target)) {
        dropdownMenu.classList.remove('show');
    }
}

profileDropdown.addEventListener('click', toggleDropdown);
document.addEventListener('click', closeDropdown);
