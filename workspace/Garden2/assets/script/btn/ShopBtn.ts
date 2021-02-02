/*
 * @Author: ayue
 * @Date: 2020-12-17 17:46:26
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-08 14:19:05
 */
import { adsCalculator } from "../calculator/AdsCalculator";
import { sellCalculator } from "../calculator/SellCalculator";
import { objects } from "../object/ObjectCollection";
import { ShopMenu } from "../object/ShopMenu";

const { ccclass, property } = cc._decorator;
/**
 * 商店按钮
 */
@ccclass
export default class ShopBtn extends cc.Component {
	onBtn() {
		if (sellCalculator.isSellCloseShow()) {
			sellCalculator.hideCanSellFlower();
			sellCalculator.hideSellClose();
			return;
		}
		let shopMenu: ShopMenu = objects.getShopMenu();
		shopMenu.node.active = true;
		adsCalculator.showPageAd();
	}
}
