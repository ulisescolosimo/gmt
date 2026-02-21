/**
 * Animaciones con GSAP + ScrollTrigger
 * Grupo PMKT - Entrada del hero y revelado de secciones al hacer scroll
 */
(function () {
    'use strict';

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // ========== HERO: animación de entrada ==========
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const title = heroContent.querySelector('.hero-title');
        const subtitle = heroContent.querySelector('.hero-subtitle');
        const buttons = heroContent.querySelector('.hero-buttons');

        gsap.fromTo([title, subtitle, buttons],
            { opacity: 0, y: 36 },
            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.3
            }
        );
    }

    // ========== Revelado genérico por sección ==========
    function animateSection(selector, options = {}) {
        const el = document.querySelector(selector);
        if (!el) return;

        const {
            children = null,
            stagger = 0.1,
            y = 28,
            duration = 0.7,
            start = 'top 85%'
        } = options;

        const targets = children ? el.querySelectorAll(children) : [el];
        if (!targets.length) return;

        gsap.fromTo(targets,
            { opacity: 0, y },
            {
                opacity: 1,
                y: 0,
                duration,
                stagger: targets.length > 1 ? stagger : 0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start,
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // Quienes Somos: contenido lateral + cards
    const quienesSection = document.querySelector('#quienes-somos');
    if (quienesSection) {
        const quienesContent = quienesSection.querySelector('.quienes-somos-sticky');
        const quienesCards = quienesSection.querySelectorAll('.quienes-card');

        if (quienesContent) {
            gsap.fromTo(quienesContent.querySelectorAll('.section-label, .section-title, .section-description'),
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: quienesSection, start: 'top 82%', toggleActions: 'play none none none' }
                }
            );
        }
        if (quienesCards.length) {
            gsap.fromTo(quienesCards,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.65,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: quienesSection.querySelector('.quienes-somos-cards'), start: 'top 88%', toggleActions: 'play none none none' }
                }
            );
        }
    }

    // Quote banner
    const quoteBanner = document.querySelector('.quote-banner');
    if (quoteBanner) {
        const quoteText = quoteBanner.querySelector('.quote-text');
        if (quoteText) {
            gsap.fromTo(quoteText,
                { opacity: 0, scale: 0.96 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: quoteBanner, start: 'top 88%', toggleActions: 'play none none none' }
                }
            );
        }
    }

    // Management
    const managementSection = document.querySelector('#management');
    if (managementSection) {
        const content = managementSection.querySelector('.section-content');
        const visual = managementSection.querySelector('.section-visual');
        gsap.fromTo([content, visual],
            { opacity: 0, y: 32 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: { trigger: managementSection, start: 'top 82%', toggleActions: 'play none none none' }
            }
        );
    }

    // Divisiones: header + cards
    const divisionesSection = document.querySelector('#divisiones');
    if (divisionesSection) {
        const header = divisionesSection.querySelector('.section-header');
        const cards = divisionesSection.querySelectorAll('.division-card');

        if (header) {
            gsap.fromTo(header.querySelectorAll('.section-label, .section-title, .section-description'),
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: divisionesSection, start: 'top 85%', toggleActions: 'play none none none' }
                }
            );
        }
        if (cards.length) {
            gsap.fromTo(cards,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: divisionesSection.querySelector('.divisiones-carousel-wrapper'), start: 'top 88%', toggleActions: 'play none none none' }
                }
            );
        }
    }

    // Responsabilidad
    const responsabilidadSection = document.querySelector('#responsabilidad');
    if (responsabilidadSection) {
        const content = responsabilidadSection.querySelector('.section-content');
        const visual = responsabilidadSection.querySelector('.section-visual');
        gsap.fromTo([content, visual],
            { opacity: 0, y: 32 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: { trigger: responsabilidadSection, start: 'top 82%', toggleActions: 'play none none none' }
            }
        );
    }

    // Contacto
    const contactSection = document.querySelector('#contacto');
    if (contactSection) {
        const contactContent = contactSection.querySelector('.contact-content');
        const formWrapper = contactSection.querySelector('.contact-form-wrapper');
        gsap.fromTo([contactContent, formWrapper],
            { opacity: 0, y: 36 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: { trigger: contactSection, start: 'top 85%', toggleActions: 'play none none none' }
            }
        );
    }

    // Header: ligera animación al cargar
    const header = document.getElementById('header');
    if (header) {
        gsap.fromTo(header, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    }

    // Footer: fade in al entrar en viewport
    const footer = document.querySelector('.footer');
    if (footer) {
        gsap.fromTo(footer,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: { trigger: footer, start: 'top 95%', toggleActions: 'play none none none' }
            }
        );
    }
})();
