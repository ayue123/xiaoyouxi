import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

/*
 * @Author: ayue
 * @Date: 2020-10-13 14:48:06
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-20 18:16:41
 * 货币（含鱼干和星星）
 */
const { ccclass, property } = cc._decorator;

@ccclass
export class Currency extends AbstratObject {
    public createCurrency() {
        let node = this.createObject("prefab/currency");
        objectCollection.addCurrency(this);
    }

    public addFishCount(addCount: number) {
        //实现数字累加效果
        let a = parseInt(addCount / 5 + "");
        let b = addCount - a * 4;
        let count: Array<number> = [a, a, a, a, b];
        let i = 0;
        let currencyNode = objectCollection.getCurrency().node;
        let fishCountNode = currencyNode.getChildByName("fish_count");
        let fishCountLabel = fishCountNode.getComponent(cc.Label);
        this.schedule(
            function () {
                objectCollection.addFishCount(count[i]);
                fishCountLabel.string = objectCollection.getFishCount() + "";
                i++;
            },
            0.05,
            4,
            0
        );
    }

    public reduceFishCount(reduceCount: number) {
        objectCollection.reduceFishCount(reduceCount);
        let currencyNode = objectCollection.getCurrency().node;
        let fishCountNode = currencyNode.getChildByName("fish_count");
        let fishCountLabel = fishCountNode.getComponent(cc.Label);
        fishCountLabel.string = objectCollection.getFishCount() + "";
    }

    public addStarCount(addCount: number) {
        objectCollection.addStarCount(addCount);
        let currencyNode = objectCollection.getCurrency().node;
        let starCountNode = currencyNode.getChildByName("star_count");
        let starCountLabel = starCountNode.getComponent(cc.Label);
        starCountLabel.string = objectCollection.getStarCount().toFixed(1) + "";
    }
    public reduceStarCount(reduceCount: number) {
        objectCollection.reduceStarCount(reduceCount);
        let currencyNode = objectCollection.getCurrency().node;
        let starCountNode = currencyNode.getChildByName("star_count");
        let starCountLabel = starCountNode.getComponent(cc.Label);
        starCountLabel.string = objectCollection.getStarCount().toFixed(1) + "";
    }
}
