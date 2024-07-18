import { _decorator, Component, Node } from 'cc';
import { CannonManager } from './CannonManager';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    private onClickPre() {

        CannonManager.Instance.cannonType -= 1;
        if (CannonManager.Instance.cannonType <= 0) {
            CannonManager.Instance.cannonType = 7;
        }
        CannonManager.Instance.refreshCannon();
    }

    private onClickNext() {

        CannonManager.Instance.cannonType += 1;
        if (CannonManager.Instance.cannonType >= 8) {
            CannonManager.Instance.cannonType = 1;
        }
        CannonManager.Instance.refreshCannon();
    }
}

