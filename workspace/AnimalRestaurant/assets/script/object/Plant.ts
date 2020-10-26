/*
 * @Author: ayue
 * @Date: 2020-10-16 16:28:09
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 16:32:09
 * 植物
 */

import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export class Plant extends AbstratObject {
    private level: number;
    public getLevel() {
        return this.level;
    }

    public createPlant(level: number) {
        this.level = level;
        let node = this.createObject("prefab/plant", objectCollection.getDiningRoomNode());
        let texturePath = "texture/plant/plant_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        objectCollection.addPlant(this);
    }
    public updatePlant(level: number) {
        this.level = level;
        let node = objectCollection.getPlant().node;
        let texturePath = "texture/plant/plant_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    }
}
