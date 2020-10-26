/*
 * @Author: ayue
 * @Date: 2020-10-16 16:28:40
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 16:32:17
 * 墙饰
 */

import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export class WallDecoration extends AbstratObject {
    private level: number;
    public getLevel() {
        return this.level;
    }

    public createWallDecoration(level: number) {
        this.level = level;
        let node = this.createObject("prefab/wall_decoration", objectCollection.getDiningRoomNode());
        let texturePath = "texture/wall_decoration/wall_decoration_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        objectCollection.addWallDecoration(this);
    }
    public updateWallDecoration(level: number) {
        this.level = level;
        let node = objectCollection.getWallDecoration().node;
        let texturePath = "texture/wall_decoration/wall_decoration_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    }
}
