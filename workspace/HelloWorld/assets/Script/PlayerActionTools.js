var Constant = require("Constant");
var Variable = require("Variable");
var PlayerActionTools = {
    load: function () {
        console.log("PlayerActionTools加载完成");
    },

    //位置初始化方法
    spawnNewPlayer: function(fthis,fnode,prefab) {
        // 使用给定的模板在场景中生成一个新节点
        var player = cc.instantiate(prefab);
        // 将新增的节点添加到 Canvas 节点下面
        fnode.addChild(player);
        // 设置一个位置
        player.setPosition(Constant.prePosition[Variable.getIdlePosition()]);
        //两者赋值顺序不能变化
        player.pos=Variable.getIdlePosition();
        Variable.position[Variable.getIdlePosition()]=player;
        // 在Player1组件上暂存 Game 对象的引用
        player.getComponent(prefab._name).game = fthis;
    },

    //拖动
    movePlayer:function (fthis,fnode) {
        fnode.on('touchmove',this.onTouchMove,fthis);
        fnode.on('touchend',this.onTouchEnd,fthis);
    },

    //拖动动作
    onTouchMove:function (e) {
        //节点跟随滑动
        let locationOfThisNodeParent = e.target.parent.convertToNodeSpaceAR(e.getLocation());
        e.target.position = locationOfThisNodeParent;
    },
    //拖动结束动作
    onTouchEnd:function (e) {
        // console.log(e.target.parent._children)
        if(PlayerActionTools.getCheweiDistance(e.target.parent.getChildByName("chewei"),e.target)< 30){
            e.target.runAction(PlayerActionTools.rotate(e.target._name));
        } else {
            var name = undefined;
            for (var i = 0;i<e.target.parent._children.length;i++){
                //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。如果要检索的字符串值没有出现，则该方法返回 -1。
                //判断Game下的所有子节点，筛选出角色节点
                if(e.target.parent._children[i]._name.indexOf("Player")!=-1&&e.target.parent._children[i]._name.indexOf("new")==-1){
                    //排除节点自身
                    if(e.target.pos!=e.target.parent._children[i].pos){
                        name = PlayerActionTools.mergePlayer(e.target,e.target.parent._children[i])
                    }
                    //角色合并成功
                    if(name!=undefined && name.indexOf("Player")!=-1){
                        Variable.mergeName = name;
                        PlayerActionTools.removeNode(e.target);
                        PlayerActionTools.removeNode(e.target.parent._children[i]);
                        return;
                    }else{
                       continue;
                    }
                }
            }
            //角色合并不成功
            if(name==undefined){
                for (var i = 0;i<Variable.position.length;i++){
                    if(i == e.target.pos){
                        e.target.runAction(cc.moveTo(0.5,Constant.prePosition[i]));
                        break;
                    }else {
                        continue;
                    }
                }
                return;
            }

        }
    },
    //角色绕圈动作
    rotate:function (name) {
        var speed = PlayerActionTools.getSpeed(name);
        //传的参数依次为：控制点1，控制点2，终点；（绝对坐标）
        var bezier1 = [cc.v2(0, 150), cc.v2(-300, 150), cc.v2(-300, 0)];
        var bezier2 = [cc.v2(0,-150 ), cc.v2(300, -150), cc.v2(300, 0)];
        var huxian1 = cc.bezierBy(speed, bezier1);
        var huxian2 = cc.bezierBy(speed, bezier2);
        var seq1 =cc.repeatForever(
            cc.sequence(
                cc.spawn(
                    huxian1,
                    cc.rotateBy(speed, -180)
                ),
                cc.moveTo(speed, -150, -150),
                cc.spawn(
                    huxian2,
                    cc.rotateBy(speed, -180),
                ),
                cc.moveTo(speed, 150, 150),
            ),
        );
        return seq1;
    },

    //获取角色节点和出发车位的距离
    getCheweiDistance:function(node1,node2) {
        // 根据 player 节点位置判断距离
        var cheweiPos = node1.getPosition();
        // 根据两点位置计算两点之间距离
        var dist = node2.position.sub(cheweiPos).mag();
        return dist;
    },

    //获取两节点间的x距离
    getXDistance:function(node1,node2){
        var position1 = node1.convertToWorldSpaceAR(node1.getPosition());
        var position2 = node2.convertToWorldSpaceAR(node2.getPosition());
        return position2.x-position1.x;
    },
    //获取两节点间的y距离
    getYDistance:function(node1,node2){
        var position1 = node1.convertToWorldSpaceAR(node1.getPosition());
        var position2 = node2.convertToWorldSpaceAR(node2.getPosition());
        return position2.y-position1.y;
    },

    //获取角色的速度
    getSpeed:function(name){
        if(name == "Player1"){
            return Constant.preSpeed[0];
        }else if(name == "Player2"){
            return Constant.preSpeed[1];
        }else if(name == "Player3"){
            return Constant.preSpeed[2];
        }
    },

    //角色合并
    mergePlayer:function (node1,node2) {
        if(node1._name==node2._name){
            var position1 = node1.convertToWorldSpaceAR(node1.getPosition());
            var position2 = node2.convertToWorldSpaceAR(node2.getPosition());
            if(position1.x<500&&position1.x>0&&position2.x<500&&position2.x>0
                &&position1.y<500&&position1.y>0&&position2.y<500&&position2.y>0){
                var pos = node1.getPosition();
                var dist = node2.position.sub(pos).mag();
                if(dist<10){
                    return PlayerActionTools.getMergePlayerName(node1._name);
                }
            }
        }
    },

    //获取角色合并后的角色名称
    getMergePlayerName:function (name) {
        if(name == "Player1"){
            return "Player2";
        }else if(name == "Player2"){
            return "Player3";
        }
    },

    //移除角色节点
    removeNode:function(node){
        Variable.position[node.pos] = 0;
        node.destroy();
    },

    //创建召回节点
    createRecallProcessor:function (fthis,prefab) {
        for(var i = 0;i<Variable.position.length;i++){
            if(Variable.position[i]!=0&&Variable.recallPosition[i]===0 ){
                var recallNode = PlayerActionTools.createRecall(fthis,prefab,Constant.prePosition[i]);
                Variable.recallPosition[i]= recallNode;
                recallNode.pos = i;
            }else if(Variable.position[i]==0&&Variable.recallPosition[i]!=0){
                Variable.recallPosition[i].destroy();
                Variable.recallPosition[i]= 0;
            }
        }
    },

    //创建召回节点
    createRecall:function (fthis,prefab,posotion) {
        // 使用给定的模板在场景中生成一个新节点
        var recall = cc.instantiate(prefab);
        // 将新增的节点添加到 Canvas 节点下面
        fthis.node.addChild(recall);
        // 设置一个位置
        recall.setPosition(posotion);
        //设置透明度
        recall.opacity = 120;
        //设置层级
        recall._localZOrder =10;
        // 在Player1组件上暂存 Game 对象的引用
        recall.getComponent(prefab._name).game = fthis;
        return recall;
    },

    //召回角色
    recallPlayer:function (i) {
        var playerNode = Variable.position[i];
        playerNode.setPosition(Constant.prePosition[i]);
        playerNode.stopAllActions();
        playerNode.rotation = 0;
    },
//得分以及得分音效
    gainScore: function () {
        Constant.score += 1;

        // 更新 scoreDisplay Label 的文字
        Variable.scoreDisplay.string = 'Score: ' + Constant.score;
        // // 播放得分音效
        cc.audioEngine.playEffect(Variable.scoreAudio, false);
    },
};

PlayerActionTools.load();
module.exports = PlayerActionTools;