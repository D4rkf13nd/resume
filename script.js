/* ===== Scroll Effects ===== */
class ScrollEffects {
    constructor() {
        this.init();
    }

    init() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        // Parallax scroll effect
        window.addEventListener('scroll', () => {
            this.handleParallax();
            this.handleSectionAnimations();
            this.handleProgressBar();
        });
    }

    handleParallax() {
        const scrolled = window.pageYOffset;
        
        // Parallax for shapes
        document.querySelectorAll('.shape').forEach(shape => {
            const speed = shape.getAttribute('data-speed') || 0.3;
            const yPos = -(scrolled * speed);
            shape.style.transform = `translate3d(0px, ${yPos}px, 0px)`;
        });

        // Parallax for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled * 0.002);
        }
    }

    handleSectionAnimations() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.style.transform = 'translateY(0)';
                section.style.opacity = '1';
                
                // Add tilt effect on hover
                section.addEventListener('mousemove', (e) => {
                    const { left, top, width, height } = section.getBoundingClientRect();
                    const x = (e.clientX - left) / width;
                    const y = (e.clientY - top) / height;
                    
                    section.style.transform = `
                        perspective(1000px)
                        rotateX(${(y - 0.5) * 5}deg)
                        rotateY(${(x - 0.5) * 5}deg)
                    `;
                });
                
                section.addEventListener('mouseleave', () => {
                    section.style.transform = 'none';
                });
            }
        });
    }

    handleProgressBar() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    }
}

/* ===== Initialize Effects ===== */
document.addEventListener('DOMContentLoaded', () => {
    new ScrollEffects();
    
    // Add initial animations
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add 3D tilt effect to containers
function init3DTiltEffect() {
    const elements = document.querySelectorAll('.card, .project, .education-card, .language-skills');
    
    elements.forEach(element => {
        let bounds = element.getBoundingClientRect();
        let mouseLeaveDelay;

        const mouseMove = (e) => {
            // Get mouse position relative to card
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;
            
            // Calculate rotation values
            const xRotation = 20 * ((mouseY - bounds.height/2) / bounds.height);
            const yRotation = -20 * ((mouseX - bounds.width/2) / bounds.width);
            
            // Calculate distance from center for intensity
            const distance = Math.sqrt(
                Math.pow(mouseX - bounds.width/2, 2) + 
                Math.pow(mouseY - bounds.height/2, 2)
            );
            const intensity = Math.min(distance / (bounds.width/2), 1);
            
            // Apply transform with smooth transition
            const transform = `
                perspective(1000px)
                scale3d(1.05, 1.05, 1.05)
                rotateX(${xRotation * intensity}deg)
                rotateY(${yRotation * intensity}deg)
                translateZ(30px)
            `;
            
            // Add glowing effect based on mouse position
            const glowX = (mouseX / bounds.width) * 100;
            const glowY = (mouseY / bounds.height) * 100;
            
            element.style.transform = transform;
            element.style.transition = 'transform 0.1s ease-out';
            element.style.background = `
                radial-gradient(
                    circle at ${glowX}% ${glowY}%, 
                    rgba(88, 166, 255, 0.15),
                    transparent 50%
                ),
                rgba(22, 27, 34, 0.7)
            `;
        };

        const mouseLeave = () => {
            clearTimeout(mouseLeaveDelay);
            mouseLeaveDelay = setTimeout(() => {
                element.style.transform = `
                    perspective(1000px)
                    scale3d(1, 1, 1)
                    rotateX(0)
                    rotateY(0)
                    translateZ(0)
                `;
                element.style.transition = 'all 0.5s ease';
                element.style.background = 'rgba(22, 27, 34, 0.7)';
            }, 100);
        };

        const mouseEnter = () => {
            clearTimeout(mouseLeaveDelay);
            bounds = element.getBoundingClientRect();
        };

        // Add event listeners
        element.addEventListener('mousemove', mouseMove);
        element.addEventListener('mouseleave', mouseLeave);
        element.addEventListener('mouseenter', mouseEnter);
        
        // Update bounds on scroll
        window.addEventListener('scroll', () => {
            bounds = element.getBoundingClientRect();
        });
    });
}

// Initialize the effect when DOM is loaded
document.addEventListener('DOMContentLoaded', init3DTiltEffect);

function initCodeBackground() {
    const codeSymbols = [
        '{', '}', '<>', '//', '#include', 'const', 'let', 'function',
        'return', 'if', 'else', 'for', 'while', 'class', 'import',
        '=> {}', '[];', 'git push', 'npm start', 'docker run'
    ];
    
    const background = document.querySelector('.code-background');
    const content = Array(100).fill(0)
        .map(() => codeSymbols[Math.floor(Math.random() * codeSymbols.length)])
        .join(' ');
        
    background.setAttribute('data-content', content);
}

document.addEventListener('DOMContentLoaded', initCodeBackground);