// Verified against the Redis article's diagrams, charts, and accompanying text.
const imageDescriptions = {
  "/images/Backend/cache_stampede_thumbnail.png": "",
  "/images/Backend/cache_stampede_ex.png": "정상 캐시 조회와 캐시 만료 시 애플리케이션 요청이 Redis를 거쳐 MySQL로 몰리는 흐름을 비교한 시퀀스 도식",
  "/images/Backend/cache_stempede.png": "초기 데이터 주입과 10초 뒤 캐시 만료 시 MySQL QPS가 각각 급증하는 그래프",
  "/images/Backend/cache_stampede_a.png": "10초 주기의 캐시 만료마다 MySQL QPS가 약 600까지 반복 상승하는 그래프",
  "/images/Backend/jitter_basic.png": "지터 적용 전 QPS 급증과 적용 후 만료 부하가 분산되는 변화를 보여주는 그래프",
  "/images/Backend/cache_steampede_vs_jitter.png": "지터 미적용 시 약 600 QPS의 반복 급증과 적용 후 약 200 QPS의 완만한 부하를 비교한 그래프",
  "/images/Backend/hot_key.png": "초기 데이터 주입과 핫키 만료 때 MySQL QPS가 비슷한 수준으로 급증하는 그래프",
  "/images/Backend/hot_key_count.png": "락 미적용 핫키 실험에서 동일 키의 캐시 미스가 72회 기록된 로그",
  "/images/Backend/hot_key_a.png": "지속적인 요청 중 핫키 만료마다 MySQL QPS가 1천 대까지 반복 급증하는 그래프",
  "/images/Backend/hot_key_one.png": "락 적용 후 초기 데이터 주입 이후 핫키 만료 구간의 MySQL QPS 급증이 줄어든 그래프",
  "/images/Backend/hot_key_one_count.png": "락 적용 핫키 실험에서 동일 키의 캐시 미스가 1회로 줄어든 로그",
  "/images/Backend/hot_key_lock_a.png": "락 적용 후 지속 요청의 MySQL QPS 최고치가 약 600으로 줄었으나 캐시 스탬피드가 남아 있는 그래프",
  "/images/Backend/hot_key_vs_a.png": "락 미적용과 적용 구간을 이어 비교해 MySQL QPS 급증의 감소를 보여주는 그래프",
  "/images/Backend/hot_key_basic_count.png": "락 미적용 시 60초 동안 캐시 미스 1,187회를 기록한 로그",
  "/images/Backend/hot_key_lock_count.png": "락 적용 시 60초 동안 캐시 미스 500회를 기록한 로그",
};

export function getArticleImageDescription(src, suppliedAlt) {
  if (typeof suppliedAlt === "string") return suppliedAlt;
  return imageDescriptions[src] ?? "본문에 첨부된 참고 이미지";
}
