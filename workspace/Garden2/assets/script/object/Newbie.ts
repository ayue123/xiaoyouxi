/*
 * @Author: ayue
 * @Date: 2021-01-08 16:58:53
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-10 13:22:22
 */

import { NEWBIE_ZINDEX } from "../config/ZIndexConfig";
import { AbstratObject } from "./AbstractObject";
import { objects } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
/**
 * 灯类
 */
@ccclass
export class Newbie extends AbstratObject {
	public creatNewbie() {
		this.node = this.createObject("prefab/newbie");
		objects.addNewbie(this);
		this.node.zIndex = NEWBIE_ZINDEX;

		let maskNode: cc.Node = this.node.getChildByName("mask");
		let tipNode: cc.Node = this.node.getChildByName("tip");
		let fingleNode: cc.Node = this.node.getChildByName("finger");
		let labelNode: cc.Node = tipNode.getChildByName("label");
		let label: cc.Label = labelNode.getComponent(cc.Label);
		this.node.x = -138;
		this.node.y = 865;
		maskNode.x = 138;
		maskNode.y = -865;
		tipNode.x = 138;
		tipNode.y = -865;
		label.string = "点击种子盲盒\n种下一株植物";

		var seq = cc.repeatForever(
			cc.sequence(
				cc.moveTo(0.8, fingleNode.x + 80, fingleNode.y - 80),
				cc.moveTo(0.8, fingleNode.x, fingleNode.y)
			)
		);
		fingleNode.runAction(seq);
	}
}
