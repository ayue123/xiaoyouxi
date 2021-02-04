/*
 * @Author: ayue
 * @Date: 2021-02-03 16:15:51
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-03 17:12:46
 */

export class RewardCalculator {
	// 单例
	private static _inst: RewardCalculator;
	public static get inst() {
		return (
			RewardCalculator._inst ||
			(RewardCalculator._inst = new RewardCalculator())
		);
	}
	public adsRewardExe() {
		console.log("aaaaa");
	}
}
export var rewardCalculator = RewardCalculator.inst;
