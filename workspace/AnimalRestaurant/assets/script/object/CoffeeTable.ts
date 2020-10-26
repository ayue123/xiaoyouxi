/*
 * @Author: ayue
 * @Date: 2020-10-16 16:25:42
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 16:31:44
 * 咖啡台
 */

import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export class CoffeeTable extends AbstratObject {
    private level: number;
    public getLevel() {
        return this.level;
    }

    public createCoffeeTable(level: number) {
        this.level = level;
        let node = this.createObject("prefab/coffee_table", objectCollection.getDiningRoomNode());
        let texturePath = "texture/coffee_table/coffee_table_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        objectCollection.addCoffeeTable(this);
    }

    public updateCoffeeTable(level: number) {
        this.level = level;
        let node = objectCollection.getCoffeeTable().node;
        let texturePath = "texture/coffee_table/coffee_table_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    }
}
