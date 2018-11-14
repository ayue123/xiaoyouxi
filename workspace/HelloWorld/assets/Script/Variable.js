var Variable = ({
    extends: cc.Component,

    properties: {
    },


    load:function (){
        console.log("变量加载完毕")
    },

    //存放角色合并后的名称
    mergeName:undefined,

    //用来存放预制位置上是否有角色
    position:[0,0,0,0,0,0],

    //存放存放预制位置上是否有召回按钮
    recallPosition:[0,0,0,0,0,0],


    // getPositionLength:function () {
    //     var positionLength = 0;
    //     for(var i = 0;i<Variable.position.length;i++){
    //         if(Variable.position[i]!==0){
    //             positionLength++;
    //         }
    //     }
    //     return positionLength;
    // },

    //获取第一个为空的位置
    getIdlePosition:function () {
        for(var i = 0;i<Variable.position.length;i++){
            if(Variable.position[i]===0){
                return i;
            }
        }
    },
    scoreDisplay:undefined,
    scoreAudio:undefined,


});
Variable.load();
module.exports = Variable;