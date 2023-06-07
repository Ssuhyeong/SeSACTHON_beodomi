<template>
  <!-- 역에서 탈 수 있는 버스 목록 조회 페이지 -->
  <div class="bus-list">
    <h1>상왕십리역</h1>
    <div class="buses">
      <div class="bus" v-for="bus in buses" :key="bus.busRouteId">
        <div :class="['route-type', busType[bus.busRouteType]]"></div>
        <span class="title">{{ bus.busRouteNm }}</span>
        <span>{{ bus.stEnd }}행</span>
        <span class="time">5분전</span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {ref} from 'vue';
  import {useRoute} from 'vue-router';
  export default {
    name: 'StopBusList',
    setup() {
      const route = useRoute();
      const buses = ref([]);
      const busType = {
        1: 'airplane', // 공항
        2: 'town', // 마을
        3: 'trunk', // 간선
        4: 'branch-line', // 지선
        5: 'cycle', // 순환
        6: 'wide-area', // 광역
        7: 'incheon', // 인천
        8: 'gyeonggi', // 경기
        9: 'abolition', // 폐지
        0: 'public', // 공용
      };

      const arsId = route.params.arsId;
      const stId = route.params.stId;

      const url = `http://ws.bus.go.kr/api/rest/stationinfo/getRouteByStation?serviceKey=${process.env.VUE_APP_ROUTE_SERVICE_KEY}&arsId=${arsId}&resultType=json`;

      // 특정 정류장에 경우하는 버스 노선 정보 list
      axios
        .get(url)
        .then(res => {
          buses.value = res.data.msgBody.itemList;
          console.log(buses.value);

          // 해당 버스의
        })
        .catch(err => console.log(err));

      return {
        buses,
        busType,
      };
    },
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

  // 버스 노선 타입 css
  .route-type {
    display: inline;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: none;
    background-color: black;
  }

  // 버스 노선 타입마다 색상 지정
  // 공항
  .airplane {
    background-color: #ff5f63;
  }

  // 마을
  .town {
    background-color: #ff7c25;
  }

  // 간선
  .trunk {
    background-color: #ffdb1d;
  }

  // 지선
  .branch-line {
    background-color: #00df3e;
  }

  // 순환
  .cycle {
    background-color: #03a000;
  }

  // 광역
  .wide-area {
    background-color: #1d92ff;
  }

  // 인천
  .incheon {
    background-color: #1d28ff;
  }

  // 경기
  .gyeonggi {
    background-color: #6c1dff;
  }

  // 폐지
  .abolition {
    background-color: #ff3ef2;
  }

  // 공용
  .public {
    background-color: #777777;
  }
</style>
