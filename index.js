(function () {
    const w = document.querySelector('.typed-white');
    const g = document.querySelector('.typed-gold');
    const cur = document.querySelector('.cursor');
    const rd = document.querySelector('.reading-text');

    const lang = document.documentElement.lang;

    let fullDesc = "";
    if (lang === "fr") {
        fullDesc = "Étudiant en informatique, passionné par le développement web, le marketing digital et le trading. Je crée des projets qui résolvent de vrais problèmes et partage mes connaissances avec les autres.";
    } else if (lang === "es") {
        fullDesc = "Estudiante de informática, apasionado por el desarrollo web, el marketing digital y el trading. Creo proyectos que resuelven problemas reales y comparto mis conocimientos con los demás.";
    } else if (lang === "en") {
        fullDesc = "Computer science student, passionate about web development, digital marketing and trading. I create projects that solve real problems and share my knowledge with others.";
    }

    let i = 0;
    function typeLine1() {
        if (i <= "BRADLEY".length) {
            w.textContent = "BRADLEY".slice(0, i++);
            setTimeout(typeLine1, 100);
        } else {
            i = 0;
            setTimeout(typeLine2, 250);
        }
    }

    function typeLine2() {
        if (i <= "MON".length) {
            g.textContent = "MON".slice(0, i++);
            setTimeout(typeLine2, 120);
        } else {
            cur.style.display = 'none';
            setTimeout(typeDesc, 400);
        }
    }

    let j = 0;
    function typeDesc() {
        rd.style.opacity = '1';
        if (j <= fullDesc.length) {
            rd.textContent = fullDesc.slice(0, j++);
            if (j > fullDesc.length) rd.classList.add('active');
            setTimeout(typeDesc, 22);
        }
    }

    if (w && g && rd) typeLine1();
})();


// ── LANG DROPDOWN ──
const langDropdown = document.querySelector(".lang-dropdown");
if (langDropdown) {
    langDropdown.addEventListener("click", (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle("active");
    });
    document.addEventListener("click", () => {
        langDropdown.classList.remove("active");
    });

    // Sove chwa lang avan navige
    document.querySelectorAll(".lang-menu a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const href = link.getAttribute("href");
            let chosen = "fr";
            if (href.includes("index-en")) chosen = "en";
            else if (href.includes("index-es")) chosen = "es";
            localStorage.setItem("lang", chosen);
            window.location.href = href;
        });
    });
}


// ── AUTO DETECT LANG ──
(function () {
    const savedLang = localStorage.getItem("lang");
    const browserLang = (navigator.language || "").toLowerCase();
    const path = window.location.pathname;

    const onEs = path.includes("index-es");
    const onEn = path.includes("index-en");
    const onFr = !onEs && !onEn;

    let target = savedLang;
    if (!target) {
        if (browserLang.startsWith("es")) target = "es";
        else if (browserLang.startsWith("en")) target = "en";
        else target = "fr";
    }

    if ((target === "es" && onEs) || (target === "en" && onEn) || (target === "fr" && onFr)) return;

    if (target === "es") window.location.href = "index-es.html";
    else if (target === "en") window.location.href = "index-en.html";
    else window.location.href = "index.html";
})();


// ── VALIDASYON FÒMO ──
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        const lang = document.documentElement.lang;

        const nameEl    = document.getElementById("name");
        const emailEl   = document.getElementById("email");
        const messageEl = document.getElementById("message");

        [nameEl, emailEl, messageEl].forEach(el => {
            if (el) el.style.borderColor = "";
        });

        let hasError = false;

        if (!nameEl?.value.trim()) {
            nameEl.style.borderColor = "#E24B4A";
            hasError = true;
        }
        if (!emailEl?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
            emailEl.style.borderColor = "#E24B4A";
            hasError = true;
        }
        if (!messageEl?.value.trim()) {
            messageEl.style.borderColor = "#E24B4A";
            hasError = true;
        }

        if (hasError) {
            e.preventDefault();
            showToast("error", lang);
        }
    });
}


// ── TOAST NOTIFIKASYON ──
function showToast(type, lang) {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const msgs = {
        success: { fr: "✓ Message envoyé !", en: "✓ Message sent!", es: "✓ ¡Mensaje enviado!" },
        error:   { fr: "Veuillez remplir tous les champs.", en: "Please fill in all fields.", es: "Por favor, completa todos los campos." },
    };

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = msgs[type][lang] || msgs[type]["fr"];
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}


// ── GOOGLE ANALYTICS ──
(function () {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-KFL6WLK9YQ";
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-KFL6WLK9YQ');
})();

// ── HAMBURGER MENU ──
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("active");
    });

    // Fèmen lè ou klike sou yon lyen
    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            mobileMenu.classList.remove("active");
        });
    });

    // Fèmen lè ou klike deyò
    document.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
    });
}