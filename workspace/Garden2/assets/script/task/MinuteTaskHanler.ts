/*
 * @Author: ayue
 * @Date: 2020-12-29 11:31:08
 * @Last Modified by: ayue
 * @Last Modified time: 2020-12-29 11:34:46
 */

import { adsCalculator } from "../calculator/AdsCalculator";

/**
 * 时间处理类
 */
export class MinuteTaskHandler {
	// 单例
	private static _inst: MinuteTaskHandler;
	public static get inst() {
		if (MinuteTaskHandler._inst == null) {
			MinuteTaskHandler._inst = new MinuteTaskHandler();
		}
		return MinuteTaskHandler._inst;
	}

	execute() {
		adsCalculator.timerExecute();
	}
}
export var minuteTaskHandler = MinuteTaskHandler.inst;
