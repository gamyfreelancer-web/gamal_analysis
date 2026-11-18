/* ===================================================================
   Admin Panel JavaScript — Portfolio Management
   Handles: Save/Load data, Dynamic lists, Image uploads
=================================================================== */

const STORAGE_KEY = 'portfolio_data';

// ==================== البيانات الافتراضية ====================
function getDefaults() {
    return {
        hero: {
            nameEn: 'Jamal Maher', nameAr: 'جمال ماهر',
            descEn: 'Turning Raw Data into Actionable Insights',
            descAr: 'تحويل البيانات الخام إلى رؤى قابلة للتنفيذ',
            statYears: 2, statProjects: 10, statTools: 8,
            profileImage: null
        },
        about: {
            bioEn: 'A passionate Data Analyst with over 2 years of experience in transforming complex datasets into actionable insights. Graduated from the Faculty of Navigation Technology and Space Sciences at Beni Suef University with an Excellent grade in 2026. My graduation project involved analyzing NASA POWER satellite data to predict solar radiation for optimal solar panel placement. Proficient in Python, SQL, Power BI, Excel, and various analytics tools.',
            bioAr: 'محلل بيانات شغوف بأكثر من سنتين من الخبرة في تحويل مجموعات البيانات المعقدة إلى رؤى قابلة للتنفيذ. تخرجت من كلية تكنولوجيا الملاحة وعلوم الفضاء بجامعة بني سويف بتقدير امتياز عام 2026. مشروع تخرجي كان تحليل بيانات أقمار صناعية من NASA POWER للتنبؤ بالإشعاع الشمسي لتحديد أفضل مواقع تركيب الألواح الشمسية. متمكن من Python و SQL و Power BI و Excel وأدوات تحليل متعددة.',
            degreeEn: 'B.Sc. Navigation Technology & Space Sciences',
            degreeAr: 'بكالوريوس تكنولوجيا الملاحة وعلوم الفضاء',
            uniEn: 'Beni Suef University', uniAr: 'جامعة بني سويف',
            gradeEn: 'Excellent', gradeAr: 'امتياز', gradYear: '2026'
        },
        skills: [
            { name: 'Python (Pandas, NumPy, Matplotlib, Seaborn)', percent: 85 },
            { name: 'SQL (MySQL / PostgreSQL / SQL Server)', percent: 80 },
            { name: 'Power BI (DAX, Power Query)', percent: 85 },
            { name: 'Microsoft Excel', percent: 90 },
            { name: 'Tableau', percent: 75 },
            { name: 'Looker Studio (Google Data Studio)', percent: 75 },
            { name: 'Web Scraping (BeautifulSoup / Selenium)', percent: 70 },
            { name: 'n8n (Automation)', percent: 70 },
            { name: 'Machine Learning (Scikit-learn)', percent: 65 }
        ],
        projects: [],
        experience: [
            {
                dateEn: '2024 - Present', dateAr: '2024 - الآن',
                titleEn: 'Freelance Data Analyst', titleAr: 'محلل بيانات مستقل',
                companyEn: 'Self-Employed', companyAr: 'عمل حر',
                tasksEn: 'Delivered data analysis projects for multiple clients\nBuilt interactive dashboards using Power BI and Looker Studio\nAutomated data pipelines and reporting workflows',
                tasksAr: 'تنفيذ مشاريع تحليل بيانات لعملاء متعددين\nبناء لوحات معلومات تفاعلية باستخدام Power BI و Looker Studio\nأتمتة خطوط البيانات وسير عمل التقارير'
            },
            {
                dateEn: '2022 - 2026', dateAr: '2022 - 2026',
                titleEn: 'University Studies & Projects', titleAr: 'الدراسة الجامعية والمشاريع',
                companyEn: 'Beni Suef University', companyAr: 'جامعة بني سويف',
                tasksEn: 'Graduated with Excellent grade from Faculty of Navigation Technology & Space Sciences\nGraduation project: Solar radiation prediction using NASA POWER data\nSelf-taught Python, SQL, and data analysis tools',
                tasksAr: 'تخرجت بتقدير امتياز من كلية تكنولوجيا الملاحة وعلوم الفضاء\nمشروع التخرج: التنبؤ بالإشعاع الشمسي باستخدام بيانات NASA POWER\nتعلمت ذاتيًا Python و SQL وأدوات تحليل البيانات'
            }
        ],
        certifications: [
            { nameEn: 'Python for Data Analysis', nameAr: 'بايثون لتحليل البيانات', issuerEn: 'Online Course', issuerAr: 'دورة أونلاين', icon: 'fab fa-python' },
            { nameEn: 'Power BI Data Analyst', nameAr: 'محلل بيانات Power BI', issuerEn: 'Online Course', issuerAr: 'دورة أونلاين', icon: 'fas fa-chart-bar' },
            { nameEn: 'SQL for Data Science', nameAr: 'SQL لعلم البيانات', issuerEn: 'Online Course', issuerAr: 'دورة أونلاين', icon: 'fas fa-database' },
            { nameEn: 'Advanced Excel & Data Analysis', nameAr: 'إكسل المتقدم وتحليل البيانات', issuerEn: 'Online Course', issuerAr: 'دورة أونلاين', icon: 'fas fa-file-excel' }
        ],
        mentors: [
            { nameEn: 'Ibrahim Adel', nameAr: 'إبراهيم عادل', link: '' },
            { nameEn: 'Ahmed Salem', nameAr: 'أحمد سالم', link: '' },
            { nameEn: 'Mustafa Osman', nameAr: 'مصطفى عثمان', link: '' },
            { nameEn: 'Mazen Ahmed', nameAr: 'مازن أحمد', link: '' }
        ],
        contact: {
            email: 'jamal.maher@email.com',
            whatsapp: '+201234567890',
            locationEn: 'Beni Suef, Egypt',
            locationAr: 'بني سويف، مصر',
            social: [
                { platform: 'linkedin', url: '' },
                { platform: 'github', url: '' },
                { platform: 'kaggle', url: '' },
                { platform: 'youtube', url: '' },
                { platform: 'whatsapp', url: '' },
                { platform: 'email', url: '' }
            ]
        }
    };
}

