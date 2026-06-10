// Chart.js - Desafios Ambientais
const ctx = document.getElementById('chartDesafios').getContext('2d');
const chartDesafios = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Desmatamento', 'Mudanças Climáticas', 'Uso da Água', 'Erosão', 'Emissão de Carbono'],
    datasets: [{
      label: 'Impacto Ambiental',
      data: [80, 70, 60, 50, 40],
      backgroundColor: ['#2E7D32','#81C784','#42A5F5','#1565C0','#6D4C41']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }
});

// Quiz Interativo
const quizData = [
  {
    question: "O que é agricultura de precisão?",
    a: "Uso de técnicas manuais",
    b: "Uso de tecnologia para monitorar plantações",
    c: "Plantio tradicional",
    correct: "b"
  },
  {
    question: "Qual prática ajuda a reduzir erosão?",
    a: "Rotação de culturas",
    b: "Desmatamento",
    c: "Queimadas",
    correct: "a"
  },
  {
    question: "O que significa sustentabilidade no campo?",
    a: "Produzir sem degradar o meio ambiente",
    b: "Aumentar lucros a qualquer custo",
    c: "Usar pesticidas sem controle",
    correct: "a"
  }
];

let currentQuiz = 0;
let score = 0;

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');

function loadQuiz() {
 
