/*
 * @Author: ayue
 * @Date: 2020-12-17 16:08:56
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-08 15:51:53
 */
import { dataCalculator } from "../calculator/DataCalculator";
import { SINGLE_NUTRIENT_TIME } from "../config/TimeConfig";
import { OBJECT_ZINDEX } from "../config/ZIndexConfig";
import { taskHandler } from "../task/TaskHandler";
import { AbstratObject } from "./AbstractObject";
import { Flower } from "./Flower";
import { objects } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
/**
 * 营养激素类
 */
@ccclass
export class Nutrient extends AbstratObject {
	createNutrient() {
		this.node = this.createObject("prefab/nutrient");
		this.node.zIndex = OBJECT_ZINDEX;
		objects.addNutrient(this);
	}
	public reduceFlowerTime() {
		let flowers: Array<Flower> = objects.getFlowers();
		for (let i = 0; i < flowers.length; i++) {
			let flowerpot: Flower = flowers[i];
			if (flowerpot == null || flowerpot.node == null) {
				continue;
			}
			if (flowerpot.getIsRipe()) {
				continue;
			}
			flowerpot.setEndTime(taskHandler.getTime());
		}
		dataCalculator.reduceFlowerTime();
	}
}
