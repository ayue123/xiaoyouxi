/*
 * @Author: ayue
 * @Date: 2020-12-17 17:48:06
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-05 13:57:24
 */
import { POP_ZINDEX } from "../config/ZIndexConfig";
import { AbstratObject } from "./AbstractObject";
import { objects } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
/**
 * 提示类
 */
@ccclass
export class Tip extends AbstratObject {
	private type: number = 0;
	private parameter: any = null;
	public getType(): number {
		return this.type;
	}
	public setType(type: number) {
		this.type = type;
	}
	public getParameter(): any {
		return this.parameter;
	}
	public setParameter(parameter: any) {
		this.parameter = parameter;
	}
	createTip() {
		this.node = this.createObject("prefab/tip");
		objects.addTip(this);
		this.node.zIndex = POP_ZINDEX;
		this.node.active = false;
	}
}
