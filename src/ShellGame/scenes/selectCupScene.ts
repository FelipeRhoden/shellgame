import { DrawBall } from "../components/Ball";
import { DrawCup } from "../components/Cup";
import { Game } from "../components/Game";
import p5Types from "p5";
import { SceneAction } from "../components/Scene";
import { TriggerScene } from "../components/TriggerScene";

export const selectCupScene: SceneAction = (p5: p5Types, game: Game) => {
    const { ball, ball1, cups, cup1, cup2, movesInRate } = game;
    p5.background("#bde0ff");
    const inFinalY = ball.y === ball1.finalLocationCup.y;
    const inFinalX = ball.x === ball1.finalLocationCup.x;
    if (game.inAction && cup1.index === -1) {
        if (!inFinalY) {
            const dif = ball1.finalLocationCup.y - ball1.initialLocationCup.y;
            ball.y = ball.y + dif / movesInRate;
        }
        if (!inFinalX) {
            const dif = ball1.finalLocationCup.x - ball1.initialLocationCup.x;
            ball.x = ball.x + dif / movesInRate;
        }
    }
    DrawBall(p5, ball);
    cups.forEach((cup, i) => {
        if (game.inAction) {
            if (cup1.index === i) {
                const dif = cup1.finalLocationCup.y - cup1.initialLocationCup.y;
                cup.y = cup.y + dif / movesInRate;
                if (cup.y === cup1.finalLocationCup.y) {
                    cup2.index = cup1.index;
                    cup1.index = -1;
                }
            }
            if (cup1.index === -1 && inFinalY && inFinalX) {
                if (cup2.index === i) {
                    const dif = cup1.initialLocationCup.y - cup1.finalLocationCup.y;
                    cup.y = cup.y + dif / movesInRate;
                    if (cup.y === cup1.initialLocationCup.y) {
                        cup2.index = -1;
                        game.scene = "shuffling";
                        game.inAction = false
                    }
                }
            }
        }

        DrawCup(p5, cup);
    });

    if (!game.inAction) {
        p5.noLoop();
    }
}

export const triggerSelectCupScene: TriggerScene = (p5: p5Types, game: Game) => {
    const { cups, cup1, ball, ball1 } = game;
    if (!game.inAction) {
        cups.forEach((cup, i) => {
            const left = cup.x - cup.width / 2;
            const right = cup.x + cup.width / 2;
            const top = cup.y - cup.width * 0.75;
            const bottom = top + cup.width * 1.5;
            if (p5.mouseX >= left && p5.mouseX <= right && p5.mouseY >= top && p5.mouseY <= bottom) {
                cup1.index = i;
                cup1.initialLocationCup.x = cup.x;
                cup1.initialLocationCup.y = cup.y;
                cup1.finalLocationCup.y = cup.y - 140;
                ball1.initialLocationCup.x = ball.x;
                ball1.initialLocationCup.y = ball.y;
                ball1.finalLocationCup.y = cup1.finalLocationCup.y + 220;
                ball1.finalLocationCup.x = cup1.initialLocationCup.x + 30;
                ball1.index = i;
                game.inAction = true;
                p5.loop();
            }
        })
    }
}