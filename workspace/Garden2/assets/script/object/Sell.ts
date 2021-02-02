/*
 * @Author: ayue
 * @Date: 2020-12-17 15:46:47
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-05 14:28:10
 */
import {
	BACKGROUND_ZINDEX,
	OBJECT_ZINDEX,
	POP_ZINDEX,
} from "../config/ZIndexConfig";
import { AbstratObject } from "./AbstractObject";
import { objects } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
/**
 * 出售类
 */
@ccclass
export class Sell extends AbstratObject {
	createSell() {
		this.node = this.createObject("prefab/sell");
		objects.addSell(this);
		this.node.zIndex = OBJECT_ZINDEX;
		let closeNode: cc.Node = this.node.getChildByName("close");
		closeNode.active = false;
	}
}
