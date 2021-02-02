/*
 * @Author: ayue
 * @Date: 2020-12-29 14:47:27
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-01 16:53:30
 */

import { moneyCalculator } from "../calculator/MoneyCalculator";
import { sellCalculator } from "../calculator/SellCalculator";

const { ccclass, property } = cc._decorator;
@ccclass
export default class AddMoneyBtn extends cc.Component {
	onBtn() {
		if (sellCalculator.isSellCloseShow()) {
			sellCalculator.hideCanSellFlower();
			sellCalculator.hideSellClose();
			return;
		}
		moneyCalculator.addMoney(100000000);
	}
}
