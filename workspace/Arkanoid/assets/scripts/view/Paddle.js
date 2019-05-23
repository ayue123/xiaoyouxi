/*
 * @Author: ayue 
 * @Date: 2019-03-30 20:20:49 
 * @Last Modified by: ayue
 * @Last Modified time: 2019-05-22 10:40:08
 */
cc.Class({
    extends: cc.Component,

    onLoad: function () {
        this.node.parent.on("touchmove", (event) => {
            //将世界坐标转化为本地坐标
            let touchPoint = this.node.parent.convertToNodeSpace(event.getLocation());
            if(touchPoint.x<70){
                this.node.x =70;
            }else if(touchPoint.x>650){
                this.node.x =650;
            }else{
                this.node.x = touchPoint.x;
            }
        });
    },

    init() {
        this.node.x = 360;
    },

});