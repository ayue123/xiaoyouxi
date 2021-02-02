/*
 * @Author: ayue
 * @Date: 2020-12-30 10:44:03
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-01 17:38:02
 */

import {
	DATA_TYPE_ACCOUNT_STATE,
	DATA_TYPE_FLOWER,
	DATA_TYPE_LAST_ADD_MONEY_TIME,
	DATA_TYPE_MONEY,
	DATA_TYPE_NEWBIE,
	DATA_TYPE_SNAIL_STATE,
	DATA_TYPE_UNLOCK_FLOWER,
	DATA_TYPE_UNLOCK_FLOWERPOT,
	DATA_TYPE_UNLOCK_LAMP,
	DATA_TYPE_UNLOCK_STOVE,
	DATA_TYPE_UNLOCK_TAP,
} from "../config/DataConfig";
import { FLOWER_TYPE_1 } from "../config/FlowerConfig";
import { MONEY_INIT_COUNT } from "../config/MoneyConfig";
import { wxData } from "../data/WxData";
import { taskHandler } from "../task/TaskHandler";
import { FlowerData } from "../tool/FlowerData";

export class DataCalculator {
	// 单例
	private static _inst: DataCalculator;
	public static get inst() {
		return (
			DataCalculator._inst || (DataCalculator._inst = new DataCalculator())
		);
	}

	public setData(key: string, data: any) {
		let state: string = wxData.setData(key, data);
		if (state == "FAIL") {
			//TODO 弹出遮罩提示断网
		}
	}
	public getData(key: string): any {
		let data: any = wxData.getData(key);
		if (data == "FAIL") {
			//TODO弹出遮罩提示断网
		}
		return data;
	}
	public clearData() {
		wxData.clearData();
	}

	public dataInit() {
		this.setData(DATA_TYPE_ACCOUNT_STATE, 1);
		this.setData(DATA_TYPE_MONEY, MONEY_INIT_COUNT);
		this.setData(DATA_TYPE_SNAIL_STATE, 0);

		let unlockFlowers: Array<number> = new Array<number>();
		unlockFlowers.push(FLOWER_TYPE_1);
		this.setData(DATA_TYPE_UNLOCK_FLOWER, unlockFlowers);
		this.setData(DATA_TYPE_UNLOCK_TAP, new Array<number>());
		this.setData(DATA_TYPE_UNLOCK_STOVE, new Array<number>());
		this.setData(DATA_TYPE_UNLOCK_LAMP, new Array<number>());
		let unlockFlowerpots: Array<number> = new Array<number>();
		unlockFlowerpots.push(...[0, 1, 2, 3]);
		this.setData(DATA_TYPE_UNLOCK_FLOWERPOT, unlockFlowerpots);
		this.setData(DATA_TYPE_LAST_ADD_MONEY_TIME, taskHandler.getTime());
		this.setData(DATA_TYPE_FLOWER, new Array<FlowerData>());
		this.setData(DATA_TYPE_NEWBIE, 1);
	}

	public getIsNewAccount() {
		let isNew: number = this.getData(DATA_TYPE_ACCOUNT_STATE);
		return isNew == 1 ? false : true;
	}
	public getMoneyCount(): number {
		return this.getData(DATA_TYPE_MONEY);
	}
	public addMoneyCount(addCount: number) {
		if (addCount == null || addCount == 0 || addCount == undefined) {
			return;
		}
		this.setData(DATA_TYPE_MONEY, this.getMoneyCount() + addCount);
	}
	public reduceMoneyCount(reduceCount: number) {
		if (reduceCount == null || reduceCount == 0 || reduceCount == undefined) {
			return;
		}
		this.setData(DATA_TYPE_MONEY, this.getMoneyCount() - reduceCount);
	}

