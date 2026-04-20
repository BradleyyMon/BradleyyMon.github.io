(function () {
    const w = document.querySelector('.typed-white');
    const g = document.querySelector('.typed-gold');
    const cur = document.querySelector('.cursor');
    const rd = document.querySelector('.reading-text');

    // 🔥 DETECT LANG
    const lang = document.documentElement.lang;

    let fullDesc = "";

    if (lang === "fr") {
        fullDesc = "Étudiant en informatique, passionné par le développement web, le marketing digital et le trading. Je crée des projets qui résolvent de vrais problèmes et partage mes connaissances avec les autres.";
    } 
    else if (lang === "es") {
        fullDesc = "Estudiante de informática, apasionado por el desarrollo web, el marketing digital y el trading. Creo proyectos que resuelven problemas reales y comparto mis conocimientos con los demás.";
    } 
    else if (lang === "en") {
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
            setTimeout(typeDesc, 22);
        }
    }

    typeLine1();
    rd.classList.add('active');
})();


// 🔥 DROPDOWN LANG
const langDropdown = document.querySelector(".lang-dropdown");

langDropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle("active");
});

document.addEventListener("click", () => {
    langDropdown.classList.remove("active");
});

// Google Analytics 4 - Gtag
(function () {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-KFL6WLK9YQ";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', 'G-KFL6WLK9YQ');
})();

(function () {
  const savedLang = localStorage.getItem("lang");
  const browserLang = (navigator.language || "").toLowerCase();
  const path = window.location.pathname;

  let targetLang = savedLang;

  // si user pa janm chwazi
  if (!targetLang) {
    if (browserLang.startsWith("es")) targetLang = "es";
    else if (browserLang.startsWith("en")) targetLang = "en";
    else targetLang = "fr";
  }

  // redirect selon lang
  if (targetLang === "es" && !path.includes("index-es.html")) {
    window.location.href = "index-es.html";
  } 
  else if (targetLang === "en" && !path.includes("index-en.html")) {
    window.location.href = "index-en.html";
  } 
  else if (targetLang === "fr" && !path.includes("index.html")) {
    window.location.href = "index.html";
  }
})();

