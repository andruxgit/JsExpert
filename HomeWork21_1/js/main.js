//Создание галереи тремя способами.
(function(){

	let btn = document.getElementById("play"),
		firstBlock = document.querySelector('#first-line'),
		secondBlock = document.querySelector('#second-line'),
		thirdBlock = document.querySelector('#third-line');

    //Функция преобразования массива.
	const fTransfData = (dataObj) => {
		const funcLength15 = (str) => str.slice(0,15) + '...';
		const fDate = param => {
		const newDate = new Date(param);
		const formatDateToNN = myDate => myDate < 10 ? '0' + myDate : myDate;
		return `${newDate.getFullYear()}/${formatDateToNN(newDate.getMonth() + 1 )}/${formatDateToNN(newDate.getDate())} 		${formatDateToNN(newDate.getHours())}:${formatDateToNN(newDate.getMinutes())}`;
		};
		dataObj.date = fDate(dataObj.date);
		dataObj.description = funcLength15(dataObj.description);
		dataObj.url = 'http://' + dataObj.url;
		return dataObj;
	};
	//Функция создания элемента галереи методом 'replace'
	const fReplaceMetod = (result,iter) => {
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
		thirdBlock.appendChild(divElem);
	};

	//Преобразование массива данных к необходимому формату
	const newData = data.map((iter) => fTransfData(iter));

    //Функция запуска отображения галереи select.options[select.selectedIndex]
	function init() {
		thirdBlock.innerHTML = '';

		document.querySelector('.first-group').classList.remove("show");
		document.querySelector('.second-group').classList.remove("show");
		document.querySelector('.third-group').classList.remove("show");
		//Функция изменения массива элементовв зависимости от выбора колличества отображения
		const fNumElements = (value) => {
			if (value === '1') return newData.slice(0, 3);
			else if (value === '2') return newData.slice(0, 6);
			return newData;
		};
		// Создание отображаемого массива.
		const initData = fNumElements(document.getElementById('line-selector').value);

		// выбор и применение методов создания галереи.
		const selectMethod = document.getElementById('type-selector').value;
		if (selectMethod === '1'){
			firstBlock.innerHTML =  initData.reduce((res, iter) => fReplaceMetod (res,iter), '');
			document.querySelector('.first-group').classList.add("show");

		}
		if (selectMethod === '2'){
			secondBlock.innerHTML = initData.reduce((res, iter) => fPaternStrMetod(res,iter), '');
			document.querySelector('.second-group').classList.add("show");
		}
		if ((selectMethod === '3')){
			initData.map((iter) => galleryByCrElem(iter));
			document.querySelector('.third-group').classList.add("show");
		}
	}
	btn.addEventListener("click", init);
})();