/**
 * Componente customizado (Web Component) da Barra Lateral (Sidebar) do sistema Garage ERP.
 * Utiliza o Shadow DOM para garantir o encapsulamento do estilo e do layout, não vazando ou sofrendo interferências externas.
 *
 * Atributos suportados no HTML:
 * - user-name: O nome principal do usuário logado (ex: "Roberto").
 * - role: Título exato da função desempenhada (ex: "Mecânico Geral").
 * - type: Chave permissiva do tipo de hierarquia ("mecanico", "admin", "proprietario").
 */
class GarageErpSidebar extends HTMLElement {
    constructor() {
        super();
        // Preserva encapsulamento local do estilo CSS e HTML DOM nodes.
        this.attachShadow({ mode: "open" });
    }

    /**
     * Lifecycle nativo focado em inicializações a partir do momento
     * em que o componente é adicionado a tela.
     */
    connectedCallback() {
        const rawName = this.getAttribute("user-name") || "Usuário";

        // Evita o limite do layout e cortes em UI se o nome vindo do banco/API for demasiado grande
        this.name =
            rawName.length > 12 ? rawName.substring(0, 12) + "..." : rawName;

        this.role = this.getAttribute("role") || "Acesso";
        this.type = this.getAttribute("type") || "mecanico";

        // Forma o avatar do menu isolando sempre a letra inicial de destaque
        this.avatar = this.name.charAt(0).toUpperCase();

        this.render();
        this.attachEvents();
    }

