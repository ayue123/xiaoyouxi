/*
 * @Author: ayue 
 * @Date: 2019-03-30 20:19:11 
 * @Last Modified by: ayue
 * @Last Modified time: 2019-06-03 17:32:51
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
        var id = 'bLQD2KKZQw-o9WQRPo7pYQ' // 通过 MP 系统审核的图片编号
        var url = 'https://mmocgame.qpic.cn/wechatgame/LH7dMAXmj7xXGYPicJBPbHgVtibIlZrgJCTq0QLF5Kmphq1s0x3eMtONquViaQR64YO/0' // 通过 MP 系统审核的图片地址
        wx.shareAppMessage({
        imageUrlId: id,
        imageUrl: url
        })

        wx.onShareAppMessage(function () {
        return {
            imageUrlId: id,
            imageUrl: url
        }
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
