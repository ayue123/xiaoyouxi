/*
 * @Author: ayue
 * @Date: 2020-12-18 14:22:13
 * @Last Modified by: ayue
 * @Last Modified time: 2020-12-25 19:09:41
 */
import { SNAIL_MOVE_SPEED } from "../config/TimeConfig";
import { Money } from "../object/Money";
import { objects } from "../object/ObjectCollection";
import { Snail } from "../object/Snail";

/**
 * 蜗牛处理类
 */
export class SnailTaskHandler {
	// 单例
	private static _inst: SnailTaskHandler;
	public static get inst() {
		return (
			SnailTaskHandler._inst ||
			(SnailTaskHandler._inst = new SnailTaskHandler())
		);
	}
	execute() {
		let snail: Snail = objects.getSnail();
		if (snail == null || snail.getIsMoving()) {
			return;
		}
		let moneys: Array<Money> = objects.getMoneys();
		let money: Money = null;
		for (let i = 0; i < moneys.length; i++) {
			let m: Money = moneys[i];
			if (m.node.active) {
				money = m;
				break;
			}
		}
		if (money == null) {
			return;
		}
		let distanceX = Math.abs(money.node.x - snail.node.x);
		let distanceY = Math.abs(money.node.y - snail.node.y);
		let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
		let time = distance / SNAIL_MOVE_SPEED;
		var seq = cc.moveTo(time, money.node.x, money.node.y);
		snail.node.runAction(seq);
		snail.updateIsMoveing(true);
		snail.scheduleOnce(function () {
			snail.updateIsMoveing(false);
		}, time);
	}
}
export var snailTaskHandler = SnailTaskHandler.inst;
