/*
 * @Author: ayue
 * @Date: 2020-10-20 17:44:45
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 14:43:26
 *点击小鱼干不足提示的周边，关闭提示
 */

import { GapTip } from "../object/GapTip";
import { objectCollection } from "../object/ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export class FishBtn extends cc.Component {
    onBtn() {
        let gapTip: GapTip = objectCollection.getGapTip();
        gapTip.node.active = false;
    }
}
