// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import Request1001 from "./Protocol/Request1001";
import Response1001 from "./Protocol/Response1001";
import Response from "./Protocol/Response";
import Request from "./Protocol/Response";
import { CNet } from "../Net/Network"

export interface CmdObject {
    callBack: Function;
}

export interface CmdArr {
    [protocol: number]: CmdObject[];
}

export class CmdManager {
    // 单例
    private static _inst: CmdManager;
    public static get inst() {
        return CmdManager._inst || (CmdManager._inst = new CmdManager());
    }

    private m_events: CmdArr = {};

    executeResponse(protocol: number, response: Response, callBack: Function) {
        if (!this.m_events[protocol]) {
            this.m_events[protocol] = [];
        }
        let cmdObject: CmdObject = { callBack };
        this.m_events[protocol].push(cmdObject);
        let data: string = JSON.stringify(response);
        CNet.send(protocol, data);
    }

    executeRequest(data: string) {
        let splitted = data.split("-");
        let cmdId = splitted[0];
        let message = splitted[1];
        let request: Request = JSON.parse(message);
        let cmdObject = this.m_events[cmdId];
        for(let i=0;i<cmdObject.length;i++){
            cmdObject[i].callBack.call(cmdObject[i].callBack,request);
        }

    }

}
export var cmdManager = CmdManager.inst;