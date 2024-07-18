import { _decorator, Component, Node, Prefab, resources, error, instantiate, Layers, Vec3 } from 'cc';
import { ResourceManager } from './ResourceManager';
import { Logger } from './Utils/Logger';
import { Fish } from './Fish';
import { RoadNavigator } from './RoadNavigator';
import { RoadMapManager } from './RoadMapManager';
const { ccclass, property } = _decorator;

@ccclass('FishManager')
export class FishManager extends Component {

    public static Instance: FishManager = null as unknown as FishManager;

    private fishRoot: Node | null = null;

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
        fish.node.destroy();
    }

    releaseFish(): void {
        let fishIndex = Math.floor(Math.random() * this.fishPrefabs.length);
        let prefab = this.fishPrefabs[fishIndex];
        let fish: Node = instantiate(prefab);

        let roadIndex = Math.floor(Math.random() * RoadMapManager.Instance.road_data.length);
        let road = RoadMapManager.Instance.road_data[roadIndex];
        let roadNavi = fish.addComponent(RoadNavigator);
        roadNavi.init(road, 200);
        this.fishRoot?.addChild(fish);
    }
}

