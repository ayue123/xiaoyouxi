/*
 * @Author: ayue
 * @Date: 2021-02-03 10:52:47
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-03 11:17:09
 */

import { wxLog } from "../sdks/weixin/WxLog";

export class LogCalculator {
	// 单例
	private static _inst: LogCalculator;
	public static get inst() {
		return LogCalculator._inst || (LogCalculator._inst = new LogCalculator());
	}
	public createLog() {
		if (typeof wx != "undefined" && wx != null) {
			wxLog.createLog();
		}
	}
	public info(msg) {
		if (typeof wx != "undefined" && wx != null) {
			wxLog.info(msg);
		}
	}
	public warn(msg) {
		if (typeof wx != "undefined" && wx != null) {
			wxLog.warn(msg);
		}
	}
	public error(msg) {
		if (typeof wx != "undefined" && wx != null) {
			wxLog.error(msg);
		}
	}
	public setFilterMsg(msg) {
		if (msg == null || msg == undefined || msg == "") {
			return;
		}
		if (typeof wx != "undefined" && wx != null) {
			wxLog.setFilterMsg(msg);
		}
	}
	public addFilterMsg(msg) {
		if (msg == null || msg == undefined || msg == "") {
			return;
		}
		if (typeof wx != "undefined" && wx != null) {
			wxLog.addFilterMsg(msg);
		}
	}
}
export var logCalculator = LogCalculator.inst;
