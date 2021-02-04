/*
 * @Author: ayue
 * @Date: 2021-02-03 10:52:47
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-04 14:49:40
 */

import { wxAds } from "../sdks/weixin/WxAds";

export class AdsCalculator {
	// 单例
	private static _inst: AdsCalculator;
	public static get inst() {
		return AdsCalculator._inst || (AdsCalculator._inst = new AdsCalculator());
	}
	public initAds() {
		if (typeof wx != "undefined" && wx != null) {
			wxAds.initAds();
		}
	}
	public showVideoAd() {
		if (typeof wx != "undefined" && wx != null) {
			wxAds.showVideoAd();
		}
	}
	public showBGAd() {
		if (typeof wx != "undefined" && wx != null) {
			wxAds.showBGAd();
		}
	}
	public resetBGAd() {
		if (typeof wx != "undefined" && wx != null) {
			wxAds.resetBGAd();
		}
	}
}
export var adsCalculator = AdsCalculator.inst;
