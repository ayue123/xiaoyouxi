/**
 * 
 */
package com.arkanoid.core.redis.dao;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.DefaultTypedTuple;
import org.springframework.data.redis.core.ZSetOperations.TypedTuple;

import com.arkanoid.core.redis.AbstractRedisDao;

/**
 * 2019年3月19日
 *
 * @author ayue
 */
public abstract class AbstractZSetCDao<T> extends AbstractRedisDao {

        private Class<T> clazz;

        public AbstractZSetCDao(Class<T> classType) {
                this.clazz = classType;
        }

        //获取有序集合的成员数
        protected int zcard(String key) {
                return redisTemplate.opsForZSet().zCard(key).intValue();
        }

        //通过索引区间返回有序集合成指定区间内的成员，其中有序集成员按分数值递增(从小到大)顺序排列
        protected List<T> zrange(String key, long start, long end) {
                Set<String> set = redisTemplate.opsForZSet().range(key, start, end);
                return parseJsonList(setToList(set), clazz);
        }

        //通过索引区间返回有序集合成指定区间内的成员，其中有序集成员按分数值递减(从大到小)顺序排列
        protected List<T> zrangeDesc(String key, long start, long end) {
                Set<String> set = redisTemplate.opsForZSet().reverseRange(key, start, end);
                return parseJsonList(setToList(set), clazz);
        }

        //通过索引区间返回有序集合成指定区间内的成员对象，其中有序集成员按分数值递增(从小到大)顺序排列
        protected Set<TypedTuple<String>> zrangeTypedTuple(String key, long start, long end) {
                return redisTemplate.opsForZSet().rangeWithScores(key, start, end);
        }

        //通过索引区间返回有序集合成指定区间内的成员对象，其中有序集成员按分数值递减(从大到小)顺序排列
        protected Set<TypedTuple<String>> zrangeTypedTupleDesc(String key, long start, long end) {
                return redisTemplate.opsForZSet().reverseRangeWithScores(key, start, end);
        }

        private static List<String> setToList(Set<String> set) {
                if (set == null) {
                        return null;
                }
                return new ArrayList<String>(set);
        }

        protected void zadd(String key, Object obj, double score) {
                if (obj == null) {
                        return;
                }
                redisTemplate.opsForZSet().add(key, toJson(obj), score);
        }

        protected void zaddAll(String key, Set<TypedTuple<String>> tupleSet, Long timeout, TimeUnit unit) {
                if (tupleSet == null || tupleSet.isEmpty()) {
                        return;
                }

                redisTemplate.opsForZSet().add(key, tupleSet);
                if (timeout != null) {
                        redisTemplate.expire(key, timeout, unit);
                }
        }

        @SuppressWarnings("unused")
        private Set<TypedTuple<String>> toTupleSet(List<TypedTuple<String>> tupleList) {
                Set<TypedTuple<String>> tupleSet = new LinkedHashSet<TypedTuple<String>>();
                for (TypedTuple<?> t : tupleList) {
                        tupleSet.add(new DefaultTypedTuple<String>(toJson(t.getValue()), t.getScore()));
                }
                return tupleSet;
        }

        protected void zrem(String key, Object obj) {
                if (obj == null) {
                        return;
                }
                redisTemplate.opsForZSet().remove(key, toJson(obj));
        }

        @SuppressWarnings("hiding")
        protected <T> void zremList(String key, List<T> objs) {
                if (objs == null || objs.size() <= 0) {
                        return;
                }
                List<String> strList = this.toJsonList(objs);
                redisTemplate.opsForZSet().remove(key, strList.toArray());
        }

        //计算给定的一个有序集的并集，并存储在新的 destKey中，key相同的话会把score值相加
        protected void unionStore(String destKey, Collection<String> keys, Long timeout, TimeUnit unit) {
                if (keys == null || keys.isEmpty()) {
                        return;
                }

                Object[] keyArr = keys.toArray();
                String key = (String) keyArr[0];

                Collection<String> otherKeys = new ArrayList<String>(keys.size() - 1);
                for (int i = 1; i < keyArr.length; i++) {
                        otherKeys.add((String) keyArr[i]);
                }

                redisTemplate.opsForZSet().unionAndStore(key, otherKeys, destKey);
                if (timeout != null) {
                        redisTemplate.expire(destKey, timeout, unit);
                }
        }

        //获取指定成员的score值
        protected Double getScore(String key, Object obj) {
                return redisTemplate.opsForZSet().score(key, toJson(obj));
        }

        //返回指定集合中指定对象的排名，其中有序集成员按分数值递增(从小到大)顺序排列
        protected Long getRank(String key, Object obj) {
                return redisTemplate.opsForZSet().rank(key, toJson(obj));
        }

        //返回有序集中指定成员的排名，其中有序集成员按分数值递减(从大到小)顺序排列
        protected Long getDescRank(String key, Object obj) {
                return redisTemplate.opsForZSet().reverseRank(key, toJson(obj));
        }

}
