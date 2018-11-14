
var Constant = ({
    extends: cc.Component,

    properties: {
    },

    load:function()  {
        console.log("常量加载完毕")
    },

    // position1:cc.v2(0, 0),
    // position2:cc.v2(-50, 0),
    // position3:cc.v2(-100, 0),
    //预设位置
    prePosition:[cc.v2(0, 0),cc.v2(-50, 0),cc.v2(-100, 0),cc.v2(0, -100),cc.v2(-50, -100),cc.v2(-100, -100)],
    //预设的速度
    preSpeed:[1,0.75,0.45],

    score:0,

});
Constant.load();
module.exports = Constant;
