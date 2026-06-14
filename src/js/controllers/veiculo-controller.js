/**
 * Controller - Detalhes e Histórico do Veículo
 *
 * Exibe as informações do veículo e lista o histórico de ordens
 * de serviço vinculadas a ele.
 */

document.addEventListener("DOMContentLoaded", () => {
    const id = new URLSearchParams(window.location.search).get("id");

    if (!id) {
        window.location.href = "listar-veiculos.html";
        return;
    }

    const veiculo = window.VeiculoStorage.Buscar(id);
    const ordens = window.GarageOrdens.listarOrdens();

    if (!veiculo) {
        window.customAlert("Veículo não encontrado", "danger");
        setTimeout(() => {
            window.location.href = "listar-veiculos.html";
        }, 1500);
        return;
    }

    const cliente = window.ClienteStorage.obterPorId(veiculo.clienteId);

    document.getElementById("veiculo-nome").textContent =
        `${veiculo.marca} ${veiculo.modelo}`;

    document.getElementById("veiculo-info").textContent =
        `${veiculo.placa} • ${veiculo.ano}`;

    document.getElementById("veiculo-proprietario").textContent =
        `Proprietário: ${cliente ? cliente.nome : "Não encontrado"}`;

    // Atualiza links dos botões "Editar Veículo" e "Nova Ordem" na visualização do veículo
    const btnEditar = document.querySelector(".btn-editar");
    if (btnEditar) {
        btnEditar.href = `editar-veiculo.html?id=${veiculo.id}`;
    }
    const btnNovaOrdem = document.querySelector(".btn-nova-ordem");
    if (btnNovaOrdem) {
        btnNovaOrdem.href = `nova-ordem.html?clienteId=${veiculo.clienteId}&veiculoId=${veiculo.id}`;
    }

    const historico = ordens.filter((ordem) => {
        const veiculoIdOrdem =
            ordem.veiculoId !== undefined
                ? String(ordem.veiculoId)
                : ordem.veiculo
                  ? String(ordem.veiculo.id)
                  : null;

        return veiculoIdOrdem === String(veiculo.id);
    });

    const totalServicosHeader = document.getElementById("total-servicos");
    if (totalServicosHeader) {
        totalServicosHeader.textContent = `${historico.length} serviços registrados`;
    }

    const totalServicosHistorico = document.getElementById("total-servicos-historico");
    if (totalServicosHistorico) {
        totalServicosHistorico.textContent = `${historico.length} serviços`;
    }

    const lista = document.getElementById("lista-historico");

    const statusMap = {
        pendente: {
            cardClasse: "history-card-pendente",
            badgeClasse: "badge-pendente",
            icone: "../../assets/icons/icon-blue-file.svg",
            texto: "Pendente",
        },
        em_andamento: {
            cardClasse: "history-card-andamento",
            badgeClasse: "badge-andamento",
            icone: "../../assets/icons/icon-orange-clock.svg",
            texto: "Em Andamento",
        },
        andamento: {
            cardClasse: "history-card-andamento",
            badgeClasse: "badge-andamento",
            icone: "../../assets/icons/icon-orange-clock.svg",
            texto: "Em Andamento",
        },
        concluido: {
            cardClasse: "history-card-concluido",
            badgeClasse: "badge-concluido",
            icone: "../../assets/icons/icon-check-circle.svg",
            texto: "Concluído",
        },
        atrasado: {
            cardClasse: "history-card-atrasado",
            badgeClasse: "badge-atrasado",
            icone: "../../assets/icons/icon-red-warning-circle.svg",
            texto: "Atrasado",
        },
    };

    lista.innerHTML = "";

    historico.forEach((ordem) => {
        const status = statusMap[ordem.status] || statusMap.pendente;
        const dataFormatada = window.Formatters.formatarDataEHoraPorExtenso(ordem.dataCriacao || ordem.data);

        let avisoHtml = "";
        if (ordem.status === "atrasado") {
            avisoHtml = `
                <div class="aviso aviso-atrasado">
                    <img src="../../assets/icons/icon-red-warning.svg" alt="" />
                    Atenção: serviço atrasado
                </div>
            `;
        } else if (ordem.status === "concluido") {
            const dataConclusao = window.Formatters.formatarDataPorExtenso(ordem.concluidoEm || ordem.dataAtualizacao || ordem.data);
            avisoHtml = `
                <div class="aviso aviso-concluido">
                    <img src="../../assets/icons/icon-green-check-circle.svg" alt="" />
                    Concluído em ${dataConclusao}
                </div>
            `;
        } else if (ordem.status === "andamento" || ordem.status === "em_andamento") {
            const dataAndamento = window.Formatters.formatarDataPorExtenso(ordem.dataCriacao || ordem.data);
            avisoHtml = `
                <div class="aviso aviso-andamento">
                    <img src="../../assets/icons/icon-orange-clock.svg" alt="" />
                    Em andamento desde ${dataAndamento}
                </div>
            `;
        }

        lista.innerHTML += `
            <a href="ordem.html?id=${ordem.id}" class="history-card ${status.cardClasse}">
                <div class="icone-status-circular">
                    <img src="${status.icone}" style="width: 20px; height: 20px;" alt="" />
                </div>
                <div class="history-topo">
                    <div class="history-os">
                        <div class="history-data">
                            <img src="../../assets/icons/icon-calendar.svg" alt="Data" />
                            ${dataFormatada}
                        </div>
                        <p class="history-service">
                            ${ordem.servico || ordem.queixa || "—"}
                        </p>
                    </div>
                    <div class="badge ${status.badgeClasse}">
                        <img src="${status.icone}" alt="">
                        ${status.texto}
                    </div>
                </div>
                ${avisoHtml}
            </a>
        `;
    });
});
