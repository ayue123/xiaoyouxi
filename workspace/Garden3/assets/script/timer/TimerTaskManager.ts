/*
 * @Author: ayue
 * @Date: 2021-02-04 14:27:57
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-04 14:41:03
 */

import { IMinuteExecute, ISecondExecute } from "./ITaskExecuter";

/**
 * 时间处理类
 */
export class TimerTaskHandler {
	// 单例
	private static _inst: TimerTaskHandler;
	public static get inst() {
		if (TimerTaskHandler._inst == null) {
			TimerTaskHandler._inst = new TimerTaskHandler();
		}
		return TimerTaskHandler._inst;
	}
	private secondCount;
	private minuteCount;
	private secondHandlers: Array<ISecondExecute> = new Array<ISecondExecute>();
	private minuteHandlers: Array<IMinuteExecute> = new Array<IMinuteExecute>();
	public addSecondHandler(secondHandler) {
		this.secondHandlers.push(secondHandler);
	}
	public addMinuteHandler(minuteHandler) {
		this.minuteHandlers.push(minuteHandler);
	}
	secondExecute() {
		for (let i = 0; i < this.secondHandlers.length; i++) {
			this.secondHandlers[i].execute(this.secondCount);
		}
		this.secondCount++;
	}
	minuteExecute() {
		for (let i = 0; i < this.minuteHandlers.length; i++) {
			this.minuteHandlers[i].execute(this.minuteCount);
		}
		this.minuteCount++;
	}
}
export var timerTaskHandler = TimerTaskHandler.inst;
