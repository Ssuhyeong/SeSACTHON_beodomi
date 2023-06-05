<template>
  <div id="search_container">
    <div id="text_container">
      <div id="text_area">{{ voice_text }}</div>
    </div>
    <VoiceComp/>
    <div id="keyboard_btn">키보드 사용하기</div>
  </div>
</template>

<script>
import VoiceComp from '@/components/VoiceComp.vue'

export default {
  name: 'ReservationView',
  components: {
    VoiceComp
  },
  data() {
    return {
      voice_text: "하차할 정거장을 입력하세요"
    }
  }
}
</script>

<style lang="scss" scoped>

#text_container {
  display: flex;
  align-items: center;
  justify-content: center;
}

#text_area {
  font-weight: 700;
  font-size: 28px;
  margin-top:77px;
  width: 220px;
}

#keyboard_btn {
  background-color: $primary;
  color: $secondary;
  font-weight: 700;
  font-size: 30px;
  padding: 51px 0px;
  margin-top: 40px
}

</style>
