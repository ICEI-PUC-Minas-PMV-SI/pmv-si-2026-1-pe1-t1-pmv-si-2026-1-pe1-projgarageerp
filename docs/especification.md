# Especificações do Projeto

## Personas:

### Proprietário de oficina

**Descrição:**  
Responsável pela gestão da oficina mecânica e pela organização das atividades do estabelecimento. Possui experiência técnica na área automotiva, com idade média entre 30 e 55 anos, e apresenta nível básico a intermediário de familiaridade com tecnologias digitais, podendo ter dificuldades com sistemas complexos. Atua na tomada de decisões e no controle geral do negócio.

**Necessidades:**
- Consultar histórico completo de serviços realizados em veículos;
- Acompanhar ordens de serviço em andamento e concluídas;
- Gerenciar informações de clientes e veículos de forma centralizada;
- Obter relatórios simples para apoio à tomada de decisão;
- Melhorar a organização, produtividade e controle das atividades da oficina.

### Mecânico

**Descrição:**  
Profissional responsável pela execução dos serviços de manutenção e reparo em veículos. Possui conhecimento técnico especializado, porém geralmente apresenta baixo ou médio nível de familiaridade com sistemas digitais. Utiliza o sistema como ferramenta de apoio para execução e registro das atividades.

**Necessidades:**
- Visualizar ordens de serviço abertas com clareza;
- Consultar histórico de manutenção dos veículos;
- Registrar serviços realizados de forma rápida e objetiva;
- Acessar informações técnicas sem complexidade;
- Reduzir erros e retrabalho durante a execução dos serviços.

### Funcionário administrativo

**Descrição:**  
Responsável pelo atendimento ao cliente e pelo registro das informações relacionadas aos serviços realizados na oficina. Possui conhecimento intermediário em informática e atua diretamente na organização dos dados e fluxo de atendimento.

**Necessidades:**
- Cadastrar clientes e veículos com facilidade;
- Registrar e atualizar ordens de serviço;
- Acompanhar o status dos serviços em tempo real;
- Organizar informações para agilizar o atendimento;
- Reduzir erros no registro de dados.

# Histórias de usuários

| Eu como... | ...quero/desejo... | ...para... |
|---|---|---|
| proprietário de oficina | visualizar todas as ordens de serviço em andamento | acompanhar o fluxo de trabalho e evitar atrasos |
| proprietário de oficina | consultar o histórico de serviços de um veículo | entender recorrências e melhorar o atendimento ao cliente |
| proprietário de oficina | ter acesso centralizado às informações de clientes e veículos | organizar melhor a gestão do negócio |
| mecânico | visualizar rapidamente as ordens de serviço atribuídas a mim | executar minhas atividades com mais agilidade |
| mecânico | registrar os serviços realizados em uma ordem de serviço | manter o histórico atualizado e evitar retrabalho |
| mecânico | consultar o histórico do veículo antes de iniciar um serviço | entender problemas anteriores |
| funcionário administrativo | cadastrar clientes e veículos de forma simples | agilizar o atendimento |
| funcionário administrativo | criar e atualizar ordens de serviço | organizar o fluxo de trabalho da oficina |
| funcionário administrativo | acompanhar o status das ordens de serviço | informar corretamente os clientes |

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

| ID | Descrição do Requisito | Prioridade |
|---|---|---|
| RF-01 | O sistema deve permitir o cadastro de clientes contendo, no mínimo, nome, telefone e identificação básica. | Alta |
| RF-02 | O sistema deve permitir o cadastro de veículos vinculados a um cliente, incluindo informações como modelo, placa e ano. | Alta |
| RF-03 | O sistema deve permitir a abertura de ordem de serviço associada a um cliente e a um veículo. | Alta |
| RF-04 | O sistema deve permitir a listagem de ordens de serviço com filtros por status (em aberto, em andamento, em atraso, concluída). | Média |
| RF-05 | O sistema deve permitir a consulta do histórico de serviços de um veículo de forma organizada e cronológica. | Alta |
| RF-06 | O sistema deve permitir registrar detalhadamente os serviços realizados em uma ordem de serviço. | Alta |
| RF-07 | O sistema deve permitir atualizar o status da ordem de serviço (ex: em andamento, concluída). | Média |
| RF-08 | O sistema deve permitir a busca de clientes por nome ou telefone. | Média |
| RF-09 | O sistema deve permitir a busca de veículos por placa ou modelo. | Média |
| RF-10 | O sistema deve permitir visualizar os detalhes completos de uma ordem de serviço. | Média |
| RF-11 | O sistema deve permitir registrar a data de realização do serviço automaticamente ou manualmente. | Baixa |
| RF-12 | O sistema deve permitir visualizar o histórico completo de manutenções de um veículo. | Alta |

### Requisitos não Funcionais

| ID | Descrição do Requisito | Prioridade |
|---|---|---|
| RNF-01 | O sistema deve ser acessível por meio de navegadores web modernos (Google Chrome, Firefox, Edge) nas versões atualizadas. | Alta |
| RNF-02 | O sistema deve possuir interface simples e intuitiva, permitindo que usuários com pouca experiência consigam utilizá-lo sem treinamento prévio. | Alta |
| RNF-03 | O sistema deve ser responsivo, adaptando-se a diferentes dispositivos (desktop, tablet e smartphone). | Média |
| RNF-04 | O sistema deve apresentar tempo de resposta inferior a 3 segundos em pelo menos 95% das operações realizadas. | Média |
| RNF-05 | O sistema deve garantir a integridade dos dados por meio de validações e consistência das informações cadastradas. | Alta |
| RNF-06 | O sistema deve permitir autenticação segura de usuários, exigindo login e senha para acesso às funcionalidades. | Alta |
| RNF-07 | O sistema deve armazenar os dados de forma organizada, permitindo consultas rápidas e eficientes. | Média |
| RNF-08 | O sistema deve possuir arquitetura que permita manutenção, escalabilidade e futuras expansões. | Baixa |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |