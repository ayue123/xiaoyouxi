/*
 * @Author: ayue
 * @Date: 2020-12-17 15:39:53
 * @Last Modified by: ayue
 * @Last Modified time: 2021-01-14 15:06:35
 */
import { AbstratObject } from "./AbstractObject";
import { objects } from "./ObjectCollection";

const { ccclass, property } = cc._decorator;

/**
 * 背景类
 */
@ccclass
export class Background extends AbstratObject {
	onLoad() {
		objects.addBackground(this);
		let audioSource: cc.AudioSource = this.node.getComponent(cc.AudioSource);
		cc.audioEngine.play(audioSource.clip, true, 1);
	}
}
