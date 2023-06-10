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
      <button class="btn">하차 정류장 미리 등록</button>
      <button class="btn">다음 정거장에서 하차</button>
    </main>
  </div>
</template>

<script>
  import NavComp from '@/components/NavComp.vue';
  import router from '@/router';
  import {useDriverStore} from '@/store/driverStore';
  import {usePassengerStore} from '@/store/passsengerStore';
  import {ref, watch, watchEffect} from 'vue';

  export default {
    name: 'RidingBusView',
    components: {NavComp},
    watch: {
      'passengerStore.startStation.seq'(newValue, oldValue) {
        console.log('바뀜: ', newValue);
        this.remain = newValue - this.driverStore.stationIndex;
      },
    },
    setup() {
      // 읽을 전체 text
      const wholeText = ref(`탑승 중인 버스는 ${'501 새싹'}행 이며, 버스의 현재 위치는 ${'어쩌구 사거리'}입니다. 하차 정류장 미리 등록 버튼, 다음 정거장에서 하차 버튼`);

      const passengerStore = usePassengerStore();
      const driverStore = useDriverStore();

      const isBusArrive = ref(false); // 버스 도착 여부
      const remain = ref(passengerStore.startStation.seq - driverStore.stationIndex); // 버스가 도착하기까지 남은 정류장 수

      console.log(driverStore);

      watch(
        () => passengerStore.startStation.seq,
        (newValue, oldValue) => {
          console.log('바뀜: ', newValue);
          remain.value = newValue - driverStore.stationIndex;
        },
      );

      watch(
        () => remain.value,
        (newValue, oldValue) => {
          if (newValue == 0) {
            router.push({name: 'RidingAlarmView'});
          }
        },
      );

      function getRemainStation() {
        const busOrd = driverStore.stationIndex; // 버스의 현재 위치
        const stOrd = passengerStore.startStation.seq;
      }

      return {
        wholeText,
        isBusArrive,
        passengerStore,
        driverStore,
        remain,
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
