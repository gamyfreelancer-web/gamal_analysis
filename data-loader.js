/* ===================================================================
   Data Loader — يحمّل البيانات المحفوظة من لوحة التحكم ويطبّقها
   على الموقع الرئيسي index.html
=================================================================== */

(function () {
    const STORAGE_KEY = 'portfolio_data';

    function loadSavedData() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            return null;
        }
    }

    function applyData() {
        const d = loadSavedData();
        if (!d) return;

        // ==================== Hero ====================
        if (d.hero) {
            setText('.hero-name .highlight', d.hero.nameEn, d.hero.nameAr);
            setText('.hero-desc', d.hero.descEn, d.hero.descAr);

            // Stats
            const stats = document.querySelectorAll('.stat-number');
            if (stats[0] && d.hero.statYears !== undefined) stats[0].setAttribute('data-target', d.hero.statYears);
            if (stats[1] && d.hero.statProjects !== undefined) stats[1].setAttribute('data-target', d.hero.statProjects);
            if (stats[2] && d.hero.statTools !== undefined) stats[2].setAttribute('data-target', d.hero.statTools);

            // Profile Image
            if (d.hero.profileImage) {
                const placeholder = document.querySelector('.image-placeholder');
                if (placeholder) {
                    const wrapper = placeholder.parentElement;
                    placeholder.style.display = 'none';
                    const img = document.createElement('img');
                    img.src = d.hero.profileImage;
                    img.alt = d.hero.nameEn || 'Profile';
                    img.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;inset:0;';
                    wrapper.appendChild(img);
                }
            }
        }

        // ==================== About ====================
        if (d.about) {
            const aboutDesc = document.querySelector('.about-description');
            if (aboutDesc && (d.about.bioEn || d.about.bioAr)) {
                aboutDesc.innerHTML = '';
                if (d.about.bioEn) {
                    const pEn = document.createElement('p');
                    pEn.className = 'lang-en';
                    pEn.innerHTML = d.about.bioEn.replace(/\n/g, '<br>');
                    aboutDesc.appendChild(pEn);
                }
                if (d.about.bioAr) {
                    const pAr = document.createElement('p');
                    pAr.className = 'lang-ar';
                    pAr.innerHTML = d.about.bioAr.replace(/\n/g, '<br>');
                    aboutDesc.appendChild(pAr);
                }
            }

            // Education info items
            const infoItems = document.querySelectorAll('.info-item');
            if (infoItems.length >= 4) {
                setInfoItem(infoItems[0], d.about.degreeEn, d.about.degreeAr);
                setInfoItem(infoItems[1], d.about.uniEn, d.about.uniAr);
                setInfoItem(infoItems[2], d.about.gradeEn, d.about.gradeAr);
                if (d.about.gradYear) {
                    const spans = infoItems[3].querySelectorAll('div span:not(.lang-en):not(.lang-ar)');
                    if (spans.length) spans[spans.length - 1].textContent = d.about.gradYear;
                }
            }
        }

        // ==================== Skills ====================
        if (d.skills && d.skills.length) {
            const container = document.querySelector('.skills-bars');
            if (container) {
                const subtitle = container.querySelector('.skills-subtitle');
                container.innerHTML = '';
                if (subtitle) container.appendChild(subtitle);

                d.skills.forEach(s => {
                    const item = document.createElement('div');
                    item.className = 'skill-bar-item';
                    item.innerHTML = `
                        <div class="skill-bar-info">
                            <span>${s.name}</span>
                            <span class="skill-percent">${s.percent}%</span>
                        </div>
                        <div class="skill-bar-bg">
                            <div class="skill-bar-fill" data-width="${s.percent}"></div>
                        </div>
                    `;
                    container.appendChild(item);
                });
            }
        }

        // ==================== Projects ====================
        if (d.projects && d.projects.length) {
            const grid = document.querySelector('.projects-grid');
            if (grid) {
                grid.innerHTML = '';
                d.projects.forEach(p => {
                    const card = document.createElement('div');
                    card.className = 'project-card reveal';
                    card.setAttribute('data-category', p.category || 'python');
                    card.innerHTML = `
                        <div class="project-image">
                            ${p.image
                                ? `<img src="${p.image}" alt="${p.titleEn}" style="width:100%;height:100%;object-fit:cover">`
                                : `<div class="project-img-placeholder"><i class="fas fa-project-diagram"></i></div>`
                            }
                            <div class="project-overlay">
                                <div class="project-links">
                                    ${p.demoLink ? `<a href="${p.demoLink}" target="_blank" class="project-link" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>` : ''}
                                    ${p.githubLink ? `<a href="${p.githubLink}" target="_blank" class="project-link" title="GitHub"><i class="fab fa-github"></i></a>` : ''}
                                </div>
                            </div>
                        </div>
                        <div class="project-info">
                            <div class="project-tags">
                                ${(p.tags || []).map(t => `<span class="project-tag">${t}</span>`).join('')}
                            </div>
                            <h3 class="project-title">
                                <span class="lang-en">${p.titleEn || ''}</span>
                                <span class="lang-ar">${p.titleAr || ''}</span>
                            </h3>
                            <p class="project-desc">
                                <span class="lang-en">${p.descEn || ''}</span>
                                <span class="lang-ar">${p.descAr || ''}</span>
                            </p>
                        </div>
                    `;
                    grid.appendChild(card);
                });
            }
        }

        // ==================== Experience ====================
        if (d.experience && d.experience.length) {
            const grid = document.querySelector('.experience-grid');
            if (grid) {
                grid.innerHTML = '';
                d.experience.forEach(exp => {
                    const card = document.createElement('div');
                    card.className = 'exp-card reveal';
                    const tasksEn = (exp.tasksEn || '').split('\n').filter(Boolean).map(t => `<li><span class="lang-en">${t}</span></li>`).join('');
                    const tasksAr = (exp.tasksAr || '').split('\n').filter(Boolean).map(t => `<li><span class="lang-ar">${t}</span></li>`).join('');
                    card.innerHTML = `
                        <span class="exp-date">
                            <span class="lang-en">${exp.dateEn || ''}</span>
                            <span class="lang-ar">${exp.dateAr || ''}</span>
                        </span>
                        <h3><span class="lang-en">${exp.titleEn || ''}</span><span class="lang-ar">${exp.titleAr || ''}</span></h3>
                        <h4><span class="lang-en">${exp.companyEn || ''}</span><span class="lang-ar">${exp.companyAr || ''}</span></h4>
                        <ul>${tasksEn}${tasksAr}</ul>
                    `;
                    grid.appendChild(card);
                });
            }
        }

        // ==================== Certifications ====================
        if (d.certifications && d.certifications.length) {
            const grid = document.querySelector('.cert-grid');
            if (grid) {
                grid.innerHTML = '';
                d.certifications.forEach(c => {
                    const card = document.createElement('div');
                    card.className = 'cert-card reveal';
                    card.innerHTML = `
                        <div class="cert-icon"><i class="${c.icon || 'fas fa-certificate'}"></i></div>
                        <h3><span class="lang-en">${c.nameEn || ''}</span><span class="lang-ar">${c.nameAr || ''}</span></h3>
                        <p class="cert-issuer"><span class="lang-en">${c.issuerEn || ''}</span><span class="lang-ar">${c.issuerAr || ''}</span></p>
                    `;
                    grid.appendChild(card);
                });
            }
        }

        // ==================== Mentors ====================
        if (d.mentors && d.mentors.length) {
            const grid = document.querySelector('.mentors-grid');
            if (grid) {
                grid.innerHTML = '';
                d.mentors.forEach(m => {
                    const card = document.createElement('div');
                    card.className = 'mentor-card';
                    card.innerHTML = `
                        <i class="fas fa-user-tie"></i>
                        <div class="mentor-info">
                            <span class="lang-en">${m.nameEn || ''}</span>
                            <span class="lang-ar">${m.nameAr || ''}</span>
                            ${m.link ? `<a href="${m.link}" target="_blank"><i class="fab fa-youtube"></i> YouTube</a>` : ''}
                        </div>
                    `;
                    grid.appendChild(card);
                });
            }
        }

        // ==================== Contact ====================
        if (d.contact) {
            // Email
            const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
            emailLinks.forEach(el => {
                el.href = 'mailto:' + d.contact.email;
                if (el.textContent.includes('@')) el.textContent = d.contact.email;
            });

            // WhatsApp
            const waNum = d.contact.whatsapp.replace(/[^0-9]/g, '');
            const waLinks = document.querySelectorAll('a[href*="wa.me"]');
            waLinks.forEach(el => {
                el.href = 'https://wa.me/' + waNum;
                if (!el.querySelector('i')) el.textContent = d.contact.whatsapp;
            });

            // Location
            const locCard = document.querySelector('.contact-info-card:last-of-type');
            if (locCard) {
                const locSpan = locCard.querySelector('span:has(.lang-en)') || locCard.querySelector('span');
                if (locSpan) {
                    locSpan.innerHTML = `<span class="lang-en">${d.contact.locationEn}</span><span class="lang-ar">${d.contact.locationAr}</span>`;
                }
            }

            // Social Links
            if (d.contact.social && d.contact.social.length) {
                const ICONS = {
                    linkedin: 'fab fa-linkedin-in', github: 'fab fa-github',
                    kaggle: 'fab fa-kaggle', youtube: 'fab fa-youtube',
                    whatsapp: 'fab fa-whatsapp', twitter: 'fab fa-twitter',
                    telegram: 'fab fa-telegram', facebook: 'fab fa-facebook',
                    instagram: 'fab fa-instagram', behance: 'fab fa-behance',
                    email: 'fas fa-envelope', website: 'fas fa-globe'
                };

                const socialContainers = document.querySelectorAll('.social-links-contact, .footer-social');
                socialContainers.forEach(container => {
                    container.innerHTML = '';
                    d.contact.social.forEach(s => {
                        if (!s.url) return;
                        const a = document.createElement('a');
                        a.href = s.platform === 'email' ? 'mailto:' + s.url : s.url;
                        a.target = '_blank';
                        a.className = container.classList.contains('footer-social') ? '' : 'social-link';
                        a.title = s.platform;
                        a.innerHTML = `<i class="${ICONS[s.platform] || 'fas fa-link'}"></i>`;
                        container.appendChild(a);
                    });
                });
            }
        }

        // Re-apply language visibility
        const lang = document.documentElement.getAttribute('lang') || 'en';
        document.documentElement.setAttribute('lang', lang);
    }

    // ==================== Helper Functions ====================
    function setText(selector, en, ar) {
        const els = document.querySelectorAll(selector);
        els.forEach(el => {
            const enSpan = el.querySelector('.lang-en') || el.closest('.lang-en');
            const arSpan = el.querySelector('.lang-ar') || el.closest('.lang-ar');
            if (enSpan && en) enSpan.textContent = en;
            if (arSpan && ar) arSpan.textContent = ar;
            // If no language spans, check parent
            if (!enSpan && !arSpan) {
                const parent = el.parentElement;
                if (parent) {
                    const pEn = parent.querySelector('.lang-en');
                    const pAr = parent.querySelector('.lang-ar');
                    if (pEn && en) pEn.innerHTML = `<span class="highlight">${en}</span>`;
                    if (pAr && ar) pAr.innerHTML = `<span class="highlight">${ar}</span>`;
                }
            }
        });
    }

    function setInfoItem(item, en, ar) {
        if (!item) return;
        const spans = item.querySelectorAll('div span');
        spans.forEach(span => {
            if (span.classList.contains('lang-en') && en) span.textContent = en;
            if (span.classList.contains('lang-ar') && ar) span.textContent = ar;
        });
    }

    // ==================== تشغيل ====================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyData);
    } else {
        applyData();
    }
})();
