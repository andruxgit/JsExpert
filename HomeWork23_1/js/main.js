
(function() {
	let btn = document.getElementById("play");
	let DOMElementsLine = document.querySelector('#first-line');
	let DOMElementCounter = document.getElementById('countElements');

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
	const GetPaternStrMetod = (obj,num) => {
		 return `<div class="col-sm-3 col-xs-6">\
		 	<img src="${obj.url}" alt="${obj.name}" class="img-thumbnail">\
		 	<div class="info-wrapper">\
		 		<div class="text-muted">${obj.name}</div>\
		 		<div class="text-muted top-padding">${obj.description}</div>\
	      		<div class="text-muted">${obj.date}</div>\
	      		<div class="text-muted"><button id=${num}>delete</button></div>\
		 	</div>\
		 </div>`;
	};
	const resultPaternStrMetod = (result, iter, num) => {
				iter = `<div class="col-sm-3 col-xs-6">\
		 	        <img src="${iter.url}" alt="${iter.name}" class="img-thumbnail">\
		 	        <div class="info-wrapper">\
		 	        	<div class="text-muted">${iter.name}</div>\
		 	        	<div class="text-muted top-padding">${iter.description}</div>\
	      	        	<div class="text-muted">${iter.date}</div>\
	      	        	<div class="text-muted"><button id=${num}>delete</button></div>\
		 	        </div>\
		        </div>`;
		return result + iter;
	};
	const makeCounter = () => {
	   let privateCounter = -1;
	   const changeBy = (val) =>{
		   privateCounter += val;
	   };
	   return {
		   increment: () => {
		   	changeBy(1);
		   },
		   value: () => {
		   	return privateCounter;
		   }
	   }
    };
	let counter = makeCounter();
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
			arrElements: visibleArr
			// deletedElements: () => {
			// 	return deletedArr.splice();
			//}
	    }
	};
	let galeryElements = getVisibleArr();

	const addElem = () => {
		counter.increment();
		if ((counter.value()) > data.length - 1){
			return alert('all');
		}
        if ((counter.value()) <= data.length - 1) {
			const addObj = data[counter.value()];
			const changeAddObj = getChangeObj(addObj);
			DOMElementsLine.innerHTML += GetPaternStrMetod(changeAddObj, counter.value());
			galeryElements.addElem(changeAddObj);
			DOMElementCounter.innerHTML = `Добавленно изображений ${counter.value() + 1}`;
			if (counter.value() === 0) {
				document.querySelector('.first-group').classList.add("show");
			}
		}
		if (counter.value() === data.length - 1) {
			//btn.removeEventListener("click", addElem);
        	btn.textContent = `Галерея закончилась`;
        	btn.style.backgroundColor = 'grey';
        }
	};
	const delElem = (event) => {
		const target = event.target.tagName;
		if (target === 'BUTTON') {
			galeryElements.delElem(event.target.id);
			DOMElementsLine.innerHTML = '';
			DOMElementsLine.innerHTML = galeryElements.arrElements.reduce((res, iter) =>
				resultPaternStrMetod(res, iter, galeryElements.arrElements.indexOf(iter) ), '');
		}
	};
	btn.addEventListener("click", addElem);
	DOMElementsLine.addEventListener('click', delElem);
})();
