(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/view/Ball.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9b280YbFuZJv4QPGPL8e8iv', 'Ball', __filename);
// scripts/view/Ball.js

"use strict";

/*
 * @Author: ayue 
 * @Date: 2019-03-30 20:18:59 
 * @Last Modified by: ayue
 * @Last Modified time: 2019-05-22 10:44:13
 */
cc.Class({
    extends: cc.Component,

    properties: {
        gameCtl: undefined
    },

    init: function init(gameCtl, position) {
        this.gameCtl = gameCtl;
        this.node.position = position; //初始化位置
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(500, 500); //初始化速度
        this.gameCtl.allBall.push(this.node);
    },


    // newInit(gameCtl,position){
    //     this.gameCtl = gameCtl;
    //     this.node.position = cc.v2(360,270);//初始化位置
    //     this.getComponent(cc.RigidBody).linearVelocity = cc.v2(500,500);//初始化速度
    // },
    // initGamCtl(gameCtl){
    //     this.gameCtl = gameCtl;
    // },
    initSkillBall: function initSkillBall(gameCtl, position, about) {
        this.gameCtl = gameCtl;
        if (about === "left") {
            this.node.x = position.x - 40; //初始化位置
        } else {
            this.node.x = position.x + 40; //初始化位置
        }
        this.node.y = position.y;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1000); //初始化速度
        this.gameCtl.allSkillBall.push(this.node);
    },
    onBeginContact: function onBeginContact(contact, self, other) {
        switch (other.tag) {
            case 1:
                //球碰到砖块
                this.gameCtl.onBallContactBrick(self.node, other.node);
                if (self.node.isSkill == 1) {
                    this.gameCtl.destroySkillBall(self.node);
                }
                break;
            case 2:
                //球碰到地面
                this.gameCtl.onBallContactGround(self.node, other.node);
                break;
            case 3:
                //球碰到托盘
                this.gameCtl.onBallContactPaddle(self.node, other.node);
                if (this.getComponent(cc.RigidBody).linearVelocity.x < 100 && this.getComponent(cc.RigidBody).linearVelocity.x > 0) {
                    this.getComponent(cc.RigidBody).linearVelocity = cc.v2(150, this.getComponent(cc.RigidBody).linearVelocity.y);
                } else if (this.getComponent(cc.RigidBody).linearVelocity.x > -100 && this.getComponent(cc.RigidBody).linearVelocity.x < 0) {
                    this.getComponent(cc.RigidBody).linearVelocity = cc.v2(-150, this.getComponent(cc.RigidBody).linearVelocity.y);
                }
                break;
            case 4:
                //球碰到墙
                this.gameCtl.onBallContactWall(self.node, other.node);
                if (self.node.isSkill == 1) {
                    this.gameCtl.destroySkillBall(self.node);
                }
                if (this.getComponent(cc.RigidBody).linearVelocity.y < 150 && this.getComponent(cc.RigidBody).linearVelocity.y > 0) {
                    this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.getComponent(cc.RigidBody).linearVelocity.x, 250);
                } else if (this.getComponent(cc.RigidBody).linearVelocity.y > -150 && this.getComponent(cc.RigidBody).linearVelocity.y < 0) {
                    this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.getComponent(cc.RigidBody).linearVelocity.x, -250);
                }
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
        