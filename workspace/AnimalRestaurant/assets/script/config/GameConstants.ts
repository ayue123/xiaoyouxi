/*
 * @Author: ayue
 * @Date: 2020-10-13 20:14:08
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-26 16:27:13
 */
//----------------------------------层级-------------------------------------
/**
 * 顾客层级
 */
export const GUEST_ZINDEX = 100;
/**
 * 餐桌层级
 */
export const TABLE_ZINDEX = 101;
/**
 * 食物层级
 */
export const FOOD_ZINDEX = 102;
/**
 * 菜单层级
 */
export const MENU_ZINDEX = 200;

//----------------------------------菜单-------------------------------------
/**
 * 菜单对象类型——小费台
 */
export const MENU_ELEMENT_TYPE_TIP = 0;
/**
 * 菜单对象类型——1号餐桌
 */
export const MENU_ELEMENT_TYPE_TABLE_1 = 1;
/**
 * 菜单对象类型——2号餐桌
 */
export const MENU_ELEMENT_TYPE_TABLE_2 = 2;
/**
 * 菜单对象类型——3号餐桌
 */
export const MENU_ELEMENT_TYPE_TABLE_3 = 3;
/**
 * 菜单对象类型——植物
 */
export const MENU_ELEMENT_TYPE_PLANT = 4;
/**
 * 菜单对象类型——甜品台
 */
export const MENU_ELEMENT_TYPE_DESSERT_TABLE = 5;
/**
 * 菜单对象类型——4号餐桌
 */
export const MENU_ELEMENT_TYPE_TABLE_4 = 6;
/**
 * 菜单对象类型——5号餐桌
 */
export const MENU_ELEMENT_TYPE_TABLE_5 = 7;
/**
 * 菜单对象类型——6号餐桌
 */
export const MENU_ELEMENT_TYPE_TABLE_6 = 8;
/**
 * 菜单对象类型——地垫
 */
export const MENU_ELEMENT_TYPE_MAT = 9;
/**
 * 菜单对象类型——门帘
 */
export const MENU_ELEMENT_TYPE_DOOR_CURTAIN = 10;
/**
 * 菜单对象类型——墙饰
 */
export const MENU_ELEMENT_TYPE_WALL_DECORATION = 11;
/**
 * 菜单对象类型——咖啡台
 */
export const MENU_ELEMENT_TYPE_COFFEE_TABLE = 12;
/**
 * 菜单对象类型——酒柜
 */
export const MENU_ELEMENT_TYPE_WINE_CABINET = 13;
/**
 * 菜单对象类型——1号火炉
 */
export const MENU_ELEMENT_TYPE_STOVE_1 = 14;
/**
 * 菜单对象类型——2号火炉
 */
export const MENU_ELEMENT_TYPE_STOVE_2 = 15;
/**
 * 菜单对象类型——3号火炉
 */
export const MENU_ELEMENT_TYPE_STOVE_3 = 16;
/**
 * 菜单对象类型——4号火炉
 */
export const MENU_ELEMENT_TYPE_STOVE_4 = 17;
/**
 * 菜单对象类型——5号火炉
 */
export const MENU_ELEMENT_TYPE_STOVE_5 = 18;
/**
 * 菜单对象类型——6号火炉
 */
export const MENU_ELEMENT_TYPE_STOVE_6 = 19;

/**
 *菜单对象类型;
 */
export const MENU_ELEMENT_TYPE: Array<number> = [
    MENU_ELEMENT_TYPE_TIP,
    MENU_ELEMENT_TYPE_TABLE_1,
    MENU_ELEMENT_TYPE_TABLE_2,
    MENU_ELEMENT_TYPE_TABLE_3,
    MENU_ELEMENT_TYPE_PLANT,
    MENU_ELEMENT_TYPE_DESSERT_TABLE,
    MENU_ELEMENT_TYPE_TABLE_4,
    MENU_ELEMENT_TYPE_TABLE_5,
    MENU_ELEMENT_TYPE_TABLE_6,
    MENU_ELEMENT_TYPE_MAT,
    MENU_ELEMENT_TYPE_DOOR_CURTAIN,
    MENU_ELEMENT_TYPE_WALL_DECORATION,
    MENU_ELEMENT_TYPE_COFFEE_TABLE,
    MENU_ELEMENT_TYPE_WINE_CABINET,
    MENU_ELEMENT_TYPE_STOVE_1,
    MENU_ELEMENT_TYPE_STOVE_2,
    MENU_ELEMENT_TYPE_STOVE_3,
    MENU_ELEMENT_TYPE_STOVE_4,
    MENU_ELEMENT_TYPE_STOVE_5,
    MENU_ELEMENT_TYPE_STOVE_6,
];

