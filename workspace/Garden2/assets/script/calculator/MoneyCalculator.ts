/*
 * @Author: ayue
 * @Date: 2020-12-18 14:44:41
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-01 17:31:39
 */

import { MONEY_GENE_TIME } from "../config/TimeConfig";
import { Flower } from "../object/Flower";
import { Money } from "../object/Money";
import { MoneyNumber } from "../object/MoneyNumber";
import { objects } from "../object/ObjectCollection";
import { taskHandler } from "../task/TaskHandler";
import { dataCalculator } from "./DataCalculator";

/**
 *
 */
export class MoneyCalculator {
	// 单例
	private static _inst: MoneyCalculator;
	public static get inst() {
		return (
			MoneyCalculator._inst || (MoneyCalculator._inst = new MoneyCalculator())
		);
	}
	createMoney(flower: Flower) {
		let now = taskHandler.getTime();
		let startTime: number = flower.getStartTime();
		let seconds = Math.ceil((now - startTime) / 1000);
		if (seconds % MONEY_GENE_TIME == 0) {
			let money: Money = new Money();
			money.createMoney(flower);
		}
	}

	public getCount(): number {
		return dataCalculator.getMoneyCount();
	}

	public addMoney(addCount: number) {
		let count: number = this.getCount();
		dataCalculator.addMoneyCount(addCount);
		//实现数字累加效果
		let a = Math.ceil(addCount / 5);
		let b = addCount - a * 4;
		let addCounts: Array<number> = [a, a, a, a, b];
		let i = 0;
		let moneyNumber: MoneyNumber = objects.getMoneyNumber();
		moneyNumber.schedule(
			function () {
				count += addCounts[i];
				let labelNode = moneyNumber.node.getChildByName("label");
				let label: cc.Label = labelNode.getComponent(cc.Label);
				if (count >= 1000000) {
					label.string = "" + Math.ceil(count / 1000000) + "M";
				} else if (count >= 10000) {
					label.string = "" + Math.ceil(count / 1000) + "K";
				} else {
					label.string = "" + count;
				}
				i++;
			},
			0.05,
			4,
			0
		);
	}
	public reduceMoney(reduceCount: number) {
		let count: number = this.getCount();
		dataCalculator.reduceMoneyCount(reduceCount);
		let moneyNumber: MoneyNumber = objects.getMoneyNumber();
		let labelNode = moneyNumber.node.getChildByName("label");
		let label: cc.Label = labelNode.getComponent(cc.Label);
		count -= reduceCount;
		if (count >= 1000000) {
			label.string = "" + Math.ceil(count / 1000000) + "M";
		} else if (count >= 10000) {
			label.string = "" + Math.ceil(count / 1000) + "K";
		} else {
			label.string = "" + count;
		}
	}
}
export var moneyCalculator = MoneyCalculator.inst;
