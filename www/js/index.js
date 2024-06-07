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
        // window.location.href = 'index.html';
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
        // window.location.href = 'home.html';
    } else {
        alert("Credenciais inválidas. Por favor, tente novamente.");
    }
}
function logout() {

    // Redirecionar para a página de login ou fazer qualquer outra ação necessária
    alert("Logout realizado com sucesso!");
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('nameUser');
    deleteInfos();
    router.navigate('/index/');
    // window.location.href = 'index.html';
}


//Vagas

let selectedSpotId = null;
let startTime = null;
let costPerHour = 5.22; // Valor por hora
let timerInterval;

localStorage.setItem("costHour", parseFloat(costPerHour));

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

    //verifica se ja existe uma vaga ativa
    if(localStorage.getItem('vacancy')){
        return alert("uma vaga já está ativa")
    }

    //se tiver sido selecionado um spot em "vagas"
    if (selectedSpotId) {
         
        alert(`Vaga selecionada: ${selectedSpotId}`);
        startTime = new Date(); // Marca o horário de início

        localStorage.setItem("vacancy", selectedSpotId);

        startTimer();
        window.location.href = 'info.html';
        // router.navigate('/info/');
    } else {
        alert('Por favor, selecione uma vaga antes de confirmar.');
    }
}
function startTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    timerInterval = setInterval(updateTimer(), 1000); // Atualiza a cada minuto
}
function updateTimer() {
    console.log("oi");
    const currentTime = new Date();
    const minutes = Math.floor((currentTime - startTime) / (1000 * 60)); // Calcula o tempo decorrido em minutos
    const cost = minutes * costPerHour / 60; // Calcula o custo
    localStorage.setItem("minutes", minutes);
    localStorage.setItem("cost", cost);

}

function paymentVacancy() {
    // Limpar dados de autenticação do localStorage
    deleteInfos();

    router.navigate('/pagamento/');
    // window.location.href = 'pagamento.html';
}

function deleteInfos() {
    localStorage.removeItem('vacancy');
    localStorage.removeItem("minutes");
    localStorage.removeItem("cost");
    localStorage.removeItem("costHour");
}

