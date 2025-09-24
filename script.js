// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Inicializar todas las funcionalidades
    initSmoothScrolling();
    initHeaderScroll();
    initFormValidation();
    initAnimatedCounters();
    initParallaxEffect();
    initFootballAnimations();
    initTypingEffect();
    initDarkMode();
});

// Función para scroll suave a secciones
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Inicializar scroll suave para todos los enlaces de navegación
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .footer-section a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Efecto de header al hacer scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(46, 139, 87, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
            header.style.backdropFilter = 'none';
        }
        
        // Ocultar/mostrar header al hacer scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Validación del formulario de contacto
function initFormValidation() {
    const form = document.querySelector('.contact-form form');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input, textarea');
            let isValid = true;
            
            // Limpiar errores previos
            inputs.forEach(input => {
                input.style.borderColor = '#eee';
            });
            
            // Validar cada campo
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#e74c3c';
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
                        input.style.borderColor = '#e74c3c';
                        isValid = false;
                    }
                }
            });
            
            if (isValid) {
                // Obtener datos del formulario
                const formData = new FormData(form);
                const nombre = form.querySelector('input[type="text"]').value;
                const email = form.querySelector('input[type="email"]').value;
                const mensaje = form.querySelector('textarea').value;
                
                // Enviar mensaje por WhatsApp
                const whatsappMessage = `Hola! Soy ${nombre} (${email}). ${mensaje}`;
                const whatsappUrl = `https://wa.me/5492634616717?text=${encodeURIComponent(whatsappMessage)}`;
                
                // Abrir WhatsApp
                window.open(whatsappUrl, '_blank');
                
                // Enviar email
                const emailSubject = 'Consulta desde Mi Partido App';
                const emailBody = `Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`;
                const emailUrl = `mailto:mipartido.oficial@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                
                // Abrir cliente de email
                setTimeout(() => {
                    window.location.href = emailUrl;
                }, 1000);
                
                // Actualizar botón
                submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje Enviado!';
                submitBtn.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
                    submitBtn.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
                    form.reset();
                }, 3000);
                
                // Mostrar mensaje de éxito
                showNotification('¡Mensaje enviado! Se abrirán WhatsApp y tu cliente de email.', 'success');
            } else {
                showNotification('Por favor, completa todos los campos correctamente.', 'error');
            }
        });
    }
}

// Función para mostrar notificaciones
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Contadores animados (si decides agregar estadísticas)
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Observer para activar cuando el elemento sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Efecto parallax para el hero
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const footballField = document.querySelector('.football-field');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (footballField) {
            footballField.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });
}

// Animaciones específicas de fútbol
function initFootballAnimations() {
    // Animación de pelota rebotando en el logo
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.addEventListener('mouseenter', function() {
            this.style.animation = 'bounce 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = 'spin 3s linear infinite';
            }, 600);
        });
    }
    
    // Efecto de hover en las tarjetas de términos
    const termCards = document.querySelectorAll('.term-card');
    termCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.term-header i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.color = 'var(--accent-color)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.term-header i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = 'var(--primary-color)';
            }
        });
    });
    
    // Crear pelotas flotantes ocasionales
    createFloatingFootballs();
}

// Crear pelotas de fútbol flotantes
function createFloatingFootballs() {
    const createFootball = () => {
        const football = document.createElement('div');
        football.innerHTML = '⚽';
        football.style.cssText = `
            position: fixed;
            font-size: 2rem;
            pointer-events: none;
            z-index: 1;
            opacity: 0.1;
            animation: floatAcross 15s linear infinite;
            top: ${Math.random() * window.innerHeight}px;
            left: -50px;
        `;
        
        document.body.appendChild(football);
        
        setTimeout(() => {
            if (document.body.contains(football)) {
                document.body.removeChild(football);
            }
        }, 15000);
    };
    
    // Crear una pelota cada 10 segundos
    setInterval(createFootball, 10000);
}

// Efecto de escritura para el título
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Iniciar el efecto después de un pequeño delay
        setTimeout(typeWriter, 1000);
    }
}

// Agregar animación CSS para shake
const shakeCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@keyframes floatAcross {
    0% { 
        transform: translateX(-50px) rotate(0deg);
        opacity: 0;
    }
    10% { opacity: 0.1; }
    90% { opacity: 0.1; }
    100% { 
        transform: translateX(calc(100vw + 50px)) rotate(360deg);
        opacity: 0;
    }
}
`;

// Agregar los estilos CSS adicionales
const style = document.createElement('style');
style.textContent = shakeCSS;
document.head.appendChild(style);

// Función para resaltar secciones al hacer scroll
function initSectionHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const highlightSection = () => {
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightSection);
}

// Inicializar highlight de secciones
initSectionHighlight();

// Función para lazy loading de imágenes (si decides agregar imágenes)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Función para modo oscuro
function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const icon = darkModeToggle?.querySelector('i');
    
    if (darkModeToggle) {
        // Función para actualizar el icono
        const updateIcon = (isDark) => {
            if (icon) {
                icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            }
        };
        
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            updateIcon(isDarkMode);
            
            // Mostrar notificación
            showNotification(
                isDarkMode ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado', 
                'success'
            );
        });
        
        // Cargar preferencia guardada
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        if (savedDarkMode) {
            document.body.classList.add('dark-mode');
            updateIcon(true);
        }
    }
}

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// Optimización de rendimiento
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce a eventos de scroll
const debouncedScroll = debounce(() => {
    // Funciones de scroll optimizadas
}, 10);

window.addEventListener('scroll', debouncedScroll);
