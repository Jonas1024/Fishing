import { _decorator, Component, Layers, Node } from 'cc';
import { Logger } from './Utils/Logger';
const { ccclass, property } = _decorator;

@ccclass('Fish')
export class Fish extends Component {
    protected start(): void {
        Logger.info("fish started");
    }
}

