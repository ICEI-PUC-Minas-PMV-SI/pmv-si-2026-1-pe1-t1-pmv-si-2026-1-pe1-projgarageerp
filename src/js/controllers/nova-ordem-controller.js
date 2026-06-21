(function () {
    document.addEventListener("DOMContentLoaded", function () {
        if (!window.GarageOrdens) {
            return;
        }

        const dados = window.GarageOrdens;
        const campoCliente = document.getElementById("cliente");
        const campoVeiculo = document.getElementById("veiculo");
        const campoMecanico = document.getElementById("mecanico");
        const campoQueixa = document.getElementById("queixa");
        const campoStatus = document.getElementById("status");
        const botaoSalvar = document.querySelector(
            ".form-actions .btn-primary",
        );

        dados.inicializar();

        if (
            !campoCliente ||
            !campoVeiculo ||
            !campoMecanico ||
            !campoQueixa ||
            !campoStatus ||
            !botaoSalvar
        ) {
            return;
        }

        popularClientes();
        popularMecanicos();

        // Se houver clienteId na URL (vindo do perfil do cliente), seleciona automaticamente
        const params = new URLSearchParams(window.location.search);
        const clienteIdUrl = params.get("clienteId");
        const veiculoIdUrl = params.get("veiculoId");

        // Determina para onde redirecionar ao cancelar, com base nos params da URL:
        function obterUrlCancelarOrdem() {
            // Verifica se a página anterior era o dashboard
            if (
                document.referrer &&
                document.referrer.includes("dashboard.html")
            ) {
                return "dashboard.html";
            }

            if (veiculoIdUrl) return `veiculo.html?id=${veiculoIdUrl}`;
            if (clienteIdUrl) return `cliente.html?id=${clienteIdUrl}`;
            return "listar-ordens.html";
        }

        const botaoCancelar = document.querySelector(".btn-cancelar");
        if (botaoCancelar) {
            botaoCancelar.addEventListener("click", function (e) {
                e.preventDefault();
                window.location.href = obterUrlCancelarOrdem();
            });
        }

        if (clienteIdUrl) {
            campoCliente.value = clienteIdUrl;
            popularVeiculos(clienteIdUrl);
            if (veiculoIdUrl) {
                campoVeiculo.value = veiculoIdUrl;
            }
        }

        campoCliente.addEventListener("change", function () {
            popularVeiculos(campoCliente.value);
        });

        botaoSalvar.addEventListener("click", function (evento) {
            evento.preventDefault();
            salvarOrdem();
        });

        function popularClientes() {
            campoCliente.innerHTML =
                '<option value="" disabled selected>Selecione o cliente...</option>';

            dados.obterClientes().forEach(function (cliente) {
                const option = document.createElement("option");
                option.value = cliente.id;
                option.textContent = cliente.nome;
                campoCliente.appendChild(option);
            });
        }

        function popularVeiculos(clienteId) {
            const veiculos = dados.obterVeiculosPorCliente(clienteId);

            campoVeiculo.innerHTML = "";

            if (veiculos.length === 0) {
                campoVeiculo.disabled = true;
                campoVeiculo.innerHTML =
                    '<option value="" disabled selected>Nenhum veículo encontrado</option>';
                atualizarAjudaVeiculo(
                    "Nenhum veículo disponível para este cliente",
                );
                return;
            }

            campoVeiculo.disabled = false;
            campoVeiculo.innerHTML =
                '<option value="" disabled selected>Selecione o veículo...</option>';

            veiculos.forEach(function (veiculo) {
                const option = document.createElement("option");
                option.value = veiculo.id;
                const marca = veiculo.marca ? veiculo.marca + " " : "";
                option.textContent =
                    marca +
                    (veiculo.modelo || "Modelo não informado") +
                    " - " +
                    (veiculo.placa || "Sem placa") +
                    " (" +
                    (veiculo.ano || "N/A") +
                    ")";
                campoVeiculo.appendChild(option);
            });

            atualizarAjudaVeiculo(
                veiculos.length + " veículo(s) disponível(is)",
            );
        }

        function popularMecanicos() {
            campoMecanico.innerHTML =
                '<option value="" selected>Sem mecânico definido</option>';

            dados.obterMecanicos().forEach(function (mecanico) {
                const option = document.createElement("option");
                option.value = mecanico.nome;
                option.textContent = mecanico.nome;
                campoMecanico.appendChild(option);
            });
        }

        function atualizarAjudaVeiculo(texto) {
            const ajuda = campoVeiculo
                .closest(".form-group")
                .querySelector(".form-help");

            if (ajuda) {
                ajuda.textContent = texto;
            }
        }

        function salvarOrdem() {
            if (!campoCliente.value) {
                window.customAlert("Selecione o cliente da ordem.", "warning");
                campoCliente.focus();
                return;
            }

            if (!campoVeiculo.value) {
                window.customAlert("Selecione o veículo da ordem.", "warning");
                campoVeiculo.focus();
                return;
            }

            if (!campoQueixa.value.trim()) {
                window.customAlert("Preencha a queixa do cliente.", "warning");
                campoQueixa.focus();
                return;
            }

            if (!campoStatus.value) {
                window.customAlert("Selecione o status da ordem.", "warning");
                campoStatus.focus();
                return;
            }

            const ordem = dados.criarOrdem({
                clienteId: campoCliente.value,
                veiculoId: campoVeiculo.value,
                mecanico: campoMecanico.value,
                queixa: campoQueixa.value.trim(),
                status: campoStatus.value,
            });

            if (!ordem) {
                window.customAlert(
                    "Não foi possível criar a ordem de serviço.",
                    "danger",
                );
                return;
            }

            sessionStorage.setItem(
                "pendingToast",
                JSON.stringify({
                    mensagem: "Ordem de serviço criada com sucesso!",
                    tipo: "success",
                }),
            );
            window.location.href = "ordem.html?id=" + ordem.id;
        }
    });
})();
