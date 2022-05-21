import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import { DrawCup, Cup } from "./components/Cup";
import { Game } from "./components/Game";
import { scenes, triggerOnClickScenes } from "./scenes/Scenes";

export const ShellGame = () => {
	const distance = 240;
	const game: Game = {} as Game;

	const setUpGame = (): void => {
		const genericCup = { width: 0, height: 0, x: 0, y: 0 };
		const genericBall = { width: 0, height: 0, x: 0, y: 0 };
		game.cup1 = { index: -1, initialLocationCup: { ...genericCup }, finalLocationCup: { ...genericCup } };
		game.cup2 = { index: -1, initialLocationCup: { ...genericCup }, finalLocationCup: { ...genericCup } };
		game.ball1 = { index: -1, initialLocationCup: { ...genericBall }, finalLocationCup: { ...genericBall } };
		game.cups = [];
		game.width = 1200;
		game.height = 700;
		game.numberCups = 3;
		game.inAction = false;
		game.frameRate = 60;
		game.durantionShuffling = 5;
		game.movePerSecond = 3;
		game.time = 0;
	}

	const generateCups = (positionX: number, positionY: number, distanceX: number, width: number, height: number, amounth: number): Cup[] => {
		const modPostionCenter = positionX + Math.abs((amounth % 2) - 1) * distanceX / 2;
		const modInitialPosition = Math.floor(amounth / 2);
		const cups: Cup[] = [];
		for (let i = 0; i < amounth; i++) {
			const x = distanceX * (i - modInitialPosition) + modPostionCenter;
			const y = positionY;
			cups.push({ x, y, width, height });
		}
		return cups;
	}

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		setUpGame();
		const { width, height, frameRate, numberCups, movePerSecond, durantionShuffling } = game;
		p5.createCanvas(width, height).parent(canvasParentRef);
		p5.frameRate(frameRate);
		game.cups = generateCups(width / 2, height / 2, distance, 140, 50, numberCups);
		game.ball = { x: width / 2 - 100, y: height / 2 + 200, width: 80, height: 80 };
		game.inAction = false;
		game.movesInRate = Math.floor(frameRate / movePerSecond);
		p5.background("#bde0ff");
		game.cups.forEach((cup, i) => {
			DrawCup(p5, cup);
		})
		game.time = (durantionShuffling * frameRate);
		game.scene = "selectCup";
	};

	const draw = (p5: p5Types) => {
		scenes[game.scene](p5, game);
		p5.noStroke();
	};

	const mouseClicked = (p5: p5Types) => {
		triggerOnClickScenes[game.scene](p5, game);
	}

	return <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />;
};