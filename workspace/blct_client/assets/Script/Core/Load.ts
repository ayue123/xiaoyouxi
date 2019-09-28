// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import { CNet } from "./Net/Network";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Load extends cc.Component {

   

    // onLoad () {}

    start () {

        CNet.connect("192.168.1.48",8080);

        var self = this;
        cc.loader.loadRes("prefabs/init",cc.Prefab,function (err, prefab:any) {
            var newNode = cc.instantiate(prefab);
            cc.director.getScene().addChild(newNode);
        });
    }

    // update (dt) {}
}
