const $=s=>document.querySelector(s),S=window.SITE,C=S.contact;
const pend=v=>!v||v==="PENDIENTE";
const img=(src,alt,n,cls="")=>`<div class="ph ${cls}" data-n="${n||alt}"><img src="${src}" alt="${alt}" loading="lazy" onerror="this.parentNode.classList.add('miss')"></div>`;
const cta=(t)=>`<a class="btn" href="#contacto" data-svc="${t}">${t}</a>`;
// Hero
let cur=0,timer;const slides=S.hero;
$("#slides").innerHTML=slides.map((s,i)=>`<div class="slide${i?"":" on"}" ${i?'aria-hidden="true"':""}><img src="${s.image}" alt="${s.alt}" ${i?'loading="lazy"':""} onerror="this.remove()"></div>`).join("");
$("#dots").innerHTML=slides.map((s,i)=>`<button role="tab" aria-label="Ir al slide ${i+1}" aria-selected="${!i}" data-i="${i}"></button>`).join("");
function go(i){cur=i;document.querySelectorAll(".slide").forEach((e,k)=>{e.classList.toggle("on",k==i);e.setAttribute("aria-hidden",k!=i)});document.querySelectorAll("#dots button").forEach((b,k)=>b.setAttribute("aria-selected",k==i));
 const s=slides[i];$("#cap").innerHTML=`${s.tag}: ${s.line} <a href="${s.href}">${s.cta}</a>`}
function play(){clearInterval(timer);if(!matchMedia("(prefers-reduced-motion:reduce)").matches)timer=setInterval(()=>go((cur+1)%slides.length),6000)}
$("#dots").onclick=e=>{const b=e.target.closest("button");if(b){go(+b.dataset.i);play()}};go(0);play();
$("#inicio").addEventListener("focusin",()=>clearInterval(timer));
// Servicios
$("#cards").innerHTML=SERVICES.map(s=>`<article class="card">${img(s.image,s.title)}<div class="body"><h3>${s.title}</h3><p>${s.short}</p><a href="#${s.id}">Conocer más</a></div></article>`).join("");
$("#services").innerHTML=SERVICES.map(s=>`<article class="svc" id="${s.id}">${img(s.image,s.title)}<div><h3>${s.title}</h3><p>${s.long}</p><ul>${s.list.map(x=>`<li>${x}</li>`).join("")}</ul><em>${s.closing}</em>${cta(s.cta)}</div></article>`).join("");
const K=CONSULTORIA;$("#consult").innerHTML=`<article class="svc" id="consultoria"><div><h3>${K.title}</h3><p>${K.text}</p>${K.items.length?`<ul>${K.items.map(x=>`<li>${x}</li>`).join("")}</ul>`:""}${cta(K.cta)}</div></article>`;
$("#b2b-cards").innerHTML=B2B.map(b=>`<div class="b2b"><h3>${b.title}</h3><p>${b.text}</p></div>`).join("");
// Galería ordenada por fecha (más reciente primero)
$("#gallery").innerHTML=[...GALLERY].sort((a,b)=>b.date.localeCompare(a.date)).map(g=>`<figure>${img(g.image,g.alt,g.title)}<figcaption><strong>${g.title} — ${g.place}</strong><br>${g.type} · ${g.date}</figcaption></figure>`).join("");
const p=S.profile;$("#profile").innerHTML=`${img(p.photo,"Fotografía del responsable de Tertulia Taste","Foto — PENDIENTE")}<div><h3>${p.name}</h3><p>${p.role}</p><p>${p.bio}</p><dl><dt>Formación</dt><dd>${p.education}</dd><dt>Certificaciones</dt><dd>${p.certs}</dd><dt>Experiencia</dt><dd>${p.experience}</dd></dl></div>`;
const logos=a=>a.map(x=>img(x.image,x.name,x.name)).join("");$("#certs").innerHTML=logos(CERTS);$("#clients").innerHTML=logos(CLIENTS);
$("#values").innerHTML=VALUES.map(v=>`<div><h3>${v[0]}</h3><p>${v[1]}</p></div>`).join("");
// Contacto
const ch=[];ch.push(pend(C.whatsapp)?"WhatsApp: [PENDIENTE]":`<a href="https://wa.me/${C.whatsapp}">WhatsApp</a>`);
ch.push(pend(C.instagram)?"Instagram: [PENDIENTE]":`<a href="https://instagram.com/${C.instagram}" rel="noopener">Instagram</a>`);
ch.push(pend(C.email)?"Correo: [PENDIENTE]":`<a href="mailto:${C.email}">${C.email}</a>`);
$("#channels").innerHTML=ch.map(c=>`<li>${c}</li>`).join("");$("#social").innerHTML=ch.join(" · ");
document.addEventListener("click",e=>{const a=e.target.closest("[data-svc]");if(a){const m=$("#form [name=mensaje]");if(!m.value)m.value=a.dataset.svc+": "}});
$("#form").onsubmit=e=>{e.preventDefault();const f=e.target,st=$("#status");
 if(!f.nombre.value.trim()||!f.correo.checkValidity()||!f.correo.value){st.textContent="Revisa tu nombre y un correo válido.";return}
 const t=["Nombre: "+f.nombre.value,"Empresa: "+f.empresa.value,"Correo: "+f.correo.value,"WhatsApp: "+f.whatsapp.value,"Servicio: "+f.servicio.value,"Personas: "+f.personas.value,"Mensaje: "+f.mensaje.value].join("\n");
 if(!pend(C.whatsapp)) open(`https://wa.me/${C.whatsapp}?text=${encodeURIComponent(t)}`,"_blank","noopener");
 else if(!pend(C.email)) location.href=`mailto:${C.email}?subject=${encodeURIComponent("Solicitud Tertulia Taste")}&body=${encodeURIComponent(t)}`;
 else{st.textContent="Falta configurar WhatsApp o correo en content/site.js.";return}
 st.textContent="Gracias, tu solicitud está lista para enviarse."};
// Nav móvil
const bg=$(".burger"),nv=$("#menu");bg.onclick=()=>{const o=nv.classList.toggle("open");bg.setAttribute("aria-expanded",o)};nv.onclick=e=>{if(e.target.tagName=="A"){nv.classList.remove("open");bg.setAttribute("aria-expanded",false)}};
