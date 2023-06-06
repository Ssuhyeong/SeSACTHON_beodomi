<template>
  <div>
    <div v-if="type == '승차'">
      <h1>탑승 할 버스가<br/> 정류장에 도착했습니다!</h1>
      <div v-if="flag">
        <div class="keyboard_btn">탑승 완료</div>
        <div class="keyboard_btn">다른 버스 검색</div>
      </div>
      <div v-else class="help_btn">다른 버스 검색</div>
    </div>
    <div v-if="type == '하차'">
      <h1>버스가 하차 정거장에 <br/>도착했습니다.</h1>
      <div>
        <div class="keyboard_btn">하차 완료</div>
        <div class="keyboard_btn">다른 정거장에서 하차</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RidingAlarmView',
  components: {
    
  },
  data() {
    return {
      flag: true,
      type: "하차"
    }
  },
}
</script>

<style lang="scss" scoped>

h1 {
  font-weight: 700;
  font-size: 28px;
  margin:110px 0px;
  line-height: 140%;
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

.help_btn {
  background-color: $primary;
  color: $secondary;
  font-weight: 700;
  font-size: 30px;
  padding: 51px 0px;
  margin-top: 180px;
  cursor: pointer;
}

</style>