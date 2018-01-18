//Задачи к 17 лекции.
console.log ('Задачи к 17 лекции');
// 1 - преобразовать массив
console.log ('1)преобразовать массив');
const goods = ['foods','fruits','technics','phones','computers'];
const result = goods.filter(item => item !== 'technics').join();
console.log(result);

// 2 - Преобразование текущей даты в понятный формат.
// используя шаблонные строки

console.log ('2)Преобразование текущей даты в понятный формат.');
function concZer (item){
	if (item < 10) return '0'+item;
	return item;
}
const curDate = new Date();
const myDate = `${concZer(curDate.getHours())}:${concZer(curDate.getMinutes())} ${concZer(curDate.getDate())}/${concZer(curDate.getMonth() + 1)}/${curDate.getFullYear()}`;

//Проверка
console.log(myDate);

// Функция, возвращающая расширение файла.
console.log ('3)Функция, возвращающая расширение файла.');
function suffix (item){
	const position = item.lastIndexOf('.');
	return item.slice(position);
}
//Проверка
console.log(suffix('C:/JsExpertGit/HomeWork17_1/index.html'));

// функция, удаляющая дубликаты.
console.log ('4)Функция, удаляющая дубликаты.');
function dellDubl (arr) {
	let result2 = [];
	arr.forEach(item => {
		if (result2.some(res => res === item)) {
			return;
		}
		return result2.push(item);
	});
	return result2
}
//Проверка
const data = [1,2,2,3,4,5,6,4,6,4,9,7,8,8,9];
console.log(dellDubl(data));