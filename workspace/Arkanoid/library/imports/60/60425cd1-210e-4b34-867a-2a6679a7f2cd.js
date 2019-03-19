"use strict";
cc._RF.push(module, '60425zRIQ5LNIZ6KmZ5p/LN', 'OverPanel');
// scripts/view/OverPanel.js

'use strict';

var GameModel = require('GameModel');
cc.Class({
    extends: cc.Component,

    properties: {
        resultLabel: cc.Label,
        scoreLabel: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {},

    init: function init(gameCtl) {
        this.gameCtl = gameCtl;
        this.node.active = false;
    },

    //机会用尽展示界面
    show: function show(score, isWin) {
        this.node.active = true;
        if (isWin) {
            this.resultLabel.string = '开始下一关!';
        } else {
            this.resultLabel.string = '重新开始!';
        }
        this.scoreLabel.string = score + '';
    },

    //每一关结束展示界面
    showReBegin: function showReBegin(score, life) {
        this.node.active = true;
        this.resultLabel.string = 'life:' + life;
        this.scoreLabel.string = 'score:' + score;
    },
    updateGameModel: function updateGameModel(gameModel) {
        this.gameModel = gameModel;
    },


    //展示界面点击处理逻辑
    onBtnRestart: function onBtnRestart() {
        if (this.gameModel.life > 0 && this.gameModel.surviveBricksNumber > 0) {
            this.gameCtl.reStartGame();
        } else if (this.gameModel.life > 0 && this.gameModel.surviveBricksNumber <= 0) {
            var isLevelOver = this.gameModel.initLevelPosition();
            if (isLevelOver != 9999) {
                this.gameCtl.reStartGame();
                this.gameCtl.reInitLevelPosition(this.gameModel.getLevelPosition());
            } else {
                this.gameCtl.startGame();
            }
        } else {
            this.gameCtl.startGame();
        }
    }
});

cc._RF.pop();