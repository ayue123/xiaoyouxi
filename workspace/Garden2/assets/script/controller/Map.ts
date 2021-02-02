/*
 * @Author: ayue 
 * @Date: 2020-12-03 14:58:34 
 * @Last Modified by:   ayue 
 * @Last Modified time: 2020-12-03 14:58:34 
 */

export interface KeyValue<K, V> {
    key: K;
    value: V;
}

/**
 * HashMap泛型实现
 */
export class Map<K, V> {
    //存储列表
    private _list: KeyValue<K, V>[];

    constructor() {
        this.clear();
    }

    //通过key获取索引
    private getIndexByKey(key: K): number {
        var count: number = this._list.length;
        for (let index = 0; index < count; index++) {
            const element: KeyValue<K, V> = this._list[index];
            if (element.key == key) {
                return index;
            }
        }
        return -1;
    }

    /**
     * 添加键值
     */
    public put(key: K, value: V): void {
        var data: KeyValue<K, V> = {key: key, value: value};
        var index: number = this.getIndexByKey(key);
        if (index != -1) {
            //已存在：刷新值
            this._list[index] = data;
        } else {
            //不存在：添加值
            this._list.push(data);
        }
    }

    /**
     * 删除键值
     */
    public remove(key: K): any {
        var index: number = this.getIndexByKey(key);
        if (index != -1) {
            var data: KeyValue<K, V> = this._list[index];
            this._list.splice(index, 1);
            return data;
        }
        return null;
    }

    /**
     * 是否存在键
     */
    public containsKey(key: K): boolean {
        var index: number = this.getIndexByKey(key);
        return index != -1;
    }

    /**
     * 通过key获取键值value
     * @param key
     */
    public get(key: K): V {
        var index: number = this.getIndexByKey(key);
        if (index != -1) {
            var data: KeyValue<K, V> = this._list[index];
            return data.value;
        }
        return null;
    }

    /**
     * 获取数据个数
     */
    public get size(): number {
        return this._list.length;
    }

    /**
     * 遍历列表，回调(data:KeyValue<K, V>)
     */
    public forEach(f: { (data: KeyValue<K, V>): void }) {
        var count: number = this._list.length;
        for (let index = 0; index < count; index++) {
            const element: KeyValue<K, V> = this._list[index];
            f(element);
        }
    }

    /**
     * 清空全部
     */
    public clear(): void {
        this._list = [];
    }

    /**
     * 获取所有key值
     */
    public keySet(): Array<any> {
        let keys = [];
        var count: number = this._list.length;
        for (let index = 0; index < count; index++) {
            const element: KeyValue<K, V> = this._list[index];
            keys.push(element.key);
        }
        return keys;
    }

    /**
     * 获取所有value值
     */
    public values(): Array<any> {
        let values = [];
        var count: number = this._list.length;
        for (let index = 0; index < count; index++) {
            const element: KeyValue<K, V> = this._list[index];
            values.push(element.value);
        }
        return values;
    }
}
