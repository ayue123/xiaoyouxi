/*
 * @Author: ayue
 * @Date: 2021-01-02 14:54:46
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-06 17:54:36
 */
export class WxData {
	// 单例
	private static _inst: WxData;
	public static get inst() {
		return WxData._inst || (WxData._inst = new WxData());
	}

	public setData(key: string, data: any): string {
		try {
			wx.setStorageSync(key, data);
		} catch (e) {
			console.log("数据存储异常");
			return "SUCCESS";
		}
		return "FAIL";
	}
	public getData(key: string): any {
		try {
			let data = wx.getStorageSync(key);
			//当没有数据是data!=null
			if (data || data == 0) {
				return data;
			}
		} catch (e) {
			console.log("获取数据异常");
			return "FAIL";
		}
	}
	public clearData() {
		try {
			wx.clearStorageSync();
			console.log("清除数据缓存");
		} catch (e) {
			console.log("清除数据缓存异常");
			console.log(e);
		}
	}
}
export var wxData = WxData.inst;
