import { _decorator, Component, JsonAsset, resources, error } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('Test')
export class Test extends Component {
    start () {

        resources.load('road', (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            // 获取到 Json 数据
            const jsonData: object = res.json!;

        })

    }

    update(deltaTime: number) {
        
    }
}

