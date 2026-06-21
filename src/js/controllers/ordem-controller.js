(function () {
    document.addEventListener("DOMContentLoaded", function () {
        if (!window.GarageOrdens) {
            return;
        }

        const dados = window.GarageOrdens;
        const id = dados.obterParametroId();
        const perfil = document.body.dataset.perfilPermitido;
        const LIMITE_FOTOS = 5;
        const LIMITE_TAMANHO_FOTO = 5 * 1024 * 1024; // 5 MB
        const TIPOS_FOTO_PERMITIDOS = [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/webp",
        ];
        let fotosSelecionadas = [];
        let servicoSendoEditadoId = null;
        const container =
            perfil === "mecanico"
                ? document.querySelector(".main-content")
                : document.querySelector(".conteudo");

        dados.inicializar();

        if (!container) {
            return;
        }

        renderizar();
        configurarEventos();

        function renderizar() {
            const ordem = dados.obterOrdem(id);

            if (!ordem) {
                window.customAlert("Ordem de Serviço não encontrada!", "error");
                mostrarOrdemNaoEncontrada();
                return;
            }

            if (perfil === "mecanico") {
                container.innerHTML = criarHtmlMecanico(ordem);
                renderizarPreviaFotos();
                return;
            }

            container.innerHTML = criarHtmlGestao(ordem);
            renderizarPreviaFotos();
        }

        function criarHtmlGestao(ordem) {
            const incluiOutrasManutencoes = perfil === "proprietario";

            return (
                criarVoltar() +
                '<div class="cartao topo-ordem">' +
                '<div class="cabecalho-ordem">' +
                "<div>" +
                "<h1>Ordem de Serviço #" +
                ordem.id +
                " " +
                criarBadgeDetalhe(ordem.status) +
                "</h1>" +
                "<p>Criada em " +
                dados.formatarDataCompleta(ordem.dataCriacao) +
                "</p>" +
                "</div>" +
                '<div class="acoes-ordem">' +
                '<a href="editar-ordem.html?id=' +
                ordem.id +
                '" class="botao-secundario" style="text-decoration: none">Editar Ordem</a>' +
                '<button type="button" class="botao-perigo" data-excluir-ordem="' +
                ordem.id +
                '">' +
                '<img src="../../assets/icons/icon-white-trash.svg" alt="" class="icone-botao" />' +
                "Excluir" +
                "</button>" +
                "</div>" +
                "</div>" +
                criarPainelStatus(ordem) +
                "</div>" +
                criarInformacoes(ordem, true) +
                criarQueixa(ordem) +
                criarServicosGestao(ordem) +
                criarFormularioServicoGestao() +
                criarHistorico(ordem) +
                (incluiOutrasManutencoes ? criarOutrasManutencoes(ordem) : "")
            );
        }

        function criarHtmlMecanico(ordem) {
            let botaoTransicao = "";
            if (ordem.status === "pendente") {
                botaoTransicao = `
                    <button type="button" class="botao" data-alterar-status="em_andamento">
                        <img src="../../assets/icons/icon-play.svg" alt="" class="icone-botao" />
                        Iniciar Serviço
                    </button>
                `;
            } else if (ordem.status === "em_andamento") {
                botaoTransicao = `
                    <button type="button" class="botao botao-concluido" data-alterar-status="concluido">
                        <img src="../../assets/icons/icon-white-check-circle.svg" alt="" class="icone-botao" />
                        Concluir Serviço
                    </button>
                `;
            }

            return (
                criarVoltar() +
                '<div class="cartao topo-ordem">' +
                '<div class="cabecalho-ordem" style="display: flex; justify-content: space-between; align-items: flex-start;">' +
                "<div>" +
                "<h1>Ordem de Serviço #" +
                ordem.id +
                " " +
                criarBadgeDetalhe(ordem.status) +
                "</h1>" +
                "<p>Criada em " +
                dados.formatarDataCompleta(ordem.dataCriacao) +
                "</p>" +
                "</div>" +
                (botaoTransicao
                    ? '<div class="acoes-ordem">' + botaoTransicao + "</div>"
                    : "") +
                "</div>" +
                "</div>" +
                criarInformacoes(ordem, false) +
                criarQueixa(ordem) +
                criarServicosMecanico(ordem) +
                (ordem.status === "em_andamento"
                    ? criarFormularioServicoMecanico()
                    : "") +
                criarHistorico(ordem)
            );
        }

        function criarVoltar() {
            return (
                '<a href="listar-ordens.html" class="voltar" style="text-decoration: none; display: flex; align-items: center; gap: 8px;">' +
                '<img src="../../assets/icons/icon-left-arrow.svg" alt="Voltar" />' +
                "Voltar ao Painel" +
                "</a>"
            );
        }

        function criarPainelStatus(ordem) {
            const status = [
                "pendente",
                "em_andamento",
                "concluido",
                "atrasado",
            ];
            const botoes = status
                .map(function (item) {
                    const info = dados.obterStatus(item);
                    const ativo = item === ordem.status;
                    const classe = ativo
                        ? "status-ativo"
                        : item === "atrasado"
                          ? "status-atrasado-botao"
                          : info.classe;

                    return (
                        '<button type="button" class="botao-status ' +
                        classe +
                        '" data-alterar-status="' +
                        item +
                        '">' +
                        '<img src="' +
                        info.icone +
                        '" alt="" class="icone-botao" />' +
                        info.texto +
                        "</button>"
                    );
                })
                .join("");

            return (
                '<div class="painel-status">' +
                "<p>Alterar status da ordem:</p>" +
                '<div class="grupo-status">' +
                botoes +
                "</div>" +
                "</div>"
            );
        }

        function criarInformacoes(ordem, mostrarLinks) {
            // Busca dados atualizados dos repositórios
            const veiculoAtual =
                window.VeiculoStorage &&
                typeof window.VeiculoStorage.Buscar === "function"
                    ? window.VeiculoStorage.Buscar(ordem.veiculo.id)
                    : null;
            const clienteAtual =
                window.ClienteStorage &&
                typeof window.ClienteStorage.obterPorId === "function"
                    ? window.ClienteStorage.obterPorId(ordem.cliente.id)
                    : null;

            const veiculoExibir = veiculoAtual || ordem.veiculo;
            const clienteExibir = clienteAtual || ordem.cliente;

            return (
                '<div class="grade-duas-colunas">' +
                '<div class="cartao">' +
                "<h2>Informações do Cliente</h2>" +
                '<div class="linha-info">' +
                '<div class="avatar">' +
                '<img src="../../assets/icons/icon-white-user.svg" alt="" class="icone-avatar" />' +
                "</div>" +
                "<div>" +
                "<p>" +
                dados.escaparHtml(clienteExibir.nome) +
                "</p>" +
                "<span>" +
                dados.escaparHtml(clienteExibir.email) +
                "</span>" +
                "<span>" +
                dados.escaparHtml(clienteExibir.telefone) +
                "</span>" +
                "</div>" +
                "</div>" +
                (mostrarLinks
                    ? '<a href="cliente.html?id=' +
                      clienteExibir.id +
                      '" class="link-simples">Ver Perfil do Cliente</a>'
                    : "") +
                "</div>" +
                '<div class="cartao">' +
                "<h2>Informações do Veículo</h2>" +
                '<div class="linha-info">' +
                '<div class="icone-caixa">' +
                '<img src="../../assets/icons/icon-car.svg" alt="" class="icone-caixa-img" />' +
                "</div>" +
                "<div>" +
                "<p>" +
                (veiculoExibir.marca
                    ? dados.escaparHtml(veiculoExibir.marca) + " "
                    : "") +
                dados.escaparHtml(
                    veiculoExibir.modelo || "Modelo não informado",
                ) +
                "</p>" +
                "<span>" +
                dados.escaparHtml(veiculoExibir.placa || "Sem placa") +
                "</span>" +
                "<span>Ano: " +
                dados.escaparHtml(veiculoExibir.ano || "N/A") +
                "</span>" +
                "</div>" +
                "</div>" +
                (mostrarLinks
                    ? '<a href="veiculo.html?id=' +
                      veiculoExibir.id +
                      '" class="link-simples">Ver Histórico do Veículo</a>'
                    : "") +
                "</div>" +
                "</div>"
            );
        }

        function criarQueixa(ordem) {
            const classeCampo =
                perfil === "mecanico" ? "campo-azul" : "campo campo-azul";

            return (
                '<div class="cartao">' +
                "<h2>" +
                '<img src="../../assets/icons/icon-message-square.svg" alt="" class="icone-titulo-img" />' +
                "Queixa do Cliente" +
                "</h2>" +
                '<p class="rotulo">Problema relatado pelo cliente — use como referência para os serviços a executar.</p>' +
                '<div class="' +
                classeCampo +
                '">' +
                dados.escaparHtml(ordem.queixa) +
                "</div>" +
                "</div>"
            );
        }

        function criarServicosGestao(ordem) {
            const servicos = ordem.servicos.length
                ? ordem.servicos.map(criarServicoGestao).join("")
                : criarServicoVazio("Nenhum serviço realizado nesta ordem.");

            return (
                '<div class="cartao">' +
                "<h2>" +
                '<img src="../../assets/icons/icon-blue-wrench.svg" alt="" class="icone-titulo-img" />' +
                "Registro Detalhado de Serviços" +
                "</h2>" +
                servicos +
                criarTotal(ordem) +
                "</div>"
            );
        }

        function criarServicoGestao(servico, indice) {
            const total =
                Number(servico.pecas || 0) + Number(servico.maoObra || 0);

            return (
                '<div class="servico-registrado" style="min-height: auto; margin-bottom: 16px;">' +
                '<div class="servico-cabecalho">' +
                "<div>" +
                '<span class="numero-servico">' +
                (indice + 1) +
                "</span>" +
                '<span class="data-servico">' +
                dados.formatarDataCompleta(servico.data) +
                "</span>" +
                "</div>" +
                '<div class="acoes-servico">' +
                '<img src="../../assets/icons/icon-edit.svg" alt="Editar serviço" class="icone-acao" data-editar-servico="' +
                servico.id +
                '" style="cursor: pointer; margin-right: 8px;" />' +
                '<img src="../../assets/icons/icon-gray-trash.svg" alt="Excluir serviço" class="icone-acao" data-excluir-servico="' +
                servico.id +
                '" style="cursor: pointer;" />' +
                "</div>" +
                "</div>" +
                '<p class="titulo-servico">' +
                dados.escaparHtml(servico.descricao) +
                "</p>" +
                '<div class="grade-valores">' +
                '<div class="valor-servico valor-pecas"><span>Peças</span><p>' +
                dados.formatarMoeda(servico.pecas) +
                "</p></div>" +
                '<div class="valor-servico valor-mao-obra"><span>Mão de Obra</span><p>' +
                dados.formatarMoeda(servico.maoObra) +
                "</p></div>" +
                '<div class="valor-servico valor-total"><span>Total</span><p>' +
                dados.formatarMoeda(total) +
                "</p></div>" +
                "</div>" +
                criarGaleriaFotos(servico) +
                "</div>"
            );
        }

        function criarServicosMecanico(ordem) {
            const podeEditar = ordem.status === "em_andamento";
            const servicos = ordem.servicos.length
                ? ordem.servicos
                      .map(function (s, i) {
                          return criarServicoMecanico(s, i, podeEditar);
                      })
                      .join("")
                : criarServicoVazio("Nenhum serviço realizado nesta ordem.");

            return (
                '<div class="cartao">' +
                "<h2>" +
                '<img src="../../assets/icons/icon-blue-wrench.svg" alt="" />' +
                "Registro Detalhado de Serviços" +
                "</h2>" +
                servicos +
                "</div>"
            );
        }

        function criarServicoMecanico(servico, indice, podeEditar) {
            const acoes = podeEditar
                ? '<div class="acoes-servico">' +
                  '<img src="../../assets/icons/icon-edit.svg" alt="Editar serviço" class="icone-acao" data-editar-servico="' +
                  servico.id +
                  '" style="cursor: pointer; margin-right: 8px;" />' +
                  '<img src="../../assets/icons/icon-gray-trash.svg" alt="Excluir serviço" class="icone-acao" data-excluir-servico="' +
                  servico.id +
                  '" style="cursor: pointer;" />' +
                  "</div>"
                : "";

            return (
                '<div class="servico-registrado" style="min-height: auto; margin-bottom: 16px;">' +
                '<div class="servico-cabecalho">' +
                "<div>" +
                '<span class="numero-servico">' +
                (indice + 1) +
                "</span>" +
                '<span class="data-servico">' +
                dados.formatarDataCompleta(servico.data) +
                "</span>" +
                "</div>" +
                acoes +
                "</div>" +
                '<p class="titulo-servico">' +
                dados.escaparHtml(servico.descricao) +
                "</p>" +
                criarGaleriaFotos(servico) +
                "</div>"
            );
        }

        function criarGaleriaFotos(servico) {
            const fotos = Array.isArray(servico.fotos) ? servico.fotos : [];
            const quantidade = fotos.length;
            const textoQuantidade =
                quantidade === 1 ? "1 foto" : quantidade + " fotos";
            const galeria = quantidade
                ? '<div class="grade-fotos-servico">' +
                  fotos
                      .map(function (foto) {
                          return (
                              '<div class="foto-servico">' +
                              '<img src="' +
                              dados.escaparHtml(foto.dados) +
                              '" alt="Foto do serviço: ' +
                              dados.escaparHtml(foto.nome) +
                              '" loading="lazy" />' +
                              "</div>"
                          );
                      })
                      .join("") +
                  "</div>"
                : "";

            return (
                '<p class="foto-texto">' +
                '<img src="../../assets/icons/icon-gallery.svg" alt="" />' +
                textoQuantidade +
                "</p>" +
                galeria
            );
        }

        function criarServicoVazio(texto) {
            return (
                '<div class="servico-registrado" style="min-height: auto;">' +
                '<p class="rotulo">' +
                texto +
                "</p>" +
                "</div>"
            );
        }

        function criarTotal(ordem) {
            const total = dados.obterTotal(ordem);
            const quantidade = ordem.servicos.length;

            return (
                '<div class="total-ordem">' +
                "<div>" +
                "<p>Total da Ordem de Serviço</p>" +
                "<span>" +
                quantidade +
                " serviço(s) realizado(s)</span>" +
                "</div>" +
                "<strong>" +
                dados.formatarMoeda(total) +
                "</strong>" +
                "</div>"
            );
        }

        function formatarDecimalInicial(valor) {
            if (valor === undefined || valor === null || valor === "")
                return "";
            let num = Number(valor);
            if (isNaN(num)) return "";
            let partes = num.toFixed(2).split(".");
            partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return partes.join(",");
        }

        function criarFormularioServicoGestao() {
            const titulo = servicoSendoEditadoId
                ? "Editar Serviço Realizado"
                : "Adicionar Serviço Realizado";
            const textoBotao = servicoSendoEditadoId
                ? "Salvar Alterações"
                : "Adicionar Serviço";
            const iconeBotao = servicoSendoEditadoId
                ? "../../assets/icons/icon-save.svg"
                : "../../assets/icons/icon-white-plus.svg";
            const classeBotao = servicoSendoEditadoId ? "botao" : "botao";

            const ordem = dados.obterOrdem(id);
            const servico = servicoSendoEditadoId
                ? ordem.servicos.find(
                      (s) => s.id === Number(servicoSendoEditadoId),
                  )
                : null;

            const descricao = servico ? servico.descricao : "";
            const pecas = servico ? formatarDecimalInicial(servico.pecas) : "";
            const maoObra = servico
                ? formatarDecimalInicial(servico.maoObra)
                : "";

            return (
                '<div class="cartao cartao-formulario" id="formulario-servico">' +
                "<h2>" +
                '<img src="../../assets/icons/icon-blue-plus.svg" alt="" class="icone-titulo-img" />' +
                titulo +
                "</h2>" +
                '<p class="rotulo">Descrição do Serviço Realizado *</p>' +
                '<textarea class="textarea" data-descricao-servico placeholder="Ex: Troca de óleo do motor e filtro de óleo — descreva o que foi executado">' +
                dados.escaparHtml(descricao) +
                "</textarea>" +
                '<div class="grade-campos">' +
                "<div>" +
                '<p class="rotulo"><img src="../../assets/icons/icon-gray-dollar-sign.svg" alt="" class="icone-inline" />Custo de Peças (R$)</p>' +
                '<input class="input" type="text" value="' +
                pecas +
                '" placeholder="0,00" data-valor-pecas />' +
                "</div>" +
                "<div>" +
                '<p class="rotulo"><img src="../../assets/icons/icon-gray-dollar-sign.svg" alt="" class="icone-inline" />Mão de Obra (R$)</p>' +
                '<input class="input" type="text" value="' +
                maoObra +
                '" placeholder="0,00" data-valor-mao-obra />' +
                "</div>" +
                "</div>" +
                criarUploadVisual() +
                '<div style="display: flex; gap: 12px; margin-top: 16px;">' +
                '<button type="button" class="' +
                classeBotao +
                '" data-adicionar-servico style="flex: 1;">' +
                '<img src="' +
                iconeBotao +
                '" alt="" class="icone-botao" />' +
                textoBotao +
                "</button>" +
                (servicoSendoEditadoId
                    ? '<button type="button" class="botao-secundario" data-cancelar-edicao style="flex: 1;">Cancelar</button>'
                    : "") +
                "</div>" +
                "</div>"
            );
        }

        function criarFormularioServicoMecanico() {
            const titulo = servicoSendoEditadoId
                ? "Editar Serviço Realizado"
                : "Adicionar Serviço Realizado";
            const textoBotao = servicoSendoEditadoId
                ? "Salvar Alterações"
                : "Adicionar Serviço";
            const iconeBotao = servicoSendoEditadoId
                ? "../../assets/icons/icon-save.svg"
                : "../../assets/icons/icon-white-plus.svg";

            const ordem = dados.obterOrdem(id);
            const servico = servicoSendoEditadoId
                ? ordem.servicos.find(
                      (s) => s.id === Number(servicoSendoEditadoId),
                  )
                : null;
            const descricao = servico ? servico.descricao : "";

            return (
                '<div class="cartao cartao-formulario" id="formulario-servico">' +
                "<h2>" +
                '<img src="../../assets/icons/icon-blue-plus.svg" alt="" />' +
                titulo +
                "</h2>" +
                '<label class="rotulo-form">Descrição do Serviço Realizado *</label>' +
                '<textarea class="textarea" data-descricao-servico placeholder="Ex: Troca de óleo do motor e filtro de óleo — descreva o que foi executado">' +
                dados.escaparHtml(descricao) +
                "</textarea>" +
                '<div class="aviso">' +
                '<img src="../../assets/icons/icon-blue-dollar-sign.svg" alt="" />' +
                "Os valores de peças e mão de obra serão definidos pelo Administrativo ou Proprietário." +
                "</div>" +
                criarUploadVisual() +
                '<div style="display: flex; gap: 12px; margin-top: 16px;">' +
                '<button type="button" class="botao" data-adicionar-servico style="flex: 1;">' +
                '<img src="' +
                iconeBotao +
                '" alt="" class="icone-botao" />' +
                textoBotao +
                "</button>" +
                (servicoSendoEditadoId
                    ? '<button type="button" class="botao-secundario" data-cancelar-edicao style="flex: 1;">Cancelar</button>'
                    : "") +
                "</div>" +
                "</div>"
            );
        }

        function criarUploadVisual() {
            return (
                '<p class="rotulo">' +
                '<img src="../../assets/icons/icon-camera.svg" alt="" class="icone-inline" />' +
                "Fotos do Serviço (Opcional — máx. 5)" +
                "</p>" +
                '<input class="input-fotos-servico" type="file" accept="image/png,image/jpeg,image/webp" multiple data-input-fotos />' +
                '<div class="area-upload" data-area-upload role="button" tabindex="0" aria-label="Escolher fotos do serviço">' +
                '<div class="icone-upload">' +
                '<img src="../../assets/icons/icon-upload.svg" alt="" />' +
                "</div>" +
                "<p>Toque para escolher fotos</p>" +
                "<span data-contador-fotos>PNG, JPG, WEBP — até 5 fotos restantes</span>" +
                "</div>" +
                '<div class="grade-previas-fotos" data-previas-fotos></div>'
            );
        }

        function renderizarPreviaFotos() {
            const containerPrevias = document.querySelector(
                "[data-previas-fotos]",
            );
            const contador = document.querySelector("[data-contador-fotos]");
            const areaUpload = document.querySelector("[data-area-upload]");

            if (!containerPrevias || !contador || !areaUpload) {
                return;
            }

            const restantes = LIMITE_FOTOS - fotosSelecionadas.length;
            contador.textContent =
                "PNG, JPG, WEBP — até " +
                restantes +
                (restantes === 1 ? " foto restante" : " fotos restantes");
            areaUpload.classList.toggle(
                "area-upload-com-fotos",
                fotosSelecionadas.length > 0,
            );

            containerPrevias.innerHTML = fotosSelecionadas
                .map(function (foto) {
                    return (
                        '<div class="previa-foto">' +
                        '<img src="' +
                        dados.escaparHtml(foto.dados) +
                        '" alt="Prévia de ' +
                        dados.escaparHtml(foto.nome) +
                        '" />' +
                        '<button type="button" class="botao-remover-foto" data-remover-foto="' +
                        dados.escaparHtml(foto.id) +
                        '" title="Remover foto" aria-label="Remover foto ' +
                        dados.escaparHtml(foto.nome) +
                        '">' +
                        '<img src="../../assets/icons/icon-white-trash.svg" alt="" />' +
                        "</button>" +
                        "</div>"
                    );
                })
                .join("");
        }

        function criarHistorico(ordem) {
            const itens = ordem.historico
                .slice()
                .sort(function (itemA, itemB) {
                    return new Date(itemB.data) - new Date(itemA.data);
                })
                .map(function (item) {
                    return (
                        '<div class="bloco-status">' +
                        '<img src="../../assets/icons/icon-calendar.svg" alt="" class="icone-status-img" />' +
                        "<div>" +
                        "<p>" +
                        dados.escaparHtml(item.descricao) +
                        "</p>" +
                        "<span>" +
                        dados.formatarDataCompleta(item.data) +
                        "</span>" +
                        "</div>" +
                        "</div>"
                    );
                })
                .join("");

            return (
                '<div class="cartao">' +
                "<h2>Histórico de Status</h2>" +
                itens +
                "</div>"
            );
        }

        function criarOutrasManutencoes(ordem) {
            const veiculoAtual =
                window.VeiculoStorage &&
                typeof window.VeiculoStorage.Buscar === "function"
                    ? window.VeiculoStorage.Buscar(ordem.veiculo.id)
                    : null;
            const placaAtual = veiculoAtual
                ? veiculoAtual.placa
                : ordem.veiculo.placa;

            const outras = dados
                .listarOrdens()
                .filter(function (item) {
                    const itemVeiculo =
                        window.VeiculoStorage &&
                        typeof window.VeiculoStorage.Buscar === "function"
                            ? window.VeiculoStorage.Buscar(item.veiculo.id)
                            : null;
                    const itemPlaca = itemVeiculo
                        ? itemVeiculo.placa
                        : item.veiculo.placa;

                    return (
                        String(item.id) !== String(ordem.id) &&
                        String(itemPlaca).trim().toLowerCase() ===
                            String(placaAtual).trim().toLowerCase()
                    );
                })
                .slice(0, 3);

            const conteudo = outras.length
                ? outras.map(criarItemOutraManutencao).join("")
                : '<p class="rotulo" style="padding: 12px 0; color: #6b7280; font-style: italic;">Não teve outras manutenções.</p>';

            return (
                '<div class="cartao">' +
                "<h2>" +
                '<img src="../../assets/icons/icon-history.svg" alt="" class="icone-titulo-img" />' +
                "Outras Manutenções deste Veículo" +
                "</h2>" +
                conteudo +
                "</div>"
            );
        }

        function criarItemOutraManutencao(itemOrdem) {
            const status = dados.obterStatus(itemOrdem.status);

            return (
                '<a href="ordem.html?id=' +
                itemOrdem.id +
                '" class="manutencao-anterior" style="text-decoration: none; color: inherit; display: flex; cursor: pointer; padding: 12px; border-radius: 8px; transition: background 0.2s;">' +
                '<div class="icone-manutencao">' +
                '<img src="../../assets/icons/icon-gray-clock.svg" alt="" />' +
                "</div>" +
                '<div class="conteudo-manutencao" style="flex: 1;">' +
                '<div class="cabecalho-manutencao">' +
                "<div>" +
                '<p class="data-manutencao">' +
                '<img src="../../assets/icons/icon-calendar.svg" alt="" class="icone-inline" />' +
                dados.formatarDataCompleta(itemOrdem.dataCriacao) +
                "</p>" +
                '<p class="titulo-manutencao">' +
                dados.escaparHtml(itemOrdem.queixa) +
                "</p>" +
                "</div>" +
                '<span class="status-manutencao">' +
                '<img src="' +
                status.icone +
                '" alt="" class="icone-badge" />' +
                status.texto +
                "</span>" +
                "</div>" +
                '<p class="tempo-manutencao">' +
                '<img src="../../assets/icons/icon-orange-clock.svg" alt="" class="icone-inline" />' +
                "OS #" +
                itemOrdem.id +
                "</p>" +
                "</div>" +
                "</a>"
            );
        }

        function criarBadgeDetalhe(statusValor) {
            const status = dados.obterStatus(statusValor);

            return (
                '<span class="' +
                status.classeDetalhe +
                '">' +
                '<img src="' +
                status.icone +
                '" alt="" class="icone-badge" />' +
                status.texto +
                "</span>"
            );
        }

        function configurarEventos() {
            document.addEventListener("click", function (evento) {
                if (!evento.target.closest) {
                    return;
                }

                const botaoExcluirOrdem = evento.target.closest(
                    "[data-excluir-ordem]",
                );
                const botaoStatus = evento.target.closest(
                    "[data-alterar-status]",
                );
                const botaoServico = evento.target.closest(
                    "[data-adicionar-servico]",
                );
                const botaoExcluirServico = evento.target.closest(
                    "[data-excluir-servico]",
                );
                const botaoEditarServico = evento.target.closest(
                    "[data-editar-servico]",
                );
                const botaoCancelarEdicao = evento.target.closest(
                    "[data-cancelar-edicao]",
                );
                const botaoRemoverFoto = evento.target.closest(
                    "[data-remover-foto]",
                );
                const areaUpload = evento.target.closest("[data-area-upload]");

                if (botaoRemoverFoto) {
                    removerFotoSelecionada(
                        botaoRemoverFoto.dataset.removerFoto,
                    );
                    window.customAlert("Foto removida!", "success");
                    return;
                }

                if (areaUpload) {
                    abrirSeletorFotos();
                    return;
                }

                if (botaoExcluirOrdem) {
                    excluirOrdem(botaoExcluirOrdem.dataset.excluirOrdem);
                    return;
                }

                if (botaoStatus) {
                    dados.alterarStatus(id, botaoStatus.dataset.alterarStatus);
                    renderizar();
                    window.customAlert(
                        "Status da ordem atualizado!",
                        "success",
                    );
                    return;
                }

                if (botaoEditarServico) {
                    iniciarEdicaoServico(
                        botaoEditarServico.dataset.editarServico,
                    );
                    return;
                }

                if (botaoCancelarEdicao) {
                    cancelarEdicaoServico();
                    return;
                }

                if (botaoServico) {
                    if (servicoSendoEditadoId) {
                        salvarEdicaoServico();
                    } else {
                        adicionarServico();
                    }
                    return;
                }

                if (botaoExcluirServico) {
                    excluirServico(botaoExcluirServico.dataset.excluirServico);
                }
            });

            document.addEventListener("change", function (evento) {
                if (evento.target.matches("[data-input-fotos]")) {
                    selecionarFotos(evento.target.files, evento.target);
                }
            });

            document.addEventListener("keydown", function (evento) {
                if (
                    evento.target.matches("[data-area-upload]") &&
                    (evento.key === "Enter" || evento.key === " ")
                ) {
                    evento.preventDefault();
                    abrirSeletorFotos();
                }
            });

            document.addEventListener("input", function (evento) {
                if (
                    evento.target.matches("[data-valor-pecas]") ||
                    evento.target.matches("[data-valor-mao-obra]")
                ) {
                    let valor = evento.target.value.replace(/\D/g, "");
                    if (valor === "") {
                        evento.target.value = "";
                        return;
                    }
                    let numero = (Number(valor) / 100).toFixed(2);
                    let partes = numero.split(".");
                    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    evento.target.value = partes.join(",");
                }
            });
        }

        function abrirSeletorFotos() {
            if (fotosSelecionadas.length >= LIMITE_FOTOS) {
                window.customAlert(
                    "O limite de 5 fotos já foi atingido.",
                    "warning",
                );
                return;
            }

            const inputFotos = document.querySelector("[data-input-fotos]");

            if (inputFotos) {
                inputFotos.click();
            }
        }

        function selecionarFotos(listaArquivos, inputFotos) {
            const arquivos = Array.from(listaArquivos || []);
            const vagasDisponiveis = LIMITE_FOTOS - fotosSelecionadas.length;
            const arquivosValidos = [];
            const mensagens = [];

            arquivos.forEach(function (arquivo) {
                if (!TIPOS_FOTO_PERMITIDOS.includes(arquivo.type)) {
                    mensagens.push(arquivo.name + ": formato não permitido.");
                    return;
                }

                if (arquivo.size > LIMITE_TAMANHO_FOTO) {
                    mensagens.push(arquivo.name + ": tamanho acima de 5 MB.");
                    return;
                }

                if (arquivosValidos.length >= vagasDisponiveis) {
                    mensagens.push(
                        arquivo.name + ": limite máximo de 5 fotos.",
                    );
                    return;
                }

                arquivosValidos.push(arquivo);
            });

            if (mensagens.length > 0) {
                window.customAlert(
                    "Alguns arquivos não foram adicionados:\n\n- " +
                        mensagens.join("\n- "),
                    "warning",
                );
            }

            if (arquivosValidos.length === 0) {
                inputFotos.value = "";
                return;
            }

            let arquivosLidos = 0;

            arquivosValidos.forEach(function (arquivo, indice) {
                const leitor = new FileReader();

                leitor.onload = function () {
                    fotosSelecionadas.push({
                        id:
                            "foto-" +
                            Date.now() +
                            "-" +
                            indice +
                            "-" +
                            Math.floor(Math.random() * 1000),
                        nome: arquivo.name,
                        tipo: arquivo.type,
                        dados: leitor.result,
                    });
                    arquivosLidos += 1;

                    if (arquivosLidos === arquivosValidos.length) {
                        inputFotos.value = "";
                        renderizarPreviaFotos();
                    }
                };

                leitor.onerror = function () {
                    arquivosLidos += 1;
                    window.customAlert(
                        "Não foi possível ler a foto " + arquivo.name + ".",
                        "danger",
                    );

                    if (arquivosLidos === arquivosValidos.length) {
                        inputFotos.value = "";
                        renderizarPreviaFotos();
                    }
                };

                leitor.readAsDataURL(arquivo);
            });
        }

        function removerFotoSelecionada(fotoId) {
            fotosSelecionadas = fotosSelecionadas.filter(function (foto) {
                return foto.id !== fotoId;
            });
            renderizarPreviaFotos();
        }

        function excluirOrdem(ordemId) {
            window.customConfirm(
                "Deseja excluir a ordem de serviço #" + ordemId + "?",
                function () {
                    dados.excluirOrdem(ordemId);
                    sessionStorage.setItem(
                        "pendingToast",
                        JSON.stringify({
                            mensagem: "Ordem de serviço excluída com sucesso!",
                            tipo: "success",
                        }),
                    );
                    window.location.href = "listar-ordens.html";
                },
            );
        }

        function adicionarServico() {
            const descricao = document.querySelector(
                "[data-descricao-servico]",
            );
            const campoPecas = document.querySelector("[data-valor-pecas]");
            const campoMaoObra = document.querySelector(
                "[data-valor-mao-obra]",
            );

            if (!descricao || !descricao.value.trim()) {
                window.customAlert(
                    "Preencha a descrição do serviço realizado.",
                    "warning",
                );
                if (descricao) {
                    descricao.focus();
                }
                return;
            }

            try {
                const ordemAtualizada = dados.adicionarServico(id, {
                    descricao: descricao.value.trim(),
                    pecas: campoPecas
                        ? dados.converterValor(campoPecas.value)
                        : 0,
                    maoObra: campoMaoObra
                        ? dados.converterValor(campoMaoObra.value)
                        : 0,
                    fotos: fotosSelecionadas,
                });

                if (!ordemAtualizada) {
                    window.customAlert(
                        "Não foi possível adicionar o serviço realizado.",
                        "danger",
                    );
                    return;
                }
            } catch (erro) {
                if (
                    erro.name === "QuotaExceededError" ||
                    erro.name === "NS_ERROR_DOM_QUOTA_REACHED"
                ) {
                    window.customAlert(
                        "Não há espaço suficiente no navegador para salvar essas fotos. Remova fotos ou serviços antigos e tente novamente.",
                        "danger",
                    );
                    return;
                }

                window.customAlert(
                    "Não foi possível salvar o serviço realizado.",
                    "danger",
                );
                return;
            }

            window.customAlert("Serviço adicionado com sucesso!", "success");
            fotosSelecionadas = [];
            renderizar();
        }

        function excluirServico(servicoId) {
            window.customConfirm(
                "Deseja excluir este serviço realizado?",
                function () {
                    dados.excluirServico(id, servicoId);
                    renderizar();
                    window.customAlert(
                        "Serviço excluído com sucesso!",
                        "success",
                    );
                },
            );
        }

        function iniciarEdicaoServico(servicoId) {
            const ordem = dados.obterOrdem(id);
            const servico = ordem.servicos.find(
                (s) => s.id === Number(servicoId),
            );

            if (!servico) return;

            servicoSendoEditadoId = servicoId;
            fotosSelecionadas = servico.fotos
                ? JSON.parse(JSON.stringify(servico.fotos))
                : [];

            renderizar();

            const formulario = document.getElementById("formulario-servico");
            if (formulario) {
                formulario.scrollIntoView({ behavior: "smooth" });
            }
        }

        function cancelarEdicaoServico() {
            servicoSendoEditadoId = null;
            fotosSelecionadas = [];
            renderizar();
        }

        function salvarEdicaoServico() {
            const descricao = document.querySelector(
                "[data-descricao-servico]",
            );
            const campoPecas = document.querySelector("[data-valor-pecas]");
            const campoMaoObra = document.querySelector(
                "[data-valor-mao-obra]",
            );

            if (!descricao || !descricao.value.trim()) {
                window.customAlert(
                    "Preencha a descrição do serviço realizado.",
                    "warning",
                );
                if (descricao) {
                    descricao.focus();
                }
                return;
            }

            try {
                const ordemAtualizada = dados.editarServico(
                    id,
                    servicoSendoEditadoId,
                    {
                        descricao: descricao.value.trim(),
                        pecas: campoPecas
                            ? dados.converterValor(campoPecas.value)
                            : 0,
                        maoObra: campoMaoObra
                            ? dados.converterValor(campoMaoObra.value)
                            : 0,
                        fotos: fotosSelecionadas,
                    },
                );

                if (!ordemAtualizada) {
                    window.customAlert(
                        "Não foi possível salvar as alterações do serviço.",
                        "danger",
                    );
                    return;
                }
            } catch (erro) {
                if (
                    erro.name === "QuotaExceededError" ||
                    erro.name === "NS_ERROR_DOM_QUOTA_REACHED"
                ) {
                    window.customAlert(
                        "Não há espaço suficiente no navegador para salvar essas fotos.",
                        "danger",
                    );
                    return;
                }
                window.customAlert(
                    "Não foi possível salvar o serviço.",
                    "danger",
                );
                return;
            }

            window.customAlert("Serviço atualizado com sucesso!", "success");
            servicoSendoEditadoId = null;
            fotosSelecionadas = [];
            renderizar();
        }

        function mostrarOrdemNaoEncontrada() {
            container.innerHTML =
                criarVoltar() +
                '<div class="cartao">' +
                "<h1>Ordem de Serviço não encontrada</h1>" +
                '<p class="rotulo">Não foi possível localizar a ordem informada.</p>' +
                "</div>";
        }
    });
})();
