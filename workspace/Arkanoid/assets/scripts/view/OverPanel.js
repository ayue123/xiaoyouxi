const GameModel = require('GameModel');
cc.Class({
    extends: cc.Component,

    properties: {
        resultLabel:cc.Label,
        scoreLabel:cc.Label,
    },

    // use this for initialization
    onLoad: function () {
    },

    init(gameCtl){
        this.gameCtl = gameCtl;
        this.node.active = false;
    },

    show(score,isWin){
        this.node.active = true;
        if(isWin){
            this.resultLabel.string = 'YOU WIN!';
        }else{
            this.resultLabel.string = 'YOU LOSE!';
        }
        this.scoreLabel.string = score+'';
    },

    showReBegin(score,life){
        this.node.active = true;
        this.resultLabel.string = 'life:'+life;
        this.scoreLabel.string = 'score:'+score;
    },

    updateGameModel(gameModel){
        this.gameModel = gameModel;
    },

    onBtnRestart(){
        if(this.gameModel.life>0&& this.gameModel.surviveBricksNumber > 0){
            this.gameCtl.reStartGame();
        }else if(this.gameModel.life>0&& this.gameModel.surviveBricksNumber <= 0){
            this.gameModel.initLevelPosition();
            this.gameCtl.reStartGame();
            this.gameCtl.reInitLevelPosition(this.gameModel.getLevelPosition());
        } else{
            this.gameCtl.startGame();
        }
    },
});
