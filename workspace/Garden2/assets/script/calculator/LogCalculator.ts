/*
 * @Author: ayue
 * @Date: 2021-02-01 14:32:01
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-01 17:31:09
 */

export class LogCalculator {
	// 单例
	private static _inst: LogCalculator;
	public static get inst() {
		return LogCalculator._inst || (LogCalculator._inst = new LogCalculator());
	}
	private log;

	public createLog() {
		this.log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
	}
	public info(msg) {
		if (this.log == null) {
			console.log("wxlog为空");
			return;
		}
		this.log.info(msg);
	}
}
export var logCalculator = LogCalculator.inst;
