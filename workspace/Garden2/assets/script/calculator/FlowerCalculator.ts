/*
 * @Author: ayue
 * @Date: 2021-01-02 14:19:00
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-08 15:30:43
 */

import { FLOWER_PROPORTION, FLOWER_TEXTUREPATH } from "../config/FlowerConfig";
import { FLOWER_PRICE } from "../config/MoneyConfig";
import { FOLWERPOT_POSITION } from "../config/PositionConfig";
import { FLOWER_TIME } from "../config/TimeConfig";
import {
	TOOL_ADDITION_LAMP,
	TOOL_ADDITION_STOVE,
	TOOL_ADDITION_TAP,
} from "../config/ToolConfig";
import { Flower } from "../object/Flower";
import { Flowerpot } from "../object/Flowerpot";
import { Lamp } from "../object/Lamp";
import { objects } from "../object/ObjectCollection";
import { Stove } from "../object/Stove";
import { Tap } from "../object/Tap";
import { taskHandler } from "../task/TaskHandler";

export class FlowerCalculator {
	// 单例
	private static _inst: FlowerCalculator;
	public static get inst() {
		return (
			FlowerCalculator._inst ||
			(FlowerCalculator._inst = new FlowerCalculator())
		);
	}

	public setTime(flower: Flower) {
		let tap: Tap = objects.getTap();
		let stove: Stove = objects.getStove();
		let lamp: Lamp = objects.getLamp();
		let addition: number =
			100 /
			(100 +
				TOOL_ADDITION_TAP.get(tap.getType()) +
				TOOL_ADDITION_STOVE.get(stove.getType()) +
				TOOL_ADDITION_LAMP.get(lamp.getType()));
		let allTime = FLOWER_TIME.get(flower.getType()) * addition;
		let startTime = taskHandler.getTime();
		let endTime = startTime + allTime;
		flower.setStartTime(startTime);
		flower.setEndTime(endTime);
	}

	public setPlant(flower: Flower) {
		flower.node.position = cc.v2(
			FOLWERPOT_POSITION[flower.getVacant()][0],
			FOLWERPOT_POSITION[flower.getVacant()][1]
		);
		let plantNode = flower.node.getChildByName("plant");
		plantNode.scaleX = 0;
		plantNode.scaleY = 0;
		cc.loader.loadRes(
			FLOWER_TEXTUREPATH.get(flower.getType()),
			cc.SpriteFrame,
			function (err, spriteFrame) {
				plantNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
			}
		);
	}

	public calcuatorFlowerType(): number {
		let unlockFolwers: Array<number> = objects.getUnlockFlowers();
		let allProportion: number = 0;
		for (let i = 0; i < unlockFolwers.length; i++) {
			allProportion += FLOWER_PROPORTION.get(unlockFolwers[i]);
		}
		let randomProportion: number = Math.round(Math.random() * allProportion);
		let proportion = 0;
		for (let i = 0; i < unlockFolwers.length; i++) {
			proportion += FLOWER_PROPORTION.get(unlockFolwers[i]);
			if (proportion >= randomProportion) {
				return unlockFolwers[i];
			}
		}
	}
	public calcuatorFlowerpot(): Flowerpot {
		let flowerpots: Array<Flowerpot> = objects.getFlowerpots();
		let flowerpot: Flowerpot = null;
		for (let i = 0; i < flowerpots.length; i++) {
			if (!flowerpots[i].getIsLock() && !flowerpots[i].getIsFull()) {
				flowerpot = flowerpots[i];
				break;
			}
		}
		return flowerpot;
	}

	public getFlowerPrice(flower: Flower): number {
		let now: number = taskHandler.getTime();
		let startTime: number = flower.getStartTime();
		let endTime = flower.getEndTime();
		let remainTime = endTime - now < 0 ? 0 : endTime - now;
		let price: number = 2000 * flower.getType() * 1.5;
		let growRate: number = 1 - remainTime / (endTime - startTime);
		if (growRate < 0.25) {
			return Math.ceil(price * 0.5);
		} else if (0.25 <= growRate && growRate < 0.5) {
			return Math.ceil(price * 0.6);
		} else if (0.5 <= growRate && growRate < 0.75) {
			return Math.ceil(price * 0.7);
		} else if (0.75 <= growRate && growRate < 0.99) {
			return Math.ceil(price * 0.8);
		} else {
			return Math.ceil(price * 1);
		}
	}
}
export var flowerCalculator = FlowerCalculator.inst;
