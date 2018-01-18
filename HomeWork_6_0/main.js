// Код для первого задания по курсу "Простой Java Script"
//Отформатирован, исправлен.
(function(win){
  let params = {
    states:{
	  url:"/",template: "temlate.js"
	}
  };
  function setStates(params){
    if(win && !win.params){
	  win.params = params;
	}
  }
  setStates();
  console.log(params.states.template);
})(window);
const elem = document.getElementById("myText");
let a = 0, b = 0, c = 0, d ;
     cs = 'courses',
     res = '',
     iter = 0,
     num = 10;
console.log(a,b,c);
a = 1; b = 2; c = 3;
console.log(a,b,c);

console.log(d);

console.log(d = true);
console.log(d = 100);
console.log(d = "js");
console.log(d = null);
console.log(typeof(d));

result = 'js' + " " + cs;
console.log(res);
elem.innerHTML += '<br>' + res;

++iter; ++iter; ++iter;
x = z = iter;
console.log(x, z, iter);

console.log(typeof(num));
num = String(num);
console.log(typeof(num));
num = Boolean(num);
console.log(typeof(num));
num = Number(num);
console.log(typeof(num));