const PLATFORM_ICONS = {
    linkedin: 'fab fa-linkedin-in',
    github: 'fab fa-github',
    kaggle: 'fab fa-kaggle',
    youtube: 'fab fa-youtube',
    whatsapp: 'fab fa-whatsapp',
    twitter: 'fab fa-twitter',
    telegram: 'fab fa-telegram',
    facebook: 'fab fa-facebook',
    instagram: 'fab fa-instagram',
    behance: 'fab fa-behance',
    email: 'fas fa-envelope',
    website: 'fas fa-globe'
};

const CATEGORY_OPTIONS = `
    <option value="python">Python</option>
    <option value="powerbi">Power BI</option>
    <option value="sql">SQL</option>
    <option value="excel">Excel</option>
    <option value="n8n">n8n</option>
    <option value="scraping">Web Scraping</option>
    <option value="ml">Machine Learning</option>
    <option value="looker">Looker</option>
`;

// ==================== تحميل وحفظ البيانات ====================
let data;

function loadData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        data = saved ? JSON.parse(saved) : getDefaults();
    } catch (e) {
        data = getDefaults();
    }
    // تأكد من وجود كل الأقسام
    const defaults = getDefaults();
    for (const key in defaults) {
        if (!(key in data)) data[key] = defaults[key];
    }
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ==================== تهيئة الصفحة ====================
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initNavigation();
    populateAllForms();
    initProfileImageUpload();
});

// ==================== التنقل بين الأقسام ====================
function initNavigation() {
    const titles = {
        hero: '🏠 الصفحة الرئيسية', about: '👤 نبذة عني', skills: '🛠️ المهارات',
        projects: '📊 المشاريع', experience: '💼 الخبرات', certs: '📜 الشهادات',
        mentors: '👨‍🏫 المعلمين', contact: '📞 التواصل'
    };
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
            item.classList.add('active');
            const sec = item.dataset.section;
            document.getElementById('sec-' + sec).classList.add('active');
            document.getElementById('pageTitle').textContent = titles[sec] || '';
        });
    });
}

