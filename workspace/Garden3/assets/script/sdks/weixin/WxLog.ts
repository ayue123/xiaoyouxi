/*
 * @Author: ayue
 * @Date: 2021-02-02 11:48:07
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-02 15:56:19
 */

export class WxLog {
	// 单例
	private static _inst: WxLog;
	public static get inst() {
		return WxLog._inst || (WxLog._inst = new WxLog());
	}
	private log;

	public createLog() {
		this.log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
	}
	public info(msg) {
		if (this.log == null) {
			return;
		}
		this.log.info(msg);
	}
	public warn(msg) {
		if (this.log == null) {
			return;
		}
		this.log.warn(msg);
	}
	public error(msg) {
		if (this.log == null) {
			return;
		}
		this.log.error(msg);
	}
	public setFilterMsg(msg: string) {
		if (this.log == null) {
			return;
		}
		if (msg == null || msg == undefined || msg == "") {
			return;
		}
		this.log.setFilterMsg(msg);
	}
	public addFilterMsg(msg: string) {
		if (this.log == null) {
			return;
		}
		if (msg == null || msg == undefined || msg == "") {
			return;
		}
		this.log.addFilterMsg(msg);
	}
}
export var wxLog = WxLog.inst;
