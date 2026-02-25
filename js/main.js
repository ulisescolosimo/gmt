// ============================================
// Navigation
// ============================================
const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
const navList = document.getElementById('navList');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky header on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Function to close mobile menu
function closeMobileMenu() {
    if (navToggle) navToggle.classList.remove('active');
    if (nav) nav.classList.remove('active');
    document.body.style.overflow = '';
}

// Close button for mobile menu
const navClose = document.getElementById('navClose');
if (navClose) {
    navClose.addEventListener('click', () => {
        closeMobileMenu();
    });
}

// Mobile menu toggle (hamburger on the right)
if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
        const isActive = navToggle.classList.toggle('active');
        nav.classList.toggle('active', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    });
}

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// ============================================
// Translation System
// ============================================
const translations = {
    es: {
        // Navigation
        navQuienesSomos: 'QUIENES SOMOS',
        navManagement: 'MANAGEMENT',
        navDivisiones: 'DIVISIONES',
        navResponsabilidad: 'RESPONSABILIDAD',
        navContacto: 'CONTACTO',
        
        // Hero
        heroTitle: 'UNA VISIÓN DIFERENTE',
        heroSubtitle: 'La solución integral, dinámica y personalizada que cada cliente necesita.',
        heroBtnNosotros: 'NOSOTROS',
        heroBtnDivisiones: 'DIVISIONES',
        
        // Quienes Somos
        quienesLabel: 'EXPERIENCIA A TU FAVOR',
        quienesTitle: 'QUIENES SOMOS',
        quienesDescription: 'Somos un <strong>equipo multidisciplinario</strong> que estudia las necesidades del cliente para <strong><u>brindar la mejor solución</u></strong>.',
        quienesCard1Title: 'Conocimiento',
        quienesCard1Text: 'Desarrollamos una metodología basada en el conocimiento profundo de nuestro cliente: su estructura familiar, su patrimonio y estructura tributaria, su perfil de riesgo y sobre todo conocer sus sueños y traducirlos en objetivos.',
        quienesCard2Title: 'Ofrecemos',
        quienesCard2Text: 'Para cada cliente una planificación a su medida: crear la mejor estructura patrimonial y tomar las mejores decisiones de inversión, de ahorro y protección.',
        quienesCard3Title: 'Resultados',
        quienesCard3Text: 'Nuestro enfoque integral del cliente y nuestras herramientas (diferentes, innovadoras y más eficientes) nos permiten alcanzar mejores resultados, el máximo ahorro impositivo posible y un blindaje integral del patrimonio.',
        
        // Quote
        quoteText: '"La mejor inversión comienza<br>en una correcta planificación"',
        
        // Management
        managementLabel: 'Liderazgo con visión',
        managementTitle: 'MANAGEMENT',
        managementText1: 'Los que hacemos Grupo PMKT tenemos una profunda formación en economía y finanzas. Nos enfocamos en mercados financieros, planificación financiera y tributación (local e internacional).',
        managementText2: 'Contamos con socios estratégicos en todo el mundo, Brokers en LATAM, USA y Europa; Estudios Jurídicos y Contables especialistas en cada jurisdicción y con empresas de protección patrimonial y productos financieros estructurados.',
        
        // Divisiones
        divisionesLabel: 'Diversificación con visión estratégica',
        divisionesTitle: 'DIVISIONES',
        divisionesDescription: 'Nuestros clientes reciben el asesoramiento integral <br> y un seguimiento coordinado de cada una de nuestras áreas de trabajo.',
        divisionesVerMas: 'Ver Más',
        divisionesVerMenos: 'Ver Menos',
        divisionCapitalTitle: 'PMKT Capital',
        divisionCapitalDesc: 'Potenciamos la inversión tradicional. Contamos con la solidez de los mejores brokers locales e internacionales.',
        divisionCapital1: 'Inversiones Locales y LATAM',
        divisionCapital2: 'Brokerage & Management USA',
        divisionCapital3: 'Brokerage & Management Europa',
        divisionPlanningTitle: 'PMKT Planning',
        divisionPlanningDesc: 'Un concepto diferente, el plan perfecto combinado con las herramientas más adecuadas.',
        divisionPlanning1: 'Planificación financiera integral para empresas y personas',
        divisionPlanning2: 'Ahorro',
        divisionPlanning3: 'Inversión',
        divisionPlanning4: 'Estructuras legales',
        divisionPlanning5: 'Protección Patrimonial',
        divisionPlanning6: 'Tax Planning',
        divisionPlanning7: 'Privacidad',
        divisionServicesTitle: 'PMKT Services',
        divisionServicesDesc: 'La solución a cualquier necesidad financiera para personas y empresas.',
        divisionServices1: 'Apertura de cuentas bancarias (local y en el exterior)',
        divisionServices2: 'Compra de moneda extranjera',
        divisionServices3: 'Transferencias Internacionales',
        divisionServices4: 'Crypto monedas',
        divisionServices5: 'Servicios en el interior del país',
        divisionPymesTitle: 'PMKT Pymes',
        divisionPymesDesc: 'Conocemos a las PYMES y entendemos todas las ventajas que pueden obtener.',
        divisionPymes1: 'Colocación de Deuda',
        divisionPymes2: 'Clasificación SGR',
        divisionPymes3: 'Ingeniería Financiera',
        divisionPymes4: 'Cash Management',
        divisionPymes5: 'Seguros y Gestión de Riesgos',
        
        // Responsabilidad
        responsabilidadLabel: 'Compromiso social',
        responsabilidadTitle: 'RESPONSABILIDAD',
        responsabilidadSubtitle: 'Grupo PMKT colabora con la Fundación Pequeños Pasos.',
        responsabilidadDescription: 'Una ONG que mejora la calidad de vida de familias en Argentina, que se encuentran en riesgo social, a través de soluciones a largo plazo, en cuatro diferentes campos: Educación, Salud y Nutrición, Trabajo e Integración Social.',
        responsabilidadLink: 'Si querés sumarte a la misión hacé click aquí: Fundación Pequeños Pasos',
        
        // Contact
        contactTitle: '¿Listo para comenzar?',
        contactSubtitle: 'TU PRÓXIMA OPORTUNIDAD EMPIEZA AQUÍ.',
        contactDescription: 'Completá tus datos y te contactaremos a la brevedad. Nuestro equipo está listo para ayudarte a alcanzar tus objetivos financieros.',
        contactFeature1: 'Respuesta en 24hs',
        contactFeature2: 'Asesoría personalizada',
        contactFormTitle: 'Contactanos',
        contactFormSubtitle: 'Completá el formulario y nos pondremos en contacto contigo',
        contactNombre: 'Nombre',
        contactApellido: 'Apellido',
        contactEmpresa: 'Empresa',
        contactTelefono: 'Teléfono',
        contactEmail: 'Correo Electrónico',
        contactComentarios: 'Comentarios',
        contactNombrePlaceholder: 'Tu nombre',
        contactApellidoPlaceholder: 'Tu apellido',
        contactEmpresaPlaceholder: 'Nombre de tu empresa',
        contactTelefonoPlaceholder: '+54 9 11 1234-5678',
        contactEmailPlaceholder: 'tu@email.com',
        contactComentariosPlaceholder: 'Cuéntanos sobre tu consulta o necesidad...',
        contactSubmit: 'Enviar mensaje',
        contactSending: 'Enviando...',
        contactSuccess: '¡Mensaje enviado exitosamente! Te contactaremos a la brevedad.',
        contactError: 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.',
        required: '*',
        
        // Footer
        footerCopyright: 'Copyright © 2021 Grupo PMKT. Todos los derechos reservados.',
        footerSocial: 'SOCIAL',
        footerContacto: 'CONTACTO',
        footerNavegacion: 'NAVEGACIÓN'
    },
    en: {
        // Navigation
        navQuienesSomos: 'ABOUT US',
        navManagement: 'MANAGEMENT',
        navDivisiones: 'DIVISIONS',
        navResponsabilidad: 'RESPONSIBILITY',
        navContacto: 'CONTACT',
        
        // Hero
        heroTitle: 'A DIFFERENT VISION',
        heroSubtitle: 'The comprehensive, dynamic and personalized solution that each client needs.',
        heroBtnNosotros: 'ABOUT US',
        heroBtnDivisiones: 'DIVISIONS',
        
        // Quienes Somos
        quienesLabel: 'EXPERIENCE ON YOUR SIDE',
        quienesTitle: 'ABOUT US',
        quienesDescription: 'We are a <strong>multidisciplinary team</strong> that studies client needs to <strong><u>provide the best solution</u></strong>.',
        quienesCard1Title: 'Knowledge',
        quienesCard1Text: 'We develop a methodology based on deep knowledge of our client: their family structure, assets and tax structure, risk profile and above all, understanding their dreams and translating them into objectives.',
        quienesCard2Title: 'We Offer',
        quienesCard2Text: 'For each client, a tailored planning: creating the best asset structure and making the best investment, savings and protection decisions.',
        quienesCard3Title: 'Results',
        quienesCard3Text: 'Our comprehensive approach to the client and our tools (different, innovative and more efficient) allow us to achieve better results, maximum possible tax savings and comprehensive asset protection.',
        
        // Quote
        quoteText: '"The best investment begins<br>with proper planning"',
        
        // Management
        managementLabel: 'Leadership with vision',
        managementTitle: 'MANAGEMENT',
        managementText1: 'Those of us who make up Grupo PMKT have deep training in economics and finance. We focus on financial markets, financial planning and taxation (local and international).',
        managementText2: 'We have strategic partners around the world, Brokers in LATAM, USA and Europe; Legal and Accounting firms specializing in each jurisdiction and companies for asset protection and structured financial products.',
        
        // Divisiones
        divisionesLabel: 'Diversification with strategic vision',
        divisionesTitle: 'DIVISIONS',
        divisionesDescription: 'Our clients receive comprehensive advice and coordinated follow-up from each of our work areas.',
        divisionesVerMas: 'See More',
        divisionesVerMenos: 'See Less',
        divisionCapitalTitle: 'PMKT Capital',
        divisionCapitalDesc: 'We enhance traditional investment. We have the strength of the best local and international brokers.',
        divisionCapital1: 'Local and LATAM Investments',
        divisionCapital2: 'Brokerage & Management USA',
        divisionCapital3: 'Brokerage & Management Europe',
        divisionPlanningTitle: 'PMKT Planning',
        divisionPlanningDesc: 'A different concept, the perfect plan combined with the most appropriate tools.',
        divisionPlanning1: 'Comprehensive financial planning for companies and individuals',
        divisionPlanning2: 'Savings',
        divisionPlanning3: 'Investment',
        divisionPlanning4: 'Legal structures',
        divisionPlanning5: 'Asset Protection',
        divisionPlanning6: 'Tax Planning',
        divisionPlanning7: 'Privacy',
        divisionServicesTitle: 'PMKT Services',
        divisionServicesDesc: 'The solution to any financial need for individuals and companies.',
        divisionServices1: 'Bank account opening (local and abroad)',
        divisionServices2: 'Foreign currency purchase',
        divisionServices3: 'International Transfers',
        divisionServices4: 'Cryptocurrencies',
        divisionServices5: 'Services in the interior of the country',
        divisionPymesTitle: 'PMKT SMEs',
        divisionPymesDesc: 'We know SMEs and understand all the advantages they can obtain.',
        divisionPymes1: 'Debt Placement',
        divisionPymes2: 'SGR Classification',
        divisionPymes3: 'Financial Engineering',
        divisionPymes4: 'Cash Management',
        divisionPymes5: 'Insurance and Risk Management',
        
        // Responsabilidad
        responsabilidadLabel: 'Social commitment',
        responsabilidadTitle: 'RESPONSIBILITY',
        responsabilidadSubtitle: 'Grupo PMKT collaborates with Fundación Pequeños Pasos.',
        responsabilidadDescription: 'An NGO that improves the quality of life of families in Argentina who are at social risk, through long-term solutions, in four different fields: Education, Health and Nutrition, Work and Social Integration.',
        responsabilidadLink: 'If you want to join the mission, click here: Fundación Pequeños Pasos',
        
        // Contact
        contactTitle: 'Ready to get started?',
        contactSubtitle: 'YOUR NEXT OPPORTUNITY STARTS HERE.',
        contactDescription: 'Complete your details and we will contact you shortly. Our team is ready to help you achieve your financial goals.',
        contactFeature1: 'Response within 24hs',
        contactFeature2: 'Personalized advice',
        contactFormTitle: 'Contact us',
        contactFormSubtitle: 'Fill out the form and we will contact you',
        contactNombre: 'First Name',
        contactApellido: 'Last Name',
        contactEmpresa: 'Company',
        contactTelefono: 'Phone',
        contactEmail: 'Email',
        contactComentarios: 'Comments',
        contactNombrePlaceholder: 'Your first name',
        contactApellidoPlaceholder: 'Your last name',
        contactEmpresaPlaceholder: 'Your company name',
        contactTelefonoPlaceholder: '+1 234 567-8900',
        contactEmailPlaceholder: 'your@email.com',
        contactComentariosPlaceholder: 'Tell us about your inquiry or need...',
        contactSubmit: 'Send message',
        contactSending: 'Sending...',
        contactSuccess: 'Message sent successfully! We will contact you shortly.',
        contactError: 'There was an error sending the message. Please try again.',
        required: '*',
        
        // Footer
        footerCopyright: 'Copyright © 2021 Grupo PMKT. All rights reserved.',
        footerSocial: 'SOCIAL',
        footerContacto: 'CONTACT',
        footerNavegacion: 'NAVIGATION'
    }
};

