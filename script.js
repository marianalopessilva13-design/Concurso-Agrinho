document.addEventListener("DOMContentLoaded", () => {
    
    // 1. CONTADOR DINÂMICO PARA OS NÚMEROS DO AGRO
    const rodarContador = (contador) => {
        const alvo = +contador.getAttribute("data-target");
        const valorAtual = +contador.innerText;
        const velocidade = alvo / 35; 

        if (valorAtual < alvo) {
            contador.innerText = Math.ceil(valorAtual + velocidade);
            setTimeout(() => rodarContador(contador), 30);
        } else {
            contador.innerText = alvo;
        }
    };

    // 2. DETECTOR DE ROLAGEM (REVELAR SEÇÕES E EXECUTAR NÚMEROS)
    const secoesParaAnimar = document.querySelectorAll(".animar");
    const numerosParaContar = document.querySelectorAll(".num");
    let disparouContagem = false;

    const observadorVisual = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");

                // Dispara os números apenas se atingir a seção de dados
                if (entrada.target.id === "dados" && !disparouContagem) {
                    numerosParaContar.forEach(num => rodarContador(num));
                    disparouContagem = true;
                }
            }
        });
    }, { threshold: 0.15 });

    secoesParaAnimar.forEach(secao => observadorVisual.observe(secao));
});
