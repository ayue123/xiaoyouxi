import { Map } from "../collections/Map";
import {
    MENU_ELEMENT_TYPE,
    MENU_ELEMENT_TYPE_COFFEE_TABLE,
    MENU_ELEMENT_TYPE_DESSERT_TABLE,
    MENU_ELEMENT_TYPE_DOOR_CURTAIN,
    MENU_ELEMENT_TYPE_MAT,
    MENU_ELEMENT_TYPE_PLANT,
    MENU_ELEMENT_TYPE_TIP,
    MENU_ELEMENT_TYPE_WALL_DECORATION,
    MENU_ELEMENT_TYPE_WINE_CABINET,
} from "../config/GameConstants";
import { CoffeeTable } from "./CoffeeTable";
import { Currency } from "./Currency";
import { DessertTable } from "./DessertTable";
import { DoorCurtain } from "./DoorCurtain";
import { Fish } from "./Fish";
import { GapTip } from "./GapTip";
import { Guest } from "./Guest";
import { Mat } from "./Mat";
import { Menu } from "./Menu";
import { MenuElement } from "./MenuElement";
import { MenuList } from "./MenuList";
import { MenuPrompt } from "./MenuPrompt";
import { Order } from "./Order";
import { Plant } from "./Plant";
import { RoomRoot } from "./RoomRoot";
/*
 * @Author: ayue
 * @Date: 2020-10-13 14:58:04
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-26 16:14:33
 * 对象集合
 */

import { ScreenRoot } from "./ScreenRoot";
import { Star } from "./Star";
import { Stove } from "./Stove";
import { Table } from "./Table";
import { Tip } from "./Tip";
import { WallDecoration } from "./WallDecoration";
import { WineCabinet } from "./WineCabinet";

export class ObjectCollection {
    private roomRoot: RoomRoot = null;
    private screenRoot: ScreenRoot = null;
    private kitchenNode: cc.Node = null;
    private diningRoomNode: cc.Node = null;
    private currency: Currency = null;
    private fishCount: number = 0;
    private starCount: number = 0;
    private fishes: Array<Fish> = new Array<Fish>();
    private stars: Array<Star> = new Array<Star>();
    private menu: Menu = null;
    private menuList: MenuList = null;
    private menuListContentNode: cc.Node = null;
    private munuElements: Array<MenuElement> = new Array<MenuElement>();
    private tablewareMap: Map<number, any> = new Map<number, any>();
    private menuPrompt: MenuPrompt = null;
    private gapTip: GapTip = null;
    private guestMap: Map<Array<number>, Array<Guest>> = new Map<Array<number>, Array<Guest>>();
    private orders: Array<Order> = new Array<Order>();

    public getRoomRoot() {
        return this.roomRoot;
    }

    public addRoomRoot(roomRoot: RoomRoot) {
        this.roomRoot = roomRoot;
    }
    public getScreenRoot(): ScreenRoot {
        return this.screenRoot;
    }

    public addScreenRoot(screenRoot: ScreenRoot) {
        this.screenRoot = screenRoot;
    }
    public getKitchenNode() {
        return this.kitchenNode;
    }

    public addKitchenNode(kitchenNode: cc.Node) {
        this.kitchenNode = kitchenNode;
    }
    public getDiningRoomNode() {
        return this.diningRoomNode;
    }

    public addDiningRoomNode(diningRoomNode: cc.Node) {
        this.diningRoomNode = diningRoomNode;
    }

    public getWall;

    public getCurrency(): Currency {
        return this.currency;
    }

    public addCurrency(currency: Currency) {
        this.currency = currency;
    }

    public getFishCount(): number {
        return this.fishCount;
    }

    public addFishCount(addCount: number) {
        this.fishCount += addCount;
    }
    public reduceFishCount(reduceCount: number) {
        this.fishCount -= reduceCount;
    }

    public getStarCount(): number {
        return this.starCount;
    }

    public addStarCount(addCount: number) {
        this.starCount += addCount;
    }

    public reduceStarCount(reduceCount: number) {
        this.starCount -= reduceCount;
    }

    public getFishes(): Array<Fish> {
        return this.fishes;
    }

    public addFish(fish: Fish) {
        this.fishes.push(fish);
    }

    public getStars(): Array<Star> {
        return this.stars;
    }
    public addStar(star: Star) {
        this.stars.push(star);
    }

    public getMenu(): Menu {
        return this.menu;
    }

    public addMenu(menu: Menu) {
        this.menu = menu;
    }

    public getMenuList(): MenuList {
        return this.menuList;
    }

    public addMenuList(menuList: MenuList) {
        this.menuList = menuList;
    }

    public getMenuListContent(): cc.Node {
        return this.menuListContentNode;
    }

    public addMenuListContent(node: cc.Node) {
        this.menuListContentNode = node;
    }

