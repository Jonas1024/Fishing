import { _decorator, BoxCollider2D, CCInteger, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Vec2, Vec3 } from 'cc';
import { Fish } from './Fish';
import { NetManager } from './NetManager';
import { BulletManager } from './BulletManager';
import { Logger } from './Utils/Logger';
import { ScoreManager } from './ScoreManager';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    @property({ type: CCInteger })
    public Damage: number = 500;

    @property({ type: CCInteger })
    public type: number = 1;

    public targetP: Vec2;

    public _cacheVec2: Vec2 = new Vec2();
    public _cacheVec3: Vec3 = new Vec3();
    private _collider: Collider2D;

    onLoad() {
        this._collider = this.getComponent(BoxCollider2D);
        this._collider.sensor = true;

        this._collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    protected onDestroy(): void {
        this._collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    onBeginContact (selfCollider: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        if (other) {
            let fish: Fish = other.getComponent(Fish);
            if (fish && !fish.isDead) {
                this.node.getPosition(this._cacheVec3);
                this._cacheVec2.x = this._cacheVec3.x;
                this._cacheVec2.y = this._cacheVec3.y;
                NetManager.Instance.addFishNet(this.type, this._cacheVec2)
                BulletManager.Instance.killBullet(this);
                fish.currentHP -= this.Damage;
                Logger.info(`fish HP: ${fish.currentHP}, Damage: ${this.Damage} `);
                if (fish.currentHP <= 0) {
                    fish.playDeadMv();
                    ScoreManager.Instance.updateScore(fish.score);
                }
            }
        }
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