// Current language (default from localStorage or 'es')
let currentLang = localStorage.getItem('language') || 'es';

// Exponer para divisiones.js y otros
window.currentLang = currentLang;

// Function to translate the page
function translatePage(lang) {
    currentLang = lang;
    window.currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // For labels, preserve the required asterisk span if it exists
            if (element.tagName === 'LABEL') {
                const requiredSpan = element.querySelector('.required');
                if (requiredSpan) {
                    element.innerHTML = translations[lang][key] + ' <span class="required">*</span>';
                } else {
                    element.innerHTML = translations[lang][key];
                }
            } else if (element.tagName === 'BUTTON' && element.classList.contains('division-toggle')) {
                // For division toggle buttons, preserve the SVG chevron
                const svg = element.querySelector('svg.chevron');
                if (svg) {
                    element.innerHTML = translations[lang][key] + ' ' + svg.outerHTML;
                } else {
                    element.innerHTML = translations[lang][key];
                }
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    // Avisar a divisiones.js para actualizar etiquetas Ver Más/Ver Menos
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: lang } }));
}

// ============================================
// Language Selector
// ============================================
const langToggle = document.getElementById('langToggle');
const langDropdown = document.getElementById('langDropdown');

// Initialize language on page load
translatePage(currentLang);

if (langToggle && langDropdown) {
    // Function to close dropdown
    function closeDropdown() {
        langToggle.setAttribute('aria-expanded', 'false');
        langDropdown.classList.remove('show');
    }

    langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = langToggle.getAttribute('aria-expanded') === 'true';
        langToggle.setAttribute('aria-expanded', !isExpanded);
        langDropdown.classList.toggle('show');
    });

    // Close button handler
    const langClose = langDropdown.querySelector('.lang-close');
    if (langClose) {
        langClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeDropdown();
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
            closeDropdown();
        }
    });

    // Update button display based on current language (Spain / USA flags + code)
    function updateLangButton() {
        const code = currentLang === 'es' ? 'ES' : 'EN';
        const langCode = langToggle.querySelector('.lang-code');
        if (langCode) langCode.textContent = code;
        const flagEs = langToggle.querySelector('.lang-flag-es');
        const flagUs = langToggle.querySelector('.lang-flag-us');
        if (flagEs) flagEs.classList.toggle('hidden', currentLang !== 'es');
        if (flagUs) flagUs.classList.toggle('hidden', currentLang !== 'en');
    }

    // Handle language selection
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedLang = option.dataset.lang;
            closeDropdown();
            translatePage(selectedLang);
            updateLangButton();
        });
    });

    updateLangButton();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);
