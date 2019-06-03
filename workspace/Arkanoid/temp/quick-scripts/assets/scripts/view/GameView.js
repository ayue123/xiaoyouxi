(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/view/GameView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e4735UW3lFPMoW0rK22obsG', 'GameView', __filename);
// scripts/view/GameView.js

'use strict';

/*
 * @Author: ayue 
 * @Date: 2019-03-30 20:19:11 
 * @Last Modified by: ayue
 * @Last Modified time: 2019-06-03 11:01:25
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
        //# sourceMappingURL=GameView.js.map
        