package com.arkanoid.rank.protocol;

import com.arkanoid.core.cmd.Request;

/**
 * 2019年9月11日
 *
 * @author ayue
 */
public class Request1002 implements Request {
        private String playerOpenId;
        private int score;

        public String getPlayerOpenId() {
                return playerOpenId;
        }

        public void setPlayerOpenId(String playerOpenId) {
                this.playerOpenId = playerOpenId;
        }

        public int getScore() {
                return score;
        }

        public void setScore(int score) {
                this.score = score;
        }

}
