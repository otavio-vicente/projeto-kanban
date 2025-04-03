document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form-cadastro").addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("cadastro-nome").value.trim();
        const email = document.getElementById("cadastro-email").value.trim();
        const senha = document.getElementById("cadastro-senha").value;
        const confirmacaoSenha = document.getElementById("confirmacao-senha").value;

        // Pegando os spans de erro
        const erroNome = document.getElementById("erro-nome");
        const erroEmail = document.getElementById("erro-email");
        const erroSenha = document.getElementById("erro-senha");
        const erroConfirmacao = document.getElementById("erro-confirmacao");

        // Resetando mensagens de erro
        erroNome.textContent = "";
        erroEmail.textContent = "";
        erroSenha.textContent = "";
        erroConfirmacao.textContent = "";

        let isValid = true;

        // Validação do nome
        if (nome.length < 3) {
            erroNome.textContent = "O nome deve ter pelo menos 3 caracteres.";
            isValid = false;
        }

        // Validação do email
        if (!email.includes("@") || !email.includes(".")) {
            erroEmail.textContent = "Digite um e-mail válido.";
            isValid = false;
        }

        // Obtém a lista de usuários cadastrados
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verifica se o e-mail já está cadastrado
        if (usuarios.some(user => user.email === email)) {
            erroEmail.textContent = "E-mail já cadastrado! Tente outro.";
            isValid = false;
        }

        // Validação da senha
        if (senha.length < 6) {
            erroSenha.textContent = "A senha deve ter no mínimo 6 caracteres.";
            isValid = false;
        }

        // Validação da confirmação de senha
        if (senha !== confirmacaoSenha) {
            erroConfirmacao.textContent = "As senhas não coincidem.";
            isValid = false;
        }

        // Se houver erros, não prosseguir
        if (!isValid) return;

        // Adiciona o novo usuário ao array
        usuarios.push({ nome, email, senha });

        // Atualiza o localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // Exibe mensagem de sucesso com SweetAlert
        Swal.fire({
            title: "Cadastro realizado!",
            text: "Agora você pode fazer login.",
            icon: "success",
            confirmButtonText: "OK"
        }).then(() => {
            // Redireciona para a tela de login
            document.getElementById("cadastro").style.display = "none";
            document.getElementById("login").style.display = "block";

            // Limpa os campos do formulário
            document.getElementById("form-cadastro").reset();
        });
    });
});
