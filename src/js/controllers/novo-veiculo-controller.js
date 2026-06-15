const formulario = document.getElementById("form-veiculo");
const selectCliente = document.getElementById("cliente");
const inputPlaca = document.getElementById("placa");

// Carrega clientes no select
function carregarClientes() {
    selectCliente.innerHTML = '<option value="">Selecione...</option>';

    ClienteStorage.listar().forEach((cliente) => {
        const option = document.createElement("option");
        option.value = cliente.id;
        option.textContent = cliente.nome;
        selectCliente.appendChild(option);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const clienteIdUrl = urlParams.get("clienteId");

    if (clienteIdUrl && selectCliente) {
        selectCliente.value = clienteIdUrl;
    }
}

carregarClientes();

// Formatação da placa em tempo real
if (inputPlaca) {
    inputPlaca.addEventListener("input", function (e) {
        const cursorPosition = e.target.selectionStart;
        const valorOriginal = e.target.value;
        const valorFormatado = window.Formatters.formatarPlaca(valorOriginal);

        e.target.value = valorFormatado;

        // Tenta manter a posição do cursor (ajustando se o traço foi inserido)
        if (
            valorFormatado.length > valorOriginal.length &&
            valorFormatado.includes("-")
        ) {
            e.target.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
        }
    });
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const clienteId = document.getElementById("cliente").value;
    const marca = document.getElementById("marca").value.trim();
    const modelo = document.getElementById("modelo").value.trim();
    const placa = inputPlaca.value.trim();
    const ano = document.getElementById("ano").value.trim();

    if (!clienteId || !marca || !modelo || !placa || !ano) {
        window.customAlert("Preencha todos os campos!", "warning");
        return;
    }

    // FIX: VeiculoStorage agora delega para ClienteStorage (storage unificado).
    VeiculoStorage.Salvar({
        clienteId,
        marca,
        modelo,
        placa,
        ano,
    });

    window.customAlert("Veículo cadastrado com sucesso!", "success");

    setTimeout(() => {
        window.location.href = `cliente.html?id=${clienteId}`;
    }, 500);
});

// Ação do botão cancelar
const btnCancelar = document.querySelector(".btn-cancelar");
if (btnCancelar) {
    btnCancelar.addEventListener("click", function (evento) {
        evento.preventDefault();
        window.location.href = "listar-veiculos.html";
    });
}
