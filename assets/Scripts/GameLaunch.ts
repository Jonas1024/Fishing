import { _decorator, Component, dynamicAtlasManager, Node, PhysicsSystem2D, profiler } from 'cc';
import { Logger, LOG_LEVEL_TYPES } from './Utils/Logger';
import { RoadMapManager } from './RoadMapManager';
import { ResourceManager } from './ResourceManager';
import { FishManager } from './FishManager';
import { BulletManager } from './BulletManager';
import { CannonManager } from './CannonManager';
import { NetManager } from './NetManager';
const { ccclass, property } = _decorator;

@ccclass('GameLaunch')
export class GameLaunch extends Component {
    start() {
        Logger.LEVEL = LOG_LEVEL_TYPES.DEBUG;
        profiler.hideStats();//showStats
        PhysicsSystem2D.instance.enable = true;

        this.node.addComponent(RoadMapManager);
        this.node.addComponent(ResourceManager);
        this.node.addComponent(FishManager);
        this.node.addComponent(BulletManager);
        this.node.addComponent(NetManager);

        RoadMapManager.Instance.loadRoadMap();
        FishManager.Instance.init();
        BulletManager.Instance.init();
        NetManager.Instance.init();
    }

}

