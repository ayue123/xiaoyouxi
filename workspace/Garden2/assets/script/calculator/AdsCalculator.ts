/*
 * @Author: ayue
 * @Date: 2020-12-28 16:22:32
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-08 14:18:21
 */

import { REWARD_TYPE_MONEY } from "../config/AdsConfig";
import { wxAds } from "../ad/WxAds";
import { TIP_TYPE_NO_VIDEO } from "../config/TipConfig";
import { tipCalculator } from "./TipCalculatot";

/**
 * 微信广告类
 */
export class AdsCalculator {
	// 单例
	private static _inst: AdsCalculator;
	public static get inst() {
		return AdsCalculator._inst || (AdsCalculator._inst = new AdsCalculator());
	}
	private videoAd = null;
	private videoRewardType = REWARD_TYPE_MONEY;
	private bannerAd = null;
	private gridAd = null;
	private bannerCount: number = 0;

	public setVideoAdNull() {
		this.videoAd = null;
	}
	public setBannerAdNull() {
		this.bannerAd = null;
	}
	public setGridAdNull() {
		this.gridAd = null;
	}

	public createVideoAd() {
		if (this.videoAd == null) {
			this.videoAd = wxAds.createVideoAd();
		}
	}

	public showVideoAd(videoRewardType: number) {
		if (this.videoAd != null) {
			this.videoRewardType = videoRewardType;
			wxAds.showVideoAd(this.videoAd);
		} else {
			tipCalculator.updateLabel(TIP_TYPE_NO_VIDEO);
		}
	}
	public getVideoRewardType(): number {
		return this.videoRewardType;
	}

	public createBannerAd() {
		if (this.bannerAd == null) {
			this.hideBannerAd();
			this.bannerAd = wxAds.createBannerAd();
		}
	}
	public showPageAd() {
		if (Math.ceil(this.bannerCount % 2) == 0) {
			if (!this.showBannerAd()) {
				this.showGridAd();
			}
		} else {
			if (!this.showGridAd()) {
				this.showBannerAd();
			}
		}
		this.bannerCount++;
	}

	private showBannerAd(): boolean {
		if (this.bannerAd != null) {
			wxAds.showBannerAd(this.bannerAd);
			return true;
		}
		return false;
	}

	public hidePageAd() {
		this.hideBannerAd();
		this.hideGridAd();
	}
	private hideBannerAd() {
		if (this.bannerAd != null) {
			wxAds.hideBannerAd(this.bannerAd);
		}
	}
	public createGridAd() {
		if (this.gridAd == null) {
			this.hideGridAd();
			this.gridAd = wxAds.createGridAd();
		}
	}
	private showGridAd(): boolean {
		if (this.gridAd != null) {
			wxAds.showGridAd(this.gridAd);
			return true;
		}
		return false;
	}
	private hideGridAd() {
		if (this.gridAd != null) {
			wxAds.hideGridAd(this.gridAd);
		}
	}

	timerExecute() {
		try {
			this.createVideoAd();
			this.createBannerAd();
			this.createGridAd();
		} catch (error) {
			console.log("广告加载异常");
		}
	}
}
export var adsCalculator = AdsCalculator.inst;
