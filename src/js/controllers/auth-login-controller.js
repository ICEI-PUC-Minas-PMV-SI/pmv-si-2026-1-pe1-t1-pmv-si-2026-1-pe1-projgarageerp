// Login
const form = document.getElementById("form-login");
const inputEmail = document.getElementById("input-email");
const inputSenha = document.getElementById("input-password");
const errorMessage = document.getElementById("error-message");

// Mostra o aviso de logout assim que o usuário é redirecionado para tela de login
const pendingToast = sessionStorage.getItem("pendingToast");
if (pendingToast) {
    try {
        const { mensagem, tipo } = JSON.parse(pendingToast);
        if (window.customAlert) {
            window.customAlert(mensagem, tipo);
        }
    } catch (e) {
        console.error("Erro ao processar notificação:", e);
    }
    // Apaga na hora para nunca mais repetir esse aviso por engano!
    sessionStorage.removeItem("pendingToast");
}

// Evita que o usuário tente preencher a senha sem o e-mail
if (inputSenha) {
    inputSenha.addEventListener("focus", function () {
        if (!inputEmail.value.trim()) {
            if (window.customAlert) {
                window.customAlert(
                    "Por favor, digite o seu e-mail primeiro.",
                    "warning",
                );
            }
            inputEmail.focus(); // Devolve o cursor para o e-mail
        }
    });
}

// Escuta o evento de envio do formulário
form.addEventListener("submit", function (evento) {
    evento.preventDefault(); // Impede a página de carregar

    const email = inputEmail.value.trim();
    const senha = inputSenha.value.trim();
    const textError = errorMessage.querySelector("p");

    // Reseta o estado de erro
    errorMessage.classList.remove("show");

    // Validações personalizadas (Substituindo o visual padrão do navegador)
    if (!email) {
        textError.innerText = "Por favor, digite o seu e-mail.";
        errorMessage.classList.add("show");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        textError.innerText =
            "Este e-mail não parece correto. Verifique o que digitou.";
        errorMessage.classList.add("show");
        return;
    }

    if (!senha) {
        textError.innerText = "Por favor, digite a sua senha.";
        errorMessage.classList.add("show");
        return;
    }

    // Usuários

    // Credenciais expostas, devido o uso somente de front-end
    const usuarios = [
        {
            email: "joao.lopes@garageerp.com.br",
            senha: "teste1234",
            perfil: "mecanico",
            url: "pages/mecanico/dashboard.html",
        },
        {
            email: "maria.santos@garageerp.com.br",
            senha: "teste1234",
            perfil: "administrativo",
            url: "pages/administrativo/dashboard.html",
        },
        {
            email: "carlos.silva@garageerp.com.br",
            senha: "teste1234",
            perfil: "proprietario",
            url: "pages/proprietario/dashboard.html",
        },
    ];

    // Procura pelo usuário correspondente
    const usuarioEncontrado = usuarios.find(function (usuario) {
        return usuario.email === email && usuario.senha === senha;
    });

    if (usuarioEncontrado) {
        localStorage.setItem("perfilLogado", usuarioEncontrado.perfil);
        window.location.href = usuarioEncontrado.url;
    } else {
        textError.innerText =
            "E-mail ou senha incorretos. Tente digitar novamente.";
        errorMessage.classList.add("show");

        inputSenha.value = ""; // Limpa o campo de senha antigo automaticamente
        inputSenha.focus(); // Coloca o cursor de volta na senha para poupar cliques
    }
});
