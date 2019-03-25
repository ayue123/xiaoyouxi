"use strict";
cc._RF.push(module, 'e4735UW3lFPMoW0rK22obsG', 'GameView');
// scripts/view/GameView.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: cc.Label,
        lifeLable: cc.Label,
        levelLable: cc.Label
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