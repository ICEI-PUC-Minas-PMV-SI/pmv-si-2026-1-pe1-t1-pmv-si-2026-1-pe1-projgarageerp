/* Alertas das funionalidades do Cliente */
/**
 * Exibe um banner/toast de aviso no topo da tela com auto-ocultamento em 5 segundos.
 * @param {string} mensagem - Texto a ser exibido.
 * @param {string} tipo - 'success' (sucesso, verde), 'danger'/'error' (erro, vermelho) ou 'warning' (aviso, amarelo).
 * @param {number} duracao - Tempo de exibição em milissegundos (padrão: 5000).
 */
window.customAlert = function (mensagem, tipo = "warning", duracao = 5000) {
    let container = document.getElementById("custom-toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "custom-toast-container";
        container.style.position = "fixed";
        container.style.top = "24px";
        container.style.left = "50%";
        container.style.transform = "translateX(-50%)";
        container.style.zIndex = "10000";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "12px";
        container.style.width = "90%";
        container.style.maxWidth = "450px";
        container.style.pointerEvents = "none";
        document.body.appendChild(container);
    }

    // Se já existir um aviso na tela, remove ele na hora antes de mostrar o novo
    if (container.children.length > 0) {
        Array.from(container.children).forEach((oldToast) => {
            oldToast.remove(); // Limpa imediatamente sem esperar a transição acabar
        });
    }

    const toast = document.createElement("div");
    toast.style.pointerEvents = "auto";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.gap = "12px";
    toast.style.padding = "16px 20px";
    toast.style.borderRadius = "8px";
    toast.style.boxShadow =
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
    toast.style.fontFamily = '"Inter", sans-serif';
    toast.style.fontSize = "14px";
    toast.style.fontWeight = "500";
    toast.style.lineHeight = "1.5";
    toast.style.color = "#1f2937";
    toast.style.backgroundColor = "#ffffff";
    toast.style.borderLeft = "4px solid #f59e0b";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-20px)";
    toast.style.transition = "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)";

    let iconSvg = "";
    if (tipo === "success") {
        toast.style.borderLeftColor = "#10b981";
        iconSvg = `
            <div style="background-color: #d1fae5; color: #059669; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 16px; height: 16px;">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </div>
        `;
    } else if (tipo === "danger" || tipo === "error") {
        toast.style.borderLeftColor = "#ef4444";
        iconSvg = `
            <div style="background-color: #fee2e2; color: #dc2626; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 16px; height: 16px;">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        `;
    } else {
        toast.style.borderLeftColor = "#f59e0b";
        iconSvg = `
            <div style="background-color: #fef3c7; color: #d97706; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 16px; height: 16px;">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
        `;
    }

    toast.innerHTML = `
        ${iconSvg}
        <div style="flex-grow: 1;">${mensagem}</div>
        <button style="background: none; border: none; color: #9ca3af; cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; transition: color 0.2s;" onmouseover="this.style.color='#4b5563'" onmouseout="this.style.color='#9ca3af'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 16px; height: 16px;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    `;

    const closeBtn = toast.querySelector("button");
    closeBtn.addEventListener("click", () => {
        removerToast();
    });

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    });

    let autoHideTimeout = setTimeout(() => {
        removerToast();
    }, duracao);

    function removerToast() {
        clearTimeout(autoHideTimeout);
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-20px)";
        toast.addEventListener("transitionend", () => {
            toast.remove();
            if (container.children.length === 0) {
                container.remove();
            }
        });
    }
};

/**
 * Exibe um modal central de confirmação estilo UI/UX, com opções de confirmar e cancelar.
 * @param {string} mensagem - O texto descritivo da ação.
 * @param {Function} callbackConfirm - Ação executada ao confirmar.
 * @param {Function} callbackCancel - Ação opcional executada ao cancelar.
 */
