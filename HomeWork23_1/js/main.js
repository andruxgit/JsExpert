//Создание галереи тремя способами.
(function(){
	let btn = document.getElementById("play");
	let DOMElementsLine = {
		firstBlock: document.querySelector('#first-line'),
		secondBlock: document.querySelector('#second-line'),
		thirdBlock: document.querySelector('#third-line')
	};
	let DOMElementsGr = {
		firstBlock: document.querySelector('.first-group'),
		secondBlock: document.querySelector('.second-group'),
		thirdBlock: document.querySelector('.third-group')
	};
	//Функции данных
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
	const getNewArr = (arr) => {
			return {
				name: getName(arr.name),
				url: getHttp(arr.url),
				description: getDecdrLength15(arr.description),
				date: newFormatDateCar(arr.date),
				params: getStrOfStatusAndProgress(arr.params.status, arr.params.progress),
				isVisible: arr.params.status
			}
	};
	//Функция создания элемента галереи методом 'replace'
	const fReplaceMetod = (result, iter) => {
		let replaceItemTemplate = '<div class="col-sm-3 col-xs-6">\
    	<img src="$url" alt="$name" class="img-thumbnail">\
    	<div class="info-wrapper">\
		<div class="text-muted">$name</div>\
    	<div class="text-muted top-padding">$description</div>\
    	<div class="text-muted">$date</div>\
    	</div>\
    	</div>';
		iter = replaceItemTemplate
		.replace(/\$name/gi, iter.name)
		.replace("$url", iter.url)
		.replace("$description", iter.description)
		.replace("$date", iter.date);
		return result + iter;
	};
	//Функция создания элемента галереи методо шаблонных строк.
	const fPaternStrMetod = (result, iter) => {
		iter = `<div class="col-sm-3 col-xs-6">\
		 	<img src="${iter.url}" alt="${iter.name}" class="img-thumbnail">\
		 	<div class="info-wrapper">\
		 		<div class="text-muted">${iter.name}</div>\
		 		<div class="text-muted top-padding">${iter.description}</div>\
	      		<div class="text-muted">${iter.date}</div>\
		 	</div>\
		 </div>`;
		return result + iter;
	};
	//Функция создания элемента галереи методом 'createElement'
	//и добавление его в целевой блок
	const galleryByCrElem = (itemObj) => {
		const imgElem = document.createElement('img');
			imgElem.src = itemObj.url;
			imgElem.alt = itemObj.name;
			imgElem.classList.add('img-thumbnail');
		const divName = document.createElement('div');
			divName.className = "text-muted";
		const divDescr = document.createElement('div');
			divDescr.className = "text-muted";
			divDescr.classList.add("top-padding");
		const divData = document.createElement('div');
			divData.className = "text-muted";
		const divInfoAll = document.createElement('div');
			divInfoAll.className = 'info-wrapper';
		const divElem = document.createElement('div');
			divElem.className = "col-sm-3 col-xs-6";
		divName.appendChild(document.createTextNode(itemObj.name));
		divDescr.appendChild(document.createTextNode(itemObj.description));
		divData.appendChild(document.createTextNode(itemObj.date));
		divInfoAll.appendChild(divName);
		divInfoAll.appendChild(divDescr);
		divInfoAll.appendChild(divData);
		divElem.appendChild(imgElem);
		divElem.appendChild(divInfoAll);
		DOMElementsLine.thirdBlock.appendChild(divElem);
	};
	//Преобразование массива данных к необходимому формату
	const newData = data.map((iter) => getNewArr(iter));
	//Функция изменения массива элементовв зависимости от выбора колличества отображения
	const fNumElements = (value) => {
		if (value === '1') return newData.slice(0, 3);
		else if (value === '2') return newData.slice(0, 6);
		return newData;
	};
	const startSelectMethod = (numMethod, initData) => {
		if (numMethod === '1'){
				DOMElementsLine.firstBlock.innerHTML =  initData.reduce((res, iter) => fReplaceMetod (res,iter), '');
				DOMElementsGr.firstBlock.classList.add("show");
		}
		if (numMethod === '2'){
			DOMElementsLine.secondBlock.innerHTML = initData.reduce((res, iter) => fPaternStrMetod(res,iter), '');
			DOMElementsGr.secondBlock.classList.add("show");
		}
		if ((numMethod === '3')) {
			initData.forEach((iter) => galleryByCrElem(iter));
			DOMElementsGr.thirdBlock.classList.add("show");
		}
	};
	const clearDomeElem = () =>{
		DOMElementsLine.thirdBlock.innerHTML = '';
		DOMElementsGr.firstBlock.classList.remove("show");
		DOMElementsGr.secondBlock.classList.remove("show");
		DOMElementsGr.thirdBlock.classList.remove("show");
	};
	function init() {
		//очистка элементов страницы
		clearDomeElem();
		// Создание размера отображаемого массива.
		 const initData = fNumElements(document.getElementById('line-selector').value);
		// выбор и применение методов создания галереи.
		const getSelectorMethod = document.getElementById('type-selector').value;
		startSelectMethod(getSelectorMethod,initData);
}
	btn.addEventListener("click", init);
})();