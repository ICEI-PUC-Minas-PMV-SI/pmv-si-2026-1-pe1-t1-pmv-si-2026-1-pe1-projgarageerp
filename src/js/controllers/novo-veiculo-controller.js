const formulario = document.getElementById("form-veiculo");
const selectCliente = document.getElementById("cliente");

// Carrega clientes no select
function carregarClientes() {
    selectCliente.innerHTML =
        '<option value="">Selecione...</option>';

    ClienteStorage.listar().forEach((cliente) => {
        const option = document.createElement("option");
        option.value = cliente.id;
        option.textContent = cliente.nome;
        selectCliente.appendChild(option);
    });
}

carregarClientes();

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const clienteId = document.getElementById("cliente").value;
    const marca = document.getElementById("marca").value.trim();
    const modelo = document.getElementById("modelo").value.trim();
    const placa = document.getElementById("placa").value.trim();
    const ano = document.getElementById("ano").value.trim();

    if (!clienteId || !marca || !modelo || !placa || !ano) {
        window.customAlert("Preencha todos os campos!", "warning");
        return;
    }

    VeiculoStorage.Salvar({
        clienteId,
        marca,
        modelo,
        placa,
        ano,
    });

    window.customAlert("Veículo cadastrado com sucesso!", "success");

    setTimeout(() => {
        window.location.href = "listar-veiculos.html";
    }, 500);
});