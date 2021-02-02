/*
 * @Author: ayue
 * @Date: 2020-12-12 16:50:57
 * @Last Modified by: ayue
 * @Last Modified time: 2020-12-29 11:33:47
 */

import { assetManager } from "../controller/Assetmanager";
import { objects } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export abstract class AbstratObject extends cc.Component {
	createObject(url: string, fatherNode?: cc.Node): cc.Node {
		let prefab = assetManager.get(url);
		let node: cc.Node = assetManager.generateNode(prefab);
		let upperNode: cc.Node = objects.getBackground().node;

		if (fatherNode != null) {
			upperNode = fatherNode;
		}
		node.parent = upperNode;
		this.node = node;
		return node;
	}
}
