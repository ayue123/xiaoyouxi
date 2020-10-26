/*
 * @Author: ayue
 * @Date: 2020-10-16 16:27:17
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 16:31:58
 * 门帘
 */

import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export class DoorCurtain extends AbstratObject {
    private level: number;
    public getLevel() {
        return this.level;
    }

    public createDoorCurtain(level: number) {
        this.level = level;
        let node = this.createObject("prefab/door_curtain", objectCollection.getDiningRoomNode());
        let texturePath = "texture/door_curtain/door_curtain_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        objectCollection.addDoorCurtain(this);
    }

    public updateDoorCurtain(level: number) {
        this.level = level;
        let node = objectCollection.getDoorCurtain().node;
        let texturePath = "texture/door_curtain/door_curtain_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    }
}
