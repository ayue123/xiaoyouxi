/*
 * @Author: ayue
 * @Date: 2020-12-12 16:52:32
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-02 15:11:55
 */

import { flowerTaskHandler } from "./FlowerTaskHandler";
import { moneyCalculator } from "../calculator/MoneyCalculator";
import { snailTaskHandler } from "./SnailTaskHandler";
import { Flower } from "../object/Flower";
import { objects } from "../object/ObjectCollection";

/**
 * 时间处理类
 */
export class SecondTaskHandler {
	// 单例
	private static _inst: SecondTaskHandler;
	public static get inst() {
		if (SecondTaskHandler._inst == null) {
			SecondTaskHandler._inst = new SecondTaskHandler();
		}
		return SecondTaskHandler._inst;
	}

	execute() {
		this.executeFlower();
		this.executeSnail();
		this.executeMoney();
	}

	executeFlower() {
		let flowers: Array<Flower> = objects.getFlowers();
		for (let i = 0; i < flowers.length; i++) {
			let flowerpot = flowers[i];
			if (flowerpot == null || flowerpot.node == null) {
				continue;
			}
			if (flowerpot.getIsRipe()) {
				continue;
			}
			flowerTaskHandler.execute(flowerpot);
		}
	}
	executeSnail() {
		snailTaskHandler.execute();
	}

	executeMoney() {
		let flowers: Array<Flower> = objects.getFlowers();
		for (let i = 0; i < flowers.length; i++) {
			let flower = flowers[i];
			if (flower == null || flower.node == null) {
				continue;
			}
			moneyCalculator.createMoney(flower);
		}
	}
}
export var secondTaskHandler = SecondTaskHandler.inst;
