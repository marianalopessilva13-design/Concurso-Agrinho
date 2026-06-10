// ======================
// GRÁFICOS COM CHART.JS
// ======================

// Produção Agrícola
const ctx1 = document.getElementById('graficoProducao').getContext('2d');
const graficoProducao = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['Soja', 'Milho', 'Trigo', 'Cana'],
        datasets: [{
            label: 'Produção (Toneladas)',
            data: [1200, 900, 700, 1500],
            backgroundColor: ['#66BB6A','#1B5E20','#42A5F5','#1565C0']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Produção Agrícola por Cultivo' }
        }
    }
});

// Consumo de Água
const ctx2 = document.getElementById('graficoAgua').getContext('2d');
const graficoAgua = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['2017','2018','2019','2020','2021','2022'],
        datasets: [{
            label: 'Consumo de Água (m³)',
            data: [500, 480, 460, 430, 410, 390],
            borderColor: '#1565C0',
            backgroundColor: 'rgba(21,101,192,0.2)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#42A5F5'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Redução do Consumo de Água' }
        }
    }
});

// ======================
// QUIZ INTERATIVO
// ======================

const quiz = [
    {
        pergunta: "O que é agricultura sustentável?",
        opcoes: [
            "Produzir alimentos sem impacto ambiental",
            "Usar tecnologia para aumentar produção sem se preocupar com o solo",
            "Cortar todas as árvores para plantar mais",
            "Usar apenas fertilizantes químicos"
        ],
        respostaCorreta: 0
    },
    {
        pergunta: "Qual fonte de energia é considerada limpa no agro?",
        opcoes: ["Solar", "Carvão", "Óleo diesel", "Gás natural"],
        respostaCorreta: 0
    },
    {
        pergunta: "O que é plantio direto?",
        opcoes: [
            "Plantar sem arar o solo, preservando nutrientes",
            "Usar máquinas para remover toda a vegetação",
            "Queimar a área antes do plantio",
            "Plantar apenas em áreas urbanas"
        ],
        respostaCorreta: 0
    },
    {
        pergunta: "Verdadeiro ou falso: Agricultura de precisão usa tecnologia para reduzir desperdício.",
        opcoes: ["Verdadeiro", "Falso"],
        respostaCorreta: 0
    }
];

let currentQuestion = 0;
let score = 0;

const perguntaEl = document.getElementById('pergunta');
const opcoesEl = document.getElementById('opcoes');
const resultadoEl = document.getElementById('resultado');
const proximaBtn = document.getElementById('proxima');

function loadQuestion() {
    resultadoEl.textContent = '';
    const q = quiz[currentQuestion];
    perguntaEl.textContent = q.pergunta;
    opcoesEl.innerHTML = '';
    q.opcoes.forEach((opcao, i) => {
        const button = document.createElement('button');
        button.textContent = opcao;
        button.classList.add('btn');
        button.style.display = 'block';
        button.style.margin = '10px auto';
        button.onclick = () => checkAnswer(i);
        opcoesEl.appendChild(button);
    });
}

function checkAnswer(selected) {
    const q = quiz[currentQuestion];
    if(selected === q.respostaCorreta){
        score++;
        resultadoEl.textContent = "Correto!";
        resultadoEl.style.color = "#66BB6A";
    } else {
        resultadoEl.textContent = `Errado! Resposta correta: ${q.opcoes[q.respostaCorreta]}`;
        resultadoEl.style.color = "#E53935";
    }
    proximaBtn.style.display = 'inline-block';
}

proximaBtn.addEventListener('click', () => {
    currentQuestion++;
    if(currentQuestion < quiz.length){
        loadQuestion();
        proximaBtn.style.display = 'none';
    } else {
        perguntaEl.textContent = `Quiz finalizado! Sua pontuação: ${score} / ${quiz.length}`;
        opcoesEl.innerHTML = '';
        proximaBtn.style.display = 'none';
    }
});

// Inicializa o quiz
loadQuestion();
proximaBtn.style.display = 'none';
