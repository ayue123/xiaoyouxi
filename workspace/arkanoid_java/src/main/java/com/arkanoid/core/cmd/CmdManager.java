package com.arkanoid.core.cmd;

import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;

/**
 * @author ayue
 * @version 2019年3月30日 下午10:46:33
 */
public class CmdManager {
        Logger logger = Logger.getLogger(this.getClass());

        @Autowired
        private Map<Integer, ICmdHandler> cmdHandlersMap;
        @Autowired
        private Map<Integer, Request> protocolRequestMap;
        @Autowired
        private Map<Integer, Response> protocolResponseMap;

        public String calcul(String requestPotocol) {
                String[] splits = requestPotocol.split("-");
                String cmdId = splits[0];
                String jsonObject = splits[1];
                ICmdHandler iCmdHandler = cmdHandlersMap.get(cmdId);
                if (iCmdHandler == null) {
                        logger.error(cmdId + "协议没有处理的handler");
                        return null;
                }
                try {
                        logger.debug("进入" + cmdId + "协议体");
                        Request request = JSON.parseObject(jsonObject, protocolRequestMap.get(cmdId).getClass());
                        Response response = protocolResponseMap.get(cmdId);
                        iCmdHandler.execute(request, response);
                        // 返回消息组装
                        String responseProtocol = JSON.toJSONString(response, SerializerFeature.SortField);
                        return responseProtocol;
                } catch (Exception e) {
                        logger.info("协议-" + cmdId + "-报错" + e);
                }
                return null;
        }
}
