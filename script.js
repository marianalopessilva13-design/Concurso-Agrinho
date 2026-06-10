// Animação ao rolar
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((item) => {
    const windowHeight = window.innerHeight;
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < windowHeight - 100) {
      item.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


// Contadores animados
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;

  const statsSection = document.querySelector(".stats");
  const top = statsSection.getBoundingClientRect().top;

  if (top < window.innerHeight - 100) {
    countersStarted = true;

    counters.forEach((counter) => {
      const target = Number(counter.getAttribute("data-target"));
      let current = 0;
      const increment = target / 80;

      const updateCounter = () => {
        current += increment;

        if (current < target) {
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  }
}

window.addEventListener("scroll", startCounters);


// Gráficos
const ctx1 = document.getElementById("chartSustentavel");
const ctx2 = document.getElementById("chartTecnologia");

new Chart(ctx1, {
  type: "line",
  data: {
    labels: ["2021", "2022", "2023", "2024", "2025", "2026"],
    datasets: [{
      label: "Produção sustentável — dado ilustrativo",
      data: [28, 35, 43, 52, 64, 78],
      borderWidth: 4,
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: { size: 13 }
        }
      }
    }
  }
});

new Chart(ctx2, {
  type: "bar",
  data: {
    labels: ["Sensores", "Drones", "Bioinsumos", "IA", "Irrigação"],
    datasets: [{
      label: "Adoção de tecnologias — dado ilustrativo",
      data: [62, 48, 55, 38, 70],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});


// Quiz
const questions = [
  {
    question: "Qual prática ajuda a proteger o solo contra erosão?",
    answers: ["Plantio direto", "Queimada frequente", "Desmatamento", "Uso excessivo de água"],
    correct: 0
  },
  {
    question: "O que é agricultura de precisão?",
    answers: [
      "Produzir sem planejamento",
      "Usar dados e tecnologia para manejar melhor a lavoura",
      "Plantar sempre a mesma cultura",
      "Aumentar desperdícios"
    ],
    correct: 1
  },
  {
    question: "Qual tecnologia pode monitorar áreas agrícolas pelo ar?",
    answers: ["Drones", "Forno elétrico", "Trator antigo", "Lâmpada comum"],
    correct: 0
  },
  {
    question: "Bioinsumos ajudam principalmente em quê?",
    answers: [
      "No manejo biológico e sustentável",
      "No aumento de poluição",
      "Na destruição do solo",
      "Na redução da biodiversidade"
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

function loadQuestion() {
  answered = false;
  resultEl.textContent = "";
  nextBtn.style.display = "none";

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.classList.add("answer-btn");
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
    resultEl.textContent = "Resposta correta! Mandou bem no agro inteligente.";
  } else {
    button.classList.add("wrong");
    allButtons[correctIndex].classList.add("correct");
    resultEl.textContent = "Quase! A resposta correta foi destacada.";
  }

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

  let feedback = "";

  if (score === questions.length) {
    feedback = "Excelente! Você entende bem o equilíbrio entre produção e sustentabilidade.";
  } else if (score >= 2) {
    feedback = "Muito bom! Você já tem uma boa visão sobre o agro sustentável.";
  } else {
    feedback = "Bom começo! Continue explorando o tema para fortalecer seus conhecimentos.";
  }

  resultEl.innerHTML = `
    Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas.<br>
    ${feedback}
  `;
}

loadQuestion();


// Mitos e verdades
const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const button = item.querySelector("button");

  button.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});
