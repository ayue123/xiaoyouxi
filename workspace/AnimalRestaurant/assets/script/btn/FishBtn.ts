import { Fish } from "../object/Fish";
import { objectCollection } from "../object/ObjectCollection";

/*
 * @Author: ayue
 * @Date: 2020-10-13 16:08:32
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 14:46:37
 * 点击小鱼干
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class FishBtn extends cc.Component {
    onBtn() {
        let node = this.node;
        let fishes: Array<Fish> = objectCollection.getFishes();
        for (let i = 0; i < fishes.length; i++) {
            let fish = fishes[i];
            let fishNode = fish.node;
            let btnNode = fishNode.getChildByName("btn");
            if (node == btnNode) {
                let currency = objectCollection.getCurrency();
                currency.addFishCount(fish.getCont());
                var seq = cc.sequence(
                    cc.moveTo(0, fishNode.position.x, fishNode.position.y),
                    cc.moveTo(0.3, -275, 510)
                );
                fishNode.runAction(seq);

                //TODO 移除
                fish.scheduleOnce(function () {
                    fishNode.position = cc.v2(0, 0);
                }, 0.3);

                break;
            }
        }
    }
}
