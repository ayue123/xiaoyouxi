var PlayerActionTools = require("PlayerActionTools");
var Constant = require("Constant");
var Variable = require("Variable");
cc.Class({
    extends: cc.Component,

    properties: {
        // score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        zhongdian:{
            default: null,
            type:cc.Node
        },
        Player1:{
            default: null,
            type: cc.Prefab
        },
        Player2:{
            default: null,
            type: cc.Prefab
        },
        Player3:{
            default: null,
            type: cc.Prefab
        },
        // 得分音效资源
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },
        chewei:{
            default: null,
            type:cc.Node
        },
        newPlayer:{
            default: null,
            type:cc.Node
        },
        Recall:{
            default: null,
            type: cc.Prefab
        },

    },


     onLoad () {
         // 初始化计分
         this.score = 0;
         //初始化对象
         Variable.scoreDisplay = this.scoreDisplay;
         Variable.scoreAudio = this.scoreAudio;
     },

    start () {
        //初始化一个角色
        PlayerActionTools.spawnNewPlayer(this,this.node,this.Player1);
        // PlayerActionTools.spawnNewPlayer(this,this.node,this.Player2);
        //在创建角色的节点中暂存Game对象的引用
        this.newPlayer.getComponent("CreateNewPlayer").game = this;
    },

    update (dt) {
        PlayerActionTools.createRecallProcessor(this,this.Recall);
    },


    //初始化位置
    // spawnNewPlayer1: function(node) {
    //     // 使用给定的模板在场景中生成一个新节点
    //     var player = cc.instantiate(node);
    //     // 将新增的节点添加到 Canvas 节点下面
    //     this.node.addChild(player);
    //     // 设置一个位置
    //     player.setPosition(0,0);
    //     // 在Player1组件上暂存 Game 对象的引用
    //     player.getComponent(node._name).game = this;
    // },
    // spawnNewPlayer2: function(node) {
    //     // 使用给定的模板在场景中生成一个新节点
    //     var player = cc.instantiate(node);
    //     // 将新增的节点添加到 Canvas 节点下面
    //     this.node.addChild(player);
    //     // 设置一个位置
    //     player.setPosition(-50,0);
    //     // 在Player1组件上暂存 G ame 对象的引用
    //     player.getComponent(node._name).game = this;
    // },
    // spawnNewPlayer3: function(node) {
    //     // 使用给定的模板在场景中生成一个新节点
    //     var player = cc.instantiate(node);
    //     // 将新增的节点添加到 Canvas 节点下面
    //     this.node.addChild(player);
    //     // 设置一个位置
    //     player.setPosition(-100,0);
    //     // 在Player1组件上暂存 Game 对象的引用
    //     player.getComponent(node._name).game = this;
    // },

});
