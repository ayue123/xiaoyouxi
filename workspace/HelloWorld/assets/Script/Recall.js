var PlayerActionTools = require("PlayerActionTools");
cc.Class({
    extends: cc.Component,

    properties: {
    },


    onLoad () {
        //存储节点所在位置
        this.pos = 0;
    },

    start () {
        //声明按钮点击事件
        this.node.on('touchstart',this.onTouchStart,this);
    },

    update (dt) {

    },

    onTouchStart:function (e) {
        PlayerActionTools.recallPlayer(e.target.pos);
    },

});
