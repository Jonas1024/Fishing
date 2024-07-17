import { _decorator, Vec2 } from 'cc';
export default class MathUtils {
    /**
         * 2个点之前的直线距离
         * @param p1 
         * @param p2 
         */
    public static distance(x1: number, y1: number, x2: number, y2: number) {
        // 设两点A（X1,Y1）,B（X2,Y2）
        // 距离D=（X2-X1）的平方+（Y2-Y1）平方的和开平方
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

    /**
     * 2点间的向量
     * @param p1 
     * @param p2 
     */
    public static sub(p1: Vec2, p2: Vec2){
        return new Vec2(p1.x-p2.x, p1.y-p2.y);
    }

    /**
     * 弧度转角度 
     * @param radians 
     */
    public static radiansToDegrees(radians:number){
        return 180/Math.PI*radians;
    }

    /**
     * 角度转弧度 
     * @param degrees 
     */
    public static degreesToRadians(degrees:number){
        return Math.PI*degrees/180;
    }

    /**
     * 返回2点间的弧度
     * @param startP 
     * @param endP 
     */
    public static p2pRad(startP: Vec2, endP: Vec2) {
        let rad: number = Math.atan2(endP.y - startP.y, endP.x - startP.x);
        return rad;
    }


    /**
     * 针对捕鱼鱼的方向特定实现的鱼方向转换
     * @param rot 
     */
    public static rotation2Fish(rot: number) {
        if (rot >= 0 && rot <= 180) {
            rot = 180 - rot;
        } else {
            rot = -180 - rot;
        }
        return rot;
    }

}

