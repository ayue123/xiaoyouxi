(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/view/Slump.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '358d9EhVLdLBq90jar8NmZc', 'Slump', __filename);
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
    },
    initGamCtl: function initGamCtl(gameCtl) {
        this.gameCtl = gameCtl;
    },

    //随机砖块撞击处理
    onBeginContact: function onBeginContact(contact, self, other) {
        switch (other.tag) {
            case 3:
                //下坠物碰到托盘
                this.gameCtl.createNewBall();
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Slump.js.map
        