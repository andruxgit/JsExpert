const btn = document.getElementById("play");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const resultDiv = document.getElementById("result");


function runGame() {
	const  getPlayerResult = () => Math.floor((Math.random() * 3) + 1);

	const isThing = numRandom => {
		if (numRandom === 1) return 'Камень';
		if (numRandom === 2) return 'Бумага';
		if (numRandom === 3) return 'Ножницы';
		return 'Mistake';
	};

	const whoWin = (thing1, thing2) => {
		if (thing1 === thing2) return 'Ничья';
		if (thing1 === 'Камень'&& thing2 === 'Ножницы' || thing1 === 'Бумага'&& thing2 === 'Камень' ||
			thing1 === 'Ножницы'&& thing2 === 'Бумага') return 'Победил первый Игрок';
		return 'Победил второй игрок';
	};
	const printResult = (str, div) =>{
		div.innerHTML = str;	
	};

	const thing1 = isThing(getPlayerResult());
	const thing2 = isThing(getPlayerResult());
	const result = whoWin(thing1, thing2);
		
	player1.innerHTML = thing1;
    player2.innerHTML = thing2;
		 
	printResult(result, resultDiv );
}

btn.addEventListener("click", runGame);