    public getMenuElements(): Array<MenuElement> {
        return this.munuElements;
    }

    public addMenuElements(menuElement: MenuElement) {
        this.munuElements.push(menuElement);
    }

    public getCoffeeTable() {
        return this.tablewareMap.get(MENU_ELEMENT_TYPE_COFFEE_TABLE);
    }
    public addCoffeeTable(coffeeTable: CoffeeTable) {
        this.tablewareMap.put(MENU_ELEMENT_TYPE_COFFEE_TABLE, coffeeTable);
    }

    public getDessertTable() {
        return this.tablewareMap.get(MENU_ELEMENT_TYPE_DESSERT_TABLE);
    }
    public addDessertTable(dessertTable: DessertTable) {
        this.tablewareMap.put(MENU_ELEMENT_TYPE_DESSERT_TABLE, dessertTable);
    }
    public getDoorCurtain() {
        return this.tablewareMap.get(MENU_ELEMENT_TYPE_DOOR_CURTAIN);
    }
    public addDoorCurtain(doorCurtain: DoorCurtain) {
        this.tablewareMap.put(MENU_ELEMENT_TYPE_DOOR_CURTAIN, doorCurtain);
    }
    public getMat() {
        return this.tablewareMap.get(MENU_ELEMENT_TYPE_MAT);
    }
    public addMat(mat: Mat) {
        this.tablewareMap.put(MENU_ELEMENT_TYPE_MAT, mat);
    }
    public getPlant() {
        return this.tablewareMap.get(MENU_ELEMENT_TYPE_PLANT);
    }
    public addPlant(plant: Plant) {
        this.tablewareMap.put(MENU_ELEMENT_TYPE_PLANT, plant);
    }
    public getTip() {
        return this.tablewareMap.get(MENU_ELEMENT_TYPE_TIP);
    }
    public addTip(tip: Tip) {
        this.tablewareMap.put(MENU_ELEMENT_TYPE_TIP, tip);
    }
    public getWallDecoration() {
        return this.tablewareMap.get(MENU_ELEMENT_TYPE_WALL_DECORATION);
    }
    public addWallDecoration(wallDecoration: WallDecoration) {
        this.tablewareMap.put(MENU_ELEMENT_TYPE_WALL_DECORATION, wallDecoration);
    }
    public getWineCabinet() {
        return this.tablewareMap.get(MENU_ELEMENT_TYPE_WINE_CABINET);
    }
    public addWineCabinet(wineCabinet) {
        this.tablewareMap.put(MENU_ELEMENT_TYPE_WINE_CABINET, wineCabinet);
    }

    public getTable(type): Table {
        return this.tablewareMap.get(type);
    }
    public addTable(type: number, table: Table) {
        this.tablewareMap.put(type, table);
    }

    public getTablewareMap(): Map<Number, any> {
        return this.tablewareMap;
    }

    public getMenuPrompt(): MenuPrompt {
        return this.menuPrompt;
    }
    public addMenuPrompt(menuPrompt: MenuPrompt) {
        this.menuPrompt = menuPrompt;
    }

    public getGapTip(): GapTip {
        return this.gapTip;
    }

    public addGapTip(gapTip: GapTip) {
        this.gapTip = gapTip;
    }

    public getStove(type): Stove {
        return this.tablewareMap.get(type);
    }

    public addStove(type: number, stove: Stove) {
        this.tablewareMap.put(type, stove);
    }

    public getAllGuest(): Array<Guest> {
        let allGuests = [];
        this.guestMap.forEach((hash) => {
            let guests: Array<Guest> = hash.value;
            guests.forEach((g) => {
                allGuests.push(g);
            });
        });
        return allGuests;
    }
    public getGuests(targetPosition: Array<number>): Array<Guest> {
        return this.guestMap.get(targetPosition);
    }
    public addGuest(guest: Guest) {
        let guests: Array<Guest> = this.guestMap.get(guest.getTargetPosition());
        if (guests == null) {
            guests = new Array<Guest>();
            this.guestMap.put(guest.getTargetPosition(), guests);
        }
        guests.push(guest);
    }

    public removeGuest(guest: Guest, oldTargetPosition: Array<number>) {
        let guests: Array<Guest> = this.guestMap.get(oldTargetPosition);
        let newGuests: Array<Guest> = [];
        guests.forEach((g) => {
            if (g != guest) {
                g.updateIndex(g.getIndex() - 1);
                newGuests.push(g);
            }
        });
        this.guestMap.put(oldTargetPosition, newGuests);
    }

    public addOrder(order: Order) {
        this.orders.push(order);
    }

    public getOrders() {
        return this.orders;
    }

    public removeOrder(order: Order) {
        let index = this.orders.indexOf(order);
        this.orders.splice(index, 1);
    }
}
export var objectCollection = new ObjectCollection();
