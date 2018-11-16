cc.Class({
    extends: cc.Component,

    properties: {
        score:0,
        bricksNumber:0,
        life:0,
        level:1,
        levelOnePosition:[],
        levelTwoPosition:[],
        levelThreePosition:[],
        surviveBricksNumber:0,
    },

    init(){
        this.bricksNumber = 100;
    },

    initScore(){
        this.score = 0;
    },

    initLevel(){
        this.level = 1;
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

    minusSurviveBrick(n){
        this.surviveBricksNumber -= n;
    },

    reduceLife(){
        this.life -= 1;
    },

    addLevel(){
        this.level +=1;
    },

    initLevelPosition(){
        if(this.level == 1){
            this.initLevelOnePosition();
        }else if(this.level == 2){
            this.initLevelTwoPosition();
        }else if(this.level == 3){
            this.initLevelThreePosition();
        }
    },

    getLevelPosition(){
        if(this.level == 1){
            return this.levelOnePosition
        }else if(this.level == 2){
            return this.levelTwoPosition;
        }else if(this.level == 3){
            return this.levelThreePosition;
        }
    },

    initLevelOnePosition(){
        this.levelOnePosition=[
            0 ,1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,
            10,11,12,13,14,15,16,17,18,
            20,21,22,23,24,25,26,27,
            30,31,32,33,34,35,36,
            40,41,42,43,44,45,
            50,51,52,53,54,
            60,61,62,63,
            70,71,72,
            80,81,
            90];
        this.surviveBricksNumber = this.levelOnePosition.length;
    },

    initLevelTwoPosition(){
        this.levelTwoPosition=[
            0 ,1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,
            10,11,12,13,14,15,16,17,18,19,
            20,21,                  28,29,
            30,31,                  38,39,
            40,41,42,43,44,45,46,47,48,49,
            50,51,52,53,54,55,56,57,58,59,
            60,61,                  68,69,
            70,71,                  78,79,
            80,81,82,83,84,85,86,87,88,89,
            90,91,92,93,94,95,96,97,98,99];
        this.surviveBricksNumber = this.levelTwoPosition.length;
    },

    initLevelThreePosition(){
        this.levelThreePosition=[
               1 ,   3 ,   5 ,   7 ,   9 ,
               11,   13,   15,   17,   19,
               21,   23,   25,   27,   29,
               31,   33,   35,   37,   39,
               41,   43,   45,   47,   49,
               51,   53,   55,   57,   59,
               61,   63,   65,   67,   69,
               71,   73,   75,   77,   79,
               81,   83,   85,   87,   89,
               91,   93,   95,   97,   99];
        this.surviveBricksNumber = this.levelThreePosition.length;
    },

    // [
    // 0 ,1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,
    // 10,11,12,13,14,15,16,17,18,19,
    // 20,21,22,23,24,25,26,27,28,29,
    // 30,31,32,33,34,35,36,37,38,39,
    // 40,41,42,43,44,45,46,47,48,49,
    // 50,51,52,53,54,55,56,57,58,59,
    // 60,61,62,63,64,65,66,67,68,69,
    // 70,71,72,73,74,75,76,77,78,79,
    // 80,81,82,83,84,85,86,87,88,89,
    // 90,91,92,93,94,95,96,97,98,99];

});