	public addUnlockFlower(type: number) {
		let unlockFlowers: Array<number> = this.getData(DATA_TYPE_UNLOCK_FLOWER);
		unlockFlowers.push(type);
		this.setData(DATA_TYPE_UNLOCK_FLOWER, unlockFlowers);
	}
	public addUnlockTap(type: number) {
		let unlockTaps: Array<number> = this.getData(DATA_TYPE_UNLOCK_TAP);
		unlockTaps.push(type);
		this.setData(DATA_TYPE_UNLOCK_TAP, unlockTaps);
	}
	public addUnlockStove(type: number) {
		let unlockStoves: Array<number> = this.getData(DATA_TYPE_UNLOCK_STOVE);
		unlockStoves.push(type);
		this.setData(DATA_TYPE_UNLOCK_STOVE, unlockStoves);
	}
	public addUnlockLamp(type: number) {
		let unlockLamps: Array<number> = this.getData(DATA_TYPE_UNLOCK_LAMP);
		unlockLamps.push(type);
		this.setData(DATA_TYPE_UNLOCK_LAMP, unlockLamps);
	}
	public addUnlockFlowerpot(vacant: number) {
		let unlockFlowerpots: Array<number> = this.getData(
			DATA_TYPE_UNLOCK_FLOWERPOT
		);
		unlockFlowerpots.push(vacant);
		this.setData(DATA_TYPE_UNLOCK_FLOWERPOT, unlockFlowerpots);
	}
	public addFlower(flowerData: FlowerData) {
		let flowerDatas: Array<FlowerData> = this.getData(DATA_TYPE_FLOWER);
		flowerDatas.push(flowerData);
		this.setData(DATA_TYPE_FLOWER, flowerDatas);
	}
	public reduceFlower(vacant: number) {
		let flowerDatas: Array<FlowerData> = this.getData(DATA_TYPE_FLOWER);
		let flowerData: FlowerData = null;
		for (let i = 0; i < flowerDatas.length; i++) {
			if (flowerDatas[i].vacant == vacant) {
				flowerData = flowerDatas[i];
				break;
			}
		}
		flowerDatas.splice(flowerDatas.indexOf(flowerData), 1);
		this.setData(DATA_TYPE_FLOWER, flowerDatas);
	}
	public reduceFlowerTime() {
		let flowerDatas: Array<FlowerData> = this.getData(DATA_TYPE_FLOWER);
		for (let i = 0; i < flowerDatas.length; i++) {
			let flowerData: FlowerData = flowerDatas[i];
			flowerData.endTime = taskHandler.getTime();
		}
		this.setData(DATA_TYPE_FLOWER, flowerDatas);
	}
	public updateLastAddMoneyTime() {
		this.setData(DATA_TYPE_LAST_ADD_MONEY_TIME, taskHandler.getTime());
	}
	public getLastAddMoneyTime(): number {
		return this.getData(DATA_TYPE_LAST_ADD_MONEY_TIME);
	}
	public getFlowerDatas(): Array<FlowerData> {
		return this.getData(DATA_TYPE_FLOWER);
	}
	public getUnlockFlowerpots(): Array<number> {
		return this.getData(DATA_TYPE_UNLOCK_FLOWERPOT);
	}
	public getUnlockTaps(): Array<number> {
		return this.getData(DATA_TYPE_UNLOCK_TAP);
	}
	public getUnlockStoves(): Array<number> {
		return this.getData(DATA_TYPE_UNLOCK_STOVE);
	}
	public getUnlockLamps(): Array<number> {
		return this.getData(DATA_TYPE_UNLOCK_LAMP);
	}
	public getUnlockFlowers(): Array<number> {
		return this.getData(DATA_TYPE_UNLOCK_FLOWER);
	}
	public getIsSnailUnlock(): boolean {
		return this.getData(DATA_TYPE_SNAIL_STATE) == 1;
	}
	public unlockSnail() {
		this.setData(DATA_TYPE_SNAIL_STATE, 1);
	}
	public getIsNewbie(): boolean {
		return this.getData(DATA_TYPE_NEWBIE) == 1 ? true : false;
	}
	public removeNewbie() {
		this.setData(DATA_TYPE_NEWBIE, 0);
	}
}
export var dataCalculator = DataCalculator.inst;
