/*
 * @Author: ayue
 * @Date: 2020-10-16 16:27:50
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 16:32:04
 * 地垫
 */

import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export class Mat extends AbstratObject {
    private level: number;
    public getLevel() {
        return this.level;
    }

    public createMat(level: number) {
        this.level = level;
        let node = this.createObject("prefab/mat", objectCollection.getDiningRoomNode());
        let texturePath = "texture/mat/mat_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        objectCollection.addMat(this);
    }

    public updateMat(level: number) {
        this.level = level;
        let node = objectCollection.getMat().node;
        let texturePath = "texture/mat/mat_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    }
}
