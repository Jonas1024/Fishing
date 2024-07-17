
import { _decorator, Component, JsonAsset, resources, error } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('JsonLoader')
export class JsonLoader extends Component {

    start () {
        resources.load('gameGiftJson', (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            // 获取到 Json 数据
            const jsonData: object = res.json!;

        })

    }
}
