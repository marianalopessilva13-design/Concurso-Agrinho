// ==========================================
// 1. ALTERNADOR DO MENU PARA CELULAR
// ==========================================
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// ==========================================
// 2. CONFIGURAÇÃO DO GRÁFICO (CHART.JS)
// ==========================================
const ctx = document.getElementById('agrinhoChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2016', '2018', '2020', '2022', '2024', '2026 (Meta)'],
        datasets: [
            {
                label: 'Produtividade Agrícola',
                data:,
                borderColor: '#1d3557',
                backgroundColor: 'rgba(29, 53, 87, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                fill: true
            },
            {
                label: 'Preservação Ambiental (%)',
                data:,
                borderColor: '#1b4332',
                backgroundColor: 'rgba(27, 67, 50, 0.05)',
                borderWidth: 3,
                tension: 0.3,
                fill: true
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// ==========================================
// 3. SISTEMA DO QUIZ INTERATIVO
// ==========================================
const quizData = [
    {
        pergunta: "Qual técnica evita a erosão do solo e preserva a água de forma eficiente?",
        opcoes: ["Queimada controlada", "Plantio Direto na palhada", "Arado profundo contínuo"],
        correta: 1
    },
    {
        pergunta: "De que maneira os drones e a tecnologia de precisão auxiliam o meio ambiente?",
        opcoes: ["Aumentando o consumo de água", "Aplicando insumos apenas onde é necessário", "Substituindo a fotossíntese"],
        correta: 1
    }
];

let currentQuestion = 0;
let score = 0;
const quizBox = document.getElementById('quiz-box');

function loadQuiz() {
    if (currentQuestion < quizData.length) {
        const q = quizData[currentQuestion];
        quizBox.innerHTML = `
            <div>
                <h3 class="font-serif text-lg font-medium text-white mb-6">${q.pergunta}</h3>
                <div class="flex flex-col gap-3">
                    ${q.opcoes.map((opcao, idx) => `
                        <button onclick="selectOption(${idx})" class="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all">
                            ${opcao}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        showResult();
    }
}

window.selectOption = function(index) {
    if (index === quizData[currentQuestion].correta) {
        score++;
    }
    currentQuestion++;
    loadQuiz();
};

function showResult() {
    quizBox.innerHTML = `
        <div class="text-center py-6">
            <h3 class="font-serif text-2xl font-bold text-white mb-2">Quiz Concluído!</h3>
            <p class="text-slate-300 text-sm mb-4">Você acertou ${score} de ${quizData.length} perguntas.</p>
            <button onclick="resetQuiz()" class="bg-white text-slate-900 font-semibold px-6 py-2 rounded-xl text-xs uppercase tracking-wider">Refazer</button>
        </div>
    `;
}

window.resetQuiz = function() {
    currentQuestion = 0;
    score = 0;
    loadQuiz();
};

loadQuiz();
