/*
 * @Author: ayue
 * @Date: 2020-12-12 16:52:39
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-04 14:55:05
 */

import { Start } from "./Start";
import { assetManager } from "./controller/Assetmanager";
import { timerTaskHandler } from "./timer/TimerTaskManager";

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
			timerTaskHandler.secondExecute();
		}, 1);
		this.schedule(function () {
			timerTaskHandler.minuteExecute();
		}, 60);
	}
	//资源加载结束调用
	postLoadDir() {
		let start: Start = new Start();
		start.gameStart();
	}
}
