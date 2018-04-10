'use strict';
(function() {

    let btn1 = document.querySelector('#play');
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
	//конструктор счетчика добавленных элементов
	const makeCounter = () => {
		let privateCounter = -1;
		return {
			increment: () => {
				privateCounter += 1;
			},
			value: () => {
				return privateCounter;
			}
		}
	};
	//счетчик
	let counter = makeCounter();
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
		    addedElements: visibleArr.length,
			arrElements: visibleArr,
            sortAb: ()=>{
				return visibleArr.sort((a,b) => {
					return a.name > b.name
				})
			},
			sortBa: ()=>{
				return visibleArr.sort((a,b) => {
					return a.name < b.name})
			},
			sortNewFirst: () => {
				return visibleArr.sort((a,b) => {
					return (new Date(a.date).getTime()) < (new Date(b.date).getTime())
				})
			},
			sortOldFirst: () => {
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
		localStorage.setItem('valSortStorage', num);
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
			arrGallery = galeryElements.sortOldFirst();
		}
		else{
			arrGallery = galeryElements.arrElements;
		}
		DOMElementsLine.innerHTML = arrGallery.reduce((res, iter) => getPaternStrMetodForArr(res, iter, galeryElements.arrElements.indexOf(iter)), '');
	};
	//добавление элемента галереи
	//вызов модального окна
	//учет значения вида сортировки в local storage
	const addElem = () => {
		counter.increment();
		if ((counter.value()) > data.length - 1){
				return $("#myModalBox").modal('show');
		}
        if ((counter.value()) <= data.length - 1) {
			const addObj = data[counter.value()];
			const changeAddObj = getChangeObj(addObj);
			DOMElementsLine.innerHTML += getPaternStrForObj(changeAddObj, counter.value());
			galeryElements.addElem(changeAddObj);
			DOMElementCounter.innerHTML = `Добавленно изображений ${counter.value() + 1}`;
			getMethodSort(localStorage['valSortStorage']);
			if (counter.value() === 0) {
				 document.querySelector('.first-group').classList.add("show");
			}
		}
		if (counter.value() === data.length - 1) {
        	btn1.textContent = `Галерея закончилась`;
        	btn1.style.backgroundColor = 'grey';
        }
	};
	//удаление элемента галереи
	const delElement = (event) => {
		const target = event.target.tagName;
		if (target === 'BUTTON') {
			galeryElements.delElem(event.target.id);
			DOMElementsLine.innerHTML = '';
			DOMElementsLine.innerHTML = galeryElements.arrElements.reduce((res, iter) =>
				getPaternStrMetodForArr(res, iter, galeryElements.arrElements.indexOf(iter) ), '');
		}
	};
	//события загрузки, добавления, удаления, выбора сортировки
	document.addEventListener('DOMContentLoaded',()=>{
		if (localStorage['valSortStorage']) {
			valSortFromStorage = localStorage['valSortStorage'];
		}
	});
	btn1.addEventListener("click", addElem);
	DOMElementsLine.addEventListener("click", delElement);
	console.log('start sort');
	DomSelectElem.addEventListener('change', () => getMethodSort(DomSelectElem.value));
})();
