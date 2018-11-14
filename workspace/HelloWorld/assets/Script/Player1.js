var PlayerActionTools = require("PlayerActionTools");
cc.Class({
    extends: cc.Component,
    properties: {

    },
    onLoad: function () {
        //存储节点所在位置
        this.pos = 0;

    },
    start () {
        // this.node.on('touchmove',this.onTouchMove,this);
        // this.node.on('touchend',this.onTouchEnd,this);
        // console.log(this.game)
        // console.log(this.game.zhongdian)
        //声明玩家移动事件
        PlayerActionTools.movePlayer(this,this.node);
    },

    update: function (dt) {
        //判断角色和终点的位置来增加得分
        // if(PlayerActionTools.getXDistance(this.game.zhongdian,this.node)<3&&-3<PlayerActionTools.getXDistance(this.game.zhongdian,this.node)
        //     && PlayerActionTools.getYDistance(this.game.zhongdian,this.node)<3&&-3<PlayerActionTools.getYDistance(this.game.zhongdian,this.node)){
        //     this.game.gainScore();
        // }
    },

    // rotate:function () {
    //
    //     //传的参数依次为：控制点1，控制点2，终点；（绝对坐标）
    //     var bezier1 = [cc.v2(0, 150), cc.v2(-300, 150), cc.v2(-300, 0)];
    //     var bezier2 = [cc.v2(0,-150 ), cc.v2(300, -150), cc.v2(300, 0)];
    //     var huxian1 = cc.bezierBy(1, bezier1);
    //     var huxian2 = cc.bezierBy(1, bezier2);
    //     var seq1 =cc.repeatForever(
    //         cc.sequence(
    //             cc.spawn(
    //                 huxian1,
    //                 cc.rotateBy(1, -180)
    //             ),
    //             cc.moveTo(1, -150, -150),
    //             cc.spawn(
    //                 huxian2,
    //                 cc.rotateBy(1, -180),
    //             ),
    //             cc.moveTo(1, 150, 150),
    //         ),
    //     );
    //     return seq1;
    // },


    // onTouchMove:function (e) {
    //     //节点跟随滑动
    //     let locationOfThisNodeParent = this.node.parent.convertToNodeSpaceAR(e.getLocation());
    //     this.node.position = locationOfThisNodeParent;
    //     // console.log('touchmove',e);
    // },
    //
    // onTouchEnd:function (e) {
    //     if(this.getCheweiDistance()< 30){
    //         e.target.runAction(this.rotate());
    //     }
    //     else {
    //         e.target.runAction(cc.moveTo(0.5,0,0));
    //     }
    // },
    // getCheweiDistance:function () {
    //     // 根据 player 节点位置判断距离
    //     var cheweiPos = this.game.chewei.getPosition();
    //     // 根据两点位置计算两点之间距离
    //     var dist = this.node.position.sub(cheweiPos).mag();
    //     console.log("ddddddddddddd"+dist)
    //     return dist;
    // },

    // getXDistance:function(node1,node2){
    //     var position1 = node1.convertToWorldSpaceAR(node1.getPosition());
    //     var position2 = node2.convertToWorldSpaceAR(node2.getPosition());
    //     return position2.x-position1.x;
    // },
    //
    // getYDistance:function(node1,node2){
    //     var position1 = node1.convertToWorldSpaceAR(node1.getPosition());
    //     var position2 = node2.convertToWorldSpaceAR(node2.getPosition());
    //     return position2.y-position1.y;
    // },
});
