# Como Importar a Sidebar

Este é o passo a passo de como importar a barra lateral (Sidebar.js) nas suas páginas (dentro de src/pages/...) sem quebrar o layout!

## Passo 1: Estrutura Base e CSS

Para a barra não "piscar" na tela ou quebrar o layout enquanto o JavaScript carrega, sua página precisa ter um formato flexível e uma regra CSS que "reserva" o espaço da sidebar.

Coloque este CSS dentro da tag `<style>` ou do seu arquivo CSS principal da página:

```css
/* Layout base para a página não vazar (sem scrolls extras) */
html,
body {
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow: hidden;
    font-family: "Inter", sans-serif;
    background-color: #f3f4f6;
}

.app-layout {
    display: flex;
    height: 100vh;
    width: 100vw;
}

.main-content {
    flex: 1;
    padding: 32px;
    overflow-y: auto; /* O conteúdo da página deve rolar aqui dentro */
}

/* === RESERVA DE ESPAÇO DA SIDEBAR === 
  (Impede a FOUC - Flash of Unstyled Content) */
ge-sidebar:not(:defined) {
    display: block;
    width: 255px;
    height: 100vh;
    height: 100dvh;
    background-color: #1f2937;
    flex-shrink: 0;
}

/* Ajustes Mobile do Espaço da Sidebar e Header */
@media (max-width: 760px) {
    .app-layout {
        flex-direction: column;
    }
    .main-content {
        padding: 16px;
        padding-top: 76px; /* Compensa o header mobile de 60px + padding de 16px */
    }
    ge-sidebar:not(:defined) {
        width: 100vw;
        height: 61px;
        background-color: #f8f9fa;
        border-bottom: 1.25px solid #e5e7eb;
    }
}
```

## Passo 2: O HTML da Página

Dentro do `<body>`, crie o container com a classe `app-layout`, insira a tag mágica `<ge-sidebar>` e logo em seguida a sua área principal `<main>`.

```html
<body>
    <div class="app-layout">
        <!-- AQUI A MÁGICA ACONTECE -->
        <ge-sidebar
            user-name="João Silva"
            role="Mecânico Chefe"
            type="mecanico"
        >
        </ge-sidebar>

        <!-- O resto do conteúdo da sua página vai aqui -->
        <main class="main-content">
            <h1>Minha Página</h1>
            <p>Conteúdo isolado que rola independentemente da Sidebar.</p>
        </main>
    </div>

    <!-- IMPORTAÇÃO DO SCRIPT NO FINAL DO BODY -->
    <!-- O caminho muda dependendo de onde o seu HTML está salvo. -->
    <script src="../../js/components/Sidebar.js"></script>
</body>
```

## Passo 3: Entendendo os Atributos

A customização da tag `<ge-sidebar>` é feita via atributos HTML diretos. Veja para que serve cada um:

- **user-name="Seu Nome"**
  Define o nome que aparece na foto inferior (avatar).
  _Atenção:_ O componente corta nomes que passem de 12 caracteres automaticamente, garantindo que o ícone de logout para computador / celular não quebre o layout.
- **role="Seu Cargo"**
  Define como o cargo será escrito de fato na tela. Pode ser texto livre (Acesso Pleno, Recepcionista, Dono).

- **type="tipo_de_acesso"** ⚠️
  **Importante!** Esse campo dita as regras do tema de cores e quais links irão aparecer!
  Você DEVE colocar um desses exatos três valores (tudo em minúsculo):
    1. "mecanico" -> Cor _Laranja_. Mostra links de Dashboard e OS.
    2. "admin" -> Cor _Azul Claro_. Mostra Dashboard, Clientes, Veículos e OS.
    3. "proprietario" -> Cor _Azul Escuro_. Mostra tudo do Admin + Relatórios.

## Resumo de Navegação de Pastas (Para quem for copiar/colar) 🗂️

Na estrutura atual separada por pastas:

```text
src/
  js/
    components/
      Sidebar.js
  pages/
    mecanico/
      dashboard.html
```

Como o HTML `dashboard.html` está duas pastas "para dentro" (`pages/mecanico`), para alcançar o `Sidebar.js`, usamos `../../` (volta duas pastas no sistema de arquivos) nas tags da página.

- O Caminho da tag final do script em suas páginas deve ser:
  `<script src="../../js/components/Sidebar.js"></script>`
