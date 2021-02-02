/*
 * @Author: ayue
 * @Date: 2020-12-21 17:28:17
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-05 13:57:12
 */

import { FLOWER_TEXTUREPATH } from "../config/FlowerConfig";
import {
	SHOP_TYPE_FLOWER,
	SHOP_TYPE_LAMP,
	SHOP_TYPE_STOVE,
	SHOP_TYPE_TAP,
} from "../config/ShopConfig";
import {
	TOOL_TEXTUREPATH_LAMP,
	TOOL_TEXTUREPATH_STOVE,
	TOOL_TEXTUREPATH_TAP,
} from "../config/ToolConfig";
import { POP_ZINDEX } from "../config/ZIndexConfig";
import { AbstratObject } from "./AbstractObject";
import { objects } from "./ObjectCollection";
import { ShopElement } from "./ShopElement";
import { ShopMenu } from "./ShopMenu";

const { ccclass, property } = cc._decorator;
/**
 * 商店滑动显示类
 */
@ccclass
export class ShopView extends AbstratObject {
	private type: number;
	private contentNode: cc.Node = null;
	public getType(): number {
		return this.type;
	}
	public getContentNode() {
		return this.contentNode;
	}

	createShopView(type: number) {
		this.type = type;
		let shopMenu: ShopMenu = objects.getShopMenu();
		this.node = this.createObject("prefab/shop_view", shopMenu.node);
		objects.addShopView(this);
		this.node.zIndex = POP_ZINDEX;
		this.contentNode = this.node
			.getChildByName("mask")
			.getChildByName("content");
		this.postHandler();
		let scrollView: cc.ScrollView = this.node.getComponent(cc.ScrollView);
		this.scheduleOnce(function () {
			scrollView.scrollTo(cc.v2(0, 0));
		});
	}
	postHandler() {
		if (this.type == SHOP_TYPE_FLOWER) {
			FLOWER_TEXTUREPATH.forEach((f) => {
				let shopElement: ShopElement = new ShopElement();
				shopElement.createShopElement(this, f.key);
			});
		} else if (this.type == SHOP_TYPE_TAP) {
			TOOL_TEXTUREPATH_TAP.forEach((t) => {
				let shopElement: ShopElement = new ShopElement();
				shopElement.createShopElement(this, t.key);
			});
			this.node.active = false;
		} else if (this.type == SHOP_TYPE_STOVE) {
			TOOL_TEXTUREPATH_STOVE.forEach((t) => {
				let shopElement: ShopElement = new ShopElement();
				shopElement.createShopElement(this, t.key);
			});
			this.node.active = false;
		} else if (this.type == SHOP_TYPE_LAMP) {
			TOOL_TEXTUREPATH_LAMP.forEach((t) => {
				let shopElement: ShopElement = new ShopElement();
				shopElement.createShopElement(this, t.key);
			});
			this.node.active = false;
		}
	}
}
