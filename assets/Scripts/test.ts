// import { _decorator, Component, Node, Canvas, warn, view, sys, size, UITransform,CCFloat, Vec2, Vec3 } from 'cc';
// const { ccclass, property, menu } = _decorator;

// @ccclass
// export default class ScaleWithParentWidth extends Component {
//     @property({ type: Node, tooltip: '参考节点，如果为空则默认为父节点', }) parentReferenceNode: Node | null = null;
//     @property({ type: CCFloat, tooltip: '缩放比例的限制值，不应超过此值', }) maxScale: number = 1;
//     // 根据需要设置最大缩放比例
//     @property({ type:CCFloat, tooltip: '延时执行时间，单位为秒', }) delayTime: number = 0.1;
//     // 根据实际需要调整延时时间
//     onLoad() {
//         this.scheduleOnce(this.scaleWithParentWidth, this.delayTime);
//     }
//     scaleWithParentWidth() {
//         if (!this.parentReferenceNode) {
//             this.parentReferenceNode = this.node.parent;
//             if (!this.parentReferenceNode) {
//                 console.warn('未设置参考节点并且没有找到父节点。');
//                 return;
//             }
//         }
//         let tran = this.parentReferenceNode.getComponent(UITransform);
//         let stran = this.node.getComponent(UITransform);
//         const parentWidth = tran.contentSize.width;
//         const scale = parentWidth / stran.contentSize.width;
//         // 添加条件判断，确保缩放比例不超过最大限制值
//         if (scale <= this.maxScale) {
//             this.node.setScale(newVec3(scale, scale, 1.0));
//             this.node.scale.y = scale;
//         } else {
//             console.warn('缩放比例超过最大限制值，不进行缩放。');
//         }
//     }
// }