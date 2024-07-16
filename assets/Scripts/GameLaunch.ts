import { _decorator, Component, Node } from 'cc';
import { Logger, LOG_LEVEL_TYPES } from './Utils/Logger';
const { ccclass, property } = _decorator;

@ccclass('GameLaunch')
export class GameLaunch extends Component {
    start() {
        Logger.LEVEL = LOG_LEVEL_TYPES.DEBUG;
    }

    update(deltaTime: number) {
        
    }
}

