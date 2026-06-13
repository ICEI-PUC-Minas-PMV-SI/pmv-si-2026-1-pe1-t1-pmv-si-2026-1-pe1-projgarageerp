const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const veiculo = VeiculoStorage.Buscar(id);

const selectCliente = document.getElementById("cliente");
const clientes = ClienteStorage.listar();

clientes.forEach(cliente => {
    const option = document.createElement("option");
    option.value = cliente.id;
    option.textContent = cliente.nome;
    selectCliente.appendChild(option);
});

if (veiculo) {
    selectCliente.value = veiculo.clienteId || "";

    document.getElementById("marca").value = veiculo.marca || "";
    document.getElementById("modelo").value = veiculo.modelo || "";
    document.getElementById("placa").value = veiculo.placa || "";
    document.getElementById("ano").value = veiculo.ano || "";
}

const formulario = document.getElementById("form-veiculo");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const veiculoAtualizado = {
        id: veiculo.id,
        clienteId: document.getElementById("cliente").value,
        marca: document.getElementById("marca").value,
        modelo: document.getElementById("modelo").value,
        placa: document.getElementById("placa").value,
        ano: document.getElementById("ano").value
    };

    VeiculoStorage.Atualizar(veiculoAtualizado);

    window.customAlert("Veículo atualizado!", "success");

    window.location.href = "listar-veiculos.html";
});