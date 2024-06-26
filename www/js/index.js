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

        // Adicionar novo usuário com imgUser padrão
        users.push({ name, email, password, age, imgUser: 'img/user.jpg' });
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
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        router.navigate('/home/');
    } else {
        alert("Credenciais inválidas. Por favor, tente novamente.");
    }
}
function logout() {

    if(localStorage.getItem('vacancy')){
        return alert("Não é possível trocar de usuário pois há uma vaga ativa")
    }
    // Redirecionar para a página de login ou fazer qualquer outra ação necessária
    alert("Logout realizado com sucesso!");
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('nameUser');
    deleteInfos();
    router.navigate('/index/');
}
function editProfile() {
    const profileImageInput = document.getElementById('imgUser');
    const profileImage = profileImageInput.files[0];

    if (profileImage) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newImageUrl = e.target.result;
            updateProfileImage(newImageUrl);
        };
        reader.readAsDataURL(profileImage);
    } else {
        alert("Por favor, selecione uma imagem.");
    }
}

function updateProfileImage(newImageUrl) {
    // Obter o usuário autenticado do localStorage
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        // Atualizar a imagem de perfil do usuário autenticado
        loggedInUser.imgUser = newImageUrl;
        // Atualizar o usuário no localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let updatedUsers = users.map(user => {
            if (user.email === loggedInUser.email) {
                return loggedInUser;
            }
            return user;
        });
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // Atualizar a sessão do usuário autenticado
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        
        alert("Imagem de perfil atualizada com sucesso!");
         // Atualiza a exibição da imagem de perfil na página
    } else {
        alert("Usuário não autenticado. Faça login novamente.");
        // Redirecionar para a página de login
        }
    window.location.href = 'index.html';
}

//Vagas

let selectedSpotId = null;
let selectedSpotImg = null;
function selectSpot(spotId, imgSpot) {
    // Limpa a seleção anterior, se houver
    if (selectedSpotId) {
        document.getElementById(selectedSpotId).classList.remove('selected');
    }

    // Seleciona o novo spot
    document.getElementById(spotId).classList.add('selected');
    selectedSpotId = spotId;
    selectedSpotImg = imgSpot;
}

function confirmSelection() {

    //verifica se ja existe uma vaga ativa
    if(localStorage.getItem('vacancy')){
        return alert("uma vaga já está ativa")
    }

    //se tiver sido selecionado um spot em "vagas"
    if (selectedSpotId) {
        
        alert(`Vaga selecionada: ${selectedSpotId}`);
        
        //Gera o id que deve ser digitado no totem Hypotenuse
        let vacancyId = generateIdVacancy();

        localStorage.setItem("vacancy", selectedSpotId);
        localStorage.setItem('vacancyId', vacancyId);
        
        //Puxa todas as vagas ocupadas da sessão
        let busyVacancys = JSON.parse(localStorage.getItem('busyVacancys')) || [];

        //recebe a tag de imagem daquela vaga
        let vacancy = document.getElementById(selectedSpotImg);

        //Marca a vaga como ocupada
        vacancy.classList.add("busy");

        if(busyVacancys.length != 0){

            if(!busyVacancys.includes(selectedSpotImg)){
                busyVacancys.push(selectedSpotImg) ;  
            }
        }else{
            busyVacancys.push(selectedSpotImg);   
        }
        //atualiza no storage
        localStorage.setItem('busyVacancys', JSON.stringify(busyVacancys));
        

        startTimer();
        router.navigate('/info/');
    } else {
        alert('Por favor, selecione uma vaga antes de confirmar.');
    }
}
function generateIdVacancy(){
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 6; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(indiceAleatorio);
    }
    return codigo;
}

//info

let timerInterval;
let timerCost;
let costPerHour = 8;
let cost = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

function startTimer() {
    // Armazena a hora de início no localStorage
    const startTime = new Date().getTime();
    localStorage.setItem('startTime', startTime);

    localStorage.setItem('vacancyTime', true);
    localStorage.setItem("costHour", costPerHour);

    // Inicia o timer para atualizar o display a cada segundo
    timerInterval = setInterval(updateTimer, 1000);

    // Inicia o timer para atualizar o custo a cada minuto
    timerCost = setInterval(updateCost, 1000 * 60);
}

function resetTimer() {
    // Encerra os intervalos
    clearInterval(timerInterval);
    clearInterval(timerCost);

    // Reseta os valores
    seconds = 0;
    minutes = 0;
    hours = 0;
    cost = 0;
    localStorage.setItem('hours', hours);
    localStorage.setItem('minutes', minutes);
    localStorage.setItem('seconds', seconds);
    localStorage.setItem('cost', cost);

    updateDisplay();
}

function updateCost(){
    cost = (minutes + (hours * 60)) * (costPerHour / 60);
    localStorage.setItem('cost', cost);
    updateDisplay();
}

function updateTimer() {
    const startTime = parseInt(localStorage.getItem('startTime'), 10);
    const currentTime = new Date().getTime();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000); // tempo decorrido em segundos

    seconds = elapsedTime % 60;
    minutes = Math.floor(elapsedTime / 60) % 60;
    hours = Math.floor(elapsedTime / 3600);

    updateCost();
    updateDisplay();
}

function updateDisplay() {
    let pagina = sessionStorage.getItem('currentRoute');

    // Pega os valores do localStorage
    let horas = hours;
    let minutos = minutes;
    let segundos = seconds;
    let custo = parseFloat(localStorage.getItem('cost'));

    // Escreve o valor do timer
    const formattedTime = pad(horas) + ':' + pad(minutos) + ':' + pad(segundos);

    // Se a página que está aparecendo não for a de informações, não muda os valores no html
    if (pagina === '/info/') {
        document.getElementById('time').textContent = formattedTime;

        // Escreve o valor do custo
        document.getElementById('totalCost').textContent = `R$ ${custo.toFixed(2)}`;
    }
}

function pad(num) {
    return (num < 10) ? '0' + num : num;
}

function paymentVacancy() {

    //pega as vagas ocupadas
    let busyVacancys = JSON.parse(localStorage.getItem('busyVacancys')) || [];

    //pega a vaga que o usuário ocupou
    let atualVacancy = 'img' + localStorage.getItem('vacancy')

    //procura a vaga que ele deseja desocupar dentro da lista de vagas ocupadas
    let freeVacancy = busyVacancys.indexOf(atualVacancy)

    //se ele encontrar o valor, dá tira ele da lista para virar open-spot
    if (freeVacancy !== -1) {
        // Remove o valor do array
        busyVacancys.splice(freeVacancy, 1);
    }
    //Atualiza a lista de vagas ocupadas
    localStorage.setItem('busyVacancys', JSON.stringify(busyVacancys));
    
    // Limpar dados de autenticação do localStorage
    deleteInfos();
    

    router.navigate('/pagamento/');
}

function deleteInfos() {
    localStorage.removeItem('vacancy');
    localStorage.removeItem("minutes");
    localStorage.removeItem("cost");
    localStorage.removeItem("costHour");
    localStorage.removeItem('startTime');
    localStorage.removeItem('vacancyId');
}

// Carregar os valores e iniciar o timer quando a página for carregada
window.onload = function() {
    const startTime = localStorage.getItem('startTime');

    // Verifica se o timer estava ativo antes de fechar a página
    if (localStorage.getItem('vacancyTime') === 'true' && startTime !== null) {
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
        timerCost = setInterval(updateCost, 1000 * 60);
    }

    updateDisplay();
};



