package com.arkanoid.core.thread;

import java.lang.Thread.UncaughtExceptionHandler;

import org.apache.log4j.Logger;

/**
 * @author ayue
 * @version 2019年4月6日 下午6:45:34
 */
public class ThreadUncaughtExceptionHandler implements UncaughtExceptionHandler {
	private Logger logger = Logger.getLogger(ThreadUncaughtExceptionHandler.class);

	public void uncaughtException(Thread t, Throwable e) {
		logger.error("[Thread=" + t.getName() + "]-报错", e);
	}
}
