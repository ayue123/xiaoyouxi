/*
 * @Author: ayue
 * @Date: 2020-12-12 16:52:39
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-01 14:46:55
 */

import { Start } from "./Start";
import { secondTaskHandler } from "./task/SecondTaskHandler";
import { assetManager } from "./controller/Assetmanager";
import { minuteTaskHandler } from "./task/MinuteTaskHanler";

const { ccclass, property } = cc._decorator;
/**
 * 项目入口类
 */
@ccclass
export default class Main extends cc.Component {
	onLoad() {
		assetManager.loadJson();
		//资源初始化加载
		assetManager.loadDir(this.postLoadDir);
		//开启物理引擎
		cc.director.getPhysicsManager().enabled = true;
	}

	start() {
		//定时任务
		this.schedule(function () {
			secondTaskHandler.execute();
		}, 1);
		this.schedule(function () {
			minuteTaskHandler.execute();
		}, 60);
	}

	//资源加载结束调用
	postLoadDir() {
		let start: Start = new Start();
		start.gameStart();
	}
}
