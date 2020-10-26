/*
 * @Author: ayue
 * @Date: 2020-10-20 18:05:26
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 19:28:29
 * 星星
 */

import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export class Star extends AbstratObject {
    //数量
    private count: number = 500000;

    public getCont() {
        return this.count;
    }

    public createStar() {
        let node = this.createObject("prefab/star");
        objectCollection.addStar(this);
    }
}
