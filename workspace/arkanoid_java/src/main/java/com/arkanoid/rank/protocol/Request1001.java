package com.arkanoid.rank.protocol;

import com.arkanoid.core.cmd.Request;

/**
 * @author ayue
 * @version 2019年4月6日 下午8:34:02
 */
public class Request1001 implements Request {
        private int start;
        private int count;

        public int getStart() {
                return start;
        }

        public void setStart(int start) {
                this.start = start;
        }

        public int getCount() {
                return count;
        }

        public void setCount(int count) {
                this.count = count;
        }

}
