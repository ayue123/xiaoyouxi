/*
 * @Author: ayue
 * @Date: 2021-02-02 16:59:14
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-02 19:05:17
 */

import { wxLog } from "./WxLog";

export class WxData {
	// 单例
	private static _inst: WxData;
	public static get inst() {
		return WxData._inst || (WxData._inst = new WxData());
	}

	public setData(key: string, data: any) {
		if (key == null || key == undefined || key == "") {
			return;
		}
		if (data == null || data == undefined) {
			return;
		}
		try {
			wx.setStorageSync(key, data);
		} catch (err) {
			wxLog.error("数据存储异常:" + JSON.stringify(err));
		}
	}
	public getData(key: string): any {
		if (key == null || key == undefined || key == "") {
			return;
		}
		try {
			let data = wx.getStorageSync(key);
			//当没有数据是data!=null
			if (data || data == 0 || data == false) {
				return data;
			}
		} catch (err) {
			wxLog.error("读取数据异常:" + JSON.stringify(err));
		}
	}
	public clearData() {
		try {
			wx.clearStorageSync();
		} catch (err) {
			wxLog.error("清除数据缓存异常:" + JSON.stringify(err));
		}
	}
}
export var wxData = WxData.inst;
