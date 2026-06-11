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
        const botaoSalvar = document.querySelector(".form-actions .btn-primary");

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
                atualizarAjudaVeiculo("Nenhum veículo disponível para este cliente");
                return;
            }

            campoVeiculo.disabled = false;
            campoVeiculo.innerHTML =
                '<option value="" disabled selected>Selecione o veículo...</option>';

            veiculos.forEach(function (veiculo) {
                const option = document.createElement("option");
                option.value = veiculo.id;
                option.textContent =
                    veiculo.modelo + " - " + veiculo.placa + " (" + veiculo.ano + ")";
                campoVeiculo.appendChild(option);
            });

            atualizarAjudaVeiculo(veiculos.length + " veículo(s) disponível(is)");
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
                alert("Selecione o cliente da ordem.");
                campoCliente.focus();
                return;
            }

            if (!campoVeiculo.value) {
                alert("Selecione o veículo da ordem.");
                campoVeiculo.focus();
                return;
            }

            if (!campoQueixa.value.trim()) {
                alert("Preencha a queixa do cliente.");
                campoQueixa.focus();
                return;
            }

            if (!campoStatus.value) {
                alert("Selecione o status da ordem.");
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
                alert("Não foi possível criar a ordem de serviço.");
                return;
            }

            window.location.href = "ordem.html?id=" + ordem.id;
        }
    });
})();
