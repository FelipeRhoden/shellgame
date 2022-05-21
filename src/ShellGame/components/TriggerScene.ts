import { Game } from "./Game";
import p5Types from "p5";

export interface TriggerScene {
    (p5: p5Types, game: Game): void
}