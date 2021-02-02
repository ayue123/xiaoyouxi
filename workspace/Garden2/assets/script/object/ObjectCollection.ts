/*
 * @Author: ayue
 * @Date: 2020-12-12 16:52:03
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-08 17:40:09
 */

import { Background } from "./Background";
import { Flower } from "./Flower";
import { Flowerpot } from "./Flowerpot";
import { Lamp } from "./Lamp";
import { Money } from "./Money";
import { MoneyNumber } from "./MoneyNumber";
import { Newbie } from "./Newbie";
import { Nutrient } from "./Nutrient";
import { Sell } from "./Sell";
import { Shop } from "./Shop";
import { ShopElement } from "./ShopElement";
import { ShopMenu } from "./ShopMenu";
import { ShopView } from "./ShopView";
import { Snail } from "./Snail";
import { Stove } from "./Stove";
import { Tap } from "./Tap";
import { Tip } from "./Tip";
import { Video } from "./Video";

export class ObjectCollection {
	private background: Background = null;
	private sell: Sell = null;
	private nutrient: Nutrient = null;
	private tip: Tip = null;
	private moneyNumber: MoneyNumber = null; //数据缓存
	private shop: Shop = null;
	private snail: Snail = null; //数据缓存
	private flowers: Array<Flower> = new Array<Flower>(); //数据缓存
	private unlockFolwers: Array<number> = new Array<number>(); //数据缓存
	private unlockTools: Array<number> = new Array<number>(); //数据缓存
	private moneys: Array<Money> = new Array<Money>(); // 启动计算
	private shopViews: Array<ShopView> = new Array<ShopView>();
	private shopMenu: ShopMenu = null;
	private shopElements: Array<ShopElement> = new Array<ShopElement>();
	private tap: Tap = null;
	private stove: Stove = null;
	private lamp: Lamp = null;
	private video: Video = null;
	private flowerpots: Array<Flowerpot> = new Array<Flowerpot>(); //数据缓存
	private newbie: Newbie = null;

	public addBackground(background: Background) {
		this.background = background;
	}
	public getBackground(): Background {
		return this.background;
	}

	public addSell(sell: Sell) {
		this.sell = sell;
	}
	public getSell(): Sell {
		return this.sell;
	}

	public addNutrient(nutrient: Nutrient) {
		this.nutrient = nutrient;
	}

	public getNutrient(): Nutrient {
		return this.nutrient;
	}
	public addTip(tip: Tip) {
		this.tip = tip;
	}

	public getTip(): Tip {
		return this.tip;
	}
	public addMoneyNumber(moneyNumber: MoneyNumber) {
		this.moneyNumber = moneyNumber;
	}
	public getMoneyNumber(): MoneyNumber {
		return this.moneyNumber;
	}
	public addShop(shop: Shop) {
		this.shop = shop;
	}
	public getShop(): Shop {
		return this.shop;
	}
	public addSnail(snail: Snail) {
		this.snail = snail;
	}
	public getSnail(): Snail {
		return this.snail;
	}
	public addFlower(flower: Flower) {
		this.flowers.push(flower);
	}
	public removeFlower(flower: Flower) {
		let newFlowers: Array<Flower> = new Array<Flower>();
		for (let i = 0; i < this.flowers.length; i++) {
			if (flower != this.flowers[i]) {
				newFlowers.push(this.flowers[i]);
			}
		}
		this.flowers = newFlowers;
	}
	public getFlowers(): Array<Flower> {
		return this.flowers;
	}
	public unlockFolwer(type: number) {
		for (let i = 0; i < this.unlockFolwers.length; i++) {
			if (this.unlockFolwers[i] == type) {
				return;
			}
		}
		this.unlockFolwers.push(type);
	}
	public getUnlockFlowers(): Array<number> {
		return this.unlockFolwers;
	}
	public isFlowerUnlock(type: number): boolean {
		for (let i = 0; i < this.unlockFolwers.length; i++) {
			if (this.unlockFolwers[i] == type) {
				return true;
			}
		}
		return false;
	}
	public unlockTool(type: number) {
		for (let i = 0; i < this.unlockTools.length; i++) {
			if (this.unlockTools[i] == type) {
				return;
			}
		}
		this.unlockTools.push(type);
	}
	public getUnlockTools(): Array<number> {
		return this.unlockTools;
	}
	public isToolUnlock(type: number) {
		for (let i = 0; i < this.unlockTools.length; i++) {
			if (this.unlockTools[i] == type) {
				return true;
			}
		}
		return false;
	}

	public addMoney(money: Money) {
		this.moneys.push(money);
	}
	public getMoneys(): Array<Money> {
		return this.moneys;
	}
	public deleteMoney(money: Money) {
		let newMoneys: Array<Money> = new Array<Money>();
		for (let i = 0; i < this.moneys.length; i++) {
			if (money != this.moneys[i]) {
				newMoneys.push(this.moneys[i]);
			}
		}
		this.moneys = newMoneys;
	}
	public addShopView(shopView: ShopView) {
		this.shopViews.push(shopView);
	}
	public getShopViews(): Array<ShopView> {
		return this.shopViews;
	}
	public addShopMenu(shopMenu: ShopMenu) {
		this.shopMenu = shopMenu;
	}
	public getShopMenu(): ShopMenu {
		return this.shopMenu;
	}
	public addShopElement(shopElement: ShopElement) {
		this.shopElements.push(shopElement);
	}
	public getShopElements(): Array<ShopElement> {
		return this.shopElements;
	}
	public addTap(tap: Tap) {
		this.tap = tap;
	}
	public getTap(): Tap {
		return this.tap;
	}
	public addStove(stove: Stove) {
		this.stove = stove;
	}
	public getStove(): Stove {
		return this.stove;
	}
	public addLamp(lamp: Lamp) {
		this.lamp = lamp;
	}
	public getLamp(): Lamp {
		return this.lamp;
	}
	public addVideo(video: Video) {
		this.video = video;
	}
	public getVideo(): Video {
		return this.video;
	}
	public addFlowerpot(flowerpot: Flowerpot) {
		this.flowerpots.push(flowerpot);
	}
	public getFlowerpots(): Array<Flowerpot> {
		return this.flowerpots;
	}
	public addNewbie(newbie: Newbie) {
		this.newbie = newbie;
	}
	public getNewbie(): Newbie {
		return this.newbie;
	}
}
export var objects = new ObjectCollection();
