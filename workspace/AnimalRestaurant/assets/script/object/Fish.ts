import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

/*
 * @Author: ayue
 * @Date: 2020-10-13 15:50:48
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-26 19:05:57
 * 小鱼干
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class Fish extends AbstratObject {
    //数量
    private count: number = 5000000;

    public getCont() {
        return this.count;
    }

    public createFish(fatherNode: cc.Node) {
        let node = this.createObject("prefab/fish", fatherNode);
        objectCollection.addFish(this);
    }
}
