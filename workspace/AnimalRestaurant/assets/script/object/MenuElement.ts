import {
    COFFEE_TABLE_PRICE,
    DESSERT_TABLE_PRICE,
    DOOR_CURTAIN_PRICE,
    MAT_PRICE,
    MENU_ELEMENT_TYPE_COFFEE_TABLE,
    MENU_ELEMENT_TYPE_DESSERT_TABLE,
    MENU_ELEMENT_TYPE_DOOR_CURTAIN,
    MENU_ELEMENT_TYPE_MAT,
    MENU_ELEMENT_TYPE_PLANT,
    MENU_ELEMENT_TYPE_STOVE_1,
    MENU_ELEMENT_TYPE_STOVE_2,
    MENU_ELEMENT_TYPE_STOVE_3,
    MENU_ELEMENT_TYPE_STOVE_4,
    MENU_ELEMENT_TYPE_STOVE_5,
    MENU_ELEMENT_TYPE_STOVE_6,
    MENU_ELEMENT_TYPE_TABLE_1,
    MENU_ELEMENT_TYPE_TABLE_2,
    MENU_ELEMENT_TYPE_TABLE_3,
    MENU_ELEMENT_TYPE_TABLE_4,
    MENU_ELEMENT_TYPE_TABLE_5,
    MENU_ELEMENT_TYPE_TABLE_6,
    MENU_ELEMENT_TYPE_TIP,
    MENU_ELEMENT_TYPE_WALL_DECORATION,
    MENU_ELEMENT_TYPE_WINE_CABINET,
    PLANT_PRICE,
    STOVE_PRICE,
    TABLE_PRICE,
    TIP_PRICE,
    WALL_DECORATION_PRICE,
    WINE_CABINET_PRICE,
} from "../config/GameConstants";
/*
 * @Author: ayue
 * @Date: 2020-10-14 16:07:18
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 14:47:39
 * 菜单里的具体对象
 */

import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export class MenuElement extends AbstratObject {
    private type: number;
    private level: number;
    private lock: boolean = true;

    public getType() {
        return this.type;
    }

    public getLevel() {
        return this.level;
    }

    public getIsLock() {
        return this.lock;
    }

    public unLock() {
        this.lock = false;
    }

    createElement(fatherNode: cc.Node, type: number, level: number) {
        //设置标题的父类为菜单列表上的渲染组件
        let node = this.createObject("prefab/menu_element", fatherNode);
        objectCollection.addMenuElements(this);
        this.postHandler(node, type, level);
    }

    postHandler(node: cc.Node, type: number, level: number) {
        this.type = type;
        this.level = level;

        let selectedNode = node.getChildByName("selected");
        let markNode = node.getChildByName("mark");
        let unlockNode = node.getChildByName("unlock");
        selectedNode.active = false;
        markNode.active = false;
        unlockNode.active = false;

        let price = 0;

        let texturePath = "";
        if (type == MENU_ELEMENT_TYPE_TIP) {
            texturePath = "texture/tip_table/tip_table_" + (level + 1);
            price = TIP_PRICE[level];
        } else if (
            type == MENU_ELEMENT_TYPE_TABLE_1 ||
            type == MENU_ELEMENT_TYPE_TABLE_2 ||
            type == MENU_ELEMENT_TYPE_TABLE_3 ||
            type == MENU_ELEMENT_TYPE_TABLE_4 ||
            type == MENU_ELEMENT_TYPE_TABLE_5 ||
            type == MENU_ELEMENT_TYPE_TABLE_6
        ) {
            texturePath = "texture/table/table_" + (level + 1);
            price = TABLE_PRICE[level];
        } else if (
            type == MENU_ELEMENT_TYPE_STOVE_1 ||
            type == MENU_ELEMENT_TYPE_STOVE_2 ||
            type == MENU_ELEMENT_TYPE_STOVE_3 ||
            type == MENU_ELEMENT_TYPE_STOVE_4 ||
            type == MENU_ELEMENT_TYPE_STOVE_5 ||
            type == MENU_ELEMENT_TYPE_STOVE_6
        ) {
            texturePath = "texture/stove/stove_" + (level + 1);
            price = STOVE_PRICE[level];
        } else if (type == MENU_ELEMENT_TYPE_PLANT) {
            texturePath = "texture/plant/plant_" + (level + 1);
            price = PLANT_PRICE[level];
        } else if (type == MENU_ELEMENT_TYPE_DESSERT_TABLE) {
            texturePath = "texture/dessert_table/dessert_table_" + (level + 1);
            price = DESSERT_TABLE_PRICE[level];
        } else if (type == MENU_ELEMENT_TYPE_MAT) {
            texturePath = "texture/mat/mat_" + (level + 1);
            price = MAT_PRICE[level];
        } else if (type == MENU_ELEMENT_TYPE_DOOR_CURTAIN) {
            texturePath = "texture/door_curtain/door_curtain_" + (level + 1);
            price = DOOR_CURTAIN_PRICE[level];
        } else if (type == MENU_ELEMENT_TYPE_WALL_DECORATION) {
            texturePath = "texture/wall_decoration/wall_decoration_" + (level + 1);
            price = WALL_DECORATION_PRICE[level];
        } else if (type == MENU_ELEMENT_TYPE_COFFEE_TABLE) {
            texturePath = "texture/coffee_table/coffee_table_" + (level + 1);
            price = COFFEE_TABLE_PRICE[level];
        } else if (type == MENU_ELEMENT_TYPE_WINE_CABINET) {
            texturePath = "texture/wine_cabinet/wine_cabinet_" + (level + 1);
            price = WINE_CABINET_PRICE[level];
        }
        let elementNode: cc.Node = node.getChildByName("element");
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            elementNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });

        let priceNode = node.getChildByName("price");
        let priceLabel: cc.Label = priceNode.getComponent(cc.Label);
        priceLabel.string = price + "";
    }
}
