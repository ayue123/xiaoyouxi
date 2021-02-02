/*
 * @Author: ayue
 * @Date: 2021-01-04 17:03:08
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-10 14:09:23
 */

import { flowerCalculator } from "../calculator/FlowerCalculator";
import { sellCalculator } from "../calculator/SellCalculator";
import { tipCalculator } from "../calculator/TipCalculatot";
import { FLOWER_NAME } from "../config/FlowerConfig";
import { TIP_TYPE_SELL } from "../config/TipConfig";
import { Flower } from "../object/Flower";
import { Flowerpot } from "../object/Flowerpot";
import { Newbie } from "../object/Newbie";
import { objects } from "../object/ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export default class FlowerpotBtn extends cc.Component {
	onBtn() {
		let flowerpot: Flowerpot = null;
		let flowerpots: Array<Flowerpot> = objects.getFlowerpots();
		for (let i = 0; i < flowerpots.length; i++) {
			let f: Flowerpot = flowerpots[i];
			if (f.node == this.node) {
				flowerpot = f;
				break;
			}
		}
		if (flowerpot == null) {
			return;
		}
		if (!flowerpot.getIsSell()) {
			return;
		}
		if (!flowerpot.getIsFull()) {
			return;
		}
		if (flowerpot.getIsLock()) {
			return;
		}
		let flower: Flower = flowerpot.getFlower();
		let tipDes: string =
			"你确定要以" +
			flowerCalculator.getFlowerPrice(flower) +
			"的价格\n出售这株" +
			FLOWER_NAME.get(flower.getType()) +
			"?";
		if (flower.getIsRipe() == false) {
			tipDes += "\n将植物培养成熟可以得到更丰厚的回报哦";
		}
		tipCalculator.updateLabel(TIP_TYPE_SELL, flowerpot, tipDes);
		if (sellCalculator.isSellCloseShow()) {
			sellCalculator.hideCanSellFlower();
			sellCalculator.hideSellClose();
		}

		if (objects.getNewbie() != null) {
			let newbie: Newbie = objects.getNewbie();
			let newbieNode: cc.Node = newbie.node;
			let maskNode: cc.Node = newbieNode.getChildByName("mask");
			let tipNode: cc.Node = newbieNode.getChildByName("tip");
			let fingleNode: cc.Node = newbieNode.getChildByName("finger");
			let labelNode: cc.Node = tipNode.getChildByName("label");
			let label: cc.Label = labelNode.getComponent(cc.Label);
			newbieNode.x = 200;
			newbieNode.y = -327;
			newbieNode.height = 120;
			newbieNode.width = 320;
			fingleNode.active = true;
			maskNode.x = -200;
			maskNode.y = 327;
			tipNode.active = false;
			label.string = "点击确定出售按钮";
		}
	}
}
