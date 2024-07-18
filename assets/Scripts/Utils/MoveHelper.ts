import { _decorator, Node, Vec3, Vec2 } from 'cc';
import { Logger } from "./Logger";
import MathUtils from "./MathUtils";

export class MoveHelper {
    public static _vec3: Vec3 = new Vec3();
    public static _vec2_0: Vec2  = new Vec2();
    public static _vec2_1: Vec2  = new Vec2();
    public static moveNode(moveNode: Node, speed: number, tx: number, ty: number, minSpeed: number = 0.01) {
        let isMoving: boolean = false;
        let times: number = 0;
        moveNode.getPosition(MoveHelper._vec3);
        MoveHelper._vec2_0.x = MoveHelper._vec3.x;
        MoveHelper._vec2_0.y = MoveHelper._vec3.y;
        MoveHelper._vec2_1.x = tx;
        MoveHelper._vec2_1.y = ty;
        let rad: number = MathUtils.p2pRad(MoveHelper._vec2_0, MoveHelper._vec2_1)
        let speedX: number = speed * Math.cos(rad)
        let speedY: number = speed * Math.sin(rad)
        if (Math.abs(MoveHelper._vec3.x - tx) > minSpeed) {
            times = Math.floor(Math.abs(speedX / minSpeed));
            for (let i = 0; i < times; i++) {
                if (MoveHelper._vec3.x > tx) {
                    MoveHelper._vec3.x -= minSpeed;
                    moveNode.setPosition(MoveHelper._vec3);
                } else {
                    MoveHelper._vec3.x += minSpeed;
                    moveNode.setPosition(MoveHelper._vec3);
                }
                if (Math.abs(MoveHelper._vec3.x - tx) <= minSpeed * 2) {
                    MoveHelper._vec3.x = tx;
                    moveNode.setPosition(MoveHelper._vec3);
                }
            }
            isMoving = true;
        }
        if (Math.abs(MoveHelper._vec3.y - ty) > minSpeed) {
            times = Math.floor(Math.abs(speedY / minSpeed));
            for (let j = 0; j < times; j++) {
                if (MoveHelper._vec3.y > ty) {
                    MoveHelper._vec3.y -= minSpeed;
                    moveNode.setPosition(MoveHelper._vec3);
                } else {
                    MoveHelper._vec3.y += minSpeed;
                    moveNode.setPosition(MoveHelper._vec3);
                }
                if (Math.abs(MoveHelper._vec3.x - ty) <= minSpeed * 2) {
                    MoveHelper._vec3.y = ty;
                    moveNode.setPosition(MoveHelper._vec3);
                }
            }
            isMoving = true;
        }
        return isMoving;
    }
}

