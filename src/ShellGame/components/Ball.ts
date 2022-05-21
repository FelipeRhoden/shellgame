import p5Types from "p5";

export const DrawBall = (p5: p5Types, ball: Ball) => {
	p5.noStroke();
	p5.fill("#003142");
	p5.ellipse(ball.x - ball.width / 2, ball.y + ball.height * 0.45, ball.width * 1.25, ball.height / 4);
	p5.fill(255);
	p5.ellipse(ball.x, ball.y, ball.width, ball.height);
};

export interface Ball {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface BallMoveLocation {
	initialLocationCup: Ball;
	finalLocationCup: Ball;
	index: number;
}