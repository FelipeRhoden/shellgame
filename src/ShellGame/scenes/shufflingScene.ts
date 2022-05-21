import { DrawCup } from "../components/Cup";
import { Game } from "../components/Game";
import p5Types from "p5";
import { SceneAction } from "../components/Scene";
import { TriggerScene } from "../components/TriggerScene";

const shuffling = (p5: p5Types, game: Game) => {
    const { cups, cup1, cup2 } = game;
    let randomCup1 = 0;
    let randomCup2 = 0;
    while (randomCup1 === randomCup2) {
        randomCup1 = Math.floor(p5.random(cups.length));
        randomCup2 = Math.floor(p5.random(cups.length));
    }
    cup1.index = randomCup1;
    cup1.finalLocationCup.x = cups[randomCup2].x;
    cup1.initialLocationCup.x = cups[randomCup1].x;
    cup2.index = randomCup2;
    cup2.finalLocationCup.x = cups[randomCup1].x;
    cup2.initialLocationCup.x = cups[randomCup2].x;
    game.inAction = true;
}

export const shufflingScene: SceneAction = (p5: p5Types, game: Game) => {
    const { durantionShuffling, frameRate, movesInRate, ball, ball1, cups, cup1, cup2 } = game;
    if (game.time < (durantionShuffling * frameRate)) {
        p5.background("#bde0ff");
        cups.forEach((cup, i) => {
            if (game.inAction) {
                if (cup1.index === i) {
                    const dif = cup1.finalLocationCup.x - cup1.initialLocationCup.x;
                    cup.x = cup.x + dif / movesInRate;
                    if (cup.x === cup1.finalLocationCup.x) {
                        cup1.index = -1;
                    }
                }
                if (cup2.index === i) {
                    const dif = cup2.finalLocationCup.x - cup2.initialLocationCup.x;;
                    cup.x = cup.x + dif / movesInRate;

                    if (cup.x === cup2.finalLocationCup.x) {
                        cup2.index = -1;
                    }
                }
                if (cup2.index === cup1.index) {
                    game.inAction = false;
                }
                if (ball1.index === i) {
                    ball.x = cup.x + 30;
                }
            }
            DrawCup(p5, cup);
        })
        if (!game.inAction) {
            shuffling(p5, game);
        }
        game.time++;
    } else {
        game.inAction = false;
        game.scene = "findBall";
        p5.noLoop();
    }
}

export const triggerShufflingScene: TriggerScene = (p5: p5Types, game: Game) => {
    if (!game.inAction && p5.mouseX <= p5.width && p5.mouseY <= p5.height) {
        shuffling(p5, game);
        game.time = 0;
        p5.loop();
    }
}