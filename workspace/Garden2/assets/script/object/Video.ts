/*
 * @Author: ayue
 * @Date: 2020-12-24 15:05:55
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-05 13:56:49
 */

import { OBJECT_ZINDEX } from "../config/ZIndexConfig";
import { AbstratObject } from "./AbstractObject";
import { objects } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
/**
 * 视频类
 */
@ccclass
export class Video extends AbstratObject {
	createVideo() {
		this.node = this.createObject("prefab/video");
		this.node.zIndex = OBJECT_ZINDEX;
		objects.addVideo(this);
	}
}
