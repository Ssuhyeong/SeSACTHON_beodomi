<template>
  <div class="near-stop">
    <h1>가까운 정거장</h1>
    <div class="scroll">
      <div v-for="stop in stops" :key="stop.arsId">
        <div class="stops" @click="showAvailableBus(stop)">
          <span class="stop-name">{{ stop.stationNm }}</span>
          <span class="stop-distance">{{ stop.dist }}m</span>
          <img
            src="@/assets/img/detailBtn.png"
            alt="역에서 탑승가능한 버스를 보는 버튼"
            width="31"
          />
        </div>
        <div class="available-bus" v-if="clickStop === stop.arsId">
          <div class="point-icon"></div>
          <div
            class="display"
            @click="goStopBusListView(stop.arsId, stop.stationId)"
          >
            <span class="title">탑승 가능 버스</span>
            <div class="buses">
              <span v-for="bus in buses" :key="bus.busRouteId"
                >&nbsp; {{ bus.busRouteNm }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '@/router';
  import {ref} from 'vue';
  import axios from 'axios';

  export default {
    name: 'NearStopView',
    setup() {
      const userLat = ref(0);
      const userLng = ref(0);

      const stops = ref({});

      // 사용자의 현재 위치 get
      const locationSuccess = pos => {
        userLat.value = pos.coords.latitude;
        userLng.value = pos.coords.longitude;
        console.log(`현위치: ${userLat.value}, ${userLng.value}`);

        // 사용자 위치 기준으로 가까운 정류장 get
        // TODO: 현재 위치를 동대문 DDP 으로 고정! 나중에 현재 위치로 바꾸깅

        const url = `http://ws.bus.go.kr/api/rest/stationinfo/getStationByPos?serviceKey=${
          process.env.VUE_APP_ROUTE_SERVICE_KEY
        }&tmX=${127.00911}&tmY=${37.56652}&radius=${300}&resultType=json`;
        axios
          .get(url)
          .then(res => {
            stops.value = res.data.msgBody.itemList;
            console.log('stops: ', stops.value);
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
        if (clickStop.value !== null) {
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

      return {
        stops,
        clickStop,
        buses,
        showAvailableBus,
        goStopBusListView,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .near-stop {
    text-align: center;
    margin: 0px 16px;

    h1 {
      font-weight: 700;
    }

    .scroll {
      max-height: 60vh;
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
      margin-bottom: 16px;
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
      background-color: $deepDarkGray;
      height: 98px;
      border: none;
      border-radius: 10px;
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
        flex-direction: column;
        align-items: start;
        justify-content: space-around;
      }

      .title {
        color: $white;
        font-size: 28px;
      }

      .buses {
        background-color: $lightGray;

        width: calc(100% - 5px);
        font-size: 20px;
        white-space: nowrap;
        overflow-x: auto;
      }
    }
  }
</style>
