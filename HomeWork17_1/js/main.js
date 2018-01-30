
let btn = document.getElementById("play");
const fTransf_date = (param) =>{
	const temp = moment(new Date(param));
	return temp.format('YYYY/MM/DD hh:mm')
};
const fTransf_Name =(str) => {
	return str[0].toUpperCase() + str.substring(1).toLowerCase();
};
const fTransf_Http = (str) => {
	if (str.indexOf('http://') !== 0) {
		return `http://' ${str}`;
	}
	return str;
};
const fTransf_Descript = (str) => {
	if (str.length > 15){
		return `${str.slice(0, 15)}...`;
	}
	return str;
};
const fTransf_Params = (str1, str2) => {
	return `${str1}=>${str2}`
};
const fTransf_All = (arr) => {
	return arr.map(item => {
		return {
			name: fTransf_Name(item.name),
			url: fTransf_Http(item.url),
			description:fTransf_Descript(item.description),
			date: fTransf_date(item.date),
			params: fTransf_Params(item.params.status, item.params.progress),
			isVisible: item.params.status
		}
	});
};
const fSplice = (arr, p1, p2) => {
	arr.splice(p1, p2);
	return arr;
};
const fForEach = (arr) => {
	let arr2 = [];
	arr.forEach((objItem) => {
		if (objItem.id){
			delete objItem.id;
		}
		arr2.push(objItem);
	});
	return arr2;
};
const fFilter = (arr) => {
    return 	arr.filter(item => item.isVisible !== false )
};
const printData = (arr) => {
	arr.forEach(function (item) {
		console.log(item)
	});
};
const transform = () => {
	let arr = data.slice(0);
	arr = fSplice(arr, 5, 1);
	arr = fForEach(arr);
	arr = fTransf_All(arr);
	arr = fFilter(arr);
	printData(arr);
};
btn.addEventListener("click", transform);