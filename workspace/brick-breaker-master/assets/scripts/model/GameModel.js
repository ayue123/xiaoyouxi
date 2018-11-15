cc.Class({
    extends: cc.Component,

    properties: {
        score:0,
        bricksNumber:0,
        life:0,
        level:0,
        levelOnePosition:[],
        levelTwoPosition:[],
        surviveBricksNumber:0,
    },

    init(){
        this.bricksNumber = 150;
    },

    initScore(){
        this.score = 0;
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

    initLevelTwoPosition(){
        this.levelOnePosition=[
            0 ,1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,10,11,12,13,14,
            15,16,17,18,19,20,21,22,23,24,25,26,27,28,
            30,31,32,33,34,35,36,37,38,39,40,41,42,
            45,46,47,48,49,50,51,52,53,54,55,56,
            60,61,62,63,64,65,66,67,68,69,70,
            75,76,77,78,79,80,81,82,83,84,
            90,91,92,93,94,95,96,97,98,
            105,106,107,108,109,110,111,112,
            120,121,122,123,124,125,126,
            135,136,137,138,139,140];
        this.surviveBricksNumber = this.levelOnePosition.length;
    },

    initLevelOnePosition(){
        this.levelOnePosition=[
            0 ,1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,10,11,12,13,14,
            15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,
            30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,
            45,46,47,                           57,58,59,
            60,61,62,                           72,73,74,
            75,76,77,                           87,88,89,
            90,91,92,                           102,103,104,
            105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,
            120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,
            135,136,137,138,139,140,141,142,143,144,145,146,147,148,149];
        this.surviveBricksNumber = this.levelOnePosition.length;
    },

});
