/**
 * 
 */
package com.arkanoid.core.redis.dao;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import com.arkanoid.core.redis.AbstractRedisDao;

/**
 * 2019年3月19日
 *
 * @author ayue
 */
public abstract class AbstractStringCDao<T> extends AbstractRedisDao {

        private Class<T> clazz;

        public AbstractStringCDao(Class<T> classType) {
                this.clazz = classType;
        }

        protected T get(String key) {
                String value = redisTemplate.opsForValue().get(key);
                if (value == null) {
                        return null;
                }
                return parseJson(value, clazz);
        }

        protected List<T> mget(Collection<String> keys) {
                List<String> values = redisTemplate.opsForValue().multiGet(keys);
                return parseJsonList(values, clazz);
        }

        protected void set(String key, T obj, Long timeout) {
                if (obj == null) {
                        return;
                }

                String value = toJson(obj);
                if (timeout != null) {
                        redisTemplate.opsForValue().set(key, value, timeout, TimeUnit.SECONDS);
                } else {
                        redisTemplate.opsForValue().set(key, value);
                }
        }

        protected void mset(Map<String, String> valueMap, Long timeout) {
                if (valueMap == null || valueMap.size() <= 0) {
                        return;
                }

                redisTemplate.opsForValue().multiSet(valueMap);
                if (timeout != null) {
                        for (String key : valueMap.keySet()) {
                                redisTemplate.expire(key, timeout, TimeUnit.SECONDS);
                        }
                }
        }

        protected T getAndSet(String key, T obj) {
                if (obj == null) {
                        return get(key);
                }

                String value = redisTemplate.opsForValue().getAndSet(key, toJson(obj));
                return parseJson(value, clazz);
        }

        protected int decrement(String key, int delta) {
                Long value = redisTemplate.opsForValue().increment(key, -delta);
                return value.intValue();
        }

        protected int increment(String key, int delta) {
                Long value = redisTemplate.opsForValue().increment(key, delta);
                return value.intValue();
        }

}
