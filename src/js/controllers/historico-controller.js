const id = Number(new URLSearchParams(window.location.search).get("id"));

const veiculo = VeiculoStorage.Buscar(id);
const ordens = GarageOrdens.listarOrdens();

if (!veiculo) {
    alert("Veículo não encontrado");
}

document.getElementById("veiculo-nome").textContent =
    `${veiculo.marca} ${veiculo.modelo}`;

document.getElementById("veiculo-info").textContent =
    `${veiculo.placa} • ${veiculo.ano}`;

document.getElementById("veiculo-proprietario").textContent =
    `Proprietário: ${veiculo.proprietario}`;

const historico = ordens.filter(
    ordem => ordem.veiculo.placa === veiculo.placa
);

document.getElementById("total-servicos").textContent =
    `${historico.length} serviços registrados`;

const lista = document.getElementById("lista-historico");

const statusMap = {
    pendente: {
        classe: "badge-pendente",
        icone: "../../assets/icons/icon-blue-file.svg",
        texto: "Pendente"
    },
    em_andamento: {
        classe: "badge-andamento",
        icone: "../../assets/icons/icon-orange-clock.svg",
        texto: "Em andamento"
    },
    concluido: {
        classe: "badge-concluido",
        icone: "../../assets/icons/icon-check-circle.svg",
        texto: "Concluído"
    },
    atrasado: {
        classe: "badge-atrasado",
        icone: "../../assets/icons/icon-red-warning-circle.svg",
        texto: "Atrasado"
    }
};

lista.innerHTML = "";

historico.forEach(ordem => {
    const status = statusMap[ordem.status];

    lista.innerHTML += `
        <a href="ordem.html?id=${ordem.id}" class="history-card">
            <div class="history-content">
                <div class="history-os">
                    <p class="history-service">
                        ${ordem.queixa}
                    </p>

                    <div class="history-data">
                        ${GarageOrdens.formatarDataCompleta(ordem.dataCriacao)}
                    </div>
                </div>
            </div>

            <div class="badge ${status.classe}">
                <img src="${status.icone}" alt="">
                ${status.texto}
            </div>
        </a>
    `;
});