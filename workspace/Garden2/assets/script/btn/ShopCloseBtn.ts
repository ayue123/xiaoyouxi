/*
 * @Author: ayue
 * @Date: 2020-12-17 17:46:26
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-11 10:56:09
 */
import { adsCalculator } from "../calculator/AdsCalculator";
import { objects } from "../object/ObjectCollection";
import { ShopMenu } from "../object/ShopMenu";

const { ccclass, property } = cc._decorator;
/**
 * 商店关闭按钮
 */
@ccclass
export default class ShopCloseBtn extends cc.Component {
	onBtn() {
		let shopMenu: ShopMenu = objects.getShopMenu();
		shopMenu.node.active = false;
		adsCalculator.hidePageAd();
	}
}
