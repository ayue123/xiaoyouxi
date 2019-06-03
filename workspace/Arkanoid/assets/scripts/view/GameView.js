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
        levelLable: cc.Label,
    },
    onLoad: function () {
        wx.showShareMenu({
            withShareTicket: true
          })
    },

    init(gameCtl) {
        this.gameCtl = gameCtl;
    },

    initScore() {
        this.scoreLabel.string = '0';
    },

    initLife(life) {
        this.lifeLable.string = life;
    },

    initLevel(level) {
        this.levelLable.string = level;
    },

    updateScore(score) {
        this.scoreLabel.string = score;
    },
    updateLife(life) {
        this.lifeLable.string = life;
    },

    updateLevel(level) {
        this.levelLable.string = level;
    },
});
