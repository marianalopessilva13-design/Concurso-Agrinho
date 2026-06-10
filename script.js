AOS.init({
  duration: 900,
  once: true,
  offset: 90
});

/* =========================
   GRÁFICOS COM CHART.JS
========================= */

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true
    },
    tooltip: {
      enabled: true
    }
  },
  animation: {
    duration: 1800
  }
};

new Chart(document.getElementById("barChart"), {
  type: "bar",
  data: {
    labels: ["2010", "2024"],
    datasets: [
      {
        label: "Produção global de cereais em bilhões de toneladas",
        data: [2.44, 3.10],
        backgroundColor: ["#00B8D4", "#00C853"]
      }
    ]
  },
  options: chartOptions
});

new Chart(document.getElementById("pieChart"), {
  type: "pie",
  data: {
    labels: ["Agricultura", "Indústria", "Uso doméstico/municipal"],
    datasets: [
      {
        label: "Retiradas globais de água doce",
        data: [70, 18, 12],
        backgroundColor: ["#00C853", "#00B8D4", "#795548"]
      }
    ]
  },
  options: chartOptions
});

new Chart(document.getElementById("lineChart"), {
  type: "line",
  data: {
    labels: ["2024", "2050", "2080s", "2100"],
    datasets: [
      {
        label: "População mundial projetada em bilhões",
        data: [8.2, 9.7, 10.3, 10.2],
        borderColor: "#00C853",
        backgroundColor: "rgba(0,200,83,.16)",
        fill: true,
        tension: 0.35
      }
    ]
  },
  options: chartOptions
});

/* =========================
   MODAL DA GALERIA
========================= */

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");

document.querySelectorAll(".gallery img").forEach((img) => {
  img.addEventListener("click", () => {
    modal.classList.add("active");
    modalImg.src = img.src;
  });
});

modal.addEventListener("click", () => {
  modal.classList.remove("active");
});

/* =========================
   QUIZ INTERATIVO
========================= */

const quiz = [
  {
    q: "O que é agricultura sustentável?",
    a: [
      "Produzir sem pensar no ambiente",
      "Produzir conciliando produtividade e conservação",
      "Parar totalmente a produção agrícola",
      "Usar apenas máquinas antigas"
    ],
    correct: 1,
    exp: "Agricultura sustentável busca produzir alimentos conservando solo, água, biodiversidade e clima."
  },
  {
    q: "Qual setor responde por cerca de 70% das retiradas globais de água doce?",
    a: [
      "Transporte",
      "Agricultura",
      "Turismo",
      "Construção civil"
    ],
    correct: 1,
    exp: "Segundo UNESCO e FAO, a agricultura representa aproximadamente 70% das retiradas globais de água doce."
  },
  {
    q: "Qual tecnologia ajuda a aplicar insumos apenas onde necessário?",
    a: [
      "Agricultura de precisão",
      "Queimada",
      "Monocultura sem controle",
      "Desmatamento"
    ],
    correct: 0,
    exp: "A agricultura de precisão usa mapas, sensores e GPS para reduzir desperdícios."
  },
  {
    q: "O que significa ILPF?",
    a: [
      "Integração Lavoura-Pecuária-Floresta",
      "Índice Local de Produção de Frutas",
      "Irrigação Livre Para Fazendas",
      "Instituto Legal de Plantio Fixo"
    ],
    correct: 0,
    exp: "ILPF significa Integração Lavoura-Pecuária-Floresta, um sistema que combina produção agrícola, criação de animais e árvores na mesma área."
  },
  {
    q: "Qual prática ajuda a reduzir erosão?",
    a: [
      "Solo descoberto",
      "Plantio direto e cobertura vegetal",
      "Remover matas ciliares",
      "Usar água sem controle"
    ],
    correct: 1,
    exp: "A cobertura vegetal protege o solo contra chuva forte, vento e perda de nutrientes."
  },
  {
    q: "Qual ferramenta pode monitorar lavouras por imagens aéreas?",
    a: [
      "Drone",
      "Martelo",
      "Bússola escolar",
      "Trena manual apenas"
    ],
    correct: 0,
    exp: "Drones permitem detectar falhas, pragas e estresse hídrico com rapidez."
  },
  {
    q: "O que são bioinsumos?",
    a: [
      "Produtos biológicos usados no manejo agrícola",
      "Apenas combustíveis fósseis",
      "Plásticos descartáveis",
      "Produtos sem relação com o campo"
    ],
    correct: 0,
    exp: "Bioinsumos usam microrganismos, extratos ou processos biológicos para apoiar a produção agrícola."
  },
  {
    q: "Qual é uma solução para aumentar produção sem abrir novas áreas?",
    a: [
      "Recuperar áreas degradadas",
      "Desmatar novas áreas",
      "Abandonar o solo",
      "Poluir rios"
    ],
    correct: 0,
    exp: "Recuperar áreas degradadas melhora a produtividade e reduz a pressão por desmatamento."
  },
  {
    q: "A inteligência artificial no campo pode ajudar em quê?",
    a: [
      "Prever riscos e apoiar decisões",
      "Eliminar a necessidade de conhecimento técnico",
      "Substituir a água",
      "Impedir a fotossíntese"
    ],
    correct: 0,
    exp: "A inteligência artificial cruza dados climáticos, de solo e produção para melhorar decisões no campo."
  },
  {
    q: "Qual é a ideia central do projeto Agroforte?",
    a: [
      "Produzir mais e preservar melhor",
      "Produzir sem planejamento",
      "Ignorar a tecnologia",
      "Separar totalmente campo e ciência"
    ],
    correct: 0,
    exp: "O projeto mostra que produtividade e preservação podem caminhar juntas."
  }
];

