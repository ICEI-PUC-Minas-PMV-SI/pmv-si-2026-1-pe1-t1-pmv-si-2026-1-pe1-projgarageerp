/**
 * Controller - Novo Cliente
 *
 * Lida com o comportamento do formulario de criacao de cliente (novo-cliente.html).
 * Valida os campos e insere no LocalStorage atraves de ClienteStorage.
 */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".card-edicao");
    const btnCancelar = document.querySelector(".btn-cancelar");

    if (!form) return;

    const nomeInput =
        form.querySelector('input[placeholder="Digite o nome completo"]') ||
        form.querySelector('input[type="text"]');
    const telefoneInput = form.querySelector('input[type="tel"]');
    const emailInput = form.querySelector('input[type="email"]');

    // Capitalização inteligente do nome em tempo real (Title Case)
    if (nomeInput) {
        nomeInput.addEventListener("input", (e) => {
            const cursorPosition = e.target.selectionStart;
            let value = e.target.value;

            // Formata o nome para capitalizar a primeira letra de cada palavra
            let palavras = value.split(/(\s+)/);
            palavras = palavras.map((palavra) => {
                if (palavra.trim().length > 0) {
                    return (
                        palavra.charAt(0).toUpperCase() +
                        palavra.slice(1).toLowerCase()
                    );
                }
                return palavra;
            });

            e.target.value = palavras.join("");

            // Restaura a posição do cursor
            e.target.setSelectionRange(cursorPosition, cursorPosition);
        });
    }

    // Máscara inteligente para telefone (celular com 11 dígitos ou fixo com 10 dígitos)
    if (telefoneInput) {
        telefoneInput.setAttribute("maxLength", "15");

        telefoneInput.addEventListener("input", (e) => {
            let valor = e.target.value.replace(/\D/g, "");

            // Limita a no máximo 11 dígitos
            if (valor.length > 11) {
                valor = valor.slice(0, 11);
            }

            // Aplica a formatação dinâmica
            if (valor.length > 0) {
                if (valor.length <= 2) {
                    valor = `(${valor}`;
                } else if (valor.length <= 6) {
                    valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
                } else if (valor.length <= 10) {
                    valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 6)}-${valor.slice(6)}`;
                } else {
                    valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
                }
            }

            e.target.value = valor;
        });
    }

    // Manipula o envio do formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = nomeInput ? nomeInput.value.trim() : "";
        const telefone = telefoneInput ? telefoneInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";

        // Validacoes com customAlert
        if (!nome || !telefone || !email) {
            window.customAlert(
                "Por favor, preencha todos os campos obrigatórios (*).",
                "warning",
            );
            return;
        }

        // Validacao basica de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            window.customAlert(
                "Por favor, insira um endereço de e-mail válido.",
                "warning",
            );
            return;
        }

        // Valida se o telefone está completo (fixo ou celular)
        if (telefone.length < 14) {
            window.customAlert(
                "Por favor, insira um número de telefone celular ou fixo válido com DDD.",
                "warning",
            );
            return;
        }

        // Cria o cliente no localStorage
        const novoCliente = window.ClienteStorage.criar({
            nome,
            telefone,
            email,
        });

        // Salva notificação de sucesso pendente no sessionStorage e redireciona
        sessionStorage.setItem(
            "pendingToast",
            JSON.stringify({
                mensagem: "Cliente cadastrado com sucesso!",
                tipo: "success",
            }),
        );
        window.location.href =
            novoCliente && novoCliente.id
                ? `cliente.html?id=${novoCliente.id}`
                : "listar-clientes.html";
    });

    // Acao do botao cancelar
    if (btnCancelar) {
        btnCancelar.addEventListener("click", (e) => {
            e.preventDefault();
            // Se a página anterior for o dashboard, volta para lá. Caso contrário, vai para a listagem.
            if (
                document.referrer &&
                document.referrer.includes("dashboard.html")
            ) {
                window.location.href = "dashboard.html";
            } else {
                window.location.href = "listar-clientes.html";
            }
        });
    }
});
