/*
 * @Author: ayue
 * @Date: 2020-10-19 18:58:14
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 14:47:52
 * 菜单二级提示
 */

import { AbstratObject } from "./AbstratObject";
import { MenuElement } from "./MenuElement";
import { objectCollection } from "./ObjectCollection";
import { Map } from "../collections/Map";
import { TABLEWARE_DES, TABLEWARE_NAME } from "../config/NameConstants";
import {
    TABLEWARE_ADD_FISH,
    TABLEWARE_ADD_STAR,
    TABLEWARE_PRICE,
    TABLEWARE_UNLOCK_STAR,
    TABLE_PRICE,
} from "../config/GameConstants";
const { ccclass, property } = cc._decorator;
@ccclass
export class MenuPrompt extends AbstratObject {
    private menuElement: MenuElement = null;

    public getMenuElement(): MenuElement {
        return this.menuElement;
    }

    public createMenuPrompt(menuElement: MenuElement) {
        this.menuElement = menuElement;
        let fatherNode: cc.Node = objectCollection.getMenuList().node;
        let node = this.createObject("prefab/menu_prompt", fatherNode);
        objectCollection.addMenuPrompt(this);
        this.postHandler(menuElement);
    }

    public updateMenuPrompt(menuElement: MenuElement) {
        this.menuElement = menuElement;
        this.postHandler(menuElement);
    }

    postHandler(menuElement: MenuElement) {
        let menuProment: MenuPrompt = objectCollection.getMenuPrompt();
        let node = menuProment.node;

        let tablewareMap: Map<Number, any> = objectCollection.getTablewareMap();
        let tableware: any = tablewareMap.get(menuElement.getType());

        let useNode = node.getChildByName("use");
        let useingNode = node.getChildByName("useing");
        let purchaseNode = node.getChildByName("purchase");
        let pictureNode = node.getChildByName("picture");
        let elementNode = menuElement.node.getChildByName("element");
        pictureNode.getComponent(cc.Sprite).spriteFrame = elementNode.getComponent(cc.Sprite).spriteFrame;

        useNode.active = false;
        useingNode.active = false;
        purchaseNode.active = false;

        if (tableware != null && tableware.getLevel() == menuElement.getLevel()) {
            useingNode.active = true;
        } else if (menuElement.getIsLock() == false) {
            useNode.active = true;
        } else {
            purchaseNode.active = true;
            let purchaseCountNode = purchaseNode.getChildByName("purchase_count");
            let purchaseCountLabel = purchaseCountNode.getComponent(cc.Label);
            purchaseCountLabel.string = TABLEWARE_PRICE[menuElement.getType()][menuElement.getLevel()];

            let gapCountNode = purchaseNode.getChildByName("gap_count");
            gapCountNode.active = false;
            if (objectCollection.getFishCount() < TABLEWARE_PRICE[menuElement.getType()][menuElement.getLevel()]) {
                gapCountNode.active = true;
                let gapCountLabel = gapCountNode.getComponent(cc.Label);
                gapCountLabel.string =
                    "小鱼干不够了，还差" +
                    (TABLEWARE_PRICE[menuElement.getType()][menuElement.getLevel()] - objectCollection.getFishCount());
            }
        }

        let nameNode = node.getChildByName("name");
        let nameLabel = nameNode.getComponent(cc.Label);
        nameLabel.string = TABLEWARE_NAME[menuElement.getType()][menuElement.getLevel()];
        let resumeNode = node.getChildByName("resume");
        let resumeLabel = resumeNode.getComponent(cc.Label);
        resumeLabel.string = TABLEWARE_DES[menuElement.getType()][menuElement.getLevel()];

        let addStarNode = node.getChildByName("add_star_count");
        let addFishNode = node.getChildByName("add_fish_count");
        let unlockNode = node.getChildByName("unlock_count");
        let addStarLabel = addStarNode.getComponent(cc.Label);
        let addFishLabel = addFishNode.getComponent(cc.Label);
        let unlockLabel = unlockNode.getComponent(cc.Label);
        addStarLabel.string = "+" + TABLEWARE_ADD_STAR[menuElement.getType()][menuElement.getLevel()];
        addFishLabel.string = "+" + TABLEWARE_ADD_FISH[menuElement.getType()][menuElement.getLevel()];
        unlockLabel.string = TABLEWARE_UNLOCK_STAR[menuElement.getType()][menuElement.getLevel()];
    }
}
