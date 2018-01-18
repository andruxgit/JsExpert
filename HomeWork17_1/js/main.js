
let btn = document.getElementById("play");

function transform() {
	let arr = [...data];
	let arr2 = [];

	const fDate = param => {
		const newDate = new Date(param);
		const formatDateToNN = myDate => {
			return myDate < 10 ? '0' + myDate : myDate;
		};
		return `${newDate.getFullYear()}/${formatDateToNN(newDate.getMonth())}/${formatDateToNN(newDate.getDate())} ${formatDateToNN(newDate.getHours())}:${formatDateToNN(newDate.getMinutes())}`;
		};

	arr.splice(5,1);
	arr.forEach(function(objItem){
		let newObj = {};
		for (let key in objItem){
			if (key !== 'id') newObj[key] = objItem[key];
		}
		arr2.push(newObj);
	});
	arr2.map(item => {
		item.name = item.name.slice(0,1) + item.name.slice(1,this.length).toLowerCase();
		item.url = 'http://' + item.url;
		item.description = item.description.slice(0,15) + '(...)';
		item.date = fDate(item.date);
		item.isVisible = item.params.status + '=>' + item.params.progress;
	});
	arr2 = arr2.filter(item => item.isVisible.indexOf('true') !== -1 );
	function printData (arr){
		arr.forEach(function (item){
			console.log(item)
		});

	}
	printData(arr2);
}
btn.addEventListener("click", transform);