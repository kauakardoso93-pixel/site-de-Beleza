from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Simulação de um banco de dados (Adicionado um novo usuário para teste)
usuarios_db = {
    'admin@salao.com': {'senha': 'admin_password', 'role': 'admin', 'nome': 'Admin'},
    'func1@salao.com': {'senha': 'func_password', 'role': 'employee', 'nome': 'Funcionário Um'},
    'cliente1@email.com': {'senha': 'cliente_password', 'role': 'client', 'nome': 'Cliente Um'}
}

# Simulação de Serviços e Funcionários
servicos_db = {
    'corte': 'Corte de Cabelo (R$ 50)',
    'manicure': 'Manicure e Pedicure (R$ 80)',
    'hidratacao': 'Hidratação Capilar (R$ 120)'
}

funcionarios_db = {
    'ana': 'Ana (Cabelo)',
    'bruno': 'Bruno (Unha)',
    'carlos': 'Carlos (Geral)'
}


@app.route('/')
def home():
    # Redireciona a raiz para a página de Login
    return render_template('login.html')

@app.route('/register')
def register_page():
    # 🟢 CORREÇÃO: Renderiza o arquivo 'index.html', que é a página de cadastro.
    return render_template('index.html')

@app.route('/appointment')
def appointment_page():
    return render_template('appointment.html',
                           servicos=servicos_db,
                           funcionarios=funcionarios_db)


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    senha = data.get('senha')

    if email in usuarios_db and usuarios_db[email]['senha'] == senha:
        role = usuarios_db[email]['role']
        return jsonify({'success': True, 'role': role, 'message': 'Login realizado com sucesso.'})
    else:
        return jsonify({'success': False, 'message': 'E-mail ou senha incorretos.'})

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')
    role = data.get('role', 'client') # Padrão é 'client'

    if email in usuarios_db:
        return jsonify({'success': False, 'message': 'E-mail já cadastrado.'})

    usuarios_db[email] = {'senha': senha, 'role': role, 'nome': nome}
    print(f"Novo usuário cadastrado: {usuarios_db[email]}")

    return jsonify({'success': True, 'message': 'Cadastro realizado com sucesso. Faça login.'})


# Rota de simulação para o painel de cliente após o login
@app.route('/client/dashboard')
def client_dashboard():
    # Em um sistema real, aqui haveria verificação de sessão/autenticação
    return "<h1>Painel do Cliente</h1><p>Bem-vindo! <a href='/appointment'>Agendar Novo Serviço</a></p>"


if __name__ == '__main__':
    # Usaremos 'style.css' no lugar de 'aparencia.css' e 'seuarquivo.css'
    # Os templates devem ser renderizados. (Lembre-se de corrigir os links de CSS)
    app.run(debug=True)

