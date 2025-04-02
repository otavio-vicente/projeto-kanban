document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form-cadastro").addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("cadastro-nome").value.trim();
        const email = document.getElementById("cadastro-email").value.trim();
        const senha = document.getElementById("cadastro-senha").value;
        const confirmacaoSenha = document.getElementById("confirmacao-senha").value;

        // Verifica se as senhas coincidem
        if (senha !== confirmacaoSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        // Obtém a lista de usuários cadastrados ou cria um array vazio se não existir
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verifica se o e-mail já está cadastrado
        if (usuarios.some(user => user.email === email)) {
            alert("E-mail já cadastrado! Tente outro.");
            return;
        }

        // Adiciona o novo usuário ao array
        usuarios.push({ nome, email, senha });

        // Atualiza o localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Cadastro realizado com sucesso! Faça login agora.");

        // Redireciona para a tela de login sem quebrar o layout
        document.getElementById("cadastro").style.display = "none";
        document.getElementById("login").style.display = "block";

        // Limpa os campos do formulário
        document.getElementById("form-cadastro").reset();
    });
});