//-----------------------------------餐具等级-----------------------------------------
/**
 * 小费台最高等级
 */
export const TIP_LEVEL_MAX = 10;
/**
 * 餐桌最高等级
 */
export const TABLE_LEVEL_MAX = 12;
/**
 * 植物最高等级
 */
export const PLANT_LEVEL_MAX = 10;
/**
 * 甜品台最高等级
 */
export const DESSERT_TABLE_LEVEL_MAX = 9;
/**
 * 地垫最高等级
 */
export const MAT_LEVEL_MAX = 10;
/**
 * 门饰最高等级
 */
export const DOOR_CURTAIN_LEVEL_MAX = 11;
/**
 * 墙饰最高等级
 */
export const WALL_DECORATION_LEVEL_MAX = 10;
/**
 * 咖啡台最高等级
 */
export const COFFEE_TABLE_LEVEL_MAX = 10;
/**
 * 酒柜最高等级
 */
export const WINE_CABINET_LEVEL_MAX = 10;
/**
 * 火炉最高等级
 */
export const STOVE_LEVEL_MAX = 8;
/**
 *餐具等级;
 */
export const TABLEWARE_LEVEL_MAX: Array<number> = [
    TIP_LEVEL_MAX,
    TABLE_LEVEL_MAX,
    TABLE_LEVEL_MAX,
    TABLE_LEVEL_MAX,
    PLANT_LEVEL_MAX,
    DESSERT_TABLE_LEVEL_MAX,
    TABLE_LEVEL_MAX,
    TABLE_LEVEL_MAX,
    TABLE_LEVEL_MAX,
    MAT_LEVEL_MAX,
    DOOR_CURTAIN_LEVEL_MAX,
    WALL_DECORATION_LEVEL_MAX,
    COFFEE_TABLE_LEVEL_MAX,
    WINE_CABINET_LEVEL_MAX,
    STOVE_LEVEL_MAX,
    STOVE_LEVEL_MAX,
    STOVE_LEVEL_MAX,
    STOVE_LEVEL_MAX,
    STOVE_LEVEL_MAX,
    STOVE_LEVEL_MAX,
];
//-----------------------------------餐具价格-----------------------------------------
/**
 * 小费台价格
 */
export const TIP_PRICE: Array<number> = [
    1000,
    14000,
    88000,
    200000,
    1520000,
    540000,
    4500000,
    5000000,
    21000000,
    40000000,
];
/**
 * 餐桌价格
 */
export const TABLE_PRICE: Array<number> = [
    150,
    9000,
    62000,
    140000,
    800000,
    4000000,
    750000,
    1550000,
    460000,
    2000000,
    6000000,
    8000000,
];
/**
 * 植物价格
 */
export const PLANT_PRICE: Array<number> = [
    1200,
    11000,
    75000,
    340000,
    4200000,
    820000,
    800000,
    830000,
    23000000,
    28000000,
];
/**
 * 甜品台价格
 */
export const DESSERT_TABLE_PRICE: Array<number> = [
    1200,
    11000,
    75000,
    340000,
    4200000,
    820000,
    800000,
    830000,
    23000000,
];
/**
 * 地垫价格
 */
export const MAT_PRICE: Array<number> = [
    1200,
    11000,
    75000,
    340000,
    4200000,
    820000,
    800000,
    830000,
    23000000,
    28000000,
];
/**
 * 门帘价格
 */
