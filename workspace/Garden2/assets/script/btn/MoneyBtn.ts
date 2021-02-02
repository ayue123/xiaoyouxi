/*
 * @Author: ayue
 * @Date: 2020-12-18 15:15:52
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-05 19:28:07
 */
import { dataCalculator } from "../calculator/DataCalculator";
import { moneyCalculator } from "../calculator/MoneyCalculator";
import { sellCalculator } from "../calculator/SellCalculator";
import { MONEY_NUMBER_POSITION } from "../config/PositionConfig";
import { Money } from "../object/Money";
import { objects } from "../object/ObjectCollection";

const { ccclass, property } = cc._decorator;
/**
 * 金币点击按钮
 */
@ccclass
export default class MoneyBtn extends cc.Component {
	onBtn() {
		if (sellCalculator.isSellCloseShow()) {
			sellCalculator.hideCanSellFlower();
			sellCalculator.hideSellClose();
			return;
		}
		let moneys: Array<Money> = objects.getMoneys();
		for (let i = 0; i < moneys.length; i++) {
			let money: Money = moneys[i];
			let btnNode: cc.Node = money.node.getChildByName("btn");
			if (btnNode == this.node) {
				moneyCalculator.addMoney(money.getCount());
				var seq = cc.sequence(
					cc.moveTo(0, money.node.position.x, money.node.position.y),
					cc.moveTo(0.3, MONEY_NUMBER_POSITION[0], MONEY_NUMBER_POSITION[1])
				);
				money.node.runAction(seq);
				money.scheduleOnce(function () {
					money.node.active = false;
				}, 0.3);
				break;
			}
		}
		dataCalculator.updateLastAddMoneyTime();
	}
}
