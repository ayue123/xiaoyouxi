cc.Class({
    extends: cc.Component,

    properties: {
        gameCtl:undefined,
    },

    init(gameCtl,position) {
        this.gameCtl = gameCtl;
        this.node.position = position;//初始化位置
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(500,500);//初始化速度
        this.gameCtl.allBall.push(this.node);
    },

    // newInit(gameCtl,position){
    //     this.gameCtl = gameCtl;
    //     this.node.position = cc.v2(360,270);//初始化位置
    //     this.getComponent(cc.RigidBody).linearVelocity = cc.v2(500,500);//初始化速度
    // },
    // initGamCtl(gameCtl){
    //     this.gameCtl = gameCtl;
    // },
    initSkillBall(gameCtl,position,about){
        this.gameCtl = gameCtl;
        if(about === "left"){
            this.node.x = position.x-40;//初始化位置
        }else{
            this.node.x = position.x+40;//初始化位置
        }
        this.node.y = position.y;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,1000);//初始化速度
        this.gameCtl.allSkillBall.push(this.node);
    },
    onBeginContact(contact, self, other) {
            switch (other.tag) {
                case 1://球碰到砖块
                    this.gameCtl.onBallContactBrick(self.node, other.node);
                    if(self.node.isSkill == 1){
                        this.gameCtl.destroySkillBall(self.node);
                    }
                    break;
                case 2://球碰到地面
                    this.gameCtl.onBallContactGround(self.node, other.node);
                    break;
                case 3://球碰到托盘
                    this.gameCtl.onBallContactPaddle(self.node, other.node);
                    break;
                case 4://球碰到墙
                    this.gameCtl.onBallContactWall(self.node, other.node);
                    if(self.node.isSkill == 1){
                        this.gameCtl.destroySkillBall(self.node);
                    }
                    break;
            }
    },
});