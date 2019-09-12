package com.arkanoid.rank.protocol;

import java.util.Map;

import com.arkanoid.core.cmd.Response;

/**
 * @author ayue
 * @version 2019年4月6日 下午8:36:01
 */
public class Response1001 implements Response {
        private Map<String, Integer> map;

        public Map<String, Integer> getMap() {
                return map;
        }

        public void setMap(Map<String, Integer> map) {
                this.map = map;
        }

}
