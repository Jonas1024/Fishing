import {
    _decorator,
    Component,
    Node,
    Canvas,
    warn,
    view,
    sys,
    size,
    UITransform,
    Vec3,
    screen,
    macro
} from 'cc';

import { Logger } from "./Utils/Logger";

const { ccclass, property, menu } = _decorator;

@ccclass
// @menu('Comp/SceneAdapter')
export default class SceneAdapter extends Component {
    protected start() {

        // Register event listeners with the screen object
        screen.on('window-resize', this.onWindowResize, this);
        screen.on('orientation-change', this.onOrientationChange, this);
        screen.on('fullscreen-change', this.onFullScreenChange, this);
        view.setResizeCallback(this.resize.bind(this));
    }

    onDestroy() {
        // Unregister event listeners when the component is destroyed
        screen.off('window-resize', this.onWindowResize, this);
        screen.off('orientation-change', this.onOrientationChange, this);
        screen.off('fullscreen-change', this.onFullScreenChange, this);
    }

    onWindowResize(width: number, height: number) {
        Logger.log("Window resized:", width, height);
        this.resize();
    }

    onOrientationChange(orientation: number) {
        if (orientation === macro.ORIENTATION_LANDSCAPE) {
            Logger.log("Orientation changed to landscape:", orientation);
        } else {
            Logger.log("Orientation changed to portrait:", orientation);
        }
        this.resize();
    }

    onFullScreenChange(width: number, height: number) {
        Logger.log("Fullscreen change:", width, height);
        this.resize();
    }

    private resize() {
        let translate = this.getComponent(UITransform);
        Logger.log(translate);
        let node = this.node;
        if (screen.windowSize.width / screen.windowSize.height > translate.width / translate.height) {
            node.scale = new Vec3(translate.height / screen.windowSize.height / node.scale.x, translate.height / screen.windowSize.height / node.scale.y, translate.height / screen.windowSize.height / node.scale.z);
            Logger.log(node.scale);
        } else {
            node.scale = new Vec3(screen.windowSize.width / translate.width / node.scale.x, screen.windowSize.width / translate.width / node.scale.y, screen.windowSize.width / translate.width / node.scale.z);
            Logger.log(node.scale);
        }
    }
}