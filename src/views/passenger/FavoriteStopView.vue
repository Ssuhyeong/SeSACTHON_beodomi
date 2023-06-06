<template>
  <div class="favorite-stop">
    <div class="none-favorite" v-if="false">
      <h1>사용한 승차벨 &nbsp; 이력이 없습니다.</h1>
      <button class="search-btn">
        <span class="text">정류장 검색하기</span>
        <span class="icon">&gt;</span>
      </button>
    </div>
    <div class="favorite" v-else>
      <h1>자주 가는 정류장</h1>
      <div class="stops">
        <div class="stop" v-for="i in [1, 2, 3, 4, 5, 6, 7]" :key="i">
          {{ i }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FavoriteStopView',
  };
</script>

<style lang="scss" scoped>
  // 이용한 승차벨 이력이 없는 경우
  .none-favorite {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50%;

    h1 {
      display: flex;
      align-items: center;

      width: 249px;
      font-weight: 700;
      font-size: 30px;
      line-height: 48px;
      margin-bottom: 67px;
    }

    // 정류장 검색 버튼
    .search-btn {
      height: 106px;
      background-color: $lightGray;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: calc(100vw - 32px);
      border-radius: 10px;
      border: none;

      .text {
        font-weight: 700;
        font-size: 28px;
        line-height: 34.16px;
      }

      .icon {
        font-size: 28px;
        line-height: 34.16px;
      }
    }
  }

  // 사용한 승차벨 이력이 있는 경우
  .favorite {
    text-align: center;
    margin-top: 105px;

    h1 {
      font-weight: 700;
      font-size: 30px;
      line-height: 48px;
      margin-bottom: 31px;
    }

    .stops {
      height: calc(122px * 5);
      overflow: auto;

      .stop {
        background-color: $lightGray;
        height: 106px;
        border: none;
        border-radius: 10px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
      }
    }
  }
</style>
