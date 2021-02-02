/*
 * @Author: ayue
 * @Date: 2020-12-24 16:02:34
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-05 14:19:48
 */

import { FOLWERPOT_POSITION } from "../config/PositionConfig";
import { OBJECT_ZINDEX } from "../config/ZIndexConfig";
import { AbstratObject } from "./AbstractObject";
import { Flower } from "./Flower";
import { objects } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
/**
 * 花盆类
 */
@ccclass
export class Flowerpot extends AbstratObject {
	private vacant: number = 0;
	private isLock: boolean = true;
	private flower: Flower = null;
	private isSell: boolean = false;
	public getVacant(): number {
		return this.vacant;
	}
	public getIsLock(): boolean {
		return this.isLock;
	}
	public unlock() {
		this.isLock = false;
		let lockNode: cc.Node = this.node.getChildByName("lock");
		lockNode.active = false;
	}
	public addFlower(flower: Flower) {
		this.flower = flower;
	}
	public getFlower(): Flower {
		return this.flower;
	}
	public getIsFull(): boolean {
		return this.flower == null ? false : true;
	}
	public getIsSell(): boolean {
		return this.isSell;
	}
	public setIsSell(isSell: boolean) {
		this.isSell = isSell;
	}
	createFlowerpot() {
		this.node = this.createObject("prefab/flowerpot");
		this.vacant = objects.getFlowerpots().length;
		this.node.position = cc.v2(
			FOLWERPOT_POSITION[this.vacant][0],
			FOLWERPOT_POSITION[this.vacant][1]
		);
		this.node.zIndex = OBJECT_ZINDEX;
		objects.addFlowerpot(this);
	}
}
