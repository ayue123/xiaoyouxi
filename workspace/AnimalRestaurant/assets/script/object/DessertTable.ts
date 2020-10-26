/*
 * @Author: ayue
 * @Date: 2020-10-16 16:26:38
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 16:31:52
 * 甜品台
 */

import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export class DessertTable extends AbstratObject {
    private level: number;
    public getLevel() {
        return this.level;
    }

    public createDessertTable(level: number) {
        this.level = level;
        let node = this.createObject("prefab/dessert_table", objectCollection.getDiningRoomNode());
        let texturePath = "texture/dessert_table/dessert_table_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        objectCollection.addDessertTable(this);
    }

    public updateDessertTable(level: number) {
        this.level = level;
        let node = objectCollection.getDessertTable().node;
        let texturePath = "texture/dessert_table/dessert_table_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    }
}
