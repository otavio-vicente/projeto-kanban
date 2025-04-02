let usuario = { id: Date.now(), nome: "Usuário", email: "user@gmail.com", senha: "1234"};
localStorage.setItem("usuario", JSON.stringify(usuario))