<template>
  <div class="riding-view">
    <NavCompVue :content="wholeText" backgroundColor="#152827" btnBackgroundColor="#FFDB1D" color="#FFDB1D" theme="dark" title="승차 예약 확인" />
    <main>
      <article class="information">
        <h3>승차 정류장</h3>
        <h1>{{ passengerStore.startStation.stationNm }}</h1>
      </article>
      <article class="information">
        <h3>승차 버스</h3>
        <h1>{{ passengerStore.startStation.busRouteNm }} {{ passengerStore.startStation.direction }}행</h1>
      </article>
      <article class="remain">{{ remain }} 정거장 전</article>
      <button @click="helpRequestToggle" :class="{activated: passengerStore.needHelp}" class="help-button">승차 도움 {{ passengerStore.needHelp ? '취소' : '요청' }}</button>
      <button @click="goToListPage" class="book-button">예약 취소/변경</button>
    </main>
  </div>
</template>

<script>
  import NavCompVue from '@/components/NavComp.vue';
  import {onUnmounted, ref} from 'vue';
  import {usePassengerStore} from '@/store/passsengerStore';
  import {useDriverStore} from '@/store/driverStore';
  import router from '@/router';

  export default {
    components: {
      NavCompVue,
    },
    setup() {
      const passengerStore = usePassengerStore();
      const driverStore = useDriverStore();

      // 시작 - 버스 현재 위치 갱신하기
      const remain = ref(passengerStore.startStation.seq - driverStore.stationIndex - 1); // 버스가 도착하기까지 남은 정류장 수
      const remainTime = setInterval(() => {
        const busOrder = JSON.parse(localStorage.getItem('driver')).stationIndex;
        remain.value = passengerStore.startStation.seq - busOrder - 1;
        // if (remain.value === 0) {
        //   router.push({name: 'RidingAlarmView'});
        // }
      }, 1000);
      // 끝 - 버스 현재 위치 갱신하기

      // 시작 - 승차 도움 요청
      function helpRequestToggle() {
        passengerStore.needHelp = !passengerStore.needHelp;
        passengerStore.helpRequestToggle();
      }
      // 끝 - 승차 도움 요청

      function goToListPage() {
        router.go(-1);
      }

      onUnmounted(() => {
        clearInterval(remainTime);
      });

      return {
        passengerStore,
        remain,
        helpRequestToggle,
        goToListPage,
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
      grid-template: 21fr 21fr 16fr 21fr 21fr / 1fr;
      & > * {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        // background: skyblue;
      }
      .information {
        border-bottom: 1px solid $gray;
        h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        h1 {
          font-size: 2rem;
          color: $secondary;
          font-weight: bold;
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
        cursor: pointer;
        &:active {
          transform: scale(0.98);
        }
        &.help-button {
          margin-bottom: 0.5rem;
          border: 5px solid $red;
          background: $red;
          color: $white;
          &:hover,
          &.activated {
            color: $red;
            background: transparent;
          }
        }
        &.book-button {
          margin-top: 0.5rem;
          background: $secondary;
        }
      }
    }
  }
</style>
