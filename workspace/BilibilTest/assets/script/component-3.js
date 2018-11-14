
let Component3 = cc.Class({
    extends: cc.Component,

    properties: {
        node4:cc.Node,
        node5:cc.Node,
    },


    onLoad () {
        //动画动作
        //事件
        //预制体
        //定时器
        //全局变量
        //坐标转换
        //代码查找节点
        // this.node.runAction(
            // cc.moveTo(1,cc.v2(20,20)).easing(cc.easeBackIn(3))
            // cc.rotateTo(1,180);
            // cc.scaleTo(1,2,2);
            // cc.sequence(
            //     cc.fadeOut(1),
            //     // cc.removeSelf(true);
            //     cc.callFunc(this.callback,this,{hello:'world'})
            // )
        // )
    //事件
        // this.裁判.on('枪声',this.rush,this);
        // this.裁判.emit('枪声');
        //node4和node5都在监听node3的枪声
        // this.node.on('枪声',this.rush,this.node4);
        // this.node.on('枪声',this.escape,this.node5);
        //事件发射
        // this.node.emit('枪声',{hello: 'world'});
        //事件发射只发射一次
        // this.node.once('枪声',this.rush,this.node4);
        //事件不在监听
        // this.node.off('枪声',this.rush,this.node4);

        //触摸事件 鼠标事件  键盘事件
        // this.node.on('touchstart',this.onTouchStart,this);
        // this.node.on('touchmove',this.onTouchMove,this);
        // this.node.on('touchend',this.onTouchEnd,this);
        // this.node.on('touchcancel',this.onTouchCancel,this);
        //将整个node-1节点注册事件
        // cc.find('node-1').on('touchstart',this.onTouchStart,this);

        // this.node.on('mouseup',this.onMouseUp,this);
        // this.node.on('mousemove',this.onMouseMove,this);
        // this.node.on('mousedown',this.onMouseDown,this);
        // this.node.on('mouseenter',this.onMouseEnter,this);
        // this.node.on('mouseleave',this.onMouseLeave,this);
        // this.node.on('mousewheel',this.onMouseWheel,this);

        // cc.systemEvent.on('keydown',this.onKeyDown,this);
        // cc.systemEvent.on('keyup',this.onKeyUp,this);
        //
        // //创建新节点
        // let node8 = new cc.Node();
        // node8.name = 'node-8';
        // this.node.addChild(node8);
        // //拷贝
        // let node5Copy = cc.instantiate(this.node5);

        //全局变量
        //window.xxx
        //module.exports & require模块化应用
        //statics
        //addPersistRootNode
        //cc.sys.localStorage.getItem,setItem 重开游戏依旧存在，存在本地

        // window.globalVar = 'hello';
        // let globalModule = require('global-module');
        // console.log(globalModule);
        // Component3.staticsComponent3Num ++;

        // cc.sys.localStorage.setItem('key','value');
        // let  value = cc.sys.localStorage.getItem('key');
        // console.log(value);

        //计时器
        this.schedule(this.aaa,1);
        this.unschedule(this.aaa,1);
        this.scheduleOnce(this.aaa,0);//回调延迟一帧
    },
    
    aaa: function () {
        console.log('aaa');
    },

    // statics:{
    //     //给类取个名
    //    staticsComponent3Num : 0,
    // },
    // onKeyDown:function (e) {
    //     console.log('keydown');
    //     // console.log(e);
    //     if(e.keyCode == cc.macro.KEY.w){
    //         console.log('w pressed');
    //     }
    //
    // },
    // onKeyUp:function (e) {
    //     console.log('keyup');
    //     // console.log(e);
    //     if(e.keyCode == cc.macro.KEY.w){
    //         console.log('w release');
    //     }
    // },

    // onMouseUp: function (e) {
    //     console.log('mouseup');
    //     console.log(e);
    // },

    // onTouchStart:function (e) {
    //     console.log('touchstart',e);
    //     console.log(e.getLocation());
    //     //坐标转换
    //     //从全局坐标系转到本地坐标系
    //     //关键：让点和坐标原点配套
    //     // let locationOfThisNode = this.node.parent.convertToNodeSpaceAR(e.getLocation());
    //     // console.log(locationOfThisNode);
    //     let locationOfThisNodeParent = this.node.parent.convertToNodeSpaceAR(e.getLocation());
    //     this.node.position = locationOfThisNodeParent;
    //     //寻找node-3节点下的精灵节点
    //     // cc.find('node-1/node-3<cc.Sprite>');
    // },
    // onTouchMove:function (e) {
    //     //节点跟随滑动
    //     // let locationOfThisNodeParent = this.node.parent.convertToNodeSpaceAR(e.getLocation());
    //     // this.node.position = locationOfThisNodeParent;
    //     console.log('touchmove',e);
    // },
    // onTouchEnd:function (e) {
    //     console.log('touchend',e);
    // },
    // onTouchCancel:function (e) {
    //     console.log('touchcancel',e);
    // },


    // rush:function (e) {
    //     this//this.node4
    //     e.detail;//{hello:'world'}
    //     console.log('e.detail:',e.detail);
    //     this.runAction(cc.moveTo(1,200,0));
    // },
    //
    // escape:function (e) {
    //     this//this.node5
    //     console.log(e.detail);
    //     this.runAction(cc.moveTo(1,-200,10));
    // },

    start () {

    },
    
    // callback:function (targetNode,arg) {
    //     console.log(targetNode);//this.node
    //     console.log(arg);//{hello:'world'}
    //
    // }

});
