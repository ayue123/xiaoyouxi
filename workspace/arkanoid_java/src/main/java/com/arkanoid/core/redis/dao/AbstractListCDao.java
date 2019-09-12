/**
 * 
 */
package com.arkanoid.core.redis.dao;

import java.util.Collection;
import java.util.List;
import java.util.concurrent.TimeUnit;

import com.arkanoid.core.redis.AbstractRedisDao;

/**
 * 2019年3月19日
 *
 * @author ayue
 */
public abstract class AbstractListCDao<T> extends AbstractRedisDao {

        private Class<T> clazz;

        public AbstractListCDao(Class<T> classType) {
                this.clazz = classType;
        }

        protected int size(String key) {
                return redisTemplate.opsForList().size(key).intValue();
        }

        protected List<T> range(String key, long start, long end) {
                List<String> list = redisTemplate.opsForList().range(key, start, end);
                return parseJsonList(list, clazz);
        }

        protected T lIndex(String key, long index) {
                String str = redisTemplate.opsForList().index(key, index);
                return parseJson(str, clazz);
        }

        protected void rightPushAll(String key, Collection<?> values, Long timeout, TimeUnit unit) {
                if (values == null || values.isEmpty()) {
                        return;
                }

                redisTemplate.opsForList().rightPushAll(key, toJsonList(values));
                if (timeout != null) {
                        redisTemplate.expire(key, timeout, unit);
                }
        }

        protected void leftPush(String key, T obj) {
                if (obj == null) {
                        return;
                }

                redisTemplate.opsForList().leftPush(key, toJson(obj));
        }

        protected T leftPop(String key) {
                String value = redisTemplate.opsForList().leftPop(key);
                return parseJson(value, clazz);
        }

        protected void remove(String key, int count, Object obj) {
                if (obj == null) {
                        return;
                }

                redisTemplate.opsForList().remove(key, count, toJson(obj));
        }

        protected void trim(String key, long start, long end) {
                redisTemplate.opsForList().trim(key, start, end);
        }

}
