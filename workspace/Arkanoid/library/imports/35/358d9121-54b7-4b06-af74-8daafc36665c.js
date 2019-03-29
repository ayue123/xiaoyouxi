"use strict";
cc._RF.push(module, '358d9EhVLdLBq90jar8NmZc', 'Slump');
// scripts/view/Slump.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        gameCtl: undefined
    },

    //初始化随机砖块
    init: function init(gameCtl, position) {
        this.gameCtl = gameCtl;
        this.node.position = position; //初始化位置
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -300); //初始化速度
        this.gameCtl.allSlump.push(this.node);
    },
    initGamCtl: function initGamCtl(gameCtl) {
        this.gameCtl = gameCtl;
    },

    //随机砖块撞击处理
    onBeginContact: function onBeginContact(contact, self, other) {
        switch (other.tag) {
            case 3:
                //下坠物碰到托盘
                if (this.node.type == 1) {
                    this.gameCtl.updatePaddleShort(false);
                } else if (this.node.type == 2) {
                    this.gameCtl.updateBrick(true);
                } else if (this.node.type == 3) {
                    this.gameCtl.createSkillBallFactory();
                } else if (this.node.type == 4) {
                    this.gameCtl.updatePaddleLong(true);
                } else {
                    this.gameCtl.createNewBall();
                }
                this.gameCtl.destroySlump(self.node);
                break;
            case 2:
                //下坠物碰到地面
                this.gameCtl.destroySlump(self.node);
                break;
            case 1:
                //碰到砖块
                break;
        }
    }
});

cc._RF.pop();