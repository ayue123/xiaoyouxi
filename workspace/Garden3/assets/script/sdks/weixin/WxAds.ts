/*
 * @Author: ayue
 * @Date: 2021-02-02 11:47:16
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-04 14:48:17
 */

import { rewardCalculator } from "../../calculator/RewardCalculator";
import { wxLog } from "./WxLog";

export class WxAds {
	// 单例
	private static _inst: WxAds;
	public static get inst() {
		return WxAds._inst || (WxAds._inst = new WxAds());
	}

	private videoAd = null;
	private bannerAd = null;
	private gridAd = null;
	private bgAdCount = 0;

	public showVideoAd() {
		if (this.videoAd == null) {
			this.createVideoAd();
		}
		// 用户触发广告后，显示激励视频广告
		this.videoAd.show().catch(() => {
			// 失败重试
			this.videoAd
				.load()
				.then(() => this.videoAd.show())
				.catch((err) => {
					wxLog.error("视频激励广告播放异常:" + JSON.stringify(err));
				});
		});
	}

	public showBGAd() {
		if (this.bgAdCount % 2 == 0) {
			if (this.bannerAd == null) {
				this.showGridAd();
			} else {
				this.showBannerAd();
			}
		} else {
			if (this.gridAd == null) {
				this.showBannerAd();
			} else {
				this.showGridAd();
			}
		}
		this.bgAdCount++;
	}

	public resetBGAd() {
		if (this.bannerAd != null) {
			this.destroyBannerAd();
		}
		if (this.gridAd != null) {
			this.destroyGridAd();
		}
		this.createBannerAd();
		this.createGridAd();
	}

	public initAds() {
		if (this.videoAd == null) {
			this.createVideoAd();
		}
		if (this.bannerAd == null) {
			this.createBannerAd();
		}
		if (this.gridAd == null) {
			this.createGridAd();
		}
	}
	private createVideoAd() {
		this.videoAd = wx.createRewardedVideoAd({
			adUnitId: "adunit-97d79c620e54fee7",
		});
		this.videoAd.onError((err) => {
			this.videoAd = null;
			wxLog.error("创建video广告异常:" + JSON.stringify(err));
		});
		this.videoAd.onClose((res) => {
			if (res && res.isEnded) {
				// 正常播放结束，可以下发游戏奖励
				rewardCalculator.adsRewardExe();
			} else {
				// 播放中途退出，不下发游戏奖励
			}
		});
	}
	private createBannerAd() {
		let winSize = wx.getSystemInfoSync();
		let bannerWidth = 300;
		this.bannerAd = wx.createBannerAd({
			adUnitId: "adunit-256c6c4d51b28192",
			adIntervals: 30,
			style: {
				left: (winSize.windowWidth - bannerWidth) / 2 + 0.1,
				top: winSize.windowHeight - 125,
				width: bannerWidth,
			},
		});
		this.bannerAd.onError((err) => {
			this.bannerAd = null;
			wxLog.error("创建banner广告异常:" + JSON.stringify(err));
		});
	}
	private createGridAd() {
		let winSize = wx.getSystemInfoSync();
		let bannerWidth = 300;
		this.gridAd = wx.createGridAd({
			adUnitId: "adunit-7251b4e0447f7c50",
			adTheme: "white",
			adIntervals: 30,
			gridCount: 5,
			style: {
				left: (winSize.windowWidth - bannerWidth) / 2 + 0.1,
				top: winSize.windowHeight - 125,
				width: bannerWidth,
				opacity: 0.8,
			},
		});
		this.gridAd.onError((err) => {
			this.gridAd = null;
			wxLog.error("创建grid广告异常:" + JSON.stringify(err));
		});
	}

	private showBannerAd() {
		this.bannerAd.show();
	}
	private showGridAd() {
		this.gridAd.show();
	}

	private hideBannerAd() {
		this.bannerAd.hide();
	}
	private hideGridAd() {
		this.gridAd.hide();
	}
	private destroyVideoAd() {
		this.videoAd.destroy();
		this.videoAd = null;
	}
	private destroyBannerAd() {
		this.bannerAd.destroy();
		this.bannerAd = null;
	}
	private destroyGridAd() {
		this.gridAd.destroy();
		this.gridAd == null;
	}
}
export var wxAds = WxAds.inst;