export const DOOR_CURTAIN_PRICE: Array<number> = [
    1200,
    11000,
    75000,
    340000,
    4200000,
    820000,
    800000,
    830000,
    23000000,
    28000000,
    45000000,
];
/**
 * 墙饰价格
 */
export const WALL_DECORATION_PRICE: Array<number> = [
    1200,
    11000,
    75000,
    340000,
    4200000,
    820000,
    800000,
    830000,
    23000000,
    28000000,
];
/**
 * 咖啡台价格
 */
export const COFFEE_TABLE_PRICE: Array<number> = [
    1200,
    11000,
    75000,
    340000,
    4200000,
    820000,
    800000,
    830000,
    23000000,
    28000000,
];
/**
 * 酒柜价格
 */
export const WINE_CABINET_PRICE: Array<number> = [
    1200,
    11000,
    75000,
    340000,
    4200000,
    820000,
    800000,
    830000,
    23000000,
    28000000,
];
/**
 * 火炉价格
 */
export const STOVE_PRICE: Array<number> = [150, 9000, 62000, 240000, 3500000, 4300000, 4600000, 12000000];
/**
 *餐具价格;
 */
export const TABLEWARE_PRICE: Array<Array<number>> = [
    TIP_PRICE,
    TABLE_PRICE,
    TABLE_PRICE,
    TABLE_PRICE,
    PLANT_PRICE,
    DESSERT_TABLE_PRICE,
    TABLE_PRICE,
    TABLE_PRICE,
    TABLE_PRICE,
    MAT_PRICE,
    DOOR_CURTAIN_PRICE,
    WALL_DECORATION_PRICE,
    COFFEE_TABLE_PRICE,
    WINE_CABINET_PRICE,
    STOVE_PRICE,
    STOVE_PRICE,
    STOVE_PRICE,
    STOVE_PRICE,
    STOVE_PRICE,
    STOVE_PRICE,
];
/**
 * 餐桌位置
 */
export const TABLE_POSITION: Array<Array<number>> = [
    [-150, 0],
    [0, 0],
    [150, 0],
    [-150, -150],
    [0, -150],
    [150, -150],
];
/**
 * 炉子位置
 */
export const STOVE_POSITION: Array<Array<number>> = [
    [-150, 0],
    [0, 0],
    [150, 0],
    [-150, -150],
    [0, -150],
    [150, -150],
];
/**
 * 食物位置
 */
export const FOOD_POSITION: Array<Array<number>> = [
    [-150, 15],
    [0, 15],
    [150, 15],
    [-150, -135],
    [0, -135],
    [150, -135],
];
/**
 * 点餐位置
 */
export const ORDER_POSITION: Array<Array<number>> = [
    [-110, 160],
    [40, 160],
    [190, 160],
    [-110, 10],
    [40, 10],
    [190, 10],
];
//-----------------------------------增加评价-----------------------------------------
/**
 * 小费台增加评价
 */
export const TIP_ADD_STAR: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384, 768, 1536];
/**
 * 餐桌增加评价
 */
export const TABLE_ADD_STAR: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384, 768, 1536, 3072, 6144];
/**
 * 植物增加评价
 */
export const PLANT_ADD_STAR: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384, 768, 1536];
/**
 * 甜品台增加评价
 */
export const DESSERT_TABLE_ADD_STAR: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384, 768];
/**
 * 地垫增加评价
 */
export const MAT_ADD_STAR: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384, 768, 1536];
/**
 * 门帘增加评价
 */
export const DOOR_CURTAIN_ADD_STAR: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384, 768, 1536, 3072];
/**
 * 墙饰增加评价
 */
export const WALL_DECORATION_ADD_STAR: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384, 768, 1536];
/**
 * 咖啡台增加评价
 */
export const COFFEE_TABLE_ADD_STAR: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384, 768, 1536];
/**
 * 酒柜增加评价
 */
export const WINE_CABINET_ADD_STAR: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384, 768, 1536];
/**
 * 火炉增加评价
 */
export const STOVE_ADD_STAR: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384];
/**
 *餐具增加评价
 */
