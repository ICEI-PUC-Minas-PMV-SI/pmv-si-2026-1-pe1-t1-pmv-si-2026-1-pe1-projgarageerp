const total = 10;
const concluido = 4;
const andamento = 3;
const pendente = 2;
const atrasado = 1;

const cliente = 14;

function Porcentagem(valor, total){
    return (valor/total)*100;
}

//Cards
function ValorIndice(id, valor, total){
    const pct = Porcentagem(valor, total)

    document.getElementById("indice-" + id).textContent = `${Math.round(pct)}%`;
}

ValorIndice("concluido", concluido, total);
ValorIndice("atrasado", atrasado, total);

function ValorQuan(id, valor){
    document.getElementById("num-" + id).textContent = `${valor}`;
}

ValorQuan("OS", total);
ValorQuan("cliente", cliente);


//Gráfico Distribuicao de Status das Ordens
function AtualizarBarra(id, valor, total){
    const pct = Porcentagem(valor, total)

    document.getElementById("barra-" + id).style.width = pct + "%";

    document.getElementById("performance-" + id).textContent =
        `${valor} de ${total} (${Math.round(pct)}%)`;
}

AtualizarBarra("concluido", concluido, total);
AtualizarBarra("andamento", andamento, total);
AtualizarBarra("pendente", pendente, total);
AtualizarBarra("atrasado", atrasado, total);

//monthly-graphic

const labels = ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'];

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Quantidade de Ordem de Serviço',
      data: [4, 2, 0, 1, 7, 3],
      borderColor: 'rgba(37, 99, 235, 1)',
      backgroundColor: 'rgba(37, 99, 235, 0.5)',
    },
  ]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Performance Mensal da Oficina'
      }
    }
  },
};

window.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('monthly-graphic').getContext('2d');
  new Chart(ctx, config);
});