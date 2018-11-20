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

    initGamCtl(gameCtl){
        this.gameCtl = gameCtl;
    },

    onBeginContact(contact, self, other) {
        if(this.node.pos == 1){
            switch (other.tag) {
                case 3://下坠物碰到托盘
                    this.gameCtl.createNewBall(this.node);
                    break;
                case 2://下坠物碰到地面
                    this.node.destroy();
                    break;
            }
        }
    },
});
