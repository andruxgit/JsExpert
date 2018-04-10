/* globals Validator, LoginForm, Gallery */
'use strict';
let userInfo = {
	login: 'a@a.ru',
	password: '123'
};
localStorage.setItem('userInfo',JSON.stringify(userInfo));

let validatorModul = new Validator();
let galleryModul = new Gallery();

let loginForm = new LoginForm(validatorModul, galleryModul);

loginForm.init();

