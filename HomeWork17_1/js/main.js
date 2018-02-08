
let btn = document.getElementById("play");
const get_date = (param) =>{
	const temp = moment(new Date(param));
	return temp.format('YYYY/MM/DD hh:mm')
};
const get_name =(str) => {
	return str[0].toUpperCase() + str.substring(1).toLowerCase();
};
const get_http = (str) => {
	if (str.indexOf('http://') !== 0) {
		return `http:// ${str}`;
	}
	return str;
};
const get_descript = (str) => {
	if (str.length > 15){
		return `${str.slice(0, 15)}...`;
	}
	return str;
};
const getStrOfStatusAndProgress = (str1, str2) => {
	return `${str1}=>${str2}`
};

const getNewArr = (arr) => {
	return arr.map(item => {
		return {
			name: get_name(item.name),
			url: get_http(item.url),
			description: get_descript(item.description),
			date: get_date(item.date),
			params: getStrOfStatusAndProgress(item.params.status, item.params.progress),
			isVisible: item.params.status
		}
	});
};
const getObjMethodSplice = (arr, p1, p2) => {
	arr.splice(p1, p2);
	return arr;
};
const delIdMethodForEach = (arr) => {
	let arr2 = [];
	arr.forEach((objItem) => {
		if (objItem.id){
			delete objItem.id;
		}
		arr2.push(objItem);
	});
	return arr2;
};
const objFilter = (arr) => {
    return 	arr.filter(item => item.isVisible !== false )
};
const printNewData = (arr) => {
	arr.forEach(function (item) {
		console.log(item);
	});
};
const transform = () => {
	data = getObjMethodSplice(data, 5, 1);
    data = delIdMethodForEach(data);
	data = getNewArr(data);
	data = objFilter(data);
	printNewData(data);
};
btn.addEventListener("click", transform);