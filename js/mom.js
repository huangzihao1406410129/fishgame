var momObj = function() {
	this.x;
	this.y;
	this.bigEye = new Image();
	this.bigBody = new Image();
	this.bigTail = new Image();
	this.angle;

	this.bigTailTimer = 0;//
	this.bigTailCount = 0;
	this.bigEyeTimer = 0;//
	this.bigEyeCount = 0;
	this.bigEyeInterval = 1000;
	this.bigBodyCount = 0;//
}
momObj.prototype.init = function() {
	this.x = canWidth / 2;
	this.y = canHeight / 2;
	// this.bigEye.src = "./src/bigEye0.png";
	// this.bigBody.src = "./src/bigSwim0.png";
	// this.bigTail.src = "./src/bigTail0.png";
	this.angle = 0;

}
momObj.prototype.draw = function() {
	// ◊∑ÀÊ Û±Í
	this.x = lerpDistance(mx, this.x, 0.98);
	this.y = lerpDistance(my, this.y, 0.98);
	// lerb Ω«∂»
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;
	this.angle = lerpAngle(beta, this.angle, 0.6);

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);

	// Œ≤∞ÕÕº∆¨«–ªª
	var bigTailCount = this.bigTailCount;
	ctx1.drawImage(bigTail[bigTailCount], -bigTail[bigTailCount].width / 2 + 30, -bigTail[bigTailCount].height / 2);
	// …ÌÃÂ
	var bigBodyCount = this.bigBodyCount;
	if(data.double == 1){		//orangebigBodyOra[bigBodyCount]
		ctx1.drawImage(bigBodyOra[bigBodyCount], -bigBodyOra[bigBodyCount].width / 2, -bigBodyOra[bigBodyCount].height / 2);
	}else{
		ctx1.drawImage(bigBodyBlue[bigBodyCount], -bigBodyBlue[bigBodyCount].width / 2, -bigBodyBlue[bigBodyCount].height / 2);
	}
	// —€æ¶Õº∆¨«–ªª
	var bigEyeCount = this.bigEyeCount;
	ctx1.drawImage(bigEye[bigEyeCount], -bigEye[bigEyeCount].width / 2, -bigEye[bigEyeCount].height / 2);
	ctx1.restore();

	// Œ≤∞Õ«–ªª—≠ª∑
	this.bigTailTimer += deltaTime;
	if (this.bigTailTimer > 50) {
		this.bigTailCount = (this.bigTailCount + 1) % 8;
		this.bigTailTimer %= 50;
	}
	// —€æ¶«–ªª—≠ª∑
	this.bigEyeTimer += deltaTime;
	if (this.bigEyeTimer > this.bigEyeInterval) {
		this.bigEyeCount = (this.bigEyeCount + 1) % 2;
		this.bigEyeTimer = 0;
		if (this.bigEyeCount == 0) {
			this.bigEyeInterval = Math.random() * 2000 + 1000; //[1000,3000]
		} else {
			this.bigEyeInterval = 200;
		}
	}
}

// «–ªªÕº∆¨…Ë÷√
var bigTail = [];
for (var i = 0; i < 8; i++) {
	bigTail[i] = new Image();
	bigTail[i].src = "./src/bigTail" + i + ".png";
}
var bigEye = [];
for (var i = 0; i < 2; i++) {
	bigEye[i] = new Image();
	bigEye[i].src = "./src/bigEye" + i + ".png";
}

var bigBodyOra = [];
var bigBodyBlue = [];
for (var i = 0; i < 8; i++) {
	bigBodyOra[i] = new Image();
	bigBodyBlue[i] = new Image();
	bigBodyOra[i].src = "./src/bigSwim"+i+".png";
	bigBodyBlue[i].src = "./src/bigSwimBlue"+i+".png";
}