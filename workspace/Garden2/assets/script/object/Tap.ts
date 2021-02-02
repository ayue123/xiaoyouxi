/*
 * @Author: ayue
 * @Date: 2020-12-21 10:40:06
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-05 13:57:46
 */
import { OBJECT_ZINDEX } from "../config/ZIndexConfig";
import { AbstratObject } from "./AbstractObject";
import { objects } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
/**
 * 水龙头类
 */
@ccclass
export class Tap extends AbstratObject {
	private type: number = 0;
	public getType(): number {
		return this.type;
	}
	public setType(type: number) {
		this.type = type;
	}
	public createTap() {
		this.node = this.createObject("prefab/tap");
		objects.addTap(this);
		this.node.zIndex = OBJECT_ZINDEX;
	}
}
