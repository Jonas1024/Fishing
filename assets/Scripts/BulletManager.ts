import { _decorator, Component, error, EventTouch, instantiate, Node, NodePool, Prefab, resources, UITransform, Vec2, Vec3 } from 'cc';
import { CannonManager } from './CannonManager';
import MathUtils from './Utils/MathUtils';
import { Bullet } from './Bullet';
import { Logger } from './Utils/Logger';
import { MoveHelper } from './Utils/MoveHelper';
import { NetManager } from './NetManager';
const { ccclass, property } = _decorator;

@ccclass('BulletManager')
export class BulletManager extends Component {

    public static Instance: BulletManager = null;

    private _vec3Cache;
    private _vec2Cache;
    private bulletList: Array<Bullet> = [];
    private bulletMoveSpeed: number = 30;
    private bulletRoot: Node | null = null;
    private bulletPool: Array<NodePool> = [];

    private bulletPrefabs: Array<Prefab> = null as unknown as Array<Prefab>;

    onLoad(): void {
        if(BulletManager.Instance === null) {
            BulletManager.Instance = this;
        }
        else {
            this.destroy();
            return;
        }
        this._vec3Cache = new Vec3();
        this._vec2Cache = new Vec2();
        this.node.on(Node.EventType.TOUCH_START, this.onShootBullet, this)
    }

    public init(): void {
        let node = this.node.getChildByName("BulletContainer");
        this.bulletRoot = node;
        this.loadBullet();
    }

    private onShootBullet(event: EventTouch) {  
        let tran = this.bulletRoot.getComponent(UITransform);
        let location = event.getUILocation();
        this._vec3Cache.x = location.x;
        this._vec3Cache.y = location.y;
        this._vec3Cache.z = 0;

        tran.convertToNodeSpaceAR(this._vec3Cache, this._vec3Cache);
        let localP: Vec2 = new Vec2(this._vec3Cache.x, this._vec3Cache.y);
        this._vec3Cache = CannonManager.Instance.getCannonPosition();
        
        let rad: number = MathUtils.p2pRad(new Vec2(this._vec3Cache.x, this._vec3Cache.y), localP)
        let rot: number = MathUtils.radiansToDegrees(rad)
        let bullet: Bullet = this.createBullet(CannonManager.Instance.cannonType)
        bullet.type = CannonManager.Instance.cannonType;
        bullet.targetP = localP;
        this.bulletRoot.addChild(bullet.node)
        bullet.node.setPosition(CannonManager.Instance.getCannonPosition())
        this._vec3Cache.x = 1;
        this._vec3Cache.y = 1;
        this._vec3Cache.y = 1;
        Vec3.multiplyScalar(this._vec3Cache, this._vec3Cache, 2);
        bullet.node.setScale(this._vec3Cache)
        bullet.node.angle = rot;
        this.bulletList.push(bullet)

        //旋转炮台
        // CannonManager.instance.rotateCannon(location);
    }

    private createBullet(bulletType: number): Bullet {
        let bulletNode: Node;
        if (this.bulletPool[bulletType] && this.bulletPool[bulletType].size() > 0) {
            bulletNode = this.bulletPool[bulletType].get();
        } else {
            bulletNode = instantiate(this.bulletPrefabs[bulletType - 1])
            
        }
        
        return bulletNode.getComponent(Bullet)
    }

    start() {

    }

    loadBullet(): void {
        var bullets = [];
        for (let index = 1; index <= 7; index++) {
            bullets.push(`Prefabs/Bullet/Bullet${index}`);
        }
        resources.load(bullets, (err: any, fish_prefabs: [Prefab]) => {
            if (err) {
                error(err.message || err);
                return;
            }

            this.bulletPrefabs = fish_prefabs;
        })
    }

    update() {
        this.checkMoveBullet();
    }

    private checkMoveBullet() {
        for (let i = this.bulletList.length - 1; i >= 0; i--) {
            let bullet: Bullet = this.bulletList[i];
            let isMoving: boolean = MoveHelper.moveNode(bullet.node, this.bulletMoveSpeed, bullet.targetP.x, bullet.targetP.y)
            if (!isMoving) {
                bullet.node.getPosition(this._vec3Cache);
                this._vec2Cache.x = this._vec3Cache.x;
                this._vec2Cache.y = this._vec3Cache.y;
                NetManager.Instance.addFishNet(bullet.type, this._vec2Cache);
                this.bulletList.splice(i, 1)
                this.destroyBullet(bullet)
            }
        }
    }

    public killBullet(bullet: Bullet) {
        let index: number = this.bulletList.indexOf(bullet);
        if (index >= 0) {
            this.bulletList.splice(index, 1);
            this.destroyBullet(bullet)
        }
    }

    private destroyBullet(bullet: Bullet) {
 
        if (!this.bulletPool[bullet.type]) {
            this.bulletPool[bullet.type] = new NodePool();
        }
        this.bulletPool[bullet.type].put(bullet.node)
    }


}

