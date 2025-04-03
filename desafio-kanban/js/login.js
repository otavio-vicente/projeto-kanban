document.addEventListener("DOMContentLoaded", function () {
    console.log(localStorage);

    document.getElementById("form-login").addEventListener("submit", function (event) {
        event.preventDefault();

        const emailDigitado = document.getElementById("login-email").value.trim();
        const senhaDigitada = document.getElementById("login-senha").value;

        // Obtém a lista de usuários cadastrados
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verifica se o e-mail e a senha correspondem a um usuário cadastrado
        const usuarioEncontrado = usuarios.find(user => user.email === emailDigitado && user.senha === senhaDigitada);

        if (usuarioEncontrado) {
            // **SALVA O USUÁRIO LOGADO NO LOCALSTORAGE**
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

            Swal.fire({
                title: `Bem-vindo, ${usuarioEncontrado.nome}!`,
                text: 'Login realizado com sucesso.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = "./perfil.html"; // Redireciona para a página de perfil
            });
        } else {
            Swal.fire({
                title: 'Erro!',
                text: 'E-mail ou senha incorretos!',
                icon: 'error',
                confirmButtonText: 'Tentar novamente'
            });
        }
    });
});
