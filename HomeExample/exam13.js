//задачи к 13 лекции
// определение колличества ворон 
'use strict';
console.log('задачи к 13 лекции');
function HowMuchBird (bird) {
	let strTemp =  'На ветке сидит ' + bird + ' ворон';
	let bird100 = bird % 100;
	let bird10 = bird % 10;
	let strEnd = '';
		
	if (isNaN(bird)) return 'error';
	+bird;	
	if (bird100 >= 11 && bird100 <= 19) {
	}
	else{
		switch (bird10) {
			case(1): strEnd = "а"; break;
			case(2): 
			case(3): 
			case(4): strEnd = 'ы'; break;
			default: strEnd = '';
		}
	}	
	return '"На ветке сидит ' + bird + ' ворон' + strEnd + '"';	
}
//Проверка
console.log('1) Колличество ворон');
for (let i = 0; i < 12; ++i){
	console.log(HowMuchBird(i));
}
for (let i = 99; i < 105; ++i){
	console.log(HowMuchBird(i));
}
//  остаток строки обрезается и вставляется символ … (троеточие)
function pointsStr(str) {
	str = str + '';
	if (str.length >= 15) {
		return str.substring(0,15) + '...';
	}
	return str;
}
// Проверка
console.log('2) Обрезание строки'); 
var iter = '';
for (let i=1 ; i < 5; ++i){
	iter += 'раздватри*';
	console.log(pointsStr(iter));
}
// Определение Високосного года
function isLeapYear (year) {
    if (isNaN(year)) return 'error';
    year = (+year);
    if (year % 400 === 0) return true;
	if ((year % 4 === 0) && ((year % 100) === 0)) return false;
	if (year %4 === 0) return true;
	return false;
}
//проверка
console.log('3) Определение Високосного года');
console.log(isLeapYear(1600));  //true
console.log(isLeapYear(2100));  //false
console.log(isLeapYear(2012)); //true
console.log(isLeapYear());    //Error - year is not found
