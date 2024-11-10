document.addEventListener('DOMContentLoaded', () => {
    // Handle images and show alt text
    const logo = document.querySelector('.logo img');
    const banner = document.querySelector('.hero-banner');
    
    // Dark mode handling
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    const setDarkMode = (isDark) => {
        requestAnimationFrame(() => {
            if (isDark) {
                document.documentElement.classList.add('dark-mode');
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark-mode');
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
                localStorage.setItem('theme', 'light');
            }
        });
    };

    // Check stored theme preference first
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        setDarkMode(storedTheme === 'dark');
    } else {
        // Check system dark mode preference if no stored preference
        const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
        if (systemDarkMode.matches) {
            setDarkMode(true);
        }
    }

    // Toggle dark mode on button click, overriding system preference
    let isThemeToggling = false;
    themeToggle.addEventListener('click', () => {
        if (isThemeToggling) return;
        isThemeToggling = true;
        
        const isDarkMode = document.documentElement.classList.contains('dark-mode');
        setDarkMode(!isDarkMode);
        
        // Remove system preference listener when manually toggled
        systemDarkMode.removeEventListener('change', systemDarkModeHandler);
        
        setTimeout(() => {
            isThemeToggling = false;
        }, 200); // Debounce for 200ms
    });

    // System dark mode change handler
    const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    const systemDarkModeHandler = (e) => {
        // Only apply system preference if no stored theme
        if (!localStorage.getItem('theme')) {
            setDarkMode(e.matches);
        }
    };
    systemDarkMode.addEventListener('change', systemDarkModeHandler);
    
    if (logo) {
        logo.src = "src/logo.jpeg"; // Set logo source
        logo.style.display = 'block';
        logo.style.height = '40px';
        logo.style.width = 'auto';
        logo.onerror = function() {
            this.style.display = 'none';
            const altText = document.createElement('span');
            altText.textContent = this.alt;
            altText.style.fontSize = '0.8rem';
            altText.style.padding = '0.5rem';
            altText.style.background = '#f5f7fa';
            altText.style.borderRadius = '4px';
            this.parentNode.insertBefore(altText, this.nextSibling);
        };
    }

    if (banner) {
        banner.src = "src/banner.jpg"; // Set banner source
        banner.style.display = 'block';
        banner.style.width = '100%';
        banner.style.maxWidth = '800px';
        banner.style.height = 'auto';
        banner.style.margin = '0 auto';
        banner.onerror = function() {
            this.style.display = 'none';
            const altText = document.createElement('div');
            altText.textContent = this.alt;
            altText.style.padding = '2rem';
            altText.style.background = 'rgba(0,0,0,0.1)';
            altText.style.borderRadius = '8px';
            altText.style.margin = '1rem 0';
            this.parentNode.insertBefore(altText, this.nextSibling);
        };
    }

    // Mobile menu handling
    let hamburger = null;
    const setupMobileMenu = () => {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        // Remove existing hamburger if it exists
        if (hamburger && nav.contains(hamburger)) {
            nav.removeChild(hamburger);
        }
        
        if (window.innerWidth <= 768) {
            // Create new hamburger only if it doesn't exist
            if (!hamburger) {
                hamburger = document.createElement('button');
                hamburger.className = 'hamburger';
                hamburger.innerHTML = '☰';
                
                hamburger.addEventListener('click', () => {
                    navLinks.style.display = navLinks.style.display === 'none' ? 'flex' : 'none';
                });
            }
            
            nav.appendChild(hamburger);
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            hamburger = null;
        }
    };

    // Flashcard interactions
    const flashcards = document.querySelectorAll('.flashcard');
    flashcards.forEach(flashcard => {
        // Touch and click handling
        flashcard.addEventListener('click', (e) => {
            const inner = flashcard.querySelector('.flashcard-inner');
            inner.style.transform = inner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
        });

        // Enhanced hover effects for non-touch devices
        if (window.matchMedia('(hover: hover)').matches) {
            flashcard.addEventListener('mouseenter', () => {
                flashcard.style.transform = 'scale(1.03)';
                flashcard.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
            });

            flashcard.addEventListener('mouseleave', () => {
                flashcard.style.transform = 'scale(1)';
                flashcard.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            });
        }
    });

    // Copy code functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.previousElementSibling;
            navigator.clipboard.writeText(codeBlock.textContent);
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        });
    });

    // Handle code blocks for mobile responsiveness
    const codeBlocks = document.querySelectorAll('pre code');
    const adjustCodeBlocks = () => {
        codeBlocks.forEach(block => {
            if (window.innerWidth <= 768) {
                block.style.whiteSpace = 'pre-wrap';
                block.style.wordBreak = 'break-word';
                block.style.overflowX = 'hidden';
                block.parentElement.style.maxWidth = '100%';
                block.parentElement.style.width = '100%';
            } else {
                block.style.whiteSpace = 'pre';
                block.style.wordBreak = 'normal';
                block.style.overflowX = 'auto';
            }
        });
    };

    // Initial setup and resize handling for code blocks
    adjustCodeBlocks();
    window.addEventListener('resize', adjustCodeBlocks);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Enhanced scroll reveal animation
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                if (entry.target.classList.contains('flashcard-container')) {
                    entry.target.querySelectorAll('.flashcard').forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Apply animations to sections, flashcards, and hero elements
    document.querySelectorAll('section, .flashcard-container, .hero-banner, .logo img').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease-out';
        sectionObserver.observe(element);
    });

    // Initialize mobile menu and handle resize
    setupMobileMenu();
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setupMobileMenu, 100);
    });
});