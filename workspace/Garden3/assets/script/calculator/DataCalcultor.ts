/*
 * @Author: ayue
 * @Date: 2021-02-03 10:52:47
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-03 11:23:14
 */

import { wxData } from "../sdks/weixin/WxData";

export class DataCalculator {
	// 单例
	private static _inst: DataCalculator;
	public static get inst() {
		return (
			DataCalculator._inst || (DataCalculator._inst = new DataCalculator())
		);
	}
	public getData(key: string) {
		if (key == null || key == undefined || key == "") {
			return;
		}
		if (typeof wx != "undefined" && wx != null) {
			wxData.getData(key);
		}
	}
	public setData(key: string, data: any) {
		if (key == null || key == undefined || key == "") {
			return;
		}
		if (data == null || data == undefined) {
			return;
		}
		if (typeof wx != "undefined" && wx != null) {
			wxData.setData(key, data);
		}
	}
	public clearData() {
		if (typeof wx != "undefined" && wx != null) {
			wxData.clearData();
		}
	}
}
export var dataCalculator = DataCalculator.inst;
