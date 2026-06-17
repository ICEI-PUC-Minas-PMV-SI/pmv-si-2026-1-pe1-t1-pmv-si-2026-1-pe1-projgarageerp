# Template padrão do site

A estrutura visual do **GarageERP** foi projetada para oferecer uma experiência de gestão eficiente e intuitiva. O sistema utiliza uma arquitetura de layout baseada em **App Layout**, composta por uma barra lateral fixa (**Sidebar**) e uma área de conteúdo principal fluida (**Main Content**).

A identidade visual é moderna, utilizando uma paleta de cores sóbria com destaques em azul institucional, transmitindo profissionalismo e confiança. A responsividade é tratada através de uma abordagem híbrida: o layout se adapta automaticamente a telas menores, transformando a sidebar em um menu lateral do tipo _drawer_ (gaveta) acessível por um botão hambúrguer no cabeçalho mobile.

## Design

O layout principal divide-se em duas grandes áreas:

1.  **Barra Lateral (Sidebar):** Localizada à esquerda em dispositivos desktop. Contém o logo do sistema no topo, um cartão de identificação do nível de acesso do usuário, o menu de navegação principal e um rodapé com informações do usuário logado e botão de logout.
2.  **Área de Conteúdo (Main Content):** Localizada à direita da sidebar (ou abaixo do cabeçalho em mobile). É onde as informações das páginas (dashboards, listagens, formulários) são renderizadas.

**Posicionamento da Logo:**
A logo oficial do sistema (`logo-garageerp.png`) fica posicionada no topo da Sidebar, dentro de um contêiner estilizado (`.brand-logo`) que utiliza fundo branco e sombras suaves para destaque sobre o fundo escuro da barra.

**Menus Padrões:**
A navegação é centralizada na Sidebar, com links dinâmicos baseados no perfil do usuário:

- **Dashboard:** Visão geral da oficina.
- **Clientes:** Gestão de cadastros de clientes.
- **Veículos:** Gestão da frota atendida.
- **Ordens de Serviço:** Controle de atendimentos e manutenções.
- **Relatórios:** Visão analítica (exclusivo para proprietários).

```css
/* Estrutura base do Layout no Dashboard */
.app-layout {
    display: flex;
    min-height: 100vh;
}

.main-content {
    flex: 1;
    padding: 32px;
    background-color: #f8f9fa;
}

/* Sidebar fixa (Web Component) */
:host {
    display: block;
    position: sticky;
    top: 0;
    height: 100vh;
    --sidebar-bg: #1f2937;
}
```

## Cores

O sistema utiliza um sistema de variáveis CSS centralizado no seletor `:root`, garantindo que a identidade visual seja idêntica em todos os módulos (Administrativo, Mecânico e Proprietário).

### Variáveis de Paleta (Extraídas do Código Real)

- **Cor Primária (Default):** `--cor-default: #2563eb;` (Azul Institucional)
- **Títulos e Destaques:** `--cor1: #1f2937;` (Cinza Escuro Profissional)
- **Textos Secundários:** `--cor2: #6b7280;` (Cinza Médio para labels e sub-títulos)
- **Fundo Geral:** `--cor-background: #f8f9fa;` (Cinza muito claro)

### Cores Semânticas (Status de Ordens)

As cores de status são mapeadas para facilitar a identificação rápida do progresso das atividades:

- **Concluído:** `--cor-concluido: #10b981;` (Verde)
- **Em Andamento:** `--cor-andamento: #f59e0b;` (Laranja/Âmbar)
- **Pendente:** `--cor-pendente: #3b82f6;` (Azul Claro)
- **Atrasado:** `--cor-atrasado: #ef4444;` (Vermelho)

```css
/* Trecho encontrado nos arquivos CSS das páginas */
:root {
    --cor-default: #2563eb;
    --cor1: #1f2937;
    --cor2: #6b7280;
    --cor-andamento: #f59e0b;
    --cor-concluido: #10b981;
    --cor-pendente: #3b82f6;
    --cor-atrasado: #ef4444;
    --cor-background: #f8f9fa;
}
```

## Tipografia

A fonte padrão de todo o sistema é a **Inter**, carregada via Google Fonts. Ela é aplicada globalmente para garantir uma interface limpa e legível.

- **Fonte Principal:** `"Inter", sans-serif`
- **Hierarquia:**
    - **Títulos Grandes (Dashboards):** `font-size: 30px` ou `36px`, `font-weight: 700`.
    - **Títulos de Seção/Cards:** `font-size: 18px` ou `24px`, `font-weight: 500`.
    - **Textos de Apoio e Labels:** `font-size: 14px` ou `16px`.

```css
/* Aplicação global de tipografia */
html,
body {
    font-family: "Inter", sans-serif;
    color: var(--cor1);
}

.card-number {
    font-size: 36px;
    font-weight: 700;
}
```

## Iconografia

O GarageERP adota uma abordagem de ícones customizados em formato **SVG**, alinhados aos padrões e diretrizes visuais do **Tailwind CSS**. Essa escolha garante máxima performance, nitidez responsiva em qualquer resolução de tela e total independência de pacotes ou CDNs externos de terceiros.

**Principais Ícones e Funções:**

- **Dashboard:** Ícone de dashboard (`icon-dashboard.svg`).
- **Clientes:** Silhueta de usuários (`icon-white-users.svg`).
- **Veículos:** Carro (`icon-white-car.svg`).
- **Ordens de Serviço:** Prancheta (`icon-white-clipboard-list.svg`).
- **Atrasos/Alertas:** Círculo de exclamação (`icon-red-warning-circle.svg`).
- **Ações (Editar/Excluir):** Lápis (`icon-edit.svg`) e Lixeira (`icon-gray-trash.svg`).

Os ícones são integrados tanto como imagens externas (`<img>`) quanto como SVGs inline dentro dos componentes para permitir a troca dinâmica de cores (ex: links ativos mudando de cinza para branco).

```html
<!-- Exemplo de uso de ícone na Sidebar (SVG Inline para controle de cor) -->
<a class="nav-link active" href="dashboard.html">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M..." stroke="currentColor" stroke-width="2" />
    </svg>
    Dashboard
</a>
```
