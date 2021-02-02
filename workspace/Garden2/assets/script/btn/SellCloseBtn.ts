/*
 * @Author: ayue
 * @Date: 2021-01-04 16:39:01
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-06 10:58:24
 */

import { sellCalculator } from "../calculator/SellCalculator";

const { ccclass, property } = cc._decorator;
/**
 * 售出按钮
 */
@ccclass
export default class SellCloseBtn extends cc.Component {
	onBtn() {
		sellCalculator.hideCanSellFlower();
		sellCalculator.hideSellClose();
	}
}
