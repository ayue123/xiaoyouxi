/*
 * @Author: ayue
 * @Date: 2020-12-18 10:48:19
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-10 13:13:25
 */

import { HOUR, MINUTE, SECOND } from "../config/TimeConfig";
import { Flower } from "../object/Flower";
import { Newbie } from "../object/Newbie";
import { objects } from "../object/ObjectCollection";
import { taskHandler } from "./TaskHandler";

/**
 * 鲜花处理类
 */
export class FlowerTaskHandler {
	// 单例
	private static _inst: FlowerTaskHandler;
	public static get inst() {
		return (
			FlowerTaskHandler._inst ||
			(FlowerTaskHandler._inst = new FlowerTaskHandler())
		);
	}
	execute(flower: Flower) {
		let flowerNode: cc.Node = flower.node.getChildByName("plant");
		let frameNode: cc.Node = flower.node.getChildByName("time_frame");
		let bgNode: cc.Node = flower.node.getChildByName("time_bg");
		let labelNode: cc.Node = flower.node.getChildByName("time_label");
		let label: cc.Label = labelNode.getComponent(cc.Label);
		let bg: cc.Sprite = bgNode.getComponent(cc.Sprite);

		let now: number = taskHandler.getTime();
		let startTime: number = flower.getStartTime();
		let endTime = flower.getEndTime();
		let remainTime = endTime - now < 0 ? 0 : endTime - now;
		bg.fillRange = 1 - remainTime / (endTime - startTime);
		let hour = Math.ceil(remainTime / HOUR) - 1;
		let minute = Math.ceil((remainTime - hour * HOUR) / MINUTE) - 1;
		let second = Math.ceil((remainTime - minute * MINUTE) / SECOND);
		if (hour > 0) {
			label.string = hour + "时" + minute + "分";
		} else if (minute > 0) {
			label.string = minute + "分" + second + "秒";
		} else {
			label.string = second + "秒";
		}
		if (0.25 <= bg.fillRange && bg.fillRange < 0.5) {
			flowerNode.scaleX = 0.25;
			flowerNode.scaleY = 0.25;
			//TODO 成长动画
		} else if (0.5 <= bg.fillRange && bg.fillRange < 0.75) {
			flowerNode.scaleX = 0.5;
			flowerNode.scaleY = 0.5;
			//TODO 成长动画
		} else if (0.75 <= bg.fillRange && bg.fillRange < 0.999) {
			flowerNode.scaleX = 0.75;
			flowerNode.scaleY = 0.75;
			//TODO 成长动画
		} else if (0.999 < bg.fillRange) {
			frameNode.active = false;
			bgNode.active = false;
			labelNode.active = false;
			flowerNode.scaleX = 1;
			flowerNode.scaleY = 1;
			flower.updateRipe();
			//TODO 成长动画

			if (objects.getNewbie() != null) {
				let newbie: Newbie = objects.getNewbie();
				let newbieNode: cc.Node = newbie.node;
				let maskNode: cc.Node = newbieNode.getChildByName("mask");
				let tipNode: cc.Node = newbieNode.getChildByName("tip");
				let fingleNode: cc.Node = newbieNode.getChildByName("finger");
				let labelNode: cc.Node = tipNode.getChildByName("label");
				let label: cc.Label = labelNode.getComponent(cc.Label);
				newbieNode.x = -280;
				newbieNode.y = 865;
				newbieNode.height = 150;
				newbieNode.width = 150;
				fingleNode.active = true;
				maskNode.x = 280;
				maskNode.y = -865;
				tipNode.x = 280;
				tipNode.y = -865;
				label.string = "点击出售按钮";
			}
		}
	}
}
export var flowerTaskHandler = FlowerTaskHandler.inst;
