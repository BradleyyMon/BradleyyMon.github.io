(function () {
    const w = document.querySelector('.typed-white');
    const g = document.querySelector('.typed-gold');
    const cur = document.querySelector('.cursor');
    const rd = document.querySelector('.reading-text');

    const fullDesc = "Étudiant en informatique, passionné par le développement web, le marketing digital et le trading. Je crée des projets qui résolvent de vrais problèmes et partage mes connaissances avec les autres.";

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

const langDropdown = document.querySelector(".lang-dropdown");

console.log(langDropdown); // test

langDropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle("active");
});

document.addEventListener("click", () => {
    langDropdown.classList.remove("active");
});
