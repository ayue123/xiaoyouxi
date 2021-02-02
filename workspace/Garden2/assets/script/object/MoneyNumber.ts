/*
 * @Author: ayue
 * @Date: 2020-12-17 17:53:35
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-05 13:58:13
 */
import { OBJECT_ZINDEX } from "../config/ZIndexConfig";
import { AbstratObject } from "./AbstractObject";
import { objects } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
/**
 * 货币数量类
 */
@ccclass
export class MoneyNumber extends AbstratObject {
	createMoneyNumber() {
		this.node = this.createObject("prefab/money_number");
		objects.addMoneyNumber(this);
		this.node.zIndex = OBJECT_ZINDEX;
	}
}
