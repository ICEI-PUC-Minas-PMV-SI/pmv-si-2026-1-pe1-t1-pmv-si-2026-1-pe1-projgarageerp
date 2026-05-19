const total = 10;
const concluido = 4;
const andamento = 3;
const pendente = 2;
const atrasado = 1;

const cliente = 14;

function Porcentagem(valor, total) {
    return (valor / total) * 100;
}

function Alerta(id, valor) {
    document.getElementById("alerta").textContent =
        `Você tem ${valor} ordem atrasada(s)`;
}

Alerta("atrasado", atrasado);

function ValorIndice(id, valor, total) {
    const pct = Porcentagem(valor, total);

    document.getElementById("indice-" + id).textContent = `${Math.round(pct)}%`;

    const alerta = document.getElementById("alerta-atrasado");

    if (pct > 4) {
        alerta.textContent = `Requer Atenção!`;
    } else {
        alerta.textContent = ``;
    }
}

ValorIndice("concluido", concluido, total);
ValorIndice("atrasado", atrasado, total);

function ValorQuan(id, valor) {
    document.getElementById("num-" + id).textContent = `${valor}`;
}

ValorQuan("cliente", cliente);
ValorQuan("concluido", concluido);

function AtualizarBarra(id, valor, total) {
    const pct = Porcentagem(valor, total);

    document.getElementById("barra-" + id).style.width = pct + "%";

    document.getElementById("performance-" + id).textContent =
        `${valor} de ${total} (${Math.round(pct)}%)`;
}

AtualizarBarra("concluido", concluido, total);
AtualizarBarra("andamento", andamento, total);
AtualizarBarra("pendente", pendente, total);
AtualizarBarra("atrasado", atrasado, total);

function AtualizarStatus(id, numeroOS, status) {
    const container = document.getElementById("status-os-" + id);
    const img = document.getElementById("img-status-" + id);
    const text = document.getElementById("status-texto-" + id);
    const number = document.getElementById("numero-os-" + id);

    number.textContent = `OS #${numeroOS}`;
    container.className = "OS-status " + status;

    const estados = {
        concluido: {
            img: "../../assets/icons/icon-green-check-circle.svg",
            texto: "Concluído",
        },
        andamento: {
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

    img.src = estados[status].img;
    text.textContent = estados[status].texto;
}

AtualizarStatus(5, 5, "andamento");
AtualizarStatus(6, 6, "concluido");
AtualizarStatus(7, 7, "pendente");
AtualizarStatus(8, 8, "atrasado");
AtualizarStatus(9, 9, "andamento");
