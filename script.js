const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  sections.forEach((section) => {

    const sectionTop = section.getBoundingClientRect().top;

    if(sectionTop < window.innerHeight - 100){
      section.classList.add("show");
    }

  });
});


// Efeito suave no menu

const links = document.querySelectorAll("nav a");

links.forEach(link => {

  link.addEventListener("click", function(e){

    e.preventDefault();

    const id = this.getAttribute("href");

    const section = document.querySelector(id);

    section.scrollIntoView({
      behavior:"smooth"
    });

  });

});


// Botão voltar ao topo

const btnTop = document.createElement("button");

btnTop.innerHTML = "↑";

document.body.appendChild(btnTop);

btnTop.classList.add("top-btn");

window.addEventListener("scroll", () => {

  if(window.scrollY > 500){
    btnTop.classList.add("active");
  }else{
    btnTop.classList.remove("active");
  }

});

btnTop.addEventListener("click", () => {

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

});


// Efeito digitando no título

const title = document.querySelector(".hero-text h2");

const text = "Agro Forte, Futuro Sustentável";

let index = 0;

title.innerHTML = "";

function typingEffect(){

  if(index < text.length){

    title.innerHTML += text.charAt(index);

    index++;

    setTimeout(typingEffect, 80);

  }

}

typingEffect();


// Cards com brilho ao mover mouse

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(124,255,178,0.25),
        #0d2018
      )
    `;

  });

  card.addEventListener("mouseleave", () => {

    card.style.background = "#0d2018";

  });

});


// Frases sustentáveis automáticas

const phrases = [
  "Tecnologia e natureza caminhando juntas.",
  "Produzir mais preservando o planeta.",
  "O futuro sustentável começa no campo.",
  "Inovação agrícola para novas gerações."
];

const subtitle = document.querySelector(".hero-text p");

let phraseIndex = 0;

setInterval(() => {

  phraseIndex++;

  if(phraseIndex >= phrases.length){
    phraseIndex = 0;
  }

  subtitle.style.opacity = 0;

  setTimeout(() => {

    subtitle.innerHTML = phrases[phraseIndex];

    subtitle.style.opacity = 1;

  }, 500);

}, 4000);
