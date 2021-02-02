/*
 * @Author: ayue
 * @Date: 2021-01-04 10:47:55
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-10 14:56:37
 */

import {
	FLOWER_PRICE,
	LAMP_PRICE,
	SINGLE_VIDEO_MONEY,
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
	TIP_CLOSE,
	TIP_DES,
	TIP_TYPE_UNLOCK_FLOWERPOT,
	TIP_TYPE_SHOP_ELEMENT,
} from "../config/TipConfig";
import { Flowerpot } from "../object/Flowerpot";
import { objects } from "../object/ObjectCollection";
import { ShopElement } from "../object/ShopElement";
import { Tip } from "../object/Tip";
import { adsCalculator } from "./AdsCalculator";

export class TipCalculator {
	// 单例
	private static _inst: TipCalculator;
	public static get inst() {
		return TipCalculator._inst || (TipCalculator._inst = new TipCalculator());
	}

	updateLabel(
		type: number,
		parameter?: any,
		labelString?: string,
		chooseType?: number
	) {
		let tip: Tip = objects.getTip();
		tip.setType(type);
		tip.setParameter(parameter);
		let labelNode: cc.Node = tip.node.getChildByName("label");
		let label: cc.Label = labelNode.getComponent(cc.Label);
		if (labelString == null) {
			label.string = TIP_DES.get(type);
		} else {
			label.string = labelString;
		}
		let yesNode: cc.Node = tip.node.getChildByName("yes");
		let noNode: cc.Node = tip.node.getChildByName("no");
		if (chooseType == null) {
			chooseType = TIP_CLOSE.get(type);
		}
		if (chooseType == TIP_CHOOSE_HIDE) {
			yesNode.active = false;
			noNode.active = false;
		} else {
			yesNode.active = true;
			noNode.active = true;
		}
		tip.node.active = true;
		adsCalculator.showPageAd();
	}

	public getShopElementPrice(): number {
		let tip: Tip = objects.getTip();
		if (tip.getType() == TIP_TYPE_SHOP_ELEMENT) {
			let shopElement: ShopElement = tip.getParameter();
			if (shopElement.getShopType() == SHOP_TYPE_FLOWER) {
				return FLOWER_PRICE.get(shopElement.getType());
			} else if (shopElement.getShopType() == SHOP_TYPE_TAP) {
				return TAP_PRICE.get(shopElement.getType());
			} else if (shopElement.getShopType() == SHOP_TYPE_STOVE) {
				return STOVE_PRICE.get(shopElement.getType());
			} else if (shopElement.getShopType() == SHOP_TYPE_LAMP) {
				return LAMP_PRICE.get(shopElement.getType());
			}
		}
		return 0;
	}

	public getVideoPrice(): number {
		return (
			(objects.getUnlockFlowers().length + 1) *
			(objects.getUnlockFlowers().length + 1) *
			SINGLE_VIDEO_MONEY
		);
	}
}
export var tipCalculator = TipCalculator.inst;
