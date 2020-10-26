/*
 * @Author: ayue
 * @Date: 2020-10-20 18:10:53
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 14:46:33
 * 点击星星
 */

import { objectCollection } from "../object/ObjectCollection";
import { Star } from "../object/Star";

const { ccclass, property } = cc._decorator;
@ccclass
export class StarBtn extends cc.Component {
    onBtn() {
        let node = this.node;
        let stars: Array<Star> = objectCollection.getStars();
        for (let i = 0; i < stars.length; i++) {
            let star = stars[i];
            let starNode = star.node;
            let btnNode = starNode.getChildByName("btn");
            if (node == btnNode) {
                let currency = objectCollection.getCurrency();
                currency.addStarCount(star.getCont());
                var seq = cc.sequence(
                    cc.moveTo(0, starNode.position.x, starNode.position.y),
                    cc.moveTo(0.3, -275, 470)
                );
                starNode.runAction(seq);

                //TODO 移除
                star.scheduleOnce(function () {
                    starNode.position = cc.v2(-100, 0);
                }, 0.3);

                break;
            }
        }
    }
}
