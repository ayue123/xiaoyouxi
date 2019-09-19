package com.arkanoid.rank.protocol;

import com.arkanoid.core.cmd.Response;

/**
 * 2019年9月11日
 *
 * @author ayue
 */
public class Response1002 implements Response {
        private int protocal;

        public int getProtocal() {
                return protocal;
        }

        public void setProtocal(int protocal) {
                this.protocal = protocal;
        }

}
