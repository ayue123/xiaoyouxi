/*
 * @Author: ayue
 * @Date: 2020-12-21 14:10:45
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-28 15:04:48
 */
import { flowerCalculator } from "../calculator/FlowerCalculator";
import { tipCalculator } from "../calculator/TipCalculatot";
import { FLOWER_NAME } from "../config/FlowerConfig";
import {
	FLOWER_PRICE,
	LAMP_PRICE,
	STOVE_PRICE,
	TAP_PRICE,
} from "../config/MoneyConfig";
import {
	SHOP_TYPE_FLOWER,
	SHOP_TYPE_LAMP,
	SHOP_TYPE_STOVE,
	SHOP_TYPE_TAP,
} from "../config/ShopConfig";
import {
	TIP_CHOOSE_HIDE,
	TIP_DES,
	TIP_TYPE_SHOP_ELEMENT,
} from "../config/TipConfig";
import {
	TOOL_ADDITION_LAMP,
	TOOL_ADDITION_STOVE,
	TOOL_ADDITION_TAP,
	TOOL_NAME_LAMP,
	TOOL_NAME_STOVE,
	TOOL_NAME_TAP,
} from "../config/ToolConfig";
import { objects } from "../object/ObjectCollection";
import { ShopElement } from "../object/ShopElement";
import { Tip } from "../object/Tip";

const { ccclass, property } = cc._decorator;
/**
 * 商店中具体对象点击按钮
 */
@ccclass
export default class ShopElementBtn extends cc.Component {
	onBtn() {
		let shopElements: Array<ShopElement> = objects.getShopElements();
		for (let i = 0; i < shopElements.length; i++) {
			let shopElement: ShopElement = shopElements[i];
			let elementNode = shopElement.node.getChildByName("element");
			if (elementNode == this.node) {
				this.execute(shopElement);
				break;
			}
		}
	}

	private execute(shopElement: ShopElement) {
		let isUnlock: boolean = false;
		let elementName: string = "";
		let elementDes: string = "";
		let price: number = 0;
		if (shopElement.getShopType() == SHOP_TYPE_FLOWER) {
			isUnlock = objects.isFlowerUnlock(shopElement.getType());
			elementName = FLOWER_NAME.get(shopElement.getType());
			price = FLOWER_PRICE.get(shopElement.getType());
			elementDes =
				"\n出售后金币收益" + Math.ceil(2000 * shopElement.getType() * 1.5);
		} else if (shopElement.getShopType() == SHOP_TYPE_TAP) {
			isUnlock = objects.isToolUnlock(shopElement.getType());
			elementName = TOOL_NAME_TAP.get(shopElement.getType());
			price = TAP_PRICE.get(shopElement.getType());
			elementDes =
				"\n增加植物" +
				TOOL_ADDITION_TAP.get(shopElement.getType()) +
				"%成长速度";
		} else if (shopElement.getShopType() == SHOP_TYPE_STOVE) {
			isUnlock = objects.isToolUnlock(shopElement.getType());
			elementName = TOOL_NAME_STOVE.get(shopElement.getType());
			price = STOVE_PRICE.get(shopElement.getType());
			elementDes =
				"\n增加植物" +
				TOOL_ADDITION_STOVE.get(shopElement.getType()) +
				"%成长速度";
		} else if (shopElement.getShopType() == SHOP_TYPE_LAMP) {
			isUnlock = objects.isToolUnlock(shopElement.getType());
			elementName = TOOL_NAME_LAMP.get(shopElement.getType());
			price = LAMP_PRICE.get(shopElement.getType());
			elementDes =
				"\n增加植物" +
				TOOL_ADDITION_LAMP.get(shopElement.getType()) +
				"%成长速度";
		}
		let priceStr: string = price + "";
		if (price > 1000000) {
			priceStr = Math.ceil(price / 1000000) + "M";
		} else if (price > 1000) {
			priceStr = Math.ceil(price / 1000) + "K";
		}
		if (isUnlock) {
			tipCalculator.updateLabel(
				TIP_TYPE_SHOP_ELEMENT,
				shopElement,
				elementName + elementDes,
				TIP_CHOOSE_HIDE
			);
		} else {
			let tip: Tip = objects.getTip();
			tipCalculator.updateLabel(
				TIP_TYPE_SHOP_ELEMENT,
				shopElement,
				elementName + elementDes + "\n是否消耗" + priceStr + "金币解锁?"
			);
		}
	}
}
