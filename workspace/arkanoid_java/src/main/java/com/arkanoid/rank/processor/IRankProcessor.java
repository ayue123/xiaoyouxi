package com.arkanoid.rank.processor;

import java.util.Map;

/**
 * @author ayue
 * @version 2019年3月30日 下午11:07:49
 */
public interface IRankProcessor {
        void addPlayerScore(String playerOpenId, int score);

        Map<String, Integer> getPlayerScoreRank(int start, int count);

        int getRank(String playerOpenId);

        int getScore(String playerOpenId);
}
