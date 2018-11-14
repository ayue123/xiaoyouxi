var Constant = require("Constant");
var PlayerActionTools = require("PlayerActionTools");
cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    start () {

    },

    update (dt) {},

    onCollisionEnter: function (other) {
        console.log("3333333333333333333")
        PlayerActionTools.gainScore()
        // this.node.color = cc.Color.RED;
        // this.touchingNumber ++;
    },

    onCollisionStay: function (other) {
        console.log("44444444444444444444444")
        // console.log('on collision stay');
    },

    onCollisionExit: function () {
        console.log("55555555555555555555555")
        // this.touchingNumber --;
        // if (this.touchingNumber === 0) {
        //     this.node.color = cc.Color.WHITE;
        // }
    }
});
