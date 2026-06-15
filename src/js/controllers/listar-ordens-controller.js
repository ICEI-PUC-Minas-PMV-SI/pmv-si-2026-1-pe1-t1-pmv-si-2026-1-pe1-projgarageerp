(function () {
    document.addEventListener("DOMContentLoaded", function () {
        if (!window.GarageOrdens) {
            return;
        }

        const dados = window.GarageOrdens;
        const perfil = document.body.dataset.perfilPermitido;
        const podeExcluir = perfil !== "mecanico";
        const tabela = document.querySelector(".table-container table tbody");
        const mobile = document.querySelector(".mobile-only");
        const campoBusca = document.querySelector(".search-input input");
        const filtroStatus = document.querySelector(".filter-select");

        dados.inicializar();

        // Ler o parâmetro da URL
        if (filtroStatus) {
            const urlParams = new URLSearchParams(window.location.search);
            const statusUrl = urlParams.get("status"); // Pega o valor 'atrasado' da URL

            if (statusUrl) {
                filtroStatus.value = statusUrl; // Define o <select> para 'atrasado'
            }
        }

        if (!tabela || !mobile) {
            return;
        }

        function renderizar() {
            const termo = (campoBusca ? campoBusca.value : "").toLowerCase();
            const filtro = dados.normalizarStatus(
                filtroStatus ? filtroStatus.value : "",
            );
            const deveFiltrarStatus =
                filtroStatus &&
                filtroStatus.value !== "" &&
                filtroStatus.value !== "todos";

            const ordens = dados.listarOrdens().filter(function (ordem) {
                const statusCorreto =
                    !deveFiltrarStatus || ordem.status === filtro;
                const textoBusca = [
                    ordem.cliente.nome,
                    ordem.veiculo.modelo,
                    ordem.veiculo.placa,
                    ordem.queixa,
                    obterDescricoesServico(ordem),
                ]
                    .join(" ")
                    .toLowerCase();

                return statusCorreto && textoBusca.indexOf(termo) !== -1;
            });

            renderizarTabela(ordens);
            renderizarMobile(ordens);
        }

        function renderizarTabela(ordens) {
            if (ordens.length === 0) {
                const colunas = podeExcluir ? 7 : 6;
                tabela.innerHTML =
                    '<tr><td colspan="' +
                    colunas +
                    '" class="text-secondary" style="text-align: center;">Nenhuma ordem de serviço encontrada.</td></tr>';
                return;
            }

            tabela.innerHTML = ordens
                .map(function (ordem) {
                    const status = dados.obterStatus(ordem.status);
                    const acoes = podeExcluir
                        ? '<td><div class="actions-container">' +
                          botaoExcluir(ordem.id) +
                          "</div></td>"
                        : "";

                    return (
                        "<tr>" +
                        "<td>" +
                        '<a href="ordem.html?id=' +
                        ordem.id +
                        '" class="row-link"></a>' +
                        '<span class="text-secondary text-sm">#' +
                        ordem.id +
                        "</span>" +
                        "</td>" +
                        '<td class="text-primary">' +
                        dados.escaparHtml(ordem.cliente.nome) +
                        "</td>" +
                        "<td>" +
                        '<div class="vehicle-info">' +
                        '<p class="text-primary m-0">' +
                        dados.escaparHtml(ordem.veiculo.modelo) +
                        "</p>" +
                        '<p class="text-secondary text-sm m-0">' +
                        dados.escaparHtml(ordem.veiculo.placa) +
                        "</p>" +
                        "</div>" +
                        "</td>" +
                        '<td class="text-secondary">' +
                        dados.escaparHtml(encurtar(ordem.queixa, 34)) +
                        "</td>" +
                        '<td class="text-secondary">' +
                        dados.formatarDataCurta(ordem.dataCriacao) +
                        "</td>" +
                        "<td>" +
                        criarBadgeStatus(status) +
                        "</td>" +
                        acoes +
                        "</tr>"
                    );
                })
                .join("");
        }

        function renderizarMobile(ordens) {
            if (ordens.length === 0) {
                mobile.innerHTML =
                    '<p class="text-secondary" style="text-align: center; padding: 24px;">Nenhuma ordem de serviço encontrada.</p>';
                return;
            }

            mobile.innerHTML = ordens
                .map(function (ordem) {
                    const status = dados.obterStatus(ordem.status);
                    const acoes = podeExcluir
                        ? '<div class="actions-container">' +
                          criarBadgeStatus(status) +
                          botaoExcluir(ordem.id) +
                          "</div>"
                        : criarBadgeStatus(status);

                    return (
                        '<div class="order-card">' +
                        '<a href="ordem.html?id=' +
                        ordem.id +
                        '" class="order-card-link"></a>' +
                        '<div class="order-card-header">' +
                        "<div>" +
                        '<p class="order-id">#' +
                        ordem.id +
                        "</p>" +
                        '<h3 class="order-client">' +
                        dados.escaparHtml(ordem.cliente.nome) +
                        "</h3>" +
                        "</div>" +
                        acoes +
                        "</div>" +
                        '<div class="order-card-body">' +
                        "<p>" +
                        '<span class="label">Veículo:</span> ' +
                        '<span class="value">' +
                        dados.escaparHtml(ordem.veiculo.modelo) +
                        " - " +
                        dados.escaparHtml(ordem.veiculo.placa) +
                        "</span>" +
                        "</p>" +
                        '<p class="text-truncate">' +
                        '<span class="label">Serviços:</span> ' +
                        '<span class="value">' +
                        dados.escaparHtml(encurtar(ordem.queixa, 60)) +
                        "</span>" +
                        "</p>" +
                        '<p class="order-date">' +
                        dados.formatarDataCurta(ordem.dataCriacao) +
                        "</p>" +
                        "</div>" +
                        "</div>"
                    );
                })
                .join("");
        }

        function criarBadgeStatus(status) {
            return (
                '<span class="status-badge ' +
                status.classe +
                '">' +
                '<img src="' +
                status.icone +
                '" alt="" />' +
                dados.escaparHtml(status.texto) +
                "</span>"
            );
        }

        function botaoExcluir(id) {
            return (
                '<button type="button" class="btn-icon btn-delete" title="Excluir" data-excluir-ordem="' +
                id +
                '">' +
                '<img src="../../assets/icons/icon-gray-trash.svg" alt="Excluir" />' +
                "</button>"
            );
        }

        function obterDescricoesServico(ordem) {
            return ordem.servicos
                .map(function (servico) {
                    return servico.descricao;
                })
                .join(" ");
        }

        function encurtar(texto, limite) {
            if (!texto || texto.length <= limite) {
                return texto || "";
            }

            return texto.slice(0, limite - 3) + "...";
        }

        document.addEventListener("click", function (evento) {
            if (!evento.target.closest) {
                return;
            }

            const botao = evento.target.closest("[data-excluir-ordem]");

            if (!botao) {
                return;
            }

            evento.preventDefault();
            evento.stopPropagation();

            const id = botao.dataset.excluirOrdem;
            window.customConfirm(
                "Deseja excluir a ordem de serviço #" + id + "?",
                function () {
                    dados.excluirOrdem(id);
                    renderizar();
                },
            );
        });

        if (campoBusca) {
            campoBusca.addEventListener("input", renderizar);
        }

        if (filtroStatus) {
            filtroStatus.addEventListener("change", renderizar);
        }

        renderizar();
    });
})();
