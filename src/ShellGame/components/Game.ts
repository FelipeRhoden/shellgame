import { Ball, BallMoveLocation } from "./Ball";
import { Cup, CupMoveLocation } from "./Cup"
import { Scene } from "./Scene";

export interface Game {
	cup1: CupMoveLocation;
	cup2: CupMoveLocation;
	ball1: BallMoveLocation;
	cups: Cup[];
	ball: Ball;
	width: number;
	height: number;
	numberCups: number;
	inAction: boolean;
	frameRate: number;
	durantionShuffling: number;
	movePerSecond: number;
	time: number;
	movesInRate: number;
	scene: Scene;
}

