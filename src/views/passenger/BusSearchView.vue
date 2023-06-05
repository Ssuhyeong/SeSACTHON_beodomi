<template>
  <div class="bus-search">
    <h2 class="title">{{ title }}</h2>
    <div class="circle"></div>
    <button class="keyboard-btn">키보드 사용하기</button>
    <button class="talk-btn">음성버튼</button>
  </div>
</template>

<script>
  import {ref} from 'vue';
  export default {
    name: 'BusSearchView',
    setup() {
      const title = ref('버스 노선 혹은 정류장 이름을 입력하세요.');

      return {
        title,
      };
    },
  };
</script>

<style lang="scss">
  .bus-search {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;

    .title {
      font-weight: 700;
      font-size: 28px;
      line-height: 34.16px;
      width: 313px;
      padding-top: 124px;
    }

    .circle {
      background-color: $gray;
      width: 210px;
      height: 210px;
      border-radius: 50%;
    }

    // 키보드 사용 버튼
    .keyboard-btn {
      height: 124px;
      background-color: $primary;
      color: $secondary;
      font-size: 30px;
      font-weight: 700;
      line-height: 22px;
      text-align: center;
      letter-spacing: -0.408px;
      margin-bottom: 6px;
      width: 100vw;
    }

    // 음성 버튼
    .talk-btn {
      width: 162px;
      height: 81px;
      background-color: $gray;
      border-radius: 81px 81px 0 0;
      border: none;
    }
  }
</style>
