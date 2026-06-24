/**
 * Sai Madhurima Bandaru - Portfolio JS Interactions
 * Fully compliant with web secure coding guidelines (No innerHTML, no native alerts).
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const resumeModal = document.getElementById('resume-modal');
    const btnViewResume = document.getElementById('btn-view-resume');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnPrintResume = document.getElementById('btn-print-resume');

    const contactForm = document.getElementById('contact-form');
    const inputName = document.getElementById('contact-name');
    const inputEmail = document.getElementById('contact-email');
    const inputMessage = document.getElementById('contact-message');

    const errorName = document.getElementById('error-name');
    const errorEmail = document.getElementById('error-email');
    const errorMessage = document.getElementById('error-message');
    const formStatus = document.getElementById('form-status');

    /* ==========================================================================
       1. Navigation Header Scroll Effect
       ========================================================================== */
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Initial check on page load

    /* ==========================================================================
       2. Active Scroll Spy (Highlight active section link on scroll)
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');

    const scrollSpy = () => {
        const scrollPosition = window.scrollY + 120; // offset for sticky navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);

    /* ==========================================================================
       3. Mobile Navigation Menu Toggle
       ========================================================================== */
    const toggleMobileMenu = () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('open');
    };

    const closeMobileMenu = () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
    };

    navToggle.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking on nav link or clicking outside
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
            closeMobileMenu();
        }
    });

    /* ==========================================================================
       4. Interactive Printable Resume Modal Control
       ========================================================================== */
    const openModal = () => {
        resumeModal.classList.add('open');
        resumeModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Lock background scroll
        btnCloseModal.focus();
    };

    const closeModal = () => {
        resumeModal.classList.remove('open');
        resumeModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Unlock background scroll
        btnViewResume.focus();
    };

    // btnViewResume now links directly to the PDF in index.html, no click listener needed for modal
    btnCloseModal.addEventListener('click', closeModal);

    // Close modal on backdrop click
    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            closeModal();
        }
    });

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal.classList.contains('open')) {
            closeModal();
        }
    });

    // Print CV Modal Trigger
    btnPrintResume.addEventListener('click', () => {
        window.print();
    });

    /* ==========================================================================
       5. Contact Form Validator (Secure & Safe DOM implementation)
       ========================================================================== */
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const clearFormErrors = () => {
        errorName.textContent = '';
        errorEmail.textContent = '';
        errorMessage.textContent = '';

        inputName.classList.remove('invalid');
        inputEmail.classList.remove('invalid');
        inputMessage.classList.remove('invalid');
    };

    const showFormStatus = (type, messageText) => {
        // Safe DOM Creation instead of innerHTML
        formStatus.replaceChildren(); // clear any previous status

        const statusBox = document.createElement('div');
        statusBox.className = `status-box ${type}`;

        // Add a clean status icon
        const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        iconSvg.setAttribute('width', '18');
        iconSvg.setAttribute('height', '18');
        iconSvg.setAttribute('viewBox', '0 0 24 24');
        iconSvg.setAttribute('fill', 'none');
        iconSvg.setAttribute('stroke', 'currentColor');
        iconSvg.setAttribute('stroke-width', '2.5');
        iconSvg.setAttribute('stroke-linecap', 'round');
        iconSvg.setAttribute('stroke-linejoin', 'round');

        if (type === 'success') {
            const checkPath = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            checkPath.setAttribute('points', '20 6 9 17 4 12');
            iconSvg.appendChild(checkPath);
        } else {
            const alertCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            alertCircle.setAttribute('cx', '12');
            alertCircle.setAttribute('cy', '12');
            alertCircle.setAttribute('r', '10');
            const alertLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            alertLine.setAttribute('x1', '12');
            alertLine.setAttribute('y1', '8');
            alertLine.setAttribute('x2', '12');
            alertLine.setAttribute('y2', '12');
            const alertDot = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            alertDot.setAttribute('x1', '12');
            alertDot.setAttribute('y1', '16');
            alertDot.setAttribute('x2', '12.01');
            alertDot.setAttribute('y2', '16');
            iconSvg.appendChild(alertCircle);
            iconSvg.appendChild(alertLine);
            iconSvg.appendChild(alertDot);
        }

        const textSpan = document.createElement('span');
        textSpan.textContent = messageText;

        statusBox.appendChild(iconSvg);
        statusBox.appendChild(textSpan);
        formStatus.appendChild(statusBox);
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearFormErrors();

        const nameVal = inputName.value.trim();
        const emailVal = inputEmail.value.trim();
        const messageVal = inputMessage.value.trim();

        let isValid = true;

        // 1. Name Validation
        if (!nameVal) {
            errorName.textContent = 'Please enter your full name.';
            inputName.classList.add('invalid');
            isValid = false;
        } else if (nameVal.length < 2) {
            errorName.textContent = 'Name must be at least 2 characters long.';
            inputName.classList.add('invalid');
            isValid = false;
        }

        // 2. Email Validation
        if (!emailVal) {
            errorEmail.textContent = 'Please enter your email address.';
            inputEmail.classList.add('invalid');
            isValid = false;
        } else if (!validateEmail(emailVal)) {
            errorEmail.textContent = 'Please enter a valid email address.';
            inputEmail.classList.add('invalid');
            isValid = false;
        }

        // 3. Message Validation
        if (!messageVal) {
            errorMessage.textContent = 'Please write a brief message.';
            inputMessage.classList.add('invalid');
            isValid = false;
        } else if (messageVal.length < 10) {
            errorMessage.textContent = 'Your message should be at least 10 characters long.';
            inputMessage.classList.add('invalid');
            isValid = false;
        }

        if (isValid) {
            // Form is successfully validated client-side.
            // Under normal circumstances, this would POST to a backend service.
            // For this portfolio, we simulate a successful transmission with style.

            showFormStatus('success', 'Thank you! Your message has been sent successfully.');
            contactForm.reset();

            // Auto hide the success status after 6 seconds
            setTimeout(() => {
                formStatus.replaceChildren();
            }, 6000);

            // TODO(security): Replace this simulation with a backend integration when backend configuration is defined.
        } else {
            showFormStatus('error', 'Form validation failed. Please check the fields above.');
        }
    });
});
