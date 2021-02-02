/*
 * @Author: ayue
 * @Date: 2020-12-25 11:05:52
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-11 11:55:20
 */

import { rewardCalculator } from "../calculator/RewardCalculator";
import { adsCalculator } from "../calculator/AdsCalculator";

/**
 * 微信广告类
 */
export class WxAds {
	// 单例
	private static _inst: WxAds;
	public static get inst() {
		return WxAds._inst || (WxAds._inst = new WxAds());
	}

	public createVideoAd() {
		let videoAd = wx.createRewardedVideoAd({
			adUnitId: "adunit-97d79c620e54fee7",
		});
		videoAd.onError((err) => {
			console.log("创建video广告报错：");
			console.log(err);
			adsCalculator.setVideoAdNull();
		});
		videoAd.onClose((res) => {
			if (res && res.isEnded) {
				// 正常播放结束，可以下发游戏奖励
				console.log("广告成功");
				rewardCalculator.execute();
			} else {
				// 播放中途退出，不下发游戏奖励
				console.log("广告失败");
			}
		});
		return videoAd;
	}
	//视频广告
	public showVideoAd(videoAd) {
		// 用户触发广告后，显示激励视频广告
		videoAd.show().catch(() => {
			// 失败重试
			videoAd
				.load()
				.then(() => videoAd.show())
				.catch((err) => {
					console.log("激励视频 广告显示失败");
				});
		});
	}

	public createBannerAd() {
		let winSize = wx.getSystemInfoSync();
		let bannerWidth = 300;
		let bannerAd = wx.createBannerAd({
			adUnitId: "adunit-256c6c4d51b28192",
			adIntervals: 30,
			style: {
				left: (winSize.windowWidth - bannerWidth) / 2 + 0.1,
				top: winSize.windowHeight - 125,
				width: bannerWidth,
			},
		});
		bannerAd.onError((err) => {
			console.log("创建banner广告报错：");
			console.log(err);
			adsCalculator.setBannerAdNull();
		});
		return bannerAd;
	}

	public showBannerAd(bannerAd) {
		bannerAd.show();
	}
	public hideBannerAd(bannerAd) {
		bannerAd.hide();
	}
	public destroyBannerAd(bannerAd) {
		bannerAd.destroy();
		bannerAd = null;
	}

	public createGridAd() {
		let winSize = wx.getSystemInfoSync();
		let bannerWidth = 300;
		let gridAd = wx.createGridAd({
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
		gridAd.onError((err) => {
			console.log("创建grid广告报错：");
			console.log(err);
			adsCalculator.setGridAdNull();
		});
		return gridAd;
	}
	public showGridAd(gridAd) {
		gridAd.show();
	}
	public hideGridAd(gridAd) {
		gridAd.hide();
	}
	public destroyGridAd(gridAd) {
		gridAd.destroy();
		gridAd == null;
	}
}
export var wxAds = WxAds.inst;
