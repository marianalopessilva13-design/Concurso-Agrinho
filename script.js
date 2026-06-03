document.addEventListener("DOMContentLoaded", () => {
    
    // ========================================================
    // 1. CONTADOR DINÂMICO PARA OS NÚMEROS DO AGRO
    // ========================================================
    const rodarContador = (contador) => {
        const alvo = +contador.getAttribute("data-target");
        const valorAtual = +contador.innerText;
        
        // Ajusta dinamicamente a velocidade com base no tamanho do número
        const velocidade = alvo / 40; 

        if (valorAtual < alvo) {
            contador.innerText = Math.ceil(valorAtual + velocidade);
            setTimeout(() => rodarContador(contador), 35);
        } else {
            contador.innerText = alvo;
        }
    };

    // ========================================================
    // 2. MONITOR DE INTERAÇÃO (EFEITO SURGIR E ATIVAR NÚMEROS)
    // ========================================================
    const secoesParaAnimar = document.querySelectorAll(".animar");
    const numerosParaContar = document.querySelectorAll(".num");
    let disparouContagem = false;

    const observadorVisual = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                // Adiciona a classe que faz o CSS revelar a seção smoothly
                entrada.target.classList.add("visivel");

                // Dispara os números apenas se o usuário atingir a seção de dados
                if (entrada.target.id === "dados" && !disparouContagem) {
                    numerosParaContar.forEach(num => rodarContador(num));
                    disparouContagem = true; // Impede que reinicie ao subir/descer a tela
                }
            }
        });
    }, { threshold: 0.15 }); // Dispara quando 15% do bloco está na tela

    secoesParaAnimar.forEach(secao => observadorVisual.observe(secao));

    // ========================================================
    // 3. SISTEMA LIGHTBOX PARA O VÍDEO INSTITUCIONAL
    // ========================================================
    const modal = document.getElementById("videoModal");
    const abrirModalBtn = document.getElementById("playVideoBtn");
    const fecharModalBtn = document.querySelector(".close-modal");
    const reprodutorVideo = document.getElementById("videoPlayer");

    // Link do vídeo que será injetado ao clicar (Substitua por um real se necessário)
    // Usei um link de exemplo gerérico do YouTube configurado para incorporação em sites
    const linkVideoReal = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"; 

    abrirModalBtn.addEventListener("click", () => {
        modal.style.display = "flex";
        reprodutorVideo.setAttribute("src", linkVideoReal);
    });

    const fecharOModal = () => {
        modal.style.display = "none";
        reprodutorVideo.setAttribute("src", ""); // Desliga o áudio ao fechar
    };

    fecharModalBtn.addEventListener("click", fecharOModal);
    
    // Fecha o vídeo também se clicar em qualquer lugar fora da caixinha dele
    window.addEventListener("click", (evento) => {
        if (evento.target === modal) {
            fecharOModal();
        }
    });
});
