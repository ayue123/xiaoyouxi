
cc.Class({
    extends: cc.Component,

    properties: {
        node5: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //拿到当前组件所依附的节点
        this.node;
        console.log(this.node);
        //拿到当前组件
        this;
        console.log(this);
        //如何取得其他节点
        //取得节点的父节点
        this.node.parent;//节点-场景1
        //取得节点的字节点数组
        this.node.children;//子节点数组
        //通过节点名字取得子节点
        this.node.getChildByName('node-3');//子节点

    },

    start () {

    },

    // update (dt) {},
});
