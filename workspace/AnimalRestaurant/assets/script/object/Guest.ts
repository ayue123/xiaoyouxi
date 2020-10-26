import { GUEST_MISSION_MOVING, GUEST_POSITION_STAR, GUEST_POSITION_WAIT, GUEST_ZINDEX } from "../config/GameConstants";
import { scheduleHandler } from "../controller/ScheduleHandler";
/*
 * @Author: ayue
 * @Date: 2020-10-22 11:47:14
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-26 16:02:40
 */

import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export class Guest extends AbstratObject {
    //终点位置
    private targetPosition = GUEST_POSITION_WAIT;
    //在终点位置上的索引
    private index = 0;
    //当前的任务
    private mission = GUEST_MISSION_MOVING;
    //当前动作结束时间
    private finishTime = scheduleHandler.getTime();

    public getTargetPosition() {
        return this.targetPosition;
    }

    public updateTargetPosition(targetPosition: Array<number>) {
        this.targetPosition = targetPosition;
    }

    public getIndex() {
        return this.index;
    }

    public updateIndex(index) {
        this.index = index;
    }

    public updateMission(mission) {
        this.mission = mission;
    }

    public getMission() {
        return this.mission;
    }

    public getFinishTime() {
        return this.finishTime;
    }
    public updateFinishTime(finishTime) {
        this.finishTime = finishTime;
    }

    public createGuest() {
        let node = this.createObject("prefab/guest", objectCollection.getDiningRoomNode());
        objectCollection.addGuest(this);
        this.postHandler(node);
    }

    private postHandler(node: cc.Node) {
        node.position = cc.v2(GUEST_POSITION_STAR[0], GUEST_POSITION_STAR[1]);
        let guests: Array<Guest> = objectCollection.getGuests(this.targetPosition);
        node.zIndex = GUEST_ZINDEX - guests.length;
        //设置索引
        this.updateIndex(guests.length - 1);
    }
}
