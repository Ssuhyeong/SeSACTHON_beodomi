<template>
  <div>
    <NavComp :content="wholeText" title="승차벨 사용 이력" />

    <div class="favorite-stop">
      <div class="none-favorite" v-if="true">
        <h1>이력이 없습니다.</h1>
        <button class="search-btn" @click="goBusSearchView">
          <span class="text">버스 노선 검색</span>
        </button>
      </div>
      <div class="favorite" v-else>
        <div class="stops">
          <div class="stop" v-for="i in [1, 2, 3, 4, 5, 6, 7]" :key="i">
            {{ i }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {useRouter} from 'vue-router';
  import NavComp from '@/components/NavComp.vue';
  import {ref} from 'vue';

  export default {
    name: 'FavoriteStopView',
    components: {NavComp},
    setup() {
      const router = useRouter();

      // 정류장 검색하기 버튼 클릭 이벤트
      const goBusSearchView = () => {
        router.push('/search');
      };

      // TODO: 승차벨 사용 이력 받아오면 if문으로 지정
      const wholeText = ref('');
      // 승차벨 사용 이력이 없는 경우
      // wholeText.value = '승차벨 사용 이력이 없습니다. 버스 노선 검색 버튼';

      // 승차벨 사용 이력이 있는 경우
      wholeText.value = '승차벨 사용 이력이 있습니다. 사용 이력 목록 조회';

      return {
        goBusSearchView,
        wholeText,
      };
    },
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
      color: $white;
      width: 249px;
      font-weight: 700;
      font-size: 30px;
      line-height: 48px;
      margin-bottom: 67px;
    }

    // 정류장 검색 버튼
    .search-btn {
      height: 140px;
      background-color: $secondary;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: calc(100vw - 32px);
      border-radius: 20px;
      border: none;

      .text {
        font-weight: 700;
        font-size: 36px;
        line-height: 22px;
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
    margin-top: 32px;
    padding: 0px 16px;

    .stops {
      height: calc(122px * 6);
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