export const TABLEWARE_ADD_STAR: Array<Array<number>> = [
    TIP_ADD_STAR,
    TABLE_ADD_STAR,
    TABLE_ADD_STAR,
    TABLE_ADD_STAR,
    PLANT_ADD_STAR,
    DESSERT_TABLE_ADD_STAR,
    TABLE_ADD_STAR,
    TABLE_ADD_STAR,
    TABLE_ADD_STAR,
    MAT_ADD_STAR,
    DOOR_CURTAIN_ADD_STAR,
    WALL_DECORATION_ADD_STAR,
    COFFEE_TABLE_ADD_STAR,
    WINE_CABINET_ADD_STAR,
    STOVE_ADD_STAR,
    STOVE_ADD_STAR,
    STOVE_ADD_STAR,
    STOVE_ADD_STAR,
    STOVE_ADD_STAR,
    STOVE_ADD_STAR,
];
//-----------------------------------增加小费收入-----------------------------------------
/**
 * 小费台增加小费收入
 */
export const TIP_ADD_FISH: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384, 768, 1536];
/**
 * 餐桌增加小费收入
 */
export const TABLE_ADD_FISH: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384, 768, 1536, 3072, 6144];
/**
 * 植物增加小费收入
 */
export const PLANT_ADD_FISH: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384, 768, 1536];
/**
 * 甜品台增加小费收入
 */
export const DESSERT_TABLE_ADD_FISH: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384, 768];
/**
 * 地垫增加小费收入
 */
export const MAT_ADD_FISH: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384, 768, 1536];
/**
 * 门帘增加小费收入
 */
export const DOOR_CURTAIN_ADD_FISH: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384, 768, 1536, 3072];
/**
 * 墙饰增加小费收入
 */
export const WALL_DECORATION_ADD_FISH: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384, 768, 1536];
/**
 * 咖啡台增加小费收入
 */
export const COFFEE_TABLE_ADD_FISH: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384, 768, 1536];
/**
 * 酒柜增加小费收入
 */
export const WINE_CABINET_ADD_FISH: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384, 768, 1536];
/**
 * 火炉增加小费收入
 */
export const STOVE_ADD_FISH: Array<number> = [3, 6, 12, 24, 48, 96, 192, 384];
/**
 *餐具增加小费收入
 */
export const TABLEWARE_ADD_FISH: Array<Array<number>> = [
    TIP_ADD_FISH,
    TABLE_ADD_FISH,
    TABLE_ADD_FISH,
    TABLE_ADD_FISH,
    PLANT_ADD_FISH,
    DESSERT_TABLE_ADD_FISH,
    TABLE_ADD_FISH,
    TABLE_ADD_FISH,
    TABLE_ADD_FISH,
    MAT_ADD_FISH,
    DOOR_CURTAIN_ADD_FISH,
    WALL_DECORATION_ADD_FISH,
    COFFEE_TABLE_ADD_FISH,
    WINE_CABINET_ADD_FISH,
    STOVE_ADD_FISH,
    STOVE_ADD_FISH,
    STOVE_ADD_FISH,
    STOVE_ADD_FISH,
    STOVE_ADD_FISH,
    STOVE_ADD_FISH,
];

//-----------------------------------解锁条件----------------------------------------
/**
 * 小费台解锁条件
 */
export const TIP_UNLOCK_STAR: Array<number> = [30, 60, 120, 240, 480, 960, 1920, 3840, 7680, 15360];
/**
 * 餐桌解锁条件
 */
export const TABLE_UNLOCK_STAR: Array<number> = [30, 60, 120, 240, 480, 960, 1920, 3840, 7680, 15360, 30720, 61440];
/**
 * 植物解锁条件
 */
export const PLANT_UNLOCK_STAR: Array<number> = [30, 60, 120, 240, 480, 960, 1920, 3840, 7680, 15360];
/**
 * 甜品台解锁条件
 */
export const DESSERT_TABLE_UNLOCK_STAR: Array<number> = [30, 60, 120, 240, 480, 960, 1920, 3840, 7680];
/**
 * 地垫解锁条件
 */
