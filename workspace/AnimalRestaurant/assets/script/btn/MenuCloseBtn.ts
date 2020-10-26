import { MenuList } from "../object/MenuList";
import { objectCollection } from "../object/ObjectCollection";

/*
 * @Author: ayue
 * @Date: 2020-10-13 19:48:04
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 14:44:52
 * 点击菜单周边，关闭菜单列表
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class MenuCloseBtn extends cc.Component {
    onBtn() {
        let menuList: MenuList = objectCollection.getMenuList();
        menuList.node.active = false;
    }
}
