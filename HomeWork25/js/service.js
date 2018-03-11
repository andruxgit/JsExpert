'use strict';
(function init (){
	const DOMauthPage = ` 
<div id = 'main-context' class="text-center row" role="main">
    <div class = "container col-8">
        <div id = "wrap-modal" class="alert alert-danger col-5" role="alert">
            This is a danger alert—check it out!
        </div>
    </div>
    <form id = "form-input" class="form">

        <h1 class="h3 mb-3 font-weight-normal">Заполните поля</h1>
        <label for="input-email" class="input-title  control-label">Email</label>
        <input type="text" id="input-email" class="form-control col" placeholder="Email address" required="" 
        autofocus=""  autocomplete="off">
        <label for="input-pass" class="input-title  control-label">Пароль</label>
        <input type="text" id="input-pass" class="form-control col" placeholder="Password" required="" 
        autocomplete="off">
        <div class="checkbox mb-3">
            <!--<label>-->
                <!--<input type="checkbox" value="remember-me"> Remember me-->
            <!--</label>-->
        </div>
        <div class = row>
            <button id ="auth-button" class="btn btn-lg btn-primary btn-block col" type="button">Авторизация</button>
        </div>
        <!--<p class="mt-5 mb-3 text-muted">© 2017-2018</p>-->
        </form>
 </div>`;
	const DOMuserPage =  `
 <div class = "userContent container">
	<div class="row">
            <h1 class="h3 font-weight-normal text-center ">Информация о пользователе</h1>
    </div>   
    <div class="row infoBlok">
        <div class="col-md-5 text-left">
            <label for = "otputEmail" class = "control-label">Логин</label>
            <input type="text" id="otputEmail" class="form-control" placeholder="Email address">
        </div>
        <div class="text-left">
            <label for = "userPassword" class = "control-label">Пароль</label>
            <div class = "input-group row">
                <input type="text" id="userPassword" class="form-control col" placeholder = "Password">
                <span class = "input-group-btn">
                    <button id="btnHide" class="btn btn-primary btn-block col" type="button">Показать 
                    пароль</button>
                </span>
            </div>
        </div>
  </div>
    <button id="btnComeBack" class="btn-lg btn-primary btn-block mt-2" type="button">Назад</button>
  </div>`;

	const DOMmain = document.querySelector('#mainPage');
	localStorage.setItem('emailValid','t@t.ru' );
	localStorage.setItem('passValid', '12');
	DOMmain.innerHTML = DOMauthPage;

	const DOMinputPass = document.querySelector('#input-pass');
	const DOMinputEmail = document.querySelector('#input-email');
	const DOMtestButton = document.querySelector('#auth-button');
	const DOMwrapModal = document.querySelector('#wrap-modal');

	DOMwrapModal.style.visibility = "hidden";


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
		let passValid = localStorage.getItem('passValid');
		let emailValid = localStorage.getItem('emailValid');
		return {
			passValid: function() {
				return passValid;
			},
			emailValid: function() {
				return emailValid;
			}
		}
	})();
	//получение значения поля пароля
	const getInputEmail = () => {
		return DOMinputEmail.value;
	};
	const getInputPass = () => {
		return DOMinputPass.value;
	};
	const SetModalText = (str) => {
		DOMwrapModal.innerHTML = str
	};
	//открытие-закрытие модального окна document.getElementById(id).style.display == "none")
	const closeModal = () => {
		DOMwrapModal.style.visibility ='hidden'
	};
	const openModal = (str) => {
		SetModalText(str);
		DOMwrapModal.style.visibility ='visible'

	};
	// const ready = () => {
	// };
	const clearPage = () => {
		DOMmain.innerHTML ='';
	};
	const createPage = () => {
		DOMmain.innerHTML = DOMuserPage;
	};
	const isValidEmail = (val) => {
	let reg = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
	return reg.test(val);
	};
	const submitForm =() => {
		const inputPass = getInputPass();
		const inputEmail = getInputEmail();
		const localPass = getDataLocal.passValid();
		const localEmail = getDataLocal.emailValid();
		if ((checkFormIn(inputPass) || checkFormIn(inputEmail))|| (!isValidEmail(inputEmail))) {
			return  openModal('форма заполнена неверно')
		}
		else if  (checkValid(inputPass, localPass ) || checkValid(inputEmail, localEmail)) {
			return openModal('Ошибка логина или пароля')
		}
		return (()=>{
			clearPage();
			createPage();
		})()
	};
	DOMtestButton.addEventListener('click', submitForm);

//	document.addEventListener("DOMContentLoaded", ready);
	//DOMtestButton.addEventListener('click', submitForm);
	//DOMtestButton.addEventListener('click', ()=>{
		// DOMwrapModal.style.visibility ='visible';
		//console.log(DOMinputEmail.value);
	//console.log(isValidEmail(DOMinputEmail.value));
	// clearPage();
	// createPage();
	//});
})();
