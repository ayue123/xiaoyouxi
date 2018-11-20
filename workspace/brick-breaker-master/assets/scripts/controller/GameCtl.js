const GameModel = require('GameModel');
const Ball = require('Ball');
cc.Class({
    extends: cc.Component,

    properties: {
        gameView: require('GameView'),
        ball: require('Ball'),
        paddle: require('Paddle'),
        brickLayout: require('BrickLayout'),
        overPanel: require('OverPanel'),
        slump: require('Slump'),
    },

    onLoad: function () {
        //安卓返回键退出
        this.physicsManager = cc.director.getPhysicsManager();
        this.gameModel = new GameModel();
        this.startGame();
        this.overPanel.updateGameModel(this.gameModel);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    init() {
        this.physicsManager.enabled = true;
        this.gameModel.init();
        this.gameModel.initScore();
        this.gameModel.initLevel();
        this.gameModel.initLife();
        this.gameModel.initLevelOnePosition();
        this.gameView.init(this);
        this.gameView.initLife(this.gameModel.life);
        this.gameView.initScore();
        this.ball.init(this);

        this.paddle.init();
        this.brickLayout.init(this.gameModel.bricksNumber,this.gameModel.levelOnePosition);
        this.overPanel.init(this);
        this.slump.init(this);
    },

    reInit(){
        this.physicsManager.enabled = true;
        this.gameView.init(this);
        this.gameView.init(this);
        this.gameView.initLife(this.gameModel.life);

        var ball = undefined;
        for(var i = 0;i<this.paddle.node.parent._children.length;i++){
            if(this.paddle.node.parent._children[i]._name == "ball"){
                ball =this.paddle.node.parent._children[i];
            }
        }
        var newBall = new Ball();
        newBall.node = ball;
        newBall.init(this);
        this.paddle.init();
        this.overPanel.init(this);
    },

    reInitLevelPosition(levelPosition){
        this.brickLayout.init(this.gameModel.bricksNumber,levelPosition);
    },

    startGame() {
        this.init();
    },

    reStartGame(levelPosition){
        this.reInit(levelPosition);
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
        console.log(brickNode.parent)
        if(brickNode.parent!=null){
           brickNode.parent = null;
           this.gameModel.addScore(1);
           // this.gameModel.minusBrick(1);
           this.gameModel.minusSurviveBrick(1);
           this.gameView.updateScore(this.gameModel.score);
           if (this.gameModel.surviveBricksNumber <= 0) {
               // this.stopGame();
               this.gameModel.addLevel();
               this.overPanel.updateGameModel(this.gameModel);
               this.reBeginGame();
           }
       }
    },

    onBallContactGround(ballNode, groundNode) {
        var ballCount = 0;
        for(var i = 0;i<ballNode.parent._children.length;i++){
            if(ballNode.parent._children[i]._name == "ball"){
                ballCount+=1;
            }
        }
        if(ballCount<=1){
            if(this.gameModel.life>1 && this.gameModel.surviveBricksNumber > 0){
                this.gameModel.reduceLife();
                this.gameView.updateLife(this.gameModel.life)
                this.overPanel.updateGameModel(this.gameModel)
                this.reBeginGame();
            } else{
                this.gameModel.reduceLife();
                this.gameView.updateLife(this.gameModel.life)
                this.overPanel.updateGameModel(this.gameModel)
                this.stopGame();
            }
        }else{
            ballNode.destroy();
        }
    },

    onBallContactPaddle(ballNode, paddleNode) {

    },

    onBallContactWall(ballNode, brickNode) {

    },

    createNewBall(slumpNode){
        //小球复制代码
        var newBallNode = cc.instantiate(this.ball.node);
        newBallNode.parent = this.ball.node.parent;
        var newBall = new Ball();
        newBall.node = newBallNode;
        newBall.newInit(this);
        slumpNode.destroy();
    },



    onDestroy() {
        this.physicsManager.enabled = false;
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onKeyDown (event) {
        switch(event.keyCode) {
            case cc.KEY.back:
                this.overPanel.showReBegin(this.gameModel.score, this.gameModel.life);
                break;
        }
    },

});