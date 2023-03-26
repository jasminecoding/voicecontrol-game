let myRec = new p5.SpeechRec();
	myRec.continuous = true;
	myRec.interimResults = true;
	myRec.onResult = parseResult;
	myRec.start();


	function parseResult() {
		let word = myRec.resultString.split(' ').pop(); // get most recent word

		if (word === 'up') {
			delta = 5;
		} else if (word === 'down') {
			delta = -5;
		} 
	
		console.log(word);
	}

	

	/*****************/



	let canvasSize = 700;

	

	const player = new Image();
	player.src = 'images/pika.png';

	let playerSize = 70;
	let playerX = 0;
	let playerY = canvasSize / 2;
	let delta = 0;

	let pipeWidth = 90;
	let pipeGap = canvasSize / 2;
	let pipeX = canvasSize;
	let topPipeBottomY = 75;

	let gravity = 0.1;

	let aspectRatio = 1.5;

	let interval = 30;

	let context = c.getContext('2d');

	c.onclick = () => (delta = 5);

	

	const backgroundImage = new Image();
	backgroundImage.src = 'images/space.png';
	backgroundImage.onload = () => {
  	setInterval(() => {

		context.drawImage(backgroundImage, 0, 0, canvasSize, canvasSize);
		context.drawImage(player, playerX, playerY, playerSize * aspectRatio, playerSize);

		playerY -= delta -= gravity;

		pipeX -= 5;

		if (pipeX < -pipeWidth) {
			pipeX = canvasSize;
			topPipeBottomY = pipeGap * Math.random();
		}

		context.fillStyle = '#00914e';
		context.fillRect(pipeX, 0, pipeWidth, topPipeBottomY);

		let bottomY = topPipeBottomY + pipeGap;
		context.fillRect(pipeX, bottomY, pipeWidth, canvasSize);

		let hitPipe =
			(playerY < topPipeBottomY || playerY > bottomY) &&
			pipeX < playerSize * aspectRatio;

		if (hitPipe || playerY > canvasSize) {
			delta = 0;
			playerY = canvasSize / 2;
			pipeX = canvasSize;
		}
	
	}, interval);}

