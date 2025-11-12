from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Simulação do banco de dados de usuários
usuarios_db = {
    'admin@salao.com': {'senha': 'admin_password', 'role': 'admin', 'nome': 'Admin'},
    'func1@salao.com': {'senha': 'func_password', 'role': 'employee', 'nome': 'Funcionário Um'},
    'cliente1@email.com': {'senha': 'cliente_password', 'role': 'client', 'nome': 'Cliente Um'} # 🔑 USE ESTE PARA TESTE
}

# ... (outras simulações de serviços/funcionários)

# Rota principal para carregar a página de login
@app.route('/')
def home():
    # Garanta que ele renderize o seu arquivo de login
    return render_template('login.html') 

# Rota que o JavaScript está chamando para o login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    senha = data.get('senha')

    if email in usuarios_db and usuarios_db[email]['senha'] == senha:
        role = usuarios_db[email]['role']
        # 🟢 Sucesso
        return jsonify({'success': True, 'role': role, 'message': 'Login realizado com sucesso.'})
    else:
        # 🔴 Falha
        return jsonify({'success': False, 'message': 'E-mail ou senha incorretos.'})

# ... (outras rotas como /api/register e dashboards)

if __name__ == '__main__':
    # CRUCIAL: Mantenha o servidor rodando na porta correta
    app.run(debug=True)
