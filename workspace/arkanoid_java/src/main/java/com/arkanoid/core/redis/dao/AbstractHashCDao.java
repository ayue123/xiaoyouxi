/**
 * 
 */
package com.arkanoid.core.redis.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.arkanoid.core.redis.AbstractRedisDao;

/**
 * 2019年3月19日
 *
 * @author ayue
 */
public abstract class AbstractHashCDao<T> extends AbstractRedisDao {

        private Class<T> clazz;

        protected AbstractHashCDao(Class<T> classType) {
                this.clazz = classType;
        }

        protected void put(String key, String field, T value) {
                redisTemplate.opsForHash().put(key, field, toJson(value));
        }

        protected void put(String key, Map<String, T> map) {
                if (map != null && map.size() > 0) {
                        Map<String, String> putMap = new HashMap<String, String>();
                        for (Entry<String, T> entry : map.entrySet()) {
                                putMap.put(entry.getKey(), toJson(entry.getValue()));
                        }
                        redisTemplate.opsForHash().putAll(key, putMap);
                }
        }

        protected void remove(String key, String field) {
                redisTemplate.opsForHash().delete(key, field);
        }

        protected void remove(String key, List<String> fields) {
                redisTemplate.opsForHash().delete(key, fields.toArray());
        }

        protected boolean exists(String key, String field) {
                return redisTemplate.opsForHash().hasKey(key, field);
        }

        protected T get(String key, String field) {
                Object object = redisTemplate.opsForHash().get(key, field);
                if (object == null) {
                        return null;
                }
                String value = redisTemplate.opsForHash().get(key, field).toString();
                return parseJson(value, clazz);
        }

        protected Map<String, T> getAll(String key) {
                Map<Object, Object> map = redisTemplate.opsForHash().entries(key);
                if (map != null && map.size() > 0) {
                        Map<String, T> resultMap = new HashMap<String, T>();
                        for (Entry<Object, Object> entry : map.entrySet()) {
                                resultMap.put(entry.getKey().toString(), parseJson(entry.getValue().toString(), clazz));
                        }
                        return resultMap;
                }
                return null;
        }

        protected List<T> getListById(String key, List<String> fields) {
                List<Object> list = redisTemplate.opsForHash().multiGet(key, new ArrayList<Object>(fields));
                if (list != null && list.size() > 0) {
                        List<T> resultList = new ArrayList<T>(list.size());
                        for (Object obj : list) {
                                T t = parseJson(obj.toString(), clazz);
                                resultList.add(t);
                        }
                        return resultList;
                }
                return null;
        }

        protected int decrement(String key, String field, int delta) {
                Long value = redisTemplate.opsForHash().increment(key, field, -delta);
                return value.intValue();
        }

        protected long increment(String key, String field, int delta) {
                Long value = redisTemplate.opsForHash().increment(key, field, delta);
                return value;
        }

        protected long size(String key) {
                return redisTemplate.opsForHash().size(key);
        }

}
