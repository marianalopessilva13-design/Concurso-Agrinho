/* ==========================================
   AGRINHO 2026
   SCRIPT PRINCIPAL
========================================== */

/* LOADER */

window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if(loader){
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            }, 800);
        }
    }, 2200);
});

/* ==========================================
   CURSOR PERSONALIZADO
========================================== */

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {

    if(cursor){
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    }

});

/* ==========================================
   PARTICULAS
========================================== */

const canvas = document.getElementById("particles");

if(canvas){

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle{

    constructor(){

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 3 + 1;

        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
    }

    update(){

        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x > canvas.width) this.x = 0;
        if(this.x < 0) this.x = canvas.width;

        if(this.y > canvas.height) this.y = 0;
        if(this.y < 0) this.y = canvas.height;
    }

    draw(){

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
        "rgba(46,204,113,0.8)";

        ctx.fill();
    }
}

function createParticles(){

    particles = [];

    for(let i=0;i<120;i++){

        particles.push(
            new Particle()
        );
    }
}

createParticles();

function animateParticles(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p=>{

        p.update();
        p.draw();

    });

    requestAnimationFrame(
        animateParticles
    );
}

animateParticles();

window.addEventListener(
    "resize",
    ()=>{

        canvas.width =
        window.innerWidth;

        canvas.height =
        window.innerHeight;

        createParticles();
    }
);

}

/* ==========================================
   SCROLL REVEAL
========================================== */

const reveals =
document.querySelectorAll(".reveal");

function revealElements(){

    reveals.forEach(el=>{

        const top =
        el.getBoundingClientRect().top;

        const trigger =
        window.innerHeight - 100;

        if(top < trigger){

            el.classList.add("active");
        }

    });

}

window.addEventListener(
    "scroll",
    revealElements
);

revealElements();

/* ==========================================
   CONTADORES
========================================== */

const counters =
document.querySelectorAll(".counter");

counters.forEach(counter=>{

    const target =
    Number(counter.dataset.target);

    let count = 0;

    const update = ()=>{

        const increment =
        target / 120;

        count += increment;

        if(count < target){

            counter.innerText =
            Math.floor(count);

            requestAnimationFrame(update);

        }else{

            counter.innerText =
            target;
        }
    };

    update();

});

/* ==========================================
   MAPA INTERATIVO
========================================== */

const regionInfo =
document.getElementById("regionInfo");

const regions = {

"Norte":
"Projetos voltados à conservação da Amazônia e bioeconomia.",

"Nordeste":
"Uso eficiente da água e agricultura resiliente ao clima.",

"Centro-Oeste":
"Produção de grãos com agricultura de precisão.",

"Sudeste":
"Inovação tecnológica e sustentabilidade agrícola.",

"Sul":
"Integração lavoura-pecuária-floresta e energias renováveis."

};

document
.querySelectorAll(".region-btn")
.forEach(btn=>{

btn.addEventListener("click",()=>{

    const region =
    btn.dataset.region;

    regionInfo.innerHTML = `
        <h3>${region}</h3>
        <p>${regions[region]}</p>
    `;
});

});

/* ==========================================
   QUIZ
========================================== */

const quizData = [

{
question:
"Qual prática reduz o uso de água?",

answers:[
"Agricultura de Precisão",
"Queimada",
"Desmatamento",
"Monocultura"
],

correct:0
},

{
question:
"Qual tecnologia monitora lavouras do céu?",

answers:[
"Drones",
"Tratores antigos",
"Arados",
"Foices"
],

correct:0
},

{
question:
"Qual energia é renovável?",

answers:[
"Solar",
"Carvão",
"Petróleo",
"Diesel"
],

correct:0
}

];

let currentQuestion = 0;
let score = 0;

const questionEl =
document.getElementById("question");

const answersEl =
document.getElementById("answers");

const nextBtn =
document.getElementById("nextQuestion");

const progressBar =
document.querySelector(
"#progressBar span"
);

function loadQuestion(){

if(!questionEl) return;

const q =
quizData[currentQuestion];

questionEl.innerText =
q.question;

answersEl.innerHTML = "";

q.answers.forEach(
(answer,index)=>{

const btn =
document.createElement("button");

btn.classList.add(
"answer-btn"
);

btn.innerText = answer;

btn.addEventListener(
"click",
()=>{

if(index === q.correct){

score++;
btn.style.background =
"#2ecc71";

}else{

btn.style.background =
"#e74c3c";
}

document
.querySelectorAll(
".answer-btn"
)
.forEach(
b=>b.disabled=true
);

}
);

answersEl.appendChild(btn);

}
);

progressBar.style.width =
((currentQuestion)
/quizData.length)
*100 + "%";

}

