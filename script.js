// GRÁFICOS COM CHART.JS
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
  }
});

const ctx2 = document.getElementById('graficoAgua').getContext('2d');
const graficoAgua = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: ['2017','2018','2019','2020','2021','2022'],
    datasets: [{
      label: 'Consumo de Água (m³)',
      data: [500, 480, 460, 430, 410, 390],
      borderColor: '#1565C0',
      fill: false,
      tension: 0.4
    }]
  }
});

// QUIZ SIMPLES
const quiz = [
  {
    pergunta: "O que é agricultura sustentável?",
    opcoes: ["Uso intensivo de