// ==================== ملء كل النماذج ====================
function populateAllForms() {
    // Hero
    setVal('heroNameEn', data.hero.nameEn);
    setVal('heroNameAr', data.hero.nameAr);
    setVal('heroDescEn', data.hero.descEn);
    setVal('heroDescAr', data.hero.descAr);
    setVal('statYears', data.hero.statYears);
    setVal('statProjects', data.hero.statProjects);
    setVal('statTools', data.hero.statTools);
    if (data.hero.profileImage) {
        const wrap = document.getElementById('profileImgUpload');
        wrap.innerHTML = `<img src="${data.hero.profileImage}"><input type="file" id="profileImgInput" accept="image/*">`;
    }

    // About
    setVal('aboutBioEn', data.about.bioEn);
    setVal('aboutBioAr', data.about.bioAr);
    setVal('degreeEn', data.about.degreeEn);
    setVal('degreeAr', data.about.degreeAr);
    setVal('uniEn', data.about.uniEn);
    setVal('uniAr', data.about.uniAr);
    setVal('gradeEn', data.about.gradeEn);
    setVal('gradeAr', data.about.gradeAr);
    setVal('gradYear', data.about.gradYear);

    // Skills
    renderSkills();

    // Projects
    renderProjects();

    // Experience
    renderExperience();

    // Certifications
    renderCerts();

    // Mentors
    renderMentors();

    // Contact
    setVal('contactEmail', data.contact.email);
    setVal('contactWhatsapp', data.contact.whatsapp);
    setVal('contactLocEn', data.contact.locationEn);
    setVal('contactLocAr', data.contact.locationAr);
    renderSocial();
}

function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
}

