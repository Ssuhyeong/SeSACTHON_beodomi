<template>
  <div id="riding_container">
    <div id="text_container">
      <div id="title_bus_text">탑승 중인 버스</div>
    </div>
    <div id="bus_info">
      <div id="track">지선</div>
      <div>
        <div id="bus_number">5678 <span>선진운수</span></div>
        <div class="bus_route">구산동 -> 교대역</div>
        <div class="bus_route">(상향)</div>
      </div>
    </div>

    <div v-if="flag" style="margin-top: 84.65px">
      <div class="keyboard_btn">하차 정거장 미리 등록</div>
      <div class="keyboard_btn" @click="flag = false">다음 정거장에서 하차</div>
    </div>
    <div style="margin-top: 64.65px" v-else>
      <div class="sub_text">버스 현재 위치</div>
      <div class="station_info">강남역 정류성</div>
      <div class="sub_text">하차 정보</div>
      <div class="station_state">
        <div style="padding-top: 17.5px">5정거장 전</div>
        <div style="padding-top: 10px">14분 23초 후 승차</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LandingView',
    components: {},
    data() {
      return {
        voice_text: '버스 정보',
        flag: true,
      };
    },
    methods: {
      takeBus() {
        this.flag = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  span {
    font-weight: 400;
    font-size: 24px;
    color: #878787;
  }

  #bus_number {
    font-weight: 700;
    font-size: 28px;
    text-align: left;
  }

  #track {
    font-weight: 700;
    font-size: 28px;
    background-color: #f0f0f0;
    padding: 30.16px 24px;
    border-radius: 10px;
  }

  #bus_info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 315px;
    height: 99.35px;
    margin: 0 auto;
  }

  #text_container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #title_text {
    font-weight: 700;
    font-size: 28px;
    margin-top: 109px;
    margin-bottom: 30px;
    width: 220px;
  }

  #title_bus_text {
    font-weight: 700;
    font-size: 28px;
    margin-top: 70px;
    margin-bottom: 30px;
    width: 220px;
  }

  #bell_btn {
    background-color: $primary;
    color: $secondary;
    font-weight: 700;
    font-size: 30px;
    padding: 51px 0px;
    margin-top: 70px;
    cursor: pointer;
  }

  #help_btn {
    background-color: $primary;
    color: $secondary;
    font-weight: 700;
    font-size: 30px;
    padding: 32.5px 0px;
    margin: 22px 0px;
    cursor: pointer;
  }

  .station_info {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 358px;
    height: 98px;
    border-radius: 10px;
    background-color: #f0f0f0;
    font-weight: 700;
    font-size: 24px;
    color: #404040;
  }

  .station_state {
    margin: 0 auto;
    width: 358px;
    height: 98px;
    border-radius: 10px;
    background-color: #f0f0f0;
    font-weight: 700;
    font-size: 24px;
    color: #404040;
  }

  .bus_route {
    font-weight: 400;
    font-size: 24px;
    text-align: left;
  }

  .sub_text {
    font-weight: 700;
    font-size: 28px;
    margin: 40px 0px;
  }

  .keyboard_btn {
    background-color: $primary;
    color: $secondary;
    font-weight: 700;
    font-size: 30px;
    padding: 51px 0px;
    margin: 13px 0px;
    cursor: pointer;
  }
</style>
