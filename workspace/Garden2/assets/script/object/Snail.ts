/*
 * @Author: ayue
 * @Date: 2020-12-17 18:19:33
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-06 11:05:19
 */

import { dataCalculator } from "../calculator/DataCalculator";
import { SNAIL_ZINDEX } from "../config/ZIndexConfig";
import { AbstratObject } from "./AbstractObject";
import { objects } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
/**
 * 蜗牛类
 */
@ccclass
export class Snail extends AbstratObject {
	private isMoving: boolean = false;
	public getIsMoving(): boolean {
		return this.isMoving;
	}
	public updateIsMoveing(isMoving: boolean) {
		this.isMoving = isMoving;
	}
	public createSnail() {
		if (dataCalculator.getIsSnailUnlock()) {
			this.node = this.createObject("prefab/snail");
			objects.addSnail(this);
			this.node.zIndex = SNAIL_ZINDEX;
		}
	}
}
