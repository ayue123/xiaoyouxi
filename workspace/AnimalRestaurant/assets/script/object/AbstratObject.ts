import {
    GUEST_MISSION_MOVING,
    GUEST_MISSION_STAIED,
    GUEST_MISSION_STAYING,
    GUEST_MOVE_SPEED,
    GUEST_POSITION_COFFEE_TABLE,
    GUEST_POSITION_DESSERT_TABLE,
    GUEST_POSITION_END,
    GUEST_POSITION_STAR,
    GUEST_POSITION_TABLE_1,
    GUEST_POSITION_TABLE_2,
    GUEST_POSITION_TABLE_3,
    GUEST_POSITION_TABLE_4,
    GUEST_POSITION_TABLE_5,
    GUEST_POSITION_TABLE_6,
    GUEST_POSITION_TIP,
    GUEST_POSITION_WAIN_CABINET,
    GUEST_POSITION_WAIT,
    MENU_ELEMENT_TYPE_TABLE_1,
    MENU_ELEMENT_TYPE_TABLE_2,
    MENU_ELEMENT_TYPE_TABLE_3,
    MENU_ELEMENT_TYPE_TABLE_4,
    MENU_ELEMENT_TYPE_TABLE_5,
    MENU_ELEMENT_TYPE_TABLE_6,
} from "../config/GameConstants";
import { assetManager } from "../controller/Assetmanager";
import { Guest } from "./Guest";
import { objectCollection } from "./ObjectCollection";
import { Order } from "./Order";

/*
 * @Author: ayue
 * @Date: 2020-10-13 14:49:03
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-26 16:02:52
 * 创建对象的抽象类
 */
const { ccclass, property } = cc._decorator;
@ccclass
export abstract class AbstratObject extends cc.Component {
    createObject(url: string, fatherNode?: cc.Node): cc.Node {
        let prefab = assetManager.get(url);
        let node: cc.Node = assetManager.generateNode(prefab);
        let upperNode: cc.Node = objectCollection.getScreenRoot().node;
        if (fatherNode != null) {
            upperNode = fatherNode;
        }
        node.parent = upperNode;
        this.node = node;
        return node;
    }
}
