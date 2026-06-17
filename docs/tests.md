# Testes GarageERP

## Introdução

O GarageERP foi pensado para ser aplicado em oficinas e centros automotivos com o objetivo de facilitar na gestão de seu négocio. Sendo assim, os testes do sistema visaram verificar se as funções cruciais de projeto web estão funcionando de acordo com o proposto.

Os testes de software seguiram a abordagem de caixa-preta, avaliando o comportamento da aplicação com base nas entradas realizadas pela interface e nas saídas apresentadas ao usuário, sem considerar detalhes da implementação. Adicionalmente, foram definidos testes de usabilidade para medir a capacidade do público-alvo de operar as funções principais com clareza e independência.

## RF-01 — Cadastrar Clientes

| Campo | Descrição |
| --- | --- |
| **Procedimento** | 1. Acessar a página `listar-clientes.html`. <br>2. Selecionar a opção **novo cliente**. <br>3. Preencher as informações solicitadas. <br>4. Selecionar botão **Cadastrar Cliente**. |
| **Requisitos associados** | RF-01 - O sistema deve permitir o cadastro de clientes contendo, no mínimo, nome, telefone e identificação básica. |
| **Resultado esperado** | O cliente será cadastrado e estará já disponível para o cadastro de veículo. |
| **Dados de entrada** | Informações do cliente. |
| **Resultado obtido** | O cliente foi cadastrado no sistema. |
| **Evidência em vídeo** | 🎬[RF-01 - Cadastrar Clientes](https://github.com/user-attachments/assets/6009eaf6-05c3-43d0-ab0e-68f6d888c499) |

## RF-02 — Cadastrar Veículos

| Campo | Descrição |
| --- | --- |
| **Procedimento** | 1. Acessar a página `listar-veiculos.html`. <br>2. Selecionar a opção **novo veículo**. <br>3. Preencher as informações solicitadas. <br>4. Selecionar botão **Cadastrar veículo**. |
| **Requisitos associados** | RF-02 - O sistema deve permitir o cadastro de veículos vinculados a um cliente, incluindo informações como modelo, placa e ano. |
| **Resultado esperado** | O veículo será cadastrado e vinculado a um cliente já existente no sistema e estará disponível para criação de ordem de serviços. |
| **Dados de entrada** | Informações do veículo. |
| **Resultado obtido** | O veículo foi cadastrado no sistema. |
| **Evidência em vídeo** | 🎬[RF-02 - Cadastrar Veículos](https://github.com/user-attachments/assets/c501ad5c-8b4f-482c-9a0d-f6d0841b8b5e) |

## RF-03 — Abertura de Ordem de Serviço

| Campo | Descrição |
| --- | --- |
| **Procedimento** | 1. Acessar a página `listar-ordens.html`. <br>2. Selecionar a opção **nova ordem**. <br>3. Preencher as informações solicitadas. <br>4. Selecionar botão **Criar ordem de serviço**. |
| **Requisitos associados** | RF-03 - O sistema deve permitir a abertura de ordem de serviço associada a um cliente e a um veículo. |
| **Resultado esperado** | A ordem será criada e já aparecerá tanto na listagem na página `listar-ordem.html`, quanto na página `dashboard.html` de todos os perfis. |
| **Dados de entrada** | Informações da solicitação da ordem. |
| **Resultado obtido** | A ordem de serviço foi cadastrada e disponível para ser iniciada. |
| **Evidência em vídeo** | 🎬[RF-03 - Abertura de Ordem de Serviço](https://github.com/user-attachments/assets/13c97208-06c0-4d5b-a7cc-1cb7180604a0) |

## RF-04 — Filtrar Ordens de Serviço

| Campo | Descrição |
| --- | --- |
| **Procedimento** | 1. Acessar a página `listar-ordens.html`. <br>2. Selecionar a opção **filtrar** na parte superior da lista. <br>3. Selecionar o status desejado. |
| **Requisitos associados** | RF-04 - O sistema deve permitir a listagem de ordens de serviço com filtros por status (em aberto, em andamento, em atraso, concluída). |
| **Resultado esperado** | A lista será filtrada de acordo com a opção selecionada. |
| **Dados de entrada** | Tipo de status da solicitação |
| **Resultado obtido** | A lista foi filtrada de acordo com a seleção. |
| **Evidência em vídeo** | 🎬[RF-04 - Filtrar Ordens de Serviço](https://github.com/user-attachments/assets/ca37fda6-fa5f-429a-9180-298b359c6d32) |

## RF-05 — Consultar Histórico de Serviço

| Campo | Descrição |
| --- | --- |
| **Procedimento** | 1. Acessar a página `listar-veículos.html`. <br>2. Selecionar o veículo desejado. |
| **Requisitos associados** | RF-05 - O sistema deve permitir a consulta do histórico de serviços de um veículo de forma organizada e cronológica. |
| **Resultado esperado** | O usuário será direcionado para a página `veiculo?id=.html` e visualizará todo o histórico de ordens na empresa. |
| **Dados de entrada** | ID do veículo |
| **Resultado obtido** | O veículo teve seu histórico disponibilizado. |
| **Evidência em vídeo** | 🎬[RF-05 - Consultar Histórico de Serviço](https://github.com/user-attachments/assets/03824476-a132-4ce4-adf4-532f0e86cd86) |

## RF-06 — Detalhar Ordem de Serviço

| Campo | Descrição |
| --- | --- |
| **Procedimento** | 1. Acessar a página `ordem?id=.html`. <br>2. Preencher com os serviços prestados. |
| **Requisitos associados** | RF-06 - O sistema deve permitir registrar detalhadamente os serviços realizados em uma ordem de serviço. |
| **Resultado esperado** | O usuário conseguirá registrar o serviço realizado, valor do serviço, além de fotos sobre trabalho prestado. |
| **Dados de entrada** | Informações do serviço |
| **Resultado obtido** | A **Ordem de Serviço** foi atualizada. |
| **Evidência em vídeo** | 🎬[RF-06 - Detalhar Ordem de Serviço](https://github.com/user-attachments/assets/6a3b5a06-175b-472b-a32b-df0c92e14bac) |

## RF-07 — Atualizar Status da Ordem

| Campo | Descrição |
| --- | --- |
| **Procedimento** | 1. Acessar a página `ordem?id=.html`. <br>2. Selecionar na parte superior da página o status atual da ordem. |
| **Requisitos associados** | RF-07 - O sistema deve permitir atualizar o status da ordem de serviço (ex: em andamento, concluída). |
| **Resultado esperado** | O usuário conseguirá alterar o status da ordem. |
| **Dados de entrada** | Status da ordem de serviço |
| **Resultado obtido** | O **Status da ordem de serviço** foi atualizada. |
| **Evidência em vídeo** | 🎬[RF-07 - Atualizar Status da Ordem](https://github.com/user-attachments/assets/58333df4-ed6b-4c2e-9e40-7f849acfc5bb) |

## RF-08 — Buscar Cliente

| Campo | Descrição |
| --- | --- |
| **Procedimento** | 1. Acessar a página `listar-clientes.html`. <br>2. Buscar o cliente na barra superior da lista<br> 3. Selecionar cliente. |
| **Requisitos associados** | RF-08 - O sistema deve permitir a busca de clientes por nome ou telefone. |
| **Resultado esperado** | O usuário conseguirá filtrar a lista de cliente por nome, telefone ou email. |
| **Dados de entrada** | Dados do cliente |
| **Resultado obtido** | A lista de clientes foi filtrada de acordo com o pesquisado. |
| **Evidência em vídeo** | 🎬[RF-08 - Buscar Cliente](https://github.com/user-attachments/assets/61f24e9a-a972-4fdc-b3e2-3b3e38627fee) |

## RF-09 — Buscar Veículo

| Campo | Descrição |
| --- | --- |
| **Procedimento** | 1. Acessar a página `listar-veiculos.html`. <br>2. Buscar o veículo na barra superior da lista<br> 3. Selecionar veículos. |
| **Requisitos associados** | RF-09 - O sistema deve permitir a busca de veículos por placa ou modelo. |
| **Resultado esperado** | O usuário conseguirá filtrar a lista de veículos por placa, modelo ou proprietário. |
| **Dados de entrada** | Dados do veículo |
| **Resultado obtido** | A lista de veículos foi filtrada de acordo com o pesquisado. |
| **Evidência em vídeo** | 🎬[RF-09 - Buscar Veículo](https://github.com/user-attachments/assets/9818da85-0678-4c3e-9ab6-0008b0097fcc) |

## RF-10 — Visualizar Dados de uma Ordem de Serviço

| Campo | Descrição |
| --- | --- |
| **Procedimento** | 1. Acessar a página `listar-ordens.html`. <br>2. Selecionar a ordem desejada. |
| **Requisitos associados** | RF-10 - O sistema deve permitir visualizar os detalhes completos de uma ordem de serviço. |
| **Resultado esperado** | O usuário será direcionado para a ordem escolhida e visualizará todos os detalhes da ordem. |
| **Dados de entrada** | ID da Ordem de serviço |
| **Resultado obtido** | A ordem escolhida foi mostrada corretamente com todos seus detalhes. |
| **Evidência em vídeo** | 🎬[RF-10 - Visualizar Dados de uma Ordem de Serviço](https://github.com/user-attachments/assets/e81a07de-8a86-47dc-aa76-ee3775c4b673) |

## RF-11 — Registrar Data de Ralização do Serviço

| Campo | Descrição |
| --- | --- |
| **Procedimento** | 1. Acessar a página `ordem?id=.html`. <br>2. Selecionar a ordem desejada. |
| **Requisitos associados** | RF-11 - O sistema deve permitir registrar a data de realização do serviço automaticamente ou manualmente. |
| **Resultado esperado** | Após alterar o status da ordem, será salvo automaticamento no seu histórico. |
| **Dados de entrada** | Status da ordem de serviço |
| **Resultado obtido** | A ordem escolhida teve sua alteração salvo e disponível em seu histórico. |
| **Evidência em vídeo** | 🎬[RF-11 - Registrar Data de Ralização do Serviço](https://github.com/user-attachments/assets/c844d732-3df5-4ed8-bee8-cd30dccbcaca) |

## RF-12 — Consultar Histórico de Serviço

| Campo | Descrição |
| --- | --- |
| **Procedimento** | 1. Acessar a página `listar-veículos.html`. <br>2. Selecionar o veículo desejado. |
| **Requisitos associados** | RF-12 - O sistema deve permitir visualizar o histórico completo de manutenções de um veículo. |
| **Resultado esperado** | O usuário será direcionado para a página `veiculo?id=.html` e visualizará todo o histórico de ordens do veículo na empresa. |
| **Dados de entrada** | ID do veículo |
| **Resultado obtido** | O veículo teve seu histórico completo disponibilizado. |
| **Evidência em vídeo** | 🎬[RF-12 - Consultar Histórico de Serviço](https://github.com/user-attachments/assets/0d2965f3-59ec-47c2-ab63-8dfa3386f5ad) |

## RF-13 — Visualizar Resumo da Operação

| Campo | Descrição |
| --- | --- |
| **Procedimento** | 1. Acessar a página de login (`index.html`) e inserir credenciais de acesso válidas.<br>2. Confirmar a autenticação para ser redirecionado automaticamente para a tela principal.<br>_(Alternativo: Caso já esteja logado e navegando por outra tela, clicar em "Dashboard" no menu de navegação)._ |
| **Requisitos associados** | RF-13 - O sistema deve apresentar um dashboard com o resumo da operação (clientes, veículos, ordens pendentes e em andamento). |
| **Resultado esperado** | O usuário é direcionado para a página `dashboard.html`, onde visualizará uma visão consolidada da operação contendo:<br>- **Banner de Alerta:** Aviso destacado no topo caso existam ordens de serviço em atraso;<br>- **Indicadores e Métricas Operacionais:** Cards e contadores informativos resumindo o volume de clientes ativos e o andamento das demandas da oficina;<br>- **Distribuição de Status:** Divisão clara do volume de trabalho segmentado por situações (como pendentes, em andamento, concluídas ou atrasadas);<br>- **Histórico Recente:** Um feed ou listagem cronológica exibindo as últimas movimentações e atualizações das ordens de serviço do estabelecimento. |
| **Dados de entrada** | Credenciais de acesso do usuário (E-mail e Senha) na tela inicial. |
| **Resultado obtido** | O usuário foi autenticado com sucesso, redirecionado automaticamente para o painel de controle principal e visualizou o resumo das atividades operacionais atualizado com os respectivos alertas, indicadores e fluxo de ordens recentes. |
| **Evidência em vídeo** | 🎬[RF-13 - Visualizar Resumo da Operação](https://github.com/user-attachments/assets/e6b86481-b972-4e88-8edd-fc312cc3c873) |

<br>

# Testes de Usabilidade

O plano de testes de usabilidade tem como finalidade avaliar a experiência dos usuários ao interagir com a aplicação, identificando se as funcionalidades atendem às expectativas e se podem ser utilizadas de forma intuitiva.

Para essa avaliação, foram definidos cenários de teste com base nas histórias de usuário levantadas durante a etapa de especificação do projeto. Cada cenário representa uma situação prática de uso das principais funcionalidades do sistema.

Participaram dos testes quatro usuários com perfis compatíveis com o público-alvo definido na documentação do projeto. Durante a execução das tarefas, foram analisados os seguintes critérios:

- **Taxa de sucesso:** verifica se o usuário conseguiu concluir a tarefa proposta corretamente;

- **Satisfação do usuário:** mede a percepção do usuário em relação à facilidade de uso do sistema;

- **Tempo de execução:** contabiliza o tempo necessário para finalizar cada tarefa, em segundos, permitindo comparação com o tempo médio de execução de um especialista da equipe de desenvolvimento.

## Cenários Utilizados

| Nº do Cenário | Descrição do cenário |
| --- | --- |
| 1 | Você é dono de uma oficina e deseja ter um um relatório da renda do empreendimento. |
| 2 | Você é um administrador e deseja ter uma maior facilidade em mostrar informações aos clientes dos serviços prestados. |
| 3 | Você é um mecânico e deseja ter uma rápida visualização das ordens de serviço. |

## Registro de Teste de Usabilidade

### Cenário 1 - Relatório de finanças

| Métrica | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
| :-- | :-- | :-- | :-- |
| **Usuário 1** | SIM | 5 (Ótimo) | 56.1 segundos |
| **Usuário 2** | SIM | 4 (Bom) | 53.7 segundos |
| **Usuário 3** | SIM | 5 (Ótimo) | 57.2 segundos |
| **Média** | **100%** | **4.67** | **55.6 segundos** |
| **Tempo Especialista** | SIM | 5 (Ótimo) | 16.1 segundos |
| **Comentários dos Usuários:** | A navegação pelos painéis é boa demais. A página é intuitiva e é fácil para achar a informação. |  |  |

### Cenário 2 - Exibição de informações do serviço solicitado ao cliente

| Métrica | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
| :-- | :-- | :-- | :-- |
| **Usuário 1** | SIM | 5 (Ótimo) | 45.6 segundos |
| **Usuário 2** | SIM | 5 (Ótimo) | 43.9 segundos |
| **Usuário 3** | SIM | 5 (Ótimo) | 46.4 segundos |
| **Média** | **100%** | **5** | **45.3 segundos** |
| **Tempo Especialista** | SIM | 5 (Ótimo) | 13.4 segundos |
| **Comentários dos Usuários:** | A facilidade em mostrar ao cliente é um fator importante, ótima para encontrar no dia a dia corrido. |

### Cenário 3 - Visualização das Ordens de Serviço

| Métrica | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
| :-- | :-- | :-- | :-- |
| **Usuário 1** | SIM | 5 (Ótimo) | 35.4 segundos |
| **Usuário 2** | SIM | 5 (Ótimo) | 40.4 segundos |
| **Usuário 3** | SIM | 4 (Bom) | 37.2 segundos |
| **Média** | **100%** | **4.67** | **37.6 segundos** |
| **Tempo Especialista** | SIM | 5 (Ótimo) | 15.2 segundos |
| **Comentários dos Usuários:** | navegação pelas ordens de serviço é de fácil compreensão, ótima para encontrar no dia a dia corrido. |  |  |

## Avalição dos Testes de Usabilidade

Tomando como base os resultados obtidos, foi possível verificar que a aplicação web apresenta bons resultados quanto à taxa de sucesso na interação dos usuários, tendo em vista que os cenários propostos foram concluídos com sucesso.

Além disso, a aplicação obteve também uma elevada satisfação subjetiva dos usuários no momento que realizavam os cenários propostos. Prova são as médias das avaliações em cada um dos cenários, que variou entre 4 (bom) e 5 (ótimo).

Com relação ao tempo para conclusão de cada tarefa/cenário, notamos discrepância entre a média de tempo dos usuários e o tempo do especialista/desenvolvedor em todos os cenários. Tal discrepância, em certa medida, é esperada, tendo em vista que o desenvolvedor já tem prévio conhecimento de toda a interface da aplicação, do posicionamento dos elementos, lógica de organização das páginas, etc.

Contudo, tendo em vista que a diferença foi relevante (por exemplo, 37.6 segundos — média usuários — contra 15.2 segundos — especialista — no cenário três), e ainda os comentários feitos por alguns usuários, entendemos haver oportunidades de melhoria na usabilidade da aplicação.
