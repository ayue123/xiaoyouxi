(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/view/Ball.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9b280YbFuZJv4QPGPL8e8iv', 'Ball', __filename);
// scripts/view/Ball.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        gameCtl: undefined
    },

    init: function init(gameCtl, position) {
        this.gameCtl = gameCtl;
        this.node.position = position; //初始化位置
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(500, 500); //初始化速度
    },


    // newInit(gameCtl,position){
    //     this.gameCtl = gameCtl;
    //     this.node.position = cc.v2(360,270);//初始化位置
    //     this.getComponent(cc.RigidBody).linearVelocity = cc.v2(500,500);//初始化速度
    // },
    // initGamCtl(gameCtl){
    //     this.gameCtl = gameCtl;
    // },
    onBeginContact: function onBeginContact(contact, self, other) {
        switch (other.tag) {
            case 1:
                //球碰到砖块
                this.gameCtl.onBallContactBrick(self.node, other.node);
                break;
            case 2:
                //球碰到地面
                this.gameCtl.onBallContactGround(self.node, other.node);
                break;
            case 3:
                //球碰到托盘
                this.gameCtl.onBallContactPaddle(self.node, other.node);
                break;
            case 4:
                //球碰到墙
                this.gameCtl.onBallContactWall(self.node, other.node);
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
        //# sourceMappingURL=Ball.js.map
        