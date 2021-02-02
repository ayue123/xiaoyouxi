/*
 * @Author: ayue
 * @Date: 2020-12-17 16:06:58
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-06 10:58:02
 */
import { sellCalculator } from "../calculator/SellCalculator";
import { tipCalculator } from "../calculator/TipCalculatot";
import { TIP_TYPE_NUTRIENT } from "../config/TipConfig";

const { ccclass, property } = cc._decorator;
/**
 * 营养液点击按钮
 */
@ccclass
export default class NutrientBtn extends cc.Component {
	onBtn() {
		if (sellCalculator.isSellCloseShow()) {
			sellCalculator.hideCanSellFlower();
			sellCalculator.hideSellClose();
			return;
		}
		tipCalculator.updateLabel(TIP_TYPE_NUTRIENT);
	}
}
