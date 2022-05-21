import { DrawBall } from "../components/Ball";
import { DrawCup } from "../components/Cup";
import { Game } from "../components/Game";
import p5Types from "p5";
import { SceneAction } from "../components/Scene";
import { TriggerScene } from "../components/TriggerScene";

export const findBallScene: SceneAction = (p5: p5Types, game: Game) => {
    const { ball, ball1, cups, cup1, movesInRate } = game;
    const index = cup1.index;
    p5.background("#bde0ff");
    DrawBall(p5, ball);
    cups.forEach((cup, i) => {
        if (game.inAction) {
            if (cup1.index === i) {
                const dif = cup1.finalLocationCup.y - cup1.initialLocationCup.y;
                cup.y = cup.y + dif / movesInRate;
                if (cup.y === cup1.finalLocationCup.y) {
                    cup1.index = -1;
                    game.inAction = false;
                }
            }
        }
        DrawCup(p5, cup);
    });

    if (!game.inAction) {
        p5.noLoop();
        if (ball1.index === index) {
            game.scene = "reset";
        }
    }
}

export const triggerFindBallScene: TriggerScene = (p5: p5Types, game: Game) => {
    const { cups, cup1 } = game;
    if (!game.inAction) {
        cups.forEach((cup, i) => {
            const left = cup.x - cup.width / 2;
            const right = cup.x + cup.width / 2;
            const top = cup.y - cup.width * 0.75;
            const bottom = top + cup.width * 1.5;
            if (p5.mouseX >= left && p5.mouseX <= right && p5.mouseY >= top && p5.mouseY <= bottom) {
                cup1.index = i;
                cup1.initialLocationCup.x = cup.x;
                cup1.initialLocationCup.y = cup.y
                cup1.finalLocationCup.y = cup.y - 140;
                game.inAction = true;
                p5.loop();
            }
        })
    }
}