import { _decorator, Component, Node, JsonAsset, resources, error } from 'cc';
import { Logger } from './Utils/Logger';
const { ccclass, property } = _decorator;

@ccclass('RoadMapManager')
export class RoadMapManager extends Component {

    public road_data: Array<any> = null as unknown as Array<any>;
    
    public static Instance: RoadMapManager = null as unknown as RoadMapManager;

    onLoad(): void {
        if(RoadMapManager.Instance === null) {
            RoadMapManager.Instance = this;
        }
        else {
            this.destroy();
            return;
        }


    }
    start() {
        
    }

    update(deltaTime: number) {
        
    }

    public loadRoadMap() {
        var roads = [];
        for (let index = 1; index <= 17; index++) {
            roads.push(`Roads/path${index}`);
        }

        Logger.info(roads);

        resources.load(roads, (err: any, res: [JsonAsset]) => {
            if (err) {
                error(err.message || err);
                return;
            }
            // 获取到 Json 数据
            this.road_data = res.map((item) => item.json!); 
            Logger.info("Road count: " + this.road_data.length);
        })
    }
}

