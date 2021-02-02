/*
 * @Author: ayue
 * @Date: 2020-12-12 16:52:46
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-01 17:31:23
 */
import { adsCalculator } from "./calculator/AdsCalculator";
import { dataCalculator } from "./calculator/DataCalculator";
import { flowerCalculator } from "./calculator/FlowerCalculator";
import { LogCalculator, logCalculator } from "./calculator/LogCalculator";
import { moneyCalculator } from "./calculator/MoneyCalculator";
import { tipCalculator } from "./calculator/TipCalculatot";
import { toolCalculator } from "./calculator/ToolCalculator";
import { SINGLE_MONEY_COUNT } from "./config/MoneyConfig";
import { FOLWERPOT_POSITION } from "./config/PositionConfig";
import { TIP_TYPE_DOUBLE_REWARD } from "./config/TipConfig";
import { assetManager } from "./controller/Assetmanager";
import { Flower } from "./object/Flower";
import { Flowerpot } from "./object/Flowerpot";
import { Lamp } from "./object/Lamp";
import { MoneyNumber } from "./object/MoneyNumber";
import { Newbie } from "./object/Newbie";
import { Nutrient } from "./object/Nutrient";
import { objects } from "./object/ObjectCollection";
import { Seed } from "./object/Seed";
import { Sell } from "./object/Sell";
import { Shop } from "./object/Shop";
import { ShopMenu } from "./object/ShopMenu";
import { Snail } from "./object/Snail";
import { Stove } from "./object/Stove";
import { Tap } from "./object/Tap";
import { Tip } from "./object/Tip";
import { Video } from "./object/Video";
import { taskHandler } from "./task/TaskHandler";
import { FlowerData } from "./tool/FlowerData";

const { ccclass, property } = cc._decorator;
/**
 * 启动初始化类
 */
@ccclass
export class Start {
	public gameStart() {
		if (dataCalculator.getIsNewAccount()) {
			dataCalculator.dataInit();
		}
		if (dataCalculator.getIsNewbie()) {
			let newbie: Newbie = new Newbie();
			newbie.creatNewbie();
		}
		this.flowerPreInit();
		this.toolPreInit();

		let sell: Sell = new Sell();
		sell.createSell();

		let nutrient: Nutrient = new Nutrient();
		nutrient.createNutrient();

		let moneyNumber: MoneyNumber = new MoneyNumber();
		moneyNumber.createMoneyNumber();

		let snail: Snail = new Snail();
		snail.createSnail();

		let shop: Shop = new Shop();
		shop.createShop();

		let seed: Seed = new Seed();
		seed.createSeed();

		let stove: Stove = new Stove();
		stove.createStove();

		let tap: Tap = new Tap();
		tap.createTap();

		let lamp: Lamp = new Lamp();
		lamp.creatLamp();

		let shopMenu: ShopMenu = new ShopMenu();
		shopMenu.createShopMenu();

		let tip: Tip = new Tip();
		tip.createTip();

		let video: Video = new Video();
		video.createVideo();
		for (let i = 0; i < FOLWERPOT_POSITION.length; i++) {
			let flowerpot: Flowerpot = new Flowerpot();
			flowerpot.createFlowerpot();
		}
		try {
			adsCalculator.createVideoAd();
			adsCalculator.createBannerAd();
			adsCalculator.createGridAd();
		} catch (error) {
			console.log("广告加载异常");
		}
		logCalculator.createLog();

		this.toolPostInit();
		this.flowerpotPostInit();
		this.moneyPostInit();
		this.flowerPostInit();
	}

	private flowerPreInit() {
		let unlockFlowers: Array<number> = dataCalculator.getUnlockFlowers();
		for (let i = 0; i < unlockFlowers.length; i++) {
			objects.unlockFolwer(unlockFlowers[i]);
		}
	}
	private toolPreInit() {
		let unlockTaps: Array<number> = dataCalculator.getUnlockTaps();
		let unlockStoves: Array<number> = dataCalculator.getUnlockStoves();
		let unlockLamps: Array<number> = dataCalculator.getUnlockLamps();
		for (let i = 0; i < unlockTaps.length; i++) {
			objects.unlockTool(unlockTaps[i]);
		}
		for (let i = 0; i < unlockStoves.length; i++) {
			objects.unlockTool(unlockStoves[i]);
		}
		for (let i = 0; i < unlockLamps.length; i++) {
			objects.unlockTool(unlockLamps[i]);
		}
	}

	private toolPostInit() {
		let unlockTaps: Array<number> = dataCalculator.getUnlockTaps();
		let unlockStoves: Array<number> = dataCalculator.getUnlockStoves();
		let unlockLamps: Array<number> = dataCalculator.getUnlockLamps();
		if (unlockTaps.length > 0) {
			toolCalculator.updateTap(Math.max(...unlockTaps));
		}
		if (unlockStoves.length > 0) {
			toolCalculator.updateStove(Math.max(...unlockStoves));
		}
		if (unlockLamps.length > 0) {
			toolCalculator.updateLamp(Math.max(...unlockLamps));
		}
	}
	private flowerpotPostInit() {
		let unlockFlowerpots: Array<number> = dataCalculator.getUnlockFlowerpots();
		let flowerpots: Array<Flowerpot> = objects.getFlowerpots();
		for (let i = 0; i < flowerpots.length; i++) {
			for (let j = 0; j < unlockFlowerpots.length; j++) {
				if (unlockFlowerpots[j] == flowerpots[i].getVacant()) {
					flowerpots[i].unlock();
					break;
				}
			}
		}
	}
	private moneyPostInit() {
		let addMoney: number = 0;

		if (dataCalculator.getIsSnailUnlock()) {
			let lastMoneyTime: number = dataCalculator.getLastAddMoneyTime();
			let now: number = taskHandler.getTime();
			let minute: number = Math.ceil((now - lastMoneyTime) / 1000 / 60);
			if (minute > 1) {
				let flowerDatas: Array<FlowerData> = dataCalculator.getFlowerDatas();
				for (let i = 0; i < flowerDatas.length; i++) {
					addMoney += flowerDatas[i].type * SINGLE_MONEY_COUNT * minute;
				}
				dataCalculator.updateLastAddMoneyTime();
				tipCalculator.updateLabel(
					TIP_TYPE_DOUBLE_REWARD,
					addMoney,
					"您的离线收益是:" +
						addMoney +
						"\n是否获取双倍收益:" +
						2 * addMoney +
						"?\n(将播放一段广告.)"
				);
			}
		}
		moneyCalculator.addMoney(addMoney);
	}
	private flowerPostInit() {
		let flowerDatas: Array<FlowerData> = dataCalculator.getFlowerDatas();
		for (let i = 0; i < flowerDatas.length; i++) {
			let flowerData: FlowerData = flowerDatas[i];
			let flower: Flower = new Flower();
			flower.createFlower();
			flower.setStartTime(flowerData.startTime);
			flower.setEndTime(flowerData.endTime);
			flower.setType(flowerData.type);
			flower.setVacant(flowerData.vacant);
			flowerCalculator.setPlant(flower);
			let flowerpot: Flowerpot = null;
			let flowerpots: Array<Flowerpot> = objects.getFlowerpots();
			for (let j = 0; j < flowerpots.length; j++) {
				if (flowerpots[j].getVacant() == flowerData.vacant) {
					flowerpot = flowerpots[j];
				}
			}
			flowerpot.addFlower(flower);
		}
	}
}
