// �ж� ����->��ʵ �ľ���
function momFruitsCollision() {
	if (!data.gameover) {
		for (var i = 0; i < fruit.num; i++) {
			if (fruit.alive[i]) {
				var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
				if (l < 900) {
					fruit.dead(i);
					mom.bigBodyCount++;
					if (mom.bigBodyCount > 7) {
						mom.bigBodyCount = 7;
					}

					data.fruitNum++;
					if (fruit.fruitType[i] == "blue") {
						data.double = 2;
					}
				}
			}
		}
	}
}
// ����->С�� ��ײ���
function momBabyCollision() {
	if (!data.gameover) {
		if (data.fruitNum > 0) {
			var l = calLength2(mom.x, mom.y, baby.x, baby.y);
			if (l < 900) {
				// С��ָ�����
				baby.babyBodyCount = 0;
				mom.bigBodyCount = 0;
				data.addScore();
				wave.born(baby.x,baby.y);
			}
		}
	}
}