<template>
  <!-- 역에서 탈 수 있는 버스 목록 조회 페이지 -->
  <div>
    <NavComp :content="wholeText" title="탑승 가능 버스" />
    <div class="bus-list">
      <h1>{{ title }}</h1>
      <div class="buses">
        <div id="route_container" v-for="(bus, idx) in buses" :key="bus.busRouteId" @click="[select(idx), getBusData(bus.busRouteId, idx)]">
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
  </div>
</template>

<script>
  import axios from 'axios';
  import {ref} from 'vue';
  import {useRoute} from 'vue-router';
  import router from '@/router';
  import NavComp from '@/components/NavComp.vue';
  import {usePassengerStore} from '@/store/passsengerStore';

  export default {
    name: 'StopBusList',
    components: {NavComp},
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

      const title = ref('');
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

            // 가져온 순번으로 api 호출해서 특정 역의 특정 노선 도착 예정 정보 get
            // buses에 추가하기
            if (ord != '') {
              const prevData = await getPrevData(ord, bus.busRouteId);
              const prevArr = prevData.split('[');
              if (prevArr.length > 1) {
                // prevArr = [2분 7초후, 0번째 전] ]
                buses.value[idx].msg = prevArr[1].slice(0, -1);
              } else {
                // prevArr = [곧 도착]
                buses.value[idx].msg = prevArr[0];
              }
            } else {
              // 정보 없음
              buses.value[idx].msg = '정보없음';
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
        const res = await data.data;
        title.value = res.msgBody.itemList[0].stNm;
        return res.msgBody.itemList[0].arrmsg1;
      };

      const passengerStore = usePassengerStore();
      const ridingReserve = busData => {
        // 스토리지 저장
        if (localStorage.getItem('history') == null) {
          const history = [];

          history.push(busData);
          localStorage.setItem('history', JSON.stringify(history));
        } else {
          var newHistory = JSON.parse(localStorage.getItem('history'));
          newHistory.push(busData);
          localStorage.setItem('history', JSON.stringify(newHistory));
        }

        // 승차 db 저장
        const dbData = {
          bus_route_id: busData.busRouteId,
          origin_station: busData.arsId,
        };

        axios.post('http://localhost:8080/api/pass', dbData).then(() => {});

        console.log('버스 데이터:', busData);
        passengerStore.startStation = busData;
        router.push({
          name: 'RidingView',
        });
      };

      // 읽어줄 전체 text
      const wholeText = `${title.value}에서 탑승 가능한 버스 노선 목록. 승차 예약 버튼`;

      return {
        title,
        buses,
        busType,
        ridingReserve,
        wholeText,
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
      getBusData(busRouteId, idx) {
        // 사용자 위치 기준으로 가까운 정류장 get
        // TODO: 현재 위치를 동대문 DDP 으로 고정! 나중에 현재 위치로 바꾸깅

        const url = `http://ws.bus.go.kr/api/rest/busRouteInfo/getStaionByRoute?serviceKey=${process.env.VUE_APP_ROUTE_SERVICE_KEY}&busRouteId=${busRouteId}&resultType=json`;
        axios
          .get(url)
          .then(res => {
            this.bus_select = res.data.msgBody.itemList[idx];
          })
          .catch(err => console.log(err));
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
