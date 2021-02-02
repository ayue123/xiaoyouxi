/*
 * @Author: ayue
 * @Date: 2020-12-18 14:29:30
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-05 13:58:19
 */
import { dataCalculator } from "../calculator/DataCalculator";
import { moneyCalculator } from "../calculator/MoneyCalculator";
import { SNAIL_TAG } from "../config/CollideTagConfig";
import { SINGLE_MONEY_COUNT } from "../config/MoneyConfig";
import { MONEY_NUMBER_POSITION, MONEY_SHIFT } from "../config/PositionConfig";
import { MONEY_STAY_TIME } from "../config/TimeConfig";
import { OBJECT_ZINDEX } from "../config/ZIndexConfig";
import { AbstratObject } from "./AbstractObject";
import { Flower } from "./Flower";
import { objects } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
/**
 * 货币类
 */
@ccclass
export class Money extends AbstratObject {
	private count: number = 0;
	public getCount(): number {
		return this.count;
	}
	public createMoney(flower: Flower) {
		this.node = this.createObject("prefab/money");
		this.node.x += flower.node.x + MONEY_SHIFT[0];
		this.node.y += flower.node.y + MONEY_SHIFT[1];
		this.count = flower.getType() * SINGLE_MONEY_COUNT;
		this.node.zIndex = OBJECT_ZINDEX;
		objects.addMoney(this);
		this.scheduleOnce(function () {
			this.node.destroy();
			objects.deleteMoney(this);
		}, MONEY_STAY_TIME);
	}

	onBeginContact(contact, self, other) {
		if (other.tag == SNAIL_TAG) {
			var seq = cc.sequence(
				cc.moveTo(0, self.node.position.x, self.node.position.y),
				cc.moveTo(0.3, MONEY_NUMBER_POSITION[0], MONEY_NUMBER_POSITION[1])
			);
			self.node.runAction(seq);
			this.scheduleOnce(function () {
				self.node.active = false;
			}, 0.3);
			let moneys: Array<Money> = objects.getMoneys();
			for (let i = 0; i < moneys.length; i++) {
				if (self.node == moneys[i].node) {
					moneyCalculator.addMoney(moneys[i].getCount());
					break;
				}
			}
			dataCalculator.updateLastAddMoneyTime();
		}
	}
}
