/*
 * @Author: ayue
 * @Date: 2020-12-17 17:46:26
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-28 15:04:30
 */
import { adsCalculator } from "../calculator/AdsCalculator";
import { objects } from "../object/ObjectCollection";
import { Tip } from "../object/Tip";

const { ccclass, property } = cc._decorator;
/**
 * 提示页面否定按钮
 */
@ccclass
export default class TipNoBtn extends cc.Component {
	onBtn() {
		let tip: Tip = objects.getTip();
		tip.node.active = false;
		adsCalculator.hidePageAd();
	}
}
