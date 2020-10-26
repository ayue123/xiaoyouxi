/*
 * @Author: ayue
 * @Date: 2020-10-12 20:55:58
 * @Last Modified by: ayue
 * @Last Modified time: 2020-10-26 19:07:07
 */

import { Map } from "../script/collections/Map";
import { Currency } from "./object/Currency";
import { Fish } from "./object/Fish";
import { Guest } from "./object/Guest";
import { objectCollection } from "./object/ObjectCollection";
import { Star } from "./object/Star";
export class Test {
    mainTest() {
        //map集合测试
        let map: Map<number, number> = new Map<number, number>();
        map.put(1, 2);
        map.forEach((hash) => {
            console.log(hash.key);
            console.log(hash.value);
        });

        this.createFish();
        this.createStar();
        this.createGuest();
    }

    createFish() {
        let fish: Fish = new Fish();
        fish.createFish(objectCollection.getDiningRoomNode());
    }

    createStar() {
        let star: Star = new Star();
        star.createStar();
    }

    createGuest() {
        let guest: Guest = new Guest();
        guest.createGuest();
    }
}
