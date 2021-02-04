/*
 * @Author: ayue
 * @Date: 2020-12-12 16:50:40
 * @Last Modified by: ayue
 * @Last Modified time: 2021-02-02 11:32:06
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
				//TODO
				let res = object[i].json.RECORDS;
				for (let j = 0; j < res.length; j++) {
					config.put(res[j].key, res[j].value);
				}
			}
		});
	}
}

export var assetManager = AssetManager.inst;
