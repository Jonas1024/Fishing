import { _decorator, Component, Node } from 'cc';
import { Logger, LOG_LEVEL_TYPES } from './Utils/Logger';
import { RoadMapManager } from './RoadMapManager';
import { ResourceManager } from './ResourceManager';
import { FishManager } from './FishManager';
const { ccclass, property } = _decorator;

@ccclass('GameLaunch')
export class GameLaunch extends Component {
    start() {
        Logger.LEVEL = LOG_LEVEL_TYPES.DEBUG;

        this.node.addComponent(RoadMapManager);
        this.node.addComponent(ResourceManager);
        this.node.addComponent(FishManager);

        RoadMapManager.Instance.loadRoadMap();
        FishManager.Instance.init();
        // FishManager.Instance.releaseFish();
    }

    update(deltaTime: number) {
        
    }
}