if(questionEl){

loadQuestion();

nextBtn.addEventListener(
"click",
()=>{

currentQuestion++;

if(
currentQuestion <
quizData.length
){

loadQuestion();

}else{

questionEl.innerHTML =
`Resultado: ${score}/${quizData.length}`;

answersEl.innerHTML = "";

nextBtn.style.display =
"none";

progressBar.style.width =
"100%";

}
}
);

}

/* ==========================================
   SIMULADOR
========================================== */

const simulateBtn =
document.getElementById(
"simulate"
);

if(simulateBtn){

simulateBtn.addEventListener(
"click",
()=>{

const prod =
Number(
document.getElementById(
"prod"
).value
);

const tec =
Number(
document.getElementById(
"tec"
).value
);

const water =
Math.floor(
tec * 1.5
);

const carbon =
Math.floor(
100 - tec
);

const impact =
Math.floor(
(prod + tec) / 2
);

document.getElementById(
"simResult"
).innerHTML = `

<h3>Resultado da Simulação</h3>

<p>
🌾 Produção:
<strong>${prod}%</strong>
</p>

<p>
💧 Economia de água:
<strong>${water}%</strong>
</p>

<p>
🌎 Emissão de carbono:
<strong>${carbon}%</strong>
</p>

<p>
♻ Impacto positivo:
<strong>${impact}%</strong>
</p>

`;

}
);

}

/* ==========================================
   LIGHTBOX
========================================== */

const lightbox =
document.querySelector(
".lightbox"
);

const lightImg =
document.querySelector(
".lightbox img"
);

document
.querySelectorAll(
".gallery img"
)
.forEach(img=>{

img.addEventListener(
"click",
()=>{

lightbox.classList.add(
"active"
);

lightImg.src = img.src;

}
);

});

if(lightbox){

lightbox.addEventListener(
"click",
()=>{

lightbox.classList.remove(
"active"
);

}
);

}

/* ==========================================
   CALCULADORA VERDE
========================================== */

const calcBtn =
document.getElementById(
"calcGreen"
);

if(calcBtn){

calcBtn.addEventListener(
"click",
()=>{

const area =
Number(
document.getElementById(
"area"
).value
);

if(!area){

alert(
"Digite uma área."
);

return;
}

const indice =
Math.min(
100,
Math.floor(area * 2)
);

let nivel =
"Regular";

if(indice >= 80)
nivel = "Excelente";

else if(indice >= 50)
nivel = "Bom";

document.getElementById(
"greenResult"
).innerHTML = `

<h3>Índice de Sustentabilidade</h3>

<p>
Pontuação:
<strong>${indice}</strong>
</p>

<p>
Nível:
<strong>${nivel}</strong>
</p>

<p>
Recomendação:
Investir em agricultura de precisão,
energia solar e conservação do solo.
</p>

`;

});

}

/* ==========================================
   CERTIFICADO
========================================== */

const certBtn =
document.getElementById(
"generateCertificate"
);

if(certBtn){

certBtn.addEventListener(
"click",
()=>{

const name =
document.getElementById(
"userName"
).value;

if(name.trim() === ""){

alert(
"Digite seu nome."
);

return;
}

document.getElementById(
"certificate"
).innerHTML = `

<div class="certificate-card">

<h2>
🌱 CERTIFICADO
</h2>

<p>
Compromisso Ambiental
</p>

<br>

<h3>
${name}
</h3>

<p>
Assume simbolicamente o compromisso
de apoiar práticas sustentáveis
para um futuro melhor.
</p>

<br>

<p>
Agrinho 2026
</p>

</div>

`;

});

}

/* ==========================================
   GRÁFICO CANVAS
========================================== */

const chart =
document.getElementById(
"challengeChart"
);

if(chart){

const c =
chart.getContext("2d");

const values =
[80,65,50,75,60];

const labels =
[
"Desmat.",
"Água",
"Solo",
"Biodiv.",
"CO2"
];

function drawChart(){

c.clearRect(
0,
0,
chart.width,
chart.height
);

const width = 80;

values.forEach(
(v,i)=>{

const x =
100 + i * 130;

const h =
v * 3;

c.fillStyle =
"#2ecc71";

c.fillRect(
x,
400-h,
width,
h
);

c.fillStyle =
"#ffffff";

c.fillText(
labels[i],
x,
430
);

}
);

}

drawChart();

}
