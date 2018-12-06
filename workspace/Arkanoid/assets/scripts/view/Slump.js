cc.Class({
    extends: cc.Component,

    properties: {
        gameCtl:undefined,
    },

    init(gameCtl,position) {
        this.gameCtl = gameCtl;
        this.node.position = position;//初始化位置
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,-300);//初始化速度
    },

    initGamCtl(gameCtl){
        this.gameCtl = gameCtl;
    },

    onBeginContact(contact, self, other) {
            switch (other.tag) {
                case 3://下坠物碰到托盘
                    this.gameCtl.createNewBall();
                    this.gameCtl.destroySlump(self.node);
                    break;
                case 2://下坠物碰到地面
                    this.gameCtl.destroySlump(self.node);
                    break;
                case 1://碰到砖块
                    break;
            }
    },
});
