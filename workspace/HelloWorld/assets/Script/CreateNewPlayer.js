var PlayerActionTools = require("PlayerActionTools");
var Constant = require("Constant");
var Variable = require("Variable");
cc.Class({
    extends: cc.Component,

    properties: {
    },


    onLoad () {},

    start () {
        //声明按钮点击事件
        this.node.on('touchstart',this.onTouchStart,this);
    },

    onTouchStart:function (e) {
        // console.log(Variable.getIdlePosition())
        //如果有空位则创建新角色
        if(Variable.getIdlePosition()>=0){
            PlayerActionTools.spawnNewPlayer(this.game,this.game.node,this.game.Player1);
        }
    },

    update (dt) {
        //如果合并后的角色名不为空则创建合并后的角色节点
        if(Variable.mergeName!=undefined){
            if(Variable.mergeName=="Player2"){
                PlayerActionTools.spawnNewPlayer(this.game,this.game.node,this.game.Player2);
                Variable.mergeName = undefined;
            }else  if(Variable.mergeName=="Player3"){
                PlayerActionTools.spawnNewPlayer(this.game,this.game.node,this.game.Player3);
                Variable.mergeName = undefined;
            }
        }
    },


});
