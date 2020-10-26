import { assetManager } from "./controller/Assetmanager";
import { scheduleHandler } from "./controller/ScheduleHandler";
import { Currency } from "./object/Currency";
import { Menu } from "./object/Menu";
import { objectCollection } from "./object/ObjectCollection";
import { Test } from "./Test";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    onLoad() {
        let roomRootNode = this.node.getChildByName("RoomRoot");
        let kitchenNode = roomRootNode.getChildByName("kitchen");
        let diningRoomNode = roomRootNode.getChildByName("dining_room");
        objectCollection.addKitchenNode(kitchenNode);
        objectCollection.addDiningRoomNode(diningRoomNode);

        //资源初始化加载
        assetManager.loadDir(this.postLoadDir);
        //开启物理引擎
        cc.director.getPhysicsManager().enabled = true;
    }

    start() {
        //定时器
        this.schedule(function () {
            scheduleHandler.guestMoveHandler();
        }, 1);
        //定时器
        this.schedule(function () {
            scheduleHandler.createGuest();
        }, 5);
    }
    //资源加载结束调用
    postLoadDir() {
        var test: Test = new Test();
        test.mainTest();

        let currency: Currency = new Currency();
        currency.createCurrency();

        let menu: Menu = new Menu();
        menu.createMenu();
    }
}
