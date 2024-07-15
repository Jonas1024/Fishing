import { _decorator, Component, Node, Canvas, warn, view, sys, size, UITransform, Vec3, screen, macro } from 'cc';
const { ccclass, property, menu } = _decorator;

@ccclass
// @menu('Comp/SceneAdapter')
export default class SceneAdapter extends Component {
    protected start() {
        let cvs = this.node.getComponent(Canvas);
        if (cvs === null) {
            warn(`节点${this.node.name}???没有cc.Canvas组件, SceneAdapter添加失败!`);
            this.destroy();
            return;
        }
        console.log("aaaa");
        // cvs.fitWidth = true;
        // cvs.fitHeight = true;
        // this.resize();
        // view.setResizeCallback(this.resize.bind(this));
        

        // Register event listeners with the screen object
        screen.on('window-resize', this.onWindowResize, this);
        screen.on('orientation-change', this.onOrientationChange, this);
        screen.on('fullscreen-change', this.onFullScreenChange, this);
    }

    onDestroy() {
        // Unregister event listeners when the component is destroyed
        screen.off('window-resize', this.onWindowResize, this);
        screen.off('orientation-change', this.onOrientationChange, this);
        screen.off('fullscreen-change', this.onFullScreenChange, this);
      }
    
      onWindowResize(width: number, height: number) {
        console.log("Window resized:", width, height);
        this.resize();
      }
    
      onOrientationChange(orientation: number) {
        if (orientation === macro.ORIENTATION_LANDSCAPE) {
          console.log("Orientation changed to landscape:", orientation);
        } else {
          console.log("Orientation changed to portrait:", orientation);
        }
        this.resize();
      }
    
      onFullScreenChange(width: number, height: number) {
        console.log("Fullscreen change:", width, height);
        this.resize();
      }

    private resize() {
        let translate = this.getComponent(UITransform);
        console.log(translate);
        let node = this.node;
        if (sys.isMobile) {
            console.log("bbbb");
            translate.width = screen.windowSize.width;
            translate.height = screen.windowSize.height;
        } else {

            console.log("cccc");
            console.log(translate.width);
            console.log(translate.height);
            console.log(screen.windowSize.width);
            console.log(screen.windowSize.height);
            if (screen.windowSize.width / screen.windowSize.height > translate.width / translate.height) {
                console.log("dddd");
                node.scale = new Vec3(screen.windowSize.height / translate.height / node.scale.x, screen.windowSize.height / translate.height / node.scale.y, 1.0);
                console.log(node.scale);
            } else {
                console.log("eeee");
                node.scale = new Vec3(screen.windowSize.width / translate.width / node.scale.x, screen.windowSize.width / translate.width / node.scale.y, 1.0);
                console.log(node.scale);
            }
        }
    }
}