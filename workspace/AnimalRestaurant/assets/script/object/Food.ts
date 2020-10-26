import {
    FOOD_POSITION,
    FOOD_ZINDEX,
    GUEST_POSITION_TABLE_1,
    GUEST_POSITION_TABLE_2,
    GUEST_POSITION_TABLE_3,
    GUEST_POSITION_TABLE_4,
    GUEST_POSITION_TABLE_5,
    GUEST_POSITION_TABLE_6,
} from "../config/GameConstants";
/*
 * @Author: ayue
 * @Date: 2020-10-26 14:44:32
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-26 19:06:08
 */

import { AbstratObject } from "./AbstratObject";
import { Fish } from "./Fish";
import { Guest } from "./Guest";
import { objectCollection } from "./ObjectCollection";
const { ccclass, property } = cc._decorator;

@ccclass
export class Food extends AbstratObject {
    public createTableFood(guest: Guest) {
        let node = this.createObject("prefab/food", objectCollection.getDiningRoomNode());
        this.postTableHandler(node, guest);
    }
    private postTableHandler(node: cc.Node, guest: Guest) {
        node.zIndex = FOOD_ZINDEX;
        if (guest.getTargetPosition() == GUEST_POSITION_TABLE_1) {
            node.position = cc.v2(FOOD_POSITION[0][0], FOOD_POSITION[0][1]);
        } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_2) {
            node.position = cc.v2(FOOD_POSITION[1][0], FOOD_POSITION[1][1]);
        } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_3) {
            node.position = cc.v2(FOOD_POSITION[2][0], FOOD_POSITION[2][1]);
        } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_4) {
            node.position = cc.v2(FOOD_POSITION[3][0], FOOD_POSITION[3][1]);
        } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_5) {
            node.position = cc.v2(FOOD_POSITION[4][0], FOOD_POSITION[4][1]);
        } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_6) {
            node.position = cc.v2(FOOD_POSITION[5][0], FOOD_POSITION[5][1]);
        }
        let cookingNode = node.getChildByName("cooking");
        let s: cc.Sprite = cookingNode.getComponent(cc.Sprite);
        s.fillRange = 0;
        this.scheduleOnce(function () {
            let fish: Fish = new Fish();
            fish.createFish(objectCollection.getDiningRoomNode());
            let fishNode = fish.node;
            fishNode.position = cc.v2(-100, 160);
            node.destroy();
        }, 3);
    }

    public createStoveFood(guest: Guest) {
        let node = this.createObject("prefab/food", objectCollection.getKitchenNode());
        this.postStoveHandler(node, guest);
    }
    private postStoveHandler(node: cc.Node, guest: Guest) {
        node.zIndex = FOOD_ZINDEX;
        if (guest.getTargetPosition() == GUEST_POSITION_TABLE_1) {
            node.position = cc.v2(FOOD_POSITION[0][0], FOOD_POSITION[0][1]);
        } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_2) {
            node.position = cc.v2(FOOD_POSITION[1][0], FOOD_POSITION[1][1]);
        } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_3) {
            node.position = cc.v2(FOOD_POSITION[2][0], FOOD_POSITION[2][1]);
        } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_4) {
            node.position = cc.v2(FOOD_POSITION[3][0], FOOD_POSITION[3][1]);
        } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_5) {
            node.position = cc.v2(FOOD_POSITION[4][0], FOOD_POSITION[4][1]);
        } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_6) {
            node.position = cc.v2(FOOD_POSITION[5][0], FOOD_POSITION[5][1]);
        }
        let cookingNode = node.getChildByName("cooking");
        let s: cc.Sprite = cookingNode.getComponent(cc.Sprite);
        this.schedule(
            function () {
                if (s.fillRange > 0.2) {
                    s.fillRange = s.fillRange - 0.1;
                }
            },
            0.3,
            9,
            0
        );
        this.scheduleOnce(function () {
            node.destroy();
        }, 3);
    }
}
