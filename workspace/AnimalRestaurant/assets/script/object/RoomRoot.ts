/*
 * @Author: ayue
 * @Date: 2020-10-21 16:43:35
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 19:01:51
 * 厨房和餐厅父节点
 */

import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export class RoomRoot extends AbstratObject {
    private startX = 0;
    private moveX = 0;
    private diningRoomX = 0;

    public getStarX() {
        return this.startX;
    }
    public updateStarX(x: number) {
        this.startX = x;
    }

    public getMoveX() {
        return this.moveX;
    }

    public updateMoveX(x: number) {
        this.moveX = x;
    }

    public getDiningRoomX() {
        return this.diningRoomX;
    }

    public updateDiningRoomX(diningRoomX: number) {
        this.diningRoomX = diningRoomX;
    }

    onLoad() {
        objectCollection.addRoomRoot(this);
        //实现拖动切换厨房和餐厅
        this.node.on(cc.Node.EventType.TOUCH_START, function (e) {
            let location: cc.Vec2 = e.getLocation();
            let roomRoot: RoomRoot = objectCollection.getRoomRoot();
            roomRoot.updateStarX(location.x - 320);
        });
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            let location: cc.Vec2 = e.getLocation();
            let roomRoot: RoomRoot = objectCollection.getRoomRoot();
            let startX = roomRoot.getStarX();
            let x = location.x - 320;
            let moveX = x - startX;
            let kitchenNode = objectCollection.getKitchenNode();
            let diningRoomNode = objectCollection.getDiningRoomNode();
            if (roomRoot.getDiningRoomX() == 0) {
                if (moveX > 0) {
                    return;
                }
                kitchenNode.position = cc.v2(700 + moveX, 0);
                diningRoomNode.position = cc.v2(0 + moveX, 0);
            } else {
                if (moveX < 0) {
                    return;
                }
                kitchenNode.position = cc.v2(0 + moveX, 0);
                diningRoomNode.position = cc.v2(-700 + moveX, 0);
            }
            roomRoot.updateMoveX(moveX);
        });

        this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            let roomRoot: RoomRoot = objectCollection.getRoomRoot();
            if (roomRoot.getMoveX() >= 320) {
                let kitchenNode = objectCollection.getKitchenNode();
                let diningRoomNode = objectCollection.getDiningRoomNode();
                if (roomRoot.getDiningRoomX() != 0) {
                    kitchenNode.position = cc.v2(700, 0);
                    diningRoomNode.position = cc.v2(0, 0);
                    roomRoot.updateDiningRoomX(0);
                } else {
                    kitchenNode.position = cc.v2(0, 0);
                    diningRoomNode.position = cc.v2(-700, 0);
                    roomRoot.updateDiningRoomX(-700);
                }
            } else if (roomRoot.getMoveX() < 320 && roomRoot.getMoveX() > -320) {
                let kitchenNode = objectCollection.getKitchenNode();
                let diningRoomNode = objectCollection.getDiningRoomNode();
                if (roomRoot.getDiningRoomX() == 0) {
                    kitchenNode.position = cc.v2(700, 0);
                    diningRoomNode.position = cc.v2(0, 0);
                    roomRoot.updateDiningRoomX(0);
                } else {
                    kitchenNode.position = cc.v2(0, 0);
                    diningRoomNode.position = cc.v2(-700, 0);
                    roomRoot.updateDiningRoomX(-700);
                }
            } else if (roomRoot.getMoveX() <= -320) {
                let kitchenNode = objectCollection.getKitchenNode();
                let diningRoomNode = objectCollection.getDiningRoomNode();
                if (roomRoot.getDiningRoomX() == 0) {
                    kitchenNode.position = cc.v2(0, 0);
                    diningRoomNode.position = cc.v2(-700, 0);
                    roomRoot.updateDiningRoomX(-700);
                } else {
                    kitchenNode.position = cc.v2(700, 0);
                    diningRoomNode.position = cc.v2(0, 0);
                    roomRoot.updateDiningRoomX(0);
                }
            }
            roomRoot.updateStarX(0);
            roomRoot.updateMoveX(0);
        });
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            let roomRoot: RoomRoot = objectCollection.getRoomRoot();
            if (roomRoot.getMoveX() >= 320) {
                let kitchenNode = objectCollection.getKitchenNode();
                let diningRoomNode = objectCollection.getDiningRoomNode();
                if (roomRoot.getDiningRoomX() != 0) {
                    kitchenNode.position = cc.v2(700, 0);
                    diningRoomNode.position = cc.v2(0, 0);
                    roomRoot.updateDiningRoomX(0);
                } else {
                    kitchenNode.position = cc.v2(0, 0);
                    diningRoomNode.position = cc.v2(-700, 0);
                    roomRoot.updateDiningRoomX(-700);
                }
            } else if (roomRoot.getMoveX() < 320 && roomRoot.getMoveX() > -320) {
                let kitchenNode = objectCollection.getKitchenNode();
                let diningRoomNode = objectCollection.getDiningRoomNode();
                if (roomRoot.getDiningRoomX() == 0) {
                    kitchenNode.position = cc.v2(700, 0);
                    diningRoomNode.position = cc.v2(0, 0);
                    roomRoot.updateDiningRoomX(0);
                } else {
                    kitchenNode.position = cc.v2(0, 0);
                    diningRoomNode.position = cc.v2(-700, 0);
                    roomRoot.updateDiningRoomX(-700);
                }
            } else if (roomRoot.getMoveX() <= -320) {
                let kitchenNode = objectCollection.getKitchenNode();
                let diningRoomNode = objectCollection.getDiningRoomNode();
                if (roomRoot.getDiningRoomX() == 0) {
                    kitchenNode.position = cc.v2(0, 0);
                    diningRoomNode.position = cc.v2(-700, 0);
                    roomRoot.updateDiningRoomX(-700);
                } else {
                    kitchenNode.position = cc.v2(700, 0);
                    diningRoomNode.position = cc.v2(0, 0);
                    roomRoot.updateDiningRoomX(0);
                }
            }
            roomRoot.updateStarX(0);
            roomRoot.updateMoveX(0);
        });
    }
}
