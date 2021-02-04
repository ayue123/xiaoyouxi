/*
 * @Author: ayue
 * @Date: 2020-12-12 16:52:46
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-04 14:55:55
 */

import { adsCalculator } from "./calculator/AdsCalculator";
import { AdsTaskHandler } from "./timer/timerTaskHandler/AdsTaskHandler";

const { ccclass, property } = cc._decorator;
/**
 * 启动初始化类
 */
@ccclass
export class Start {
	public gameStart() {
		adsCalculator.initAds();
		new AdsTaskHandler();
	}
}