window.customConfirm = function (
    mensagem,
    callbackConfirm,
    callbackCancel = null,
) {
    const bannerContainer = document.createElement("div");
    bannerContainer.style.position = "fixed";
    bannerContainer.style.top = "0";
    bannerContainer.style.left = "0";
    bannerContainer.style.width = "100vw";
    bannerContainer.style.height = "100vh";
    bannerContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    bannerContainer.style.display = "flex";
    bannerContainer.style.justifyContent = "center";
    bannerContainer.style.alignItems = "center";
    bannerContainer.style.zIndex = "9999";
    bannerContainer.style.fontFamily = '"Inter", sans-serif';
    bannerContainer.style.opacity = "0";
    bannerContainer.style.transition = "opacity 0.2s ease-out";

    const bannerCard = document.createElement("div");
    bannerCard.style.backgroundColor = "#ffffff";
    bannerCard.style.padding = "28px 24px";
    bannerCard.style.borderRadius = "12px";
    bannerCard.style.maxWidth = "400px";
    bannerCard.style.width = "90%";
    bannerCard.style.textAlign = "center";
    bannerCard.style.boxShadow =
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
    bannerCard.style.transform = "scale(0.95)";
    bannerCard.style.transition = "transform 0.2s ease-out";

    const iconContainer = document.createElement("div");
    iconContainer.style.backgroundColor = "#fef3c7";
    iconContainer.style.color = "#d97706";
    iconContainer.style.width = "48px";
    iconContainer.style.height = "48px";
    iconContainer.style.borderRadius = "50%";
    iconContainer.style.display = "flex";
    iconContainer.style.justifyContent = "center";
    iconContainer.style.alignItems = "center";
    iconContainer.style.margin = "0 auto 16px";
    iconContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 24px; height: 24px;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    `;

    const title = document.createElement("h2");
    title.innerText = "Confirmação";
    title.style.fontSize = "18px";
    title.style.fontWeight = "600";
    title.style.color = "#111827";
    title.style.margin = "0 0 8px 0";

    const message = document.createElement("p");
    message.innerText = mensagem;
    message.style.fontSize = "14px";
    message.style.color = "#4b5563";
    message.style.margin = "0 0 24px 0";
    message.style.lineHeight = "1.5";

    const btnsContainer = document.createElement("div");
    btnsContainer.style.display = "flex";
    btnsContainer.style.gap = "12px";

    const btnCancelar = document.createElement("button");
    btnCancelar.innerText = "Cancelar";
    btnCancelar.style.backgroundColor = "#ffffff";
    btnCancelar.style.color = "#374151";
    btnCancelar.style.border = "1px solid #d1d5db";
    btnCancelar.style.padding = "10px 16px";
    btnCancelar.style.borderRadius = "6px";
    btnCancelar.style.fontWeight = "500";
    btnCancelar.style.cursor = "pointer";
    btnCancelar.style.flex = "1";
    btnCancelar.style.fontSize = "14px";
    btnCancelar.style.transition = "background-color 0.2s, border-color 0.2s";
    btnCancelar.onmouseover = () => {
        btnCancelar.style.backgroundColor = "#f9fafb";
        btnCancelar.style.borderColor = "#c5c9d1";
    };
    btnCancelar.onmouseout = () => {
        btnCancelar.style.backgroundColor = "#ffffff";
        btnCancelar.style.borderColor = "#d1d5db";
    };

    const btnConfirmar = document.createElement("button");
    btnConfirmar.innerText = "Confirmar";
    btnConfirmar.style.backgroundColor = "#dc2626";
    btnConfirmar.style.color = "#ffffff";
    btnConfirmar.style.border = "none";
    btnConfirmar.style.padding = "10px 16px";
    btnConfirmar.style.borderRadius = "6px";
    btnConfirmar.style.fontWeight = "500";
    btnConfirmar.style.cursor = "pointer";
    btnConfirmar.style.flex = "1";
    btnConfirmar.style.fontSize = "14px";
    btnConfirmar.style.transition = "background-color 0.2s";
    btnConfirmar.onmouseover = () => {
        btnConfirmar.style.backgroundColor = "#b91c1c";
    };
    btnConfirmar.onmouseout = () => {
        btnConfirmar.style.backgroundColor = "#dc2626";
    };

    if (
        !mensagem.toLowerCase().includes("excluir") &&
        !mensagem.toLowerCase().includes("remover")
    ) {
        btnConfirmar.style.backgroundColor = "#2563eb";
        btnConfirmar.onmouseover = () => {
            btnConfirmar.style.backgroundColor = "#1d4ed8";
        };
        btnConfirmar.onmouseout = () => {
            btnConfirmar.style.backgroundColor = "#2563eb";
        };
        iconContainer.style.backgroundColor = "#dbeafe";
        iconContainer.style.color = "#2563eb";
        iconContainer.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 24px; height: 24px;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
        `;
    }

    const fecharModal = () => {
        bannerContainer.style.opacity = "0";
        bannerCard.style.transform = "scale(0.95)";
        bannerContainer.addEventListener(
            "transitionend",
            () => {
                bannerContainer.remove();
            },
            { once: true },
        );
    };

    btnCancelar.onclick = () => {
        fecharModal();
        if (callbackCancel) callbackCancel();
    };

    btnConfirmar.onclick = () => {
        fecharModal();
        if (callbackConfirm) callbackConfirm();
    };

    btnsContainer.appendChild(btnCancelar);
    btnsContainer.appendChild(btnConfirmar);
    bannerCard.appendChild(iconContainer);
    bannerCard.appendChild(title);
    bannerCard.appendChild(message);
    bannerCard.appendChild(btnsContainer);
    bannerContainer.appendChild(bannerCard);
    document.body.appendChild(bannerContainer);

    requestAnimationFrame(() => {
        bannerContainer.style.opacity = "1";
        bannerCard.style.transform = "scale(1)";
    });
};