export const MAT_UNLOCK_STAR: Array<number> = [30, 60, 120, 240, 480, 960, 1920, 3840, 7680, 15360];
/**
 * 门帘解锁条件
 */
export const DOOR_CURTAIN_UNLOCK_STAR: Array<number> = [30, 60, 120, 240, 480, 960, 1920, 3840, 7680, 15360, 30720];
/**
 * 墙饰解锁条件
 */
export const WALL_DECORATION_UNLOCK_STAR: Array<number> = [30, 60, 120, 240, 480, 960, 1920, 3840, 7680, 15360];
/**
 * 咖啡台解锁条件
 */
export const COFFEE_TABLE_UNLOCK_STAR: Array<number> = [30, 60, 120, 240, 480, 960, 1920, 3840, 7680, 15360];
/**
 * 酒柜解锁条件
 */
export const WINE_CABINET_UNLOCK_STAR: Array<number> = [30, 60, 120, 240, 480, 960, 1920, 3840, 7680, 15360];
/**
 * 火炉解锁条件
 */
export const STOVE_UNLOCK_STAR: Array<number> = [30, 60, 120, 240, 480, 960, 1920, 3840];
/**
 *餐具解锁条件
 */
export const TABLEWARE_UNLOCK_STAR: Array<Array<number>> = [
    TIP_UNLOCK_STAR,
    TABLE_UNLOCK_STAR,
    TABLE_UNLOCK_STAR,
    TABLE_UNLOCK_STAR,
    PLANT_UNLOCK_STAR,
    DESSERT_TABLE_UNLOCK_STAR,
    TABLE_UNLOCK_STAR,
    TABLE_UNLOCK_STAR,
    TABLE_UNLOCK_STAR,
    MAT_UNLOCK_STAR,
    DOOR_CURTAIN_UNLOCK_STAR,
    WALL_DECORATION_UNLOCK_STAR,
    COFFEE_TABLE_UNLOCK_STAR,
    WINE_CABINET_UNLOCK_STAR,
    STOVE_UNLOCK_STAR,
    STOVE_UNLOCK_STAR,
    STOVE_UNLOCK_STAR,
    STOVE_UNLOCK_STAR,
    STOVE_UNLOCK_STAR,
    STOVE_UNLOCK_STAR,
];

//-----------------------------------顾客移动路径----------------------------------------
/**
 *顾客移动速度
 */
export const GUEST_MOVE_SPEED: number = 75;
/**
 *顾客任务：移动
 */
export const GUEST_MISSION_MOVING: number = 0;
/**
 *顾客任务：停留
 */
export const GUEST_MISSION_STAYING: number = 1;
/**
 *顾客任务：停留结束
 */
export const GUEST_MISSION_STAIED: number = 2;
/**
 *顾客位置:起点
 */
export const GUEST_POSITION_STAR: Array<number> = [75, 350];
/**
 *顾客位置:门口等待点
 */
export const GUEST_POSITION_WAIT: Array<number> = [75, 200];
/**
 *顾客位置:餐桌前
 */
export const GUEST_POSITION_TABLE_1: Array<number> = [-150, 80];
export const GUEST_POSITION_TABLE_2: Array<number> = [0, 80];
export const GUEST_POSITION_TABLE_3: Array<number> = [150, 80];
export const GUEST_POSITION_TABLE_4: Array<number> = [-150, -70];
export const GUEST_POSITION_TABLE_5: Array<number> = [0, -70];
export const GUEST_POSITION_TABLE_6: Array<number> = [150, -70];
/**
 *顾客位置:酒柜前
 */
export const GUEST_POSITION_WAIN_CABINET: Array<number> = [-160, -360];
/**
 *顾客位置:咖啡台前
 */
export const GUEST_POSITION_COFFEE_TABLE: Array<number> = [-160, 180];
/**
 *顾客位置:甜品台前
 */
export const GUEST_POSITION_DESSERT_TABLE: Array<number> = [-60, 180];
/**
 *顾客位置:小费台前
 */
export const GUEST_POSITION_TIP: Array<number> = [-50, 200];
/**
 *顾客位置:终点
 */
export const GUEST_POSITION_END: Array<number> = [75, 360];
