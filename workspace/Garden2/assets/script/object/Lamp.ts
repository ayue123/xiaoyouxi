/*
 * @Author: ayue
 * @Date: 2020-12-21 10:40:49
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-02 10:36:13
 */
import { OBJECT_ZINDEX } from "../config/ZIndexConfig";
import { AbstratObject } from "./AbstractObject";
import { objects } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
/**
 * 灯类
 */
@ccclass
export class Lamp extends AbstratObject {
	private type: number = 0;
	public getType(): number {
		return this.type;
	}
	public setType(type: number) {
		this.type = type;
	}
	public creatLamp() {
		this.node = this.createObject("prefab/lamp");
		objects.addLamp(this);
		this.node.zIndex = OBJECT_ZINDEX;
	}
}
