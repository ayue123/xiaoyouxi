/*
 * @Author: ayue
 * @Date: 2020-12-24 16:27:51
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-28 15:11:43
 */

import { flowerCalculator } from "../calculator/FlowerCalculator";
import { sellCalculator } from "../calculator/SellCalculator";
import { tipCalculator } from "../calculator/TipCalculatot";
import { FLOWERPOT_PRICE } from "../config/MoneyConfig";
import { TIP_TYPE_UNLOCK_FLOWERPOT } from "../config/TipConfig";
import { Flowerpot } from "../object/Flowerpot";
import { objects } from "../object/ObjectCollection";

const { ccclass, property } = cc._decorator;
/**
 * 花盆解锁按钮
 */
@ccclass
export default class FlowerpotLockBtn extends cc.Component {
	onBtn() {
		if (sellCalculator.isSellCloseShow()) {
			sellCalculator.hideCanSellFlower();
			sellCalculator.hideSellClose();
			return;
		}
		let flowerpot: Flowerpot = null;
		let flowerpots: Array<Flowerpot> = objects.getFlowerpots();
		for (let i = 0; i < flowerpots.length; i++) {
			let f: Flowerpot = flowerpots[i];
			let lockNode: cc.Node = f.node.getChildByName("lock");
			if (lockNode == this.node) {
				flowerpot = f;
				break;
			}
		}

		let price = FLOWERPOT_PRICE.get(flowerpot.getVacant());
		let priceStr: string = price + "";
		if (price > 1000000) {
			priceStr = Math.ceil(price / 1000000) + "M";
		} else if (price > 1000) {
			priceStr = Math.ceil(price / 1000) + "K";
		}
		tipCalculator.updateLabel(
			TIP_TYPE_UNLOCK_FLOWERPOT,
			flowerpot,
			"是否使用" + priceStr + "个金币解锁一个花盆?"
		);
	}
}
