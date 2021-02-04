/*
 * @Author: ayue
 * @Date: 2021-02-04 14:41:45
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-04 14:53:58
 */

import { adsCalculator } from "../../calculator/AdsCalculator";
import { IMinuteExecute } from "../ITaskExecuter";
import { timerTaskHandler } from "../TimerTaskManager";

export class AdsTaskHandler implements IMinuteExecute {
	constructor() {
		timerTaskHandler.addMinuteHandler(this);
	}
	execute(minuteCount) {
		adsCalculator.initAds();
	}
}
