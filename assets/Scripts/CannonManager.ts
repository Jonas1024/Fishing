import { _decorator, Component, EventMouse, Node, Vec2, Vec3, UITransform, } from 'cc';
import MathUtils from './Utils/MathUtils';
import { Logger } from './Utils/Logger';
const { ccclass, property } = _decorator;

@ccclass('CannonManager')
export class CannonManager extends Component {

    public static Instance: CannonManager = null;

    @property({ type: Node })
    private view: Node | null = null;

    public cannonType: number = 1;

    private _vec3Cache;

    onLoad(): void {
        if(CannonManager.Instance === null) {
            CannonManager.Instance = this;
        }
        else {
            this.destroy();
            return;
        }
        
        this._vec3Cache = new Vec3();
        this.node.parent.on(Node.EventType.MOUSE_MOVE, this.onMouseMove.bind(this));
    }

    private onMouseMove(event: EventMouse) {
        this.rotateCannon(event.getUILocation());
    }

    public rotateCannon(uilocation: Vec2) {
        let location = uilocation;
        this._vec3Cache.x = location.x;
        this._vec3Cache.y = location.y;
        this._vec3Cache.z = 0;
        let tran = this.node.getComponent(UITransform);
        tran.convertToNodeSpaceAR(this._vec3Cache, this._vec3Cache);
        

        let localTouch: Vec2 = new Vec2(this._vec3Cache.x, this._vec3Cache.y);
        this.view.getPosition(this._vec3Cache);
        let rad: number = MathUtils.p2pRad(new Vec2(this._vec3Cache.x, this._vec3Cache.y), localTouch)
        let rot: number = MathUtils.radiansToDegrees(rad)
        this.view.angle = rot - 90;
    }


    public getCannonPosition() {
        return this.view.getPosition();
   }
}

