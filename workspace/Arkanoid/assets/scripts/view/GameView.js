cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel:cc.Label,
        lifeLable:cc.Label,
    },

    init(gameCtl){
        this.gameCtl = gameCtl;
    },

    initScore(){
        this.scoreLabel.string = '0';
    },

    initLife(life){
        this.lifeLable.string = life;
    },

    updateScore(score){
        this.scoreLabel.string = score;
    },
    updateLife(life){
        this.lifeLable.string = life;
    },
});
