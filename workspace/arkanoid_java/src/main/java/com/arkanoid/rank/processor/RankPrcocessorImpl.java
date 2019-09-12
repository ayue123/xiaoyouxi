package com.arkanoid.rank.processor;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.arkanoid.rank.dao.ScoreRankZSetDao;

/**
 * @author ayue
 * @version 2019年3月30日 下午11:08:05
 */
public class RankPrcocessorImpl implements IRankProcessor {
        @Autowired
        private ScoreRankZSetDao scoreRankZSetDao;

        @Override
        public void addPlayerScore(String playerOpenId, int score) {
                scoreRankZSetDao.addPlayerScore(playerOpenId, score);
        }

        @Override
        public Map<String, Integer> getPlayerScoreRank(int start, int count) {
                return scoreRankZSetDao.getPlayerScoreRank(start, count);
        }

        @Override
        public int getRank(String playerOpenId) {
                return scoreRankZSetDao.getRank(playerOpenId);
        }

        @Override
        public int getScore(String playerOpenId) {
                return scoreRankZSetDao.getPlayerScore(playerOpenId);
        }

}