// ==================== رفع الصورة الشخصية مع ضغط تلقائي ====================
function initProfileImageUpload() {
    document.addEventListener('change', (e) => {
        if (e.target.id === 'profileImgInput') {
            const file = e.target.files[0];
            if (!file) return;

            // استخدام Canvas لضغط الصورة وتصغير حجمها لتكون خفيفة جداً
            const reader = new FileReader();
            reader.onload = (ev) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 600;
                    const scaleSize = MAX_WIDTH / img.width;
                    canvas.width = (img.width > MAX_WIDTH) ? MAX_WIDTH : img.width;
                    canvas.height = (img.width > MAX_WIDTH) ? (img.height * scaleSize) : img.height;
                    
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    
                    // تحويل الصورة لصيغة مضغوطة خفيفة جداً
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
                    data.hero.profileImage = compressedDataUrl;

                    const wrap = document.getElementById('profileImgUpload');
                    wrap.innerHTML = `<img src="${compressedDataUrl}"><input type="file" id="profileImgInput" accept="image/*">`;
                    saveAll();
                };
                img.src = ev.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

// ==================== المهارات ====================
function renderSkills() {
    const container = document.getElementById('skillsList');
    container.innerHTML = data.skills.map((s, i) => `
        <div class="skill-row">
            <input type="text" value="${s.name}" onchange="data.skills[${i}].name=this.value">
            <input type="range" min="0" max="100" value="${s.percent}" oninput="data.skills[${i}].percent=+this.value;this.nextElementSibling.textContent=this.value+'%'">
            <span class="skill-val">${s.percent}%</span>
            <button class="btn btn-sm btn-danger" onclick="removeSkill(${i})"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');
}

function addSkill() {
    data.skills.push({ name: 'مهارة جديدة', percent: 50 });
    renderSkills();
}

function removeSkill(i) {
    data.skills.splice(i, 1);
    renderSkills();
}

// ==================== المشاريع ====================
function renderProjects() {
    const container = document.getElementById('projectsList');
    if (!data.projects.length) {
        container.innerHTML = '<p style="color:var(--text3);text-align:center;padding:2rem">لا توجد مشاريع بعد. اضغط "إضافة مشروع جديد" لإضافة أول مشروع.</p>';
        return;
    }
    container.innerHTML = data.projects.map((p, i) => `
        <div class="card" style="border-color:var(--primary);border-width:1px;border-style:solid;border-right-width:4px">
            <div class="card-header">
                <h3>مشروع ${i + 1}: ${p.titleAr || p.titleEn || 'بدون عنوان'}</h3>
                <button class="btn btn-sm btn-danger" onclick="removeProject(${i})"><i class="fas fa-trash"></i> حذف</button>
            </div>
            <div class="form-row">
                <div class="form-group"><label>اسم المشروع (EN)</label><input type="text" value="${p.titleEn || ''}" onchange="data.projects[${i}].titleEn=this.value"></div>
                <div class="form-group"><label>اسم المشروع (AR)</label><input type="text" value="${p.titleAr || ''}" onchange="data.projects[${i}].titleAr=this.value"></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label>الوصف (EN)</label><textarea onchange="data.projects[${i}].descEn=this.value">${p.descEn || ''}</textarea></div>
                <div class="form-group"><label>الوصف (AR)</label><textarea onchange="data.projects[${i}].descAr=this.value">${p.descAr || ''}</textarea></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label>التصنيف</label>
                    <select onchange="data.projects[${i}].category=this.value">${CATEGORY_OPTIONS.replace(`value="${p.category}"`, `value="${p.category}" selected`)}</select>
                </div>
                <div class="form-group"><label>الوسوم (Tags) — مفصولة بفاصلة</label><input type="text" value="${(p.tags || []).join(', ')}" onchange="data.projects[${i}].tags=this.value.split(',').map(t=>t.trim()).filter(Boolean)"></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label>رابط Demo / Live Dashboard</label><input type="url" value="${p.demoLink || ''}" onchange="data.projects[${i}].demoLink=this.value" placeholder="https://..."></div>
                <div class="form-group"><label>رابط ملف الكود (GitHub / Kaggle)</label><input type="url" value="${p.githubLink || ''}" onchange="data.projects[${i}].githubLink=this.value" placeholder="https://github.com/..."></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label>رابط تحميل ملف المشروع (Power BI / CSV / Python Notebook / Drive)</label><input type="url" value="${p.fileLink || ''}" onchange="data.projects[${i}].fileLink=this.value" placeholder="https://..."></div>
                <div class="form-group"><label>وصف الملف المرفق</label><input type="text" value="${p.fileType || ''}" onchange="data.projects[${i}].fileType=this.value" placeholder="مثلاً: Download .pbix file أو Dataset"></div>
            </div>
            <div class="form-group">
                <label>صورة المشروع</label>
                <div class="img-upload wide" onclick="document.getElementById('projImg${i}').click()">
                    ${p.image ? `<img src="${p.image}">` : '<i class="fas fa-image"></i><span>اضغط لرفع صورة المشروع</span>'}
                    <input type="file" id="projImg${i}" accept="image/*" onchange="uploadProjectImage(${i}, this)">
                </div>
            </div>
        </div>
    `).join('');
}

function addProject() {
    data.projects.push({
        titleEn: '', titleAr: '', descEn: '', descAr: '',
        category: 'python', tags: [], demoLink: '', githubLink: '', image: null
    });
    renderProjects();
    // انتقل لآخر مشروع
    const list = document.getElementById('projectsList');
    list.lastElementChild.scrollIntoView({ behavior: 'smooth' });
}

function removeProject(i) {
    if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
        data.projects.splice(i, 1);
        renderProjects();
    }
}

function uploadProjectImage(i, input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800;
            const scaleSize = MAX_WIDTH / img.width;
            canvas.width = (img.width > MAX_WIDTH) ? MAX_WIDTH : img.width;
            canvas.height = (img.width > MAX_WIDTH) ? (img.height * scaleSize) : img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            data.projects[i].image = canvas.toDataURL('image/jpeg', 0.85);
            renderProjects();
            saveAll();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// ==================== الخبرات ====================
function renderExperience() {
    const container = document.getElementById('experienceList');
    container.innerHTML = data.experience.map((exp, i) => `
        <div class="card">
            <div class="card-header">
                <h3>الخبرة ${i + 1}</h3>
                <button class="btn btn-sm btn-danger" onclick="removeExperience(${i})"><i class="fas fa-trash"></i> حذف</button>
            </div>
            <div class="form-row">
                <div class="form-group"><label>الفترة (EN)</label><input type="text" value="${exp.dateEn || ''}" onchange="data.experience[${i}].dateEn=this.value" placeholder="2024 - Present"></div>
                <div class="form-group"><label>الفترة (AR)</label><input type="text" value="${exp.dateAr || ''}" onchange="data.experience[${i}].dateAr=this.value" placeholder="2024 - الآن"></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label>المسمى الوظيفي (EN)</label><input type="text" value="${exp.titleEn || ''}" onchange="data.experience[${i}].titleEn=this.value"></div>
                <div class="form-group"><label>المسمى الوظيفي (AR)</label><input type="text" value="${exp.titleAr || ''}" onchange="data.experience[${i}].titleAr=this.value"></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label>الشركة (EN)</label><input type="text" value="${exp.companyEn || ''}" onchange="data.experience[${i}].companyEn=this.value"></div>
                <div class="form-group"><label>الشركة (AR)</label><input type="text" value="${exp.companyAr || ''}" onchange="data.experience[${i}].companyAr=this.value"></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label>المهام (EN) — سطر لكل مهمة</label><textarea onchange="data.experience[${i}].tasksEn=this.value">${exp.tasksEn || ''}</textarea></div>
                <div class="form-group"><label>المهام (AR) — سطر لكل مهمة</label><textarea onchange="data.experience[${i}].tasksAr=this.value">${exp.tasksAr || ''}</textarea></div>
            </div>
        </div>
    `).join('');
}

function addExperience() {
    data.experience.push({ dateEn: '', dateAr: '', titleEn: '', titleAr: '', companyEn: '', companyAr: '', tasksEn: '', tasksAr: '' });
    renderExperience();
}

function removeExperience(i) {
    if (confirm('هل أنت متأكد من حذف هذه الخبرة؟')) {
        data.experience.splice(i, 1);
        renderExperience();
    }
}

// ==================== الشهادات ====================
function renderCerts() {
    const container = document.getElementById('certsList');
    container.innerHTML = data.certifications.map((c, i) => `
        <div class="card">
            <div class="card-header">
                <h3>${c.nameAr || c.nameEn || 'شهادة ' + (i + 1)}</h3>
                <button class="btn btn-sm btn-danger" onclick="removeCert(${i})"><i class="fas fa-trash"></i></button>
            </div>
            <div class="form-row">
                <div class="form-group"><label>اسم الشهادة (EN)</label><input type="text" value="${c.nameEn || ''}" onchange="data.certifications[${i}].nameEn=this.value"></div>
                <div class="form-group"><label>اسم الشهادة (AR)</label><input type="text" value="${c.nameAr || ''}" onchange="data.certifications[${i}].nameAr=this.value"></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label>الجهة المانحة (EN)</label><input type="text" value="${c.issuerEn || ''}" onchange="data.certifications[${i}].issuerEn=this.value"></div>
                <div class="form-group"><label>الجهة المانحة (AR)</label><input type="text" value="${c.issuerAr || ''}" onchange="data.certifications[${i}].issuerAr=this.value"></div>
            </div>
        </div>
    `).join('');
}

function addCert() {
    data.certifications.push({ nameEn: '', nameAr: '', issuerEn: '', issuerAr: '', icon: 'fas fa-certificate' });
    renderCerts();
}

function removeCert(i) {
    if (confirm('حذف هذه الشهادة؟')) {
        data.certifications.splice(i, 1);
        renderCerts();
    }
}

// ==================== المعلمين ====================
function renderMentors() {
    const container = document.getElementById('mentorsList');
    container.innerHTML = data.mentors.map((m, i) => `
        <div class="card">
            <div class="card-header">
                <h3>${m.nameAr || m.nameEn || 'معلم ' + (i + 1)}</h3>
                <button class="btn btn-sm btn-danger" onclick="removeMentor(${i})"><i class="fas fa-trash"></i></button>
            </div>
            <div class="form-row">
                <div class="form-group"><label>الاسم (EN)</label><input type="text" value="${m.nameEn || ''}" onchange="data.mentors[${i}].nameEn=this.value"></div>
                <div class="form-group"><label>الاسم (AR)</label><input type="text" value="${m.nameAr || ''}" onchange="data.mentors[${i}].nameAr=this.value"></div>
            </div>
            <div class="form-row full">
                <div class="form-group"><label>رابط القناة أو الصفحة</label><input type="url" value="${m.link || ''}" onchange="data.mentors[${i}].link=this.value" placeholder="https://youtube.com/@..."></div>
            </div>
        </div>
    `).join('');
}

function addMentor() {
    data.mentors.push({ nameEn: '', nameAr: '', link: '' });
    renderMentors();
}

function removeMentor(i) {
    if (confirm('حذف هذا المعلم؟')) {
        data.mentors.splice(i, 1);
        renderMentors();
    }
}

// ==================== روابط التواصل ====================
function renderSocial() {
    const container = document.getElementById('socialList');
    const platformOptions = Object.keys(PLATFORM_ICONS).map(p =>
        `<option value="${p}">${p}</option>`
    ).join('');

    container.innerHTML = data.contact.social.map((s, i) => `
        <div class="social-row">
            <i class="${PLATFORM_ICONS[s.platform] || 'fas fa-link'}"></i>
            <select onchange="data.contact.social[${i}].platform=this.value;renderSocial()">
                ${platformOptions.replace(`value="${s.platform}"`, `value="${s.platform}" selected`)}
            </select>
            <input type="url" value="${s.url || ''}" onchange="data.contact.social[${i}].url=this.value" placeholder="https://...">
            <button class="btn btn-sm btn-danger" onclick="removeSocial(${i})"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');
}

function addSocial() {
    data.contact.social.push({ platform: 'website', url: '' });
    renderSocial();
}

function removeSocial(i) {
    data.contact.social.splice(i, 1);
    renderSocial();
}

// ==================== حفظ جميع البيانات ====================
function saveAll() {
    // جمع بيانات Hero
    data.hero.nameEn = document.getElementById('heroNameEn').value;
    data.hero.nameAr = document.getElementById('heroNameAr').value;
    data.hero.descEn = document.getElementById('heroDescEn').value;
    data.hero.descAr = document.getElementById('heroDescAr').value;
    data.hero.statYears = +document.getElementById('statYears').value;
    data.hero.statProjects = +document.getElementById('statProjects').value;
    data.hero.statTools = +document.getElementById('statTools').value;

    // جمع بيانات About
    data.about.bioEn = document.getElementById('aboutBioEn').value;
    data.about.bioAr = document.getElementById('aboutBioAr').value;
    data.about.degreeEn = document.getElementById('degreeEn').value;
    data.about.degreeAr = document.getElementById('degreeAr').value;
    data.about.uniEn = document.getElementById('uniEn').value;
    data.about.uniAr = document.getElementById('uniAr').value;
    data.about.gradeEn = document.getElementById('gradeEn').value;
    data.about.gradeAr = document.getElementById('gradeAr').value;
    data.about.gradYear = document.getElementById('gradYear').value;

    // جمع بيانات Contact
    data.contact.email = document.getElementById('contactEmail').value;
    data.contact.whatsapp = document.getElementById('contactWhatsapp').value;
    data.contact.locationEn = document.getElementById('contactLocEn').value;
    data.contact.locationAr = document.getElementById('contactLocAr').value;

    // حفظ
    saveData();
    showToast();
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}


// ==================== تصدير ملف index.html المحدث ====================
async function exportUpdatedIndexHtml() {
    saveAll(); // حفظ البيانات الحالية أولاً

    try {
        let html = '';
        
        // محاولة جلب قالب index.html، وإذا فشل أو منع المتصفح، استخدام الصفحة المفتوحة
        try {
            const response = await fetch('index.html');
            if (response.ok) {
                html = await response.text();
            }
        } catch (e) {
            console.warn('تعذر قراءة index.html عبر fetch، سيتم المحاولة عبر مسار بديل');
        }

        if (!html) {
            // محاولة بديلة للقراءة عبر النافذة إذا كان الموقع مفتوحاً محلياً
            alert('يرجى التأكد من فتح لوحة التحكم عبر السيرفر المحلي http://localhost:3500/GAMAL.html أو رفع الملف عبر GitHub ليتمكن من القراءة والتصدير بنجاح.');
            return;
        }

        // 1. تحديث بيانات Hero
        if (data.hero) {
            html = html.replace(/(<span class="lang-en"><span class="highlight">)[^<]*(<\/span><\/span>)/, `$1${data.hero.nameEn || 'Jamal Maher'}$2`);
            html = html.replace(/(<span class="lang-ar"><span class="highlight">)[^<]*(<\/span><\/span>)/, `$1${data.hero.nameAr || 'جمال ماهر'}$2`);
            html = html.replace(/(<p class="hero-desc animate-fade-up delay-2">\s*<span class="lang-en">)[^<]*(<\/span>\s*<span class="lang-ar">)[^<]*(<\/span>)/, 
                `$1${data.hero.descEn || ''}$2${data.hero.descAr || ''}$3`);
            
            // تحديث الأرقام
            html = html.replace(/(<span class="stat-number" data-target=")[^"]*(">)[^<]*(<\/span><span class="stat-plus">\+<\/span>\s*<\/div>\s*<span class="stat-label">\s*<span class="lang-en">Years Experience)/,
                `$1${data.hero.statYears || 0}$2${data.hero.statYears || 0}$3`);
            html = html.replace(/(<span class="stat-number" data-target=")[^"]*(">)[^<]*(<\/span><span class="stat-plus">\+<\/span>\s*<\/div>\s*<span class="stat-label">\s*<span class="lang-en">Projects Done)/,
                `$1${data.hero.statProjects || 0}$2${data.hero.statProjects || 0}$3`);
            html = html.replace(/(<span class="stat-number" data-target=")[^"]*(">)[^<]*(<\/span><span class="stat-plus">\+<\/span>\s*<\/div>\s*<span class="stat-label">\s*<span class="lang-en">Tools Mastered)/,
                `$1${data.hero.statTools || 0}$2${data.hero.statTools || 0}$3`);

            if (data.hero.profileImage) {
                const imgTag = `<img src="${data.hero.profileImage}" alt="${data.hero.nameEn || 'Profile'}">`;
                html = html.replace(/<div class="image-placeholder">[\s\S]*?<\/div>/, imgTag);
                html = html.replace(/<img src="img\/profile\.jpg"[^>]*>/, imgTag);
            }
        }

        // 2. تحديث قسم About
        if (data.about) {
            const bioHtml = `
                        <p class="lang-en">${(data.about.bioEn || '').replace(/\n/g, '<br>')}</p>
                        <p class="lang-ar">${(data.about.bioAr || '').replace(/\n/g, '<br>')}</p>`;
            html = html.replace(/<div class="about-description">[\s\S]*?<\/div>/, `<div class="about-description">${bioHtml}\n                    </div>`);
        }

        // 3. تحديث المشاريع إذا وجدت
        if (data.projects && data.projects.length > 0) {
            let projectsHtml = '';
            data.projects.forEach(p => {
                const tagsHtml = (p.tags || []).map(t => `<span class="project-tag">${t}</span>`).join('\n                            ');
                const imgHtml = p.image 
                    ? `<img src="${p.image}" alt="${p.titleEn || ''}">` 
                    : `<div class="project-img-placeholder"><i class="fas fa-project-diagram"></i></div>`;
                const linksHtml = `
                                ${p.demoLink ? `<a href="${p.demoLink}" target="_blank" class="project-link" title="Live Demo / Dashboard"><i class="fas fa-external-link-alt"></i></a>` : ''}
                                ${p.githubLink ? `<a href="${p.githubLink}" target="_blank" class="project-link" title="View Code (GitHub / Kaggle)"><i class="fab fa-github"></i></a>` : ''}
                                ${p.fileLink ? `<a href="${p.fileLink}" target="_blank" class="project-link" title="${p.fileType || 'Download Project File'}"><i class="fas fa-file-download"></i></a>` : ''}`;

                projectsHtml += `
                <div class="project-card reveal" data-category="${p.category || 'python'}">
                    <div class="project-image">
                        ${imgHtml}
                        <div class="project-overlay">
                            <div class="project-links">${linksHtml}
                            </div>
                        </div>
                    </div>
                    <div class="project-info">
                        <div class="project-tags">
                            ${tagsHtml}
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
                </div>\n`;
            });

            html = html.replace(/<div class="projects-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, 
                `<div class="projects-grid">\n${projectsHtml}            </div>\n        </div>\n    </section>`);
        }

        // 4. تحديث معلومات التواصل
        if (data.contact) {
            if (data.contact.email) {
                html = html.replace(/href="mailto:[^"]*"/g, `href="mailto:${data.contact.email}"`);
                html = html.replace(/jamal\.maher@email\.com/g, data.contact.email);
            }
            if (data.contact.whatsapp) {
                const cleanWa = data.contact.whatsapp.replace(/[^0-9]/g, '');
                html = html.replace(/href="https:\/\/wa\.me\/[^"]*"/g, `href="https://wa.me/${cleanWa}"`);
                html = html.replace(/\+20 123 456 7890/g, data.contact.whatsapp);
            }
        }

        // تنزيل الملف
        const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'index.html';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(downloadUrl);
        }, 300);

        alert('✅ تم توليد وتنزيل ملف index.html المحدث بنجاح! \n\nارفع هذا الملف فقط إلى مستودع GitHub وسيتم تحديث موقعك للجميع.');
    } catch (err) {
        console.error(err);
        alert('حدث خطأ أثناء التصدير: ' + err.message);
    }
}
