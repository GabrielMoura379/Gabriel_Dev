const WHATSAPP_NUMBER = "5511945494914";
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open"); menuToggle?.setAttribute("aria-expanded","false");
  if(menuToggle) menuToggle.textContent = "☰";
}));
document.getElementById("year").textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      card.classList.toggle("hidden", filter !== "todos" && card.dataset.category !== filter);
    });
  });
});

const demos = {
  mood: {title:"Mood Doce", text:"Conceito de website para confeitaria, com identidade delicada, apresentação de produtos e acesso fácil ao cardápio. O visual e as funcionalidades podem ser adaptados à marca real.", preview:"MOOD DOCE  /  Catálogo • Produtos • Pedidos"},
  menu: {title:"Menu Express", text:"Conceito de cardápio digital pensado para celular, com categorias, itens, preços e uma jornada simples para o cliente. Pode ser acessado por QR Code em mesas, balcões ou embalagens.", preview:"MENU EXPRESS  /  Cardápio • QR Code • Experiência mobile"},
  "3d": {title:"Lab 3D", text:"Conceito visual para apresentar serviços de impressão 3D, protótipos e peças personalizadas. Cada projeto começa com a necessidade, o uso e as dimensões da peça.", preview:"LAB 3D  /  Modelagem • Protótipos • Impressão"}
};
const modal = document.getElementById("demoModal");
document.querySelectorAll("[data-demo]").forEach(button => button.addEventListener("click", () => {
  const demo = demos[button.dataset.demo];
  document.getElementById("modalTitle").textContent = demo.title;
  document.getElementById("modalText").textContent = demo.text;
  document.getElementById("modalPreview").textContent = demo.preview;
  modal.classList.add("open"); modal.setAttribute("aria-hidden","false");
}));
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
document.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => {if(e.key === "Escape") closeModal()});
document.getElementById("modalContact").addEventListener("click", closeModal);

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();
  const text = `Olá, Gabriel Devs! Meu nome é ${name}.%0A%0A*Tenho interesse em:* ${service}.%0A*Sobre minha ideia:* ${message || "Gostaria de conversar sobre os detalhes."}%0A%0AVim pelo site da Gabriel Devs.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
});
