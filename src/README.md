## 🚀 Instruções de Utilização e Homologação do Sistema

O **GarageERP** está hospedado diretamente no **GitHub Pages** e pode ser acessado e testado em tempo real pelo link abaixo:

🔗 **[GarageERP](https://icei-puc-minas-pmv-si.github.io/pmv-si-2026-1-pe1-t1-pmv-si-2026-1-pe1-projgarageerp/)**

---

### 🔑 Perfis de Acesso e Matriz de Permissões

O sistema possui controle de acesso baseado em três perfis de usuários. Utilize as credenciais de teste para validar o comportamento de cada um:

| Perfil | E-mail de Acesso | Senha | Regras e Limitações de Acesso |
| :-- | :-- | :-- | :-- |
| **Mecânico** <br>_(João Lopes)_ | `joao.lopes@garageerp.com.br` | `teste1234` | **Apenas Execução:** Visualiza o painel com as OS atribuídas a ele. Consegue iniciar, concluir, ver detalhes e anexar relatórios técnicos. **Não possui** permissão para criar, editar ou excluir clientes, veículos e ordens. |
| **Funcionário Administrativo** <br>_(Maria Santos)_ | `maria.santos@garageerp.com.br` | `teste1234` | **Operação e Gestão:** Cadastro completo e edição de clientes, veículos e ordens de serviço. Consegue realizar exclusões operacionais, mas **não possui** acesso à tela de relatórios financeiros e gerenciais. |
| **Proprietário da Oficina** <br>_(Carlos Silva)_ | `carlos.silva@garageerp.com.br` | `teste1234` | **Acesso Total:** Possui todas as funções do administrativo, além de uma visão do Dashboard mais detalhada e acesso exclusivo à tela de **Relatórios Estratégicos** do negócio. |

---

### 📝 Guia Passo a Passo para Testar o Sistema

Siga o roteiro abaixo para experimentar o fluxo ponta a ponta da plataforma, simulando o dia a dia da oficina mecânica.

#### 1️⃣ O Fluxo de Cadastro e Abertura (Perfil Administrativo ou Proprietário)

> **Utilize o login:** `maria.santos@garageerp.com.br` ou `carlos.silva@garageerp.com.br` (Senha: `teste1234`)

1. **Entrada no Sistema:** Assim que o login for efetuado, você será direcionado automaticamente ao painel principal (**Dashboard**).
2. **Cadastrar um Novo Cliente:**
    - No próprio Dashboard, clique no botão rápido **"Novo Cliente"** (ou acesse o menu lateral **Clientes** e clique em **"+ Novo Cliente"**).
    - No formulário, preencha os campos obrigatórios: **Nome**, **Telefone** e **E-mail**.
    - Clique em **"Cadastrar Cliente"**. O sistema salvará os dados e redirecionará você instantaneamente para o perfil individual do cliente criado.
3. **Vincular um Veículo:**
    - No perfil do cliente, clique no botão **"Adicionar Veículo"** para abrir a tela de **Novo Veículo**.
    - Preencha as informações do automóvel: **Marca**, **Modelo**, **Placa** e **Ano de Fabricação/Modelo**.
    - Clique em **"Cadastrar Veículo"**. Você será redirecionado para a página de perfil do veículo dentro do sistema.
4. **Abrir a Ordem de Serviço (OS):**
    - Na página do veículo, clique no botão **"Nova Ordem"**.
    - No formulário de abertura, selecione o mecânico responsável no campo de seleção (Recomendamos selecionar o mecânico **"João Lopes"** para dar sequência ao teste).
    - Preencha o campo **Queixa do Cliente** detalhando o problema relatado.
    - Selecione o Status Inicial da Ordem como **"Pendente"** (o seletor permite alternar entre _Pendente_, _Em andamento_, _Atrasada_ ou _Concluída_).
    - Clique em **"Criar Ordem de Serviço"**. O sistema gerará a OS e redirecionará você para a tela de detalhamento completo daquela ordem.
5. **Navegação Geral:** Use o menu lateral para conferir a centralização dos dados. Clicando em **Clientes**, **Veículos** ou **Ordens de Serviço**, você verá listados todos os registros cadastrados na oficina de maneira integrada.

---

#### 2️⃣ A Execução Técnica e Registro de Fotos (Perfil Mecânico)

> **Utilize o login:** `joao.lopes@garageerp.com.br` (Senha: `teste1234`)

1. **Dashboard do Mecânico:** Ao logar, a tela inicial exibe apenas as ordens de serviço que foram explicitamente atribuídas a ele, divididas por contadores de status (_Pendentes_, _Em Andamento_, _Concluídas Hoje_).
2. **Iniciar o Trabalho:** Na listagem do painel, localize a OS criada no passo anterior e clique no botão **"Iniciar Serviço"** (o status mudará automaticamente para _Em Andamento_).
3. **Registro Técnico:**
    - Se preferir, navegue pelo menu lateral em **Ordens de Serviço** e clique sobre a ordem desejada para entrar no perfil detalhado da OS.
    - No bloco **Adicionar Serviço Realizado**, o mecânico pode digitar a descrição detalhada de tudo o que foi executado na manutenção.
    - O sistema disponibiliza um campo de upload onde é possível enviar de forma opcional **até 5 fotos** do serviço (formatos PNG, JPG ou WEBP) como registro visual do reparo.
4. **Conclusão:** Após salvar as alterações do serviço técnico, clique no botão **"Concluir Serviço"** no topo da tela para finalizar o fluxo operacional da OS.

---

#### 3️⃣ A Análise de Indicadores Gerenciais (Perfil Proprietário)

> **Utilize o login:** `carlos.silva@garageerp.com.br` (Senha: `teste1234`)

1. **Dashboard Avançado:** O proprietário visualiza um painel de controle macro com alertas proativos sobre ordens em atraso e cards de métricas financeiras rápidas (como Faturamento Estimado, Ticket Médio e Receita Total de Concluídos).
2. **Painel de Relatórios:** Clique na opção **Relatórios** na barra lateral para ter acesso a uma tela analítica que consolida os seguintes dados e inteligência de negócios:
    - **Métricas Principais:** Total de OS criadas, Taxa de Conclusão (%), Taxa de Atraso (%), Total de Clientes Ativos, Receita Total Acumulada e Ticket Médio Geral.
    - **Gráfico de Distribuição de Status:** Indicador visual em barras que exibe a proporção de ordens concluídas, em andamento, pendentes e atrasadas no ecossistema da oficina.
    - **Gráfico de Ordens por Mês:** Linha do tempo mostrando o volume de ordens geradas nos **últimos 6 meses** da empresa.
    - **Listas de Frequência:** Rankings automáticos indicando quais são os **Clientes Mais Frequentes** e quais são os **Veículos que Demandaram Mais Manutenções** na oficina.
