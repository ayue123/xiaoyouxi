/*
 * @Author: ayue
 * @Date: 2020-12-17 19:20:46
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-05 13:55:15
 */
import { OBJECT_ZINDEX } from "../config/ZIndexConfig";
import { AbstratObject } from "./AbstractObject";
import { objects } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
/**
 * 鲜花类
 */
@ccclass
export class Flower extends AbstratObject {
	private isRipe: boolean = false;
	private startTime: number = 0;
	private endTime: number = 0;
	private type: number = 0;
	private vacant: number = 0;
	public getStartTime(): number {
		return this.startTime;
	}
	public setStartTime(startTime: number) {
		this.startTime = startTime;
	}
	public getType(): number {
		return this.type;
	}
	public setType(type: number) {
		this.type = type;
	}
	public getIsRipe(): boolean {
		return this.isRipe;
	}
	public updateRipe() {
		this.isRipe = true;
	}
	public getEndTime(): number {
		return this.endTime;
	}
	public setEndTime(endTime: number) {
		this.endTime = endTime;
	}
	public getVacant(): number {
		return this.vacant;
	}
	public setVacant(vacant: number) {
		this.vacant = vacant;
	}

	createFlower() {
		this.node = this.createObject("prefab/flower");
		this.node.zIndex = OBJECT_ZINDEX;
		objects.addFlower(this);
	}
}
