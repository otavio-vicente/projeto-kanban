document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form-login").addEventListener("submit", function (event) {
        event.preventDefault();

        const emailDigitado = document.getElementById("login-email").value.trim();
        const senhaDigitada = document.getElementById("login-senha").value;

        // Obtém a lista de usuários cadastrados
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verifica se o e-mail e a senha correspondem a um usuário cadastrado
        const usuarioEncontrado = usuarios.find(user => user.email === emailDigitado && user.senha === senhaDigitada);

        if (usuarioEncontrado) {
            alert(`Bem-vindo, ${usuarioEncontrado.nome}! Login realizado com sucesso.`);
            window.location.href = "dashboard.html"; // Redireciona para outra página
        } else {
            alert("E-mail ou senha incorretos!");
        }
    });
});
