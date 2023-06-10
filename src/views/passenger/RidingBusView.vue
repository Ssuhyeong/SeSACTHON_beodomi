<template>
  <!-- 탑승 중인 버스 -->
  <div class="riding-view">
    <NavComp :content="wholeText" title="탑승 중인 버스" />
    <main>
      <article class="information">
        <h3>탑승 중인 버스</h3>
        <h1>{{ passengerStore.startStation.busRouteNm }} {{ passengerStore.startStation.direction }}행</h1>
      </article>
      <article class="information marginBottom">
        <h3>버스 현재 위치</h3>
        <h1>{{ driverStore.nowStationName }}</h1>
        <img src="@/assets/img/shallowDoubleArrow.png" alt="2개의 화살표 아이콘" width="32" />
        <h1 class="next-station">{{ driverStore.nextStationName }}</h1>
      </article>
      <button class="btn" @click="goLandingSearch">하차 정류장 미리 등록</button>
      <button class="btn" @click="landingNextStop">다음 정거장에서 하차</button>
    </main>
  </div>
</template>

<script>
  import NavComp from '@/components/NavComp.vue';
  import router from '@/router';
  import {useDriverStore} from '@/store/driverStore';
  import {usePassengerStore} from '@/store/passsengerStore';
  import {ref} from 'vue';

  import axios from '@/service/axios.js';

  export default {
    name: 'RidingBusView',
    components: {NavComp},
    setup() {
      // 읽을 전체 text
      const wholeText = ref(`탑승 중인 버스는 ${'501 새싹'}행 이며, 버스의 현재 위치는 ${'어쩌구 사거리'}입니다. 하차 정류장 미리 등록 버튼, 다음 정거장에서 하차 버튼`);

      const passengerStore = usePassengerStore();
      const driverStore = useDriverStore();

      const isBusArrive = ref(false); // 버스 도착 여부

      // 하차정류장 미리 등록 페이지로 이동
      const goLandingSearch = () => {
        router.push('/landingSearch');
      };

      // 다음 정거장에서 하차 버튼 클릭 이벤트
      const landingNextStop = () => {
        const endBusData = driverStore.routeInfo[driverStore.stationIndex + 1];
        // 하차 요청
        // 1. backend로 api 요청
        const url = '/api/pass/destination';

        axios
          .put(url, {
            bus_route_id: endBusData.busRouteId,
            origin_station: passengerStore.startStation.arsId,
            destination_station: endBusData.arsId,
          })
          .then(res => console.log('하차 요청 성공'))
          .catch(err => console.log(err));

        // 2. pinia 저장
        passengerStore.endStation = endBusData;

        // 3. 하차 예약 확인 페이지로 이동
        router.push('/landing');
      };

      return {
        wholeText,
        isBusArrive,
        passengerStore,
        driverStore,
        goLandingSearch,
        landingNextStop,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .riding-view {
    color: $white;
    height: 100vh;
    display: flex;
    flex-direction: column;
    main {
      flex-grow: 1;
      padding: 1rem;
      display: grid;
      grid-template: 20fr 40fr 20fr 20fr / 1fr;
      & > * {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .information {
        &:first-child {
          border-bottom: 1px solid $gray;
        }

        h3 {
          font-size: 30px;
          margin-bottom: 24px;
        }
        h1 {
          font-size: 2rem;
          color: $secondary;
          font-weight: bold;
        }

        .next-station {
          color: #f0f0f0;
          font-weight: 400;
        }
      }

      .marginBottom {
        h1,
        img {
          margin-bottom: 24px;
        }
      }

      .remain {
        font-size: 1.5rem;
        font-weight: bold;
      }
      button {
        border-radius: 1rem;
        background: transparent;
        font-size: 2rem;
        font-weight: bold;
        transition: 0.1s;
        margin-top: 16px;
        background: $secondary;

        &:active {
          transform: scale(0.98);
        }
      }
    }
  }
</style>
