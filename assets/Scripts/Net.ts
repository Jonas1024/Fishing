import { _decorator, Component, Node, Tween, Vec3, tween, CCInteger } from 'cc';
import { NetManager } from './NetManager';
const { ccclass, property } = _decorator;

@ccclass('Net')
export class Net extends Component {
    
    @property({ type: CCInteger })
    public type: number = 1;
    
    private tween: Tween<any>;
    private static vec3: Vec3 = new Vec3(2, 2, 1);
    public playMv(){
        this.node.setScale(Vec3.ZERO)
        this.tween = tween(this.node).to(0.2, { scale: Net.vec3 }).delay(0.3).call(() => {
        NetManager.Instance.destroyFishNet(this);
        }).start()
    }
    onDestroy(){
        if(this.tween){
            this.tween.stop();
        }
    }
}

