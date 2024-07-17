import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletManager')
export class BulletManager extends Component {

    public static Instance: BulletManager = null;

    onLoad(): void {
        if(BulletManager.Instance === null) {
            BulletManager.Instance = this;
        }
        else {
            this.destroy();
            return;
        }
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

