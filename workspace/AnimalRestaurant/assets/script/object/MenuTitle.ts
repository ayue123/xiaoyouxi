import { MENU_ELEMENT_TYPE_TABLE_1, MENU_ELEMENT_TYPE_TIP } from "../config/GameConstants";
import { MENU_TITLE_NAME } from "../config/NameConstants";
/*
 * @Author: ayue
 * @Date: 2020-10-13 20:28:53
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-20 10:51:24
 * 菜单列表上的标题
 */

import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export class MenuTitle extends AbstratObject {
    public createMenuTitle(type: number): cc.Node {
        //设置标题的父类为菜单列表上的渲染组件
        let fatherNode = objectCollection.getMenuListContent();
        let node = this.createObject("prefab/menu_title", fatherNode);
        this.postHandler(node, type);
        return node;
    }

    postHandler(node: cc.Node, type: number) {
        //设置标题的名称
        let lableNode: cc.Node = node.getChildByName("lable");
        let lable = lableNode.getComponent(cc.Label);
        lable.string = MENU_TITLE_NAME[type];
    }
}
