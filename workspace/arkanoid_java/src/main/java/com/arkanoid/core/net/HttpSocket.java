package com.arkanoid.core.net;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Date;
import java.util.concurrent.ExecutorService;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.arkanoid.core.cmd.CmdManager;

/**
 * @author ayue
 * @version 2019年4月6日 下午5:09:21
 */
public class HttpSocket {
        Logger logger = Logger.getLogger(this.getClass());
        @Autowired
        private ExecutorService eventExecutor;
        @Autowired
        private CmdManager cmdManager;

        public void start() {
                ServerSocket serverSocket = null;
                try {
                        serverSocket = new ServerSocket(17594);
                        while (true) {
                                Socket socket = serverSocket.accept();
                                eventExecutor.execute(new ExeSocketTask(socket, this, cmdManager));
                        }
                } catch (Exception e) {
                        logger.info("sockert启动失败");
                        e.printStackTrace();
                }

        }

        private class ExeSocketTask implements Runnable {
                private Socket socket;
                private HttpSocket httpSocket;
                private CmdManager cmdManager;

                private ExeSocketTask(Socket socket, HttpSocket httpSocket, CmdManager cmdManager) {
                        this.socket = socket;
                        this.httpSocket = httpSocket;
                        this.cmdManager = cmdManager;
                }

                public void run() {
                        httpSocket.exeSocket(socket, cmdManager);
                }
        }

        private void exeSocket(Socket socket, CmdManager cmdManager) {
                try {
                        InetAddress insocket = socket.getInetAddress();
                        InputStream is = socket.getInputStream();
                        OutputStream os = socket.getOutputStream();
                        InputStreamReader isr = new InputStreamReader(is);
                        StringBuilder builder = new StringBuilder();
                        char[] charBuf = new char[1024];
                        int mark = -1;
                        while ((mark = isr.read(charBuf)) != -1) {
                                builder.append(charBuf, 0, mark);
                                // 一次读1024个字节，当小于1024个字节时结束读取
                                if (mark < charBuf.length) {
                                        break;
                                }
                        }
                        if (mark == -1) {
                                return;
                        }

                        String[] splits = builder.toString().split("\r\n");

                        String requestProtocal = splits[splits.length - 1];
                        logger.info(requestProtocal);
                        String responseProtocol = "";
                        if (requestProtocal.contains("Accept-Encoding")) {
                                responseProtocol = "refresh";
                        } else {
                                String head = requestProtocal.substring(0, 4);
                                if (!head.equals("AYUE")) {
                                        logger.error("协议头错误,IP:" + insocket + ";内容：" + requestProtocal);
                                        return;
                                }
                                requestProtocal = requestProtocal.substring(4, requestProtocal.length());
                                responseProtocol = cmdManager.calcul(requestProtocal);
                        }
                        os.write("HTTP/1.1 200 OK\r\n".getBytes());
                        os.write("Content-Type:text/html;charset=utf-8\r\n".getBytes());
                        os.write("Server:gybs\r\n".getBytes());
                        os.write(("Date:" + new Date() + "\r\n").getBytes());
                        // 实现跨域访问
                        os.write(("Access-Control-Allow-Origin:*" + "\r\n").getBytes());
                        os.write("\r\n".getBytes());
                        os.write(responseProtocol.getBytes("utf-8"));
                        os.close();
                        is.close();
                        socket.close();
                } catch (IOException e) {
                        e.printStackTrace();
                }
        }

}
