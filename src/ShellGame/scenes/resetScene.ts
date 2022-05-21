import { SceneAction } from "../components/Scene";
import p5Types from "p5";
import { Game } from "../components/Game";
import { TriggerScene } from "../components/TriggerScene";

export const resetScene: SceneAction = (p5: p5Types, game: Game) => {

}

export const triggerResetScene: TriggerScene = (p5: p5Types, game: Game) => {
    if (!game.inAction && p5.mouseX <= p5.width && p5.mouseY <= p5.height) {
        p5.setup();
        p5.loop();
    }
}