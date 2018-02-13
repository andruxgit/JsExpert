//Создание галереи тремя способами.
(function() {
	let btn = document.getElementById("play");
	let DOMElementsLine = document.querySelector('#first-line');

	const newFormatDateCar =(t)=> {
		let x = new Date(t);
		return `${x.getFullYear()}/${x.getMonth() + 1}/${x.getDate()} ${x.getHours()}:${x.getMinutes()}`;
	};
	const getDecdrLength15 = (str) => {
		if (str.length > 15) return str.slice(0,15) + '...';
		return str;
	};
	const getName =(str) => {
		return str[0].toUpperCase() + str.substring(1).toLowerCase();
	};
	const getHttp = (str) => {
		if (str.indexOf('http://') !== 0) {
			return `http://${str}`;
		}
		return str;
	};
	const getStrOfStatusAndProgress = (str1, str2) => {
		return `${str1}=>${str2}`
	};
	const getChangeObj = (obj) => {
		return {
			name: getName(obj.name),
			url: getHttp(obj.url),
			description: getDecdrLength15(obj.description),
			date: newFormatDateCar(obj.date),
			params: getStrOfStatusAndProgress(obj.params.status, obj.params.progress),
			isVisible: obj.params.status
		}
	};
	const newData = (data) => data.map((iter) => getChangeObj(iter));
	const fPaternStrMetod = (result, iter) => {
		iter = `<div class="col-sm-3 col-xs-6">\
		 	<img src="${iter.url}" alt="${iter.name}" class="img-thumbnail">\
		 	<div class="info-wrapper">\
		 		<div class="text-muted">${iter.name}</div>\
		 		<div class="text-muted top-padding">${iter.description}</div>\
	      		<div class="text-muted">${iter.date}</div>\
	      		<div class="text-muted"><button>delete</button></div>\
		 	</div>\
		 </div>`;
		return result + iter;
	};
	// const clearDomeElem = (varClass) => {
	// 	document.querySelector(varClass).classList.add("hide");
	// };
	function init() {
		//очистка элементов страницы
		//clearDomeElem('.first-group');
		DOMElementsLine.innerHTML = newData(data).reduce((res, iter) => fPaternStrMetod(res,iter), '');
		//DOMElementsLine.innerHTML += '';
		document.querySelector('.first-group').classList.add("show");
	}

	btn.addEventListener("click", init);
})();