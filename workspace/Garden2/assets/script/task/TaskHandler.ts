/*
 * @Author: ayue
 * @Date: 2020-12-29 11:31:08
 * @Last Modified by: ayue
 * @Last Modified time: 2020-12-30 15:48:55
 */

/**
 * 时间处理类
 */
export class TaskHandler {
	// 单例
	private static _inst: TaskHandler;
	public static get inst() {
		if (TaskHandler._inst == null) {
			TaskHandler._inst = new TaskHandler();
		}
		return TaskHandler._inst;
	}

	getTime(): number {
		return new Date().getTime();
		//TODO 改为获取网络时间
	}
}
export var taskHandler = TaskHandler.inst;
