/**
 * 
 */
package com.arkanoid.rank.cmd;

import com.arkanoid.core.cmd.AbstractCmdHandler;
import com.arkanoid.core.cmd.Request;
import com.arkanoid.core.cmd.Response;
import com.arkanoid.rank.protocol.Request1002;
import com.arkanoid.rank.protocol.Response1002;

/**
 * 2019年4月9日
 *
 * @author ayue
 */
public class SavePlayerInfo1002 extends AbstractCmdHandler {

        @Override
        public void doExecute(Request request, Response response) {
                Request1002 request1002 = (Request1002) request;
                Response1002 response1002 = (Response1002) response;
                int oldScore = rankProcessor.getScore(request1002.getPlayerNickName());
                if (oldScore == 0 || request1002.getScore() > oldScore) {
                        rankProcessor.addPlayerScore(request1002.getPlayerNickName(), request1002.getScore());
                }
                response1002.setProtocal(1002);
        }
}
