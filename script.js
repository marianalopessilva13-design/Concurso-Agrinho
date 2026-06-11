// ================================
// ANIMAÇÃO DOS CONTADORES
// ================================

const counters = document.querySelectorAll(".counter");

function animarContadores() {
    counters.forEach(counter => {
        let valorFinal = Number(counter.dataset.value);
        let valorAtual = 0;

        let contador = setInterval(() => {
            valorAtual++;
            counter.textContent = valorAtual;

            if (valorAtual >= valorFinal) {
                clearInterval(contador);
            }
        }, 25);
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
            label: "Avanço estimado de práticas sustentáveis no agro (%)",
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
// QUIZ INTERATIVO COM RESPOSTAS EMBARALHADAS
// ================================

const perguntas = [
    {
        pergunta: "Qual prática agrícola ajuda a preservar o solo?",
        respostas: [
            { texto: "Plantio direto", correta: true },
            { texto: "Desmatamento", correta: false },
            { texto: "Uso excessivo de água", correta: false }
        ]
    },

    {
        pergunta: "Qual tecnologia auxilia no monitoramento das plantações?",
        respostas: [
            { texto: "Queimadas", correta: false },
            { texto: "Drones e sensores", correta: true },
            { texto: "Retirada de matas", correta: false }
        ]
    },

    {
        pergunta: "O que significa produzir de forma sustentável?",
        respostas: [
            { texto: "Produzir sem planejamento", correta: false },
            { texto: "Utilizar todos os recursos naturais rapidamente", correta: false },
            { texto: "Equilibrar produção e preservação", correta: true }
        ]
    },

    {
        pergunta: "Qual fonte de energia combina com um agro mais sustentável?",
        respostas: [
            { texto: "Maior desperdício energético", correta: false },
            { texto: "Energia solar", correta: true },
            { texto: "Menos tecnologia", correta: false }
        ]
    },

    {
        pergunta: "Qual prática integra lavoura, pecuária e floresta?",
        respostas: [
            { texto: "Monocultura sem manejo", correta: false },
            { texto: "Queimada descontrolada", correta: false },
            { texto: "ILPF", correta: true }
        ]
    }
];

let perguntaAtual = 0;
let pontos = 0;
let erros = 0;

const perguntaTexto = document.getElementById("question");
const respostasBox = document.getElementById("answers");
const resultado = document.getElementById("result");
const progresso = document.getElementById("progress");

function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

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
    let respostasEmbaralhadas = embaralhar([...item.respostas]);

    progresso.innerHTML = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    perguntaTexto.innerHTML = item.pergunta;
    respostasBox.innerHTML = "";
    resultado.innerHTML = "";

    respostasEmbaralhadas.forEach(resposta => {
        let botao = document.createElement("button");

        botao.className = "option";
        botao.innerHTML = resposta.texto;

        botao.onclick = () => {
            verificarResposta(resposta.correta, botao);
        };

        respostasBox.appendChild(botao);
    });
}

function verificarResposta(correta, botaoClicado) {
    const botoes = document.querySelectorAll(".option");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (correta) {
        pontos++;
        botaoClicado.classList.add("correct");
        resultado.innerHTML = "✅ Resposta correta!";
    } else {
        erros++;
        botaoClicado.classList.add("wrong");

        botoes.forEach(botao => {
            if (botao.onclick.toString().includes("true")) {
                botao.classList.add("correct");
            }
        });

        resultado.innerHTML = "❌ Resposta incorreta. A resposta correta foi destacada.";
    }

    setTimeout(() => {
        perguntaAtual++;
        carregarPergunta();
    }, 1400);
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


// ================================
// MENU MOBILE
// ================================

const menuMobile = document.getElementById("menuMobile");
const menu = document.querySelector(".menu");

if (menuMobile) {
    menuMobile.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}
