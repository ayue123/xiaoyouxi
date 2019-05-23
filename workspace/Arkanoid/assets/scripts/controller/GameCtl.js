/*
 * @Author: ayue 
 * @Date: 2019-03-30 20:18:41 
 * @Last Modified by: ayue
 * @Last Modified time: 2019-05-22 14:32:19
 */

const GameModel = require('GameModel');
var Ball = require("Ball");
const Slump = require('Slump');
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
        wxBackGround: cc.Node,
        allSkillBall: [],
        allBall: [],
        allSlump: [],
    },

    onLoad: function () {
        this.physicsManager = cc.director.getPhysicsManager();
        this.gameModel = new GameModel();
        this.overPanel.updateGameModel(this.gameModel);
        this.startGame();
        this.wxSubContextView.active = false;
        this.wxBackGround.active = false;

    },
    update: function () {

    },


    startGame() {
        this.init();
        this.reBeginGame();
    },
    //部分属性初始化（游戏初始化时调用）
    init() {
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
    reInit() {
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
    reInitLevelPosition() {
        this.brickLayout.init(this.gameModel.bricksNumber, this.gameModel.getLevelPosition(), this.gameModel.getLevelSilveryPosition());
    },
    //重新开始游戏，用于还有机会的情况下
    reStartGame(levelPosition) {
        this.destroyAllBall();
        this.reInit(levelPosition);
        this.startBackGround.active = false;
    },
    pauseGame() {
        this.physicsManager.enabled = false;
    },

    resumeGame() {
        this.physicsManager.enabled = true;
    },
    //结束游戏
    stopGame() {
        this.unscheduleAllCallbacks();
        this.physicsManager.enabled = false;
        this.overPanel.show(this.gameModel.score, this.gameModel.surviveBricksNumber === 0, this.gameModel.level);
        this.startBackGround.active = true;
        this.setUserScorePassage(this.gameModel.score);
    },
    //重新开始游戏（在玩家还有机会时调用）
    reBeginGame() {
        this.unscheduleAllCallbacks();
        this.physicsManager.enabled = false;
        this.overPanel.showReBegin(this.gameModel.score, this.gameModel.life, this.gameModel.level);
        this.startBackGround.active = true;
        this.setUserScorePassage(this.gameModel.score);
    },
    //小球撞击砖块处理
    onBallContactBrick(ballNode, brickNode) {
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
    onBallContactGround(ballNode, groundNode) {
        if (this.gameModel.ballCount <= 1) {
            if (this.gameModel.life > 1 && this.gameModel.surviveBricksNumber > 0) {
                this.gameModel.reduceLife();
                this.gameView.updateLife(this.gameModel.life)
                this.overPanel.updateGameModel(this.gameModel)
                this.reBeginGame();
            } else {
                this.gameModel.reduceLife();
                this.gameView.updateLife(this.gameModel.life)
                this.overPanel.updateGameModel(this.gameModel)
                this.stopGame();
            }
            this.destroyBall(ballNode);
        } else {
            this.destroyBall(ballNode);
        }
    },
    //小球撞击托盘播放音效
    onBallContactPaddle(ballNode, paddleNode) {
        // 播放碰撞音效
        cc.audioEngine.playEffect(this.collisionAudio, false);
    },
    //小球撞击墙壁播放音效
    onBallContactWall(ballNode, brickNode) {
        // 播放碰撞音效
        cc.audioEngine.playEffect(this.collisionAudio, false);
    },
    //创建新的小球
    createNewBall() {
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
        var Ball = ballNode.getComponent('Ball')
        Ball.init(this, this.paddle.node.position);
        this.gameModel.addBallCount();
    },
    //创建技能小球计时器
    createSkillBallFactory() {
        this.schedule(this.createSkillBall, 0.3, 20, 0.1);
    },
    //创建技能小球
    createSkillBall() {
            //小球复制代码
        let ballNode1 = cc.instantiate(this.ballPrefab);
        let collider1 = ballNode1.getComponent(cc.PhysicsCircleCollider);
        collider1.radius = 6;
        collider1.apply()
        ballNode1.isSkill = 1;
        ballNode1.parent = this.paddle.node.parent;
        ballNode1.color = cc.color(209, 10, 247);
        var Ball1 = ballNode1.getComponent('Ball')
        Ball1.node.width=10;

        let ballNode2 = cc.instantiate(this.ballPrefab);
        let collider = ballNode2.getComponent(cc.PhysicsCircleCollider);
        collider.radius = 6;
        collider.apply()
        ballNode2.isSkill = 1;
        ballNode2.parent = this.paddle.node.parent;
        ballNode2.color = cc.color(209, 10, 247);
        var Ball = ballNode2.getComponent('Ball')
        Ball.node.width =10;

        Ball1.initSkillBall(this, this.paddle.node.position, "left");
        Ball.initSkillBall(this, this.paddle.node.position, "right");
        
    },
    //处理技能小球
    destroySkillBall(ballNode) {
        ballNode.parent = null;
        ballNode.destroy();
    },
    //创建掉落砖块
    createSlump(position, i) {
        var slumpNode = cc.instantiate(this.slumpPrefab);
        slumpNode.parent = this.brickLayout.node;
        var Slump = slumpNode.getComponent('Slump')
        if (i % 5 == 1) {
            slumpNode.color = cc.color(255, 0, 0);//红
            slumpNode.type = 1;
        } else if (i % 5 == 2) {
            slumpNode.color = cc.color(0, 255, 255);//绿
            slumpNode.type = 2;
        } else if (i % 5 == 3) {
            slumpNode.color = cc.color(209, 10, 247);//紫
            slumpNode.type = 3;
        } else if (i % 5 == 4) {
            slumpNode.color = cc.color(231, 129, 0);//橙
            slumpNode.type = 4;
        } else {
            slumpNode.type = 0;//黄
        }
        Slump.init(this, position);
    },
    //销毁掉落砖块
    destroySlump(slumpNode) {
        slumpNode.destroy();
    },

    //销毁单个小球（小球撞击地板时调用）
    destroyBall(ballNode) {
        ballNode.parent = null;
        ballNode.destroy();
        this.gameModel.reduceBallCount();
    },
    //销毁全部小球和掉落物（游戏结束时调用(包括有机会时)）
    destroyAllBall() {
        if (this.allSkillBall.length > 0) {
            for (let j = 0; j < this.allSkillBall.length; j++) {
                let skillBallNode = this.allSkillBall[j];
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
            for (let j = 0; j < this.allSlump.length; j++) {
                let slumpNode = this.allSlump[j];
                this.destroySlump(slumpNode);
            }
            this.allSlump = [];
        }
    },
    //更换托盘
    updatePaddleShort(active) {
        if (active == true) {
            if (this.paddle.node.width < 100) {
                let collider = this.paddle.node.getComponent(cc.PhysicsPolygonCollider);
                for (let i = 0; i < collider.points.length; i++) {
                    collider.points[i].x = collider.points[i].x * 1.5;
                }
                collider.apply()
                this.paddle.node.width = this.paddle.node.width * 1.5
            }
        } else {
            if (this.paddle.node.width > 100) {
                let collider = this.paddle.node.getComponent(cc.PhysicsPolygonCollider);
                for (let i = 0; i < collider.points.length; i++) {
                    collider.points[i].x = collider.points[i].x / 1.5;
                }
                collider.apply()
                this.paddle.node.width = this.paddle.node.width / 1.5
                this.paddleShortSchedule();
            }
        }
    },
    //托盘恢复计时器
    paddleShortSchedule() {
        this.scheduleOnce(function () {
            this.updatePaddleShort(true);
        }, 10);
    },

    //更换托盘
    updatePaddleLong(active) {
        if (active == true) {
            if (this.paddle.node.width < 150) {
                let collider = this.paddle.node.getComponent(cc.PhysicsPolygonCollider);
                for (let i = 0; i < collider.points.length; i++) {
                    collider.points[i].x = collider.points[i].x * 1.5;
                }
                collider.apply()
                this.paddle.node.width = this.paddle.node.width * 1.5
                this.paddleLongSchedule();
            }
        } else {
            if (this.paddle.node.width > 150) {
                let collider = this.paddle.node.getComponent(cc.PhysicsPolygonCollider);
                for (let i = 0; i < collider.points.length; i++) {
                    collider.points[i].x = collider.points[i].x / 1.5;
                }
                collider.apply()
                this.paddle.node.width = this.paddle.node.width / 1.5

            }
        }
    },
    //托盘恢复计时器
    paddleLongSchedule() {
        this.scheduleOnce(function () {
            this.updatePaddleLong(false);
        }, 10);
    },
    //更新砖块为有碰撞回调，有无碰撞效果
    updateBrick(active) {
        if (active == true) {
            this.brickLayout.updateBrickSensorTrue();
            var ballParentNode = this.paddle.node.parent;
            var ballNodes = ballParentNode.children;
            for (let i = 0; i < ballNodes.length; i++) {
                if (ballNodes[i].name == "ball") {
                    if (ballNodes[i].isSkill == 0) {
                        ballNodes[i].color = cc.color(255, 255, 0);
                    }
                }
            }
            this.brickSchedule();
        } else {
            this.brickLayout.updateBrickSensorFalse()
            var ballParentNode = this.paddle.node.parent;
            var ballNodes = ballParentNode.children;
            for (let i = 0; i < ballNodes.length; i++) {
                if (ballNodes[i].name == "ball") {
                    if (ballNodes[i].isSkill == 0) {
                        ballNodes[i].color = cc.color(255, 255, 255);
                    }
                }
            }
        }
    },
    //砖块碰撞效果恢复计时器
    brickSchedule() {
        this.scheduleOnce(function () {
            this.updateBrick(false);
        }, 10);
    },

    //排行榜按钮
    onBtnRank() {
        this.initUserInfo()
    },
    //初始化玩家排行榜
    initUserInfo(nickName, avatarUrl) {
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
        let a = wx.getOpenDataContext().postMessage({
            message: "User info get success."
        });
    },
    //上传玩家得分
    setUserScorePassage(score) {
        try {
            const oldScore = wx.getStorageSync('maxScore') || 0;
            if (oldScore < score) {
                try {
                    wx.setStorageSync('maxScore', score);
                    wx.setUserCloudStorage({
                        KVDataList: [{ key: "score", value: score + "" }],
                        success: res => {
                            console.log(res);
                            // 让子域更新当前用户的最高分，因为主域无法得到getUserCloadStorage;
                            let openDataContext = wx.getOpenDataContext();
                            openDataContext.postMessage({
                                type: 'updateMaxScore',
                            });
                        },
                        fail: res => {
                            console.log(res);
                        }
                    });
                } catch (e) {
                    console.log("数据存储失败")
                }
            }
        } catch (e) {
            console.log("获取数据存储失败")
        }
    },

    //排行榜返回按钮
    onBtnBack() {
        this.wxSubContextView.active = false;
        this.wxBackGround.active = false;
    },


});