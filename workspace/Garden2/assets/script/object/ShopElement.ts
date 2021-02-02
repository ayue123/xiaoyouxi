/*
 * @Author: ayue
 * @Date: 2020-12-21 14:02:41
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-05 13:57:18
 */
import { FLOWER_NAME, FLOWER_TEXTUREPATH } from "../config/FlowerConfig";
import {
	SHOP_TYPE_FLOWER,
	SHOP_TYPE_LAMP,
	SHOP_TYPE_STOVE,
	SHOP_TYPE_TAP,
} from "../config/ShopConfig";
import {
	TOOL_NAME_LAMP,
	TOOL_NAME_STOVE,
	TOOL_NAME_TAP,
	TOOL_TEXTUREPATH_LAMP,
	TOOL_TEXTUREPATH_STOVE,
	TOOL_TEXTUREPATH_TAP,
} from "../config/ToolConfig";
import { POP_ZINDEX } from "../config/ZIndexConfig";
import { AbstratObject } from "./AbstractObject";
import { objects } from "./ObjectCollection";
import { ShopView } from "./ShopView";

const { ccclass, property } = cc._decorator;
/**
 * 商店对象类
 */
@ccclass
export class ShopElement extends AbstratObject {
	private shopType: number = 0;
	private type: number = 0;

	public getShopType(): number {
		return this.shopType;
	}
	public getType(): number {
		return this.type;
	}

	createShopElement(view: ShopView, type: number) {
		let contentNode: cc.Node = view.getContentNode();
		this.node = this.createObject("prefab/shop_element", contentNode);
		objects.addShopElement(this);
		this.node.zIndex = POP_ZINDEX;
		this.shopType = view.getType();
		this.type = type;
		this.postHandler();
	}
	postHandler() {
		let labelString: string = "";
		let texture: string = "";
		let isUnlock: boolean = false;
		let elementNode: cc.Node = this.node.getChildByName("element");

		if (this.shopType == SHOP_TYPE_FLOWER) {
			texture = FLOWER_TEXTUREPATH.get(this.type);
			labelString = FLOWER_NAME.get(this.type);
			isUnlock = objects.isFlowerUnlock(this.type);
		} else if (this.shopType == SHOP_TYPE_TAP) {
			texture = TOOL_TEXTUREPATH_TAP.get(this.type);
			labelString = TOOL_NAME_TAP.get(this.type);
			isUnlock = objects.isToolUnlock(this.type);
		} else if (this.shopType == SHOP_TYPE_STOVE) {
			texture = TOOL_TEXTUREPATH_STOVE.get(this.type);
			labelString = TOOL_NAME_STOVE.get(this.type);
			isUnlock = objects.isToolUnlock(this.type);
		} else if (this.shopType == SHOP_TYPE_LAMP) {
			texture = TOOL_TEXTUREPATH_LAMP.get(this.type);
			labelString = TOOL_NAME_LAMP.get(this.type);
			isUnlock = objects.isToolUnlock(this.type);
		}

		let labelNode: cc.Node = this.node.getChildByName("label");
		let label: cc.Label = labelNode.getComponent(cc.Label);
		let lockNode: cc.Node = this.node.getChildByName("lock");
		cc.loader.loadRes(texture, cc.SpriteFrame, function (err, spriteFrame) {
			elementNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
		});
		label.string = labelString;
		if (isUnlock) {
			lockNode.active = false;
		} else {
			elementNode.color = cc.color(0, 0, 0);
		}
	}
}
