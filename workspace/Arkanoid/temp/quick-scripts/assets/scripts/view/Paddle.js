(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/view/Paddle.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4dc82c1qO9KbZBsMZGbHlMV', 'Paddle', __filename);
// scripts/view/Paddle.js

"use strict";

/*
 * @Author: ayue 
 * @Date: 2019-03-30 20:20:49 
 * @Last Modified by: ayue
 * @Last Modified time: 2019-05-22 10:40:08
 */
cc.Class({
    extends: cc.Component,

    onLoad: function onLoad() {
        var _this = this;

        this.node.parent.on("touchmove", function (event) {
            //将世界坐标转化为本地坐标
            var touchPoint = _this.node.parent.convertToNodeSpace(event.getLocation());
            if (touchPoint.x < 70) {
                _this.node.x = 70;
            } else if (touchPoint.x > 650) {
                _this.node.x = 650;
            } else {
                _this.node.x = touchPoint.x;
            }
        });
    },

    init: function init() {
        this.node.x = 360;
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
        //# sourceMappingURL=Paddle.js.map
        