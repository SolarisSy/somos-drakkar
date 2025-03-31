// Menu Mobile
document.addEventListener('DOMContentLoaded', () => {
    // Menu Mobile Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
    
    // Função auxiliar para redirecionar para WhatsApp
    const redirectToWhatsApp = (message = '') => {
        const phoneNumber = '+5599985306285';
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    };
    
    // Configurar botões de contato para redirecionar para WhatsApp
    const contactButtons = document.querySelectorAll('.btn.secondary-btn, .cta-section .btn.primary-btn');
    contactButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            redirectToWhatsApp('Olá! Estou interessado nos serviços da Drakkar.');
        });
    });
    
    // Scroll Suave para Âncoras (mantido apenas para links que não são de contato)
    document.querySelectorAll('a[href^="#"]:not(.btn.secondary-btn):not(.cta-section .btn.primary-btn)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação do Terminal
    const terminalText = document.querySelectorAll('.typing-effect');
    
    if (terminalText.length > 0) {
        setTimeout(() => {
            terminalText.forEach((text, index) => {
                setTimeout(() => {
                    text.style.opacity = '0';
                    let fullText = text.textContent;
                    text.textContent = '';
                    text.style.opacity = '1';
                    
                    let i = 0;
                    const typeInterval = setInterval(() => {
                        if (i < fullText.length) {
                            text.textContent += fullText.charAt(i);
                            i++;
                        } else {
                            clearInterval(typeInterval);
                        }
                    }, 30);
                }, index * 1000);
            });
        }, 500);
    }
    
    // Efeito de Paralaxe na Matrix
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        document.querySelector('.matrix-bg').style.transform = `translateY(${scrollPosition * 0.05}px)`;
    });
    
    // Animação de entrada para cards de serviço
    const cards = document.querySelectorAll('.service-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
        card.classList.add('service-card-hidden');
    });
    
    // Formulário de Contato
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Obter dados do formulário
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Formatar mensagem para WhatsApp
            const whatsappMessage = `*Contato via Site Drakkar*\n\n*Nome:* ${name}\n*Email:* ${email}\n*Assunto:* ${subject}\n*Mensagem:* ${message}`;
            
            // Simulação de envio com efeitos visuais
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>ENVIANDO...</span>';
            
            setTimeout(() => {
                // Reset do formulário após "envio"
                contactForm.reset();
                
                // Feedback visual
                submitBtn.innerHTML = '<span>MENSAGEM ENVIADA!</span>';
                
                // Adicionar mensagem no terminal
                const terminalBody = document.querySelector('.terminal-body');
                if (terminalBody) {
                    const newMessage = document.createElement('p');
                    newMessage.innerHTML = '> <span class="typing-effect">Mensagem recebida. Redirecionando para WhatsApp...</span>';
                    terminalBody.insertBefore(newMessage, document.querySelector('.cursor'));
                    
                    // Animar a nova mensagem
                    const newText = newMessage.querySelector('.typing-effect');
                    let fullText = newText.textContent;
                    newText.textContent = '';
                    let i = 0;
                    
                    const typeInterval = setInterval(() => {
                        if (i < fullText.length) {
                            newText.textContent += fullText.charAt(i);
                            i++;
                        } else {
                            clearInterval(typeInterval);
                            
                            // Redirecionar para WhatsApp após animação
                            setTimeout(() => {
                                redirectToWhatsApp(whatsappMessage);
                                
                                // Resetar o botão após redirecionamento
                                setTimeout(() => {
                                    submitBtn.disabled = false;
                                    submitBtn.innerHTML = originalText;
                                }, 1000);
                            }, 800);
                        }
                    }, 30);
                } else {
                    // Se não houver terminal, redirecionar direto
                    redirectToWhatsApp(whatsappMessage);
                    
                    // Resetar o botão após redirecionamento
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    }, 2000);
                }
            }, 1500);
        });
    }
    
    // Animação do Cubo
    document.addEventListener('mousemove', (e) => {
        const cube = document.querySelector('.cube');
        if (cube) {
            const x = (window.innerWidth / 2 - e.pageX) / 30;
            const y = (window.innerHeight / 2 - e.pageY) / 30;
            
            cube.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        }
    });
    
    // Efeito de Digitação na Hero Section
    const typedText = document.querySelector('.typed-text');
    if (typedText) {
        typedText.style.width = '0';
        setTimeout(() => {
            typedText.style.width = '100%';
        }, 500);
    }
    
    // Adicionar classe de scroll ao header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Adicionar estilos CSS para as animações
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .service-card-hidden {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .fade-in {
        animation: fadeIn 0.6s ease forwards;
    }
    
    header.scrolled {
        background-color: rgba(0, 0, 0, 0.95);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
        padding: 1rem 0;
    }
`;

document.head.appendChild(style);

// Animação de partículas
class MatrixEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-2';
        this.canvas.style.opacity = '0.3';
        document.body.appendChild(this.canvas);
        
        this.fontSize = 12;
        this.columns = Math.floor(window.innerWidth / this.fontSize);
        this.drops = [];
        
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.floor(Math.random() * -100);
        }
        
        this.matrix = "01";
        for (let i = 0; i < 26; i++) {
            this.matrix += String.fromCharCode(0x30A0 + i);
        }
        
        this.draw = this.draw.bind(this);
        this.draw();
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.columns = Math.floor(window.innerWidth / this.fontSize);
            this.drops = [];
            for (let i = 0; i < this.columns; i++) {
                this.drops[i] = Math.floor(Math.random() * -100);
            }
        });
    }
    
    draw() {
        this.ctx.fillStyle = "rgba(10, 12, 13, 0.04)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = "#00ff41";
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.columns; i++) {
            const text = this.matrix[Math.floor(Math.random() * this.matrix.length)];
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame(this.draw);
    }
}

// Iniciar efeito Matrix após o carregamento completo
window.addEventListener('load', () => {
    setTimeout(() => {
        new MatrixEffect();
    }, 1000);
}); 