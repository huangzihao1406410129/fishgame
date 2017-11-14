var babyObj = function() {
	this.x;
	this.y;
	this.angle;
	this.babyEye = new Image();
	this.babyBody = new Image();
	this.babyTail = new Image();

	this.babyTailTimer = 0;
	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;
	this.babyTailCount = 0;
	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}
babyObj.prototype.init = function() {
	this.x = canWidth / 2 + 50;
	this.y = canHeight / 2 - 50;
	// this.babyEye.src = "./src/babyEye0.png";
	this.babyBody.src = "./src/babyFade0.png";
	// this.babyTail.src = "./src/babyTail0.png";
	this.angle = 0;

}
babyObj.prototype.draw = function() {
		// ◊∑ÀÊ¥Û”„
		this.x = lerpDistance(mom.x, this.x, 0.98);
		this.y = lerpDistance(mom.y, this.y, 0.98);
		// lerb Ω«∂»
		var deltaX = mom.x - this.x;
		var deltaY = mom.y - this.y;
		var beta = Math.atan2(deltaY, deltaX) + Math.PI;
		this.angle = lerpAngle(beta, this.angle, 0.6);

		// Œ≤∞Õ«–ªª—≠ª∑
		this.babyTailTimer += deltaTime;
		if (this.babyTailTimer > 50) {
			this.babyTailCount = (this.babyTailCount + 1) % 8;
			this.babyTailTimer = 0;
		}
		// —€æ¶«–ªª—≠ª∑
		this.babyEyeTimer += deltaTime;
		if (this.babyEyeTimer > this.babyEyeInterval) {
			this.babyEyeCount = (this.babyEyeCount + 1) % 2;
			this.babyEyeTimer = 0;
			if (this.babyEyeCount == 0) {
				this.babyEyeInterval = Math.random() * 2000 + 1000; //[1000,3000]
			} else {
				this.babyEyeInterval = 200;
			}
		}
		this.babyBodyTimer += deltaTime;
		if (this.babyBodyTimer > 300) {
			this.babyBodyCount = this.babyBodyCount + 1;
			this.babyBodyTimer = 0;
			if (this.babyBodyCount > 19) {
				this.babyBodyCount = 19;
				// GAME OVER
				data.gameover = true;
			}
		}

		ctx1.save();
		ctx1.translate(this.x, this.y);
		ctx1.rotate(this.angle);
		// Œ≤∞ÕÕº∆¨«–ªª
		var babyTailCount = this.babyTailCount;
		ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width / 2 + 25, -babyTail[babyTailCount].height / 2);

		// …ÌÃÂ—’…´«–ªª
		var babyBodyCount = this.babyBodyCount;
		ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width / 2, -babyBody[babyBodyCount].height / 2);

		// —€æ¶Õº∆¨«–ªª
		var babyEyeCount = this.babyEyeCount;
		ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width / 2, -babyEye[babyEyeCount].height / 2);

		ctx1.restore();

	}
	// ∂Øª≠–Ú¡–÷°…Ë÷√
var babyTail = [];
for (var i = 0; i < 8; i++) {
	babyTail[i] = new Image();
	babyTail[i].src = "./src/babyTail" + i + ".png";
}
var babyEye = [];
for (var i = 0; i < 2; i++) {
	babyEye[i] = new Image();
	babyEye[i].src = "./src/babyEye" + i + ".png";
}
var babyBody = [];
for (var i = 0; i < 20; i++) {
	babyBody[i] = new Image();
	babyBody[i].src = "./src/babyFade" + i + ".png";
}