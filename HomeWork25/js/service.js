'use strict';

let loginModule = (function init () {

	function setLogAndPass (log,pass) {
		localStorage.setItem('emailValid',log );
		localStorage.setItem('passValid', pass);
	}
	//окно авторизации
	const getDOMauthPage = () => {
		return `
       <div id = 'main-context' class="col-md-4 col-12 col-md-offset-4" role="main">
          <div class = "col-center">
              <div id = "wrap-modal"  class="alert alert-danger" role="alert">
                  Alert
              </div>
          </div>
          <form id = "form-input" class="form well">
              <h1 class="h2  font-weight-normal ">Заполните поля</h1>
              <label for="input-email" class="input-title  control-label">Email</label>
              <input type="text" id="input-email" class="form-control col" placeholder="Email address" required=""
                     autofocus=""  autocomplete="off">
              <label for="input-pass" class="input-title  control-label">Пароль</label>
              <input type="text" id="input-pass" class="form-control col" placeholder="Password" required=""
                     autocomplete="off">
                  <button id ="auth-button" class="btn btn-lg btn-primary btn-block" type="button">Авторизация</button>
           </form>
       </div>`;
    };
	//окно данных пользователя
	const DOMuserPage = (log,hidePass) => {
		return `<div class = " well userContent col-md-6  col-md-offset-3 col-12 col-offset-0">
          <div class="row">
              <h1 class="h3 font-weight-normal text-center ">Информация о пользователе</h1>
          </div>
          <div class="row infoBlok">
              <div class="col-md-5 text-center">
                  <label for = "otputEmail" class = "control-label">Логин</label>
                  <input type="text" id="otputEmail" class="form-control" placeholder="Email address" value = ${log}>
              </div>
              <label for = "userPassword" class = "control-label">Пароль</label>
              <div class = "input-group container-fluid">
                   <input type="text" id="userPassword" class="form-control" placeholder = "Password" value =${hidePass}>
                    <span class = "input-group-btn">
                        <button id="btnHide" class="btn btn-primary btn-block" type="button">Показать
                    пароль</button>
                    </span>
              </div>
          </div>
          <div class ="row">
                <div class="row col-md-6 col-md-offset-3">
                   <button id="btnComeBack" class="btn-lg btn-primary btn-block col-md-6" type="button">Назад</button>
                </div>
           </div>
       </div>`;
	};
	//проверка пароля или почты на соответствие заданному ранее
	const checkValid = (valIn,valValid) => {
				if ((!!valIn) && (!!valValid)) return (valIn !== valValid);
	};
	//проверка поля формы на заполнение
	const checkFormIn = (val) => {
				return (val === "")
	};
	//получение данных из local storage
	let getDataLocal = (function(){
		let emailValid = localStorage.getItem('emailValid');
		let passValid = localStorage.getItem('passValid');
		return {
			passValid: function() {
				return passValid;
			},
			emailValid: function() {
				return emailValid;
			}
		}
	})();
	//получение значения поля
	const getObjVal = (DOMobj) => {
		return DOMobj.value;
	};
	//надпись в модальном окне
	const SetModalText = (DOMobjModal,str) => {
		DOMobjModal.innerHTML = str;
	};
	//открытие-закрытие модального окна
	 const closeModal = (DOMobj) => {
		 DOMobj.style.visibility ='hidden'
	 };
	const openModal = (DOMobj,str) => {
		SetModalText(DOMobj,str);
		DOMobj.style.visibility ='visible'
	};
	//очистка формы
	const clearPage = (DOMobj) => {
		DOMobj.innerHTML = '';
	};
	//отображение формы
	const createPage = (DOMobj,log,hidePass) => {
		DOMobj.innerHTML = DOMuserPage(log,hidePass);
	};
	//валидность логина
	const isValidEmail = (val) => {
	let reg = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
	return reg.test(val);
	};
	const getHidePass = (pass) => {
		return pass.replace(/[\s\S]/g, "*")
	};

	//инициализация страницы пользователя
	const initUserPage = (page,log,pass) => {
		let hidePass = getHidePass(pass);
		createPage(page,log,hidePass);
		const DOMsubmitBack = document.querySelector('#btnComeBack');
		const DOMsubmitHidePass = document.querySelector('#btnHide');
		const DOMuserPass = document.querySelector('#userPassword');
		DOMsubmitHidePass.addEventListener('click', () => {
			DOMsubmitHidePass.innerHTML = (DOMsubmitHidePass.innerHTML === 'Показать пароль')? 'Скрыть Пароль': 'Показать пароль';
			DOMuserPass.value =(DOMuserPass.value === pass)? getHidePass(pass): pass;
		});
		DOMsubmitBack.addEventListener('click', ()=>{
			clearPage(page);
			initComponent()
		});
		console.log('initUserPage' + log + pass)
	};
	//проверка данных пользователя
	const submitForm =(DOMobjPage,DOMobjModal,DOMobjLog,DOMobjPass) => {
		const inputPass = getObjVal(DOMobjPass);
		const inputEmail = getObjVal(DOMobjLog);
		const localPass = getDataLocal.passValid();
		const localEmail = getDataLocal.emailValid();
		if ((checkFormIn(inputPass) || checkFormIn(inputEmail))|| (!isValidEmail(inputEmail))) {
			return  openModal(DOMobjModal,'форма заполнена неверно')
		}
		else if  (checkValid(inputPass, localPass ) || checkValid(inputEmail, localEmail)) {
			console.log(inputPass, localPass);
			console.log(inputEmail, localEmail);
			return openModal(DOMobjModal,'Ошибка логина или пароля')
		}
			clearPage(DOMobjPage);

			return initUserPage(DOMobjPage,inputEmail,inputPass);
	};
	//инициализация окна авторизации
	function initComponent (){
		const DOMmain = document.querySelector('#mainPage');
		DOMmain.innerHTML = getDOMauthPage();
		const DOMauthButton = document.querySelector('#auth-button');
		const DOMwrapModal = document.querySelector('#wrap-modal');
		const DOMinputPass = document.querySelector('#input-pass');
		const DOMinputEmail = document.querySelector('#input-email');

		closeModal(DOMwrapModal);
		const submitEvent = () => {
			submitForm(DOMmain,DOMwrapModal,DOMinputEmail,DOMinputPass);
		};
		DOMauthButton.addEventListener('click', submitEvent);
	}
	//публичные методы главного компонента
	return {
		setLogAndPass : setLogAndPass,
		initComponent: initComponent
	}
})();

