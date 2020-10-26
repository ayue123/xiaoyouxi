/*
 * @Author: ayue
 * @Date: 2020-10-21 15:31:25
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 19:02:04
 * 厨房餐厅切换按钮
 */

import { objectCollection } from "../object/ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export class SwitchBtn extends cc.Component {
    onKitchenBtn() {
        let kitchenNode = objectCollection.getKitchenNode();
        let diningRoomNode = objectCollection.getDiningRoomNode();
        kitchenNode.position = cc.v2(700, 0);
        diningRoomNode.position = cc.v2(0, 0);
    }

    onDiningRoomBtn() {
        let kitchenNode = objectCollection.getKitchenNode();
        let diningRoomNode = objectCollection.getDiningRoomNode();
        kitchenNode.position = cc.v2(0, 0);
        diningRoomNode.position = cc.v2(-700, 0);
    }
}
