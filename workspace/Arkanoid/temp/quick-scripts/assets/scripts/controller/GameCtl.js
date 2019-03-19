(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/controller/GameCtl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a337308uxxJva7vh8G06q7Z', 'GameCtl', __filename);
// scripts/controller/GameCtl.js

'use strict';

var GameModel = require('GameModel');
var Ball = require("Ball");
var Slump = require('Slump');
cc.Class({
    extends: cc.Component,

    properties: {
        gameView: require('GameView'),
        paddle: require('Paddle'),
        brickLayout: require('BrickLayout'),
        overPanel: require('OverPanel'),
        ballPrefab: cc.Prefab,
        slumpPrefab: cc.Prefab,
        // 得分音效资源
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },
        // 跳跃音效资源
        collisionAudio: {
            default: null,
            type: cc.AudioClip
        },
        startBackGround: cc.Node,
        wxSubContextView: cc.Node,
        wxBackGround: cc.Node
    },

    onLoad: function onLoad() {
        this.physicsManager = cc.director.getPhysicsManager();
        this.gameModel = new GameModel();
        this.init();
        this.overPanel.updateGameModel(this.gameModel);
        this.reBeginGame();
        this.wxSubContextView.active = false;
        this.wxBackGround.active = false;
    },

    startGame: function startGame() {
        this.init();
        this.reBeginGame();
    },

    //部分属性初始化（游戏初始化时调用）
    init: function init() {
        this.physicsManager.enabled = true;
        this.gameModel.init();
        this.gameModel.initScore();
        this.gameModel.initLevel();
        this.gameModel.initLife();
        this.gameModel.initLevelPosition();
        this.gameView.init(this);
        this.gameView.initLife(this.gameModel.life);
        this.gameView.initScore();
        this.paddle.init();
        this.brickLayout.init(this.gameModel.bricksNumber, this.gameModel.levelOnePosition);
        this.overPanel.init(this);
    },

    //部分属性重新初始化（在玩家仍然有机会时初始化调用）
    reInit: function reInit() {
        this.physicsManager.enabled = true;
        this.gameView.init(this);
        this.gameView.init(this);
        this.gameView.initLife(this.gameModel.life);
        this.createNewBall();
        this.paddle.init();
        this.overPanel.init(this);
    },
    reInitLevelPosition: function reInitLevelPosition(levelPosition) {
        this.brickLayout.init(this.gameModel.bricksNumber, levelPosition);
    },
    reStartGame: function reStartGame(levelPosition) {
        this.destroyAllBall();
        this.reInit(levelPosition);
        this.startBackGround.active = false;
    },
    pauseGame: function pauseGame() {
        this.physicsManager.enabled = false;
    },
    resumeGame: function resumeGame() {
        this.physicsManager.enabled = true;
    },

    //结束游戏
    stopGame: function stopGame() {
        this.physicsManager.enabled = false;
        this.overPanel.show(this.gameModel.score, this.gameModel.surviveBricksNumber === 0);
        this.startBackGround.active = true;
        this.setUserScorePassage(this.gameModel.score);
    },

    //重新开始游戏（在玩家还有机会时调用）
    reBeginGame: function reBeginGame() {
        this.physicsManager.enabled = false;
        this.overPanel.showReBegin(this.gameModel.score, this.gameModel.life);
        this.startBackGround.active = true;
        this.setUserScorePassage(this.gameModel.score);
    },

    //小球撞击砖块处理
    onBallContactBrick: function onBallContactBrick(ballNode, brickNode) {

        //处理因为并发问题引起的砖块未打干净而结束计数的bug
        if (brickNode.parent == null) {
            return;
        }
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
        brickNode.parent = null;
        brickNode.destroy();
        this.gameModel.addScore(1);
        // this.gameModel.minusBrick(1);
        this.gameModel.minusSurviveBrick(1);
        this.gameView.updateScore(this.gameModel.score);
        //本关结束
        if (this.gameModel.surviveBricksNumber <= 0) {
            this.gameModel.addLevel();
            this.overPanel.updateGameModel(this.gameModel);
            this.destroyBall(ballNode);
            this.reBeginGame();
            this.destroyAllBall();
        }
        var dropBricks = this.gameModel.dropBricks;
        for (var i = 0; i < dropBricks.length; i++) {
            if (brickNode.pos == dropBricks[i]) {
                this.createSlump(brickNode.position);
                break;
            }
        }
    },


    //小球撞击地板处理
    onBallContactGround: function onBallContactGround(ballNode, groundNode) {
        if (this.gameModel.ballCount <= 1) {
            if (this.gameModel.life > 1 && this.gameModel.surviveBricksNumber > 0) {
                this.gameModel.reduceLife();
                this.gameView.updateLife(this.gameModel.life);
                this.overPanel.updateGameModel(this.gameModel);
                this.reBeginGame();
            } else {
                this.gameModel.reduceLife();
                this.gameView.updateLife(this.gameModel.life);
                this.overPanel.updateGameModel(this.gameModel);
                this.stopGame();
            }
            this.destroyBall(ballNode);
        } else {
            this.destroyBall(ballNode);
        }
    },

    //小球撞击托盘播放音效
    onBallContactPaddle: function onBallContactPaddle(ballNode, paddleNode) {
        // 播放碰撞音效
        cc.audioEngine.playEffect(this.collisionAudio, false);
    },

    //小球撞击墙壁播放音效
    onBallContactWall: function onBallContactWall(ballNode, brickNode) {
        // 播放碰撞音效
        cc.audioEngine.playEffect(this.collisionAudio, false);
    },

    //创建新的小球
    createNewBall: function createNewBall() {
        //小球复制代码
        var ballNode = cc.instantiate(this.ballPrefab);
        ballNode.parent = this.paddle.node.parent;
        var Ball = ballNode.getComponent('Ball');
        Ball.init(this, this.paddle.node.position);
        this.gameModel.addBallCount();
    },

    //创建掉落砖块
    createSlump: function createSlump(position) {
        var slumpNode = cc.instantiate(this.slumpPrefab);
        slumpNode.parent = this.brickLayout.node;
        var Slump = slumpNode.getComponent('Slump');
        Slump.init(this, position);
    },

    //销毁掉落砖块
    destroySlump: function destroySlump(slumpNode) {
        slumpNode.destroy();
    },


    //销毁单个小球（小球撞击地板时调用）
    destroyBall: function destroyBall(ballNode) {
        ballNode.parent = null;
        ballNode.destroy();
        this.gameModel.reduceBallCount();
    },

    //销毁全部小球（游戏结束时调用）
    destroyAllBall: function destroyAllBall() {
        var ballParentChildren = this.paddle.node.parent._children;
        for (var i = 0; i < ballParentChildren.length; i++) {
            var node = ballParentChildren[i];
            if (node._name == "ball") {
                this.destroyBall(node);
            }
        }
    },


    //排行榜按钮
    onBtnRank: function onBtnRank() {
        this.initUserInfo();
    },

    //初始化玩家排行榜
    initUserInfo: function initUserInfo(nickName, avatarUrl) {
        //权限按钮
        // if(this.nickName.string == "nickName"){
        //     let systemInfo = wx.getSystemInfoSync();
        //     let width = systemInfo.windowWidth;
        //     let height = systemInfo.windowHeight;
        // const button = wx.createUserInfoButton({
        //     type: 'text',
        //     text: '',
        //     style: {
        //         left: 0,
        //         top: 0,
        //         width: width,
        //         height: height,
        //         lineHeight: 40,
        //         backgroundColor: '#00000000',
        //         color: '#00000000',
        //         textAlign: 'center',
        //         fontSize: 10,
        //         borderRadius: 4
        //     }
        // })
        //
        // button.onTap((res) => {
        //     let userInfo = res.userInfo;
        //     this.nickName.string = userInfo.nickName;
        //     cc.loader.load({url: userInfo.avatarUrl, type: 'png'}, (err, texture) => {
        //         if (err) {
        //             console.error(err);
        //             return;
        //         }
        //         this.avatar.spriteFrame = new cc.SpriteFrame(texture);
        //     });
        //     button.hide();
        //     button.destroy();
        //
        // })
        // }

        this.wxSubContextView.active = true;
        this.wxBackGround.active = true;
        var a = wx.getOpenDataContext().postMessage({
            message: "User info get success."
        });
    },

    //上传玩家得分
    setUserScorePassage: function setUserScorePassage(score) {
        try {
            var oldScore = wx.getStorageSync('maxScore') || 0;
            if (oldScore < score) {
                try {
                    wx.setStorageSync('maxScore', score);
                    wx.setUserCloudStorage({
                        KVDataList: [{ key: "score", value: score + "" }],
                        success: function success(res) {
                            console.log(res);
                            // 让子域更新当前用户的最高分，因为主域无法得到getUserCloadStorage;
                            var openDataContext = wx.getOpenDataContext();
                            openDataContext.postMessage({
                                type: 'updateMaxScore'
                            });
                        },
                        fail: function fail(res) {
                            console.log(res);
                        }
                    });
                } catch (e) {
                    console.log("数据存储失败");
                }
            }
        } catch (e) {
            console.log("获取数据存储失败");
        }
    },


    //排行榜返回按钮
    onBtnBack: function onBtnBack() {
        this.wxSubContextView.active = false;
        this.wxBackGround.active = false;
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
        //# sourceMappingURL=GameCtl.js.map
        