var fruitObj = function() {
	this.alive = []; // boolean
	this.num = 30;
	this.orange = new Image();
	this.blue = new Image();
	this.x = [];
	this.y = [];
	this.l = [];
	this.speed = [];
	this.fruitType = [];
}
fruitObj.prototype.init = function() {
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.l[i] = 0;
		this.born(i);
		this.speed[i] = Math.random() * 0.017 + 0.003; //[0.003,0.02]
		this.fruitType[i] = "orange";

	}
	this.orange.src = "./src/fruit.png";
	this.blue.src = "./src/blue.png";
}
fruitObj.prototype.draw = function() {
	if(deltaTime > 40) deltaTime = 40;
	for (var i = 0; i < this.num; i++) {

		// 1.find ane -> 2.grow -> 3.fly
		if (this.fruitType[i] == "blue") {
			var pic = this.blue;
		} else {
			var pic = this.orange;

		}
		if (this.alive[i]) {
			if (this.l[i] < 15) {
				this.l[i] += this.speed[i] * deltaTime;
			} else {
				this.y[i] -= this.speed[i] * 7 * deltaTime;
			}
			ctx2.drawImage(pic, this.x[i] - this.l[i] / 2, this.y[i] - this.l[i] / 2, this.l[i], this.l[i]);

			if (this.y[i] < 10) {
				this.alive[i] = false;
			}
		}
	}
}
fruitObj.prototype.born = function(i) {
	var aneId = Math.floor(Math.random() * ane.num);
	this.x[i] = ane.x[aneId];
	this.y[i] = canHeight - ane.height[aneId];
	this.l[i] = 0;
	this.alive[i] = true;

	if (Math.random() < 0.2) {
		this.fruitType[i] = "blue"; // 蓝色 ？橙色？
	} else {
		this.fruitType[i] = "orange"; // 蓝色 ？橙色？
	}
}

fruitObj.prototype.dead = function(i) {
	this.alive[i] = false;
}

fruitObj.prototype.update = function() {
	var num = 0;
	for (var i = 0; i < this.num; i++) {
		if (this.alive[i]) {
			num++;
		}
	}
}

function fruitMonitor() {
	var num = 0;
	for (var i = 0; i < fruit.num; i++) {
		if (fruit.alive[i]) {
			num++;
		}
	}
	if (num < 15) {
		// 新生果实
		sendFruit();
		return;
	}
}

function sendFruit() {
	for (var i = 0; i < fruit.num; i++) {
		if (!fruit.alive[i]) {
			fruit.born(i);
			return;
		}
	}
}