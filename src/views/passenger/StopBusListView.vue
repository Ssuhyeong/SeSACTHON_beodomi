<template>
  <!-- 역에서 탈 수 있는 버스 목록 조회 페이지 -->
  <div class="bus-list">
    <h1>상왕십리역</h1>
    <div class="buses">
      <!-- <div class="bus" v-for="bus in buses" :key="bus.busRouteId">
        <div :class="['route-type', busType[bus.busRouteType]]"></div>
        <span class="title">{{ bus.busRouteNm }}</span>
        <span>{{ bus.stEnd }}행</span>
        <span class="time">{{ bus.msg }}</span>
      </div> -->
      <div id="route_container" v-for="(bus, idx) in buses" :key="bus.busRouteId" @click="[select(idx), (bus_select = bus.busRouteId)]">
        <div :class="['route-type', busType[bus.busRouteType]]"></div>
        <div id="route_info">
          <div style="font-weight: 700; width: 40px">{{ bus.busRouteNm }}</div>
        </div>
        <div style="color: #fff; width: 100px">{{ bus.stEnd }}행</div>
        <span class="time">{{ bus.msg }}</span>
        <div id="riding" :class="{active: bus_active[idx]}"></div>
      </div>
    </div>
    <div v-if="bus_select == ''" id="ridingBtn">승차 예약</div>
    <div v-else id="ridingActiveBtn" @click="ridingReserve(bus_select)">승차 예약</div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {ref} from 'vue';
  import {useRoute} from 'vue-router';
  import router from '@/router';

  export default {
    name: 'StopBusList',
    data() {
      return {
        bus_active: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        bus_select: '',
      };
    },
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

          // buses 돌면서 buses의 순번을 가져오기

          buses.value.forEach(async (bus, idx) => {
            const ord = await getOrd(bus);
            console.log(ord);

            // 가져온 순번으로 api 호출해서 특정 역의 특정 노선 도착 예정 정보 get
            // buses에 추가하기
            const prevData = await getPrevData(ord, bus.busRouteId);
            console.log(prevData);
            const prevArr = prevData.split('[');
            if (prevArr.length > 1) {
              // prevArr = [2분 7초후, 0번째 전] ]
              buses.value[idx].msg = prevArr[1].slice(0, -1);
            } else {
              // prevArr = [곧 도착]
              buses.value[idx].msg = prevArr[0];
            }
          });
        })
        .catch(err => console.log(err));

      // 버스의 순번 가져오기
      const getOrd = async bus => {
        const url = `http://localhost:8080/api/pass/ord/${bus.busRouteId}/${arsId}`;
        const data = await axios.get(url);
        return data.data;
      };

      // 특정 정거장에서 특정 노선의 도착 예정 정보 가져오기
      const getPrevData = async (ord, routeId, idx) => {
        const url = `http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRoute?serviceKey=${process.env.VUE_APP_ROUTE_SERVICE_KEY}&busRouteId=${routeId}&ord=${ord}&stId=${stId}&resultType=json`;
        const data = await axios.get(url);
        return data.data.msgBody.itemList[0].arrmsg1;
      };

      const ridingReserve = busRouteId => {
        router.push({
          name: 'RidingView',
          params: {arsId: route.params.arsId, busRouteId: busRouteId},
        });
      };

      return {
        buses,
        busType,
        ridingReserve,
      };
    },
    methods: {
      select(idx) {
        if (this.bus_active[idx]) {
          console.log('none');
        } else {
          for (let i = 0; i < this.bus_active.length; i++) {
            if (i != idx) {
              this.bus_active[i] = this.bus_active[idx];
            }
          }
          this.bus_active[idx] = !this.bus_active[idx];
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  #ridingBtn {
    font-weight: 900;
    font-size: 32px;
    padding: 58px 94px;
    background-color: #fff;
    border-radius: 20px;
    margin-top: 5px;
    color: $primary;
  }

  #ridingActiveBtn {
    font-weight: 900;
    font-size: 32px;
    padding: 58px 94px;
    background-color: #ff5f63;
    border-radius: 20px;
    margin-top: 5px;
    color: #fff;
    cursor: pointer;
  }

  #route_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin: 10px;
    border-bottom: solid 0.1px #fff;
  }

  #route_info > div {
    text-align: left;
    color: #fff;
    margin: 10px;
  }
  .bus-list {
    text-align: center;
    margin: 0px 16px;

    h1 {
      font-size: 30px;
      line-height: 36.6px;
      margin-top: 97px;
      margin-bottom: 35px;
      font-weight: 700;
      color: $secondary;
    }

    .buses {
      max-height: 50vh;
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

  #riding {
    color: #ffdb1d;
    border: 2px solid #ffdb1d;
    padding: 15px 15px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 700;
  }

  #riding:hover {
    color: #fff;
    background-color: #ffdb1d;
  }

  .active {
    background-color: #ffdb1d;
  }

  .time {
    color: $secondary;
    width: 70px;
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
