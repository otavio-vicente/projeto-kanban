document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form-cadastro").addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("cadastro-nome").value.trim();
        const email = document.getElementById("cadastro-email").value.trim();
        const senha = document.getElementById("cadastro-senha").value;
        const confirmacaoSenha = document.getElementById("confirmacao-senha").value;

        const erroNome = document.getElementById("erro-nome");
        const erroEmail = document.getElementById("erro-email");
        const erroSenha = document.getElementById("erro-senha");
        const erroConfirmacao = document.getElementById("erro-confirmacao");

        erroNome.textContent = "";
        erroEmail.textContent = "";
        erroSenha.textContent = "";
        erroConfirmacao.textContent = "";

        let isValid = true;

        if (nome.length < 3) {
            erroNome.textContent = "O nome deve ter pelo menos 3 caracteres.";
            isValid = false;
        }

        if (!email.includes("@") || !email.includes(".")) {
            erroEmail.textContent = "Digite um e-mail válido.";
            isValid = false;
        }

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        if (usuarios.some(user => user.email === email)) {
            erroEmail.textContent = "E-mail já cadastrado! Tente outro.";
            isValid = false;
        }

        if (senha.length < 6) {
            erroSenha.textContent = "A senha deve ter no mínimo 6 caracteres.";
            isValid = false;
        }

        if (senha !== confirmacaoSenha) {
            erroConfirmacao.textContent = "As senhas não coincidem.";
            isValid = false;
        }

        if (!isValid) return;

        usuarios.push({ nome, email, senha });

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        Swal.fire({
            title: "Cadastro realizado!",
            text: "Agora você pode fazer login.",
            icon: "success",
            confirmButtonText: "OK"
        }).then(() => {
            document.getElementById("cadastro").style.display = "none";
            document.getElementById("login").style.display = "flex";

            document.getElementById("form-cadastro").reset();
        });
    });
});
