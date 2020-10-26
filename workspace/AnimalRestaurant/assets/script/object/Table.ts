import {
    MENU_ELEMENT_TYPE_TABLE_1,
    MENU_ELEMENT_TYPE_TABLE_2,
    MENU_ELEMENT_TYPE_TABLE_3,
    MENU_ELEMENT_TYPE_TABLE_4,
    MENU_ELEMENT_TYPE_TABLE_5,
    MENU_ELEMENT_TYPE_TABLE_6,
    TABLE_POSITION,
    TABLE_ZINDEX,
} from "../config/GameConstants";
import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

/*
 * @Author: ayue
 * @Date: 2020-10-19 15:24:01
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-26 11:05:46
 * 餐桌
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class Table extends AbstratObject {
    private level: number;
    public getLevel() {
        return this.level;
    }

    public createTable(type: number, level: number) {
        this.level = level;
        let node = this.createObject("prefab/table", objectCollection.getDiningRoomNode());
        let texturePath = "texture/table/table_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        objectCollection.addTable(type, this);
        this.postHandler(node, type);
    }

    postHandler(node: cc.Node, type: number) {
        node.zIndex = TABLE_ZINDEX;
        if (type == MENU_ELEMENT_TYPE_TABLE_1) {
            node.position = cc.v2(TABLE_POSITION[0][0], TABLE_POSITION[0][1]);
        } else if (type == MENU_ELEMENT_TYPE_TABLE_2) {
            node.position = cc.v2(TABLE_POSITION[1][0], TABLE_POSITION[1][1]);
        } else if (type == MENU_ELEMENT_TYPE_TABLE_3) {
            node.position = cc.v2(TABLE_POSITION[2][0], TABLE_POSITION[2][1]);
        } else if (type == MENU_ELEMENT_TYPE_TABLE_4) {
            node.position = cc.v2(TABLE_POSITION[3][0], TABLE_POSITION[3][1]);
        } else if (type == MENU_ELEMENT_TYPE_TABLE_5) {
            node.position = cc.v2(TABLE_POSITION[4][0], TABLE_POSITION[4][1]);
        } else if (type == MENU_ELEMENT_TYPE_TABLE_6) {
            node.position = cc.v2(TABLE_POSITION[5][0], TABLE_POSITION[5][1]);
        }
    }

    public updateTable(type: number, level: number) {
        this.level = level;
        let node = objectCollection.getTable(type).node;
        let texturePath = "texture/table/table_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        objectCollection.addTable(type, this);
    }
}
