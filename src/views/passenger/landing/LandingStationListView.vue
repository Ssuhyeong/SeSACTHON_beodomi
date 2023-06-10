<template>
  <!-- 역에서 탈 수 있는 버스 목록 조회 페이지 -->
  <div>
    <NavComp :content="wholeText" title="탑승 가능 정류장" />

    <div class="bus-list">
      <h1>{{ title }}</h1>
      <div class="buses">
        <div id="route_container" v-for="(stop, idx) in stops" :key="stop.arsId" @click="[select(idx), (station_select = stop)]">
          <!-- <div :class="['route-type', busType[bus.busRouteType]]"></div> -->
          <div id="route_info">
            <div style="font-weight: 700; width: 200px">{{ stop.stationNm }}</div>
            <div>{{ stop.direction }}행</div>
          </div>
          <!-- <span class="time">{{ bus.msg }}</span> -->
          <div id="riding" :class="{active: bus_active[idx]}"></div>
        </div>
      </div>
      <div v-if="station_select == ''" id="ridingBtn">하차 예약</div>
      <div v-else id="ridingActiveBtn" @click="landingReserve(station_select)">하차 예약</div>
    </div>
  </div>
</template>

<script>
  import {ref} from 'vue';
  import axios from 'axios';
  import {useRoute} from 'vue-router';
  import router from '@/router';
  import NavComp from '@/components/NavComp.vue';
  import {usePassengerStore} from '@/store/passsengerStore';

  export default {
    name: 'LandingStationList',
    components: {NavComp},
    data() {
      return {
        bus_active: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        station_select: '',
      };
    },
    setup() {
      const route = useRoute();
      const userLat = ref(0);
      const userLng = ref(0);

      const stops = ref({});
      const title = ref({});

      // 읽을 전체 text
      const wholeText = ref('');

      // 사용자 위치 확인 및 버스 경유하는 정류장 출력
      const locationSuccess = pos => {
        userLat.value = pos.coords.latitude;
        userLng.value = pos.coords.longitude;
        console.log(`현위치: ${userLat.value}, ${userLng.value}`);

        // 사용자 위치 기준으로 가까운 정류장 get
        // TODO: 현재 위치를 동대문 DDP 으로 고정! 나중에 현재 위치로 바꾸깅

        const url = `http://ws.bus.go.kr/api/rest/busRouteInfo/getStaionByRoute?serviceKey=${process.env.VUE_APP_ROUTE_SERVICE_KEY}&busRouteId=${route.params.busRouteId}&resultType=json`;
        axios
          .get(url)
          .then(res => {
            stops.value = res.data.msgBody.itemList;
            console.log('stops: ', stops.value);
            title.value = stops.value[0].busRouteNm;
            wholeText.value = `노선 ${title.value}의 탑승 가능 정류장 목록. 승차 예약 버튼`;
          })
          .catch(err => console.log(err));
      };

      const locationFail = err => {
        console.log('현위치를 찾을 수 없습니다');
      };

      navigator.geolocation.getCurrentPosition(locationSuccess, locationFail);

      const passengerStore = usePassengerStore();
      const landingReserve = busData => {
        passengerStore.endStation = busData;
        router.push({
          name: 'LandingView',
        });
      };

      return {
        wholeText,
        title,
        stops,
        landingReserve,
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
    background-color: #fff;
    border-radius: 20px;
    color: $primary;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 40px;
    left: 50%;
    width: calc(100% - 32px);
    transform: translate(-50%, -40px);
  }

  #ridingActiveBtn {
    font-weight: 900;
    font-size: 32px;
    background-color: #ff5f63;
    border-radius: 20px;
    color: #fff;
    cursor: pointer;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 40px;
    left: 50%;
    width: calc(100% - 32px);
    transform: translate(-50%, -40px);
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
      margin-top: 40px;
      margin-bottom: 40px;
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
