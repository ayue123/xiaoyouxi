/*
 * @Author: ayue
 * @Date: 2020-10-26 16:00:05
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-26 17:28:26
 */
import {
    GUEST_MISSION_MOVING,
    GUEST_MISSION_STAIED,
    GUEST_MISSION_STAYING,
    GUEST_MOVE_SPEED,
    GUEST_POSITION_COFFEE_TABLE,
    GUEST_POSITION_DESSERT_TABLE,
    GUEST_POSITION_END,
    GUEST_POSITION_STAR,
    GUEST_POSITION_TABLE_1,
    GUEST_POSITION_TABLE_2,
    GUEST_POSITION_TABLE_3,
    GUEST_POSITION_TABLE_4,
    GUEST_POSITION_TABLE_5,
    GUEST_POSITION_TABLE_6,
    GUEST_POSITION_TIP,
    GUEST_POSITION_WAIN_CABINET,
    GUEST_POSITION_WAIT,
    MENU_ELEMENT_TYPE_TABLE_1,
    MENU_ELEMENT_TYPE_TABLE_2,
    MENU_ELEMENT_TYPE_TABLE_3,
    MENU_ELEMENT_TYPE_TABLE_4,
    MENU_ELEMENT_TYPE_TABLE_5,
    MENU_ELEMENT_TYPE_TABLE_6,
} from "../config/GameConstants";
import { assetManager } from "../controller/Assetmanager";
import { Guest } from "../object/Guest";
import { objectCollection } from "../object/ObjectCollection";
import { Order } from "../object/Order";

export class ScheduleHandler {
    // 单例
    private static _inst: ScheduleHandler;
    public static get inst() {
        return ScheduleHandler._inst || (ScheduleHandler._inst = new ScheduleHandler());
    }

    getTime(): number {
        return new Date().valueOf();
    }

    //创建顾客
    public createGuest() {
        let guest: Guest = new Guest();
        guest.createGuest();
    }

    //guest移动方法
    public guestMoveHandler() {
        let allGuests: Array<Guest> = objectCollection.getAllGuest();
        for (let i = 0; i < allGuests.length; i++) {
            let guest: Guest = allGuests[i];
            if (guest.node != null && guest.getFinishTime() <= this.getTime()) {
                let oldTargetPosition = guest.getTargetPosition();
                let isMove: boolean = this.timerHandler(guest);
                if (isMove) {
                    objectCollection.removeGuest(guest, oldTargetPosition);
                    objectCollection.addGuest(guest);
                    guest.updateIndex(objectCollection.getGuests(guest.getTargetPosition()).length - 1);
                }
                this.moveHandler(guest);
            }
        }
    }

    //移动方法
    public moveHandler(guest: Guest) {
        let node: cc.Node = guest.node;
        //计算移动终点，防止同一个点位上的guest重合
        let targetX = this.calTargetX(guest);
        let targetY = this.calTargetY(guest);
        //匀速移动
        let distanceX = Math.abs(targetX - node.position.x);
        let distanceY = Math.abs(targetY - node.position.y);
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        let time = distance / GUEST_MOVE_SPEED;
        guest.updateFinishTime(this.getTime() + time * 1000);
        var seq = cc.moveTo(time, targetX, targetY);
        node.runAction(seq);
    }

    //计算终点x
    private calTargetX(guest: Guest): number {
        if (guest.getTargetPosition() == GUEST_POSITION_WAIN_CABINET) {
            return guest.getTargetPosition()[0] + 20 * guest.getIndex();
        } else if (guest.getTargetPosition() == GUEST_POSITION_COFFEE_TABLE) {
            return guest.getTargetPosition()[0] - 15 * guest.getIndex();
        }
        return guest.getTargetPosition()[0];
    }

