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

    start() {
        if (typeof wx === 'undefined') {
            return;
        }

        wx.onMessage(data => {
            for (var i = 0; i < this.content.children.length; i++) {
                var reduceNode = this.content.children[i];
                reduceNode.destroy();
            }
            if (data.type == 'friendRank') {
                this.initTips();
                this.initUserScoreInfo();
                this.initFriendRankInfo();
            } else if (data.type == 'updateMaxScore') {
                this.updateUserMaxScore;
            } else if (data.type == 'playerRank') {
                this.initTips();
                this.intiPlayerRank(data.message);
            }
        });
    },


    initTips() {
        let renderTypeStr = 'Canvas';
        if (cc.game.renderType === cc.game.RENDER_TYPE_WEBGL) {
            renderTypeStr = 'WEBGL';
        }
    },
    updateUserMaxScore() {
        this.userRankInfo.children.destroy();
    },
    //初始化自己信息
    initUserInfo() {
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
    addUserInfo(user) {
        if (this.userRankInfo.children.length <= 0) {
            let node = cc.instantiate(this.prefab);
            node.parent = this.userRankInfo;
        }
        let node = this.userRankInfo.children[0];
        node.x = 0;
        // set nickName
        let userName = node.getChildByName('userName').getComponent(cc.Label);
        userName.string = user.nickName || user.nickname;

        // set avatar
        cc.loader.load({ url: user.avatarUrl, type: 'png' }, (err, texture) => {
            if (err) console.error(err);
            let userIcon = node.getChildByName('mask').children[0].getComponent(cc.Sprite);
            userIcon.spriteFrame = new cc.SpriteFrame(texture);
        });

    },

    //获取自己的数据
    initUserScoreInfo() {
        this.initUserInfo();
        wx.getUserCloudStorage({
            keyList: ['score'], // 你要获取的、托管在微信后台都key
            success: res => {
                this.addScore(res.KVDataList[0].value);
            }
        });
    },


    //自己分数渲染
    addScore(myselfScore) {
        if (this.userRankInfo.children.length <= 0) {
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
    initFriendRankInfo() {
        wx.getFriendCloudStorage({
            keyList: ["score"], // 你要获取的、托管在微信后台都key
            success: res => {
                let userArr = this.rankUserScore(res);
                for (let i = 0; i < userArr.length; ++i) {
                    this.createUserBlock(userArr[i]);
                }
            }
        });
    },
    //排行榜渲染
    createUserBlock(user) {
        let node = cc.instantiate(this.prefab);
        node.parent = this.content;
        node.x = 0;
        // set nickName
        let userName = node.getChildByName('userName').getComponent(cc.Label);
        userName.string = user.nickName || user.nickname;

        // set avatar
        cc.loader.load({ url: user.avatarUrl, type: 'png' }, (err, texture) => {
            if (err) console.error(err);
            let userIcon = node.getChildByName('mask').children[0].getComponent(cc.Sprite);
            userIcon.spriteFrame = new cc.SpriteFrame(texture);
        });

        //set score
        let score = node.getChildByName('score').getComponent(cc.Label);
        score.string = user.KVDataList[0].value || 0;
    },
    //排行榜排序
    rankUserScore(res) {
        let userArr = [];
        for (let i = 0; i < res.data.length; ++i) {
            userArr.push(res.data[i]);
        }
        userArr.sort(this.rank);
        return userArr;
    },
    //排序算法
    rank(usera, userb) {
        return userb.KVDataList[0].value - usera.KVDataList[0].value;
    },
    //全服排行榜渲染
    intiPlayerRank(datamessage) {
        let ranMap = JSON.parse(datamessage)
        for (var key in ranMap) {
            let value = ranMap[key];
            let arr = key.split("*");
            let rankInfo = new Object();
            rankInfo.nickName = arr[0].split("\"")[1];
            rankInfo.avatarUrl = arr[1].split("\"")[0];
            rankInfo.score = value;
            this.createPlayerRankBlock(rankInfo);
        }
    },

    //全服排行榜渲染
    createPlayerRankBlock(rankInfo) {
        let node = cc.instantiate(this.prefab);
        node.parent = this.content;
        node.x = 0;
        // set nickName
        let userName = node.getChildByName('userName').getComponent(cc.Label);
        userName.string = rankInfo.nickName;

        // set avatar
        cc.loader.load({ url: rankInfo.avatarUrl, type: 'png' }, (err, texture) => {
            if (err) console.error(err);
            let userIcon = node.getChildByName('mask').children[0].getComponent(cc.Sprite);
            userIcon.spriteFrame = new cc.SpriteFrame(texture);
        });

        //set score
        let score = node.getChildByName('score').getComponent(cc.Label);
        score.string = rankInfo.score;
    },

});
