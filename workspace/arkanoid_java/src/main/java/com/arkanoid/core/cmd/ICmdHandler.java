package com.arkanoid.core.cmd;

/**
 * @author ayue
 * @version 2019年3月30日 下午10:44:23
 */
public interface ICmdHandler {
	void execute(Request request, Response response);
}
