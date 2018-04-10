'use strict';
let Validator = function () {
	this.login = JSON.parse(localStorage.getItem('userInfo')).login;
	this.password = JSON.parse(localStorage.getItem('userInfo')).password;
	this.infoAlert = document.querySelector('#loginInfoAlert');
};
Validator.prototype = {
	checkProfile: function (login, password) {

		if (!this.checkCorrectLogin(login)) {
			this.showInfo('Некорректный логин','alert-warning');
			return false;
		}
		if (!this.checkCorrectPassword(password)){
			this.showInfo('Некорректный пароль','alert-warning');
			return false;
		}
		if (this.login === login && this.password === password){
			this.showInfo('Авторизация успешная','alert-success');
			return true;
		}
		this.showInfo('Неверная пара логин-пароль','alert-danger');
		return false;
	},
	checkCorrectLogin: function (login) {
		const regLogin = /^([a-z0-9_-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
		return regLogin.test(login);
	},
	checkCorrectPassword: function (password) {
		const regPassword = /^[a-z0-9_-]{3,18}$/;
		return regPassword.test(password);
	},
	showInfo: function (str, kind) {
		if (!kind) kind = 'alert-info';
		this.infoAlert.classList.remove('alert-warning','alert-danger','alert-info','hidden');
		this.infoAlert.classList.add(kind);
		this.infoAlert.innerHTML = str;
	}
};
