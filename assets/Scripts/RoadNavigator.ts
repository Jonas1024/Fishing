import { _decorator, Component, Node, Quat, Vec3, v3, v2, Vec2, UIOpacity, Sprite } from 'cc';
import { Logger } from './Utils/Logger';
import MathUtils from './Utils/MathUtils';
import { FishManager } from './FishManager';
import { Fish } from './Fish';
const { ccclass, property } = _decorator;

@ccclass('RoadNavigator')
export class RoadNavigator extends Component {

    private road_data: Array<any> = null as unknown as Array<any>;

    private speed: number = 50; // 是我们玩家的速度;
    private next_step: number = 0; // 下一个要走的点的索引;

    private vx: number = 0;
    private vy: number = 0;
    private vz: number = 0;
    private walk_time: number = 0;
    private passed_time: number = 0; // 行走走过的时间；
    public is_walking: boolean = false; // 是否行走；

    protected onLoad(): void {
        
    }

    protected start(): void {
        // const opacityComp = this.node.getComponent(Sprite);
        // opacityComp.color.a = 0;
    }

    update (deltaTime: number): void {
        if (this.is_walking) {
            this.walking_update(deltaTime);
        }
    }

    public init(road_data: Record<string, any>, speed: number = 50): void {
        this.speed = speed;

        try {
            this.road_data = road_data["points"];
        } catch (error) {
            Logger.error(error);
            return;
        }
        
        var locl = new Vec3(this.road_data[0].x, this.road_data[0].y, 0);

        console.log(locl);

        this.node.position = locl;
        this.next_step = 1;

        this.passed_time = 0;
        this.is_walking = false;
        


        let rad: number = MathUtils.p2pRad(new Vec2(this.node.position.x, this.node.position.y), new Vec2(this.road_data[1].x, this.road_data[1].y));
        let rot111: number = MathUtils.radiansToDegrees(rad);
        let rot1: number = MathUtils.rotation2Fish(rot111);
        this.node.angle = -rot1;
        Logger.info(this.node.angle);
        console.log(`rotation: ${-rot1}`);
        // // this.node.is3DNode = true;

        if (this.road_data[0].x < 0) {
            this.node.scale = v3(1,-1,1);
        }

        this.walk_to_next();
    }

    private walk_to_next(): void {
         // 路径点走完了
        if (this.next_step >= this.road_data.length) {
            this.is_walking = false;
            let fish = this.node.getComponent(Fish);
            FishManager.Instance.killFish(fish);
            return;
        }

        var src: Vec3 = this.node.position.clone();
        
        var dst: Vec3 = v3(this.road_data[this.next_step].x, this.road_data[this.next_step].y, 0);
        var dir: Vec3 = v3();
        Vec3.subtract(dir, dst, src);
        var len: number = Vec3.len(dir);
        if (len <= 0) {
            this.next_step ++;
            this.walk_to_next();
            return;
        }

        // 向量的正交分解;
        this.vx = this.speed * dir.x / len;
        this.vy = this.speed * dir.y / len;
        this.vz = this.speed * dir.z / len;

        this.walk_time = len / this.speed;
        if (this.walk_time <= this.passed_time) {
            // 把上一次剩余的时间，迭代掉;
            this.node.position = dst;
            this.next_step ++;
            this.passed_time -= this.walk_time;
            this.walk_to_next();
            return;
        }

        this.is_walking = true; 

        // 把上一次剩余的时间，迭代掉;
        var result: Vec3 = src.clone();
        result.x += (this.passed_time * this.vx);
        result.y += (this.passed_time * this.vy);
        result.z = this.node.position.z;
        this.node.position = result;
        // Logger.info(`src pos: ${src}, result: ${result}`);
        // end 

        // let posA = this.spriteA.getPosition();
        // let posB = this.spriteB.getPosition();

        // 计算 B 相对于 A 的向量
        // let direction = v2(src.x - result.x, src.y - result.y);

        // // 计算方向向量的角度，Cocos Creator 的旋转角度是顺时针计算的，而 atan2 返回的是逆时针计算的角度
        // let angle = Math.atan2(direction.y, direction.x) * (180 / Math.PI);

        // // 设置 spriteA 的旋转角度，Cocos Creator 的旋转是顺时针为正，所以要取负
        // this.node.angle = -angle;
        
        let rad: number = MathUtils.p2pRad(new Vec2(src.x, src.y), new Vec2(result.x, result.y));
        let rot111: number = MathUtils.radiansToDegrees(rad);
        let rot1: number = MathUtils.rotation2Fish(rot111);
        if (rad === 0) {
            return
        }
        // 调整方向
        this.node.angle = -rot1;
    }

    private walking_update(deltaTime: number): void {
        this.passed_time += deltaTime;
        if (this.passed_time > this.walk_time) {
            deltaTime -= (this.passed_time - this.walk_time);
        }

        var pos: Vec3 = this.node.position;
        pos.x += (this.vx * deltaTime);
        pos.y += (this.vy * deltaTime);
        pos.z = this.node.position.z;
        this.node.position = pos;

        if (this.passed_time >= this.walk_time) {
            this.passed_time -= this.walk_time;
            this.next_step ++;
            this.walk_to_next();
        }
    }
}