// Activar nav link al cargar la página
activateNavLink();

// ============================================
// Scroll Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -150px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with data-animate attribute
document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// Observe elementos con data-animate-delay (tarjetas de Quienes Somos)
document.querySelectorAll('[data-animate-delay]').forEach(el => {
    observer.observe(el);
});

// ============================================
// Contact Form
// ============================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const submitBtnSpan = submitBtn.querySelector('span');
        const originalText = submitBtnSpan ? submitBtnSpan.textContent : submitBtn.textContent;
        if (submitBtnSpan) {
            submitBtnSpan.textContent = translations[currentLang].contactSending;
        } else {
            submitBtn.textContent = translations[currentLang].contactSending;
        }
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        try {
            // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success
            formMessage.textContent = translations[currentLang].contactSuccess;
            formMessage.className = 'form-message show success';
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 5000);
            
        } catch (error) {
            // Error
            formMessage.textContent = translations[currentLang].contactError;
            formMessage.className = 'form-message show error';
        } finally {
            if (submitBtnSpan) {
                submitBtnSpan.textContent = originalText;
            } else {
                submitBtn.textContent = originalText;
            }
            submitBtn.disabled = false;
        }
    });
}

// ============================================
// Parallax Effect for Hero (optional)
// ============================================
// Desactivado para evitar deformación del fondo
// Si se desea un efecto parallax sutil, descomentar y ajustar:
/*
const heroBackground = document.querySelector('.hero-background');

if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroBackground.style.transform = `translateY(${rate}px)`;
    });
}
*/

// ============================================
// Performance: Lazy load images
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
