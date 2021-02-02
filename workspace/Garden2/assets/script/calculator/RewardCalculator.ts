/*
 * @Author: ayue
 * @Date: 2020-12-25 15:41:00
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-28 14:51:09
 */

import { adsCalculator } from "./AdsCalculator";
import {
	REWARD_TYPE_DOUBLE_REWARD,
	REWARD_TYPE_MONEY,
	REWARD_TYPE_NUTRIENT,
} from "../config/AdsConfig";
import {
	SHOP_TYPE_FLOWER,
	SHOP_TYPE_LAMP,
	SHOP_TYPE_STOVE,
	SHOP_TYPE_TAP,
} from "../config/ShopConfig";
import { Nutrient } from "../object/Nutrient";
import { objects } from "../object/ObjectCollection";
import { ShopElement } from "../object/ShopElement";
import { Tip } from "../object/Tip";
import { dataCalculator } from "./DataCalculator";
import { moneyCalculator } from "./MoneyCalculator";
import { toolCalculator } from "./ToolCalculator";
import { tipCalculator } from "./TipCalculatot";

/**
 * 奖励处理类
 */
export class RewardCalculator {
	// 单例
	private static _inst: RewardCalculator;
	public static get inst() {
		return (
			RewardCalculator._inst ||
			(RewardCalculator._inst = new RewardCalculator())
		);
	}
	execute(type?: number) {
		if (type == null) {
			type = adsCalculator.getVideoRewardType();
		}
		if (type == REWARD_TYPE_NUTRIENT) {
			let nutrient: Nutrient = objects.getNutrient();
			nutrient.reduceFlowerTime();
		} else if (type == REWARD_TYPE_MONEY) {
			moneyCalculator.addMoney(tipCalculator.getVideoPrice());
		} else if (type == REWARD_TYPE_DOUBLE_REWARD) {
			let tip: Tip = objects.getTip();
			let addMoney: number = tip.getParameter();
			moneyCalculator.addMoney(addMoney);
		}
	}

	public shopElementExecute() {
		let tip: Tip = objects.getTip();
		let shopElement: ShopElement = tip.getParameter();
		if (shopElement.getShopType() == SHOP_TYPE_FLOWER) {
			if (objects.isFlowerUnlock(shopElement.getType())) {
				return;
			}
		} else if (shopElement.getShopType() == SHOP_TYPE_TAP) {
			if (objects.isToolUnlock(shopElement.getType())) {
				return;
			}
		} else if (shopElement.getShopType() == SHOP_TYPE_STOVE) {
			if (objects.isToolUnlock(shopElement.getType())) {
				return;
			}
		} else if (shopElement.getShopType() == SHOP_TYPE_LAMP) {
			if (objects.isToolUnlock(shopElement.getType())) {
				return;
			}
		}

		if (shopElement.getShopType() == SHOP_TYPE_FLOWER) {
			objects.unlockFolwer(shopElement.getType());
			dataCalculator.addUnlockFlower(shopElement.getType());
		} else {
			objects.unlockTool(shopElement.getType());
			if (shopElement.getShopType() == SHOP_TYPE_TAP) {
				toolCalculator.updateTap(shopElement.getType());
				dataCalculator.addUnlockTap(shopElement.getType());
			} else if (shopElement.getShopType() == SHOP_TYPE_STOVE) {
				toolCalculator.updateStove(shopElement.getType());
				dataCalculator.addUnlockStove(shopElement.getType());
			} else if (shopElement.getShopType() == SHOP_TYPE_LAMP) {
				toolCalculator.updateLamp(shopElement.getType());
				dataCalculator.addUnlockLamp(shopElement.getType());
			}
		}
		let lockNode: cc.Node = shopElement.node.getChildByName("lock");
		lockNode.active = false;
		let elementNode: cc.Node = shopElement.node.getChildByName("element");
		elementNode.color = cc.color(255, 255, 255);
		tip.node.active = false;
	}
}
export var rewardCalculator = RewardCalculator.inst;
