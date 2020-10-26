import { TIP_PRICE } from "../config/GameConstants";
/*
 * @Author: ayue
 * @Date: 2020-10-16 15:40:21
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 16:31:36
 * 小费台
 */

import { AbstratObject } from "./AbstratObject";
import { Currency } from "./Currency";
import { objectCollection } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export class Tip extends AbstratObject {
    private level: number;
    public getLevel() {
        return this.level;
    }

    public createTip(level: number) {
        this.level = level;
        let node = this.createObject("prefab/tip", objectCollection.getDiningRoomNode());
        let texturePath = "texture/tip_table/tip_table_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        objectCollection.addTip(this);
    }

    public updateTip(level: number) {
        this.level = level;
        let node = objectCollection.getTip().node;
        let texturePath = "texture/tip_table/tip_table_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        objectCollection.addTip(this);
    }
}
