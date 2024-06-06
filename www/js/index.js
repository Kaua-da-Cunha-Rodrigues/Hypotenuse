//Login e register
var router = app.views.main.router; // Obtém o objeto de roteamento principal
// Função para registrar um novo usuário
function register() {
    let name = document.getElementById("registerName").value;
    let email = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;
    let age = document.getElementById("registerAge").value;

    // Simulação de validação
    if (name && email && password && age) {
        // Obter usuários do localStorage ou inicializar se não existir
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Verificar se o e-mail já está registrado
        let existingUser = users.find(user => user.email === email);
        if (existingUser) {
            alert("Este e-mail já está cadastrado. Por favor, use outro.");
            return;
        }

        // Adicionar novo usuário
        users.push({ name, email, password, age });
        localStorage.setItem('users', JSON.stringify(users));

        // Redirecionar ou mostrar mensagem de sucesso
        alert("Usuário cadastrado com sucesso!");
        router.navigate('/index/');
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}
// Função para fazer login
function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    // Obter usuários do localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar credenciais
    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert(`Bem-vindo, ${user.name}!`);
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('nameUser', user.name);
        router.navigate('/home/');
    } else {
        alert("Credenciais inválidas. Por favor, tente novamente.");
    }
}
function logout() {
    // Limpar dados de autenticação do localStorage
    localStorage.removeItem('loggedInUser');

    // Redirecionar para a página de login ou fazer qualquer outra ação necessária
    alert("Logout realizado com sucesso!");
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('nameUser');
    router.navigate('/index/');
}


//Vagas

let selectedSpotId = null;

function selectSpot(spotId) {
    // Limpa a seleção anterior, se houver
    if (selectedSpotId) {
        document.getElementById(selectedSpotId).classList.remove('selected');
    }

    // Seleciona o novo spot
    document.getElementById(spotId).classList.add('selected');
    selectedSpotId = spotId;
}

function confirmSelection() {
    if (selectedSpotId) {
        alert(`Vaga selecionada: ${selectedSpotId}`);
        // Aqui você pode guardar o identificador em uma variável, enviar para o servidor, etc.
    } else {
        alert('Por favor, selecione uma vaga antes de confirmar.');
    }
}

