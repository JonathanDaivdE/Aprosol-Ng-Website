document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        const parentLi = toggle.closest('.has-dropdown');
        const dropdownMenu = parentLi.querySelector('.dropdown-menu');

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            // Check if the click occurred outside the current dropdown's parent li
            if (!parentLi.contains(event.target)) {
                parentLi.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Keyboard navigation (Tab, Escape)
        dropdownMenu.addEventListener('keydown', function(event) {
            const focusableElements = dropdownMenu.querySelectorAll('a');
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            if (event.key === 'Escape') {
                parentLi.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus(); // Return focus to the toggle button
                event.preventDefault(); // Prevent browser default Escape behavior
            } else if (event.key === 'Tab') {
                if (event.shiftKey) { // Shift + Tab (moving backward)
                    if (document.activeElement === firstFocusable) {
                        parentLi.classList.remove('is-open');
                        toggle.setAttribute('aria-expanded', 'false');
                        toggle.focus(); // Return focus to the toggle button
                        event.preventDefault();
                    }
                } else { // Tab (moving forward)
                    if (document.activeElement === lastFocusable) {
                        parentLi.classList.remove('is-open');
                        toggle.setAttribute('aria-expanded', 'false');
                        // Move focus to the next element in the main navigation
                        const nextMainMenuItem = parentLi.nextElementSibling;
                        if (nextMainMenuItem && nextMainMenuItem.querySelector('a')) {
                            nextMainMenuItem.querySelector('a').focus();
                        } else {
                            // If it's the last main menu item, focus the body or first item
                            document.body.focus(); // Or you could cycle back to the first main menu item
                        }
                        event.preventDefault();
                    }
                }
            }
        });

        // Optional: Add hover functionality for non-touch devices
        // This makes the dropdown open on hover, but click still works for accessibility
        parentLi.addEventListener('mouseenter', function() {
            // Only open on hover if not already open via click, or if no click functionality is desired
            // This ensures click takes precedence if already open
            if (toggle.getAttribute('aria-expanded') === 'false') {
                    parentLi.classList.add('is-open');
                    toggle.setAttribute('aria-expanded', 'true');
            }
        });

        parentLi.addEventListener('mouseleave', function() {
            // Only close on mouse leave if it was opened by hover, or if it's not currently focused
            if (!parentLi.contains(document.activeElement)) { // Don't close if focus is inside
                parentLi.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Keep dropdown open if focus is inside it (important for keyboard users)
        dropdownMenu.addEventListener('focusin', function() {
            parentLi.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
        });

        dropdownMenu.addEventListener('focusout', function(event) {
            // Close only if focus moves completely outside the parent li (toggle + dropdown)
            if (!parentLi.contains(event.relatedTarget)) {
                parentLi.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    document.querySelectorAll('.has-dropdown > .dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only run on screens ≤1024px
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                const parentLi = toggle.closest('.has-dropdown');
                parentLi.classList.toggle('is-open');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const mainMenu = document.querySelector('.main-menu');
    hamburger.addEventListener('click', function() {
        const isMenuOpen = mainMenu.classList.toggle('is-open');
        hamburger.setAttribute('aria-expanded', isMenuOpen);
        document.body.classList.toggle('no-scroll', isMenuOpen);

        // Close all dropdowns when menu closes
        if (!isMenuOpen) {
            document.querySelectorAll('.has-dropdown.is-open').forEach(openDropdown => {
                openDropdown.classList.remove('is-open');
                openDropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
            });
        }
    });

    // Dropdown toggle for mobile/tablet (≤1024px)
    document.querySelectorAll('.has-dropdown > .dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                const parentLi = toggle.closest('.has-dropdown');
                const isOpen = parentLi.classList.contains('is-open');
                parentLi.classList.toggle('is-open');
                toggle.setAttribute('aria-expanded', !isOpen);
            }
        });
    });

    // Close mobile menu on resize to desktop
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    function handleMobileMenu(e) {
        if (!e.matches && mainMenu.classList.contains('is-open')) {
            mainMenu.classList.remove('is-open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
        }
    }
    mediaQuery.addEventListener('change', handleMobileMenu);
});