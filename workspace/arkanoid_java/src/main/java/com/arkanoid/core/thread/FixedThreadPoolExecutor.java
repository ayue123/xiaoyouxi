package com.arkanoid.core.thread;

import java.lang.Thread.UncaughtExceptionHandler;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * @author ayue
 * @version 2019年4月6日 下午6:42:34
 */
public class FixedThreadPoolExecutor extends ThreadPoolExecutor {

	public FixedThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveSecond, String poolName,
			UncaughtExceptionHandler uncaughtExceptionHandler) {
		super(corePoolSize, maximumPoolSize, keepAliveSecond, TimeUnit.SECONDS, new LinkedBlockingQueue<Runnable>(),
				new NamePreservedThreadFactory(poolName, uncaughtExceptionHandler));
	}

	public FixedThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveSecond) {
		super(corePoolSize, maximumPoolSize, keepAliveSecond, TimeUnit.SECONDS, new LinkedBlockingQueue<Runnable>());
	}

	/**
	 * ͬ
	 * 
	 * @author ZhangYu
	 * @descirption
	 */
	private static class NamePreservedThreadFactory implements ThreadFactory {
		static final AtomicInteger poolNumber = new AtomicInteger(1);
		final ThreadGroup group;
		final AtomicInteger threadNumber = new AtomicInteger(1);
		final String namePrefix;
		final UncaughtExceptionHandler uncaughtExceptionHandler;

		NamePreservedThreadFactory(String poolName, UncaughtExceptionHandler uncaughtExceptionHandler) {
			SecurityManager s = System.getSecurityManager();
			group = (s != null) ? s.getThreadGroup() : Thread.currentThread().getThreadGroup();
			if (poolName == null || poolName.trim().equals("")) {
				namePrefix = "pool-" + poolNumber.getAndIncrement() + "-thread-";
			} else {
				namePrefix = poolName + "-" + poolNumber.getAndIncrement() + "-thread-";
			}
			this.uncaughtExceptionHandler = uncaughtExceptionHandler;
		}

		public Thread newThread(Runnable r) {
			Thread t = new Thread(group, r, namePrefix + threadNumber.getAndIncrement(), 0);
			t.setUncaughtExceptionHandler(uncaughtExceptionHandler);
			if (t.isDaemon())
				t.setDaemon(false);
			if (t.getPriority() != Thread.NORM_PRIORITY)
				t.setPriority(Thread.NORM_PRIORITY);
			return t;
		}
	}

}