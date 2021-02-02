/*
 * @Author: ayue
 * @Date: 2020-12-24 11:09:41
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-05 14:33:57
 */
import { adsCalculator } from "../calculator/AdsCalculator";
import { objects } from "../object/ObjectCollection";
import { Tip } from "../object/Tip";

const { ccclass, property } = cc._decorator;
/**
 * 提示页面关闭按钮
 */
@ccclass
export default class TipCloseBtn extends cc.Component {
	onBtn() {
		let tip: Tip = objects.getTip();
		tip.node.active = false;
		adsCalculator.hidePageAd();
	}
}
