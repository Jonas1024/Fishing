import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreManager')
export class ScoreManager extends Component {

    public static Instance: ScoreManager = null as unknown as ScoreManager;

    public score: number = 0;

    private scoreLabel: Node | null = null;

    onLoad(): void {
        if(ScoreManager.Instance === null) {
            ScoreManager.Instance = this;
        }
        else {
            this.destroy();
            return;
        }


    }

    public init(): void {
        let node = this.node.getChildByPath("UI/ScoreBg/ScoreLabel");
        this.scoreLabel = node;
    }

    public updateScore(score: number): void {
        this.score += score;
        let label = this.scoreLabel.getComponent(Label);
        label.string = `${this.score}`;
    }
}

