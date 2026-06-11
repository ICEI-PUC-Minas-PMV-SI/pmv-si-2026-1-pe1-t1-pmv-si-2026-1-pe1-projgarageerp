(function () {
    document.addEventListener("DOMContentLoaded", function () {
        if (!window.GarageOrdens) {
            return;
        }

        const dados = window.GarageOrdens;
        const id = dados.obterParametroId();
        const ordem = dados.obterOrdem(id);
        const cartao = document.querySelector(".form-card");
        const form = document.querySelector("form");
        const campoCliente = document.getElementById("cliente");
        const campoMecanico = document.getElementById("mecanico");
        const campoQueixa = document.getElementById("queixa");
        const botaoCancelar = document.querySelector(".btn-cancelar");
        const botaoVeiculo = document.getElementById("select-car");
        const botaoStatus = document.getElementById("select-status");

        let veiculoSelecionadoId = null;
        let statusSelecionado = null;

        dados.inicializar();

        if (!ordem) {
            mostrarOrdemNaoEncontrada();
            return;
        }

        preencherFormulario();
        configurarCancelamento();
        configurarEnvio();

        function preencherFormulario() {
            campoCliente.value = ordem.cliente.nome;
            campoMecanico.value = ordem.mecanico || "";
            campoQueixa.value = ordem.queixa;

            veiculoSelecionadoId = ordem.veiculo.id;
            statusSelecionado = ordem.status;

            popularMenuVeiculos();
            popularMenuStatus();
        }

        function popularMenuVeiculos() {
            const veiculos = dados.obterVeiculosPorCliente(ordem.cliente.id);
            const menu = botaoVeiculo.closest(".menu");
            const submenu = menu.querySelector(".form-submenu");

            botaoVeiculo.textContent = ordem.veiculo.modelo;
            submenu.innerHTML = veiculos
                .map(function (veiculo) {
                    return (
                        "<li>" +
                        '<button type="button" class="option" data-veiculo-id="' +
                        veiculo.id +
                        '">' +
                        dados.escaparHtml(veiculo.modelo) +
                        " - " +
                        dados.escaparHtml(veiculo.placa) +
                        "</button>" +
                        "</li>"
                    );
                })
                .join("");

            configurarMenu(menu, function (option) {
                veiculoSelecionadoId = option.dataset.veiculoId;
                botaoVeiculo.textContent = option.textContent.trim();
            });

            const ajuda = botaoVeiculo
                .closest(".form-inputbox")
                .querySelector("p");

            if (ajuda) {
                ajuda.textContent = veiculos.length + " veículo(s) disponível(is)";
            }
        }

        function popularMenuStatus() {
            const statusOpcoes = [
                "pendente",
                "em_andamento",
                "concluido",
                "atrasado",
            ];
            const menu = botaoStatus.closest(".menu");
            const submenu = menu.querySelector(".form-submenu");

            botaoStatus.textContent = dados.obterStatus(ordem.status).texto;
            submenu.innerHTML = statusOpcoes
                .map(function (status) {
                    return (
                        "<li>" +
                        '<button type="button" class="option" data-status="' +
                        status +
                        '">' +
                        dados.obterStatus(status).texto +
                        "</button>" +
                        "</li>"
                    );
                })
                .join("");

            configurarMenu(menu, function (option) {
                statusSelecionado = option.dataset.status;
                botaoStatus.textContent = option.textContent.trim();
            });
        }

        function configurarMenu(menu, aoSelecionar) {
            const button = menu.querySelector(".form-select");
            const options = menu.querySelectorAll(".option");

            button.addEventListener("click", function () {
                menu.classList.toggle("active");
            });

            options.forEach(function (option) {
                option.addEventListener("click", function (evento) {
                    evento.preventDefault();
                    aoSelecionar(option);
                    menu.classList.remove("active");
                });
            });
        }

        function configurarCancelamento() {
            botaoCancelar.addEventListener("click", function () {
                window.location.href = "ordem.html?id=" + ordem.id;
            });
        }

        function configurarEnvio() {
            form.addEventListener("submit", function (evento) {
                evento.preventDefault();

                if (!campoQueixa.value.trim()) {
                    alert("Preencha a queixa do cliente.");
                    campoQueixa.focus();
                    return;
                }

                const ordemAtualizada = dados.atualizarOrdem(ordem.id, {
                    veiculoId: veiculoSelecionadoId,
                    mecanico: campoMecanico.value.trim(),
                    queixa: campoQueixa.value.trim(),
                    status: statusSelecionado,
                });

                if (!ordemAtualizada) {
                    alert("Não foi possível atualizar a ordem de serviço.");
                    return;
                }

                window.location.href = "ordem.html?id=" + ordem.id;
            });
        }

        function mostrarOrdemNaoEncontrada() {
            if (!cartao) {
                return;
            }

            cartao.innerHTML =
                '<div class="form-title">' +
                "<h1>Ordem não encontrada</h1>" +
                "<p>Não foi possível localizar a ordem de serviço informada.</p>" +
                "</div>" +
                '<div class="form-body">' +
                '<a href="listar-ordens.html" class="btn-voltar">Voltar para Ordens de Serviço</a>' +
                "</div>";
        }
    });
})();
