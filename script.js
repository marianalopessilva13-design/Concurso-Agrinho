document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. ANIMAÇÃO DOS NÚMEROS (CONTADOR)
    // ==========================================
    const iniciarContador = (contador) => {
        const target = +contador.getAttribute("data-target");
        const numAtual = +contador.innerText;
        
        // Define a velocidade da contagem (quanto menor o divisor, mais rápido)
        const incremento = target / 50; 

        if (numAtual < target) {
            contador.innerText = Math.ceil(numAtual + incremento);
            setTimeout(() => iniciarContador(contador), 30);
        } else {
            contador.innerText = target;
        }
    };

    // ==========================================
    // 2. DETECTOR DE ROLAGEM (EFEITOS AO ROLAR A TELA)
    // ==========================================
    const elementosParaAnimar = document.querySelectorAll(".animar");
    const contadores = document.querySelectorAll(".num");
    let contadoresAtivados = false;

    const seletorDeVisibilidade = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se o elemento estiver visível na tela
            if (entry.isIntersecting) {
                
                // Ativa o efeito esmaecido (Fade-in)
                entry.target.classList.add("visivel");

                // Se for a seção de dados, dispara os contadores uma única vez
                if (entry.target.id === "dados" && !contadoresAtivados) {
                    contadores.forEach(contador => iniciarContador(contador));
                    contadoresAtivados = true;
                }
            }
        });
    }, { threshold: 0.2 }); // Dispara quando 20% da seção aparecer na tela

    // Aplica o observador em todas as seções configuradas
    elementosParaAnimar.forEach(el => seletorDeVisibilidade.observe(el));
});
