const GameModel = require('GameModel');
cc.Class({
    extends: cc.Component,

    properties: {
        gameView: require('GameView'),
        ball: require('Ball'),
        paddle: require('Paddle'),
        brickLayout: require('BrickLayout'),
        overPanel: require('OverPanel'),
    },

    onLoad: function () {
        //安卓返回键退出
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            if (event.keyCode === cc.KEY.back) {
                cc.director.end();
            }
        });
        this.physicsManager = cc.director.getPhysicsManager();
        this.gameModel = new GameModel();
        this.startGame();
        this.overPanel.updateGameModel(this.gameModel)
    },

    init() {
        this.physicsManager.enabled = true;
        this.gameModel.init();
        this.gameModel.initLife();
        this.gameModel.initLevelOnePosition();
        this.gameView.init(this);
        this.gameView.initLife(this.gameModel.life);
        this.ball.init(this);
        this.paddle.init();
        this.brickLayout.init(this.gameModel.bricksNumber,this.gameModel.levelOnePosition);
        this.overPanel.init(this);

    },

    reInit(){
        this.physicsManager.enabled = true;
        this.gameModel.init();
        this.gameView.init(this);
        this.gameView.initLife(this.gameModel.life);
        this.ball.init(this);
        this.paddle.init();
        this.overPanel.init(this);
    },

    startGame() {
        this.init();
    },

    reStartGame(){
        this.reInit();
    },
    pauseGame() {
        this.physicsManager.enabled = false;
    },

    resumeGame() {
        this.physicsManager.enabled = true;
    },

    stopGame() {
        this.physicsManager.enabled = false;
        this.overPanel.show(this.gameModel.score, this.gameModel.surviveBricksNumber === 0);
    },

    reBeginGame(){
        this.physicsManager.enabled = false;
        this.overPanel.showReBegin(this.gameModel.score, this.gameModel.life);
    },

    onBallContactBrick(ballNode, brickNode) {
        brickNode.parent = null;
        this.gameModel.addScore(1);
        this.gameModel.minusBrick(1);
        this.gameModel.minusSurviveBrick(1);
        this.gameView.updateScore(this.gameModel.score);
        if (this.gameModel.surviveBricksNumber <= 0) {
            this.stopGame();
        }
    },

    onBallContactGround(ballNode, groundNode) {
        if(this.gameModel.life>0 && this.gameModel.surviveBricksNumber > 0){
            this.gameModel.reduceLife();
            this.gameView.updateLife(this.gameModel.life)
            this.overPanel.updateGameModel(this.gameModel)
            this.reBeginGame();
        }else{
            this.stopGame();
        }
    },

    onBallContactPaddle(ballNode, paddleNode) {

    },

    onBallContactWall(ballNode, brickNode) {

    },

    onDestroy() {
        this.physicsManager.enabled = false;
    },

});