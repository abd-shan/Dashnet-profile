document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    initNavigation();
    setupMobileMenu();
    setupSmoothScrolling();
    setupScrollAnimations();
    setupFAQAccordion();
}

function initNavigation() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('open');
        mobileMenuOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        mobileMenuOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function checkVisibility() {
    const fadeElements = document.querySelectorAll(
        '.section, .service-card, .about-card, .package-card, .testimonial-card, .faq-item'
    );

    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });

    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

function setupScrollAnimations() {
    const fadeElements = document.querySelectorAll(
        '.section, .service-card, .about-card, .package-card, .testimonial-card, .faq-item'
    );

    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    setTimeout(() => {
        checkVisibility();
    }, 100);

    window.addEventListener('scroll', checkVisibility);
}

function setupFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length === 0) return;

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');

            document.querySelectorAll('.faq-answer').forEach(item => {
                if (item !== answer && item.classList.contains('open')) {
                    item.classList.remove('open');
                    item.previousElementSibling.querySelector('i').style.transform = 'rotate(0deg)';
                }
            });

            answer.classList.toggle('open');
            icon.style.transform = answer.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    });
}


// تتبع النقرات على واتساب
function trackWhatsAppClicks() {
    const whatsappLinks = document.querySelectorAll('.whatsapp-link, .whatsapp-direct-btn, .whatsapp-package-btn');

    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const card = this.closest('.package-card');
            if (card) {
                const productName = card.querySelector('.package-name')?.textContent || 'منتج غير معروف';
                console.log(`المنتج المحدد: ${productName}`);
            }
        });
    });
}

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    trackWhatsAppClicks();
});