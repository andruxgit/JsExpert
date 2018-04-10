'use strict';
let LoginForm = function (validatorModul, galleryModul) {
	this.validator = validatorModul;
	this.gallery = galleryModul;
};
LoginForm.prototype = {
	init: function(){
		this.btnInput = document.querySelector('#btnInput');
		this.pageGallery = document.querySelector('#pageGallery');
		this.loginPage = document.querySelector('#loginPage');
        this.pageInfoUser = document.querySelector('#pageInfoUser');

        this.navLinkInfoUser = document.querySelector('#navInfoUser');
        this.navBtnExit =document.querySelector('#navBtnExit');
        this.navLinkGallery = document.querySelector('#navLinkGallery');

		this.inputLogin = document.querySelector('#inputLogin');
		this.inputPass = document.querySelector('#inputPass');

        this.fieldInfPass = document.querySelector('#fieldInfPass');
        this.fieldInfLogin = document.querySelector('#fieldInfLogin');
        this.btnBackToGallery = document.querySelector('#btnBackToGallery');
        this.btnVisiblePass = document.querySelector('#btnVisiblePass');

        this.initListen();
	},
	initListen: function(){
		this.btnInput.addEventListener('click', this.btnSubmit.bind(this));

        this.navBtnExit.addEventListener('click', this.lnkExit.bind(this));
        this.navLinkInfoUser.addEventListener('click', this.lnkInfoUser.bind(this));
        this.navLinkGallery.addEventListener('click', this.linkGallery.bind(this));

        this.btnBackToGallery.addEventListener('click', this.linkGallery.bind(this));
        this.btnVisiblePass.addEventListener('click', this.visiblePass.bind(this));

	},
    visiblePass: function () {
         this.fieldInfPass.type = (this.fieldInfPass.type === 'text') ? 'password' : 'text';
    },
	btnSubmit: function (e) {
		e.preventDefault();
        if ( localStorage.getItem('authorization') === 'success' ) return this.authorizationTrue();
		if (this.validator.checkProfile(this.inputLogin.value, this.inputPass.value)) {
            localStorage.setItem('authorization','success');
            return this.authorizationTrue();
		}
	},
    authorizationTrue: function () {
        this.validator.showInfo('start gallery','alert-success');
        setTimeout(this.closeLoginPage.bind(this),300);
    },
    closeLoginPage: function (){
        this.loginPage.classList.add('hide');
        this.pageGallery.classList.remove('hide');
        this.navLinkInfoUser.classList.remove('hide');
        this.navBtnExit.classList.remove('hide');
        this.navLinkGallery.classList.remove('hide');
        this.gallery.initGallary();
    },
    lnkExit: function () {
        document.location.reload(true);
        this.pageGallery.classList.add('hide');
        this.pageInfoUser.classList.add('hide');
        this.loginPage.classList.remove('hide');
        this.validator.showInfo('Input Password','alert-info');
        this.btnInput.addEventListener('click', this.btnSubmit.bind(this));
    },
    lnkInfoUser: function () {
        this.fieldInfPass.value = this.validator.password;
        this.fieldInfLogin.value = this.validator.login;

        this.pageGallery.classList.add('hide');
        this.pageInfoUser.classList.remove('hide');
    },
    linkGallery: function () {
        this.pageGallery.classList.remove('hide');
        this.pageInfoUser.classList.add('hide');
    }

};

// let date = new Date(new Date().getTime() + 2600000 * 1000);
// $(function(){
//    $.cookie('authorization', 'success');
// });
//document.cookie = "authorization=success; path=/; expires=" + date.toUTCString();
//document.cookie = updatedCookie;
// if (this.checkSuccessAuthorization()) {
//     this.closeInfoPage()
// }
// checkSuccessAuthorization: function () {
//     function getCookie(name) {
//         let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + "=([^;]*)"));
//         return matches ? decodeURIComponent(matches[1]) : undefined;
//     }
//     return getCookie('authorization') === 'success'
// },
//     checkSuccessAuthorization: function () {
//     function getCookie(name) {
//         let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + "=([^;]*)"));
//         return matches ? decodeURIComponent(matches[1]) : undefined;
//     }
//     return getCookie('authorization') === 'success'
// },

