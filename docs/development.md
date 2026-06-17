# Programação de Funcionalidades

Esta seção descreve a implementação técnica das funcionalidades do sistema GarageERP, detalhando como os requisitos funcionais e não funcionais foram traduzidos em código-fonte. O desenvolvimento focou em criar uma aplicação web robusta, utilizando tecnologias nativas para garantir performance, compatibilidade e facilidade de manutenção.

### Stack Tecnológica e Padrões

- **Interface:** HTML5 semântico e CSS3 moderno (Flexbox, Grid e Media Queries) para garantir uma experiência responsiva em desktops e dispositivos móveis.
- **Lógica e Comportamento:** JavaScript (ES6+) modularizado, seguindo padrões de separação de responsabilidades.
- **Persistência:** Gerenciamento de estado e persistência de dados local via `LocalStorage`, utilizando estruturas JSON padronizadas e síncronas.
- **Arquitetura:** Implementação do **Padrão Repository** para abstração da camada de dados e **Controllers** para mediação entre a UI e as regras de negócio.

## Requisitos Atendidos

As tabelas que se seguem apresentam os requisitos funcionais e não-funcionais que relacionam o escopo do projeto com os artefatos criados:

### Requisitos Funcionais

| ID    | Descrição do Requisito                                                                                                         | Responsável     | Artefato Criado        |
| ----- | ------------------------------------------------------------------------------------------------------------------------------ | --------------- | ---------------------- |
| RF-01 | O sistema deve permitir o cadastro de clientes contendo, no mínimo, nome, telefone e identificação básica                      | Auanny Nayara   | `novo-cliente.html`    |
| RF-02 | O sistema deve permitir o cadastro de veículos vinculados a um cliente, incluindo informações como modelo, placa e ano         | Auanny Nayara   | `novo-veiculo.html`    |
| RF-03 | O sistema deve permitir a abertura de ordem de serviço associada a um cliente e a um veículo                                   | Mateus Almeida  | `nova-ordem.html`      |
| RF-04 | O sistema deve permitir a listagem de ordens de serviço com filtros por status (em aberto, em andamento, em atraso, concluída) | Mateus Almeida  | `listar-ordens.html`   |
| RF-05 | O sistema deve permitir a consulta do histórico de serviços de um veículo de forma organizada e cronológica                    | Mateus Manaces  | `veiculo.html`         |
| RF-06 | O sistema deve permitir registrar detalhadamente os serviços realizados em uma ordem de serviço                                | Ivo Nascimento  | `ordem.html`           |
| RF-07 | O sistema deve permitir atualizar o status da ordem de serviço (ex: em andamento, concluída)                                   | Ivo Nascimento  | `ordem.html`           |
| RF-08 | O sistema deve permitir a busca de clientes por nome ou telefone                                                               | Samara Oliveira | `listar-clientes.html` |
| RF-09 | O sistema deve permitir a busca de veículos por placa ou modelo                                                                | Samara Oliveira | `listar-veiculos.html` |
| RF-10 | O sistema deve permitir visualizar os detalhes completos de uma ordem de serviço                                               | Ivo Nascimento  | `ordem.html`           |
| RF-11 | O sistema deve permitir registrar a data de realização do serviço automaticamente ou manualmente                               | Ivo Nascimento  | `ordem.html`           |
| RF-12 | O sistema deve permitir visualizar o histórico completo de manutenções de um veículo                                           | Mateus Manaces  | `veiculo.html`         |
| RF-13 | O sistema deve apresentar um dashboard com o resumo da operação (clientes, veículos, ordens pendentes e em andamento)          | Mateus Manaces  | `dashboard.html`       |

### Requisitos Não Funcionais

