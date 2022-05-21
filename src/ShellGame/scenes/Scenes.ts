import { Scene, SceneAction } from "../components/Scene";
import { TriggerScene } from "../components/TriggerScene";
import { findBallScene, triggerFindBallScene } from "./findBallScene";
import { resetScene, triggerResetScene } from "./resetScene";
import { selectCupScene, triggerSelectCupScene } from "./selectCupScene";
import { shufflingScene, triggerShufflingScene } from "./shufflingScene";

type Scenes = {
    [index in Scene]: SceneAction;
};

type TriggerScenes = {
    [index in Scene]: TriggerScene;
}

export const scenes: Scenes = {
    selectCup: selectCupScene,
    shuffling: shufflingScene,
    findBall: findBallScene,
    reset: resetScene
}

export const triggerOnClickScenes: TriggerScenes = {
    selectCup: triggerSelectCupScene,
    shuffling: triggerShufflingScene,
    findBall: triggerFindBallScene,
    reset: triggerResetScene
}