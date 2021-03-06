"use strict";
cc._RF.push(module, 'a337308uxxJva7vh8G06q7Z', 'GameCtl');
// scripts/controller/GameCtl.js

'use strict';

/*
 * @Author: ayue 
 * @Date: 2019-03-30 20:18:41 
 * @Last Modified by: ayue
 * @Last Modified time: 2019-09-19 19:32:16
 */

var GameModel = require('GameModel');
var Ball = require("Ball");
var Slump = require('Slump');
var GameCtl = cc.Class({
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
        wxBackGround: cc.Node,
        rankButton: cc.Node,
        addLifeButton: cc.Node,
        allSkillBall: [],
        allBall: [],
        allSlump: [],
        videoAd: null
    },

    onLoad: function onLoad() {
        this.physicsManager = cc.director.getPhysicsManager();
        this.gameModel = new GameModel();
        this.overPanel.updateGameModel(this.gameModel);
        this.startGame();
        this.wxSubContextView.active = false;
        this.wxBackGround.active = false;
        this.authorize();
        this.addLifeButton.active = false;
    },
    update: function update() {},

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
        this.gameView.initLevel(this.gameModel.level);
        this.paddle.init();
        this.brickLayout.init(this.gameModel.bricksNumber, this.gameModel.getLevelPosition(), this.gameModel.getLevelSilveryPosition());
        this.overPanel.init(this);
    },

    //部分属性重新初始化（在玩家仍然有机会时初始化调用）
    reInit: function reInit() {
        this.physicsManager.enabled = true;
        this.gameView.init(this);
        this.gameView.init(this);
        this.gameView.initLife(this.gameModel.life);
        this.gameView.initLevel(this.gameModel.level);
        this.createNewBall();
        this.paddle.init();
        this.overPanel.init(this);
        this.updatePaddleShort(true);
        this.updatePaddleLong(false);
        this.updateBrick(false);
    },

    //重新绘制关卡
    reInitLevelPosition: function reInitLevelPosition() {
        this.brickLayout.init(this.gameModel.bricksNumber, this.gameModel.getLevelPosition(), this.gameModel.getLevelSilveryPosition());
    },

    //重新开始游戏，用于还有机会的情况下
    reStartGame: function reStartGame(levelPosition) {
        this.destroyAllBall();
        this.reInit(levelPosition);
        this.startBackGround.active = false;
        this.addLifeButton.active = false;
    },
    pauseGame: function pauseGame() {
        this.physicsManager.enabled = false;
    },
    resumeGame: function resumeGame() {
        this.physicsManager.enabled = true;
    },

    //结束游戏
    stopGame: function stopGame() {
        this.unscheduleAllCallbacks();
        this.physicsManager.enabled = false;
        this.overPanel.show(this.gameModel.score, this.gameModel.surviveBricksNumber === 0, this.gameModel.level);
        this.startBackGround.active = true;
        this.setUserScorePassage(this.gameModel.score);
    },

    //重新开始游戏（在玩家还有机会时调用）
    reBeginGame: function reBeginGame() {
        this.unscheduleAllCallbacks();
        this.physicsManager.enabled = false;
        this.overPanel.showReBegin(this.gameModel.score, this.gameModel.life, this.gameModel.level);
        this.startBackGround.active = true;
        this.setUserScorePassage(this.gameModel.score);
        this.addLifeButton.active = false;
    },

    //小球撞击砖块处理
    onBallContactBrick: function onBallContactBrick(ballNode, brickNode) {
        //处理因为并发问题引起的砖块未打干净而结束计数的bug
        if (brickNode.parent == null) {
            return;
        }
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
        if (brickNode.life > 1) {
            brickNode.life = brickNode.life - 1;
        } else {
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
                this.gameView.updateLevel(this.gameModel.level);
            }
            var dropBricks = this.gameModel.dropBricks;
            for (var i = 0; i < dropBricks.length; i++) {
                if (brickNode.pos == dropBricks[i]) {
                    this.createSlump(brickNode.position, i);
                    break;
                }
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
                this.addLifeButton.active = true;
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
        ballNode.isSkill = 0;
        if (this.allBall.length > 0) {
            if (this.allBall[0] != null) {
                if (this.allBall[0]._color != null) {
                    ballNode.color = this.allBall[0].color;
                }
            }
        }
        var Ball = ballNode.getComponent('Ball');
        Ball.init(this, this.paddle.node.position);
        this.gameModel.addBallCount();
    },

    //创建技能小球计时器
    createSkillBallFactory: function createSkillBallFactory() {
        this.schedule(this.createSkillBall, 0.3, 20, 0.1);
    },

    //创建技能小球
    createSkillBall: function createSkillBall() {
        //小球复制代码
        var ballNode1 = cc.instantiate(this.ballPrefab);
        var collider1 = ballNode1.getComponent(cc.PhysicsCircleCollider);
        collider1.radius = 6;
        collider1.apply();
        ballNode1.isSkill = 1;
        ballNode1.parent = this.paddle.node.parent;
        ballNode1.color = cc.color(209, 10, 247);
        var Ball1 = ballNode1.getComponent('Ball');
        Ball1.node.width = 10;

        var ballNode2 = cc.instantiate(this.ballPrefab);
        var collider = ballNode2.getComponent(cc.PhysicsCircleCollider);
        collider.radius = 6;
        collider.apply();
        ballNode2.isSkill = 1;
        ballNode2.parent = this.paddle.node.parent;
        ballNode2.color = cc.color(209, 10, 247);
        var Ball = ballNode2.getComponent('Ball');
        Ball.node.width = 10;

        Ball1.initSkillBall(this, this.paddle.node.position, "left");
        Ball.initSkillBall(this, this.paddle.node.position, "right");
    },

    //处理技能小球
    destroySkillBall: function destroySkillBall(ballNode) {
        ballNode.parent = null;
        ballNode.destroy();
    },

    //创建掉落砖块
    createSlump: function createSlump(position, i) {
        var slumpNode = cc.instantiate(this.slumpPrefab);
        slumpNode.parent = this.brickLayout.node;
        var Slump = slumpNode.getComponent('Slump');
        if (i % 5 == 1) {
            slumpNode.color = cc.color(255, 0, 0); //红
            slumpNode.type = 1;
        } else if (i % 5 == 2) {
            slumpNode.color = cc.color(0, 255, 255); //绿
            slumpNode.type = 2;
        } else if (i % 5 == 3) {
            slumpNode.color = cc.color(209, 10, 247); //紫
            slumpNode.type = 3;
        } else if (i % 5 == 4) {
            slumpNode.color = cc.color(231, 129, 0); //橙
            slumpNode.type = 4;
        } else {
            slumpNode.type = 0; //黄
        }
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

    //销毁全部小球和掉落物（游戏结束时调用(包括有机会时)）
    destroyAllBall: function destroyAllBall() {
        if (this.allSkillBall.length > 0) {
            for (var j = 0; j < this.allSkillBall.length; j++) {
                var skillBallNode = this.allSkillBall[j];
                this.destroySkillBall(skillBallNode);
            }
            this.allSkillBall = [];
        }

        var ballParentChildren = this.paddle.node.parent._children;
        for (var i = 0; i < ballParentChildren.length; i++) {
            var node = ballParentChildren[i];
            if (node._name == "ball") {
                if (node.isSkill == 0) {
                    this.destroyBall(node);
                }
            }
        }
        this.allBall = [];

        if (this.allSlump.length > 0) {
            for (var _j = 0; _j < this.allSlump.length; _j++) {
                var slumpNode = this.allSlump[_j];
                this.destroySlump(slumpNode);
            }
            this.allSlump = [];
        }
    },

    //更换托盘
    updatePaddleShort: function updatePaddleShort(active) {
        if (active == true) {
            if (this.paddle.node.width < 100) {
                var collider = this.paddle.node.getComponent(cc.PhysicsPolygonCollider);
                for (var i = 0; i < collider.points.length; i++) {
                    collider.points[i].x = collider.points[i].x * 1.5;
                }
                collider.apply();
                this.paddle.node.width = this.paddle.node.width * 1.5;
            }
        } else {
            if (this.paddle.node.width > 100) {
                var _collider = this.paddle.node.getComponent(cc.PhysicsPolygonCollider);
                for (var _i = 0; _i < _collider.points.length; _i++) {
                    _collider.points[_i].x = _collider.points[_i].x / 1.5;
                }
                _collider.apply();
                this.paddle.node.width = this.paddle.node.width / 1.5;
                this.paddleShortSchedule();
            }
        }
    },

    //托盘恢复计时器
    paddleShortSchedule: function paddleShortSchedule() {
        this.scheduleOnce(function () {
            this.updatePaddleShort(true);
        }, 10);
    },


    //更换托盘
    updatePaddleLong: function updatePaddleLong(active) {
        if (active == true) {
            if (this.paddle.node.width < 150) {
                var collider = this.paddle.node.getComponent(cc.PhysicsPolygonCollider);
                for (var i = 0; i < collider.points.length; i++) {
                    collider.points[i].x = collider.points[i].x * 1.5;
                }
                collider.apply();
                this.paddle.node.width = this.paddle.node.width * 1.5;
                this.paddleLongSchedule();
            }
        } else {
            if (this.paddle.node.width > 150) {
                var _collider2 = this.paddle.node.getComponent(cc.PhysicsPolygonCollider);
                for (var _i2 = 0; _i2 < _collider2.points.length; _i2++) {
                    _collider2.points[_i2].x = _collider2.points[_i2].x / 1.5;
                }
                _collider2.apply();
                this.paddle.node.width = this.paddle.node.width / 1.5;
            }
        }
    },

    //托盘恢复计时器
    paddleLongSchedule: function paddleLongSchedule() {
        this.scheduleOnce(function () {
            this.updatePaddleLong(false);
        }, 10);
    },

    //更新砖块为有碰撞回调，有无碰撞效果
    updateBrick: function updateBrick(active) {
        if (active == true) {
            this.brickLayout.updateBrickSensorTrue();
            var ballParentNode = this.paddle.node.parent;
            var ballNodes = ballParentNode.children;
            for (var i = 0; i < ballNodes.length; i++) {
                if (ballNodes[i].name == "ball") {
                    if (ballNodes[i].isSkill == 0) {
                        ballNodes[i].color = cc.color(255, 255, 0);
                    }
                }
            }
            this.brickSchedule();
        } else {
            this.brickLayout.updateBrickSensorFalse();
            var ballParentNode = this.paddle.node.parent;
            var ballNodes = ballParentNode.children;
            for (var _i3 = 0; _i3 < ballNodes.length; _i3++) {
                if (ballNodes[_i3].name == "ball") {
                    if (ballNodes[_i3].isSkill == 0) {
                        ballNodes[_i3].color = cc.color(255, 255, 255);
                    }
                }
            }
        }
    },

    //砖块碰撞效果恢复计时器
    brickSchedule: function brickSchedule() {
        this.scheduleOnce(function () {
            this.updateBrick(false);
        }, 10);
    },


    //排行榜按钮
    onBtnRank: function onBtnRank() {
        this.initUserInfo();
    },

    //排行榜返回按钮
    onBtnBack: function onBtnBack() {
        this.wxSubContextView.active = false;
        this.wxBackGround.active = false;
    },

    //好友排行榜按钮
    onBtnFriendRank: function onBtnFriendRank() {
        this.initUserInfo();
    },

    //全服排行榜按钮
    onBtnPlayerRank: function onBtnPlayerRank() {
        this.allRank(this);
    },

    //初始化玩家排行榜
    initUserInfo: function initUserInfo() {
        this.wxSubContextView.active = true;
        this.wxBackGround.active = true;
        var a = wx.getOpenDataContext().postMessage({
            type: 'friendRank'
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
        };
        this.saveScore(score, this);
    },


    //banner广告
    banner: function banner(isShow) {
        if (isShow == true) {
            var winSize = wx.getSystemInfoSync();
            var bannerHeight = 135;
            var bannerWidth = 360;
            // 创建 Banner 广告实例，提前初始化
            if (this.bannerAd == null) {
                this.bannerAd = wx.createBannerAd({
                    adUnitId: 'adunit-256c6c4d51b28192',
                    style: {
                        left: (winSize.windowWidth - bannerWidth) / 2 + 0.1,
                        top: winSize.windowHeight - bannerHeight - 30,
                        width: bannerWidth
                    }
                });
                // 在适合的场景显示 Banner 广告
                this.bannerAd.show();
                this.bannerAd.onError(function (err) {
                    console.log("广告拉取错误");
                    console.log(err);
                });
            } else {
                this.bannerAd.destroy();
                this.bannerAd = null;
            }
        } else {
            if (this.bannerAd != null) {
                this.bannerAd.destroy();
                this.bannerAd = null;
            }
        }
    },

    //视频广告
    initVideoAd: function initVideoAd() {
        var _this = this;

        //实例
        // 创建激励视频广告实例，提前初始化
        var videoAd = wx.createRewardedVideoAd({
            adUnitId: 'adunit-97d79c620e54fee7'
        });

        this.videoAd = videoAd;
        // 用户触发广告后，显示激励视频广告
        this.videoAd.show().catch(function () {
            // 失败重试
            _this.videoAd.load().then(function () {
                return _this.videoAd.show();
            }).catch(function (err) {
                console.log('激励视频 广告显示失败');
            });
        });
        //捕捉错误
        this.videoAd.onError(function (err) {
            console.log(err);
        });
        //该标识符主要用于处理res缓存了之前广告的结果导致多次奖励分发
        var tag = 1;
        //关闭视频的回调函数
        this.videoAd.onClose(function (res) {
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (tag <= 1) {
                if (res && res.isEnded || res === undefined) {
                    _this.gameModel.addLife();
                    _this.gameView.updateLife(_this.gameModel.life);
                    _this.overPanel.updateGameModel(_this.gameModel);
                    _this.reBeginGame();
                    _this.banner(true);
                    _this.addLifeButton.active = false;
                } else {
                    // 播放中途退出，不下发游戏奖励
                    _this.banner(true);
                }
                tag++;
            }
        });
    },


    //网络接口
    socket: function socket(response, gameCtl) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                var result = xhr.responseText;
                if (result == 'refresh') {
                    GC.allRank(gameCtl);
                } else {
                    var resultObject = JSON.parse(result);
                    if (resultObject.protocal == '1001') {
                        GC.initPlayerRank(resultObject.map, gameCtl);
                    }
                }
            }
        };
        xhr.open('POST', 'http://47.105.63.173:17594', true);
        // xhr.open('POST', 'http://192.168.1.48:17594', true);
        xhr.send(response);
    },

    //保存玩家分数
    saveScore: function saveScore(score, gameCtl) {
        window.wx.getSetting({
            success: function success(res) {
                if (res.authSetting["scope.userInfo"]) {
                    window.wx.getUserInfo({
                        success: function success(res) {
                            var userInfo = res.userInfo;
                            userInfo.score = score;
                            save(userInfo, gameCtl);
                        }
                    });
                }
            }
        });

        function save(userInfo, gameCtl) {
            var rankCondition = new Object();
            rankCondition.playerNickName = userInfo.nickName + "*" + userInfo.avatarUrl;
            rankCondition.score = userInfo.score;
            var json = JSON.stringify(rankCondition);
            var response = "AYUE" + "1002-" + json;
            GC.socket(response, gameCtl);
        }
    },


    //获取全服排行榜
    allRank: function allRank(gameCtl) {
        var rankCondition = new Object();
        rankCondition.start = 0;
        rankCondition.count = 100;
        var json = JSON.stringify(rankCondition);
        var response = "AYUE" + "1001-" + json;
        this.socket(response, gameCtl);
    },
    initPlayerRank: function initPlayerRank(rankMap, gameCtl) {
        gameCtl.wxSubContextView.active = true;
        gameCtl.wxBackGround.active = true;
        var a = wx.getOpenDataContext().postMessage({
            type: 'playerRank',
            message: JSON.stringify(rankMap)
        });
    },

    //授权
    authorize: function authorize() {
        var sysInfo = window.wx.getSystemInfoSync();
        //获取微信界面大小
        var height = sysInfo.screenHeight;
        window.wx.getSetting({
            success: function success(res) {
                console.log(res.authSetting);
                if (res.authSetting["scope.userInfo"]) {
                    console.log("用户已授权");
                    window.wx.getUserInfo({
                        success: function success(res) {
                            console.log(res);
                            //此时可进行登录操作
                        }
                    });
                } else {
                    console.log("用户未授权");
                    var button = window.wx.createUserInfoButton({
                        type: 'text',
                        text: '',
                        style: {
                            left: 30,
                            top: 370,
                            width: 350,
                            height: 200,
                            backgroundColor: '#00000000', //最后两位为透明度
                            // backgroundColor: '#FC0707',
                            color: '#ffffff',
                            fontSize: 20,
                            textAlign: "center",
                            lineHeight: height
                        }
                    });
                    button.onTap(function (res) {
                        if (res.userInfo) {
                            console.log("用户授权:", res);
                            //此时可进行登录操作
                            button.destroy();
                        } else {
                            console.log("用户拒绝授权:", res);
                        }
                    });
                }
            }
        });
    }
});

//对象初始化
var GC = new GameCtl();

cc._RF.pop();