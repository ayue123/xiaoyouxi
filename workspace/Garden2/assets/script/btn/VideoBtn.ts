/*
 * @Author: ayue
 * @Date: 2020-12-24 15:03:14
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-08 15:00:02
 */
import { sellCalculator } from "../calculator/SellCalculator";
import { tipCalculator } from "../calculator/TipCalculatot";
import { TIP_TYPE_MONEY_SHORT } from "../config/TipConfig";

const { ccclass, property } = cc._decorator;
/**
 * 视频点击按钮
 */
@ccclass
export default class VideoBtn extends cc.Component {
	onBtn() {
		if (sellCalculator.isSellCloseShow()) {
			sellCalculator.hideCanSellFlower();
			sellCalculator.hideSellClose();
			return;
		}
		tipCalculator.updateLabel(
			TIP_TYPE_MONEY_SHORT,
			null,
			"观看短短的一段视频\n就可以获得" +
				tipCalculator.getVideoPrice() +
				"金币呦!"
		);
	}
}
