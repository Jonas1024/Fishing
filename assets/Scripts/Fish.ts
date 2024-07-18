import { _decorator, CCInteger, Component, Layers, Node, tween } from 'cc';
import { Logger } from './Utils/Logger';
import { FishManager } from './FishManager';
import { RoadNavigator } from './RoadNavigator';
const { ccclass, property } = _decorator;

@ccclass('Fish')
export class Fish extends Component {

    @property({ type: CCInteger })
    private score: number = 1000;

    @property({ type: CCInteger })
    public HP: number = 1000;

    public isDead: boolean;

    protected start(): void {
        Logger.info("fish started");
        // this.node.layer = Layers.Enum.DEFAULT;
    }

    public playDeadMv() {
        this.isDead = true;
        let roadNavi = this.getComponent(RoadNavigator);
        roadNavi.is_walking = false;

        this.scheduleOnce(()=>{
            FishManager.Instance.killFish(this)
        }, 1.5)
        tween(this.node).repeatForever(
            tween().by(0.6, { angle: -360 })
        ).start()
    }
}

