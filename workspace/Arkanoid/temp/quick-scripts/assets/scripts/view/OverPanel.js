(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/view/OverPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '60425zRIQ5LNIZ6KmZ5p/LN', 'OverPanel', __filename);
// scripts/view/OverPanel.js

'use strict';

/*
 * @Author: ayue 
 * @Date: 2019-03-30 20:20:24 
 * @Last Modified by: ayue
 * @Last Modified time: 2019-06-14 14:46:34
 */
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
    show: function show(score, isWin, level) {
        this.node.active = true;
        if (isWin) {
            this.resultLabel.string = '开始下一关!';
        } else {
            this.resultLabel.string = '重新开始!';
        }
        this.scoreLabel.string = "score:" + score;
        this.gameCtl.banner();
    },

    //每一关结束展示界面
    showReBegin: function showReBegin(score, life, level) {
        this.node.active = true;
        this.resultLabel.string = 'life:' + life;
        this.scoreLabel.string = 'score:' + score + "\n" + " level:" + level;
        this.gameCtl.banner();
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
                this.gameCtl.reInitLevelPosition();
            } else {
                this.gameCtl.startGame();
            }
        } else {
            this.gameCtl.startGame();
        }
        this.gameCtl.banner();
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
        //# sourceMappingURL=OverPanel.js.map
        