document.getElementById('loginForm').addEventListener('submit', function(event) {
    // 1. Impede o comportamento padrão do formulário (recarregar a página)
    event.preventDefault(); 

    // 2. Coleta os valores dos campos de e-mail e senha
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const messageDiv = document.getElementById('message');

    // 3. Exibe mensagem de carregamento
    messageDiv.textContent = 'Carregando...';
    messageDiv.className = 'mensagem-sucesso'; 

    // 4. Envia a requisição POST para a rota /api/login no seu servidor Python
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // Envia o e-mail e a senha como um objeto JSON
        body: JSON.stringify({ email, senha })
    })
    .then(response => response.json()) // Converte a resposta do Python para JSON
    .then(data => {
        if (data.success) {
            // Sucesso: Exibe mensagem e redireciona
            messageDiv.textContent = data.message;
            messageDiv.className = 'mensagem-sucesso';
            
            // Redirecionamento baseado na função (role)
            if (data.role === 'admin') {
                window.location.href = '/admin/dashboard'; 
            } else if (data.role === 'employee') {
                window.location.href = '/employee/schedule'; 
            } else {
                window.location.href = '/client/dashboard'; // Painel do Cliente
            }
        } else {
            // Falha: Exibe mensagem de erro
            messageDiv.textContent = data.message;
            messageDiv.className = 'mensagem-erro';
        }
    })
    .catch(error => {
        // Erro: Falha na conexão com o servidor (Python não está rodando)
        console.error('Erro na requisição de login:', error);
        messageDiv.textContent = 'Erro ao conectar com o servidor. Verifique se o Login.py está rodando.';
        messageDiv.className = 'mensagem-erro';
    });
});
