const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const veiculo = VeiculoStorage.Buscar(id);

const selectCliente = document.getElementById("cliente");
const inputPlaca = document.getElementById("placa");
const inputAno = document.getElementById("ano");
const clientes = ClienteStorage.listar();

clientes.forEach((cliente) => {
    const option = document.createElement("option");
    option.value = cliente.id;
    option.textContent = cliente.nome;
    selectCliente.appendChild(option);
});

if (veiculo) {
    // FIX: garantir string para o value do select
    selectCliente.value = String(veiculo.clienteId || "");

    selectCliente.disabled = true;

    document.getElementById("marca").value = veiculo.marca || "";
    document.getElementById("modelo").value = veiculo.modelo || "";
    inputPlaca.value = window.Formatters.formatarPlaca(veiculo.placa || "");
    document.getElementById("ano").value = veiculo.ano || "";
}

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

const formulario = document.getElementById("form-veiculo");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const marca = document.getElementById("marca").value.trim();
    const modelo = document.getElementById("modelo").value.trim();
    const placa = inputPlaca.value.trim();
    const ano = document.getElementById("ano").value.trim();
    const clienteId = selectCliente.value;

    if (!clienteId) {
        window.customAlert("Selecione um cliente para o veículo.");
        return;
    }
    if (!marca) {
        window.customAlert("O campo Marca é obrigatório.");
        document.getElementById("marca").focus(); // Coloca o cursor no campo com erro
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

    const veiculoAtualizado = {
        id: veiculo.id,
        clienteId: clienteId,
        marca: marca,
        modelo: modelo,
        placa: placa,
        ano: ano,
    };

    VeiculoStorage.Atualizar(veiculoAtualizado);

    window.customAlert("Veículo atualizado com sucesso!", "success");

    window.location.href = "listar-veiculos.html";
});

// Ação do botão cancelar
const btnCancelar = document.querySelector(".btn-cancelar");
if (btnCancelar) {
    btnCancelar.addEventListener("click", function (evento) {
        evento.preventDefault();
        window.location.href = "listar-veiculos.html";
    });
}