/**
 * Exibe um banner de tela cheia informando que o acesso é restrito.
 * Substitui o conteúdo da página para garantir segurança visual.
 */
window.showAccessDeniedBanner = function () {
    // Limpa o conteúdo da página atual para não exibir nada não autorizado
    document.body.innerHTML = "";
    document.body.style.overflow = "hidden";

    // Cria o container do banner
    const bannerContainer = document.createElement("div");
    bannerContainer.style.position = "fixed";
    bannerContainer.style.top = "0";
    bannerContainer.style.left = "0";
    bannerContainer.style.width = "100vw";
    bannerContainer.style.height = "100vh";
    bannerContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    bannerContainer.style.display = "flex";
    bannerContainer.style.justifyContent = "center";
    bannerContainer.style.alignItems = "center";
    bannerContainer.style.zIndex = "9999";
    bannerContainer.style.fontFamily = '"Inter", sans-serif';

    // Cria o card do banner
    const bannerCard = document.createElement("div");
    bannerCard.style.backgroundColor = "#ffffff";
    bannerCard.style.padding = "24px";
    bannerCard.style.borderRadius = "8px";
    bannerCard.style.maxWidth = "400px";
    bannerCard.style.width = "90%";
    bannerCard.style.textAlign = "center";
    bannerCard.style.boxShadow =
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";

    // Ícone de alerta (vermelho)
    const iconContainer = document.createElement("div");
    iconContainer.style.backgroundColor = "#fee2e2";
    iconContainer.style.color = "#dc2626";
    iconContainer.style.width = "48px";
    iconContainer.style.height = "48px";
    iconContainer.style.borderRadius = "50%";
    iconContainer.style.display = "flex";
    iconContainer.style.justifyContent = "center";
    iconContainer.style.alignItems = "center";
    iconContainer.style.margin = "0 auto 16px";
    iconContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 24px; height: 24px;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    `;

    // Título
    const title = document.createElement("h2");
    title.innerText = "Acesso Restrito";
    title.style.fontSize = "20px";
    title.style.fontWeight = "600";
    title.style.color = "#111827";
    title.style.margin = "0 0 8px 0";

    // Mensagem
    const message = document.createElement("p");
    message.innerText = "Você não tem permissão para acessar esta página.";
    message.style.fontSize = "14px";
    message.style.color = "#6b7280";
    message.style.margin = "0 0 24px 0";
    message.style.lineHeight = "1.5";

    // Botão de retornar
    const btnVoltar = document.createElement("button");
    btnVoltar.innerText = "Voltar para a página anterior";
    btnVoltar.style.backgroundColor = "#2563eb";
    btnVoltar.style.color = "#ffffff";
    btnVoltar.style.border = "none";
    btnVoltar.style.padding = "10px 20px";
    btnVoltar.style.borderRadius = "6px";
    btnVoltar.style.fontWeight = "500";
    btnVoltar.style.cursor = "pointer";
    btnVoltar.style.width = "100%";
    btnVoltar.style.fontSize = "14px";
    btnVoltar.style.transition = "background-color 0.2s";

    btnVoltar.onmouseover = function () {
        btnVoltar.style.backgroundColor = "#1d4ed8";
    };
    btnVoltar.onmouseout = function () {
        btnVoltar.style.backgroundColor = "#2563eb";
    };

    btnVoltar.onclick = function () {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            const perfil = localStorage.getItem("perfilLogado");
            if (perfil) {
                // Volta para a dashboard do usuário
                window.location.href = "../" + perfil + "/dashboard.html";
            } else {
                // Se nenhum logado, envia para login
                window.location.href = "../../index.html";
            }
        }
    };

    // Montar a estrutura
    bannerCard.appendChild(iconContainer);
    bannerCard.appendChild(title);
    bannerCard.appendChild(message);
    bannerCard.appendChild(btnVoltar);
    bannerContainer.appendChild(bannerCard);

    document.body.appendChild(bannerContainer);
};
