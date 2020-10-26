import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

/*
 * @Author: ayue
 * @Date: 2020-10-13 14:55:15
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 15:58:30
 * 主界面
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class ScreenRoot extends AbstratObject {
    onLoad() {
        objectCollection.addScreenRoot(this);
    }
}
