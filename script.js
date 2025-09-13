// // Mobile Menu toggle (sidebar)
// const toggleMenu = document.querySelector('.toggle-menu');
// const sidebar = document.querySelector('.sidebar');
// const closeBtn = document.querySelector('.close-btn');

// // Toggle the sidebar visibility when the menu icon is clicked
// toggleMenu.addEventListener('click', () => {
//   sidebar.classList.add('active'); // Add the 'active' class to show the sidebar
// });

// // Close the sidebar when the close button is clicked
// closeBtn.addEventListener('click', () => {
//   sidebar.classList.remove('active'); // Remove the 'active' class to hide the sidebar
// });

// // Dropdown toggle inside the navbar and sidebar
// const dropdownLinks = document.querySelectorAll('.dropdown-link');

// // For each dropdown link in navbar/sidebar, toggle the dropdown on click
// dropdownLinks.forEach(link => {
//   link.addEventListener('click', function (e) {
//     e.preventDefault(); // Prevent default link action
    
//     // Toggle the dropdown visibility
//     const dropdown = this.nextElementSibling; // Get the <ul> element
//     dropdown.classList.toggle('active-dropdown');

//     // Change the arrow image when dropdown is toggled
//     const arrow = this.querySelector('img');
//     if (dropdown.classList.contains('active-dropdown')) {
//       arrow.src = './images/icon-arrow-up.svg'; // Change to up arrow
//     } else {
//       arrow.src = './images/icon-arrow-down.svg'; // Change to down arrow
//     }
//   });
// });

// // Close dropdown when clicking outside (clicking outside should close all dropdowns)
// document.addEventListener('click', function (e) {
//   if (!e.target.closest('.nav-element') && !e.target.closest('.sidebar')) {
//     // If click is outside the navbar or sidebar, close any open dropdowns
//     const openDropdowns = document.querySelectorAll('.active-dropdown');
//     openDropdowns.forEach(dropdown => {
//       dropdown.classList.remove('active-dropdown');
//       // Reset the arrow to down
//       const arrow = dropdown.previousElementSibling.querySelector('img');
//       if (arrow) {
//         arrow.src = './images/icon-arrow-down.svg';
//       }
//     });
//   }
// });



// === Elements ===
const toggleMenu = document.querySelector('.toggle-menu');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn');

const navDropdownLinks = document.querySelectorAll('.nav-element .dropdown-link'); // desktop nav links
const sidebarDropdownLinks = document.querySelectorAll('.sidebar .dropdown-link');

// === Sidebar toggle (open/close with same button) ===
toggleMenu.addEventListener('click', (e) => {
  e.stopPropagation();
  sidebar.classList.toggle('active');
});

// Close button inside sidebar
closeBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  sidebar.classList.remove('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.sidebar') && !e.target.closest('.toggle-menu')) {
    sidebar.classList.remove('active');
  }
});

// === Sidebar dropdowns (independent toggles, no auto-close) ===
sidebarDropdownLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    const dropdown = this.nextElementSibling;
    dropdown.classList.toggle('active-dropdown');

    const arrow = this.querySelector('img');
    arrow.src = dropdown.classList.contains('active-dropdown')
      ? './images/icon-arrow-up.svg'
      : './images/icon-arrow-down.svg';
  });
});

// === Desktop nav dropdowns (click toggle + auto-close others) ===
navDropdownLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    const dropdown = this.nextElementSibling;

    // Close other open dropdowns first
    document.querySelectorAll('.nav-element .active-dropdown').forEach(open => {
      if (open !== dropdown) {
        open.classList.remove('active-dropdown');
        const prevArrow = open.previousElementSibling.querySelector('img');
        if (prevArrow) prevArrow.src = './images/icon-arrow-down.svg';
      }
    });

    // Toggle current dropdown
    dropdown.classList.toggle('active-dropdown');

    const arrow = this.querySelector('img');
    arrow.src = dropdown.classList.contains('active-dropdown')
      ? './images/icon-arrow-up.svg'
      : './images/icon-arrow-down.svg';
  });
});

// === Click outside: close all dropdowns (desktop + sidebar) ===
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-element') && !e.target.closest('.sidebar')) {
    document.querySelectorAll('.active-dropdown').forEach(open => {
      open.classList.remove('active-dropdown');
      const arrow = open.previousElementSibling.querySelector('img');
      if (arrow) arrow.src = './images/icon-arrow-down.svg';
    });
  }
});