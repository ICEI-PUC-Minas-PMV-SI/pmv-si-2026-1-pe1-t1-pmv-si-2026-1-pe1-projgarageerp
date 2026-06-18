const formulario = document.getElementById("form-veiculo");
const selectCliente = document.getElementById("cliente");
const inputPlaca = document.getElementById("placa");
const inputAno = document.getElementById("ano");

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

// Limitação de 4 dígitos para o Ano (Impede letras e limita comprimento)
if (inputAno) {
    inputAno.addEventListener("input", function (e) {
        e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
    });
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const clienteId = document.getElementById("cliente").value;
    const marca = document.getElementById("marca").value.trim();
    const modelo = document.getElementById("modelo").value.trim();
    const placa = inputPlaca.value.trim();
    const ano = inputAno.value.trim();

    if (!clienteId) {
        window.customAlert("Por favor, selecione o cliente proprietário.");
        selectCliente.focus();
        return;
    }
    if (!marca) {
        window.customAlert("O campo Marca é obrigatório.");
        document.getElementById("marca").focus();
        return;
    }
    if (!modelo) {
        window.customAlert("O campo Modelo é obrigatório.");
        document.getElementById("modelo").focus();
        return;
    }
    if (!placa) {
        window.customAlert("O campo Placa é obrigatório.");
        inputPlaca.focus();
        return;
    }
    if (!ano || ano.length < 4) {
        window.customAlert("O campo Ano deve conter 4 dígitos válidos.");
        inputAno.focus();
        return;
    }

    // Salva o veículo no storage unificado e captura o retorno para descobrir o ID gerado
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
