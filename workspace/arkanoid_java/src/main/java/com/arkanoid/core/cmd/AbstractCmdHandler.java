package com.arkanoid.core.cmd;

import org.springframework.beans.factory.annotation.Autowired;

import com.arkanoid.rank.processor.IRankProcessor;

/**
 * @author ayue
 * @version 2019年3月30日 下午10:53:05
 */
public abstract class AbstractCmdHandler implements ICmdHandler {
        @Autowired
        protected IRankProcessor rankProcessor;

        public void execute(Request request, Response response) {
                this.doExecute(request, response);
        }

        public abstract void doExecute(Request request, Response response);
}
