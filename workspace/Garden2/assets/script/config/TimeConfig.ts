/*
 * @Author: ayue
 * @Date: 2020-12-12 16:50:23
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-08 11:23:03
 */
/********************************************毫秒代表各个时间***********************************************/

import { Map } from "../controller/Map";

/**
 * 毫秒表示秒
 */
export const SECOND: number = 1000;
/**
 * 毫秒表示分钟
 */
export const MINUTE: number = 60 * 1000;
/**
 * 毫秒表示小时
 */
export const HOUR: number = 60 * 60 * 1000;

/********************************************鲜花成长时间***********************************************/

export const FLOWER_TIME: Map<number, number> = new Map();

/**********************************************************************************************************/
/**
 * 蜗牛移动的速度
 */
export const SNAIL_MOVE_SPEED: number = 200;
/**
 * 金币存活时间/s
 */
export const MONEY_STAY_TIME: number = 60;
/**
 * 金币创建间隔时间/s
 */
export const MONEY_GENE_TIME: number = 60;

/**
 * 单次激励减少的时间
 */
export const SINGLE_NUTRIENT_TIME: number = 10 * SECOND;
