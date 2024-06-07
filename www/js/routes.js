//INICIALIZAÇÃO DO F7 QUANDO DISPOSITIVO ESTÁ PRONTO
document.addEventListener('deviceready', onDeviceReady, false);
var app = new Framework7({
  // App root element
  el: '#app',
  // App Name
  name: 'Hypotenuse',
  // App id
  id: 'com.hypotenuse.test',
  // Enable swipe panel
  panel: {
    swipe: true,
  },
  dialog: {
    buttonOk: 'Sim',
    buttonCancel: 'Cancelar',
  },
  // Add default routes
  routes: [
    {
      path: '/index/',
      url: 'index.html',
      animate: false,
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
		
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
    {
      path: '/perfil/',
      url: 'perfil.html',
      animate: false,
	  on: {
		pageBeforeIn: function (event, page) {
			checkAuth()

			getNameUser();
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
    {
      path: '/info/',
      url: 'info.html',
      animate: false,
	  on: {
		pageBeforeIn: function (event, page) {
			app.views.main.router.navigate("/vagas/")

		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
    {
	  name: 'vagas',
      path: '/vagas/',
      url: 'vagas.html',
      animate: false,
	  on: {
		pageBeforeIn: function (event, page) {
			checkAuth()
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
    {
      path: '/pagamento/',
      url: 'pagamento.html',
      animate: false,
	  on: {
		pageBeforeIn: function (event, page) {
			checkAuth()
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
    {
      path: '/register/',
      url: 'register.html',
      animate: false,
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
	{
		path: '/home/',
		url: 'home.html',
		animate: false,
		on: {
		  pageBeforeIn: function (event, page) {
			checkAuth()
		  },
		  pageAfterIn: function (event, page) {
		  // fazer algo depois da página ser exibida
		  },
		  pageInit: function (event, page) {
		  // fazer algo quando a página for inicializada
		  },
		  pageBeforeRemove: function (event, page) {
		  // fazer algo antes da página ser removida do DOM
		  },
		}
	  },
  ],
  // ... other parameters
});

//Para testes direto no navegador
var mainView = app.views.create('.view-main', { url: '/index/' });

//EVENTO PARA SABER O ITEM DO MENU ATUAL
app.on('routeChange', function (route) {
  var currentRoute = route.url;
  console.log(currentRoute);
  document.querySelectorAll('.tab-link').forEach(function (el) {
    el.classList.remove('active');
  });
  var targetEl = document.querySelector('.tab-link[href="' + currentRoute + '"]');
  if (targetEl) {
    targetEl.classList.add('active');
  }
});

function onDeviceReady() {
  //Quando estiver rodando no celular
  var mainView = app.views.create('.view-main', { url: '/index/' });

  //COMANDO PARA "OUVIR" O BOTAO VOLTAR NATIVO DO ANDROID 	
  document.addEventListener("backbutton", function (e) {

    if (mainView.router.currentRoute.path === '/index/') {
      e.preventDefault();
      app.dialog.confirm('Deseja sair do aplicativo?', function () {
        navigator.app.exitApp();
      });
    } else {
      e.preventDefault();
      mainView.router.back({ force: true });
    }
  }, false);

}

var router = app.views.main.router;

//checar login
function checkAuth() {
    if (!localStorage.getItem('loggedIn')) {
        // Usuário não está autenticado, redirecionar para a página de login ou tomar outra ação
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'index.html';
        return false; // Indica que o acesso não é permitido
    }
    return true; // Indica que o acesso é permitido
}
function checkVacancy() {
    
}
//pegar nome para o perfil
function getNameUser() {
	const nameUser = localStorage.getItem('nameUser');
	const titleName = document.getElementById('nameUser');

	titleName.innerText = nameUser;
}
function getInfoVacancy(){
	const costHour = localStorage.getItem("costHour");
	const vacancy = localStorage.getItem("vacancy");
	const minutes = localStorage.getItem("minutes");
    const cost = localStorage.getItem("cost");

	//escreve na página
	document.getElementById("totalCost").textContent += `R$ ${cost}`
	document.getElementById("vacancy").textContent = vacancy
	document.getElementById('time').textContent = `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    document.getElementById('price').textContent = `R$ ${costHour}`;
}
