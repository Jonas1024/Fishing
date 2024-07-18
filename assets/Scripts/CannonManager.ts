import { _decorator, Component, EventMouse, Node, Vec2, Vec3, UITransform, Input, resources, SpriteFrame, Sprite, } from 'cc';
import MathUtils from './Utils/MathUtils';
import { Logger } from './Utils/Logger';
const { ccclass, property } = _decorator;

@ccclass('CannonManager')
export class CannonManager extends Component {

    public static Instance: CannonManager = null;

    @property({ type: Node })
    private view: Node | null = null;

    public cannonType: number = 1;

    private cannon: Node | null = null;
    private prev: Node | null = null;
    private next: Node | null = null;
    private cannons: Array<SpriteFrame> = [];

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

    public init(): void {
        this.prev = this.node.parent.getChildByPath("UI/Turret/Previous");
        this.next = this.node.parent.getChildByPath("UI/Turret/Next");
        this.cannon = this.node.parent.getChildByPath("CannonContainer/Cannon");

        // this.prev.on(Input.EventType.TOUCH_START, this.onPrevClicked, this);
        // this.next.on(Input.EventType.TOUCH_START, this.onNextClicked, this);

        this.loadCannon();
    }

    private onPrevClicked() {
        Logger.info('Previous clicked');

        this.cannonType -= 1;
        if (this.cannonType <= 0) {
            this.cannonType = 7;
        }
        this.refreshCannon();
    }

    private onNextClicked() {
        Logger.info('Next clicked');

        this.cannonType += 1;
        if (this.cannonType >= 8) {
            this.cannonType = 1;
        }
        this.refreshCannon();
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

    public refreshCannon() {
        this.view.getComponent(Sprite).spriteFrame = this.cannons[this.cannonType - 1];
   }

    loadCannon(): void {

        var cannons = [];
        for (let index = 1; index <= 7; index++) {
            cannons.push(`Img/Cannon${index}/spriteFrame`);
        }
    
        // let fish_prefabs: [Prefab] = await resources.load(fishes);
        
        resources.load(cannons, SpriteFrame, (err, spriteFrames) => {
            if (err) {
                console.error('加载图片资源时出错:', err);
                return;
            }
            this.cannons = spriteFrames;
        });
    }
}

