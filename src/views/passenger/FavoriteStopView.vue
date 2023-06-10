<template>
  <div>
    <NavComp :content="wholeText" title="승차벨 사용 이력" />

    <div class="favorite-stop">
      <!-- 승차벨 사용 이력이 없는 경우 -->
      <div class="none-favorite" v-if="false">
        <h1>이력이 없습니다.</h1>
        <button class="search-btn" @click="goBusSearchView">
          <span class="text">버스 노선 검색</span>
        </button>
      </div>
      <!-- 승차벨 사용 이력이 있는 경우 -->
      <div class="favorite" v-else>
        <div class="favorite-container">
          <div class="scroll">
            <div v-for="stop in stops" :key="stop.arsId">
              <div id="route_container" @click="showAvailableBus(stop)">
                <div id="route_info">
                  <div style="font-weight: 700">{{ stop.stationNm }}</div>
                  <div>{{ stop.direction }}행</div>
                </div>
                <img src="@/assets/img/busIcon.png" alt="역에서 탑승가능한 버스를 보는 버튼" width="31" />
              </div>
              <div class="available-bus" v-if="clickStop === stop.arsId">
                <div class="display" @click="goStopBusListView(stop.arsId, stop.station)">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '@/service/axios.js';
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

      // TODO: localstorage에서 get해서 가져오기
      console.log(JSON.parse(localStorage.getItem('history')) || '');
      const stops = [
        {
          busRouteId: '100100131',
          busRouteNm: '1020',
          busRouteAbrv: '1020',
          seq: '1',
          section: '0',
          station: '107000070',
          arsId: '08160',
          stationNm: '정릉북한산국립공원입구',
          gpsX: '126.9995128987',
          gpsY: '37.6175946297',
          posX: '199957.00101259968',
          posY: '457560.2818010538',
          fullSectDist: '0',
          direction: '교보문고',
          stationNo: '08160',
          routeType: '4',
          beginTm: '04:30',
          lastTm: '23:20',
          trnstnid: '100000023',
          sectSpd: '0',
          transYn: 'N',
        },
        {
          busRouteId: '100100131',
          busRouteNm: '1020',
          busRouteAbrv: '1020',
          seq: '1',
          section: '0',
          station: '107000070',
          arsId: '08160',
          stationNm: '정릉북한산국립공원입구',
          gpsX: '126.9995128987',
          gpsY: '37.6175946297',
          posX: '199957.00101259968',
          posY: '457560.2818010538',
          fullSectDist: '0',
          direction: '교보문고',
          stationNo: '08160',
          routeType: '4',
          beginTm: '04:30',
          lastTm: '23:20',
          trnstnid: '100000023',
          sectSpd: '0',
          transYn: 'N',
        },
        {
          busRouteId: '100100131',
          busRouteNm: '1020',
          busRouteAbrv: '1020',
          seq: '1',
          section: '0',
          station: '107000070',
          arsId: '08160',
          stationNm: '정릉북한산국립공원입구',
          gpsX: '126.9995128987',
          gpsY: '37.6175946297',
          posX: '199957.00101259968',
          posY: '457560.2818010538',
          fullSectDist: '0',
          direction: '교보문고',
          stationNo: '08160',
          routeType: '4',
          beginTm: '04:30',
          lastTm: '23:20',
          trnstnid: '100000023',
          sectSpd: '0',
          transYn: 'N',
        },
        {
          busRouteId: '100100131',
          busRouteNm: '1020',
          busRouteAbrv: '1020',
          seq: '1',
          section: '0',
          station: '107000070',
          arsId: '08160',
          stationNm: '정릉북한산국립공원입구',
          gpsX: '126.9995128987',
          gpsY: '37.6175946297',
          posX: '199957.00101259968',
          posY: '457560.2818010538',
          fullSectDist: '0',
          direction: '교보문고',
          stationNo: '08160',
          routeType: '4',
          beginTm: '04:30',
          lastTm: '23:20',
          trnstnid: '100000023',
          sectSpd: '0',
          transYn: 'N',
        },
        {
          busRouteId: '100100131',
          busRouteNm: '1020',
          busRouteAbrv: '1020',
          seq: '1',
          section: '0',
          station: '107000070',
          arsId: '08160',
          stationNm: '정릉북한산국립공원입구',
          gpsX: '126.9995128987',
          gpsY: '37.6175946297',
          posX: '199957.00101259968',
          posY: '457560.2818010538',
          fullSectDist: '0',
          direction: '교보문고',
          stationNo: '08160',
          routeType: '4',
          beginTm: '04:30',
          lastTm: '23:20',
          trnstnid: '100000023',
          sectSpd: '0',
          transYn: 'N',
        },
        {
          busRouteId: '100100131',
          busRouteNm: '1020',
          busRouteAbrv: '1020',
          seq: '1',
          section: '0',
          station: '107000070',
          arsId: '08160',
          stationNm: '정릉북한산국립공원입구',
          gpsX: '126.9995128987',
          gpsY: '37.6175946297',
          posX: '199957.00101259968',
          posY: '457560.2818010538',
          fullSectDist: '0',
          direction: '교보문고',
          stationNo: '08160',
          routeType: '4',
          beginTm: '04:30',
          lastTm: '23:20',
          trnstnid: '100000023',
          sectSpd: '0',
          transYn: 'N',
        },
        {
          busRouteId: '100100131',
          busRouteNm: '1020',
          busRouteAbrv: '1020',
          seq: '1',
          section: '0',
          station: '107000070',
          arsId: '08160',
          stationNm: '정릉북한산국립공원입구',
          gpsX: '126.9995128987',
          gpsY: '37.6175946297',
          posX: '199957.00101259968',
          posY: '457560.2818010538',
          fullSectDist: '0',
          direction: '교보문고',
          stationNo: '08160',
          routeType: '4',
          beginTm: '04:30',
          lastTm: '23:20',
          trnstnid: '100000023',
          sectSpd: '0',
          transYn: 'N',
        },
        {
          busRouteId: '100100131',
          busRouteNm: '1020',
          busRouteAbrv: '1020',
          seq: '1',
          section: '0',
          station: '107000070',
          arsId: '08160',
          stationNm: '정릉북한산국립공원입구',
          gpsX: '126.9995128987',
          gpsY: '37.6175946297',
          posX: '199957.00101259968',
          posY: '457560.2818010538',
          fullSectDist: '0',
          direction: '교보문고',
          stationNo: '08160',
          routeType: '4',
          beginTm: '04:30',
          lastTm: '23:20',
          trnstnid: '100000023',
          sectSpd: '0',
          transYn: 'N',
        },
        {
          busRouteId: '100100131',
          busRouteNm: '1020',
          busRouteAbrv: '1020',
          seq: '1',
          section: '0',
          station: '107000070',
          arsId: '08160',
          stationNm: '정릉북한산국립공원입구',
          gpsX: '126.9995128987',
          gpsY: '37.6175946297',
          posX: '199957.00101259968',
          posY: '457560.2818010538',
          fullSectDist: '0',
          direction: '교보문고',
          stationNo: '08160',
          routeType: '4',
          beginTm: '04:30',
          lastTm: '23:20',
          trnstnid: '100000023',
          sectSpd: '0',
          transYn: 'N',
        },
        {
          busRouteId: '100100131',
          busRouteNm: '1020',
          busRouteAbrv: '1020',
          seq: '1',
          section: '0',
          station: '107000070',
          arsId: '08160',
          stationNm: '정릉북한산국립공원입구',
          gpsX: '126.9995128987',
          gpsY: '37.6175946297',
          posX: '199957.00101259968',
          posY: '457560.2818010538',
          fullSectDist: '0',
          direction: '교보문고',
          stationNo: '08160',
          routeType: '4',
          beginTm: '04:30',
          lastTm: '23:20',
          trnstnid: '100000023',
          sectSpd: '0',
          transYn: 'N',
        },
      ];

      // 클릭한 정거장 arsId
      const clickStop = ref(null);

      // 클릭한 정거장을 지나는 버스들
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
        goBusSearchView,
        wholeText,
        stops,
        clickStop,
        buses,
        showAvailableBus,
        goStopBusListView,
        goStationListView,
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

    .favorite-container {
      margin: 0px 16px;

      .scroll {
        max-height: calc(100vh - 94px);
        overflow: scroll;
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
  }
</style>
