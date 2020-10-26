/*
 * @Author: ayue
 * @Date: 2020-10-13 20:06:43
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-14 15:45:15
 * 菜单
 */

import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;

@ccclass
export class Menu extends AbstratObject {
    public createMenu() {
        let node = this.createObject("prefab/menu");
        objectCollection.addMenu(this);
    }
}
