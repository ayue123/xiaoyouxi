cc.Class({
    extends: cc.Component,

    properties: {
        padding: 0,
        spacing: 0,
        cols: 0,
        brickPrefab1: cc.Prefab,
    },

    //绘制砖块
    init(bricksNumber,levelPosition,levelSilveryPosition) {

        this.node.removeAllChildren();
        this.bricksNumber = bricksNumber;
        for (let i = 0; i < this.bricksNumber; i++) {
            for(let j = 0; j<levelPosition.length;j++){
                if(i ==levelPosition[j] ){
                    let brickNode = cc.instantiate(this.brickPrefab1);
                    // brickNode.color = cc.color(8,186,255);//浅蓝色
                    // brickNode.color = cc.color(255,255,0);//黄绿
                    // brickNode.color = cc.color(0,255,255);//淡蓝色
                    // brickNode.color = cc.color(0,0,255);//深蓝
                    // brickNode.color = cc.color(255,180,190)//银色
                    if(levelSilveryPosition.length<=0){
                        if(i%4 == 0){
                            //let和var作用域区别：
                            //let块作用域，var在加载时就会提前到最前边，所以可以在块外起作用
                        } else if(i%4 == 1){
                            brickNode.color = cc.color(209,10,247)//紫
                        }else if(i%4 == 2){
                            brickNode.color = cc.color(20,255,10)//绿
                        }else {
                            brickNode.color = cc.color(255,0,0);//红
                        }
                        brickNode.life = 1;
                    }else{
                        for(let a=0;a<levelSilveryPosition.length;a++){
                            if(i==levelSilveryPosition[a]){
                                brickNode.color = cc.color(50,100,255);//淡蓝色
                                //设置砖块生命值
                                brickNode.life = 5;
                                break;
                            }else{
                                if(i%4 == 0){
                                    //let和var作用域区别：
                                    //let块作用域，var在加载时就会提前到最前边，所以可以在块外起作用
                                } else if(i%4 == 1){
                                    brickNode.color = cc.color(209,10,247)//紫
                                }else if(i%4 == 2){
                                    brickNode.color = cc.color(20,255,10)//绿
                                }else {
                                    brickNode.color = cc.color(255,0,0);//红
                                }
                                brickNode.life = 1;
                            }
                        }
                    }
                    brickNode.parent = this.node;
                    //设置砖块坐标位置
                    brickNode.pos = levelPosition[j];

                    brickNode.x = this.padding + (i % this.cols) * (brickNode.width + this.spacing) + brickNode.width / 2;
                    brickNode.y = -this.padding - Math.floor(i / this.cols) * (brickNode.height + this.spacing) - brickNode.height / 2;
                }
            }
        }
    },
    //更新砖块为有碰撞回调，无碰撞效果
    updateBrickSensorTrue(){
        for(let i =0;i<this.node.children.length;i++){
            let beforeNode = this.node.children[i];
            if(beforeNode._name == "Brick"){
                if(beforeNode.life<5){
                    let collider = beforeNode.getComponent(cc.PhysicsBoxCollider);
                    collider.sensor = true;
                    collider.apply()
                }
            }
        }
    },
    //更新砖块为有碰撞回调，有碰撞效果
    updateBrickSensorFalse(){
        for(let i =0;i<this.node.children.length;i++){
            let beforeNode = this.node.children[i];
            if(beforeNode._name == "Brick"){
                if(beforeNode.life<5){
                    let collider = beforeNode.getComponent(cc.PhysicsBoxCollider);
                    collider.sensor = false;
                    collider.apply()
                }
            }
        }
    },

});