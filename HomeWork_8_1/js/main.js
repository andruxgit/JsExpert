'use strict';
let summ1 = 0,
	summ2 = 0,
	first,
	second,
	result = '';
const elem = document.getElementById("result");
for (let i = 1; i <= 15; i++) {
	if (i === 8 || i===13) {
	  result +='Пропускаем <br>';
	continue;
	}
	first = Math.floor((Math.random() * 6) + 1);
	second = Math.floor((Math.random() * 6) + 1);
	if (first ===second) {
      result += "\"Выпал дубль. Число"  + first + "\"" + '<br>';
	}
	if ((first < 3) && (second > 4)) {
	  result +="Большой разброс между костями. Разница составляет " +
	  Math.abs(first - second)  + '<br>';
	}
	result +="Первая кость: " + first + "Вторая кость: " + second + '<br>';
	summ1 += first;
	summ2 += second;
}
if (summ1 > summ2){
	result +='<br>' + "Победа, вы (первая кость) набрали"  + summ1 + "очков";
} else if(summ1 < summ2) {
	result +='<br>' + "Вы проиграли. У вас очков:  " + summ2;
} else if (summ1 === summ2) {
	result +='<br>' + "Ничья. У вас и противника очков:  " + summ2;
}
result +=((summ1 + summ2) > 100) ?
 '<br>' + "Полная победа! ТОТАЛ Сумма:  " + (summ1 + summ2):"";
 elem.innerHTML = result;
