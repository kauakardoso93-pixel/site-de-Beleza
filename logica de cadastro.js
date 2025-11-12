document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    const role = document.querySelector('input[name="role"]').value;
    const messageDiv = document.getElementById('message');

    if (senha !== confirmarSenha) {
        messageDiv.textContent = 'As senhas não coincidem!';
        messageDiv.className = 'mensagem-erro';
        return;
    }
    
    messageDiv.textContent = 'Cadastrando...';
    messageDiv.className = 'mensagem-sucesso'; // Temporário

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha, role })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            messageDiv.textContent = data.message;
            messageDiv.className = 'mensagem-sucesso';
            // Redireciona para login após o cadastro
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            messageDiv.textContent = data.message;
            messageDiv.className = 'mensagem-erro';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        messageDiv.textContent = 'Ocorreu um erro ao tentar cadastrar.';
        messageDiv.className = 'mensagem-erro';
    });
});
