cc.Class({
    extends: cc.Component,

    properties: {
        padding: 0,
        spacing: 0,
        cols: 0,
        brickPrefab: cc.Prefab,
        bricksNumber: 0,
    },

    init(bricksNumber,levelOnePosition) {
        this.node.removeAllChildren();
        this.bricksNumber = bricksNumber;
        for (let i = 0; i < this.bricksNumber; i++) {
            for(let j = 0; j<levelOnePosition.length;j++){
                if(i ==levelOnePosition[j] ){
                    let brickNode = cc.instantiate(this.brickPrefab);
                    brickNode.parent = this.node;
                    if(i%4 == 0){
                        brickNode.color = cc.color(0,0,255)
                    } else if(i%4 == 1){
                        brickNode.color = cc.color(0,255,255)
                    }else if(i%4 == 2){
                        brickNode.color = cc.color(255,182,193)
                    }else {
                        brickNode.color = cc.color(255,255,0)
                    }
                    brickNode.x = this.padding + (i % this.cols) * (brickNode.width + this.spacing) + brickNode.width / 2;
                    brickNode.y = -this.padding - Math.floor(i / this.cols) * (brickNode.height + this.spacing) - brickNode.height / 2;
                }
            }
        }
    }
});