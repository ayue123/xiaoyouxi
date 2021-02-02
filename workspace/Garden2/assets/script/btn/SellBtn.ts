/*
 * @Author: ayue
 * @Date: 2021-01-04 16:37:20
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-10 13:28:21
 */

import { sellCalculator } from "../calculator/SellCalculator";
import { tipCalculator } from "../calculator/TipCalculatot";
import { TIP_TYPE_NO_CAN_SELL } from "../config/TipConfig";
import { Newbie } from "../object/Newbie";
import { objects } from "../object/ObjectCollection";

const { ccclass, property } = cc._decorator;
/**
 * 售出按钮
 */
@ccclass
export default class SellBtn extends cc.Component {
	onBtn() {
		let canSellNumber: number = sellCalculator.showCanSellFlower();
		if (canSellNumber <= 0) {
			tipCalculator.updateLabel(TIP_TYPE_NO_CAN_SELL);
		} else {
			sellCalculator.showSellClose();
			if (objects.getNewbie() != null) {
				let newbie: Newbie = objects.getNewbie();
				let newbieNode: cc.Node = newbie.node;
				let maskNode: cc.Node = newbieNode.getChildByName("mask");
				let tipNode: cc.Node = newbieNode.getChildByName("tip");
				let fingleNode: cc.Node = newbieNode.getChildByName("finger");
				let labelNode: cc.Node = tipNode.getChildByName("label");
				let label: cc.Label = labelNode.getComponent(cc.Label);
				newbieNode.x = -375;
				newbieNode.y = 500;
				newbieNode.height = 300;
				newbieNode.width = 200;
				fingleNode.active = true;
				maskNode.x = 375;
				maskNode.y = -500;
				tipNode.x = 375;
				tipNode.y = -500;
				label.string = "点击你要出售的植物";
			}
		}
	}
}
