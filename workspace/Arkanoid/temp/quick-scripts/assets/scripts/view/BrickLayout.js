(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/view/BrickLayout.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '62398FSMJtHJ55jmSoqf4WF', 'BrickLayout', __filename);
// scripts/view/BrickLayout.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        padding: 0,
        spacing: 0,
        cols: 0,
        brickPrefab: cc.Prefab,
        bricksNumber: 0
    },

    //绘制砖块
    init: function init(bricksNumber, levelPosition) {
        this.node.removeAllChildren();
        this.bricksNumber = bricksNumber;
        for (var i = 0; i < this.bricksNumber; i++) {
            for (var j = 0; j < levelPosition.length; j++) {
                if (i == levelPosition[j]) {
                    var brickNode = cc.instantiate(this.brickPrefab);
                    brickNode.parent = this.node;
                    if (i % 4 == 0) {
                        brickNode.color = cc.color(0, 0, 255);
                    } else if (i % 4 == 1) {
                        brickNode.color = cc.color(0, 255, 255);
                    } else if (i % 4 == 2) {
                        brickNode.color = cc.color(255, 182, 193);
                    } else {
                        brickNode.color = cc.color(255, 255, 0);
                    }
                    brickNode.pos = levelPosition[j];
                    brickNode.x = this.padding + i % this.cols * (brickNode.width + this.spacing) + brickNode.width / 2;
                    brickNode.y = -this.padding - Math.floor(i / this.cols) * (brickNode.height + this.spacing) - brickNode.height / 2;
                }
            }
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=BrickLayout.js.map
        