console.log(VeiculoStorage.Listar());

const lista = document.getElementById("lista-veiculos");
const pesquisa = document.getElementById("pesquisa");

const veiculos = VeiculoStorage.Listar();

function AdicionarEventosExcluir() {
    const botoesExcluir = document.querySelectorAll(".btn-excluir");

    botoesExcluir.forEach((botao) => {
        botao.addEventListener("click", function () {
            const id = Number(this.dataset.id);

            window.customConfirm(
                "Você realmente deseja excluir?",
                function () {
                    VeiculoStorage.Excluir(id);
                    location.reload();
                }
            );
        });
    });
}

function RenderizarVeiculos(listaVeiculos) {
    if (!lista) return;

    lista.innerHTML = "";

    if (listaVeiculos.length === 0) {
        lista.innerHTML = `
            <p>Nenhum veículo encontrado.</p>
        `;
        return;
    }

    listaVeiculos.forEach((veiculo) => {
        const cliente = ClienteStorage.obterPorId(veiculo.clienteId);
        const nomeProprietario = cliente
            ? cliente.nome
            : "Proprietário não encontrado";

        lista.innerHTML += `
            <div class="card">
                <div class="card-topo">
                    <div class="icone-carro">
                        <img
                            src="../../assets/icons/icon-car.svg"
                            alt="Carro"
                        />
                    </div>

                    <div class="card-acoes">
                        <a href="editar-veiculo.html?id=${veiculo.id}">
                            <img
                                src="../../assets/icons/icon-edit.svg"
                                alt="Editar"
                            />
                        </a>

                        <button class="btn-excluir" data-id="${veiculo.id}">

                            <img
                                src="../../assets/icons/icon-gray-trash.svg"
                                alt="Excluir"
                            />
                        </button>
                    </div>
                </div>

                <div class="card-veiculo">
                    <h2 class="veiculo">
                        ${veiculo.modelo}
                    </h2>

                    <p class="placa">
                        ${veiculo.placa} • ${veiculo.ano}
                    </p>
                </div>

                <div class="proprietario">
                    <p class="proprietario-titulo">
                        Proprietário
                    </p>

                    <p class="proprietario-nome">
                        ${nomeProprietario}
                    </p>
                </div>

                <a href="veiculo.html?id=${veiculo.id}" class="historico">
                    Ver Histórico
                </a>
            </div>
        `;
    });

    AdicionarEventosExcluir();
}

RenderizarVeiculos(veiculos);

if (pesquisa) {
    pesquisa.addEventListener("input", function () {
        const texto = this.value.toLowerCase();

        const filtrados = veiculos.filter((veiculo) => {
            const cliente = ClienteStorage.obterPorId(veiculo.clienteId);
            const nomeCliente = cliente ? cliente.nome.toLowerCase() : "";

            return (
                (veiculo.modelo || "").toLowerCase().includes(texto) ||
                (veiculo.placa || "").toLowerCase().includes(texto) ||
                nomeCliente.includes(texto)
            );
        });

        RenderizarVeiculos(filtrados);
    });
}