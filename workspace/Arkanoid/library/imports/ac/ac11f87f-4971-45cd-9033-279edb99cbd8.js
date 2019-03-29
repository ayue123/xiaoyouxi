"use strict";
cc._RF.push(module, 'ac11fh/SXFFzZAzJ57bmcvY', 'GameModel');
// scripts/model/GameModel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        score: 0,
        bricksNumber: 0,
        life: 0,
        level: 1,
        ballCount: 0,
        surviveBricksNumber: 0,
        dropBricks: [],

        levelOnePosition: [],
        levelTwoPosition: [],
        levelThreePosition: [],
        levelFourPosition: [],
        levelFivePosition: [],
        levelSixPosition: [],
        levelSevenPosition: [],
        levelEightPosition: [],
        levelNinePosition: [],
        levelTenPosition: [],
        levelElevenPosition: [],
        levelTwelvePosition: [],
        levelThirteenPosition: [],
        levelFourteenPosition: [],
        levelFifteenPosition: [],
        levelSixteenPosition: [],
        levelSeventeenPosition: [],
        levelEighteenPosition: [],
        levelNineteenPosition: [],
        levelTwentyPosition: [],

        levelOneSilveryPosition: [],
        levelTwoSilveryPosition: [],
        levelThreeSilveryPosition: [],
        levelFourSilveryPosition: [],
        levelFiveSilveryPosition: [],
        levelSixSilveryPosition: [],
        levelSevenSilveryPosition: [],
        levelEightSilveryPosition: [],
        levelNineSilveryPosition: [],
        levelTenSilveryPosition: [],
        levelElevenSilveryPosition: [],
        levelTwelveSilveryPosition: [],
        levelThirteenSilveryPosition: [],
        levelFourteenSilveryPosition: [],
        levelFifteenSilveryPosition: [],
        levelSixteenSilveryPosition: [],
        levelSeventeenSilveryPosition: [],
        levelEighteenSilveryPosition: [],
        levelNineteenSilveryPosition: [],
        levelTwentySilveryPosition: []
    },

    init: function init() {
        this.bricksNumber = 200;
    },
    initScore: function initScore() {
        this.score = 0;
    },
    initLevel: function initLevel() {
        this.level = 1;
    },
    initLife: function initLife() {
        this.life = 3;
    },
    addScore: function addScore(score) {
        this.score += score;
    },
    minusBrick: function minusBrick(n) {
        this.bricksNumber -= n;
    },
    minusSurviveBrick: function minusSurviveBrick(n) {
        this.surviveBricksNumber -= n;
    },
    reduceLife: function reduceLife() {
        this.life -= 1;
    },
    addLevel: function addLevel() {
        this.level += 1;
    },
    addBallCount: function addBallCount() {
        this.ballCount += 1;
    },
    reduceBallCount: function reduceBallCount() {
        this.ballCount -= 1;
        if (this.ballCount <= 0) {
            this.ballCount = 0;
        }
    },

    //初始化关
    initLevelPosition: function initLevelPosition() {
        if (this.level == 1) {
            this.initLevelOnePosition();
            this.initLevelOneSilveryPosition();
        } else if (this.level == 2) {
            this.initLevelTwoPosition();
            this.initLevelTwoSilveryPosition();
        } else if (this.level == 3) {
            this.initLevelThreePosition();
            this.initLevelThreeSilveryPosition();
        } else if (this.level == 4) {
            this.initLevelFourPosition();
            this.initLevelFourSilveryPosition();
        } else if (this.level == 5) {
            this.initLevelFivePosition();
            this.initLevelFiveSilveryPosition();
        } else if (this.level == 6) {
            this.initLevelSixPosition();
            this.initLevelSixSilveryPosition();
        } else if (this.level == 7) {
            this.initLevelSevenPosition();
            this.initLevelSevenSilveryPosition();
        } else if (this.level == 8) {
            this.initLevelEightPosition();
            this.initLevelEightSilveryPosition();
        } else if (this.level == 9) {
            this.initLevelNinePosition();
            this.initLevelNineSilveryPosition();
        } else if (this.level == 10) {
            this.initLevelTenPosition();
            this.initLevelTenSilveryPosition();
        } else if (this.level == 11) {
            this.initLevelElevenPosition();
            this.initLevelElevenSilveryPosition();
        } else if (this.level == 12) {
            this.initLevelTwelvePosition();
            this.initLevelTwelveSilveryPosition();
        } else if (this.level == 13) {
            this.initLevelThirteenPosition();
            this.initLevelThirteenSilveryPosition();
        } else if (this.level == 14) {
            this.initLevelFourteenPosition();
            this.initLevelFourteenSilveryPosition();
        } else if (this.level == 15) {
            this.initLevelFifteenPosition();
            this.initLevelFifteenSilveryPosition();
        } else if (this.level == 16) {
            this.initLevelSixteenPosition();
            this.initLevelSixteenSilveryPosition();
        } else if (this.level == 17) {
            this.initLevelSeventeenPosition();
            this.initLevelSeventeenSilveryPosition();
        } else if (this.level == 18) {
            this.initLevelEighteenPosition();
            this.initLevelEighteenSilveryPosition();
        } else if (this.level == 19) {
            this.initLevelNineteenPosition();
            this.initLevelNineteenSilveryPosition();
        } else if (this.level == 20) {
            this.initLevelTwentyPosition();
            this.initLevelTwentySilveryPosition();
        } else {
            return 9999;
        }

        this.dropBricks = this.getRandomBricks();
    },


    //获取随机砖块
    getRandomBricks: function getRandomBricks() {
        var levelPosition = this.getLevelPosition();
        var allBricks = levelPosition.length;
        var randomBricks = [];
        for (var i = 1; i <= 15; i++) {
            randomBricks[i] = levelPosition[parseInt(Math.random() * allBricks)];
        }
        return randomBricks;
    },

    //获取需要被填充的砖块
    getLevelPosition: function getLevelPosition() {
        if (this.level == 1) {
            return this.levelOnePosition;
        } else if (this.level == 2) {
            return this.levelTwoPosition;
        } else if (this.level == 3) {
            return this.levelThreePosition;
        } else if (this.level == 4) {
            return this.levelFourPosition;
        } else if (this.level == 5) {
            return this.levelFivePosition;
        } else if (this.level == 6) {
            return this.levelSixPosition;
        } else if (this.level == 7) {
            return this.levelSevenPosition;
        } else if (this.level == 8) {
            return this.levelEightPosition;
        } else if (this.level == 9) {
            return this.levelNinePosition;
        } else if (this.level == 10) {
            return this.levelTenPosition;
        } else if (this.level == 11) {
            return this.levelElevenPosition;
        } else if (this.level == 12) {
            return this.levelTwelvePosition;
        } else if (this.level == 13) {
            return this.levelThirteenPosition;
        } else if (this.level == 14) {
            return this.levelFourteenPosition;
        } else if (this.level == 15) {
            return this.levelFifteenPosition;
        } else if (this.level == 16) {
            return this.levelSixteenPosition;
        } else if (this.level == 17) {
            return this.levelSeventeenPosition;
        } else if (this.level == 18) {
            return this.levelEighteenPosition;
        } else if (this.level == 19) {
            return this.levelNineteenPosition;
        } else if (this.level == 20) {
            return this.levelTwentyPosition;
        } else {
            return 9999;
        }
    },

    //获取需要被填充的银色砖块
    getLevelSilveryPosition: function getLevelSilveryPosition() {
        if (this.level == 1) {
            return this.levelOneSilveryPosition;
        } else if (this.level == 2) {
            return this.levelTwoSilveryPosition;
        } else if (this.level == 3) {
            return this.levelThreeSilveryPosition;
        } else if (this.level == 4) {
            return this.levelFourSilveryPosition;
        } else if (this.level == 5) {
            return this.levelFiveSilveryPosition;
        } else if (this.level == 6) {
            return this.levelSixSilveryPosition;
        } else if (this.level == 7) {
            return this.levelSevenSilveryPosition;
        } else if (this.level == 8) {
            return this.levelEightSilveryPosition;
        } else if (this.level == 9) {
            return this.levelNineSilveryPosition;
        } else if (this.level == 10) {
            return this.levelTenSilveryPosition;
        } else if (this.level == 11) {
            return this.levelElevenSilveryPosition;
        } else if (this.level == 12) {
            return this.levelTwelveSilveryPosition;
        } else if (this.level == 13) {
            return this.levelThirteenSilveryPosition;
        } else if (this.level == 14) {
            return this.levelFourteenSilveryPosition;
        } else if (this.level == 15) {
            return this.levelFifteenSilveryPosition;
        } else if (this.level == 16) {
            return this.levelSixteenSilveryPosition;
        } else if (this.level == 17) {
            return this.levelSeventeenSilveryPosition;
        } else if (this.level == 18) {
            return this.levelEighteenSilveryPosition;
        } else if (this.level == 19) {
            return this.levelNineteenSilveryPosition;
        } else if (this.level == 20) {
            return this.levelTwentySilveryPosition;
        } else {
            return 9999;
        }
    },
    initLevelOnePosition: function initLevelOnePosition() {
        this.levelOnePosition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 30, 31, 32, 33, 34, 35, 36, 40, 41, 42, 43, 44, 45, 50, 51, 52, 53, 54, 60, 61, 62, 63, 70, 71, 72, 80, 81, 90];
        this.surviveBricksNumber = this.levelOnePosition.length;
    },
    initLevelOneSilveryPosition: function initLevelOneSilveryPosition() {
        this.levelOneSilveryPosition = [];
    },
    initLevelTwoPosition: function initLevelTwoPosition() {
        this.levelTwoPosition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 28, 29, 30, 31, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 68, 69, 70, 71, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99];
        this.surviveBricksNumber = this.levelTwoPosition.length;
    },
    initLevelTwoSilveryPosition: function initLevelTwoSilveryPosition() {
        this.levelTwoSilveryPosition = [];
    },
    initLevelThreePosition: function initLevelThreePosition() {
        this.levelThreePosition = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99];
        this.surviveBricksNumber = this.levelThreePosition.length;
    },
    initLevelThreeSilveryPosition: function initLevelThreeSilveryPosition() {
        this.levelThreeSilveryPosition = [];
    },
    initLevelFourPosition: function initLevelFourPosition() {
        this.levelFourPosition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 19, 20, 22, 23, 24, 25, 26, 27, 29, 30, 32, 37, 39, 40, 42, 44, 45, 47, 49, 50, 52, 54, 57, 59, 60, 62, 64, 67, 69, 70, 72, 74, 75, 76, 77, 79, 80, 82, 89, 90, 92, 93, 94, 95, 96, 97, 98, 99];
        this.surviveBricksNumber = this.levelFourPosition.length;
    },
    initLevelFourSilveryPosition: function initLevelFourSilveryPosition() {
        this.levelFourSilveryPosition = [];
    },
    initLevelFivePosition: function initLevelFivePosition() {
        this.levelFivePosition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 66, 67, 68, 69, 70, 71, 72, 77, 78, 79, 80, 81, 88, 89, 90, 99];
        this.surviveBricksNumber = this.levelFivePosition.length;
    },
    initLevelFiveSilveryPosition: function initLevelFiveSilveryPosition() {
        this.levelFiveSilveryPosition = [];
    },
    initLevelSixPosition: function initLevelSixPosition() {
        this.levelSixPosition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 27, 28, 29, 30, 31, 38, 39, 40, 41, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 78, 79, 80, 81, 88, 89, 90, 91, 98, 99];
        this.surviveBricksNumber = this.levelSixPosition.length;
    },
    initLevelSixSilveryPosition: function initLevelSixSilveryPosition() {
        this.levelSixSilveryPosition = [2, 3, 4, 5, 6, 7];
    },
    initLevelSevenPosition: function initLevelSevenPosition() {
        this.levelSevenPosition = [10, 11, 12, 13, 14, 15, 16, 17, 18, 31, 32, 33, 34, 35, 36, 37, 38, 39, 50, 51, 52, 53, 54, 55, 56, 57, 58, 71, 72, 73, 74, 75, 76, 77, 78, 79, 90, 91, 92, 93, 94, 95, 96, 97, 98];
        this.surviveBricksNumber = this.levelSevenPosition.length;
    },
    initLevelSevenSilveryPosition: function initLevelSevenSilveryPosition() {
        this.levelSevenSilveryPosition = [10, 11, 12, 13, 14, 15, 16, 17, 18];
    },
    initLevelEightPosition: function initLevelEightPosition() {
        this.levelEightPosition = [22, 23, 24, 25, 26, 27, 32, 33, 34, 35, 36, 37, 42, 43, 44, 45, 46, 47, 52, 53, 54, 55, 56, 57, 62, 63, 64, 65, 66, 67, 72, 73, 74, 75, 76, 77, 82, 83, 84, 85, 86, 87];
        this.surviveBricksNumber = this.levelEightPosition.length;
    },
    initLevelEightSilveryPosition: function initLevelEightSilveryPosition() {
        this.levelEightSilveryPosition = [22, 23, 24, 25, 26, 27];
    },
    initLevelNinePosition: function initLevelNinePosition() {
        this.levelNinePosition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 30, 32, 34, 36, 38, 40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 52, 54, 56, 58, 60, 61, 62, 63, 64, 65, 66, 67, 68, 70, 72, 74, 76, 78, 80, 81, 82, 83, 84, 85, 86, 87, 88, 90, 92, 94, 96, 98];
        this.surviveBricksNumber = this.levelNinePosition.length;
    },
    initLevelNineSilveryPosition: function initLevelNineSilveryPosition() {
        this.levelNineSilveryPosition = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    },
    initLevelTenPosition: function initLevelTenPosition() {
        this.levelTenPosition = [4, 5, 14, 15, 24, 25, 33, 34, 35, 36, 43, 44, 45, 46, 52, 53, 54, 55, 56, 57, 62, 63, 64, 65, 66, 67, 71, 72, 73, 74, 75, 76, 77, 78, 81, 82, 83, 84, 85, 86, 87, 88, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99];
        this.surviveBricksNumber = this.levelTenPosition.length;
    },
    initLevelTenSilveryPosition: function initLevelTenSilveryPosition() {
        this.levelTenSilveryPosition = [4, 5, 14, 15];
    },
    initLevelElevenPosition: function initLevelElevenPosition() {
        this.levelElevenPosition = [10, 20, 21, 30, 31, 32, 40, 41, 42, 43, 50, 51, 52, 53, 54, 60, 61, 62, 63, 64, 65, 70, 71, 72, 73, 74, 75, 76, 80, 81, 82, 83, 84, 85, 86, 87, 90, 91, 92, 93, 94, 95, 96, 97];
        this.surviveBricksNumber = this.levelElevenPosition.length;
    },
    initLevelElevenSilveryPosition: function initLevelElevenSilveryPosition() {
        this.levelElevenSilveryPosition = [90, 91, 92, 93, 94, 95, 96, 97];
    },
    initLevelTwelvePosition: function initLevelTwelvePosition() {
        this.levelTwelvePosition = [0, 9, 10, 13, 14, 15, 16, 19, 20, 23, 24, 25, 26, 29, 30, 33, 34, 35, 36, 39, 40, 43, 44, 45, 46, 49, 50, 53, 54, 55, 56, 59, 60, 69, 70, 71, 72, 73, 74, 75, 76, 79, 80, 81, 82, 83, 84, 85, 86, 89, 90, 91, 92, 93, 94, 95, 96, 99];
        this.surviveBricksNumber = this.levelTwelvePosition.length;
    },
    initLevelTwelveSilveryPosition: function initLevelTwelveSilveryPosition() {
        this.levelTwelveSilveryPosition = [90, 91, 92, 93, 94, 95, 96, 99];
    },
    initLevelThirteenPosition: function initLevelThirteenPosition() {
        this.levelThirteenPosition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 19, 20, 21, 23, 25, 27, 29, 30, 32, 34, 36, 38, 39, 40, 41, 43, 45, 47, 49, 50, 52, 54, 56, 58, 59, 60, 61, 63, 65, 67, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 90, 92, 94, 96, 98];
        this.surviveBricksNumber = this.levelThirteenPosition.length;
    },
    initLevelThirteenSilveryPosition: function initLevelThirteenSilveryPosition() {
        this.levelThirteenSilveryPosition = [90, 92, 94, 96, 98];
    },
    initLevelFourteenPosition: function initLevelFourteenPosition() {
        this.levelFourteenPosition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 132, 133, 134, 135, 136, 137, 138, 139, 160, 161, 162, 163, 164, 165, 166, 167];
        this.surviveBricksNumber = this.levelFourteenPosition.length;
    },
    initLevelFourteenSilveryPosition: function initLevelFourteenSilveryPosition() {
        this.levelFourteenSilveryPosition = [132, 133, 134, 135, 136, 137, 138, 139, 160, 161, 162, 163, 164, 165, 166, 167];
    },
    initLevelFifteenPosition: function initLevelFifteenPosition() {
        this.levelFifteenPosition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 83, 86, 89, 90, 93, 96, 99, 100, 103, 106, 109, 110, 113, 116, 119, 120, 123, 126, 129, 130, 133, 136, 139, 140, 143, 146, 149];
        this.surviveBricksNumber = this.levelFifteenPosition.length;
    },
    initLevelFifteenSilveryPosition: function initLevelFifteenSilveryPosition() {
        this.levelFifteenSilveryPosition = [80, 83, 86, 89, 90, 93, 96, 99, 100, 103, 106, 109, 110, 113, 116, 119, 120, 123, 126, 129, 130, 133, 136, 139, 140, 143, 146, 149];
    },

    //
    initLevelSixteenPosition: function initLevelSixteenPosition() {
        this.levelSixteenPosition = [0, 1, 8, 9, 10, 11, 12, 17, 18, 19, 21, 22, 23, 26, 27, 28, 29, 32, 33, 34, 35, 36, 37, 38, 39, 43, 44, 45, 46, 53, 54, 55, 56, 63, 64, 65, 66, 73, 74, 75, 76, 82, 83, 84, 85, 86, 87, 91, 92, 93, 94, 95, 96, 97, 98, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119];
        this.surviveBricksNumber = this.levelSixteenPosition.length;
    },
    initLevelSixteenSilveryPosition: function initLevelSixteenSilveryPosition() {
        this.levelSixteenSilveryPosition = [94, 95, 103, 104, 105, 106, 112, 113, 114, 115, 116, 117];
    },

    //
    //
    initLevelSeventeenPosition: function initLevelSeventeenPosition() {
        this.levelSeventeenPosition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 78, 79, 80, 81, 88, 89, 90, 91, 98, 99, 100, 101, 108, 109, 110, 111, 118, 119, 120, 121, 128, 129, 142, 143, 144, 145, 146, 147];
        this.surviveBricksNumber = this.levelSeventeenPosition.length;
    },
    initLevelSeventeenSilveryPosition: function initLevelSeventeenSilveryPosition() {
        this.levelSeventeenSilveryPosition = [142, 143, 144, 145, 146, 147];
    },

    //
    //
    initLevelEighteenPosition: function initLevelEighteenPosition() {
        this.levelEighteenPosition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 30, 31, 32, 33, 34, 35, 36, 40, 41, 42, 43, 44, 45, 50, 51, 52, 53, 54, 60, 61, 62, 63, 70, 71, 72, 80, 81, 90, 140, 142, 144, 146, 148];
        this.surviveBricksNumber = this.levelEighteenPosition.length;
    },
    initLevelEighteenSilveryPosition: function initLevelEighteenSilveryPosition() {
        this.levelEighteenSilveryPosition = [140, 142, 144, 146, 148];
    },

    //
    initLevelNineteenPosition: function initLevelNineteenPosition() {
        this.levelNineteenPosition = [11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 32, 33, 34, 35, 36, 37, 38, 39, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 62, 63, 64, 65, 66, 67, 68, 69, 71, 72, 73, 74, 75, 76, 77, 78, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 92, 93, 94, 95, 96, 97, 98, 99, 101, 102, 103, 104, 105, 106, 107, 108, 109, 111, 112, 113, 114, 115, 116, 117, 118, 119, 122, 123, 125, 126, 128, 129];
        this.surviveBricksNumber = this.levelNineteenPosition.length;
    },
    initLevelNineteenSilveryPosition: function initLevelNineteenSilveryPosition() {
        this.levelNineteenSilveryPosition = [11, 21, 41, 51, 71, 81, 101, 111, 122, 123, 125, 126, 128, 129];
    },

    //
    initLevelTwentyPosition: function initLevelTwentyPosition() {
        this.levelTwentyPosition = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 116, 117, 118, 119, 123, 126, 133, 136, 143, 146, 153, 156];
        this.surviveBricksNumber = this.levelTwentyPosition.length;
    },
    initLevelTwentySilveryPosition: function initLevelTwentySilveryPosition() {
        this.levelTwentySilveryPosition = [110, 111, 112, 113, 116, 117, 118, 119, 123, 126, 133, 136, 143, 146, 153, 156];
    }
}

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
// 90,91,92,93,94,95,96,97,98,99,
// 100,101,102,103,104,105,106,107,108,109,
// 110,111,112,113,114,115,116,117,118,119,
// 120,121,122,123,124,125,126,127,128,129,
// 130,131,132,133,134,135,136,137,138,139,
// 140,141,142,143,144,145,146,147,148,149,
// 150,151,152,153,154,155,156,157,158,159,
// 160,161,162,163,164,165,166,167,168,169];

);

cc._RF.pop();