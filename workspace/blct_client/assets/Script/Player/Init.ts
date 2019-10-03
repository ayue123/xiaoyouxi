import { cmdManager } from "../Core/Cmd/CmdManager";
import Response from "../Core/Cmd/Protocol/Response";
import Response1001 from "../Core/Cmd/Protocol/Response1001";
import Request from "../Core/Cmd/Protocol/Request";
import Request1001 from "../Core/Cmd/Protocol/Request1001";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Init extends cc.Component {
    onLoad () {
        console.log("ddddddddddd")
    }

    start() {
        let response1001: Response1001 = new Response1001();
        response1001.userId=("ssss");
        response1001.name=("sss");
        cmdManager.executeResponse(1001, response1001,this.exe1001);
    }

    exe1001(request: Request) {
        let request1001: Request1001 = <Request1001>request;
        console.log(request1001.playerId);
    }
}
