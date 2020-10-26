import {
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
    TABLEWARE_PRICE,
    TABLEWARE_UNLOCK_STAR,
    TIP_PRICE,
    TIP_UNLOCK_STAR,
} from "../config/GameConstants";
import { CoffeeTable } from "../object/CoffeeTable";
import { DessertTable } from "../object/DessertTable";
import { DoorCurtain } from "../object/DoorCurtain";
import { Mat } from "../object/Mat";
import { MenuElement } from "../object/MenuElement";
import { objectCollection } from "../object/ObjectCollection";
import { Plant } from "../object/Plant";
import { Tip } from "../object/Tip";
import { WallDecoration } from "../object/WallDecoration";
import { WineCabinet } from "../object/WineCabinet";
import { Map } from "../collections/Map";
import { Table } from "../object/Table";
import { MenuPrompt } from "../object/MenuPrompt";
import { MenuList } from "../object/MenuList";
import { Currency } from "../object/Currency";
import { GapTip } from "../object/GapTip";
import { Stove } from "../object/Stove";
/*
 * @Author: ayue
 * @Date: 2020-10-19 16:47:03
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 19:15:21
 * 点击菜单二级界面，创建餐具或者更换餐具等级
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class MenuPromptBtn extends cc.Component {
    onBtn() {
        let menuPrompt: MenuPrompt = objectCollection.getMenuPrompt();
        let menuElement: MenuElement = menuPrompt.getMenuElement();
        //创建餐具
        let isSuccess: boolean = this.createObject(menuElement);
        if (!isSuccess) {
            return;
        }
        //菜单上餐具状态显示控制
        let menuElements: Array<MenuElement> = objectCollection.getMenuElements();
        let tablewareMap: Map<Number, any> = objectCollection.getTablewareMap();
        for (let i = 0; i < menuElements.length; i++) {
            let menuElement: MenuElement = menuElements[i];
            let menuElementNode: cc.Node = menuElement.node;
            let tableware: any = tablewareMap.get(menuElement.getType());
            let selectedNode = menuElementNode.getChildByName("selected");
            let markNode = menuElementNode.getChildByName("mark");
            let unlockNode = menuElementNode.getChildByName("unlock");
            if (tableware == null) {
                selectedNode.active = false;
                markNode.active = false;
                unlockNode.active = false;
            } else if (tableware.getLevel() != menuElement.getLevel()) {
                selectedNode.active = false;
                markNode.active = false;
                if (menuElement.getIsLock() == false) {
                    unlockNode.active = true;
                } else {
                    unlockNode.active = false;
                }
            } else {
                selectedNode.active = true;
                markNode.active = true;
                unlockNode.active = false;
            }
        }
        menuPrompt.node.active = false;
        let menuList: MenuList = objectCollection.getMenuList();
        menuList.node.active = false;
    }

    onCloseBtn() {
        let menuPrompt: MenuPrompt = objectCollection.getMenuPrompt();
        menuPrompt.node.active = false;
    }

    private createObject(menuElement: MenuElement): boolean {
        let tablewareMap = objectCollection.getTablewareMap();
        let tableware = tablewareMap.get(menuElement.getType());
        //货币判断
        if (tableware == null || tableware.getLevel() < menuElement.getLevel()) {
            if (
                objectCollection.getStarCount() < TABLEWARE_UNLOCK_STAR[menuElement.getType()][menuElement.getLevel()]
            ) {
                let gapTip: GapTip = objectCollection.getGapTip();
                if (gapTip == null) {
                    gapTip = new GapTip();
                    gapTip.createGapTip();
                } else {
                    gapTip.updateGapTip();
                }
                let tipNode = gapTip.node.getChildByName("tip_label");
                let tipLabel = tipNode.getComponent(cc.Label);
                tipLabel.string = "星星不够";
                return false;
            }
            if (objectCollection.getFishCount() < TABLEWARE_PRICE[menuElement.getType()][menuElement.getLevel()]) {
                let gapTip: GapTip = objectCollection.getGapTip();
                if (gapTip == null) {
                    gapTip = new GapTip();
                    gapTip.createGapTip();
                } else {
                    gapTip.updateGapTip();
                }
                let tipNode = gapTip.node.getChildByName("tip_label");
                let tipLabel = tipNode.getComponent(cc.Label);
                tipLabel.string = "小鱼干不够";
                return false;
            }
        }
        //扣除货币
        let currency: Currency = objectCollection.getCurrency();
        currency.reduceFishCount(TABLEWARE_PRICE[menuElement.getType()][menuElement.getLevel()]);

        menuElement.unLock();
        if (menuElement.getType() == MENU_ELEMENT_TYPE_TIP) {
            this.createTip(menuElement);
        } else if (menuElement.getType() == MENU_ELEMENT_TYPE_COFFEE_TABLE) {
            this.createCoffeeTable(menuElement);
        } else if (menuElement.getType() == MENU_ELEMENT_TYPE_DESSERT_TABLE) {
            this.createDessertTable(menuElement);
        } else if (menuElement.getType() == MENU_ELEMENT_TYPE_DOOR_CURTAIN) {
            this.createDoorCurtain(menuElement);
        } else if (menuElement.getType() == MENU_ELEMENT_TYPE_MAT) {
            this.createMat(menuElement);
        } else if (menuElement.getType() == MENU_ELEMENT_TYPE_PLANT) {
            this.createPlant(menuElement);
        } else if (menuElement.getType() == MENU_ELEMENT_TYPE_WALL_DECORATION) {
            this.createWallDecoration(menuElement);
        } else if (menuElement.getType() == MENU_ELEMENT_TYPE_WINE_CABINET) {
            this.createWineCabinet(menuElement);
        } else if (
            menuElement.getType() == MENU_ELEMENT_TYPE_TABLE_1 ||
            menuElement.getType() == MENU_ELEMENT_TYPE_TABLE_2 ||
            menuElement.getType() == MENU_ELEMENT_TYPE_TABLE_3 ||
            menuElement.getType() == MENU_ELEMENT_TYPE_TABLE_4 ||
            menuElement.getType() == MENU_ELEMENT_TYPE_TABLE_5 ||
            menuElement.getType() == MENU_ELEMENT_TYPE_TABLE_6
        ) {
            this.createTable(menuElement);
        } else if (
            menuElement.getType() == MENU_ELEMENT_TYPE_STOVE_1 ||
            menuElement.getType() == MENU_ELEMENT_TYPE_STOVE_2 ||
            menuElement.getType() == MENU_ELEMENT_TYPE_STOVE_3 ||
            menuElement.getType() == MENU_ELEMENT_TYPE_STOVE_4 ||
            menuElement.getType() == MENU_ELEMENT_TYPE_STOVE_5 ||
            menuElement.getType() == MENU_ELEMENT_TYPE_STOVE_6
        ) {
            this.createStove(menuElement);
        }
        return true;
    }

    private createTip(menuElement: MenuElement) {
        if (objectCollection.getTip() == null) {
            let tip: Tip = new Tip();
            tip.createTip(menuElement.getLevel());
        } else {
            let tip: Tip = objectCollection.getTip();
            if (tip.getLevel() != menuElement.getLevel()) {
                tip.updateTip(menuElement.getLevel());
            }
        }
    }

    private createCoffeeTable(menuElement: MenuElement) {
        if (objectCollection.getCoffeeTable() == null) {
            let coffeeTable: CoffeeTable = new CoffeeTable();
            coffeeTable.createCoffeeTable(menuElement.getLevel());
        } else {
            let coffeeTable: CoffeeTable = objectCollection.getCoffeeTable();
            if (coffeeTable.getLevel() != menuElement.getLevel()) {
                coffeeTable.updateCoffeeTable(menuElement.getLevel());
            }
        }
    }
    private createDessertTable(menuElement: MenuElement) {
        if (objectCollection.getDessertTable() == null) {
            let dessertTable: DessertTable = new DessertTable();
            dessertTable.createDessertTable(menuElement.getLevel());
        } else {
            let dessertTable: DessertTable = objectCollection.getDessertTable();
            if (dessertTable.getLevel() != menuElement.getLevel()) {
                dessertTable.updateDessertTable(menuElement.getLevel());
            }
        }
    }
    private createDoorCurtain(menuElement: MenuElement) {
        if (objectCollection.getDoorCurtain() == null) {
            let doorCurtain: DoorCurtain = new DoorCurtain();
            doorCurtain.createDoorCurtain(menuElement.getLevel());
        } else {
            let doorCurtain: DoorCurtain = objectCollection.getDoorCurtain();
            if (doorCurtain.getLevel() != menuElement.getLevel()) {
                doorCurtain.updateDoorCurtain(menuElement.getLevel());
            }
        }
    }
    private createMat(menuElement: MenuElement) {
        if (objectCollection.getMat() == null) {
            let mat: Mat = new Mat();
            mat.createMat(menuElement.getLevel());
        } else {
            let mat: Mat = objectCollection.getMat();
            if (mat.getLevel() != menuElement.getLevel()) {
                mat.updateMat(menuElement.getLevel());
            }
        }
    }
    private createPlant(menuElement: MenuElement) {
        if (objectCollection.getPlant() == null) {
            let plant: Plant = new Plant();
            plant.createPlant(menuElement.getLevel());
        } else {
            let plant: Plant = objectCollection.getPlant();
            if (plant.getLevel() != menuElement.getLevel()) {
                plant.updatePlant(menuElement.getLevel());
            }
        }
    }
    private createWallDecoration(menuElement: MenuElement) {
        if (objectCollection.getWallDecoration() == null) {
            let wallDecoration: WallDecoration = new WallDecoration();
            wallDecoration.createWallDecoration(menuElement.getLevel());
        } else {
            let wallDecoration: WallDecoration = objectCollection.getWallDecoration();
            if (wallDecoration.getLevel() != menuElement.getLevel()) {
                wallDecoration.updateWallDecoration(menuElement.getLevel());
            }
        }
    }
    private createWineCabinet(menuElement: MenuElement) {
        if (objectCollection.getWineCabinet() == null) {
            let wineCabinet: WineCabinet = new WineCabinet();
            wineCabinet.createWineCabinet(menuElement.getLevel());
        } else {
            let wineCabinet: WineCabinet = objectCollection.getWineCabinet();
            if (wineCabinet.getLevel() != menuElement.getLevel()) {
                wineCabinet.updateWineCabinet(menuElement.getLevel());
            }
        }
    }

    private createTable(menuElement: MenuElement) {
        if (objectCollection.getTable(menuElement.getType()) == null) {
            let table: Table = new Table();
            table.createTable(menuElement.getType(), menuElement.getLevel());
        } else {
            let table: Table = objectCollection.getTable(menuElement.getType());
            if (table.getLevel() != menuElement.getLevel()) {
                table.updateTable(menuElement.getType(), menuElement.getLevel());
            }
        }
    }

    private createStove(menuElement: MenuElement) {
        if (objectCollection.getTable(menuElement.getType()) == null) {
            let stove: Stove = new Stove();
            stove.createStove(menuElement.getType(), menuElement.getLevel());
        } else {
            let stove: Stove = objectCollection.getStove(menuElement.getType());
            if (stove.getLevel() != menuElement.getLevel()) {
                stove.updateTable(menuElement.getType(), menuElement.getLevel());
            }
        }
    }
}
