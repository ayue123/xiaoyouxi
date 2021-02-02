/*
 * @Author: ayue
 * @Date: 2020-12-17 17:48:06
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-05 13:56:39
 */
import { OBJECT_ZINDEX } from "../config/ZIndexConfig";
import { AbstratObject } from "./AbstractObject";
import { objects } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
/**
 * 商店类
 */
@ccclass
export class Shop extends AbstratObject {
	createShop() {
		this.node = this.createObject("prefab/shop");
		objects.addShop(this);
		this.node.zIndex = OBJECT_ZINDEX;
	}
}
