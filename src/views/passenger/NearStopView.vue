<template>
  <div class="near-stop">
    <h1>가까운 정거장</h1>
    <div class="scroll">
      <div
        v-for="stop in [
          {name: '상왕십리역', distance: '20m'},
          {name: '어쩌구역', distance: '80m'},
          {name: '새싹아파트히힛1', distance: '120m'},
          {name: '새싹아파트히힛2', distance: '120m'},
          {name: '새싹아파트히힛3', distance: '120m'},
          {name: '새싹아파트히힛4', distance: '120m'},
        ]"
        :key="stop.name"
      >
        <div class="stops" @click="showAvailableBus(stop.name)">
          <span class="stop-name">{{ stop.name }}</span>
          <span class="stop-distance">{{ stop.distance }}</span>
          <img
            src="@/assets/img/detailBtn.png"
            alt="역에서 탑승가능한 버스를 보는 버튼"
            width="31"
          />
        </div>
        <div class="available-bus" v-if="clickStop === stop.name">
          <div class="point-icon"></div>
          <div class="display" @click="goStopBusListView">
            <span class="title">탑승 가능 버스</span>
            <div class="buses">
              <span
                v-for="bus in [111, 222, 333, 444, 555, 666, 777, 888]"
                :key="bus"
                >&nbsp; {{ bus }}
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

  export default {
    name: 'NearStopView',
    setup() {
      // 클릭한 역 이름
      const clickStop = ref(null);

      // 역의 상세 버튼 클릭 이벤트
      const showAvailableBus = stopName => {
        if (clickStop.value !== null) {
          // 클릭 취소
          clickStop.value = null;
        } else {
          clickStop.value = stopName;
        }
      };

      // 해당 역의 경유 버스 보여주는 페이지로 이동
      const goStopBusListView = () => {
        router.push('/stopBusList');
      };

      return {
        clickStop,
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
