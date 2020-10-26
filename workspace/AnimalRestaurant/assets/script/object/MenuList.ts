import {
    COFFEE_TABLE_LEVEL_MAX,
    DESSERT_TABLE_LEVEL_MAX,
    DOOR_CURTAIN_LEVEL_MAX,
    MAT_LEVEL_MAX,
    MENU_ELEMENT_TYPE,
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
    MENU_ZINDEX,
    PLANT_LEVEL_MAX,
    STOVE_LEVEL_MAX,
    TABLE_LEVEL_MAX,
    TIP_LEVEL_MAX,
    WALL_DECORATION_LEVEL_MAX,
    WINE_CABINET_LEVEL_MAX,
} from "../config/GameConstants";
import { AbstratObject } from "./AbstratObject";
import { MenuElement } from "./MenuElement";
import { MenuTitle } from "./MenuTitle";
import { objectCollection } from "./ObjectCollection";

/*
 * @Author: ayue
 * @Date: 2020-10-13 19:51:35
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-16 16:24:41
 * 菜单列表
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class MenuList extends AbstratObject {
    public createMenuList() {
        let node = this.createObject("prefab/menu_list");
        objectCollection.addMenuList(this);
        //菜单列表上的对象渲染组件
        objectCollection.addMenuListContent(cc.find("Canvas/ScreenRoot/menu_list/view/mask/content"));
        this.postHandler(node);
    }

    postHandler(node: cc.Node) {
        //设置层级
        node.zIndex = MENU_ZINDEX;
        //设置每次打开从头开始
        let viewNode = node.getChildByName("view");
        let scrollView: cc.ScrollView = viewNode.getComponent(cc.ScrollView);
        this.scheduleOnce(function () {
            scrollView.scrollToOffset(cc.v2(0, 0));
        });
        this.createMenuTitle();
    }

    //创建菜单列表上的标题
    private createMenuTitle() {
        for (let i = MENU_ELEMENT_TYPE[0]; i < MENU_ELEMENT_TYPE.length; i++) {
            let menuTitle: MenuTitle = new MenuTitle();
            let titleNode: cc.Node = menuTitle.createMenuTitle(MENU_ELEMENT_TYPE[i]);
            if (i == MENU_ELEMENT_TYPE_TIP) {
                this.createTip(titleNode);
            } else if (
                i == MENU_ELEMENT_TYPE_TABLE_1 ||
                i == MENU_ELEMENT_TYPE_TABLE_2 ||
                i == MENU_ELEMENT_TYPE_TABLE_3 ||
                i == MENU_ELEMENT_TYPE_TABLE_4 ||
                i == MENU_ELEMENT_TYPE_TABLE_5 ||
                i == MENU_ELEMENT_TYPE_TABLE_6
            ) {
                this.createTable(titleNode, i);
            } else if (
                i == MENU_ELEMENT_TYPE_STOVE_1 ||
                i == MENU_ELEMENT_TYPE_STOVE_2 ||
                i == MENU_ELEMENT_TYPE_STOVE_3 ||
                i == MENU_ELEMENT_TYPE_STOVE_4 ||
                i == MENU_ELEMENT_TYPE_STOVE_5 ||
                i == MENU_ELEMENT_TYPE_STOVE_6
            ) {
                this.createStove(titleNode, i);
            } else if (i == MENU_ELEMENT_TYPE_PLANT) {
                this.createPlant(titleNode, i);
            } else if (i == MENU_ELEMENT_TYPE_DESSERT_TABLE) {
                this.createDessertTable(titleNode, i);
            } else if (i == MENU_ELEMENT_TYPE_MAT) {
                this.createMat(titleNode, i);
            } else if (i == MENU_ELEMENT_TYPE_DOOR_CURTAIN) {
                this.createDoorCurtain(titleNode, i);
            } else if (i == MENU_ELEMENT_TYPE_WALL_DECORATION) {
                this.createWallDecoration(titleNode, i);
            } else if (i == MENU_ELEMENT_TYPE_COFFEE_TABLE) {
                this.createCoffeeTable(titleNode, i);
            } else if (i == MENU_ELEMENT_TYPE_WINE_CABINET) {
                this.createWineCabinet(titleNode, i);
            }
        }
    }
    //创建小费台
    private createTip(titleNode: cc.Node) {
        for (let i = 0; i < TIP_LEVEL_MAX; i++) {
            let menuElement: MenuElement = new MenuElement();
            menuElement.createElement(titleNode, MENU_ELEMENT_TYPE_TIP, i);
        }
    }
    //创建餐桌
    private createTable(titleNode: cc.Node, type: number) {
        for (let i = 0; i < TABLE_LEVEL_MAX; i++) {
            let menuElement: MenuElement = new MenuElement();
            menuElement.createElement(titleNode, type, i);
        }
    }
    //创建植物
    private createPlant(titleNode: cc.Node, type: number) {
        for (let i = 0; i < PLANT_LEVEL_MAX; i++) {
            let menuElement: MenuElement = new MenuElement();
            menuElement.createElement(titleNode, type, i);
        }
    }
    //创建甜品台
    private createDessertTable(titleNode: cc.Node, type: number) {
        for (let i = 0; i < DESSERT_TABLE_LEVEL_MAX; i++) {
            let menuElement: MenuElement = new MenuElement();
            menuElement.createElement(titleNode, type, i);
        }
    }
    //创建地垫
    private createMat(titleNode: cc.Node, type: number) {
        for (let i = 0; i < MAT_LEVEL_MAX; i++) {
            let menuElement: MenuElement = new MenuElement();
            menuElement.createElement(titleNode, type, i);
        }
    }
    //创建门饰
    private createDoorCurtain(titleNode: cc.Node, type: number) {
        for (let i = 0; i < DOOR_CURTAIN_LEVEL_MAX; i++) {
            let menuElement: MenuElement = new MenuElement();
            menuElement.createElement(titleNode, type, i);
        }
    }
    //创建墙饰
    private createWallDecoration(titleNode: cc.Node, type: number) {
        for (let i = 0; i < WALL_DECORATION_LEVEL_MAX; i++) {
            let menuElement: MenuElement = new MenuElement();
            menuElement.createElement(titleNode, type, i);
        }
    }
    //创建咖啡台
    private createCoffeeTable(titleNode: cc.Node, type: number) {
        for (let i = 0; i < COFFEE_TABLE_LEVEL_MAX; i++) {
            let menuElement: MenuElement = new MenuElement();
            menuElement.createElement(titleNode, type, i);
        }
    }
    //创建酒柜
    private createWineCabinet(titleNode: cc.Node, type: number) {
        for (let i = 0; i < WINE_CABINET_LEVEL_MAX; i++) {
            let menuElement: MenuElement = new MenuElement();
            menuElement.createElement(titleNode, type, i);
        }
    }
    //创建火炉
    private createStove(titleNode: cc.Node, type: number) {
        for (let i = 0; i < STOVE_LEVEL_MAX; i++) {
            let menuElement: MenuElement = new MenuElement();
            menuElement.createElement(titleNode, type, i);
        }
    }
}
