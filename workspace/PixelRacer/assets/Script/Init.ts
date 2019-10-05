const {ccclass, property} = cc._decorator;

@ccclass
export default class Init extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;


    start () {
        // init logic
        this.label.string = "100";
    }


    moveBlock(){
        
    }
}
