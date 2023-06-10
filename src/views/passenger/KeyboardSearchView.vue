<template>
  <div>
    <NavComp :content="wholeText" title="버스 노선 검색" />
    <div id="title">'{{ this.$route.params.keyword }}' 검색결과</div>
    <div class="order">
      <p @click="bus" class="bus_text">노 선</p>
      <p @click="station" class="dist_text">정류장</p>
    </div>
    <div class="near-stop">
      <div class="scroll">
        <template v-if="station_color == '#ffdb1d'">
          <div v-for="stop in keyword_stops" :key="stop.arsId">
            <div id="route_container" @click="showAvailableBus(stop)">
              <div id="route_info">
                <div style="font-weight: 700">{{ stop.stationNm }}</div>
                <div>{{ stop.dist }} m</div>
              </div>
              <img src="@/assets/img/busIcon.png" alt="역에서 탑승가능한 버스를 보는 버튼" width="31" />
            </div>
            <div class="available-bus" v-if="clickStop === stop.arsId">
              <div class="display" @click="goStopBusListView(stop.arsId, stop.stationId)">
                <div style="width: 100%">
                  <span class="title">탑승 가능 버스</span>
                  <div class="buses">
                    <span v-for="bus in buses" :key="bus.busRouteId">{{ bus.busRouteNm }} &nbsp;</span>
                  </div>
                </div>
                <img src="@/assets/img/rightArrow.png" alt="역에서 탑승가능한 버스를 보는 버튼" width="31" />
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div id="route_container" v-for="data in search_data" :key="data.route_name" @click="goStationListView(data.bus_route_id)">
            <div id="route_info">
              <div style="font-weight: 700">{{ data.route_name }}</div>
            </div>
            <img src="@/assets/img/markerIcon.png" alt="역에서 탑승가능한 버스를 보는 버튼" width="20" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '@/service/axios.js';
  import router from '@/router';
  import {ref} from 'vue';
  import {useRoute} from 'vue-router';
  import NavComp from '@/components/NavComp.vue';

  export default {
    name: 'KeyboardSearchView',
    components: {NavComp},
    data() {
      return {
        keyword: '',
        route_color: '#fff',
        station_color: '#ffdb1d',
        search_data: [],
        wholeText: '',
      };
    },
    setup() {
      const userLat = ref(0);
      const userLng = ref(0);

      const stops = ref({});
      const keyword_stops = ref([]);
      const route = useRoute();

      // 사용자의 현재 위치 get
      const locationSuccess = pos => {
        userLat.value = pos.coords.latitude;
        userLng.value = pos.coords.longitude;
        console.log(`현위치: ${userLat.value}, ${userLng.value}`);

        // 사용자 위치 기준으로 가까운 정류장 get
        // TODO: 현재 위치를 동대문 DDP 으로 고정! 나중에 현재 위치로 바꾸깅

        const url = `http://ws.bus.go.kr/api/rest/stationinfo/getStationByPos?serviceKey=${process.env.VUE_APP_ROUTE_SERVICE_KEY}&tmX=${127.00911}&tmY=${37.56652}&radius=${2000}&resultType=json`;
        axios
          .get(url)
          .then(res => {
            stops.value = res.data.msgBody.itemList;

            stops.value.forEach(data => {
              if (data.stationNm.indexOf(route.params.keyword) >= 0) {
                keyword_stops.value.push({...data});
              }
            });

            console.log(keyword_stops.value);
          })
          .catch(err => console.log(err));
      };

      const locationFail = err => {
        console.log('현위치를 찾을 수 없습니다');
      };

      navigator.geolocation.getCurrentPosition(locationSuccess, locationFail);

      // 클릭한 역 arsId
      const clickStop = ref(null);

      // 클릭한 역을 지나는 버스들
      const buses = ref({});

      // 역의 상세 버튼 클릭 이벤트
      const showAvailableBus = stop => {
        if (clickStop.value === stop.arsId) {
          // 클릭 취소
          clickStop.value = null;
        } else {
          // 해당 역에서 탑승 가능한 버스 목록 조회
          const arsId = stop.arsId;
          const url = `http://ws.bus.go.kr/api/rest/stationinfo/getRouteByStation?serviceKey=${process.env.VUE_APP_ROUTE_SERVICE_KEY}&arsId=${arsId}&resultType=json`;

          // 특정 정류장에 경우하는 버스 노선 정보 list
          axios
            .get(url)
            .then(res => {
              buses.value = res.data.msgBody.itemList;
              console.log(buses.value);
            })
            .catch(err => console.log(err));

          clickStop.value = stop.arsId;
        }
      };

      // 해당 역의 경유 버스 보여주는 페이지로 이동
      const goStopBusListView = (arsId, stationId) => {
        console.log('클릭한 정거장의 arsId: ', arsId, 'stId: ', stationId);
        router.push({
          name: 'stopBusListView',
          params: {arsId: arsId, stId: stationId},
        });
      };

      const goStationListView = busRouteId => {
        router.push({
          name: 'StationListView',
          params: {busRouteId: busRouteId},
        });
      };

      return {
        stops,
        keyword_stops,
        clickStop,
        buses,
        showAvailableBus,
        goStopBusListView,
        goStationListView,
      };
    },
    mounted() {
      this.keyword = this.$route.params.keyword;
      this.wholeText = `${this.$route.params.keyword} 검색 결과`;
      this.station();
    },
    methods: {
      bus() {
        this.route_color = '#ffdb1d';
        this.station_color = '#fff';

        const keyword = this.keyword;
        const url = `/api/pass/route/${keyword}`;

        axios
          .get(url)
          .then(res => {
            console.log(res.data);
            this.search_data = res.data;
            console.log(res.data);
          })
          .catch(error => {
            console.log('검색 실패' + error.data);
          });
      },
      station() {
        this.station_color = '#ffdb1d';
        this.route_color = '#fff';
      },
    },
  };
