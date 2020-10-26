import { MenuElement } from "../object/MenuElement";
import { objectCollection } from "../object/ObjectCollection";
import { MenuPrompt } from "../object/MenuPrompt";
/*
 * @Author: ayue
 * @Date: 2020-10-14 16:09:05
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 14:45:12
 * 点击菜单里的对象，弹出二级界面
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class MenuElementBtn extends cc.Component {
    onBtn() {
        let menuElements: Array<MenuElement> = objectCollection.getMenuElements();
        for (let i = 0; i < menuElements.length; i++) {
            let menuElement: MenuElement = menuElements[i];
            let menuElementNode: cc.Node = menuElement.node;
            let btnNode = menuElementNode.getChildByName("createBtn");
            if (this.node == btnNode) {
                let menuPrompt: MenuPrompt = objectCollection.getMenuPrompt();
                if (menuPrompt == null) {
                    menuPrompt = new MenuPrompt();
                    menuPrompt.createMenuPrompt(menuElement);
                } else {
                    menuPrompt.updateMenuPrompt(menuElement);
                    menuPrompt.node.active = true;
                }
                break;
            }
        }
    }
}
