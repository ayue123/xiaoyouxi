/*
 * @Author: ayue
 * @Date: 2020-12-12 16:50:29
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-10 14:56:48
 */
/********************************************提示类型***********************************************/

import { Map } from "../controller/Map";

/**
 * 提示类型-出售
 */
export const TIP_TYPE_SELL: number = 0;
/**
 * 提示类型-激励广告
 */
export const TIP_TYPE_NUTRIENT: number = 1;
/**
 * 提示类型-商品详情
 */
export const TIP_TYPE_SHOP_ELEMENT: number = 2;
/**
 * 提示类型-金币不足
 */
export const TIP_TYPE_MONEY_SHORT: number = 3;
/**
 * 提示类型-花园已满
 */
export const TIP_TYPE_GARDEN_FULL: number = 4;
/**
 * 提示类型-获得蜗牛
 */
export const TIP_TYPE_GAIN_SNAIL: number = 5;
/**
 * 提示类型-需要解锁花盆
 */
export const TIP_TYPE_NEED_UNLOCK_FLOWERPOT: number = 6;
/**
 * 提示类型-是否免费解锁花盆
 */
export const TIP_TYPE_UNLOCK_FLOWERPOT: number = 7;
/**
 * 提示类型-无可用广告
 */
export const TIP_TYPE_NO_VIDEO: number = 8;
/**
 * 提示类型-游戏启动双倍奖励
 */
export const TIP_TYPE_DOUBLE_REWARD: number = 9;
/**
 * 提示类型-无可卖出鲜花
 */
export const TIP_TYPE_NO_CAN_SELL: number = 10;
/**
 * 提示类型-新手引导
 */
export const TIP_TYPE_NEWBIE: number = 11;

/********************************************提示内容***********************************************/
/**
 * 提示内容-出售
 */
export const TIP_DES_SELL: string = "你确定出售这株植物?";
/**
 * 提示内容-激励广告
 */
export const TIP_DES_NUTRIENT: string =
	"观看短短的一段视频\n就可以让你花园里的鲜花快速成熟哟!";
/**
 * 提示内容-商品详情
 */
export const TIP_DES_SHOP_ELEMENT: string = "\n是否解锁?";
/**
 * 提示内容-金币不足
 */
export const TIP_DES_MONEY_SHORT: string =
	"金币不足!\n观看短短的一段视频?\n就可以获得一笔巨额金币";
/**
 * 提示内容-花园已满
 */
export const TIP_DES_GARDEN_FULL: string =
	"花园已经满了!\n(可以出售一些已经成熟的鲜花.)";
/**
 * 提示内容-获得蜗牛
 */
export const TIP_DES_GAIN_SNAIL: string =
	"恭喜你获得了一个小蜗牛，他可以帮助你把花园里散落的金币捡起来.";
/**
 * 提示内容-需要解锁花盆
 */
export const TIP_DES_NEED_UNLOCK_FLOWERPOT: string =
	"没有已解锁的花盆了\n请解锁更多的花盆.";
/**
 * 提示内容-获得蜗牛
 */
export const TIP_DES_FREE_UNLOCK_FLOWERPOT: string = "是否解锁一个花盆?";
/**
 * 提示内容-无可用广告
 */
export const TIP_DES_NO_VIDEO: string = "没有可用的广告,\n请待会重试";
/**
 * 提示内容-游戏启动双倍奖励
 */
export const TIP_DES_DOUBLE_REWARD: string =
	"是否获取双倍奖励?\n(将播放一段广告.)";
/**
 * 提示内容-无可卖出鲜花
 */
export const TIP_DES_NO_CAN_SELL: string = "没有可用卖出的鲜花哦!";
/**
 * 提示内容-新手引导
 */
export const TIP_DES_NEWBIE: string =
	"花园就交给你了\n种植更多的植物\n赚取更多的金币\n来解锁更多种类的植物吧!";
/**
 * 提示内容
 */
export const TIP_DES: Map<number, string> = new Map();
TIP_DES.put(TIP_TYPE_SELL, TIP_DES_SELL);
TIP_DES.put(TIP_TYPE_NUTRIENT, TIP_DES_NUTRIENT);
TIP_DES.put(TIP_TYPE_SHOP_ELEMENT, TIP_DES_SHOP_ELEMENT);
TIP_DES.put(TIP_TYPE_MONEY_SHORT, TIP_DES_MONEY_SHORT);
TIP_DES.put(TIP_TYPE_GARDEN_FULL, TIP_DES_GARDEN_FULL);
TIP_DES.put(TIP_TYPE_GAIN_SNAIL, TIP_DES_GAIN_SNAIL);
TIP_DES.put(TIP_TYPE_NEED_UNLOCK_FLOWERPOT, TIP_DES_NEED_UNLOCK_FLOWERPOT);
TIP_DES.put(TIP_TYPE_UNLOCK_FLOWERPOT, TIP_DES_FREE_UNLOCK_FLOWERPOT);
TIP_DES.put(TIP_TYPE_NO_VIDEO, TIP_DES_NO_VIDEO);
TIP_DES.put(TIP_TYPE_DOUBLE_REWARD, TIP_DES_DOUBLE_REWARD);
TIP_DES.put(TIP_TYPE_NO_CAN_SELL, TIP_DES_NO_CAN_SELL);
TIP_DES.put(TIP_TYPE_NEWBIE, TIP_DES_NEWBIE);

/********************************************提示选择按钮类型***********************************************/
/**
 * 提示选择按钮类型-是否确认
 */
export const TIP_CHOOSE_YES_NO: number = 0;
/**
 * 提示选择按钮类型-隐藏
 */
export const TIP_CHOOSE_HIDE: number = 2;
/**
 * 提示选择按钮类型
 */
export const TIP_CLOSE: Map<number, number> = new Map();
TIP_CLOSE.put(TIP_TYPE_SELL, TIP_CHOOSE_YES_NO);
TIP_CLOSE.put(TIP_TYPE_NUTRIENT, TIP_CHOOSE_YES_NO);
TIP_CLOSE.put(TIP_TYPE_SHOP_ELEMENT, TIP_CHOOSE_YES_NO);
TIP_CLOSE.put(TIP_TYPE_MONEY_SHORT, TIP_CHOOSE_YES_NO);
TIP_CLOSE.put(TIP_TYPE_GARDEN_FULL, TIP_CHOOSE_HIDE);
TIP_CLOSE.put(TIP_TYPE_GAIN_SNAIL, TIP_CHOOSE_HIDE);
TIP_CLOSE.put(TIP_TYPE_NEED_UNLOCK_FLOWERPOT, TIP_CHOOSE_HIDE);
TIP_CLOSE.put(TIP_TYPE_UNLOCK_FLOWERPOT, TIP_CHOOSE_YES_NO);
TIP_CLOSE.put(TIP_TYPE_NO_VIDEO, TIP_CHOOSE_HIDE);
TIP_CLOSE.put(TIP_TYPE_DOUBLE_REWARD, TIP_CHOOSE_YES_NO);
TIP_CLOSE.put(TIP_TYPE_NO_CAN_SELL, TIP_CHOOSE_HIDE);
TIP_CLOSE.put(TIP_TYPE_NEWBIE, TIP_CHOOSE_HIDE);
