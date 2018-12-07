const GameModel = require('GameModel');
var Ball = require("Ball");
const Slump = require('Slump');
cc.Class({
    extends: cc.Component,

    properties: {
        gameView: require('GameView'),
        paddle: require('Paddle'),
        brickLayout: require('BrickLayout'),
        overPanel: require('OverPanel'),
        ballPrefab: cc.Prefab,
        slumpPrefab: cc.Prefab,
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
        this.gameModel.initLevelPosition();
        this.gameView.init(this);
        this.gameView.initLife(this.gameModel.life);
        this.gameView.initScore();
        this.createNewBall();


        // this.ball.init(this);
        // this.ball.node.pos =0;
        // this.ball.node.position = cc.v2(-30,-30);
        // this.ball.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
        // this.ball.initGamCtl(this);

        // var newBallNode = cc.instantiate(this.ball.node);
        // newBallNode.parent = this.paddle.node.parent;
        // newBallNode.pos = 1;
        // var newBall = new Ball();
        // newBall.node = newBallNode;
        // newBall.newInit(this);



        this.paddle.init();
        this.brickLayout.init(this.gameModel.bricksNumber,this.gameModel.levelOnePosition);
        this.overPanel.init(this);
        // this.slump.initGamCtl(this);
    },

    reInit(){
        this.physicsManager.enabled = true;
        this.gameView.init(this);
        this.gameView.init(this);
        this.gameView.initLife(this.gameModel.life);
        this.createNewBall();
        // var ball = undefined;
        // for(var i = 0;i<this.paddle.node.parent._children.length;i++){
        //     if(this.paddle.node.parent._children[i]._name == "ball"){
        //         if(ball == undefined){
        //             ball =this.paddle.node.parent._children[i];
        //         }else if(this.paddle.node.parent._children[i].pos == 1){
        //             this.paddle.node.parent._children[i].destroy();
        //         }
        //     }else if(this.paddle.node.parent._children[i]._name == "slump"&&this.paddle.node.parent._children[i].pos ==1){
        //         this.paddle.node.parent._children[i].destroy();
        //     }
        // }
        // var newBall = new Ball();
        // newBall.node = ball;
        // newBall.init(this);
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
       //  if(brickNode.parent!=null){
       //     brickNode.parent = null;
       //     this.gameModel.addScore(1);
       //     // this.gameModel.minusBrick(1);
       //     this.gameModel.minusSurviveBrick(1);
       //     this.gameView.updateScore(this.gameModel.score);
       //     if (this.gameModel.surviveBricksNumber <= 0) {
       //         // this.stopGame();
       //         this.gameModel.addLevel();
       //         this.overPanel.updateGameModel(this.gameModel);
       //         this.reBeginGame();
       //     }
       //     var dropBricks =  this.gameModel.dropBricks;
       //     for(var i = 0;i<dropBricks.length;i++){
       //         if(brickNode.pos == dropBricks[i] ){
       //             var newVec2 = this.node.convertToWorldSpaceAR(brickNode.position);
       //             console.log(brickNode.position)
       //             console.log(newVec2)
       //             this.createSlump(newVec2);
       //             break;
       //         }
       //     }
       // }

        //处理因为并发问题引起的砖块未打干净而结束计数的bug
        if(brickNode.parent == null){
            return;
        }

        brickNode.parent = null;
        brickNode.destroy();
        this.gameModel.addScore(1);
        // this.gameModel.minusBrick(1);
        this.gameModel.minusSurviveBrick(1);
        this.gameView.updateScore(this.gameModel.score);
        //本关结束
        if (this.gameModel.surviveBricksNumber <= 0) {
            // this.stopGame();
            this.gameModel.addLevel();
            this.overPanel.updateGameModel(this.gameModel);
            this.destroyBall(ballNode);
            this.reBeginGame();
            this.destroyAllBall(ballNode);
        }
        var dropBricks =  this.gameModel.dropBricks;
        for(var i = 0;i<dropBricks.length;i++){
            if(brickNode.pos == dropBricks[i] ){
                // var newVec2 = this.node.convertToWorldSpaceAR(brickNode.position);
                this.createSlump(brickNode.position);
                break;
            }
        }
    },


    onBallContactGround(ballNode, groundNode) {

        // var ballCount = 0;
        // for(var i = 0;i<ballNode.parent._children.length;i++){
        //     if(ballNode.parent._children[i]._name == "ball"&&ballNode.parent._children[i].pos == 1){
        //         ballCount+=1;
        //     }
        // }
        // console.log(ballCount)
        // if(ballCount<=1){
        //     if(this.gameModel.life>1 && this.gameModel.surviveBricksNumber > 0){
        //         this.gameModel.reduceLife();
        //         this.gameView.updateLife(this.gameModel.life)
        //         this.overPanel.updateGameModel(this.gameModel)
        //         this.reBeginGame();
        //     } else{
        //         this.gameModel.reduceLife();
        //         this.gameView.updateLife(this.gameModel.life)
        //         this.overPanel.updateGameModel(this.gameModel)
        //         this.stopGame();
        //     }
        // }else{
        //     ballNode.destroy();
        // }

        if(this.gameModel.ballCount<=1){
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
            this.destroyBall(ballNode);
        }else{
            this.destroyBall(ballNode);
        }
    },

    onBallContactPaddle(ballNode, paddleNode) {

    },

    onBallContactWall(ballNode, brickNode) {

    },

    createNewBall(){
        //小球复制代码
        var ballNode = cc.instantiate(this.ballPrefab);
        ballNode.parent = this.paddle.node.parent;
        var Ball = ballNode.getComponent('Ball')
        Ball.init(this,this.paddle.node.position);
        this.gameModel.addBallCount();
    },

    createSlump(position){
        // var newSlumpNode = cc.instantiate(this.slump.node);
        // newSlumpNode.parent = this.paddle.node.parent;
        // newSlumpNode.pos = 1;
        // var newSlump = new Slump();
        // newSlump.node = newSlumpNode;
        // newSlump.init(this,position);
        var slumpNode = cc.instantiate(this.slumpPrefab);
        slumpNode.parent = this.brickLayout.node;
        var Slump = slumpNode.getComponent('Slump')
        Slump.init(this,position);
    },

    destroySlump(slumpNode){
        slumpNode.destroy();
    },


    destroyBall(ballNode){
        ballNode.parent = null;
        ballNode.destroy();
        this.gameModel.reduceBallCount();
    },

    destroyAllBall(ballNode){
        var ballParentChildren = this.paddle.node.parent._children;
        for (var i= 0;i<ballParentChildren.length;i++){
            var node = ballParentChildren[i];
            if(node._name == "ball"){
                this.destroyBall(node);
            }
        }
    },

    onDestroy() {
        this.physicsManager.enabled = false;
    },

    onRebirth(){
        this.physicsManager.enabled = true;
    },

    onKeyDown (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.back:
                this.overPanel.showReBegin(this.gameModel.score, this.gameModel.life);
                break;
        }
    },

});