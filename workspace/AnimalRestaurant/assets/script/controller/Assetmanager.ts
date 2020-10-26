/*
 * @Author: ayue
 * @Date: 2020-10-12 21:00:28
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-12 21:00:51
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

    /**
     * name
     */
    public async loadRes(url: string, callBack) {
        cc.loader.loadRes(url, (error: Error, res: cc.Asset) => {
            if (error) {
                console.warn(`etec_asset_manager:loadAsync:${url}:error:${error.message}`);
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
}
export var assetManager = AssetManager.inst;
