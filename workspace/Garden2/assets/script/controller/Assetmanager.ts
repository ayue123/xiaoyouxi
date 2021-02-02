import {
	FLOWER_NAME,
	FLOWER_PROPORTION,
	FLOWER_TEXTUREPATH,
} from "../config/FlowerConfig";
import {
	FLOWERPOT_PRICE,
	FLOWER_PRICE,
	LAMP_PRICE,
	STOVE_PRICE,
	TAP_PRICE,
} from "../config/MoneyConfig";
import { FLOWER_TIME } from "../config/TimeConfig";
import {
	TOOL_ADDITION_LAMP,
	TOOL_ADDITION_STOVE,
	TOOL_ADDITION_TAP,
	TOOL_NAME_LAMP,
	TOOL_NAME_STOVE,
	TOOL_NAME_TAP,
	TOOL_TEXTUREPATH_LAMP,
	TOOL_TEXTUREPATH_STOVE,
	TOOL_TEXTUREPATH_TAP,
} from "../config/ToolConfig";

/*
 * @Author: ayue
 * @Date: 2020-12-12 16:50:40
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-11 14:05:22
 */
export class AssetManager {
	// 单例
	private static _inst: AssetManager;
	public static get inst() {
		return AssetManager._inst || (AssetManager._inst = new AssetManager());
	}

	public loadDir(callBack) {
		cc.loader.loadResDir("prefab", function (err, urls: string[]) {
			if (err) {
				cc.error(err.message || err);
				return;
			}
			cc.log("预加载资源数量: " + urls.length);
			callBack();
		});
	}

	public async loadRes(url: string, callBack) {
		cc.loader.loadRes(url, (error: Error, res: cc.Asset) => {
			if (error) {
				console.warn(
					`etec_asset_manager:loadAsync:${url}:error:${error.message}`
				);
			} else {
				if (res) {
					callBack(res);
				}
			}
		});
	}

	public get(url: string) {
		return cc.loader.getRes(url);
	}

	public generateNode(res: any) {
		return cc.instantiate(res);
	}

	public loadJson() {
		cc.loader.loadResDir("json", function (err, object) {
			if (err) {
				console.log(err);
				return;
			}
			for (let i = 0; i < object.length; i++) {
				let o = object[i];
				let configName = o.name;
				let config = null;
				if (configName == "tool_name_lamp") {
					config = TOOL_NAME_LAMP;
				} else if (configName == "tool_name_stove") {
					config = TOOL_NAME_STOVE;
				} else if (configName == "tool_name_tap") {
					config = TOOL_NAME_TAP;
				} else if (configName == "tool_texturepath_lamp") {
					config = TOOL_TEXTUREPATH_LAMP;
				} else if (configName == "tool_texturepath_stove") {
					config = TOOL_TEXTUREPATH_STOVE;
				} else if (configName == "tool_texturepath_tap") {
					config = TOOL_TEXTUREPATH_TAP;
				} else if (configName == "tool_addition_lamp") {
					config = TOOL_ADDITION_LAMP;
				} else if (configName == "tool_addition_stove") {
					config = TOOL_ADDITION_STOVE;
				} else if (configName == "tool_addition_tap") {
					config = TOOL_ADDITION_TAP;
				} else if (configName == "tool_price_lamp") {
					config = LAMP_PRICE;
				} else if (configName == "tool_price_stove") {
					config = STOVE_PRICE;
				} else if (configName == "tool_price_tap") {
					config = TAP_PRICE;
				} else if (configName == "flower_name") {
					config = FLOWER_NAME;
				} else if (configName == "flower_price") {
					config = FLOWER_PRICE;
				} else if (configName == "flower_proportion") {
					config = FLOWER_PROPORTION;
				} else if (configName == "flower_texturepath") {
					config = FLOWER_TEXTUREPATH;
				} else if (configName == "flower_time") {
					config = FLOWER_TIME;
				} else if (configName == "flowerpot_price") {
					config = FLOWERPOT_PRICE;
				}
				let res = object[i].json.RECORDS;
				for (let j = 0; j < res.length; j++) {
					config.put(res[j].key, res[j].value);
				}
			}
		});
	}
}

export var assetManager = AssetManager.inst;
