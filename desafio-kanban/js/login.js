document.addEventListener("DOMContentLoaded", function () {
    console.log(localStorage);

    document.getElementById("form-login").addEventListener("submit", function (event) {
        event.preventDefault();

        const emailDigitado = document.getElementById("login-email").value.trim();
        const senhaDigitada = document.getElementById("login-senha").value;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuarioEncontrado = usuarios.find(user => user.email === emailDigitado && user.senha === senhaDigitada);

        if (usuarioEncontrado) {
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

            Swal.fire({
                title: `Bem-vindo, ${usuarioEncontrado.nome}!`,
                text: 'Login realizado com sucesso.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = "../index.html";
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
