"use strict";
cc._RF.push(module, 'e4735UW3lFPMoW0rK22obsG', 'GameView');
// scripts/view/GameView.js

'use strict';

/*
 * @Author: ayue 
 * @Date: 2019-03-30 20:19:11 
 * @Last Modified by: ayue
 * @Last Modified time: 2019-09-18 11:35:28
 */
cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: cc.Label,
        lifeLable: cc.Label,
        levelLable: cc.Label
    },
    onLoad: function onLoad() {
        wx.showShareMenu({
            withShareTicket: true
        });
        var id = 'bLQD2KKZQw-o9WQRPo7pYQ'; // 通过 MP 系统审核的图片编号
        var url = 'https://mmocgame.qpic.cn/wechatgame/LH7dMAXmj7xXGYPicJBPbHgVtibIlZrgJCTq0QLF5Kmphq1s0x3eMtONquViaQR64YO/0'; // 通过 MP 系统审核的图片地址
        // wx.shareAppMessage({
        // imageUrlId: id,
        // imageUrl: url
        // })

        wx.onShareAppMessage(function () {
            return {
                imageUrlId: id,
                imageUrl: url
            };
        });
    },

    init: function init(gameCtl) {
        this.gameCtl = gameCtl;
    },
    initScore: function initScore() {
        this.scoreLabel.string = '0';
    },
    initLife: function initLife(life) {
        this.lifeLable.string = life;
    },
    initLevel: function initLevel(level) {
        this.levelLable.string = level;
    },
    updateScore: function updateScore(score) {
        this.scoreLabel.string = score;
    },
    updateLife: function updateLife(life) {
        this.lifeLable.string = life;
    },
    updateLevel: function updateLevel(level) {
        this.levelLable.string = level;
    }
});

cc._RF.pop();