/*
 * @Author: ayue
 * @Date: 2020-12-21 11:21:56
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-05 14:34:07
 */

import { SHOP_TYPE_TAP } from "../config/ShopConfig";
import { objects } from "../object/ObjectCollection";
import { ShopMenu } from "../object/ShopMenu";
import { ShopView } from "../object/ShopView";

const { ccclass, property } = cc._decorator;
/**
 * 商店水龙头组件按钮
 */
@ccclass
export default class ShopTapBtn extends cc.Component {
	onBtn() {
		if (this.node.active == false) {
			return;
		}
		let shopViews: Array<ShopView> = objects.getShopViews();
		for (let i = 0; i < shopViews.length; i++) {
			let shopView: ShopView = shopViews[i];
			if (shopView.getType() == SHOP_TYPE_TAP) {
				shopView.node.active = true;
			} else {
				shopView.node.active = false;
			}
		}
		let shopMenu: ShopMenu = objects.getShopMenu();
		let flowerNode: cc.Node = shopMenu.node.getChildByName("flower");
		let flowerBgNode = flowerNode.getChildByName("bg");
		flowerBgNode.active = true;
		let tapNode: cc.Node = shopMenu.node.getChildByName("tap");
		let tapBgNode = tapNode.getChildByName("bg");
		tapBgNode.active = false;
		let stoveNode: cc.Node = shopMenu.node.getChildByName("stove");
		let stoveBgNode = stoveNode.getChildByName("bg");
		stoveBgNode.active = true;
		let lampNode: cc.Node = shopMenu.node.getChildByName("lamp");
		let lampBgNode = lampNode.getChildByName("bg");
		lampBgNode.active = true;
	}
}
