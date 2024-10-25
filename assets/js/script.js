document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll('.section');
  let currentSectionIndex = 0;
  const menuIcon = document.getElementById('menu-icon');
  const menu = document.getElementById('menu');

  // Function to activate the current section with fade-in effect
  function activateSection(index) {
    sections.forEach((section, i) => {
      section.classList.remove('active');
      if (i === index) {
        section.classList.add('active');
      }
    });
  }

  // Initialize by activating the first section
  activateSection(currentSectionIndex);

  // Detect swipe gestures for mobile
  let touchStartY = 0;
  let touchEndY = 0;

  function handleSwipeGesture() {
    if (touchEndY < touchStartY) {
      // Swipe up
      if (currentSectionIndex < sections.length - 1) {
        currentSectionIndex++;
        activateSection(currentSectionIndex);
      }
    }
    if (touchEndY > touchStartY) {
      // Swipe down
      if (currentSectionIndex > 0) {
        currentSectionIndex--;
        activateSection(currentSectionIndex);
      }
    }
  }

  document.addEventListener('touchstart', function(event) {
    touchStartY = event.changedTouches[0].screenY;
  }, false);

  document.addEventListener('touchend', function(event) {
    touchEndY = event.changedTouches[0].screenY;
    handleSwipeGesture();
  }, false);

  // Allow arrow key navigation (desktop)
  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
      if (currentSectionIndex > 0) {
        currentSectionIndex--;
        activateSection(currentSectionIndex);
      }
    } else if (event.key === 'ArrowDown') {
      if (currentSectionIndex < sections.length - 1) {
        currentSectionIndex++;
        activateSection(currentSectionIndex);
      }
    }
  });

  // Link navigation to sections and collapse menu after clicking
  document.querySelectorAll('nav ul li a').forEach((link, index) => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      currentSectionIndex = index;
      activateSection(currentSectionIndex);
      collapseMenu(); // Collapse the mobile menu after clicking
    });
  });

  // Menu Toggle for Mobile
  menuIcon.addEventListener('click', function() {
    menu.classList.toggle('active');
  });

  // Function to collapse the menu back to the hamburger icon
  function collapseMenu() {
    menu.classList.remove('active'); // Hide the menu
  }
});
