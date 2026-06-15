(function () {
    const CHAVE_DADOS = "garageerp_ordens_dados";
    const FOTO_DEMO_PNEU = {
        id: "foto-demo-pneu",
        nome: "pneu-ordem-de-servico.png",
        tipo: "image/png",
        dados: "../../assets/img/pneu-ordem-de-servico.png",
    };

    const STATUS = {
        pendente: {
            texto: "Pendente",
            classe: "status-pendente",
            classeDetalhe: "status-pendente-detalhe",
            icone: "../../assets/icons/icon-blue-file.svg",
        },
        em_andamento: {
            texto: "Em Andamento",
            classe: "status-andamento",
            classeDetalhe: "status-andamento-detalhe",
            icone: "../../assets/icons/icon-orange-clock.svg",
        },
        concluido: {
            texto: "Concluído",
            classe: "status-concluido",
            classeDetalhe: "status-concluido-detalhe",
            icone: "../../assets/icons/icon-green-check-circle.svg",
        },
        atrasado: {
            texto: "Atrasado",
            classe: "status-atrasado",
            classeDetalhe: "status-atrasado",
            icone: "../../assets/icons/icon-red-warning-circle.svg",
        },
    };

    const mecanicos = [{ id: "joao_lopes", nome: "João Lopes" }];

    function criarDadosIniciais() {
        const clientes = [
            {
                id: 1,
                nome: "João Batista",
                email: "joao@email.com",
                telefone: "(11) 98765-4321",
            },
            {
                id: 2,
                nome: "Maria Soares",
                email: "maria@email.com",
                telefone: "(11) 97654-3210",
            },
            {
                id: 3,
                nome: "Pedro Oliveira",
                email: "pedro@email.com",
                telefone: "(11) 96543-2109",
            },
            {
                id: 4,
                nome: "Caio Rocha",
                email: "caio@email.com",
                telefone: "(83) 28193-1513",
            },
            {
                id: 5,
                nome: "Erick Barbosa",
                email: "erick@email.com",
                telefone: "(32) 92813-1513",
            },
            {
                id: 6,
                nome: "Ana Costa",
                email: "ana.costa@email.com",
                telefone: "(11) 95432-1098",
            },
            {
                id: 7,
                nome: "Lucas Mendes",
                email: "lucas.m@email.com",
                telefone: "(21) 94321-0987",
            },
            {
                id: 8,
                nome: "Julia Rezende",
                email: "julia.r@email.com",
                telefone: "(31) 93210-9876",
            },
            {
                id: 9,
                nome: "Ricardo Alves",
                email: "ricardo.a@email.com",
                telefone: "(41) 92109-8765",
            },
            {
                id: 10,
                nome: "Beatriz Lima",
                email: "bia.lima@email.com",
                telefone: "(71) 91098-7654",
            },
        ];

        const veiculos = [
            {
                id: 1,
                clienteId: 1,
                marca: "Porsche",
                modelo: "911",
                placa: "ABC-1234",
                ano: 2020,
            },
            {
                id: 2,
                clienteId: 1,
                marca: "BMW",
                modelo: "X1",
                placa: "JKL-3456",
                ano: 2022,
            },
            {
                id: 3,
                clienteId: 2,
                marca: "Fiat",
                modelo: "Uno",
                placa: "DEF-5678",
                ano: 2019,
            },
            {
                id: 4,
                clienteId: 2,
                marca: "Fiat",
                modelo: "Mobi",
                placa: "MNO-4321",
                ano: 2021,
            },
            {
                id: 5,
                clienteId: 3,
                marca: "Chevrolet",
                modelo: "Onix",
                placa: "GHI-9012",
                ano: 2021,
            },
            {
                id: 6,
                clienteId: 3,
                marca: "Chevrolet",
                modelo: "Tracker",
                placa: "PQR-8765",
                ano: 2023,
            },
            {
                id: 7,
                clienteId: 4,
                marca: "Toyota",
                modelo: "Corolla",
                placa: "XYZ-1122",
                ano: 2020,
            },
            {
                id: 8,
                clienteId: 4,
                marca: "Toyota",
                modelo: "Hilux",
                placa: "HUX-3344",
                ano: 2018,
            },
            {
                id: 9,
                clienteId: 4,
                marca: "Toyota",
                modelo: "Etios",
                placa: "ETS-5566",
                ano: 2017,
            },
            {
                id: 10,
                clienteId: 5,
                marca: "BMW",
                modelo: "320I",
                placa: "XYZ-9876",
                ano: 2015,
            },
            {
                id: 11,
                clienteId: 6,
                marca: "Hyundai",
                modelo: "HB20",
                placa: "HBZ-2020",
                ano: 2019,
            },
            {
                id: 12,
                clienteId: 7,
                marca: "Ford",
                modelo: "Ka",
                placa: "FOR-4433",
                ano: 2018,
            },
            {
                id: 13,
                clienteId: 8,
                marca: "Jeep",
                modelo: "Renegade",
                placa: "JEE-9988",
                ano: 2021,
            },
            {
                id: 14,
                clienteId: 9,
                marca: "Nissan",
                modelo: "Kicks",
                placa: "NIS-7766",
                ano: 2022,
            },
            {
                id: 15,
                clienteId: 10,
                marca: "Renault",
                modelo: "Sandero",
                placa: "REN-1155",
                ano: 2016,
            },
        ];

        return {
            clientes: clientes,
            veiculos: veiculos,
            ordens: [
                criarOrdemInicial({
                    id: 1,
                    cliente: clientes[0],
                    veiculo: veiculos[0],
                    mecanico: "João Lopes",
                    queixa: "Troca de óleo e filtros",
                    status: "concluido",
                    dataCriacao: "2026-06-14T07:00:00",
                    dataAtualizacao: "2026-06-14T08:30:00",
                    servicos: [
                        {
                            id: 1,
                            descricao: "Troca de óleo do motor e filtro",
                            pecas: 120,
                            maoObra: 80,
                            data: "2026-06-14T08:30:00",
                            fotos: [],
                        },
                    ],
                }),
                criarOrdemInicial({
                    id: 2,
                    cliente: clientes[0],
                    veiculo: veiculos[1],
                    mecanico: "João Lopes",
                    queixa: "Troca de pneus",
                    status: "atrasado",
                    dataCriacao: "2026-06-14T07:00:00",
                    dataAtualizacao: "2026-06-14T10:00:00",
                    servicos: [
                        {
                            id: 2,
                            descricao: "Troca dos pneus dianteiros",
                            pecas: 1148,
                            maoObra: 130,
                            data: "2026-06-14T09:50:00",
                            fotos: [
                                typeof FOTO_DEMO_PNEU !== "undefined"
                                    ? FOTO_DEMO_PNEU
                                    : "",
                            ],
                        },
                    ],
                }),
                criarOrdemInicial({
                    id: 3,
                    cliente: clientes[0],
                    veiculo: veiculos[0],
                    mecanico: "Carlos Souza",
                    queixa: "Barulho na suspensão dianteira",
                    status: "pendente",
                    dataCriacao: "2026-06-14T07:00:00",
                    dataAtualizacao: "2026-06-14T07:00:00",
                    servicos: [],
                }),
                criarOrdemInicial({
                    id: 4,
                    cliente: clientes[1],
                    veiculo: veiculos[2],
                    mecanico: "João Lopes",
                    queixa: "Alinhamento e balanceamento",
                    status: "em_andamento",
                    dataCriacao: "2026-06-14T07:30:00",
                    dataAtualizacao: "2026-06-14T07:30:00",
                    servicos: [],
                }),
                criarOrdemInicial({
                    id: 5,
                    cliente: clientes[2],
                    veiculo: veiculos[4],
                    mecanico: "",
                    queixa: "Revisão completa dos freios",
                    status: "pendente",
                    dataCriacao: "2026-06-14T08:00:00",
                    dataAtualizacao: "2026-06-14T08:00:00",
                    servicos: [],
                }),
                criarOrdemInicial({
                    id: 6,
                    cliente: clientes[2],
                    veiculo: veiculos[5],
                    mecanico: "Carlos Souza",
                    queixa: "Luz da injeção acessa",
                    status: "em_andamento",
                    dataCriacao: "2026-06-14T08:00:00",
                    dataAtualizacao: "2026-06-14T08:45:00",
                    servicos: [],
                }),
                criarOrdemInicial({
                    id: 7,
                    cliente: clientes[3],
                    veiculo: veiculos[6],
                    mecanico: "",
                    queixa: "Troca de pastilhas de freio",
                    status: "pendente",
                    dataCriacao: "2026-06-14T08:30:00",
                    dataAtualizacao: "2026-06-14T08:30:00",
                    servicos: [],
                }),
                criarOrdemInicial({
                    id: 8,
                    cliente: clientes[3],
                    veiculo: veiculos[7],
                    mecanico: "João Lopes",
                    queixa: "Revisão de 40.000 km",
                    status: "concluido",
                    dataCriacao: "2026-06-14T08:30:00",
                    dataAtualizacao: "2026-06-14T11:30:00",
                    servicos: [
                        {
                            id: 3,
                            descricao: "Filtros, velas e fluidos",
                            pecas: 450,
                            maoObra: 250,
                            data: "2026-06-14T11:00:00",
                            fotos: [],
                        },
                    ],
                }),
                criarOrdemInicial({
                    id: 9,
                    cliente: clientes[3],
                    veiculo: veiculos[8],
                    mecanico: "Carlos Souza",
                    queixa: "Ar condicionado não gela",
                    status: "atrasado",
                    dataCriacao: "2026-06-14T08:30:00",
                    dataAtualizacao: "2026-06-14T14:00:00",
                    servicos: [],
                }),
                criarOrdemInicial({
                    id: 10,
                    cliente: clientes[4],
                    veiculo: veiculos[9],
                    mecanico: "João Lopes",
                    queixa: "Verificação do motor e troca de velas",
                    status: "em_andamento",
                    dataCriacao: "2026-06-14T09:00:00",
                    dataAtualizacao: "2026-06-14T09:30:00",
                    servicos: [
                        {
                            id: 4,
                            descricao: "Jogo de velas NGK",
                            pecas: 180,
                            maoObra: 120,
                            data: "2026-06-14T09:30:00",
                            fotos: [],
                        },
                    ],
                }),
                criarOrdemInicial({
                    id: 11,
                    cliente: clientes[5],
                    veiculo: veiculos[10],
                    mecanico: "Carlos Souza",
                    queixa: "Embreagem patinando",
                    status: "em_andamento",
                    dataCriacao: "2026-06-14T09:30:00",
                    dataAtualizacao: "2026-06-14T10:00:00",
                    servicos: [],
                }),
                criarOrdemInicial({
                    id: 12,
                    cliente: clientes[5],
                    veiculo: veiculos[10],
                    mecanico: "João Lopes",
                    queixa: "Higienização interna",
                    status: "concluido",
                    dataCriacao: "2026-06-14T09:30:00",
                    dataAtualizacao: "2026-06-14T10:45:00",
                    servicos: [
                        {
                            id: 5,
                            descricao: "Limpeza química oxigênio",
                            pecas: 0,
                            maoObra: 90,
                            data: "2026-06-14T10:40:00",
                            fotos: [],
                        },
                    ],
                }),
                criarOrdemInicial({
                    id: 13,
                    cliente: clientes[6],
                    veiculo: veiculos[11],
                    mecanico: "",
                    queixa: "Troca da correia dentada",
                    status: "pendente",
                    dataCriacao: "2026-06-14T10:00:00",
                    dataAtualizacao: "2026-06-14T10:00:00",
                    servicos: [],
                }),
                criarOrdemInicial({
                    id: 14,
                    cliente: clientes[7],
                    veiculo: veiculos[12],
                    mecanico: "Carlos Souza",
                    queixa: "Barulho ao frear",
                    status: "atrasado",
                    dataCriacao: "2026-06-14T10:30:00",
                    dataAtualizacao: "2026-06-14T10:30:00",
                    servicos: [],
                }),
                criarOrdemInicial({
                    id: 15,
                    cliente: clientes[7],
                    veiculo: veiculos[12],
                    mecanico: "João Lopes",
                    queixa: "Substituição da lâmpada do farol",
                    status: "concluido",
                    dataCriacao: "2026-06-14T10:30:00",
                    dataAtualizacao: "2026-06-14T11:00:00",
                    servicos: [
                        {
                            id: 6,
                            descricao: "Lâmpada H7 Premium",
                            pecas: 45,
                            maoObra: 20,
                            data: "2026-06-14T11:00:00",
                            fotos: [],
                        },
                    ],
                }),
                criarOrdemInicial({
                    id: 16,
                    cliente: clientes[8],
                    veiculo: veiculos[13],
                    mecanico: "Carlos Souza",
                    queixa: "Revisão do sistema elétrico",
                    status: "em_andamento",
                    dataCriacao: "2026-06-14T11:00:00",
                    dataAtualizacao: "2026-06-14T11:15:00",
                    servicos: [],
                }),
                criarOrdemInicial({
                    id: 17,
                    cliente: clientes[9],
                    veiculo: veiculos[14],
                    mecanico: "",
                    queixa: "Vazamento de água do radiador",
                    status: "pendente",
                    dataCriacao: "2026-06-14T11:30:00",
                    dataAtualizacao: "2026-06-14T11:30:00",
                    servicos: [],
                }),
                criarOrdemInicial({
                    id: 18,
                    cliente: clientes[9],
                    veiculo: veiculos[14],
                    mecanico: "João Lopes",
                    queixa: "Troca do fluído de freio",
                    status: "concluido",
                    dataCriacao: "2026-06-14T11:30:00",
                    dataAtualizacao: "2026-06-14T12:15:00",
                    servicos: [
                        {
                            id: 7,
                            descricao: "Fluído DOT4 Bosch",
                            pecas: 50,
                            maoObra: 60,
                            data: "2026-06-14T12:10:00",
                            fotos: [],
                        },
                    ],
                }),
            ],
        };
    }

    function criarOrdemInicial(dados) {
        return {
            id: dados.id,
            cliente: copiarCliente(dados.cliente),
            veiculo: copiarVeiculo(dados.veiculo),
            mecanico: dados.mecanico,
            queixa: dados.queixa,
            status: dados.status,
            dataCriacao: dados.dataCriacao,
            dataAtualizacao: dados.dataAtualizacao,
            servicos: dados.servicos,
            historico: [
                {
                    descricao: "Ordem criada",
                    data: dados.dataCriacao,
                },
                {
                    descricao: "Última atualização",
                    data: dados.dataAtualizacao,
                },
            ],
        };
    }

    function inicializar() {
        if (!localStorage.getItem(CHAVE_DADOS)) {
            salvarDados(criarDadosIniciais());
        }
    }

    function obterDados() {
        inicializar();

        let dados;

        try {
            dados = JSON.parse(localStorage.getItem(CHAVE_DADOS));
        } catch (erro) {
            dados = criarDadosIniciais();
            salvarDados(dados);
        }

        const normalizacao = normalizarDados(dados);

        if (normalizacao.alterado) {
            try {
                salvarDados(normalizacao.dados);
            } catch (erro) {
                // Mantém os dados normalizados em memória caso o navegador esteja sem espaço.
            }
        }

        return normalizacao.dados;
    }

    function normalizarDados(dados) {
        let alterado = false;

        if (!Array.isArray(dados.ordens)) {
            dados.ordens = [];
            alterado = true;
        }

        dados.ordens.forEach(function (ordem) {
            if (!Array.isArray(ordem.servicos)) {
                ordem.servicos = [];
                alterado = true;
            }

            ordem.servicos.forEach(function (servico) {
                if (!Array.isArray(servico.fotos)) {
                    servico.fotos =
                        ordem.id === 4 && servico.id === 1
                            ? [FOTO_DEMO_PNEU]
                            : [];
                    alterado = true;
                }
            });
        });

        return {
            dados: dados,
            alterado: alterado,
        };
    }

    function salvarDados(dados) {
        localStorage.setItem(CHAVE_DADOS, JSON.stringify(dados));
    }

    function listarOrdens() {
        const dados = obterDados();
        return dados.ordens.slice().sort(function (a, b) {
            // FIX: ordena numericamente quando possível, mantendo estabilidade para IDs string
            const na = Number(a.id),
                nb = Number(b.id);
            if (!isNaN(na) && !isNaN(nb)) return nb - na;
            return String(b.id).localeCompare(String(a.id));
        });
    }

    function obterOrdem(id) {
        // FIX: comparação por String para suportar IDs numéricos e string
        const sid = String(id);
        const dados = obterDados();

        return dados.ordens.find(function (ordem) {
            return String(ordem.id) === sid;
        });
    }

    function obterClientes() {
        return obterDados().clientes.slice();
    }

    function obterVeiculosPorCliente(clienteId) {
        // FIX: comparação por String para suportar IDs numéricos legados (1, 2…)
        // e IDs prefixados criados pelo novo ClienteStorage (cli_6, cli_7…)
        const sidCliente = String(clienteId);
        return obterDados().veiculos.filter(function (veiculo) {
            return String(veiculo.clienteId) === sidCliente;
        });
    }

    function obterMecanicos() {
        return mecanicos.slice();
    }

    function criarOrdem(dadosFormulario) {
        const dados = obterDados();
        // FIX: comparação por String para suportar IDs numéricos legados e prefixados (vei_*, cli_*)
        const sidCliente = String(dadosFormulario.clienteId);
        const sidVeiculo = String(dadosFormulario.veiculoId);
        const cliente = dados.clientes.find(function (item) {
            return String(item.id) === sidCliente;
        });
        const veiculo = dados.veiculos.find(function (item) {
            return String(item.id) === sidVeiculo;
        });

        if (!cliente || !veiculo) {
            return null;
        }

        const agora = new Date().toISOString();
        // FIX: gera um ID de ordem único via Date.now para não colidir com IDs
        // numéricos sequenciais dos dados mockados (1-6) nem com IDs futuros
        const proximoId = (function () {
            const maxNumerico = dados.ordens.reduce(function (maiorId, ordem) {
                const n = Number(ordem.id);
                return isNaN(n) ? maiorId : Math.max(maiorId, n);
            }, 0);
            return maxNumerico + 1;
        })();

        const ordem = {
            id: proximoId,
            cliente: copiarCliente(cliente),
            veiculo: copiarVeiculo(veiculo),
            mecanico: dadosFormulario.mecanico || "",
            queixa: dadosFormulario.queixa,
            status: normalizarStatus(dadosFormulario.status),
            dataCriacao: agora,
            dataAtualizacao: agora,
            servicos: [],
            historico: [
                {
                    descricao: "Ordem criada",
                    data: agora,
                },
            ],
        };

        dados.ordens.push(ordem);
        salvarDados(dados);

        return ordem;
    }

    function atualizarOrdem(id, campos) {
        const dados = obterDados();
        const ordem = encontrarOrdem(dados, id);

        if (!ordem) {
            return null;
        }

        // FIX: comparação por String para suportar IDs numéricos e prefixados
        const veiculo = dados.veiculos.find(function (item) {
            return String(item.id) === String(campos.veiculoId);
        });

        if (veiculo) {
            ordem.veiculo = copiarVeiculo(veiculo);
        }

        const statusAnterior = ordem.status;
        ordem.mecanico = campos.mecanico || "";
        ordem.queixa = campos.queixa;
        ordem.status = normalizarStatus(campos.status);
        ordem.dataAtualizacao = new Date().toISOString();

        if (statusAnterior !== ordem.status) {
            adicionarHistorico(
                ordem,
                "Status alterado para " + obterStatus(ordem.status).texto,
            );
        } else {
            adicionarHistorico(ordem, "Ordem atualizada");
        }

        salvarDados(dados);
        return ordem;
    }

    function excluirOrdem(id) {
        const dados = obterDados();
        const sid = String(id); // FIX: usar String
        const quantidadeAnterior = dados.ordens.length;

        dados.ordens = dados.ordens.filter(function (ordem) {
            // FIX: comparação por String
            return String(ordem.id) !== sid;
        });

        salvarDados(dados);
        return dados.ordens.length !== quantidadeAnterior;
    }

    function alterarStatus(id, status) {
        const dados = obterDados();
        const ordem = encontrarOrdem(dados, id);

        if (!ordem) {
            return null;
        }

        ordem.status = normalizarStatus(status);
        ordem.dataAtualizacao = new Date().toISOString();
        adicionarHistorico(
            ordem,
            "Status alterado para " + obterStatus(ordem.status).texto,
        );
        salvarDados(dados);

        return ordem;
    }

    function adicionarServico(id, dadosServico) {
        const dados = obterDados();
        const ordem = encontrarOrdem(dados, id);

        if (!ordem || !dadosServico.descricao) {
            return null;
        }

        const proximoId =
            ordem.servicos.reduce(function (maiorId, servico) {
                return Math.max(maiorId, servico.id);
            }, 0) + 1;

        ordem.servicos.push({
            id: proximoId,
            descricao: dadosServico.descricao,
            pecas: Number(dadosServico.pecas) || 0,
            maoObra: Number(dadosServico.maoObra) || 0,
            data: new Date().toISOString(),
            fotos: Array.isArray(dadosServico.fotos)
                ? dadosServico.fotos.map(function (foto) {
                      return {
                          id: foto.id,
                          nome: foto.nome,
                          tipo: foto.tipo,
                          dados: foto.dados,
                      };
                  })
                : [],
        });

        if (ordem.status === "pendente") {
            ordem.status = "em_andamento";
            adicionarHistorico(ordem, "Status alterado para Em Andamento");
        }

        ordem.dataAtualizacao = new Date().toISOString();
        adicionarHistorico(ordem, "Serviço realizado adicionado");
        salvarDados(dados);

        return ordem;
    }

    function excluirServico(id, servicoId) {
        const dados = obterDados();
        const ordem = encontrarOrdem(dados, id);

        if (!ordem) {
            return null;
        }

        ordem.servicos = ordem.servicos.filter(function (servico) {
            return servico.id !== Number(servicoId);
        });
        ordem.dataAtualizacao = new Date().toISOString();
        adicionarHistorico(ordem, "Serviço realizado removido");
        salvarDados(dados);

        return ordem;
    }

    function editarServico(id, servicoId, dadosServico) {
        const dados = obterDados();
        const ordem = encontrarOrdem(dados, id);

        if (!ordem || !dadosServico.descricao) {
            return null;
        }

        const servico = ordem.servicos.find(function (s) {
            return s.id === Number(servicoId);
        });

        if (!servico) {
            return null;
        }

        servico.descricao = dadosServico.descricao;
        servico.pecas = Number(dadosServico.pecas) || 0;
        servico.maoObra = Number(dadosServico.maoObra) || 0;

        // Se novas fotos foram enviadas, atualizamos. Se for null/undefined mantemos as atuais.
        if (Array.isArray(dadosServico.fotos)) {
            servico.fotos = dadosServico.fotos.map(function (foto) {
                return {
                    id: foto.id,
                    nome: foto.nome,
                    tipo: foto.tipo,
                    dados: foto.dados,
                };
            });
        }

        ordem.dataAtualizacao = new Date().toISOString();
        adicionarHistorico(ordem, "Serviço realizado atualizado");
        salvarDados(dados);

        return ordem;
    }

    function encontrarOrdem(dados, id) {
        // FIX: comparação por String para suportar IDs antigos (Number) e novos (String)
        const sid = String(id);
        return dados.ordens.find(function (ordem) {
            return String(ordem.id) === sid;
        });
    }

    function copiarCliente(cliente) {
        return {
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email,
            telefone: cliente.telefone,
        };
    }

    function copiarVeiculo(veiculo) {
        return {
            id: veiculo.id,
            clienteId: veiculo.clienteId,
            marca: veiculo.marca,
            modelo: veiculo.modelo,
            placa: veiculo.placa,
            ano: veiculo.ano,
        };
    }

    function adicionarHistorico(ordem, descricao) {
        ordem.historico.push({
            descricao: descricao,
            data: new Date().toISOString(),
        });
    }

    function obterStatus(status) {
        const statusNormalizado = normalizarStatus(status);
        return STATUS[statusNormalizado] || STATUS.pendente;
    }

    function normalizarStatus(status) {
        const texto = String(status || "")
            .trim()
            .toLowerCase()
            .replace("í", "i")
            .replace("ú", "u")
            .replace("ã", "a")
            .replace("ç", "c")
            .replace(/\s+/g, "_");

        if (texto === "andamento" || texto === "em_andamento") {
            return "em_andamento";
        }

        if (texto === "concluido") {
            return "concluido";
        }

        if (texto === "atrasado") {
            return "atrasado";
        }

        return "pendente";
    }

    function formatarDataCurta(data) {
        return window.Formatters.formatarDataCurta(data);
    }

    function formatarDataCompleta(data) {
        return window.Formatters.formatarDataCompleta(data);
    }

    function formatarMoeda(valor) {
        return window.Formatters.formatarMoeda(valor);
    }

    function obterTotal(ordem) {
        return ordem.servicos.reduce(function (total, servico) {
            return (
                total +
                Number(servico.pecas || 0) +
                Number(servico.maoObra || 0)
            );
        }, 0);
    }

    function converterValor(valor) {
        return window.Formatters.converterValorMoeda(valor);
    }

    function escaparHtml(valor) {
        return window.Formatters.escaparHtml(valor);
    }

    function obterParametroId() {
        return new URLSearchParams(window.location.search).get("id");
    }

    window.GarageOrdens = {
        inicializar: inicializar,
        listarOrdens: listarOrdens,
        obterOrdem: obterOrdem,
        obterClientes: obterClientes,
        obterVeiculosPorCliente: obterVeiculosPorCliente,
        obterMecanicos: obterMecanicos,
        criarOrdem: criarOrdem,
        atualizarOrdem: atualizarOrdem,
        excluirOrdem: excluirOrdem,
        alterarStatus: alterarStatus,
        adicionarServico: adicionarServico,
        excluirServico: excluirServico,
        editarServico: editarServico,
        obterStatus: obterStatus,
        normalizarStatus: normalizarStatus,
        formatarDataCurta: formatarDataCurta,
        formatarDataCompleta: formatarDataCompleta,
        formatarMoeda: formatarMoeda,
        obterTotal: obterTotal,
        converterValor: converterValor,
        escaparHtml: escaparHtml,
        obterParametroId: obterParametroId,
    };

    // Inicializa os dados mockados se o storage estiver vazio assim que o script é carregado
    inicializar();
})();
