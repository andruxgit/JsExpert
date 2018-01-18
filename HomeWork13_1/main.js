(function(){
  var summ1 = 0,
      summ2 = 0,
      first = 0,
      second = 0;
  const getRndNumber =() => Math.floor((Math.random() * 6) + 1);

  const printResult = (str) => {
	return document.getElementById("result").innerHTML = setResult("");
  }
  const summStr =(str) =>{
	var currentString = "";
	return  function(str){
		      currentString += str ;
		      return currentString;
		    }
  }
  var setResult = summStr();

  const  isNumberEqual = (num1, num2, str) => {
	  if (num1 === num2) {
		return setResult(str + num1 + '<br>')
	  }
   }
   const  isBigDifference = (num1, num2, str) => {
	  if (Math.abs(num1 - num2) > 3) {
		return setResult(str + Math.abs(num1 - num2) + '<br>')
	  }
  }
  const total = (summ1,summ2, strWin, strLoss) => {
	let sum = summ1 + summ2;
	return setResult(sum > 100 ? strWin + sum : strLoss + sum);
  }

for (var i = 1; i <= 15; i++) {
	if (i == 8 || i==13) {
		setResult('Пропускаем  <br>')
	continue;
	}
	first = getRndNumber()
	second = getRndNumber()

	isNumberEqual(first, second, 'Выпал дубль. Число ')

	isBigDifference(first, second, "Большой разброс между костями. Разница составляет:" )

	setResult("Первая кость: " + first + "Вторая кость: " + second + '<br>')

	summ1 += first;
	summ2 += second;
};
	setResult( '<br><br><br>')

    total(summ1, summ2, "Полная победа! Всего очков: ", "Проигрыш! Всего очков: " )

    printResult();

})()





