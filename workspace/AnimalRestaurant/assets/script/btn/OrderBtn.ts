import {
    GUEST_MISSION_STAIED,
    GUEST_POSITION_TABLE_1,
    GUEST_POSITION_TABLE_2,
    GUEST_POSITION_TABLE_3,
    GUEST_POSITION_TABLE_4,
    GUEST_POSITION_TABLE_5,
    GUEST_POSITION_TABLE_6,
    MENU_ELEMENT_TYPE_STOVE_1,
    MENU_ELEMENT_TYPE_STOVE_2,
    MENU_ELEMENT_TYPE_STOVE_3,
    MENU_ELEMENT_TYPE_STOVE_4,
    MENU_ELEMENT_TYPE_STOVE_5,
    MENU_ELEMENT_TYPE_STOVE_6,
} from "../config/GameConstants";
import { scheduleHandler } from "../controller/ScheduleHandler";
import { Food } from "../object/Food";
/*
 * @Author: ayue
 * @Date: 2020-10-26 15:44:39
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-26 19:16:07
 */

import { objectCollection } from "../object/ObjectCollection";
import { Star } from "../object/Star";

const { ccclass, property } = cc._decorator;
@ccclass
export class OrderBtn extends cc.Component {
    onBtn() {
        let node = this.node;
        let orders = objectCollection.getOrders();
        for (let i = 0; i < orders.length; i++) {
            let order = orders[i];
            let orderNode = order.node;
            let btnNode = orderNode.getChildByName("btn");
            if (node == btnNode) {
                let guest = order.getGuest();
                if (guest.getTargetPosition() == GUEST_POSITION_TABLE_1) {
                    if (objectCollection.getStove(MENU_ELEMENT_TYPE_STOVE_1) == null) {
                        return;
                    }
                } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_2) {
                    if (objectCollection.getStove(MENU_ELEMENT_TYPE_STOVE_2) == null) {
                        return;
                    }
                } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_3) {
                    if (objectCollection.getStove(MENU_ELEMENT_TYPE_STOVE_3) == null) {
                        return;
                    }
                } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_4) {
                    if (objectCollection.getStove(MENU_ELEMENT_TYPE_STOVE_4) == null) {
                        return;
                    }
                } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_5) {
                    if (objectCollection.getStove(MENU_ELEMENT_TYPE_STOVE_5) == null) {
                        return;
                    }
                } else if (guest.getTargetPosition() == GUEST_POSITION_TABLE_6) {
                    if (objectCollection.getStove(MENU_ELEMENT_TYPE_STOVE_6) == null) {
                        return;
                    }
                }
                let stoveFood: Food = new Food();
                stoveFood.createStoveFood(guest);
                guest.updateMission(GUEST_MISSION_STAIED);
                guest.updateFinishTime(scheduleHandler.getTime() + 6000);
                guest.scheduleOnce(function () {
                    let food: Food = new Food();
                    food.createTableFood(guest);
                }, 3);
                objectCollection.removeOrder(order);
                orderNode.destroy();
            }
        }
    }
}
