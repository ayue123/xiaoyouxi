/*
 * @Author: ayue
 * @Date: 2020-12-21 10:37:19
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-05 13:57:50
 */

import { OBJECT_ZINDEX } from "../config/ZIndexConfig";
import { AbstratObject } from "./AbstractObject";
import { objects } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
/**
 * 火炉类
 */
@ccclass
export class Stove extends AbstratObject {
	private type: number = 0;
	public getType(): number {
		return this.type;
	}
	public setType(type: number) {
		this.type = type;
	}
	public createStove() {
		this.node = this.createObject("prefab/stove");
		objects.addStove(this);
		this.node.zIndex = OBJECT_ZINDEX;
	}
}
