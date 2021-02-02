/*
 * @Author: ayue
 * @Date: 2021-01-04 11:03:05
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-05 19:27:28
 */

import { dataCalculator } from "../calculator/DataCalculator";
import { sellCalculator } from "../calculator/SellCalculator";

const { ccclass, property } = cc._decorator;
@ccclass
export default class ClearDataBtn extends cc.Component {
	onBtn() {
		if (sellCalculator.isSellCloseShow()) {
			sellCalculator.hideCanSellFlower();
			sellCalculator.hideSellClose();
			return;
		}
		dataCalculator.clearData();
	}
}
