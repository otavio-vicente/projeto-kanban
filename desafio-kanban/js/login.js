document.getElementById('form-login').addEventListener('submit', function(event) {
    event.preventDefault(); //Para não permitir que envie o form

    const email = document.getElementById('login-email').value.trim(); //trim remove espaços em branco 
    const senha = document.getElementById('login-senha').value.trim();

    if(email == '' || senha == ''){
        alert("Preencha todos os campos!")
        return
    } else {

    }
})


