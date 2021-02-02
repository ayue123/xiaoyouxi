/*
 * @Author: ayue
 * @Date: 2020-12-22 17:53:32
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-05 13:55:44
 */

import { OBJECT_ZINDEX } from "../config/ZIndexConfig";
import { AbstratObject } from "./AbstractObject";

const { ccclass, property } = cc._decorator;
/**
 * 种子类
 */
@ccclass
export class Seed extends AbstratObject {
	createSeed() {
		this.node = this.createObject("prefab/seed");
		this.node.zIndex = OBJECT_ZINDEX;
	}
}