</script>

<style lang="scss" scoped>
  #title {
    margin-top: 40px;
    color: $secondary;
    font-weight: 700;
    font-size: 22px;
    line-height: 24px;
  }

  #route_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: solid 0.1px #fff;
  }

  #route_info > div {
    text-align: left;
    color: #fff;
    margin: 10px;
  }

  .near-stop {
    text-align: center;
    margin: 0px 16px;

    h1 {
      font-weight: 700;
    }

    .scroll {
      max-height: 70vh;
      overflow: scroll;
    }

    h1 {
      font-size: 30px;
      line-height: 36.6px;
      margin-top: 97px;
      margin-bottom: 35px;
    }

    .stops {
      height: 98px;
      background-color: $lightGray;
      border: none;
      border-radius: 10px;
      font-size: 28px;
      line-height: 34.16px;
      display: flex;
      align-items: center;
      padding: 0px 30px;
      justify-content: space-between;

      .stop-name {
        font-weight: 700;
        display: block;
        white-space: nowrap;
        width: 170px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .available-bus {
      background-color: $secondary;
      height: 98px;
      border: none;
      border-radius: 0px 0px 10px 10px;
      position: relative;
      line-height: 34.16px;
      padding: 15px 25px;
      margin-bottom: 16px;

      .point-icon {
        position: absolute;
        top: -35px;
        right: 30px;
        width: 0;
        height: 0;
        border-bottom: 30px solid $deepDarkGray;
        border-top: 10px solid transparent;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
      }

      .display {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .title {
        color: $primary;
        font-size: 18px;
        font-weight: 700;
        text-align: left;
      }

      .buses {
        color: $primary;
        font-size: 18px;
        width: 250px;
        font-weight: 700;
        white-space: nowrap;
        text-align: left;
        overflow-x: auto;
      }
    }
  }

  .order {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  .order > .bus_text {
    padding: 10px 65px;
    margin: 0px 10px;
    font-weight: 700;
    border-bottom: solid 2px v-bind(route_color);
    color: v-bind(route_color);
  }

  .order > .dist_text {
    padding: 10px 65px;
    margin: 0px 10px;
    font-weight: 700;
    border-bottom: solid 2px v-bind(station_color);
    color: v-bind(station_color);
  }

  .order > p:hover {
    cursor: pointer;
    border-bottom: solid 2px $secondary;
    color: $secondary;
  }
</style>
