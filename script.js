// ================================
// ANIMAÇÃO DOS CONTADORES
// ================================

const counters = document.querySelectorAll(".counter");

function animarContadores() {
    counters.forEach(counter => {
        let valorFinal = Number(counter.dataset.value);
        let valorAtual = 0;
        let velocidade = 25;

        let contador = setInterval(() => {
            valorAtual++;
            counter.textContent = valorAtual;

            if (valorAtual >= valorFinal) {
                clearInterval(contador);
            }
        }, velocidade);
    });
}

animarContadores();


// ================================
// GRÁFICO - CHART JS
// ================================

const ctx = document.getElementById("grafico1");

new Chart(ctx, {
    type: "line",

    data: {
        labels: ["2022", "2023", "2024", "2025", "2026"],

        datasets: [{
            label: "Evolução de práticas sustentáveis no agro (%)",
            data: [25, 38, 50, 67, 82],
            borderWidth: 4,
            tension: .4,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 8
        }]
    },

    options: {
        responsive: true,

        plugins: {
            legend: {
                display: true
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});


// ================================
// QUIZ INTERATIVO
// ================================

const perguntas = [
    {
        pergunta: "Qual prática agrícola ajuda a preservar o solo?",
        respostas: [
            "Plantio direto",
            "Desmatamento",
            "Uso excessivo de água"
        ],
        correta: 0
    },

    {
        pergunta: "Qual tecnologia auxilia no monitoramento das plantações?",
        respostas: [
            "Drones e sensores",
            "Queimadas",
            "Retirada de matas"
        ],
        correta: 0
    },

    {
        pergunta: "O que significa produzir de forma sustentável?",
        respostas: [
            "Equilibrar produção e preservação",
            "Produzir sem planejamento",
            "Utilizar todos os recursos naturais rapidamente"
        ],
        correta: 0
    },

    {
        pergunta: "Qual fonte de energia combina com um agro mais sustentável?",
        respostas: [
            "Energia solar",
            "Maior desperdício energético",
            "Menos tecnologia"
        ],
        correta: 0
    },

    {
        pergunta: "Qual prática integra lavoura, pecuária e floresta?",
        respostas: [
            "ILPF",
            "Queimada descontrolada",
            "Monocultura sem manejo"
        ],
        correta: 0
    }
];

let perguntaAtual = 0;
let pontos = 0;
let erros = 0;

const perguntaTexto = document.getElementById("question");
const respostasBox = document.getElementById("answers");
const resultado = document.getElementById("result");
const progresso = document.getElementById("progress");

function carregarPergunta() {
    if (perguntaAtual >= perguntas.length) {
        let mensagem = "";

        if (pontos === perguntas.length) {
            mensagem = "🌱 Excelente! Você domina o futuro sustentável do agro.";
        } else if (pontos >= 3) {
            mensagem = "🚜 Muito bom! Você já conhece várias práticas sustentáveis.";
        } else {
            mensagem = "🌎 Continue aprendendo! Grandes mudanças começam com pequenas sementes.";
        }

        progresso.innerHTML = "";
        perguntaTexto.innerHTML = "Resultado Final";

        respostasBox.innerHTML = `
            <h3>Você acertou ${pontos} e errou ${erros} de ${perguntas.length} perguntas.</h3>
            <button class="option" onclick="reiniciarQuiz()">Refazer Quiz</button>
        `;

        resultado.innerHTML = mensagem;
        return;
    }

    let item = perguntas[perguntaAtual];

    progresso.innerHTML = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    perguntaTexto.innerHTML = item.pergunta;
    respostasBox.innerHTML = "";
    resultado.innerHTML = "";

    item.respostas.forEach((resposta, index) => {
        let botao = document.createElement("button");

        botao.className = "option";
        botao.innerHTML = resposta;

        botao.onclick = () => {
            verificarResposta(index, botao);
        };

        respostasBox.appendChild(botao);
    });
}

function verificarResposta(index, botaoClicado) {
    const respostaCorreta = perguntas[perguntaAtual].correta;
    const botoes = document.querySelectorAll(".option");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (index === respostaCorreta) {
        pontos++;
        botaoClicado.classList.add("correct");
        resultado.innerHTML = "✅ Resposta correta!";
    } else {
        erros++;
        botaoClicado.classList.add("wrong");
        botoes[respostaCorreta].classList.add("correct");
        resultado.innerHTML = "❌ Resposta incorreta. A alternativa correta foi destacada.";
    }

    setTimeout(() => {
        perguntaAtual++;
        carregarPergunta();
    }, 1300);
}

function reiniciarQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    erros = 0;
    carregarPergunta();
}

carregarPergunta();


// ================================
// MITOS E VERDADES - ACCORDION
// ================================

const botoes = document.querySelectorAll(".accordion button");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        let texto = botao.nextElementSibling;

        if (texto.style.display === "block") {
            texto.style.display = "none";
        } else {
            texto.style.display = "block";
        }
    });
});


// ================================
// EFEITO AO ROLAR A PÁGINA
// ================================

const elementos = document.querySelectorAll(".card, h2, .chart-box, .quiz-box, .images img");

function animarScroll() {
    elementos.forEach(elemento => {
        let posicao = elemento.getBoundingClientRect().top;
        let alturaTela = window.innerHeight;

        if (posicao < alturaTela - 80) {
            elemento.style.opacity = "1";
            elemento.style.transform = "translateY(0)";
        }
    });
}

elementos.forEach(elemento => {
    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(40px)";
    elemento.style.transition = ".8s ease";
});

window.addEventListener("scroll", animarScroll);

animarScroll();
