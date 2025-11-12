document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const messageDiv = document.getElementById('message');

    messageDiv.textContent = 'Carregando...';
    messageDiv.className = 'mensagem-sucesso'; // Temporário

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            messageDiv.textContent = data.message;
            messageDiv.className = 'mensagem-sucesso';

            // Redirecionamento após o login
            if (data.role === 'admin') {
                window.location.href = '/admin/dashboard'; // Exemplo
            } else if (data.role === 'employee') {
                window.location.href = '/employee/schedule'; // Exemplo
            } else {
                window.location.href = '/client/dashboard'; // Novo painel de cliente
            }
        } else {
            messageDiv.textContent = data.message;
            messageDiv.className = 'mensagem-erro';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        messageDiv.textContent = 'Ocorreu um erro ao tentar fazer login com o servidor.';
        messageDiv.className = 'mensagem-erro';
    });
});
