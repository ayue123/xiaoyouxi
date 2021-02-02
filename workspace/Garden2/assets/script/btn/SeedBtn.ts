/*
 * @Author: ayue
 * @Date: 2020-12-22 17:52:02
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-10 13:37:53
 */
import { dataCalculator } from "../calculator/DataCalculator";
import { flowerCalculator } from "../calculator/FlowerCalculator";
import { moneyCalculator } from "../calculator/MoneyCalculator";
import { sellCalculator } from "../calculator/SellCalculator";
import { tipCalculator } from "../calculator/TipCalculatot";
import { SEED_PRICE } from "../config/MoneyConfig";
import { UNLOCK_SNAIL_FLOWERS } from "../config/ShopConfig";
import {
	TIP_TYPE_GAIN_SNAIL,
	TIP_TYPE_GARDEN_FULL,
	TIP_TYPE_MONEY_SHORT,
	TIP_TYPE_NEED_UNLOCK_FLOWERPOT,
} from "../config/TipConfig";
import { Flower } from "../object/Flower";
import { Flowerpot } from "../object/Flowerpot";
import { Newbie } from "../object/Newbie";
import { objects } from "../object/ObjectCollection";
import { Snail } from "../object/Snail";
import { taskHandler } from "../task/TaskHandler";
import { FlowerData } from "../tool/FlowerData";

const { ccclass, property } = cc._decorator;
/**
 * 种子点击按钮
 */
@ccclass
export default class SeedBtn extends cc.Component {
	onBtn() {
		if (sellCalculator.isSellCloseShow()) {
			sellCalculator.hideCanSellFlower();
			sellCalculator.hideSellClose();
			return;
		}
		let flowerpots: Array<Flowerpot> = objects.getFlowerpots();
		let flowers: Array<Flower> = objects.getFlowers();
		//花园已满
		if (flowers.length >= flowerpots.length) {
			tipCalculator.updateLabel(TIP_TYPE_GARDEN_FULL);
			return;
		}
		let vacant: number = -1;
		for (let i = 0; i < flowerpots.length; i++) {
			if (!flowerpots[i].getIsLock() && !flowerpots[i].getIsFull()) {
				vacant = i;
				break;
			}
		}
		//无已解锁花盆
		if (vacant == -1) {
			tipCalculator.updateLabel(TIP_TYPE_NEED_UNLOCK_FLOWERPOT);
			return;
		}
		//金币不足
		if (moneyCalculator.getCount() < SEED_PRICE) {
			tipCalculator.updateLabel(TIP_TYPE_MONEY_SHORT);
			return;
		}
		moneyCalculator.reduceMoney(SEED_PRICE);
		let unlockSnail: boolean = dataCalculator.getIsSnailUnlock();
		if (!unlockSnail) {
			let unlockFolwers: Array<number> = objects.getUnlockFlowers();
			if (unlockFolwers.length >= UNLOCK_SNAIL_FLOWERS) {
				dataCalculator.unlockSnail();
				let snail: Snail = new Snail();
				snail.createSnail();
				tipCalculator.updateLabel(TIP_TYPE_GAIN_SNAIL);
				return;
			}
		}
		let flower: Flower = new Flower();
		flower.createFlower();
		let type: number = flowerCalculator.calcuatorFlowerType();
		flower.setType(type);
		let flowerpot: Flowerpot = flowerCalculator.calcuatorFlowerpot();
		flowerpot.addFlower(flower);
		flower.setVacant(flowerpot.getVacant());
		flowerCalculator.setTime(flower);
		if (objects.getNewbie() != null) {
			flower.setEndTime(taskHandler.getTime() + 3 * 1000);
		}
		flowerCalculator.setPlant(flower);

		let flowerData: FlowerData = new FlowerData();
		flowerData.type = flower.getType();
		flowerData.vacant = flower.getVacant();
		flowerData.startTime = flower.getStartTime();
		flowerData.endTime = flower.getEndTime();
		dataCalculator.addFlower(flowerData);

		if (objects.getNewbie() != null) {
			let newbie: Newbie = objects.getNewbie();
			let newbieNode: cc.Node = newbie.node;
			let maskNode: cc.Node = newbieNode.getChildByName("mask");
			let tipNode: cc.Node = newbieNode.getChildByName("tip");
			let fingleNode: cc.Node = newbieNode.getChildByName("finger");
			let labelNode: cc.Node = tipNode.getChildByName("label");
			let label: cc.Label = labelNode.getComponent(cc.Label);
			newbieNode.height = 300;
			newbieNode.width = 200;
			newbieNode.x = -375;
			newbieNode.y = 500;
			maskNode.x = 375;
			maskNode.y = -500;
			tipNode.x = 375;
			tipNode.y = -500;
			fingleNode.active = false;
			label.string = "耐心等待植物成熟";
		}
	}
}
