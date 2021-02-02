/*
 * @Author: ayue
 * @Date: 2020-12-12 16:50:08
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-11 14:04:33
 */

import { Map } from "../controller/Map";

/**
 * 初始资金
 */
export const MONEY_INIT_COUNT: number = 10000;
/**
 * 单个金币价格
 */
export const SINGLE_MONEY_COUNT: number = 5;
/**
 * 视频激励金币的单价
 */
export const SINGLE_VIDEO_MONEY: number = 1000;
/**
 * 种子价格
 */
export const SEED_PRICE: number = 2000;

/********************************************鲜花价格***********************************************/

export const FLOWER_PRICE: Map<number, number> = new Map();

/********************************************水龙头价格***********************************************/

export const TAP_PRICE: Map<number, number> = new Map();

/********************************************炉子价格***********************************************/

export const STOVE_PRICE: Map<number, number> = new Map();

/********************************************灯价格***********************************************/

export const LAMP_PRICE: Map<number, number> = new Map();

/********************************************花盆解锁价格价格***********************************************/

export const FLOWERPOT_PRICE: Map<number, number> = new Map();
