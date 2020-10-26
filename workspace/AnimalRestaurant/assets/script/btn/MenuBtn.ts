import { MenuList } from "../object/MenuList";
import { objectCollection } from "../object/ObjectCollection";

/*
 * @Author: ayue
 * @Date: 2020-10-13 19:59:07
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 14:43:54
 * 点击菜单按钮，打开菜单列表
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class MenuBtn extends cc.Component {
    onBtn() {
        let menuList: MenuList = objectCollection.getMenuList();
        if (menuList == null) {
            let menuList: MenuList = new MenuList();
            menuList.createMenuList();
        } else {
            menuList.node.active = true;
        }
        this.postHandler();
    }

    postHandler() {}
}
