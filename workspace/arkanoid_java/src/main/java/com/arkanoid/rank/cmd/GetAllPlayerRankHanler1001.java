package com.arkanoid.rank.cmd;

import java.util.Map;

import com.arkanoid.core.cmd.AbstractCmdHandler;
import com.arkanoid.core.cmd.Request;
import com.arkanoid.core.cmd.Response;
import com.arkanoid.rank.protocol.Request1001;
import com.arkanoid.rank.protocol.Response1001;

/**
 * @author ayue
 * @version 2019年3月30日 下午11:06:24
 */
public class GetAllPlayerRankHanler1001 extends AbstractCmdHandler {

        @Override
        public void doExecute(Request request, Response response) {
                Request1001 request1001 = (Request1001) request;
                Response1001 response1001 = (Response1001) response;
                int start = request1001.getStart();
                int count = request1001.getCount();
                Map<String, Integer> map = rankProcessor.getPlayerScoreRank(start, count);
                response1001.setMap(map);
        }
}