    //计算终点y
    private calTargetY(guest: Guest): number {
        if (guest.getTargetPosition() == GUEST_POSITION_WAIT) {
            return guest.getTargetPosition()[1] + 20 * guest.getIndex();
        } else if (guest.getTargetPosition() == GUEST_POSITION_COFFEE_TABLE) {
            return guest.getTargetPosition()[1] + 15 * guest.getIndex();
        } else if (guest.getTargetPosition() == GUEST_POSITION_DESSERT_TABLE) {
            return guest.getTargetPosition()[1] - 20 * guest.getIndex();
        } else if (guest.getTargetPosition() == GUEST_POSITION_TIP) {
            return guest.getTargetPosition()[1] - 20 * guest.getIndex();
        }
        return guest.getTargetPosition()[1];
    }

    private timerHandler(guest: Guest): boolean {
        if (
            guest.node.position.x.toFixed(0) == guest.getTargetPosition()[0].toFixed(0) &&
            guest.node.position.y.toFixed(0) == guest.getTargetPosition()[1].toFixed(0)
        ) {
            if (guest.getTargetPosition() == GUEST_POSITION_WAIT) {
                if (
                    objectCollection.getTable(MENU_ELEMENT_TYPE_TABLE_1) != null &&
                    (objectCollection.getGuests(GUEST_POSITION_TABLE_1) == null ||
                        objectCollection.getGuests(GUEST_POSITION_TABLE_1).length == 0)
                ) {
                    guest.updateTargetPosition(GUEST_POSITION_TABLE_1);
                    return true;
                }
                if (
                    objectCollection.getTable(MENU_ELEMENT_TYPE_TABLE_2) != null &&
                    (objectCollection.getGuests(GUEST_POSITION_TABLE_2) == null ||
                        objectCollection.getGuests(GUEST_POSITION_TABLE_2).length == 0)
                ) {
                    guest.updateTargetPosition(GUEST_POSITION_TABLE_2);
                    return true;
                }
                if (
                    objectCollection.getTable(MENU_ELEMENT_TYPE_TABLE_3) != null &&
                    (objectCollection.getGuests(GUEST_POSITION_TABLE_3) == null ||
                        objectCollection.getGuests(GUEST_POSITION_TABLE_3).length == 0)
                ) {
                    guest.updateTargetPosition(GUEST_POSITION_TABLE_3);
                    return true;
                }
                if (
                    objectCollection.getTable(MENU_ELEMENT_TYPE_TABLE_4) != null &&
                    (objectCollection.getGuests(GUEST_POSITION_TABLE_4) == null ||
                        objectCollection.getGuests(GUEST_POSITION_TABLE_4).length == 0)
                ) {
                    guest.updateTargetPosition(GUEST_POSITION_TABLE_4);
                    return true;
                }
                if (
                    objectCollection.getTable(MENU_ELEMENT_TYPE_TABLE_5) != null &&
                    (objectCollection.getGuests(GUEST_POSITION_TABLE_5) == null ||
                        objectCollection.getGuests(GUEST_POSITION_TABLE_5).length == 0)
                ) {
                    guest.updateTargetPosition(GUEST_POSITION_TABLE_5);
                    return true;
                }
                if (
                    objectCollection.getTable(MENU_ELEMENT_TYPE_TABLE_6) != null &&
                    (objectCollection.getGuests(GUEST_POSITION_TABLE_6) == null ||
                        objectCollection.getGuests(GUEST_POSITION_TABLE_6).length == 0)
                ) {
                    guest.updateTargetPosition(GUEST_POSITION_TABLE_6);
                    return true;
                }
                return false;
            } else if (
                guest.getTargetPosition() == GUEST_POSITION_TABLE_1 ||
                guest.getTargetPosition() == GUEST_POSITION_TABLE_2 ||
                guest.getTargetPosition() == GUEST_POSITION_TABLE_3 ||
                guest.getTargetPosition() == GUEST_POSITION_TABLE_4 ||
                guest.getTargetPosition() == GUEST_POSITION_TABLE_5 ||
                guest.getTargetPosition() == GUEST_POSITION_TABLE_6
            ) {
                if (guest.getMission() == GUEST_MISSION_STAYING) {
                    return false;
                }
                if (guest.getMission() == GUEST_MISSION_STAIED) {
                    guest.updateMission(GUEST_MISSION_MOVING);
                    guest.updateTargetPosition(GUEST_POSITION_WAIN_CABINET);
                    return true;
                }
                if (guest.getMission() == GUEST_MISSION_MOVING) {
                    guest.updateMission(GUEST_MISSION_STAYING);
                }
                let order: Order = new Order();
                order.createOrder(guest);
                return false;
            } else if (guest.getTargetPosition() == GUEST_POSITION_WAIN_CABINET) {
                if (guest.getMission() == GUEST_MISSION_STAYING) {
                    return false;
                }
                if (guest.getMission() == GUEST_MISSION_STAIED) {
                    guest.updateMission(GUEST_MISSION_MOVING);
                    guest.updateTargetPosition(GUEST_POSITION_COFFEE_TABLE);
                    return true;
                }
                if (guest.getMission() == GUEST_MISSION_MOVING) {
                    guest.updateMission(GUEST_MISSION_STAYING);
                }
                guest.scheduleOnce(function () {
                    guest.updateMission(GUEST_MISSION_STAIED);
                    guest.updateFinishTime(scheduleHandler.getTime() + 3000);
                }, 2);
                return false;
            } else if (guest.getTargetPosition() == GUEST_POSITION_COFFEE_TABLE) {
                if (guest.getMission() == GUEST_MISSION_STAYING) {
                    return false;
                }
                if (guest.getMission() == GUEST_MISSION_STAIED) {
                    guest.updateMission(GUEST_MISSION_MOVING);
                    guest.updateTargetPosition(GUEST_POSITION_DESSERT_TABLE);
                    return true;
                }
                if (guest.getMission() == GUEST_MISSION_MOVING) {
                    guest.updateMission(GUEST_MISSION_STAYING);
                }
                guest.scheduleOnce(function () {
                    guest.updateMission(GUEST_MISSION_STAIED);
                    guest.updateFinishTime(scheduleHandler.getTime() + 3000);
                }, 2);
                return false;
            } else if (guest.getTargetPosition() == GUEST_POSITION_DESSERT_TABLE) {
                if (guest.getMission() == GUEST_MISSION_STAYING) {
                    return false;
                }
                if (guest.getMission() == GUEST_MISSION_STAIED) {
                    guest.updateMission(GUEST_MISSION_MOVING);
                    guest.updateTargetPosition(GUEST_POSITION_TIP);
                    return true;
                }
                if (guest.getMission() == GUEST_MISSION_MOVING) {
                    guest.updateMission(GUEST_MISSION_STAYING);
                }
                guest.scheduleOnce(function () {
                    guest.updateMission(GUEST_MISSION_STAIED);
                    guest.updateFinishTime(scheduleHandler.getTime() + 3000);
                }, 2);
                return false;
            } else if (guest.getTargetPosition() == GUEST_POSITION_TIP) {
                if (guest.getMission() == GUEST_MISSION_STAYING) {
                    return false;
                }
                if (guest.getMission() == GUEST_MISSION_STAIED) {
                    guest.updateMission(GUEST_MISSION_MOVING);
                    guest.updateTargetPosition(GUEST_POSITION_END);
                    return true;
                }
                if (guest.getMission() == GUEST_MISSION_MOVING) {
                    guest.updateMission(GUEST_MISSION_STAYING);
                }
                guest.scheduleOnce(function () {
                    guest.updateMission(GUEST_MISSION_STAIED);
                    guest.updateFinishTime(scheduleHandler.getTime() + 3000);
                }, 2);
                return false;
            } else if (guest.getTargetPosition() == GUEST_POSITION_END) {
                objectCollection.removeGuest(guest, guest.getTargetPosition());
                guest.node.destroy();
            }
        }
        return false;
    }
}
export var scheduleHandler = ScheduleHandler.inst;