| ID     | Descrição do Requisito                                                                                                                         | Responsável      | Artefato Criado / Estratégia                                                   |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------ |
| RNF-01 | O sistema deve ser acessível por meio de navegadores web modernos (Google Chrome, Firefox, Edge) nas versões atualizadas                       | Equipe GarageERP | Compatibilidade Cross-browser via HTML5 padronizado                            |
| RNF-02 | O sistema deve possuir interface simples e intuitiva, permitindo que usuários com pouca experiência consigam utilizá-lo sem treinamento prévio | Mateus Almeida   | Protótipo no Figma e Componentes Reutilizáveis (Custom Elements)               |
| RNF-03 | O sistema deve ser responsivo, adaptando-se a diferentes dispositivos (desktop, tablet e smartphone)                                           | Equipe GarageERP | CSS Flexbox, Grid e Media Queries                                              |
| RNF-04 | O sistema deve apresentar tempo de resposta inferior a 3 segundos em pelo menos 95% das operações realizadas                                   | Equipe GarageERP | Manipulação de dados em memória local (LocalStorage)                           |
| RNF-05 | O sistema deve garantir a integridade dos dados por meio de validações e consistência das informações cadastradas                              | Equipe GarageERP | Validação HTML5 e Regras de Negócio nos Repositories (JS)                      |
| RNF-06 | O sistema deve permitir autenticação de usuários, exigindo login e perfil para acesso às funcionalidades                                       | Mateus Almeida   | `auth-service.js` (Middleware de Acesso) e `auth-login-controller.js` (Sessão) |
| RNF-07 | O sistema deve armazenar os dados de forma organizada, permitindo consultas rápidas e eficientes                                               | Equipe GarageERP | Modelagem de dados estruturada no LocalStorage (Chave Unificada)               |
| RNF-08 | O sistema deve possuir arquitetura que permita manutenção, escalabilidade e futuras expansões                                                  | Mateus Almeida   | Padrão Repository e Controllers com separação clara de responsabilidades       |

## Descrição das estruturas:

## Cliente

| **Nome** | **Tipo** | **Descrição**                       | **Exemplo**                |
| :------: | -------- | ----------------------------------- | -------------------------- |
|    id    | Texto    | Identificador único (cli\_\*)       | `"cli_1"`                  |
|   nome   | Texto    | Nome do cliente cadastrado          | `"José Fonseca"`           |
|  email   | Texto    | E-mail do cliente                   | `"jose.fonseca@gmail.com"` |
| telefone | Texto    | Telefone de contato do cliente      | `"(31)98563-7812"`         |
| veiculos | Array    | Lista de veículos vinculados (Join) | `[]`                       |

## Veículo

| **Nome**  | **Tipo** | **Descrição**                       | **Exemplo**       |
| :-------: | -------- | ----------------------------------- | ----------------- |
|    id     | Texto    | Identificador único (vei\_\*)       | `"vei_1"`         |
| clienteId | Texto    | Referência ao ID do cliente         | `"cli_1"`         |
|   marca   | Texto    | Marca do veículo cadastrado         | `"Mercedes-Benz"` |
|  modelo   | Texto    | Modelo do veículo cadastrado        | `"C200"`          |
|   placa   | Texto    | Placa de identificação do veículo   | `"TZX-3412"`      |
|    ano    | Número   | Ano de fabricação/modelo do veículo | `2021`            |

## Ordem de Serviço

|    **Nome**     | **Tipo** | **Descrição**                                                     | **Exemplo**              |
| :-------------: | -------- | ----------------------------------------------------------------- | ------------------------ |
|       id        | Número   | Identificador único da ordem de serviço                           | `23`                     |
|     cliente     | Objeto   | Cópia dos dados do cliente no momento da criação                  | `{ nome: "..." }`        |
|     veiculo     | Objeto   | Cópia dos dados do veículo no momento da criação                  | `{ modelo: "..." }`      |
|    mecanico     | Texto    | Nome do mecânico responsável                                      | `"João Lopes"`           |
|     queixa      | Texto    | Problema relatado pelo cliente                                    | `"Barulho na suspensão"` |
|     status      | Texto    | Situação (pendente, em_andamento, atrasado, concluido)            | `"em_andamento"`         |
|   dataCriacao   | Texto    | Data e hora de abertura (ISO)                                     | `"2026-06-17T10:00:00Z"` |
| dataAtualizacao | Texto    | Data e hora da última alteração (ISO)                             | `"2026-06-17T11:30:00Z"` |
|    servicos     | Array    | Lista de serviços detalhados (id, descricao, pecas, maoObra, etc) | `[]`                     |
|    historico    | Array    | Log de alterações de status e eventos                             | `[]`                     |
