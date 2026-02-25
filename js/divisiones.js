/**
 * Divisiones: una sola card abierta a la vez.
 * Cerradas: misma altura. Abierta: usa todo el alto que necesite (sin scroll).
 */

(function () {
    const divisionesSection = document.getElementById('divisiones');
    if (!divisionesSection) return;

    const grid = divisionesSection.querySelector('.divisiones-grid');
    const cards = grid ? grid.querySelectorAll('.division-card') : [];

    if (!cards.length) return;

    // Pequeño mapa de textos para el botón Ver Más / Ver Menos (i18n)
    const labels = {
        es: { divisionesVerMas: 'Ver Más', divisionesVerMenos: 'Ver Menos' },
        en: { divisionesVerMas: 'See More', divisionesVerMenos: 'See Less' }
    };

    function getLang() {
        return (typeof window.currentLang === 'string' && window.currentLang) ||
            document.documentElement.lang ||
            'es';
    }

    function setToggleLabel(toggle, key) {
        const lang = getLang();
        const text = (labels[lang] && labels[lang][key]) ? labels[lang][key] : labels.es[key] || key;
        const chevron = toggle.querySelector('svg.chevron');
        toggle.setAttribute('data-i18n', key);
        toggle.setAttribute('aria-expanded', key === 'divisionesVerMenos');
        if (chevron) {
            toggle.innerHTML = text + ' ' + chevron.outerHTML;
        } else {
            toggle.textContent = text;
        }
    }

    function closeCard(card) {
        card.classList.remove('is-open');
        const toggle = card.querySelector('.division-toggle');
        if (toggle) setToggleLabel(toggle, 'divisionesVerMas');
    }

    function toggleCard(card) {
        const isOpen = card.classList.contains('is-open');
        const toggle = card.querySelector('.division-toggle');
        if (isOpen) {
            card.classList.remove('is-open');
            if (toggle) setToggleLabel(toggle, 'divisionesVerMas');
        } else {
            cards.forEach(function (other) {
                if (other !== card) {
                    other.classList.remove('is-open');
                    const t = other.querySelector('.division-toggle');
                    if (t) setToggleLabel(t, 'divisionesVerMas');
                }
            });
            card.classList.add('is-open');
            if (toggle) setToggleLabel(toggle, 'divisionesVerMenos');
        }
    }

    // Inicializar: todas cerradas y etiquetas correctas
    cards.forEach(function (card) {
        card.classList.remove('is-open');
        const toggle = card.querySelector('.division-toggle');
        if (toggle) setToggleLabel(toggle, 'divisionesVerMas');
    });

    // Delegación: clic en el botón solo afecta a esa card
    grid.addEventListener('click', function (e) {
        const toggle = e.target.closest('.division-toggle');
        if (!toggle) return;
        const card = toggle.closest('.division-card');
        if (!card) return;
        e.preventDefault();
        toggleCard(card);
    });

    // Cuando cambia el idioma (evento desde main.js u otro)
    window.addEventListener('languagechange', function (e) {
        const lang = (e && e.detail && e.detail.lang) ? e.detail.lang : getLang();
        if (labels[lang]) {
            cards.forEach(function (card) {
                const toggle = card.querySelector('.division-toggle');
                if (!toggle) return;
                const key = card.classList.contains('is-open') ? 'divisionesVerMenos' : 'divisionesVerMas';
                setToggleLabel(toggle, key);
            });
        }
    });

    // Recalcular nada en resize; la altura es fija por CSS.
})();
