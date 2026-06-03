document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // CONTROLE DO MENU MOBILE (HAMBÚRGUER)
    // ==========================================================================
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        // Altera o ícone dinamicamente para maior acessibilidade visual
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Fecha o menu ao clicar em qualquer item (Single Page Navigation)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    // ==========================================================================
    // SISTEMA DE INTERSEÇÃO E HIGHLIGHT DO MENU (SCROLL MONITOR)
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // CONTADORES NUMÉRICOS ANIMADOS (DADOS ESTAT
