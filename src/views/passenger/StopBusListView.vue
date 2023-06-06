<template>
  <!-- 역에서 탈 수 있는 버스 목록 조회 페이지 -->
  <div class="bus-list">
    <h1>상왕십리역</h1>
    <div class="buses">
      <div
        class="bus"
        v-for="bus in [123, 234, 345, 456, 5645437, 678, 789, 890]"
        :key="bus"
      >
        <span class="title">{{ bus }}</span>
        <span class="time">5분전</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StopBusList',
    setup() {},
  };
</script>

<style lang="scss" scoped>
  .bus-list {
    text-align: center;
    margin: 0px 16px;

    h1 {
      font-size: 30px;
      line-height: 36.6px;
      margin-top: 97px;
      margin-bottom: 35px;
      font-weight: 700;
    }

    .buses {
      max-height: 70vh;
      overflow: auto;

      .bus {
        background-color: #f0f0f0;
        height: 106px;
        margin-bottom: 16px;
        border-radius: 10px;
        padding: 0px 16px;

        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28px;
        line-height: 34.16px;

        .title {
          font-weight: 700;
        }
      }
    }
  }
</style>
