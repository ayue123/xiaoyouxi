
cc.Class({
    extends: cc.Component,

    properties: {
        gameCtl:undefined,
    },
    init(gameCtl) {
        this.gameCtl = gameCtl;
        this.node.position = cc.v2(360,600);//初始化位置
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,-300);//初始化速度
    },
    onBeginContact(contact, self, other) {
        switch (other.tag) {
            case 3://托盘碰到下坠物
                console.log("ddddddddddddddddddddddddd")
                break;
        }
    },
});
