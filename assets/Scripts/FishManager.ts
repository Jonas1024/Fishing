import { _decorator, Component, Node, Prefab, resources, error, instantiate, Layers, Vec3, NodePool } from 'cc';
import { ResourceManager } from './ResourceManager';
import { Logger } from './Utils/Logger';
import { Fish } from './Fish';
import { RoadNavigator } from './RoadNavigator';
import { RoadMapManager } from './RoadMapManager';
import { ScoreManager } from './ScoreManager';
const { ccclass, property } = _decorator;

@ccclass('FishManager')
export class FishManager extends Component {

    public static Instance: FishManager = null as unknown as FishManager;

    private fishRoot: Node | null = null;

    private fishPool: Array<NodePool> = [];
    private fishList: Array<Fish> = [];

    private fishPrefabs: Array<Prefab> = null as unknown as Array<Prefab>;

    onLoad(): void {
        if(FishManager.Instance === null) {
            FishManager.Instance = this;
        }
        else {
            this.destroy();
            return;
        }
    }

    public init(): void {
        let node = this.node.getChildByName("FishContainer");
        this.fishRoot = node;
        this.loadFish();
    }

    loadFish(): void {

        var fishes = [];
        for (let index = 1; index <= 29; index++) {
            fishes.push(`Prefabs/Fish/Fish${index}`);
        }

        // let fish_prefabs: [Prefab] = await resources.load(fishes);
        
        resources.load(fishes, (err: any, fish_prefabs: [Prefab]) => {
            if (err) {
                error(err.message || err);
                return;
            }

            this.fishPrefabs = fish_prefabs;
            Logger.info("Fish count: " + fish_prefabs.length);

            // this.releaseFish();
            this.schedule(this.releaseFish, 1);
        })
    }

    public killFish(fish: Fish) {
        let index: number = this.fishList.indexOf(fish);
        if (index >= 0) {
            this.fishList.splice(index, 1);
            this.destroyFish(fish);
        }
    }

    private destroyFish(fish: Fish) {
        if (!this.fishPool[fish.type - 1]) {
            this.fishPool[fish.type - 1] = new NodePool();
        }
        this.fishPool[fish.type - 1].put(fish.node);
        let roadNavi = fish.node.getComponent(RoadNavigator);
        fish.node.removeComponent(roadNavi);
    }

    releaseFish(): void {
        let fishIndex = Math.floor(Math.random() * this.fishPrefabs.length);
        let fish: Fish = this.createFishByType(fishIndex);
        fish.isDead = false;
        fish.currentHP = fish.HP;

        let roadIndex = Math.floor(Math.random() * RoadMapManager.Instance.road_data.length);
        let road = RoadMapManager.Instance.road_data[roadIndex];
        let roadNavi = fish.node.addComponent(RoadNavigator);
        
        roadNavi.init(road, 200);
        this.fishList.push(fish);
    }

    createFishByType(fishIndex: number): Fish {
        let fishNode: Node;
        if (this.fishPool[fishIndex] && this.fishPool[fishIndex].size() > 0) {
            fishNode = this.fishPool[fishIndex].get();
        } else {
            fishNode = instantiate(this.fishPrefabs[fishIndex])
            this.fishRoot.addChild(fishNode);
        }
        return fishNode.getComponent(Fish);
    }
}

