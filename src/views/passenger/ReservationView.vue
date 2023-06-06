<template>
  <div id="search_container">
    <div id="text_container">
      <div id="text_area">{{ voice_text }}</div>
    </div>
    <VoiceComp @click="test()"/>
    <div id="keyboard_btn">키보드 사용하기</div>

    <div class="words" contenteditable>
  
    </div>
  </div>
</template>

<script>
import VoiceComp from '@/components/VoiceComp.vue'
import { ref } from 'vue';

export default {
  name: 'ReservationView',
  components: {
    VoiceComp
  },
  setup(){
    const voice_text = ref('하차할 정거장을 \n 입력하세요');

    const test = () => {
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      let recognition = new window.webkitSpeechRecognition
      recognition.interimResults = true;
      recognition.lang = 'ko-KR';


      recognition.start();

      recognition.onresult = function(e) {
        let texts = Array.from(e.results).map(results => results[0].transcript).join("");

        voice_text.value = texts;
        console.log(voice_text.value);
      };
    }

    return{
      voice_text,
      test
    }
  },
 
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
  width: 230px;
  height: 60px;
  line-height: 140%;
}

#keyboard_btn {
  background-color: $primary;
  color: $secondary;
  font-weight: 700;
  font-size: 30px;
  padding: 51px 0px;
  margin-top: 40px;
  cursor: pointer;
}

</style>
