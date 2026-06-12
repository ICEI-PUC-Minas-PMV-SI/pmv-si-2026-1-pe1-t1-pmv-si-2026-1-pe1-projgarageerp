console.log(GarageOrdens.listarOrdens());

const ordens = GarageOrdens.listarOrdens();

const ultimasOrdens = ordens.slice(0,5);

const total = ordens.length;

const concluido = ordens.filter(
    ordem => ordem.status === "concluido"
).length;

const em_andamento = ordens.filter(
    ordem => ordem.status === "em_andamento"
).length;

const pendente = ordens.filter(
    ordem => ordem.status === "pendente"
).length;

const atrasado = ordens.filter(
    ordem => ordem.status === "atrasado"
).length;

function Porcentagem(valor, total) {
    if(total === 0){
        return 0;
    }
    return (valor / total) * 100;
}

function Alerta(id, valor) {
    // Certifique-se de que o elemento com id "alerta" existe no HTML
    const elementoAlerta = document.getElementById("alerta");
    if (elementoAlerta) {
        elementoAlerta.textContent = `Você tem ${valor} ordem atrasada(s)`;
    }
}
Alerta("atrasado", atrasado);

function ValorIndice(id, valor, total) {
    const pct = Porcentagem(valor, total);
    const elementoIndice = document.getElementById("indice-" + id);
    if (elementoIndice) {
        elementoIndice.textContent = `${Math.round(pct)}%`;
    }
    const alerta = document.getElementById("alerta-atrasado");
    if (alerta) {
        if (pct > 4) {
            alerta.textContent = `Requer Atenção!`;
        } else {
            alerta.textContent = ``;
        }
    }
}
ValorIndice("concluido", concluido, total);
ValorIndice("atrasado", atrasado, total);

function ValorQuan(id, valor) {
    const elemento = document.getElementById("num-" + id);
    if (elemento) {
        elemento.textContent = `${valor}`;
    }
}
// === ATUALIZAÇÃO AUTOMÁTICA DOS CARDS DO CARD-CONTAINER ===
ValorQuan("concluido", concluido);
ValorQuan("andamento", em_andamento);
ValorQuan("pendente", pendente);
// ==========================================================
function AtualizarClientes() {
    const TotalClientes = ClienteStorage.listar().length;
    ValorQuan("cliente", TotalClientes);
}

AtualizarClientes();
function AtualizarBarra(id, valor, total) {
    const pct = Porcentagem(valor, total);
    const barra = document.getElementById("barra-" + id);
    const performance = document.getElementById("performance-" + id);
 
    if (barra) barra.style.width = pct + "%";
    if (performance) {
        performance.textContent = `${valor} de ${total} (${Math.round(pct)}%)`;
    }
}
AtualizarBarra("concluido", concluido, total);
AtualizarBarra("andamento", em_andamento, total);
AtualizarBarra("pendente", pendente, total);
AtualizarBarra("atrasado", atrasado, total);

const receitaTotal = ordens
    .filter(ordem => ordem.status === "concluido")
    .reduce((total, ordem) => {
        return total + GarageOrdens.obterTotal(ordem);
    }, 0);

const faturamentoEstimado = ordens
    .filter(ordem =>
        ordem.status === "pendente" ||
        ordem.status === "em_andamento"
    )
    .reduce((total, ordem) => { 
        return total + GarageOrdens.obterTotal(ordem);
    }, 0);

const receitaElemento = document.getElementById("receita-total");
const faturamentoElemento = document.getElementById("faturamneto-estimado");
const ticketElemento = document.getElementById("ticket-medio");

if(receitaElemento){
    receitaElemento.textContent =
        GarageOrdens.formatarMoeda(receitaTotal);
}

if(faturamentoElemento){
    faturamentoElemento.textContent =
        GarageOrdens.formatarMoeda(faturamentoEstimado);
}

const ticketMedio = 
    concluido > 0 ? receitaTotal / concluido : 0;

if(ticketElemento){
    ticketElemento.textContent = 
        GarageOrdens.formatarMoeda(ticketMedio);
}

const estados = {
        concluido: {
            img: "../../assets/icons/icon-green-check-circle.svg",
            texto: "Concluído",
        },
        em_andamento: {
            img: "../../assets/icons/icon-orange-clock.svg",
            texto: "Em andamento",
        },
        atrasado: {
            img: "../../assets/icons/icon-red-warning-circle.svg",
            texto: "Atrasado",
        },
        pendente: {
            img: "../../assets/icons/icon-blue-file.svg",
            texto: "Pendente",
        },
    };

function AtualizarStatus(id, numeroOS, status) {
    const container = document.getElementById("status-os-" + id);
    const img = document.getElementById("img-status-" + id);
    const text = document.getElementById("status-texto-" + id);
    const number = document.getElementById("numero-os-" + id);
    if(number) number.textContent = `OS #${numeroOS}`;
    if(container) container.className = "OS-status " + status;

    if(img && estados[status]) img.src = estados[status].img;
    if(text && estados[status]) text.textContent = estados[status].texto;
}

const container = document.getElementById("atividades-recentes");
    if (container) {
        container.innerHTML = "";
        ultimasOrdens.forEach(ordem => {

            const estado = estados[ordem.status];

            container.innerHTML += `
            <a href="ordem.html?id=${ordem.id}" class="recente-OS-link">
                <div class="recente-OS">
                    <div class="numero-status">
                        <p class="OS-numero">
                            OS #${ordem.id}
                        </p>
                        <div class="OS-status ${ordem.status}">
                            <img src="${estado.img}" alt="${estado.texto}">
                            <p class="status-texto">
                                ${estado.texto}
                            </p>
                        </div>
                    </div>
                    <div class="nome-veiculos">
                        <p class="nome-cliente">
                            ${ordem.cliente.nome}
                        </p>
                        <p class="veiculo">
                            ${ordem.veiculo.modelo} - ${ordem.veiculo.placa}
                        </p>
                    </div>
                </div>
            </a>
                    `;
        });
            container.innerHTML += `
            <a href="listar-ordens.html" class="todas-ordens-button button">
                <p>Ver Todas as Ordens</p>
            </a>
            `;
    }