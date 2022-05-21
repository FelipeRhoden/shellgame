import { Game } from "./Game";
import p5Types from "p5";

export type Scene = "shuffling" | "selectCup" | "findBall" | "reset";

export interface SceneAction {
    (p5: p5Types, game: Game): void
}