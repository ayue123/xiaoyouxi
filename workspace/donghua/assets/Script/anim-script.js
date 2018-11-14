cc.Class({
    extends: cc.Component,

    properties: {
        anim:cc.Animation,
    },

    onLoad: function () {
        // this.anim = this.getComponent(cc.Animation);
        this.anim.play('down');
    },

    update: function (dt) {

    },
});
