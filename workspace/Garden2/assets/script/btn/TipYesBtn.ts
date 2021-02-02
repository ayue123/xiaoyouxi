/*
 * @Author: ayue
 * @Date: 2020-12-17 17:46:26
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-10 14:56:29
 */
import { adsCalculator } from "../calculator/AdsCalculator";
import { dataCalculator } from "../calculator/DataCalculator";
import { flowerCalculator } from "../calculator/FlowerCalculator";
import { moneyCalculator } from "../calculator/MoneyCalculator";
import { rewardCalculator } from "../calculator/RewardCalculator";
import { tipCalculator } from "../calculator/TipCalculatot";
import {
	REWARD_TYPE_DOUBLE_REWARD,
	REWARD_TYPE_MONEY,
	REWARD_TYPE_NUTRIENT,
	REWARD_TYPE_UNLOCK_FLOWERPOT,
	REWARD_TYPE_UNLOCK_SHOP_ELEMENT,
} from "../config/AdsConfig";
import { FLOWERPOT_PRICE, FLOWER_PRICE } from "../config/MoneyConfig";
import {
	TIP_TYPE_DOUBLE_REWARD,
	TIP_TYPE_UNLOCK_FLOWERPOT,
	TIP_TYPE_GAIN_SNAIL,
	TIP_TYPE_GARDEN_FULL,
	TIP_TYPE_MONEY_SHORT,
	TIP_TYPE_NEWBIE,
	TIP_TYPE_NUTRIENT,
	TIP_TYPE_SELL,
	TIP_TYPE_SHOP_ELEMENT,
} from "../config/TipConfig";
import { Flowerpot } from "../object/Flowerpot";
import { Newbie } from "../object/Newbie";
import { objects } from "../object/ObjectCollection";
import { Tip } from "../object/Tip";

const { ccclass, property } = cc._decorator;
/**
 * 提示页面确定按钮
 */
@ccclass
export default class TipYesBtn extends cc.Component {
	onBtn() {
		let tip: Tip = objects.getTip();
		if (tip.getType() == TIP_TYPE_SELL) {
			let flowerpot: Flowerpot = tip.getParameter();
			let flower = flowerpot.getFlower();
			moneyCalculator.addMoney(flowerCalculator.getFlowerPrice(flower));
			objects.removeFlower(flower);
			flowerpot.addFlower(null);
			flower.node.destroy();
			tip.node.active = false;
			dataCalculator.reduceFlower(flower.getVacant());
		} else if (tip.getType() == TIP_TYPE_NUTRIENT) {
			tip.node.active = false;
			adsCalculator.showVideoAd(REWARD_TYPE_NUTRIENT);
		} else if (tip.getType() == TIP_TYPE_MONEY_SHORT) {
			tip.node.active = false;
			adsCalculator.showVideoAd(REWARD_TYPE_MONEY);
		} else if (tip.getType() == TIP_TYPE_GARDEN_FULL) {
			tip.node.active = false;
		} else if (tip.getType() == TIP_TYPE_GAIN_SNAIL) {
			tip.node.active = false;
		} else if (tip.getType() == TIP_TYPE_DOUBLE_REWARD) {
			tip.node.active = false;
			adsCalculator.showVideoAd(REWARD_TYPE_DOUBLE_REWARD);
		} else if (tip.getType() == TIP_TYPE_SHOP_ELEMENT) {
			tip.node.active = false;
			let price = tipCalculator.getShopElementPrice();
			if (moneyCalculator.getCount() < price) {
				tipCalculator.updateLabel(TIP_TYPE_MONEY_SHORT);
				return;
			}
			moneyCalculator.reduceMoney(price);
			rewardCalculator.shopElementExecute();
		} else if (tip.getType() == TIP_TYPE_UNLOCK_FLOWERPOT) {
			tip.node.active = false;
			let flowerpot: Flowerpot = tip.getParameter();
			let price = FLOWERPOT_PRICE.get(flowerpot.getVacant());
			if (moneyCalculator.getCount() < price) {
				tipCalculator.updateLabel(TIP_TYPE_MONEY_SHORT);
				return;
			}
			moneyCalculator.reduceMoney(price);
			flowerpot.unlock();
			dataCalculator.addUnlockFlowerpot(flowerpot.getVacant());
		}
		adsCalculator.hidePageAd();

		if (objects.getNewbie() != null) {
			let newbie: Newbie = objects.getNewbie();
			let newbieNode: cc.Node = newbie.node;
			newbieNode.active = false;
			objects.addNewbie(null);
			tipCalculator.updateLabel(TIP_TYPE_NEWBIE);
			dataCalculator.removeNewbie();
		}
	}
}
