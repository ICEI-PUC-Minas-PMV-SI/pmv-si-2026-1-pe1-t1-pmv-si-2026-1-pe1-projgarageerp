const VeiculoStorage = {
    Salvar(veiculo) {
        const veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];

        veiculo.id = Date.now().toString();

        veiculos.push(veiculo);

        localStorage.setItem("veiculos", JSON.stringify(veiculos));
    },

    Listar() {
        return JSON.parse(localStorage.getItem("veiculos")) || [];
    },

    Buscar(id) {
        const veiculos = this.Listar();

        return veiculos.find(
            (veiculo) => String(veiculo.id) === String(id)
        );
    },

    Atualizar(veiculoAtualizado) {
        const veiculos = this.Listar();

        const indice = veiculos.findIndex(
            (veiculo) =>
                String(veiculo.id) === String(veiculoAtualizado.id)
        );

        if (indice !== -1) {
            veiculos[indice] = veiculoAtualizado;

            localStorage.setItem("veiculos", JSON.stringify(veiculos));
        }
    },

    Excluir(id) {
        const veiculos = this.Listar();

        const filtrados = veiculos.filter(
            (veiculo) => String(veiculo.id) !== String(id)
        );

        localStorage.setItem("veiculos", JSON.stringify(filtrados));
    },
};

window.VeiculoStorage = VeiculoStorage;