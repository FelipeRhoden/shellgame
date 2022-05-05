import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import { DrawCup, Cup } from "./components/Cup";
import { Ball, DrawBall } from "./components/Ball";

export const ShellGame = ( ) => {
	let cup1 = { cup: -1, finalX: 0, atualX: 0, finalY: 0, atualY:0 };
	let cup2 = { cup: -1, finalX: 0, atualX: 0, finalY: 0, atualY:0 };
	let ball1 = { cup: -1, finalX: 0, atualX: 0, finalY: 0, atualY:0 };
	let cups: Cup[] = [];
	let ball: Ball;
	const width = 1200;
	const height = 700;
	const numberCups = 3;
	let inAction = false;
	let frameRate = 60;
	let durantionShuffling = 5;
	let movePerSecond = 3;
	let time = 0;
	let movesInRate: number;
	const distance = 240;

	const generateCups = (positionX: number, positionY: number, distanceX: number, width: number, height: number, amounth: number): Cup[] => {
		const modPostionCenter = positionX + Math.abs( ( amounth % 2 ) - 1 ) * distanceX/2;
		const modInitialPosition =  Math.floor( amounth/2 );
		const cups: Cup[] = [];
		for (let i = 0; i < amounth; i++){
			const x = distanceX * ( i - modInitialPosition ) + modPostionCenter;
			const y = positionY;
			cups.push( { x, y, width, height }  );
		}
		return cups;
	}

	const shuffling = (p5: p5Types) => {
		let randomCup1 = 0;
		let randomCup2 = 0;
		while( randomCup1 === randomCup2 ){
			randomCup1 = Math.floor(p5.random(cups.length));
			randomCup2 = Math.floor(p5.random(cups.length));
		}
		cup1.cup = randomCup1;
		cup1.finalX = cups[randomCup2].x;
		cup1.atualX = cups[randomCup1].x;
		cup2.cup = randomCup2;
		cup2.finalX = cups[randomCup1].x;
		cup2.atualX = cups[randomCup2].x;
		inAction = true;
	}

	const shufflingScene = (p5: p5Types) => {
		if(time < (durantionShuffling * frameRate)){
			p5.background("#bde0ff");
			cups.forEach( (cup, i) => {
				if ( inAction ) {
					if( cup1.cup === i ){
						const dif = cup1.finalX - cup1.atualX;
						cup.x = cup.x + dif / movesInRate ;
						if ( cup.x === cup1.finalX ){
							cup1.cup = -1;
						} 
					}
					if( cup2.cup === i ){
						const dif = cup2.finalX - cup2.atualX;;
						cup.x = cup.x + dif / movesInRate;

						if ( cup.x === cup2.finalX ){
							cup2.cup = -1;
						}
					}
					if ( cup2.cup === cup1.cup){
						inAction = false;
					}
					if ( ball1.cup === i ){
						ball.x = cup.x + 30;
					}
				}
				DrawCup( p5, cup );
			})
			if( !inAction ) {
				shuffling(p5);
			}
			time++;
		} else {
			inAction = false;
			scene = "findBall";
			p5.noLoop();
		}
	}

	const selectCupScene = (p5: p5Types) => {
		p5.background("#bde0ff");
		const inFinalY = ball.y === ball1.finalY;
		const inFinalX = ball.x === ball1.finalX;
		if ( inAction && cup1.cup === -1 ){
			if ( !inFinalY ){
				const dif = ball1.finalY - ball1.atualY;
				ball.y = ball.y + dif / movesInRate ;
			}
			if ( !inFinalX ){
				const dif = ball1.finalX - ball1.atualX;
				ball.x = ball.x + dif / movesInRate ;
			}
		}
		DrawBall(p5, ball);
		cups.forEach( (cup, i)  => {
			if ( inAction ) {
				if( cup1.cup === i ){
					const dif = cup1.finalY - cup1.atualY;
					cup.y = cup.y + dif / movesInRate ;
					if ( cup.y === cup1.finalY ){
						cup2.cup = cup1.cup;
						cup1.cup = -1;
					}
				}
				if ( cup1.cup === -1 && inFinalY && inFinalX){
					if( cup2.cup === i ){
						const dif = cup1.atualY - cup1.finalY;
						cup.y = cup.y + dif / movesInRate ;
						if ( cup.y === cup1.atualY ){
							cup2.cup = -1;
							scene = "shuffling";
							inAction = false
						}
					}
				}
			}
			
			DrawCup( p5, cup );
		});
		
		if ( !inAction ){
			p5.noLoop();
		}
	}

	const findBallScene = (p5: p5Types) => {
		p5.background("#bde0ff");
		DrawBall(p5, ball);
		cups.forEach( (cup, i)  => {
			if ( inAction ) {
				if( cup1.cup === i ){
					const dif = cup1.finalY - cup1.atualY;
					cup.y = cup.y + dif / movesInRate ;
					if ( cup.y === cup1.finalY ){
						cup1.cup = -1;
						inAction = false;
					}
				}
			}
			DrawCup( p5, cup );
		});
		
		if ( !inAction ){
			p5.noLoop();
		}
	}

	type Scene = "shuffling" | "selectCup" | "findBall";
	const scenes = { 
		shuffling: shufflingScene,
		selectCup: selectCupScene,
		findBall: findBallScene,
	};
	let scene: Scene = "selectCup";

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(width, height).parent(canvasParentRef);
		p5.frameRate(frameRate);
		cups = generateCups(width/2, height/2, distance, 140, 50, numberCups);
		ball = { x: width/2 - 100, y: height/2 + 200, width: 80, height: 80 };
		inAction = false;
		movesInRate = Math.floor(frameRate / movePerSecond);
		p5.background("#bde0ff");
		cups.forEach( (cup, i) => {
			DrawCup( p5, cup );
		} )
		time = (durantionShuffling * frameRate);
	};

	const draw = (p5: p5Types) => {
		scenes[scene](p5);
		p5.noStroke();
		//DrawBall(p5, ball)
	};

	const mouseClicked = (p5: p5Types) => {
		if( scene === "shuffling" && !inAction && p5.mouseX <= p5.width && p5.mouseY <= p5.height ){
			shuffling(p5);
			time = 0;
			p5.loop();
		}
		if( scene === "selectCup" && !inAction ){
			cups.forEach( ( cup, i ) => {
				const left = cup.x - cup.width/2;
				const right = cup.x + cup.width/2;
				const top = cup.y - cup.width * 0.75;
				const bottom = top + cup.width * 1.5;
				if( p5.mouseX >= left && p5.mouseX <= right && p5.mouseY >= top && p5.mouseY <= bottom){
					cup1.cup = i;
					cup1.atualX = cup.x;
					cup1.atualY = cup.y
					cup1.finalY = cup.y - 140;
					ball1.atualX = ball.x;
					ball1.atualY = ball.y;
					ball1.finalY = cup1.finalY + 220;
					ball1.finalX = cup1.atualX + 30;
					ball1.cup = i;
					inAction = true;
					p5.loop();
				}
			})
		}
		if( scene === "findBall" && !inAction ){
			cups.forEach( ( cup, i ) => {
				const left = cup.x - cup.width/2;
				const right = cup.x + cup.width/2;
				const top = cup.y - cup.width * 0.75;
				const bottom = top + cup.width * 1.5;
				if( p5.mouseX >= left && p5.mouseX <= right && p5.mouseY >= top && p5.mouseY <= bottom){
					cup1.cup = i;
					cup1.atualX = cup.x;
					cup1.atualY = cup.y
					cup1.finalY = cup.y - 140;
					inAction = true;
					p5.loop();
				}
			})
		}
	}

	return <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />;
};