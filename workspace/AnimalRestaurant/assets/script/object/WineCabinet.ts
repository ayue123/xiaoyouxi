/*
 * @Author: ayue
 * @Date: 2020-10-16 16:29:15
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-21 16:32:23
 * 酒柜
 */
import { AbstratObject } from "./AbstratObject";
import { objectCollection } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;
@ccclass
export class WineCabinet extends AbstratObject {
    private level: number;
    public getLevel() {
        return this.level;
    }

    public createWineCabinet(level: number) {
        this.level = level;
        let node = this.createObject("prefab/wine_cabinet", objectCollection.getDiningRoomNode());
        let texturePath = "texture/wine_cabinet/wine_cabinet_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        objectCollection.addWineCabinet(this);
    }

    public updateWineCabinet(level: number) {
        this.level = level;
        let node = objectCollection.getWineCabinet().node;
        let texturePath = "texture/wine_cabinet/wine_cabinet_" + (level + 1);
        cc.loader.loadRes(texturePath, cc.SpriteFrame, function (err, spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    }
}