let current = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const explanationEl = document.getElementById("explanation");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const progressBar = document.getElementById("progressBar");

function loadQuestion() {
  answered = false;

  const item = quiz[current];

  questionEl.style.display = "block";
  answersEl.style.display = "grid";
  resultEl.innerHTML = "";

  questionEl.textContent = `${current + 1}. ${item.q}`;
  answersEl.innerHTML = "";

  explanationEl.style.display = "none";
  explanationEl.textContent = "";

  nextBtn.style.display = "none";

  progressBar.style.width = `${(current / quiz.length) * 100}%`;

  item.a.forEach((answer, index) => {
    const div = document.createElement("div");
    div.className = "answer";
    div.textContent = answer;

    div.addEventListener("click", () => {
      selectAnswer(div, index);
    });

    answersEl.appendChild(div);
  });
}

function selectAnswer(element, index) {
  if (answered) return;

  answered = true;

  const item = quiz[current];
  const allAnswers = document.querySelectorAll(".answer");

  allAnswers[item.correct].classList.add("correct");

  if (index === item.correct) {
    score++;
  } else {
    element.classList.add("wrong");
  }

  explanationEl.textContent = item.exp;
  explanationEl.style.display = "block";

  nextBtn.style.display = "inline-flex";
}

nextBtn.addEventListener("click", () => {
  current++;

  if (current < quiz.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  progressBar.style.width = "100%";

  questionEl.style.display = "none";
  answersEl.style.display = "none";
  explanationEl.style.display = "none";
  nextBtn.style.display = "none";

  const percent = Math.round((score / quiz.length) * 100);

  let comment = "";

  if (percent >= 90) {
    comment = "Excelente! Você está pronto para defender o agro sustentável em qualquer feira científica.";
  } else if (percent >= 70) {
    comment = "Muito bom! Você entendeu bem a conexão entre produção, tecnologia e preservação.";
  } else if (percent >= 50) {
    comment = "Bom começo! Revise os dados e tecnologias para fortalecer sua apresentação.";
  } else {
    comment = "Continue estudando. Sustentabilidade é uma jornada, não uma corrida de trator.";
  }

  resultEl.innerHTML = `
    <h2>Resultado final</h2>

    <p style="font-size:1.3rem;margin-top:16px;">
      Acertos: <strong>${score}</strong> de <strong>${quiz.length}</strong>
    </p>

    <p style="font-size:1.3rem;">
      Nota: <strong>${percent}%</strong>
    </p>

    <p style="margin-top:16px;color:#dfffee;line-height:1.7;">
      ${comment}
    </p>
  `;
}

loadQuestion();