    /**
     * Resgata o SVG vetorial relacionado graficamente ao tipo hierárquico do respectivo nível.
     * @param {string} type Referência em qualificação do funcionário
     */
    getRoleIcon(type) {
        const icons = {
            mecanico: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.2387 5.24518C12.0862 5.40081 12.0007 5.61005 12.0007 5.82798C12.0007 6.0459 12.0862 6.25514 12.2387 6.41077L13.5708 7.74288C13.7265 7.89543 13.9357 7.98087 14.1536 7.98087C14.3716 7.98087 14.5808 7.89543 14.7364 7.74288L17.8752 4.6041C18.2939 5.52924 18.4206 6.56 18.2386 7.559C18.0566 8.55801 17.5744 9.47782 16.8564 10.1959C16.1384 10.9139 15.2185 11.396 14.2195 11.5781C13.2205 11.7601 12.1898 11.6333 11.2646 11.2147L5.5116 16.9677C5.18039 17.2989 4.73116 17.485 4.26275 17.485C3.79434 17.485 3.34512 17.2989 3.0139 16.9677C2.68269 16.6365 2.49661 16.1873 2.49661 15.7189C2.49661 15.2505 2.68269 14.8012 3.0139 14.47L8.76694 8.71698C8.34829 7.79184 8.22154 6.76109 8.40356 5.76208C8.58558 4.76308 9.06773 3.84327 9.78577 3.12523C10.5038 2.4072 11.4236 1.92504 12.4226 1.74302C13.4216 1.561 14.4524 1.68776 15.3775 2.1064L12.2471 5.23685L12.2387 5.24518Z" stroke="var(--profile-color)" stroke-width="1.66513" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

            admin: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3211 16.6512V3.33017C13.3211 2.88855 13.1456 2.46502 12.8334 2.15275C12.5211 1.84047 12.0976 1.66504 11.6559 1.66504H8.32567C7.88405 1.66504 7.46051 1.84047 7.14824 2.15275C6.83597 2.46502 6.66053 2.88855 6.66053 3.33017V16.6512" stroke="var(--profile-color)" stroke-width="1.66513" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.6513 4.99536H3.33027C2.41064 4.99536 1.66513 5.74087 1.66513 6.66049V14.9862C1.66513 15.9058 2.41064 16.6513 3.33027 16.6513H16.6513C17.571 16.6513 18.3165 15.9058 18.3165 14.9862V6.66049C18.3165 5.74087 17.571 4.99536 16.6513 4.99536Z" stroke="var(--profile-color)" stroke-width="1.66513" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

            proprietario: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6513 10.8234C16.6513 14.9862 13.7373 17.0676 10.2739 18.2748C10.0925 18.3363 9.8955 18.3334 9.71605 18.2665C6.24425 17.0676 3.33027 14.9862 3.33027 10.8234V4.99541C3.33027 4.7746 3.41798 4.56283 3.57412 4.40669C3.73025 4.25056 3.94202 4.16284 4.16283 4.16284C5.82797 4.16284 7.90938 3.16376 9.35805 1.89826C9.53443 1.74756 9.75881 1.66476 9.9908 1.66476C10.2228 1.66476 10.4472 1.74756 10.6235 1.89826C12.0805 3.17208 14.1536 4.16284 15.8188 4.16284C16.0396 4.16284 16.2513 4.25056 16.4075 4.40669C16.5636 4.56283 16.6513 4.7746 16.6513 4.99541V10.8234Z" stroke="var(--profile-color)" stroke-width="1.66513" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        };
        return icons[type] || icons.mecanico;
    }

    /**
     * Fornece o esquema visual base de tema (Cor principal, fundo sútil e contorno) por perfis de acesso.
     * @param {string} type Referência em qualificação
     */
    getRoleStyles(type) {
        const styles = {
            mecanico: {
                color: "#F59E0B",
                bg: "rgba(245, 158, 11, 0.12)",
                border: "rgba(245, 158, 11, 0.3)",
            },
            admin: {
                color: "#60A5FA",
                bg: "rgba(59, 130, 246, 0.12)",
                border: "rgba(59, 130, 246, 0.3)",
            },
            proprietario: {
                color: "#2563EB",
                bg: "rgba(37, 99, 235, 0.12)",
                border: "rgba(37, 99, 235, 0.3)",
            },
        };
        return styles[type] || styles.mecanico;
    }

    /**
     * Devolve as opções da Sidebar permitidas que serão visíveis de acordo com cada papel do usuário.
     * @param {string} type Referência do cargo ou tipo registrado
     */
    getNavLinks(type) {
        const svgs = {
            dashboard: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.99755 2.99927H3.99891C3.44677 2.99927 2.99918 3.44686 2.99918 3.999V10.9971C2.99918 11.5492 3.44677 11.9968 3.99891 11.9968H8.99755C9.54969 11.9968 9.99728 11.5492 9.99728 10.9971V3.999C9.99728 3.44686 9.54969 2.99927 8.99755 2.99927Z" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.9946 2.99927H14.9959C14.4438 2.99927 13.9962 3.44686 13.9962 3.999V6.99818C13.9962 7.55032 14.4438 7.99791 14.9959 7.99791H19.9946C20.5467 7.99791 20.9943 7.55032 20.9943 6.99818V3.999C20.9943 3.44686 20.5467 2.99927 19.9946 2.99927Z" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.9946 11.9968H14.9959C14.4438 11.9968 13.9962 12.4444 13.9962 12.9966V19.9947C13.9962 20.5468 14.4438 20.9944 14.9959 20.9944H19.9946C20.5467 20.9944 20.9943 20.5468 20.9943 19.9947V12.9966C20.9943 12.4444 20.5467 11.9968 19.9946 11.9968Z" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.99755 15.9956H3.99891C3.44677 15.9956 2.99918 16.4432 2.99918 16.9953V19.9945C2.99918 20.5467 3.44677 20.9943 3.99891 20.9943H8.99755C9.54969 20.9943 9.99728 20.5467 9.99728 19.9945V16.9953C9.99728 16.4432 9.54969 15.9956 8.99755 15.9956Z" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

            clientes: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.9957 20.9943V18.9949C15.9957 17.9343 15.5744 16.9171 14.8244 16.1672C14.0745 15.4173 13.0573 14.9959 11.9968 14.9959H5.99838C4.9378 14.9959 3.92066 15.4173 3.17072 16.1672C2.42077 16.9171 1.99946 17.9343 1.99946 18.9949V20.9943" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.99756 10.997C11.2061 10.997 12.9965 9.20663 12.9965 6.99809C12.9965 4.78955 11.2061 2.99918 8.99756 2.99918C6.78902 2.99918 4.99865 4.78955 4.99865 6.99809C4.99865 9.20663 6.78902 10.997 8.99756 10.997Z" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/><path d="M21.994 20.9943V18.9949C21.9934 18.1088 21.6985 17.2481 21.1556 16.5478C20.6128 15.8476 19.8528 15.3474 18.9949 15.1259" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.9957 3.12915C16.8558 3.34939 17.6183 3.84966 18.1627 4.55108C18.7072 5.25249 19.0027 6.11517 19.0027 7.0031C19.0027 7.89103 18.7072 8.75371 18.1627 9.45513C17.6183 10.1565 16.8558 10.6568 15.9957 10.8771" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

            veiculos: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.9949 16.9954H20.9943C21.5942 16.9954 21.994 16.5955 21.994 15.9957V12.9965C21.994 12.0967 21.2942 11.2969 20.4944 11.097C18.6949 10.5971 15.9957 9.9973 15.9957 9.9973C15.9957 9.9973 14.696 8.59767 13.7963 7.69792C13.2964 7.29803 12.6966 6.99811 11.9968 6.99811H4.99865C4.39881 6.99811 3.89895 7.398 3.59903 7.89786L2.19941 10.7971C2.06702 11.1832 1.99946 11.5886 1.99946 11.9968V15.9957C1.99946 16.5955 2.39935 16.9954 2.99919 16.9954H4.99865" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.99811 18.9949C8.10238 18.9949 8.99756 18.0997 8.99756 16.9954C8.99756 15.8911 8.10238 14.9959 6.99811 14.9959C5.89384 14.9959 4.99865 15.8911 4.99865 16.9954C4.99865 18.0997 5.89384 18.9949 6.99811 18.9949Z" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.99756 16.9954H14.9959" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.9954 18.9949C18.0997 18.9949 18.9949 18.0997 18.9949 16.9954C18.9949 15.8911 18.0997 14.9959 16.9954 14.9959C15.8911 14.9959 14.9959 15.8911 14.9959 16.9954C14.9959 18.0997 15.8911 18.9949 16.9954 18.9949Z" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

            os: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.9959 1.99951H8.99756C8.44543 1.99951 7.99783 2.44711 7.99783 2.99924V4.9987C7.99783 5.55083 8.44543 5.99843 8.99756 5.99843H14.9959C15.5481 5.99843 15.9957 5.55083 15.9957 4.9987V2.99924C15.9957 2.44711 15.5481 1.99951 14.9959 1.99951Z" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.9957 3.99902H17.9951C18.5254 3.99902 19.034 4.20968 19.409 4.58465C19.7839 4.95962 19.9946 5.46819 19.9946 5.99848V19.9947C19.9946 20.525 19.7839 21.0335 19.409 21.4085C19.034 21.7835 18.5254 21.9941 17.9951 21.9941H5.99839C5.4681 21.9941 4.95953 21.7835 4.58456 21.4085C4.20959 21.0335 3.99893 20.525 3.99893 19.9947V5.99848C3.99893 5.46819 4.20959 4.95962 4.58456 4.58465C4.95953 4.20968 5.4681 3.99902 5.99839 3.99902H7.99785" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.9968 10.9971H15.9957" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.9968 15.9956H15.9957" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.99783 10.9971H8.00783" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.99783 15.9956H8.00783" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

            relatorios: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.99919 2.99918V18.9948C2.99919 19.5251 3.20985 20.0337 3.58482 20.4087C3.95979 20.7836 4.46836 20.9943 4.99865 20.9943H20.9943" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.9951 16.9954V8.99756" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.9965 16.9954V4.99866" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.99783 16.9962V13.9962" stroke="currentColor" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        };

        const links = {
            mecanico: [
                { label: "Dashboard", icon: svgs.dashboard, url: "dashboard" },
                {
                    label: "Ordens de Serviço",
                    icon: svgs.os,
                    url: "ordens-de-servico",
                },
            ],
            admin: [
                { label: "Dashboard", icon: svgs.dashboard, url: "dashboard" },
                { label: "Clientes", icon: svgs.clientes, url: "clientes" },
                { label: "Veículos", icon: svgs.veiculos, url: "veiculos" },
                {
                    label: "Ordens de Serviço",
                    icon: svgs.os,
                    url: "ordens-de-servico",
                },
            ],
            proprietario: [
                { label: "Dashboard", icon: svgs.dashboard, url: "dashboard" },
                { label: "Clientes", icon: svgs.clientes, url: "clientes" },
                { label: "Veículos", icon: svgs.veiculos, url: "veiculos" },
                {
                    label: "Ordens de Serviço",
                    icon: svgs.os,
                    url: "ordens-de-servico",
                },
                {
                    label: "Relatórios",
                    icon: svgs.relatorios,
                    url: "relatorios",
                },
            ],
        };
        return links[type] || links.mecanico;
    }

    /**
     * Constrói efetivamente todo o esquema do componente injetando os estilizadores globais
     * focados e adaptados para tanto a visão Mobile inteira quanto o visual Desktop de acompanhamento.
     */
    render() {
        const roleIconSvg = this.getRoleIcon(this.type);
        const navLinks = this.getNavLinks(this.type);
        const roleStyles = this.getRoleStyles(this.type);

        this.shadowRoot.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

                :host {
                    display: block;
                    position: sticky;
                    top: 0;
                    height: 100vh;
                    height: 100dvh;
                    z-index: 50;
                    --sidebar-bg: #1f2937;
                    --sidebar-border: #374151;
                    --text-primary: #f9fafb;
                    --text-muted: rgba(249, 250, 251, 0.6);
                    --text-soft: rgba(249, 250, 251, 0.8);
                    --profile-border: ${roleStyles.border};
                    --profile-bg: ${roleStyles.bg};
                    --profile-color: ${roleStyles.color};
                    --active-link-bg: #2563eb;
                    --active-link-border: #60a5fa;
                    --avatar-bg: rgba(249, 250, 251, 0.12);
                    --avatar-border: rgba(249, 250, 251, 0.2);
                }

                * { 
                    box-sizing: border-box; 
                    font-family: "Inter", sans-serif; 
                }

                .container {
                    display: flex;
                    height: 100%;
                }

                .mobile-header {
                    display: none;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 12px;
                    background: rgba(248, 249, 250, 0.7);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-bottom: 1.25px solid #e5e7eb;
                    padding: 16px 16px 17px 16px;
                    width: 100vw;
                    box-sizing: border-box;
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 20;
                }

                .mobile-header .brand-text { 
                    color: #1f2937; 
                    display: flex; 
                    align-items: center; 
                    font-size: 20px; 
                    font-weight: 600; 
                    line-height: 30px; 
                    letter-spacing: normal; 
                    margin: 0; 
                    margin-top: -2px; 
                }
                
                .mobile-header .menu-btn { 
                    color: #1f2937; 
                    margin: 0; 
                    padding: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .menu-btn {
                    touch-action: manipulation;     /* remove delay de 300ms do browser */
                    transition: background 0.15s ease, transform 0.15s ease, color 0.15s ease;
                    -webkit-tap-highlight-color: transparent;
                }

                .menu-btn:active {
                    transform: scale(0.88);
                    background: rgba(31, 41, 55, 0.08);
                    border-radius: 8px;
                    transition: background 0s, transform 0s, color 0s;
                }

                .sidebar {
                    width: 255px;
                    height: 100vh;
                    height: 100dvh;
                    border-right: 1.25px solid var(--sidebar-border);
                    background: var(--sidebar-bg);
                    display: flex;
                    flex-direction: column;
                    flex-shrink: 0;
                    transition: transform 0.3s ease;
                }

                .sidebar-header {
                    height: 105px;
                    border-bottom: 1.25px solid var(--sidebar-border);
                    padding: 24px 24px 25px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 12px;
                    box-sizing: border-box;
                }

                .brand { 
                    display: flex; 
                    align-items: center; 
                    gap: 12px; 
                    flex: 1; 
                }

                .brand-logo { 
                    width: 56px; 
                    height: 56px; 
                    border-radius: 12px; 
                    display: grid; 
                    place-items: center; 
                    background: #ffffff; 
                    border: 1.25px solid var(--sidebar-border); 
                    box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.1), 0px 2px 4px 0px rgba(0,0,0,0.1); 
                }

                .brand-logo img { 
                    width: 34px; 
                    height: 34px; 
                    filter: none; 
                    object-fit: contain; 
                }
                
                .brand-text { 
                    display: flex; 
                    flex-direction: column; 
                    gap: 0px; 
                }
                
                .brand-text strong { 
                    color: var(--text-primary); 
                    font-size: 18px; 
                    font-weight: 700; 
                    line-height: 28px; 
                    margin-top: -2px; 
                }
                
                .brand-text span { 
                    color: var(--text-muted); 
                    font-size: 12px; 
                    font-weight: 400; 
                    line-height: 16px; 
                }

                .menu-btn, .close-menu { 
                    width: 40px; 
                    height: 40px; 
                    border: 0; 
                    border-radius: 8px; 
                    background: transparent; 
                    color: var(--text-soft); 
                    cursor: pointer; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                }

                .close-menu { 
                    display: none; 
                }

                .role-card {
                    margin: 16px; 
                    min-height: 66px; 
                    padding: 13px; 
                    border: 1px solid var(--profile-border);
                    border-radius: 8px; 
                    background: var(--profile-bg); 
                    display: flex; 
                    align-items: center; 
                    gap: 12px;
                }
                
                .role-card svg { 
                    width: 24px; 
                    height: 24px; 
                }

                .role-card strong { 
                    display: block; 
                    color: var(--profile-color); 
                    font-size: 16px; 
                    font-weight: 600; 
                    line-height: 24px; 
                    text-transform: capitalize; 
                }

                .role-card span { 
                    color: var(--text-muted); 
                    font-size: 12px; 
                    font-weight: 400; 
                    line-height: 16px; 
                }

                .sidebar-nav { 
                    padding: 0 16px; 
                    flex: 1; 
                    overflow-y: auto;
                }
                
                .sidebar-nav ul { 
                    margin: 0; 
                    padding: 0; 
                    list-style: none; 
                    display: flex; 
                    flex-direction: column; 
                    gap: 8px; 
                }
                
                .nav-link {
                    min-height: 60px; 
                    border: 1px solid transparent; 
                    border-radius: 10px; 
                    padding: 0 16px;
                    text-decoration: none; 
                    color: var(--text-soft); 
                    font-size: 18px; 
                    font-weight: 400; 
                    line-height: 24px;
                    display: flex; 
                    align-items: center; 
                    gap: 16px; 
                    cursor: pointer; 
                    transition: background 0.2s;
                    -webkit-tap-highlight-color: transparent;
                }
                
                .nav-link:hover { 
                    background: rgba(255,255,255,0.05); 
                }
                
                .nav-link svg { 
                    width: 28px; 
                    height: 28px; 
                    flex-shrink: 0; 
                }

                .nav-link.active, .nav-link[aria-current="page"] {
                    color: #ffffff; 
                    border-color: var(--active-link-border); 
                    background: var(--active-link-bg); 
                    font-weight: 500;
                }

                .sidebar-footer {
                    border-top: 1px solid var(--sidebar-border); 
                    padding: 16px; 
                    display: flex; 
                    align-items: center;
                    justify-content: space-between; 
                    gap: 12px; 
                    min-height: 56px;
                }

                .user-info { 
                    min-height: 40px; 
                    display: flex; 
                    align-items: center; 
                    gap: 12px; 
                    flex: 1; 
                }
                
                .avatar {
                    width: 40px; 
                    height: 40px; 
                    border: 1px solid var(--avatar-border); 
                    border-radius: 999px;
                    background: var(--avatar-bg); 
                    color: var(--text-primary); 
                    font-size: 18px; 
                    font-weight: 600;
                    display: grid; 
                    place-items: center; 
                    text-transform: uppercase;
                }

                .user-info strong { 
                    display: block; 
                    color: var(--text-primary); 
                    font-size: 16px; 
                    font-weight: 500; 
                    line-height: 24px; 
                    overflow: hidden; 
                    text-overflow: ellipsis; 
                    white-space: nowrap; 
                }
                
                .user-info span { 
                    color: var(--text-muted); 
                    font-size: 12px; 
                    font-weight: 400; 
                    line-height: 16px; 
                    text-transform: capitalize; 
                }
                
                .user-info > div { 
                    min-width: 0; 
                }

                .logout { 
                    width: 36px; 
                    height: 36px; 
                    border: 0; 
                    border-radius: 8px;
                    background: transparent; 
                    color: var(--text-soft); 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    padding: 0;
                    cursor: pointer; 
                    font-size: 0; 
                    overflow: hidden;
                    transition: background 0.2s, color 0.2s;
                }

                .logout:hover { 
                    background: rgba(255, 255, 255, 0.05); 
                    color: #ffffff;
                }

                .logout svg { 
                    width: 20px; 
                    height: 20px; 
                }

                .logout-label { 
                    display: none; 
                }

                .overlay {
                    display: none;
                    position: fixed; 
                    inset: 0; 
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                    -webkit-backdrop-filter: blur(4px);
                    z-index: 30;
                    opacity: 0; 
                    transition: opacity 0.3s ease;
                }

                @media (max-width: 760px) {
                    :host { 
                        height: auto; 
                        position: static; 
                        display: block; 
                    }

                    .mobile-header { 
                        display: flex; 
                    }
                    
                    .sidebar {
                        position: fixed; 
                        top: 0; 
                        left: 0; 
                        z-index: 40;
                        transform: translateX(-100%);
                    }
                    
                    .sidebar.open { 
                        transform: translateX(0); 
                    }

                    .sidebar-footer { 
                        flex-direction: column; 
                        align-items: stretch; 
                    }

                    .close-menu {
                        display: flex; 
                        color: var(--text-primary);
                        width: 36px;
                        height: 36px;
                        border-radius: 8px;
                        touch-action: manipulation;     /* remove delay de 300ms do browser */
                        transition: background 0.15s ease, transform 0.15s ease, color 0.15s ease;
                        -webkit-tap-highlight-color: transparent;
                    }

                    .close-menu:active {
                        background: rgba(255, 255, 255, 0.05);
                        color: #ffffff;
                        transition: background 0s, transform 0s, color 0s;
                    }
                    
                    .logout { 
                        width: 100%; 
                        min-height: 48px; 
                        border: 1px solid var(--sidebar-border); 
                        border-radius: 8px; 
                        background: rgba(249, 250, 251, 0.03); 
                        padding: 0 16px; 
                        gap: 8px; 
                        font-size: 16px; 
                        font-weight: 600; 
                        overflow: visible; 
                        margin-top: 16px;
                        -webkit-tap-highlight-color: transparent;
                        touch-action: manipulation;     /* remove delay de 300ms do browser */
                        transition: background 0.15s ease, transform 0.15s ease, color 0.15s ease;
                    }
                    
                    .logout:active {
                        background: rgba(255, 255, 255, 0.05);
                        color: #ffffff;
                        transition: background 0s, transform 0s, color 0s;
                    }
                    
                    .logout-label { 
                        display: inline; 
                        font-weight: 500; 
                        color: var(--text-soft); 
                    }

                    .overlay.open { 
                        display: block; 
                        opacity: 1; 
                    }
                }
            </style>
      
            <div class="mobile-header">
                <button class="menu-btn" type="button" aria-label="Abrir menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.99902 5.99829H19.9947M3.99902 11.9967H19.9947M3.99902 17.995H19.9947" stroke="#1F2937" stroke-width="1.99946" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <h2 class="brand-text">GarageERP</h2>
            </div>

            <div class="overlay" aria-hidden="true"></div>

            <aside class="sidebar" aria-label="Barra lateral">
                <header class="sidebar-header">
                    <div class="brand">
                        <div class="brand-logo" aria-hidden="true">
                            <img src="../../assets/img/logo-garageerp.png" alt="Logo GarageERP" />
                        </div>
                        <div class="brand-text">
                            <strong>GarageERP</strong>
                            <span>Sistema de Gestão</span>
                        </div>
                    </div>
                    <button class="close-menu" type="button" aria-label="Fechar menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </header>

                <section class="role-card" aria-label="Perfil de acesso">
                    ${roleIconSvg}
                    <div>
                        <strong>${this.role}</strong>
                        <span>Perfil de acesso</span>
                    </div>
                </section>

                <nav class="sidebar-nav" aria-label="Navegação principal">
                    <ul>
                        ${navLinks
                            .map((link) => {
                                const currentPath = window.location.pathname;
                                // Marca como ativo se a URL atual contiver o nome do link, ou se estiver na raiz e for o dashboard
                                const isActive =
                                    currentPath.includes(link.url) ||
                                    (currentPath.endsWith("/") &&
                                        link.url === "dashboard")
                                        ? "active"
                                        : "";
                                return `
                                    <li>
                                        <a class="nav-link ${isActive}" href="${link.url}.html">
                                        ${link.icon}
                                        ${link.label}
                                        </a>
                                    </li>
                                    `;
                            })
                            .join("")}
                    </ul>
                </nav>

                <footer class="sidebar-footer">
                    <div class="user-info">
                        <div class="avatar" aria-hidden="true">${this.avatar}</div>
                        <div>
                            <strong>${this.name}</strong>
                            <span>${this.role}</span>
                        </div>
                    </div>
                    <button class="logout" type="button" title="Sair">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.4931 17.4839H4.16284C3.72122 17.4839 3.29768 17.3085 2.98541 16.9962C2.67314 16.6839 2.4977 16.2604 2.4977 15.8188V4.16284C2.4977 3.72122 2.67314 3.29769 2.98542 2.98542C3.29768 2.67314 3.72122 2.49771 4.16284 2.49771H7.4931" stroke="currentColor" stroke-width="1.66513" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.3211 14.1536L17.4839 9.99081L13.3211 5.82797" stroke="currentColor" stroke-width="1.66513" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17.4839 9.99081H7.4931" stroke="currentColor" stroke-width="1.66513" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="logout-label">Sair</span>
                    </button>
                </footer>
            </aside>
        `;
    }

    /**
     * Associa manipuladores de eventos após a finalização da renderização do conteúdo (HTML Inject).
     * Lida principalmente com as camadas transicionais (overlay/Sidebar mobile).
     */
    attachEvents() {
        const sidebar = this.shadowRoot.querySelector(".sidebar");
        const overlay = this.shadowRoot.querySelector(".overlay");
        const menuBtn = this.shadowRoot.querySelector(".menu-btn");
        const closeBtn = this.shadowRoot.querySelector(".close-menu");
        const logoutBtn = this.shadowRoot.querySelector(".logout");

        // Alternar visibilidade das camadas Mobile do menu Sidebar por meio de atribuições via classes
        const toggleMenu = () => {
            sidebar.classList.toggle("open");
            overlay.classList.toggle("open");
        };

        // Associa eventos de clique nos elementos chaves para acionar/recolher
        if (menuBtn) menuBtn.addEventListener("click", toggleMenu);
        if (closeBtn) closeBtn.addEventListener("click", toggleMenu);
        if (overlay) overlay.addEventListener("click", toggleMenu);

        // Ação de Logout: Redireciona para o login base
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                // FEAT: No futuro, adicionar limpeza de tokens (ex: localStorage.removeItem('authToken'))
                window.location.href = "../../index.html";
            });
        }
    }
}

// Registro global do WebComponent para o uso por marcadores de elementos '<ge-sidebar>'
customElements.define("ge-sidebar", GarageErpSidebar);
