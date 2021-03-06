/*
 * @Author: ayue 
 * @Date: 2019-03-30 20:20:24 
 * @Last Modified by: ayue
 * @Last Modified time: 2019-06-19 15:08:53
 */
const GameModel = require('GameModel');
cc.Class({
    extends: cc.Component,

    properties: {
        resultLabel: cc.Label,
        scoreLabel: cc.Label,
    },

    // use this for initialization
    onLoad: function () {
    },

    init(gameCtl) {
        this.gameCtl = gameCtl;
        this.node.active = false;
    },
    //机会用尽展示界面
    show(score, isWin, level) {
        this.node.active = true;
        if (isWin) {
            this.resultLabel.string = '开始下一关!';
        } else {
            this.resultLabel.string = '重新开始!';
        }
        this.scoreLabel.string = "score:" + score;
        this.gameCtl.banner(true);
    },
    //每一关结束展示界面
    showReBegin(score, life, level) {
        this.node.active = true;
        this.resultLabel.string = 'life:' + life;
        this.scoreLabel.string = 'score:' + score + "\n" + " level:" + level;
        this.gameCtl.banner(true);
    },

    updateGameModel(gameModel) {
        this.gameModel = gameModel;
    },

    //展示界面点击处理逻辑
    onBtnRestart() {
        this.gameCtl.banner(false);
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
    },

    onBtnAddLife(){
        this.gameCtl.initVideoAd();
    },
  
});
