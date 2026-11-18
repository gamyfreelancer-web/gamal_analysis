/* ===================================================================
   Jamal Maher - Data Analyst Portfolio JavaScript
   Features: Theme Toggle, Language Toggle, Particles, Typing Effect,
             Scroll Animations, Counters, Skill Bars, Project Filter,
             Navbar, Mobile Menu, Back to Top, Preloader
=================================================================== */

// ==================== انتظار تحميل الصفحة ====================
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initParticles();
    initTypingEffect();
    initThemeToggle();
    initLanguageToggle();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initCounters();
    initSkillBars();
    initProjectFilter();
    initBackToTop();
    initActiveNavLink();
    initContactForm();
});

// ==================== شاشة التحميل ====================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hide');
            // بدء حركات الـ Hero بعد إخفاء التحميل
            document.querySelectorAll('.animate-fade-up, .animate-fade-down').forEach(el => {
                el.style.opacity = '0';
                setTimeout(() => { el.style.opacity = ''; }, 100);
            });
        }, 800);
    });
    // إخفاء تلقائي بعد 3 ثوانٍ حتى لو لم يكتمل التحميل
    setTimeout(() => { preloader.classList.add('hide'); }, 3000);
}

// ==================== خلفية الجسيمات (Particles) ====================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 120 };
    let animationId;

    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.6;
            this.speedY = (Math.random() - 0.5) * 0.6;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // تأثير جذب الماوس
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= dx * force * 0.02;
                    this.y -= dy * force * 0.02;
                }
            }

            // إعادة الجسيمات عند الخروج من الحدود
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            const theme = document.documentElement.getAttribute('data-theme');
            const color = theme === 'light' ? '180, 83, 9' : '245, 158, 11';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
            ctx.fill();
        }
    }

    // إنشاء الجسيمات
    function createParticles() {
        particles = [];
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 9000), 120);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    createParticles();
    window.addEventListener('resize', createParticles);

    // رسم الخطوط بين الجسيمات القريبة
    function drawConnections() {
        const theme = document.documentElement.getAttribute('data-theme');
        const color = theme === 'light' ? '180, 83, 9' : '245, 158, 11';
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140) {
                    const opacity = (1 - dist / 140) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${color}, ${opacity})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        animationId = requestAnimationFrame(animate);
    }

    animate();
}

// ==================== تأثير الكتابة (Typing Effect) ====================
function initTypingEffect() {
    const typedEl = document.getElementById('typedText');
    if (!typedEl) return;

    const textsEN = [
        'Data Analysis',
        'Power BI',
        'Python',
        'SQL',
        'Excel',
        'Web Scraping',
        'Looker Studio',
        'n8n Automation',
        'Machine Learning'
    ];

    const textsAR = [
        'تحليل البيانات',
        'Power BI',
        'بايثون',
        'SQL',
        'إكسل',
        'استخراج البيانات',
        'Looker Studio',
        'أتمتة n8n',
        'تعلم الآلة'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function getTexts() {
        const lang = document.documentElement.getAttribute('lang');
        return lang === 'ar' ? textsAR : textsEN;
    }

    function type() {
        const texts = getTexts();
        const currentText = texts[textIndex % texts.length];

        if (isDeleting) {
            typedEl.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedEl.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // انتظار قبل الحذف
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex++;
            typingSpeed = 500; // انتظار قبل الكتابة
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// ==================== تبديل الوضع (Dark / Light) ====================
function initThemeToggle() {
    const themeBtn = document.getElementById('themeToggle');
    if (!themeBtn) return;

    // تحميل الثيم المحفوظ
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);

        // تأثير حركي على الزر
        themeBtn.style.transform = 'scale(0.85) rotate(180deg)';
        setTimeout(() => { themeBtn.style.transform = ''; }, 300);
    });
}

// ==================== تبديل اللغة (English / Arabic) ====================
function initLanguageToggle() {
    const langBtn = document.getElementById('langToggle');
    if (!langBtn) return;

    // تحميل اللغة المحفوظة
    const savedLang = localStorage.getItem('portfolio-lang') || 'en';
    setLanguage(savedLang);

    langBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('lang');
        const newLang = current === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
        localStorage.setItem('portfolio-lang', newLang);

        // تأثير حركي
        langBtn.style.transform = 'scale(0.85)';
        setTimeout(() => { langBtn.style.transform = ''; }, 300);
    });
}

function setLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body.style.fontFamily = lang === 'ar'
        ? "'Cairo', sans-serif"
        : "'Poppins', sans-serif";
}

// ==================== شريط التنقل ====================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ==================== قائمة الموبايل ====================
function initMobileMenu() {
    const menuBtn = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // إغلاق القائمة عند النقر على رابط
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('open');
        }
    });
}

// ==================== التمرير السلس ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80; // ارتفاع الـ Navbar
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

// ==================== حركات الظهور عند التمرير ====================
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // تأخير تدريجي لكل عنصر
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

// ==================== عدّاد الأرقام ====================
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    let counted = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                statNumbers.forEach(num => {
                    animateCounter(num);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // مراقبة أول عنصر إحصائي
    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer) observer.observe(statsContainer);
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // تأثير تباطؤ
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(ease * target);
        el.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

// ==================== أشرطة المهارات ====================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    if (!skillBars.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => observer.observe(bar));
}

// ==================== فلتر المشاريع ====================
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // تحديث الزر النشط
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;

                // تأثير حركي
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';

                setTimeout(() => {
                    card.style.display = shouldShow ? '' : 'none';
                    if (shouldShow) {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, index * 80);
                    }
                }, 300);
            });
        });
    });
}

// ==================== زر العودة للأعلى ====================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== رابط التنقل النشط ====================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ==================== نموذج التواصل ====================
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        const action = form.getAttribute('action');

        // التحقق إذا كان الرابط افتراضي (لم يتم تغييره)
        if (!action || action.includes('YOUR_FORM_ID')) {
            e.preventDefault();

            const lang = document.documentElement.getAttribute('lang');
            const msg = lang === 'ar'
                ? 'شكرًا لرسالتك! سيتم ربط النموذج قريبًا.'
                : 'Thanks for your message! The form will be connected soon.';

            // عرض رسالة نجاح
            const btn = form.querySelector('.btn-submit');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = lang === 'ar'
                ? '<i class="fas fa-check"></i> تم الإرسال!'
                : '<i class="fas fa-check"></i> Sent!';
            btn.style.background = '#10b981';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                form.reset();
            }, 3000);

            alert(msg);
        }
    });
}
