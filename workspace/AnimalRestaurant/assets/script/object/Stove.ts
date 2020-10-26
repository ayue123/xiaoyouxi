import {
    MENU_ELEMENT_TYPE_STOVE_1,
    MENU_ELEMENT_TYPE_STOVE_2,
    MENU_ELEMENT_TYPE_STOVE_3,
    MENU_ELEMENT_TYPE_STOVE_4,
    MENU_ELEMENT_TYPE_STOVE_5,
    MENU_ELEMENT_TYPE_STOVE_6,
    STOVE_POSITION,
} from "../config/GameConstants";
/*
 * @Author: ayue
 * @Date: 2020-10-21 19:06:10
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 19:12:37
 */

import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export class Stove extends AbstratObject {
    private level: number;
    public getLevel() {
        return this.level;
    }

    public createStove(type: number, level: number) {
        this.level = level;
        let node = this.createObject("prefab/stove", objectCollection.getKitchenNode());
        let texturePath = "texture/stove/stove_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        objectCollection.addStove(type, this);
        this.postHandler(node, type);
    }

    postHandler(node: cc.Node, type: number) {
        if (type == MENU_ELEMENT_TYPE_STOVE_1) {
            node.position = cc.v2(STOVE_POSITION[0][0], STOVE_POSITION[0][1]);
        } else if (type == MENU_ELEMENT_TYPE_STOVE_2) {
            node.position = cc.v2(STOVE_POSITION[1][0], STOVE_POSITION[1][1]);
        } else if (type == MENU_ELEMENT_TYPE_STOVE_3) {
            node.position = cc.v2(STOVE_POSITION[2][0], STOVE_POSITION[2][1]);
        } else if (type == MENU_ELEMENT_TYPE_STOVE_4) {
            node.position = cc.v2(STOVE_POSITION[3][0], STOVE_POSITION[3][1]);
        } else if (type == MENU_ELEMENT_TYPE_STOVE_5) {
            node.position = cc.v2(STOVE_POSITION[4][0], STOVE_POSITION[4][1]);
        } else if (type == MENU_ELEMENT_TYPE_STOVE_6) {
            node.position = cc.v2(STOVE_POSITION[5][0], STOVE_POSITION[5][1]);
        }
    }

    public updateTable(type: number, level: number) {
        this.level = level;
        let node = objectCollection.getStove(type).node;
        let texturePath = "texture/stove/stove_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        objectCollection.addStove(type, this);
    }
}
