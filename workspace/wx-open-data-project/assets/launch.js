//
// api: https://developers.weixin.qq.com/minigame/dev/document/open-api/data/wx.getUserInfo.html
//
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        prefab: cc.Prefab,
        userRankInfo: cc.Node,
    },

    start () {

        if (typeof wx === 'undefined') {
            return;
        }

        wx.onMessage( data => {
            for(var i = 0;i<this.content.children.length;i++){
                var reduceNode = this.content.children[i];
                reduceNode.destroy();
            }
            if (data.message) {
                console.log(data.message);
                this.initTips();
                this.initUserScoreInfo();
                this.initFriendRankInfo();
            }
            if(data.type =='updateMaxScore'){
                console.log("ddd")
               this.updateUserMaxScore;
            }
        });
    },


    initTips () {
        let renderTypeStr = 'Canvas';
        if (cc.game.renderType === cc.game.RENDER_TYPE_WEBGL) {
            renderTypeStr = 'WEBGL';
        }
    },
    updateUserMaxScore(){
        this.userRankInfo.children.destroy();
    },
    //初始化自己信息
    initUserInfo () {
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            lang: 'zh_CN',
            success: (res) => {
                this.addUserInfo(res.data[0]);
            },

            fail: (res) => {
                console.error(res);
            }
        });
    },

    //添加玩家头像名字
    addUserInfo(user){
        console.log(this.userRankInfo.children)
        console.log(this.userRankInfo.children.length)
        if(this.userRankInfo.children.length<=0) {
            let node = cc.instantiate(this.prefab);
            node.parent = this.userRankInfo;
        }
        let node = this.userRankInfo.children[0];
        node.x = 0;
        // set nickName
        let userName = node.getChildByName('userName').getComponent(cc.Label);
        userName.string = user.nickName || user.nickname;

        // set avatar
        cc.loader.load({url: user.avatarUrl, type: 'png'}, (err, texture) => {
            if (err) console.error(err);
            let userIcon = node.getChildByName('mask').children[0].getComponent(cc.Sprite);
            userIcon.spriteFrame = new cc.SpriteFrame(texture);
        });

    },

    //获取自己的数据
    initUserScoreInfo(){
        this.initUserInfo();
        wx.getUserCloudStorage({
            keyList: ['score'], // 你要获取的、托管在微信后台都key
            success: res => {
                this.addScore(res.KVDataList[0].value);
            }
        });
    },


    //自己分数渲染
    addScore (myselfScore) {
        if(this.userRankInfo.children.length<=0) {
            let node = cc.instantiate(this.prefab);
            node.parent = this.userRankInfo;
        }
        let node = this.userRankInfo.children[0];
        //set score
        let score = node.getChildByName('score').getComponent(cc.Label);
        score.string = myselfScore || 0;
    },

    // //初始化好友信息
    // initFriendInfo () {
    //     wx.getFriendCloudStorage({
    //         success: (res) => {
    //             for (let i = 0; i < res.data.length; ++i) {
    //                 this.createUserBlock(res.data[i]);
    //             }
    //         },
    //         fail: (res) => {
    //             console.error(res);
    //         }
    //     });
    // },
//获取好友排行榜
    initFriendRankInfo(){
        wx.getFriendCloudStorage({
            keyList: ["score"], // 你要获取的、托管在微信后台都key
            success: res => {
                for (let i = 0; i < res.data.length; ++i) {
                    this.createUserBlock(res.data[i]);
                }
            }
        });
    },
    //排行榜渲染
    createUserBlock (user) {
        let node = cc.instantiate(this.prefab);
        node.parent = this.content;
        node.x = 0;
        // set nickName
        let userName = node.getChildByName('userName').getComponent(cc.Label);
        userName.string = user.nickName || user.nickname;

        // set avatar
        cc.loader.load({url: user.avatarUrl, type: 'png'}, (err, texture) => {
            if (err) console.error(err);
            let userIcon = node.getChildByName('mask').children[0].getComponent(cc.Sprite);
            userIcon.spriteFrame = new cc.SpriteFrame(texture);
        });

        //set score
        let score = node.getChildByName('score').getComponent(cc.Label);
        score.string = user.KVDataList[0].value || 0;
    },

});
