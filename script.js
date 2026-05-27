// LOADING SCREEN

window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.display = "none";
  }, 2000);

});

// AOS

AOS.init({
  duration:1200,
  once:true
});

// PARTICLES

particlesJS("particles-js", {

  particles: {
    number: {
      value: 80
    },

    color: {
      value: "#7CFFB2"
    },

    shape: {
      type: "circle"
    },

    opacity: {
      value: 0.5
    },

    size: {
      value: 3
    },

    move: {
      enable: true,
      speed: 2
    }
  }

});

// TEXTO DINÂMICO

const texts = [
  "Tecnologia e natureza caminhando juntas.",
  "O agro sustentável transforma o futuro.",
  "Produzir mais preservando o planeta.",
  "Inovação agrícola para novas gerações."
];

const changingText = document.getElementById("changing-text");

let textIndex = 0;

setInterval(() => {

  textIndex++;

  if(textIndex >= texts.length){
    textIndex = 0;
  }

  changingText.style.opacity = 0;

  setTimeout(() => {

    changingText.innerHTML = texts[textIndex];

    changingText.style.opacity = 1;

  },500);

},4000);

// BOTÃO TOPO

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

  if(window.scrollY > 400){
    topBtn.style.display = "block";
  }else{
    topBtn.style.display = "none";
  }

});

topBtn.addEventListener("click", () => {

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

});

// CONTADORES

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

  counter.innerText = "0";

  const updateCounter = () => {

    const target = +counter.getAttribute("data-target");

    const current = +counter.innerText;

    const increment = target / 100;

    if(current < target){

      counter.innerText = `${Math.ceil(current + increment)}%`;

      setTimeout(updateCounter,20);

    }else{

      counter.innerText = `${target}%`;

    }

  };

  updateCounter();

});

// EFEITO MOUSE NOS CARDS

const cards = document.querySelectorAll(".tech-card");

cards.forEach(card => {

  card.addEventListener("mousemove",(e)=>{

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `
      radial-gradient(circle at ${x}px ${y}px,
      rgba(124,255,178,0.2),
      #10241b)
    `;

  });

  card.addEventListener("mouseleave",()=>{

    card.style.background = "#10241b";

  });

});
