class Apple{
	type
	age

	constructor(type,appleAge){
		this.type = type;
		this.age = appleAge;
	}
	getAge(){
	return this.age;
	}
	plusDay(){
		this.age +=1;
	}
	moveToGround(){
		this.type = "onGround";

	}
	moveToBad(){
		this.type = "bad";
	}
	getType(){
		return this.type;
	}
}
class Tree{
	appleNumb
	apples 
	age

	constructor(appleNumb,apples = []){

		this.appleNumb = appleNumb;
		this.apples = apples;
		let temp = [];
        for (let k=0;k<appleNumb;k++){
          this.apples.push(new Apple('onTree',Math.floor(Math.random() * 30)));
          temp[k] = apples[k].age;
        }
 		this.age = Math.max.apply( null, temp);
	}
	getAge(){return this.age;}

	plusDay(){
		this.age += 1;
		//для каждого яблока
		this.apples.forEach(function(apple, i, currentapples) {
			apple.plusDay();
			if(apple.getAge()===30){ apple.moveToGround();} // если яблоку 30 дней, то оно падает
			if(apple.getAge()===31){apple.moveToBad();} // если яблоку 31 день, то оно портится
			
		});
		if(this.age % 30===0){this.apples.push(new Apple('onTree',1));}
	}

	countApples(type){
		switch(type){
			case 'bad': { 
				       var result = this.apples.filter(function(apple) { //считаем сколько яблок испорчено
  						return apple.getType()==='bad';
						});
				       return result.length;


				}
				case 'onGround': { 
				       var result = this.apples.filter(function(apple) {  //считаем сколько яблок упало
  						return apple.getType()==='onGround';
						});
				       return result.length;


				}
				case 'onTree': { 
				       var result = this.apples.filter(function(apple) { //считаем сколько яблок на дереве
  						return apple.getType()==='onTree';
						});
				       return result.length;


				}
				default:{
						return this.apples.length;  //общее количество яблок
				}

			}
		}

	}
	


class Garden {
	age
	treeNumb
	trees

    constructor(age,treeNumb,appleNumb,trees = []) {
    	this.age = age;
        this.treeNumb = treeNumb;
        this.appleNumb = appleNumb;
        this.trees = trees;
        for (var k=0;k<treeNumb;k++){
          this.trees.push(new Tree(appleNumb));
        }
        
	}
	getAge(){
		return this.age;
	}
    plusDay(){
    	this.age++;
    	for (let j =0 ; j< treeNumb;j++){
			this.trees[j].plusDay();
		}
    }
    countApples(){

    	let badApples;
    	let applesOnTree;
    	let applesOnGround;
    	let string = "";
    	for (let j =0 ; j< treeNumb;j++){

    		badApples = this.trees[j].countApples('bad');
    		applesOnTree = this.trees[j].countApples('onTree');
    		applesOnGround = this.trees[j].countApples('onGround');

    		string +=`Возраст ${j} дерева ${this.trees[j].getAge()} суток.\n На нем  ${this.trees[j].countApples()} яблок.\n Из них ${applesOnTree} на дереве,${applesOnGround} упали ${badApples} испорчены \n`;
		}
		return string;
    }
    getApplesInfo(){
    	let string = "";
    	for (let j =0 ; j< treeNumb;j++){
    		string += `Возраст яблок на ${j} дереве \n`;
    		//для каждого яблока
			this.trees[j].apples.forEach(function(apple, i, currentapples) {
			string += `Яблоко ${i}  ${apple.getAge()} cуток \n`;
			switch(apple.type){
				case 'bad': {string += `Это яблоко испорчено \n`; return string;};
				case 'onTree': {string += `Это яблоко висит на дереве \n`;return string;};
				case 'onGround' :{string += `Это яблоко лежит на земле \n`; return string;};
			}	
		   });
		}
		return string;
    }
    
   
    
} 


function applesInfo(){

}
//var treeNumb = Math.floor(Math.random() * 100); 
//var appleNumb = Math.floor(Math.random() * 100); 
var treeNumb = 2;
var appleNumb = 2;
let garden = new Garden(0,treeNumb,appleNumb);
const clockButt = document.querySelector('#clockButton');
const applesButt =document.querySelector('#applesButt');

clockButt.onclick = function(){
	garden.plusDay();
	document.querySelector("#gardenAge").value = garden.getAge();
	document.querySelector('#treesNumb').value = garden.treeNumb;
	document.querySelector("#treesApples").innerHTML = garden.countApples();
}
applesButt.onclick = function(){
	document.querySelector("#applesInfo").innerHTML = garden.getApplesInfo();
}
document.querySelector("#gardenAge").value = garden.getAge();
document.querySelector('#treesNumb').value = garden.treeNumb;
document.querySelector("#treesApples").innerHTML = garden.countApples();














