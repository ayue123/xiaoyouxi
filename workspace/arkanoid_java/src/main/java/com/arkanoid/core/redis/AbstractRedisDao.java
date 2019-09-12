/**
 * 
 */
package com.arkanoid.core.redis;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;

/**
 * 2019年3月19日
 *
 * @author ayue
 */
public abstract class AbstractRedisDao {

        @Autowired
        protected RedisTemplate<String, String> redisTemplate;

        /* ----------- common --------- */
        protected Set<String> keys(String pattern) {
                return redisTemplate.keys(pattern);
        }

        protected void delete(String key) {
                redisTemplate.delete(key);
        }

        protected void delete(Collection<String> key) {
                redisTemplate.delete(key);
        }

        /* ----------- tool methods --------- */
        protected String toJson(Object obj) {
                return JSON.toJSONString(obj, SerializerFeature.SortField);
        }

        protected <T> T parseJson(String json, Class<T> clazz) {
                return JSON.parseObject(json, clazz);
        }

        protected List<String> toJsonList(Collection<?> values) {
                if (values == null) {
                        return null;
                }

                List<String> result = new ArrayList<String>();
                for (Object obj : values) {
                        result.add(toJson(obj));
                }
                return result;
        }

        protected <T> List<T> parseJsonList(List<String> list, Class<T> clazz) {
                if (list == null) {
                        return null;
                }

                List<T> result = new ArrayList<T>();
                for (String s : list) {
                        T t = parseJson(s, clazz);
                        if (t != null) {
                                result.add(t);
                        }
                }
                return result;
        }

}
