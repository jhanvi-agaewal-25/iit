document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#sidebar ul li a');
    const sections = document.querySelectorAll('.content-section');
    const profilePic = document.querySelector('.profile-pic');
    const images = document.querySelectorAll('img');

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease-in';
        document.body.style.opacity = '1';
    }, 100);

    // Profile picture hover effect
    if (profilePic) {
        profilePic.addEventListener('mouseenter', () => {
            profilePic.style.transform = 'scale(1.1) rotate(5deg)';
        });
        profilePic.addEventListener('mouseleave', () => {
            profilePic.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Image lazy loading with fade-in effect
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transform = 'translateY(20px)';
                img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    img.style.opacity = '1';
                    img.style.transform = 'translateY(0)';
                }, 100);
                
                imageObserver.unobserve(img);
            }
        });
    }, observerOptions);

    images.forEach(img => {
        if (img !== profilePic) {
            imageObserver.observe(img);
        }
    });

    navLinks.forEach(link => {
        // Add ripple effect on click
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            link.appendChild(ripple);
            
            const rect = link.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            setTimeout(() => ripple.remove(), 600);
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                
                // Smooth section transition
                const currentActive = document.querySelector('.content-section.active');
                const targetSection = document.getElementById(targetId);
                
                if (currentActive && targetSection && currentActive !== targetSection) {
                    // Fade out current section
                    currentActive.style.opacity = '0';
                    currentActive.style.transform = 'translateX(-20px)';
                    
                    setTimeout(() => {
                        sections.forEach(section => section.classList.remove('active'));
                        targetSection.classList.add('active');
                        
                        // Fade in new section
                        targetSection.style.opacity = '0';
                        targetSection.style.transform = 'translateX(20px)';
                        
                        setTimeout(() => {
                            targetSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                            targetSection.style.opacity = '1';
                            targetSection.style.transform = 'translateX(0)';
                        }, 50);
                    }, 250);
                } else if (targetSection) {
                    sections.forEach(section => section.classList.remove('active'));
                    targetSection.classList.add('active');
                }
                
                // Update active nav link with animation
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                    navLink.style.transform = 'scale(1)';
                });
                link.classList.add('active');
                link.style.transform = 'scale(1.05)';
                
                // Animate submenu
                const allSubMenus = document.querySelectorAll('.sub-menu');
                if (targetId === 'life') {
                    const subMenu = link.nextElementSibling;
                    if (subMenu) {
                        subMenu.style.maxHeight = '0';
                        subMenu.style.display = 'block';
                        subMenu.style.transition = 'max-height 0.3s ease';
                        setTimeout(() => {
                            subMenu.style.maxHeight = '200px';
                        }, 10);
                    }
                } else {
                    allSubMenus.forEach(menu => {
                        menu.style.maxHeight = '0';
                        setTimeout(() => {
                            menu.style.display = 'none';
                        }, 300);
                    });
                }
            }
        });

        // Hover effects for nav links
        link.addEventListener('mouseenter', () => {
            if (!link.classList.contains('active')) {
                link.style.transform = 'translateX(5px)';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                link.style.transform = 'translateX(0)';
            }
        });
    });

    // Typing animation
    const typedTextSpan = document.querySelector('.typed-text');
    const textArray = ['Dancer 💃', 'Artist 🎨', 'Sports Enthusiast ⚽', 'Engineering Student 🎓', 'Dream Chaser ✨'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start typing animation after page load
    setTimeout(type, newTextDelay + 250);

    // Scroll animations for content
    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('h1, h2, p, .bio-card, .contact-section').forEach(el => {
        contentObserver.observe(el);
    });
});