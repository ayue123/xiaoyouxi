/*
 * @Author: ayue
 * @Date: 2020-10-20 17:19:10
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 14:47:19
 * 货币不足提示
 */

import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export class GapTip extends AbstratObject {
    public createGapTip() {
        let node = this.createObject("prefab/gap_tip", objectCollection.getMenuList().node);
        objectCollection.addGapTip(this);
        this.scheduleOnce(function () {
            node.active = false;
        }, 1);
    }
    public updateGapTip() {
        let gapTip: GapTip = objectCollection.getGapTip();
        gapTip.node.active = true;
        this.scheduleOnce(function () {
            gapTip.node.active = false;
        }, 1);
    }
}
