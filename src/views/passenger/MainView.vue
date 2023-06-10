<template>
  <div>
    <NavComp :content="wholeText" pageName="main" />

    <div class="main">
      <button class="btn" @click="goSearchView">버스 노선 검색</button>
      <button class="btn" @click="goStopHistoryView">승차벨 사용 이력</button>
      <button class="btn" @click="goNearStopView">가까운 정류장</button>
    </div>
  </div>
</template>

<script>
  import router from '@/router/index';
  import NavComp from '@/components/NavComp.vue';
  export default {
    name: 'MainView',

    components: {NavComp},
    setup() {
      // 읽어줄 전체 텍스트
      const wholeText = '버스 노선 검색 버튼   승차벨 사용 이력 버튼   가까운 정류장 버튼';

      // 버스 노선 검색 페이지로 이동
      const goSearchView = () => {
        router.push('/search');
      };

      // 승차벨 사용 이력 정류장 페이지로 이동
      const goStopHistoryView = () => {
        router.push('/stopHistory');
      };

      // 가까운 정류장 페이지로 이동
      const goNearStopView = () => {
        router.push('/nearStop');
      };

      return {
        wholeText,
        goSearchView,
        goStopHistoryView,
        goNearStopView,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .main {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 70px);
    justify-content: center;
    font-family: 'KoddiUDOnGothic-Regular';
    padding: 0px 16px;

    .btn {
      height: 140px;
      width: 100%;
      border-radius: 20px;
      border: none;
      background-color: $secondary;
      color: $black;
      font-size: 36px;
      font-weight: 700;
      line-height: 22px;
      text-align: center;
      letter-spacing: -0.408px;
      margin-bottom: 32px;
    }
  }
</style>
