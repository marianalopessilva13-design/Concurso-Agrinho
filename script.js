// Menu mobile
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});


// Animação ao rolar
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < window.innerHeight - 100) {
      item.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


// Contadores
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;

  const dataSection = document.getElementById("dados");
  const top = dataSection.getBoundingClientRect().top;

  if (top < window.innerHeight - 120) {
    countersStarted = true;

    counters.forEach((counter) => {
      const target = parseFloat(counter.dataset.target);
      let current = 0;
      const increment = target / 90;

      function update() {
        current += increment;

        if (current < target) {
          counter.textContent = target % 1 === 0
            ? Math.ceil(current)
            : current.toFixed(1);
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      }

      update();
    });
  }
}

window.addEventListener("scroll", animateCounters);


// Gráfico 1 — Plano ABC+
const abcChart = document.getElementById("abcChart");

new Chart(abcChart, {
  type: "bar",
  data: {
    labels: [
      "Recuperação de pastagens",
      "ILPF e SAFs",
      "Plantio direto",
      "Florestas plantadas",
      "Bioinsumos"
    ],
    datasets: [{
      label: "Metas do Plano ABC+ até 2030 em milhões de hectares/casos",
      data: [30, 10.1, 12.5, 4, 13],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 13,
            weight: "bold"
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.dataset.label + ": " + context.raw;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


// Gráfico 2 — Uso do território brasileiro
const areaChart = document.getElementById("areaChart");

new Chart(areaChart, {
  type: "doughnut",
  data: {
    labels: [
      "Áreas protegidas",
      "Vegetação nativa em imóveis rurais",
      "Demais usos do território"
    ],
    datasets: [{
      label: "Uso do território brasileiro",
      data: [24.2, 25.6, 50.2],
      borderWidth: 3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 13,
            weight: "bold"
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.label + ": " + context.raw + "%";
          }
        }
      }
    }
  }
});


// Accordion — Mitos e Verdades
const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const button = item.querySelector("button");

  button.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});


// Quiz
const questions = [
  {
    question: "Qual prática ajuda a reduzir erosão e conservar a umidade do solo?",
    answers: [
      "Plantio direto",
      "Queimada frequente",
      "Uso descontrolado de água",
      "Retirada total da cobertura vegetal"
    ],
    correct: 0
  },
  {
    question: "O que significa ILPF?",
    answers: [
      "Integração Lavoura-Pecuária-Floresta",
      "Índice Local de Produção Familiar",
      "Instituto Livre de Pesquisa Florestal",
      "Insumo Legal para Plantio Fértil"
    ],
    correct: 0
  },
  {
    question: "Como a agricultura de precisão ajuda o produtor?",
    answers: [
      "Aplicando insumos de forma mais inteligente e localizada",
      "Aumentando desperdício",
      "Eliminando a necessidade de planejamento",
      "Substituindo totalmente o produtor"
    ],
    correct: 0
  },
  {
    question: "Qual destes recursos pode ajudar no monitoramento de lavouras?",
    answers: [
      "Drones e sensores",
      "Apenas observação manual",
      "Queimadas",
      "Descarte de dados"
    ],
    correct: 0
  },
  {
    question: "Por que a rastreabilidade é importante no agro moderno?",
    answers: [
      "Porque mostra origem, qualidade e responsabilidade da produção",
      "Porque esconde informações do consumidor",
      "Porque reduz a transparência",
      "Porque impede a venda da produção"
    ],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const quizStep = document.getElementById("quizStep");
const quizScore = document.getElementById("quizScore");

function loadQuestion() {
  answered = false;
  resultEl.innerHTML = "";
  nextBtn.style.display = "none";

  const current = questions[currentQuestion];

  quizStep.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
  quizScore.textContent = `Pontuação: ${score}`;

  questionEl.textContent = current.question;
  answersEl.innerHTML = "";

  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;

    button.addEventListener("click", () => selectAnswer(button, index));

    answersEl.appendChild(button);
  });
}

function selectAnswer(button, index) {
  if (answered) return;

  answered = true;

  const correctIndex = questions[currentQuestion].correct;
  const allButtons = document.querySelectorAll(".answer-btn");

  if (index === correctIndex) {
    button.classList.add("correct");
    score++;
    resultEl.innerHTML = "✅ Resposta correta! Esse é o agro inteligente em ação.";
  } else {
    button.classList.add("wrong");
    allButtons[correctIndex].classList.add("correct");
    resultEl.innerHTML = "❌ Quase! A resposta correta foi destacada.";
  }

  quizScore.textContent = `Pontuação: ${score}`;
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showFinalResult();
  }
});

function showFinalResult() {
  questionEl.textContent = "Resultado final";
  answersEl.innerHTML = "";
  nextBtn.style.display = "none";
  quizStep.textContent = "Quiz concluído";
  quizScore.textContent = `Pontuação final: ${score}/${questions.length}`;

  let feedback;

  if (score === questions.length) {
    feedback = "Excelente! Você tem uma visão muito forte sobre sustentabilidade, tecnologia e produção rural.";
  } else if (score >= 3) {
    feedback = "Muito bom! Você já entende bem os principais caminhos do agro sustentável.";
  } else {
    feedback = "Bom começo! O agro sustentável é um universo enorme — e você já deu o primeiro passo.";
  }

  resultEl.innerHTML = `
    <strong>Você acertou ${score} de ${questions.length} perguntas.</strong><br><br>
    ${feedback}
  `;
}

loadQuestion();
