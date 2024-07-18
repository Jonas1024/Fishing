import { _decorator, Component, Node, Vec2, Vec3, NodePool, instantiate, Prefab, resources, error, CCInteger } from 'cc';
import { Net } from './Net';
const { ccclass, property } = _decorator;

@ccclass('NetManager')
export class NetManager extends Component {

    public static Instance: NetManager = null as unknown as NetManager;
    private fishNetPool: Array<NodePool> = [];

    private netRoot: Node | null = null;
    private netPrefabs: Array<Prefab> = null as unknown as Array<Prefab>;

    public init(): void {
        let node = this.node.getChildByName("BulletContainer");
        this.netRoot = node;
        this.loadNet();
    }

    loadNet(): void {
        var bullets = [];
        for (let index = 1; index <= 7; index++) {
            bullets.push(`Prefabs/Net/FishNet${index}`);
        }
        resources.load(bullets, (err: any, fish_prefabs: [Prefab]) => {
            if (err) {
                error(err.message || err);
                return;
            }

            this.netPrefabs = fish_prefabs;
        })
    }

    onLoad(): void {
        if(NetManager.Instance === null) {
            NetManager.Instance = this;
        }
        else {
            this.destroy();
            return;
        }
    }
    public addFishNet(netType: number, p:Vec2){
        let fishNet:Net = this.createFishNet(netType - 1)
        this.netRoot.addChild(fishNet.node)
        fishNet.node.setPosition(new Vec3(p.x, p.y, 0));
        fishNet.playMv();
    }

    private createFishNet(netType: number): Net {
        let fishNetNode: Node;
        if (this.fishNetPool[netType] && this.fishNetPool[netType].size() > 0) {
            fishNetNode = this.fishNetPool[netType].get();
        } else {
            fishNetNode = instantiate(this.netPrefabs[netType])
        }
        
        return fishNetNode.getComponent(Net)
    }

    public destroyFishNet(fishNet: Net) {
        if (!this.fishNetPool[fishNet.type]) {
            this.fishNetPool[fishNet.type] = new NodePool();
        }
        this.fishNetPool[fishNet.type].put(fishNet.node)
    }
}

