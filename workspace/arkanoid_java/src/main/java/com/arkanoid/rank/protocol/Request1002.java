package com.arkanoid.rank.protocol;

import com.arkanoid.core.cmd.Request;

/**
 * 2019年9月11日
 *
 * @author ayue
 */
public class Request1002 implements Request {
        private String playerNickName;
        private int score;

        public String getPlayerNickName() {
                return playerNickName;
        }

        public void setPlayerNickName(String playerNickName) {
                this.playerNickName = playerNickName;
        }

        public int getScore() {
                return score;
        }

        public void setScore(int score) {
                this.score = score;
        }

}
