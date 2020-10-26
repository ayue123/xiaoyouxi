import {
    GUEST_POSITION_TABLE_1,
    GUEST_POSITION_TABLE_2,
    GUEST_POSITION_TABLE_3,
    GUEST_POSITION_TABLE_4,
    GUEST_POSITION_TABLE_5,
    GUEST_POSITION_TABLE_6,
    ORDER_POSITION,
} from "../config/GameConstants";
/*
 * @Author: ayue
 * @Date: 2020-10-26 15:39:21
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-26 15:59:02
 */

import { AbstratObject } from "./AbstratObject";
import { Guest } from "./Guest";
import { objectCollection } from "./ObjectCollection";
const { ccclass, property } = cc._decorator;

@ccclass
export class Order extends AbstratObject {
    private guest: Guest = null;

    public getGuest() {
        return this.guest;
    }

    public createOrder(guest: Guest) {
        let node = this.createObject("prefab/order", objectCollection.getDiningRoomNode());
        this.guest = guest;
        objectCollection.addOrder(this);
        this.postHandler(node, guest);
    }

    private postHandler(node: cc.Node, guest: Guest) {
        if (guest.getTargetPosition() == GUEST_POSITION_TABLE_1) {
            node.position = cc.v2(ORDER_POSITION[0][0], ORDER_POSITION[0][1]);
        } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_2) {
            node.position = cc.v2(ORDER_POSITION[1][0], ORDER_POSITION[1][1]);
        } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_3) {
            node.position = cc.v2(ORDER_POSITION[2][0], ORDER_POSITION[2][1]);
        } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_4) {
            node.position = cc.v2(ORDER_POSITION[3][0], ORDER_POSITION[3][1]);
        } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_5) {
            node.position = cc.v2(ORDER_POSITION[4][0], ORDER_POSITION[4][1]);
        } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_6) {
            node.position = cc.v2(ORDER_POSITION[5][0], ORDER_POSITION[5][1]);
        }
    }
}
