let Gallery = function () {
   this.arrHideEl = data.slice();
   this.arrVisibleEl = [];
   this.arrDelEl =[];
};
Gallery.prototype = {
	initGallary: function () {
		this.btnAddElement = document.querySelector('#btnAddElement');
		this.elementsGallery = document.querySelector('#elementsGallery');
		this.addCount = document.querySelector('#addCount');
        this.delCount = document.querySelector('#delCount');
        this.aSortNew = document.querySelector('#aSortNew');
        this.aSortOld = document.querySelector('#aSortOld');
        this.aSortName = document.querySelector('#aSortName');
        this.aSortNameRevers= document.querySelector('#aSortNameRevers');
		this.initListeners();
    },
    initListeners: function () {
        this.btnAddElement.addEventListener('click', this.addDomElement.bind(this));
        this.elementsGallery.addEventListener("click", this.delDomElement.bind(this));

        this.aSortNew.addEventListener("click", this.chooseSort.bind(this));
        this.aSortOld.addEventListener("click", this.chooseSort.bind(this));
        this.aSortName.addEventListener("click", this.chooseSort.bind(this));
        this.aSortNameRevers.addEventListener("click", this.chooseSort.bind(this));
    },
    chooseSort: function () {
	    const str = event.target['id'];
       // this.testG('value= ' + str);
        switch (str){
            case 'aSortNew':
                this.arrVisibleEl = this.getSortArr(this.arrVisibleEl, 'firstNew');
                break;
            case 'aSortOld':
                this.arrVisibleEl = this.getSortArr(this.arrVisibleEl, 'firstOld');
                break;
            case 'aSortName':
                this.arrVisibleEl = this.getSortArr(this.arrVisibleEl, 'orderAB');
                break;
            case 'aSortNameRevers':
                this.arrVisibleEl = this.getSortArr(this.arrVisibleEl, 'orderBA');
        }
        this.elementsGallery.innerHTML = this.getArrDOMbyArrObj(this.arrVisibleEl);
    },
    getSortArr: function (arr, kindSort) {
	    switch(kindSort) {
            case 'firstNew':
                return arr.sort((a, b) => (new Date(a.date).getTime()) < (new Date(b.date).getTime())).slice();
            case 'firstOld':
                return arr.sort((a, b) => (new Date(a.date).getTime()) > (new Date(b.date).getTime())).slice();
            case 'orderAB':
                return arr.sort((a, b) => a.name > b.name).slice();
            case 'orderBA':
                return arr.sort((a, b) => a.name < b.name).slice();
        }
    },
    getChangeObjData: function (obj){
        const changeNameData = (str) => {
            return str[0].toUpperCase() + str.slice(1).toLowerCase()
        };
        const changeDateData = (time) => {
            let x = new Date(time);
            return `${x.getFullYear()}/${x.getMonth() + 1}/${x.getDate()} ${x.getHours()}:${x.getMinutes()}`;
        };
        const changeLengthTextData =(str) =>{
            if (str.length > 15) return str.slice(0,15) + '...';
            return str;
        };
        const changeHttpData = (str) => {
            if (str.indexOf('http://') !== 0) {
                return `http://${str}`;
            }
            return str;
        };
        return {
            name: changeNameData(obj.name),
            url: changeHttpData(obj.url),
            description: changeLengthTextData(obj.description),
            date: changeDateData(obj.date),
            progress: obj.params.progress,
            status: obj.params.status,
			id: obj.id
        }
    },
    getDomFromObg: function(obj){
        return `<div class="col-sm-4 col-md-3 col-xs-6">\
		 	<img src="${obj.url}" alt="${obj.name}" class="img-thumbnail">\
		 	<div class="info-wrapper">\
		 		<div class="text-muted">${obj.name}</div>\
		 		<div class="text-muted top-padding">${obj.description}</div>\
	      		<div class="text-muted">${obj.date}</div>\
	      		<div class="text-muted"><button id=${obj.id}>Удалить</button></div>\
		 	</div>\
		 </div>`;
    },
    addDomElement: function(event) {
        event.stopPropagation();
        if (this.arrHideEl.length === 0) {
            this.btnAddElement.disabled = true;
            return
        }
        this.arrVisibleEl.push(this.arrHideEl.shift());
        this.elementsGallery.innerHTML = this.getArrDOMbyArrObj(this.arrVisibleEl);
        this.addCount.innerHTML = `${this.arrVisibleEl.length + this.arrDelEl.length}`;
    },
    delDomElement: function (event) {
        const target = event.target.tagName;
        const id = +event.target.id;
        if (target === 'BUTTON') {
            const delObj = this.arrVisibleEl.filter((item) => item.id === id)[0];
            this.arrDelEl.push(delObj);
            this.arrVisibleEl = this.arrVisibleEl.filter((item) => item.id !== id);
            this.elementsGallery.innerHTML = this.getArrDOMbyArrObj(this.arrVisibleEl);
            this.delCount.innerHTML = `${this.arrDelEl.length}`;
        }
    },
    getArrDOMbyArrObj: function (arrVisibleIdElem) {
        return  arrVisibleIdElem.reduce((res, iter) => {
                return res + this.getDomFromObg(this.getChangeObjData(iter))
        }, '');
    },
};
