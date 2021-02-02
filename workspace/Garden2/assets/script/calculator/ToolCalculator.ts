import {
	TOOL_TEXTUREPATH_LAMP,
	TOOL_TEXTUREPATH_STOVE,
	TOOL_TEXTUREPATH_TAP,
} from "../config/ToolConfig";
import { Lamp } from "../object/Lamp";
import { objects } from "../object/ObjectCollection";
import { Stove } from "../object/Stove";
import { Tap } from "../object/Tap";

/*
 * @Author: ayue
 * @Date: 2021-01-02 15:25:43
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-02 15:30:43
 */
export class ToolCalculator {
	// 单例
	private static _inst: ToolCalculator;
	public static get inst() {
		return (
			ToolCalculator._inst || (ToolCalculator._inst = new ToolCalculator())
		);
	}
	public updateTap(type: number) {
		let tap: Tap = objects.getTap();
		tap.setType(type);
		cc.loader.loadRes(
			TOOL_TEXTUREPATH_TAP.get(type),
			cc.SpriteFrame,
			function (err, spriteFrame) {
				tap.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
			}
		);
	}
	public updateStove(type: number) {
		let stove: Stove = objects.getStove();
		stove.setType(type);
		cc.loader.loadRes(
			TOOL_TEXTUREPATH_STOVE.get(type),
			cc.SpriteFrame,
			function (err, spriteFrame) {
				stove.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
			}
		);
	}
	public updateLamp(type: number) {
		let lamp: Lamp = objects.getLamp();
		lamp.setType(type);
		cc.loader.loadRes(
			TOOL_TEXTUREPATH_LAMP.get(type),
			cc.SpriteFrame,
			function (err, spriteFrame) {
				lamp.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
			}
		);
	}
}
export var toolCalculator = ToolCalculator.inst;
