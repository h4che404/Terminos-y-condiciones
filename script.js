// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function () {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Inicializar funcionalidades
    initSmoothScrolling();
    initHeaderScroll();
    initParallaxEffect();
    initThemeToggle(); // Changed from Dark Mode to Theme Toggle
    initCursorEffect(); // New fluid cursor effect
});

// Scroll suave
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

// Header effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Parallax effect for hero
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        if (heroContent) {
            heroContent.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }
    });
}

// Theme Toggle (Night/Day Match)
function initThemeToggle() {
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    const icon = toggleBtn?.querySelector('i');
    const body = document.body;

    // Check local storage
    if (localStorage.getItem('theme') === 'light') {
        enableLightMode();
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                disableLightMode();
            } else {
                enableLightMode();
            }
        });
    }

    function enableLightMode() {
        body.classList.add('light-mode');
        if (icon) icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
        updateCSSVariables('light');
    }

    function disableLightMode() {
        body.classList.remove('light-mode');
        if (icon) icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
        updateCSSVariables('dark');
    }
}

function updateCSSVariables(theme) {
    const root = document.documentElement;
    if (theme === 'light') {
        root.style.setProperty('--primary-color', 'var(--light-bg)');
        root.style.setProperty('--secondary-color', '#e2e8f0');
        root.style.setProperty('--text-main', 'var(--light-text)');
        root.style.setProperty('--text-muted', '#64748b');
        root.style.setProperty('--glass-bg', 'var(--light-glass)');
        root.style.setProperty('--glass-border', 'var(--light-border)');
        root.style.setProperty('--accent-color', 'var(--light-accent)');
    } else {
        root.style.removeProperty('--primary-color');
        root.style.removeProperty('--secondary-color');
        root.style.removeProperty('--text-main');
        root.style.removeProperty('--text-muted');
        root.style.removeProperty('--glass-bg');
        root.style.removeProperty('--glass-border');
        root.style.removeProperty('--accent-color');
    }
}

// Validación del formulario de contacto
function initFormValidation() {
    const form = document.querySelector('.contact-form form');
    const submitBtn = document.querySelector('.submit-btn');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const inputs = form.querySelectorAll('input, textarea');
            let isValid = true;

            // Limpiar errores previos
            inputs.forEach(input => {
                input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            });

            // Validar cada campo
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ef4444';
                    isValid = false;

                    // Agregar animación de shake
                    input.style.animation = 'shake 0.5s ease-in-out';
                    setTimeout(() => {
                        input.style.animation = '';
                    }, 500);
                }

                // Validación específica para email
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        input.style.borderColor = '#ef4444';
                        isValid = false;
                    }
                }
            });

            if (isValid) {
                // Obtener datos del formulario
                const nombre = form.querySelector('input[type="text"]').value;
                const email = form.querySelector('input[type="email"]').value;
                const mensaje = form.querySelector('textarea').value;

                // Construir mailto link
                const emailSubject = `Consulta de ${nombre} - Mi Partido App`;
                const emailBody = `Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`;
                const emailUrl = `mailto:mipartido.oficial@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

                // Simular envío visualmente
                const originalBtnContent = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.style.opacity = '0.8';

                setTimeout(() => {
                    // Abrir cliente de correo
                    window.location.href = emailUrl;

                    // Mostrar éxito
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Listo!';
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

                    showNotification('Se abrirá tu cliente de correo para enviar el mensaje.', 'success');

                    // Resetear formulario y botón
                    setTimeout(() => {
                        form.reset();
                        submitBtn.innerHTML = originalBtnContent;
                        submitBtn.style.background = '';
                        submitBtn.style.opacity = '1';
                    }, 3000);
                }, 1000);
            } else {
                showNotification('Por favor, completa todos los campos correctamente.', 'error');
            }
        });
    }
}

// Custom Cursor Effect (Subtle glow following mouse)
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    const style = document.createElement('style');
    style.textContent = `
        .cursor-glow {
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(0, 255, 136, 0.15) 0%, transparent 70%);
            position: fixed;
            top: 0;
            left: 0;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            transition: opacity 0.3s ease;
            mix-blend-mode: screen;
        }
        body.light-mode .cursor-glow {
            background: radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%);
            mix-blend-mode: multiply;
        }
    `;
    document.head.appendChild(style);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;

        cursorX += dx * 0.1;
        cursorY += dy * 0.1;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}
