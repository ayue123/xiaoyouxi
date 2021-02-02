/*
 * @Author: ayue
 * @Date: 2020-12-21 18:12:04
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-05 13:57:05
 */

import {
	SHOP_TYPE_FLOWER,
	SHOP_TYPE_LAMP,
	SHOP_TYPE_STOVE,
	SHOP_TYPE_TAP,
} from "../config/ShopConfig";
import { POP_ZINDEX } from "../config/ZIndexConfig";
import { AbstratObject } from "./AbstractObject";
import { objects } from "./ObjectCollection";
import { ShopView } from "./ShopView";

const { ccclass, property } = cc._decorator;
/**
 * 商店菜单类
 */
@ccclass
export class ShopMenu extends AbstratObject {
	public createShopMenu() {
		this.node = this.createObject("prefab/shop_menu");
		objects.addShopMenu(this);
		this.node.zIndex = POP_ZINDEX;
		this.node.active = false;
		this.postHandler();
	}
	postHandler() {
		let flowerNode = this.node.getChildByName("flower");
		let flowerBgNode = flowerNode.getChildByName("bg");
		flowerBgNode.active = false;
		let shopView1: ShopView = new ShopView();
		shopView1.createShopView(SHOP_TYPE_FLOWER);
		let shopView2: ShopView = new ShopView();
		shopView2.createShopView(SHOP_TYPE_TAP);
		let shopView3: ShopView = new ShopView();
		shopView3.createShopView(SHOP_TYPE_STOVE);
		let shopView4: ShopView = new ShopView();
		shopView4.createShopView(SHOP_TYPE_LAMP);
	}
}
