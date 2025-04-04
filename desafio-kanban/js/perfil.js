document.addEventListener("DOMContentLoaded", function () {
    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuarioLogado) {
        Swal.fire({
            title: "Nenhum usuário logado!",
            text: "Faça login primeiro.",
            icon: "warning",
            confirmButtonText: "OK"
        }).then(() => {
            window.location.href = "login.html";
        });
        return;
    }

    document.getElementById("cadastro-nome").value = usuarioLogado.nome;
    document.getElementById("login-email").value = usuarioLogado.email;
    document.getElementById("login-senha").value = usuarioLogado.senha;

    const imgPerfil = document.getElementById("foto-usuario");
    const fotoSalva = localStorage.getItem(`fotoPerfil_${usuarioLogado.email}`); 

    if (fotoSalva) {
        imgPerfil.src = fotoSalva;
    }

    document.getElementById("input-foto").addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const imagemBase64 = e.target.result;
                imgPerfil.src = imagemBase64;
                localStorage.setItem(`fotoPerfil_${usuarioLogado.email}`, imagemBase64);
            };

            reader.readAsDataURL(file);
        }
    });

    document.querySelector(".perfil-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const novoNome = document.getElementById("cadastro-nome").value.trim();
        const novoEmail = document.getElementById("login-email").value.trim();
        const novaSenha = document.getElementById("login-senha").value;

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        if (usuarios.some(user => user.email === novoEmail && user.email !== usuarioLogado.email)) {
            Swal.fire("Erro", "Este e-mail já está cadastrado!", "error");
            return;
        }

        usuarios = usuarios.map(user => {
            if (user.email === usuarioLogado.email) {
                return { nome: novoNome, email: novoEmail, senha: novaSenha };
            }
            return user;
        });

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuarioLogado", JSON.stringify({ nome: novoNome, email: novoEmail, senha: novaSenha }));

        const fotoAtual = localStorage.getItem(`fotoPerfil_${usuarioLogado.email}`);
        if (novoEmail !== usuarioLogado.email) {
            localStorage.removeItem(`fotoPerfil_${usuarioLogado.email}`);
            if (fotoAtual) {
                localStorage.setItem(`fotoPerfil_${novoEmail}`, fotoAtual);
            }
        }

        Swal.fire({
            title: "Perfil atualizado!",
            text: "Suas informações foram salvas.",
            icon: "success",
            confirmButtonText: "OK"
        });
    });

    const inputSenha = document.getElementById('login-senha');
    const toggleSenha = document.getElementById('toggle-senha');
    let senhaVisivel = false;

    toggleSenha.addEventListener('click', () => {
        senhaVisivel = !senhaVisivel;
        inputSenha.type = senhaVisivel ? 'text' : 'password';
        toggleSenha.src = senhaVisivel ? '../imgs/olho.png' : '../imgs/olho.png';
    });


    document.getElementById("logout").addEventListener("click", function () {
        Swal.fire({
            title: "Deseja sair?",
            text: "Sua sessão será encerrada.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, sair",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("usuarioLogado");
                window.location.href = "login.html";
            }
        });
    });
});
