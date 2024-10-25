document.addEventListener("DOMContentLoaded", function() {
  const app = {
    sections: document.querySelectorAll('.section'),
    currentSectionIndex: 0,
    isTransitioning: false,
    touchStartY: 0,
    touchEndY: 0,
    menuIcon: document.getElementById('menu-icon'),
    menu: document.getElementById('menu'),
    swipeThreshold: 50, // Minimum swipe distance in pixels
    lastKeyDownTime: 0, // For throttling arrow key presses

    init() {
      this.activateSection(this.currentSectionIndex);
      this.addEventListeners();
    },

    activateSection(index) {
      if (this.isTransitioning) return; // Prevent multiple rapid activations
      this.isTransitioning = true;

      this.sections.forEach((section, i) => {
        section.classList.remove('active');
        section.setAttribute('aria-hidden', 'true'); // Hide inactive sections from screen readers
        if (i === index) {
          section.classList.add('active');
          section.setAttribute('aria-hidden', 'false'); // Show the active section to screen readers

          // Focus the first focusable element inside the section for accessibility
          const focusableElement = section.querySelector('a, button, input, textarea');
          if (focusableElement) focusableElement.focus();
        }
      });

      setTimeout(() => {
        this.isTransitioning = false; // Unlock section transitions after animation
      }, 1000); // Assuming transition duration is 1s
    },

    handleSwipeGesture() {
      const swipeDistance = this.touchEndY - this.touchStartY;
      if (Math.abs(swipeDistance) > this.swipeThreshold) {
        if (swipeDistance < 0 && this.currentSectionIndex < this.sections.length - 1) {
          this.currentSectionIndex++;
          this.activateSection(this.currentSectionIndex);
        } else if (swipeDistance > 0 && this.currentSectionIndex > 0) {
          this.currentSectionIndex--;
          this.activateSection(this.currentSectionIndex);
        }
      }
    },

    addEventListeners() {
      // Swipe gesture detection for mobile
      document.addEventListener('touchstart', (event) => {
        this.touchStartY = event.changedTouches[0].screenY;
      }, false);

      document.addEventListener('touchend', (event) => {
        this.touchEndY = event.changedTouches[0].screenY;
        this.handleSwipeGesture();
      }, false);

      // Arrow key navigation for desktop
      document.addEventListener('keydown', (event) => {
        const now = new Date().getTime();
        if (now - this.lastKeyDownTime < 500) return; // Throttle to 500ms between key presses

        if (event.key === 'ArrowUp' && this.currentSectionIndex > 0) {
          this.currentSectionIndex--;
          this.activateSection(this.currentSectionIndex);
        } else if (event.key === 'ArrowDown' && this.currentSectionIndex < this.sections.length - 1) {
          this.currentSectionIndex++;
          this.activateSection(this.currentSectionIndex);
        }

        this.lastKeyDownTime = now;
      });

      // Navigation link handling
      document.querySelectorAll('nav ul li a').forEach((link, index) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.currentSectionIndex = index;
          this.activateSection(this.currentSectionIndex);
          this.collapseMenu(); // Collapse the menu after clicking a link
        });
      });

      // Menu toggle for mobile
      this.menuIcon.addEventListener('click', () => {
        this.menu.classList.toggle('active');
      });
    },

    collapseMenu() {
      this.menu.classList.remove('active'); // Collapse the menu back to the hamburger icon
    }
  };

  app.init();
});
