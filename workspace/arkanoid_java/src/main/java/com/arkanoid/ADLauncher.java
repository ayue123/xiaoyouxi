package com.arkanoid;

import org.apache.log4j.Logger;
import org.apache.log4j.xml.DOMConfigurator;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import com.arkanoid.core.net.HttpSocket;

/**
 * @author ayue
 * @version 2019年4月6日 下午6:32:17
 */
public class ADLauncher {
        /**
         * 容器上下文对象
         */
        private static FileSystemXmlApplicationContext context;
        private static Logger logger;

        private static final String DEFAULT_LOG_CONFIG_PATH = "//usr/games/arkanoid/lib/config/log4j.xml";
        private static final String DEFAULT_PROPERTY_PATH = "//usr/games/arkanoid/lib/config/propholder.xml";
        //        private static final String DEFAULT_LOG_CONFIG_PATH = "config/log4j.xml";
        //        private static final String DEFAULT_PROPERTY_PATH = "config/propholder.xml";

        public static void main(String[] args) {
                ADLauncher launcher = new ADLauncher();
                String logConfigPath = DEFAULT_LOG_CONFIG_PATH;
                String propertyPath = DEFAULT_PROPERTY_PATH;
                launcher.start(logConfigPath, propertyPath);
        }

        private void start(String logConfigPath, String propertyPath) {
                DOMConfigurator.configureAndWatch(logConfigPath);
                logger = Logger.getLogger(getClass());
                logger.info("服务器开始启动");
                context = new FileSystemXmlApplicationContext(new String[] { propertyPath, "classpath:config/root.xml" });
                logger.info("服务器启动成功");
                HttpSocket httpSocket = ((HttpSocket) context.getBean("httpSocket"));
                httpSocket.start();
        }
}
