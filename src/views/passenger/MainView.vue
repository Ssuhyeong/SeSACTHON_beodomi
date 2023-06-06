<template>
  <div class="main">
    <button class="btn" @click="goSearchView">버스 노선 검색</button>
    <button class="btn" @click="goFavoriteStopView">승차벨 사용 이력</button>
    <button class="btn" @click="goNearStopView">가까운 정류장</button>
  </div>
</template>

<script>
  import router from '@/router/index';

  export default {
    name: 'MainView',
    setup() {
      // 버스 노선 검색 페이지로 이동
      const goSearchView = () => {
        router.push('/search');
      };

      // 즐겨 찾는 정류장 페이지로 이동
      const goFavoriteStopView = () => {
        router.push('/favoriteStop');
      };

      // 가까운 정류장 페이지로 이동
      const goNearStopView = () => {
        router.push('/nearStop');
      };

      return {
        goSearchView,
        goFavoriteStopView,
        goNearStopView,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .main {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    font-family: 'KoddiUDOnGothic-Regular';

    .btn {
      height: 186px;
      background-color: $primary;
      color: $secondary;
      font-size: 30px;
      font-weight: 700;
      line-height: 22px;
      text-align: center;
      letter-spacing: -0.408px;
      margin-bottom: 6px;
    }
  }
</style>
