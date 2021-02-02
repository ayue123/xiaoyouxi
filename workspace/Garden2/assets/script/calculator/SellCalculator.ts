import { Flowerpot } from "../object/Flowerpot";
import { objects } from "../object/ObjectCollection";
import { Sell } from "../object/Sell";

/*
 * @Author: ayue
 * @Date: 2021-01-05 14:08:59
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-06 10:53:51
 */
export class SellCalculator {
	// 单例
	private static _inst: SellCalculator;
	public static get inst() {
		return (
			SellCalculator._inst || (SellCalculator._inst = new SellCalculator())
		);
	}
	public isSellCloseShow(): boolean {
		let sell: Sell = objects.getSell();
		let closeNode: cc.Node = sell.node.getChildByName("close");
		return closeNode.active;
	}
	public showSellClose() {
		let sell: Sell = objects.getSell();
		let closeNode: cc.Node = sell.node.getChildByName("close");
		closeNode.active = true;
	}
	public hideSellClose() {
		let sell: Sell = objects.getSell();
		let closeNode: cc.Node = sell.node.getChildByName("close");
		closeNode.active = false;
	}
	public showCanSellFlower(): number {
		let canSellNumber: number = 0;
		let flowerpots: Array<Flowerpot> = objects.getFlowerpots();
		for (let i = 0; i < flowerpots.length; i++) {
			let flowerpot: Flowerpot = flowerpots[i];
			if (flowerpot.getIsFull()) {
				flowerpot.node.color = cc.color(255, 120, 255);
				flowerpot.setIsSell(true);
				canSellNumber++;
			}
		}
		return canSellNumber;
	}
	public hideCanSellFlower() {
		let flowerpots: Array<Flowerpot> = objects.getFlowerpots();
		for (let i = 0; i < flowerpots.length; i++) {
			let flowerpot: Flowerpot = flowerpots[i];
			if (flowerpot.getIsSell()) {
				flowerpot.node.color = cc.color(255, 255, 255);
				flowerpot.setIsSell(false);
			}
		}
	}
}
export var sellCalculator = SellCalculator.inst;
