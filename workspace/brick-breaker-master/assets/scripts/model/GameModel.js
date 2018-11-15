cc.Class({
    extends: cc.Component,

    properties: {
        score:0,
        bricksNumber:0,
        life:0,
    },

    init(){
        this.score = 0;
        this.bricksNumber = 50;
    },

    initLife(){
        this.life = 3;
    },

    addScore(score){
        this.score += score;
    },

    minusBrick(n){
        this.bricksNumber -= n;
    },

    reduceLife(){
        this.life -= 1;
    },

});
