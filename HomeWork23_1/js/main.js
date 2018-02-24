
(function() {
	let btn = document.querySelector("#play");
	let DOMElementsLine = document.querySelector('#first-line');
	let DOMElementCounter = document.querySelector("#countElements");
	let DomSelectElem = document.querySelector('#selectSort');
	let valSortFromStorage = 0;
	//функции для модификации входных данных
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
	//Модификация входных данных.
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
	//создание шаблонной строки дя вывода одного элемента галереи.
	const getPaternStrForObj = (obj,num) => {
		 return `<div class="col-sm-3 col-xs-6">\
		 	<img src="${obj.url}" alt="${obj.name}" class="img-thumbnail">\
		 	<div class="info-wrapper">\
		 		<div class="text-muted">${obj.name}</div>\
		 		<div class="text-muted top-padding">${obj.description}</div>\
	      		<div class="text-muted">${obj.date}</div>\
	      		<div class="text-muted"><button id=${num}>Удалить</button></div>\
		 	</div>\
		 </div>`;
	};
	//создание шаблонной строки дя перестройки элементов галереи (для reduce)
	const getPaternStrMetodForArr = (result, obj, num) => {
		let strObj = getPaternStrForObj(obj,num);
		return result + strObj;
	};
	//конструктор функции массива видимых элементов галереи
	const getVisibleArr = () => {
		let visibleArr = [];
		let deletedArr = [];
		return {
			addElem: (obj) => {
				visibleArr.push(obj);
			},
		    delElem: (num) => {
				deletedArr.push(visibleArr.splice(num,1));
		    },
		    addedElements:  () =>{
				return visibleArr.length
			},
			arrElements: () => {
				return visibleArr;
			},
			 sortAb: () => {
				return visibleArr.sort((a,b) => {
					return a.name > b.name
				})
			},
			sortBa: () => {
				return visibleArr.sort((a,b) => {
					return a.name < b.name})
			},
			sortNewFirst: () => {
				return visibleArr.sort((a,b) => {
					return (new Date(a.date).getTime()) < (new Date(b.date).getTime())
				})
			},
			sortNewOld: () => {
				return visibleArr.sort((a,b) => {
					return (new Date(a.date).getTime()) > (new Date(b.date).getTime())
				})
			}
	    }
	};
	//массив видимых элементов галереи
	let galeryElements = getVisibleArr();
	//разная сортировка элементов по выбранному виду сортировки
	const getMethodSort = (num) => {
		localStorage['valSortStorage'] = num;
		let arrGallery = [];
		if (num === '1') {
			arrGallery = galeryElements.sortAb();
		}
		else if (num === '2') {
			arrGallery = galeryElements.sortBa();
		}
		else if (num === '3') {
			arrGallery = galeryElements.sortNewFirst();
		}
		else if (num === '4') {
			arrGallery = galeryElements.sortNewOld();
		}
		else{
			arrGallery = galeryElements.arrElements;
		}
		DOMElementsLine.innerHTML = arrGallery.reduce((res, iter) => getPaternStrMetodForArr(res, iter, arrGallery.indexOf(iter)), '');
	};
	//добавление элемента галереи
	//вызов модального окна
	//учет значения вида сортировки в local storage
	const addElem = () => {
		let valVisibleElem = 0;
		if (galeryElements.addedElements() > 0) {
			valVisibleElem = galeryElements.addedElements();
		}
		if ((valVisibleElem) > data.length - 1){
				return jQuery("#myModalBox").modal('show');
		}
        if ((valVisibleElem) <= data.length - 1) {
			const addObj = data[valVisibleElem];
			const changeAddObj = getChangeObj(addObj);
			DOMElementsLine.innerHTML += getPaternStrForObj(changeAddObj, valVisibleElem);
			galeryElements.addElem(changeAddObj);
			DOMElementCounter.innerHTML = `Добавленно изображений ${valVisibleElem + 1}`;
			getMethodSort(localStorage['valSortStorage']);
			if (valVisibleElem === 0) {
				 document.querySelector('.first-group').classList.add("show");
			}
		}
		if (valVisibleElem === data.length - 1) {
        	btn.textContent = `Галерея закончилась`;
        	btn.style.backgroundColor = 'grey';
        }
	};
	//удаление элемента галереи
	const delElem = (event) => {
		const target = event.target.tagName;
		let arrGallery = galeryElements.arrElements();
		if (target === 'BUTTON') {
			galeryElements.delElem(event.target.id);
			DOMElementsLine.innerHTML = '';
			DOMElementsLine.innerHTML = arrGallery.reduce((res, iter) =>
				getPaternStrMetodForArr(res, iter, arrGallery.indexOf(iter) ), '');
		}
	};
	//события загрузки, добавления, удаления, выбора сортировки
	document.addEventListener('DOMContentLoaded',()=>{
		if (localStorage['valSortStorage']) {
			valSortFromStorage = localStorage['valSortStorage'];
		}
	});
	btn.addEventListener("click", addElem);
	DOMElementsLine.addEventListener("click", delElem);
	DomSelectElem.addEventListener('change', () => getMethodSort(DomSelectElem.value));
})();
