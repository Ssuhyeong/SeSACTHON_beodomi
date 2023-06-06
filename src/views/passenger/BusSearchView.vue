<template>
  <div class="bus-search" id="container" ref="root">
    <h2 class="title">{{ title }}</h2>
    <VoiceComp @click="voice_result()" />
    <button
      aria-label="키보드 사용하기 버튼"
      class="keyboard-btn"
      @click="goKeyboardSearch"
    >
      키보드 사용하기
    </button>

    <div id="contentDiv" :aria-live="ariaLive" :aria-hidden="ariaHidden">
      {{ pageContent }}
    </div>
    <button
      aria-label="전체 글을 읽어주는 버튼"
      class="talk-btn"
      @click.prevent="readAll()"
    >
      음성버튼
    </button>
    <div ref="voice"></div>
  </div>
</template>

<script>
  import router from '@/router/index';
  import {usePassengerStore} from '@/store/passsengerStore';
  import {ref} from 'vue';
  import {useRouter} from 'vue-router';
  import VoiceComp from '@/components/VoiceComp.vue';
  export default {
    name: 'BusSearchView',
    components: {
      VoiceComp,
    },
    setup() {
      const passengerStore = usePassengerStore();

      const title = ref('버스 노선 혹은 정류장 이름을 입력하세요.');
      const router = useRouter();
      // 음성 검색
      const voice_result = () => {
        window.SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;

        let recognition = new window.webkitSpeechRecognition();
        recognition.interimResults = true;
        recognition.lang = 'ko-KR';

        recognition.start();

        recognition.onresult = function (e) {
          let texts = Array.from(e.results)
            .map(results => results[0].transcript)
            .join('');

          title.value = texts;
          setTimeout(() => {
            router.push({
              name: 'keyboardSearchView',
              params: {keyword: title.value},
            });
          }, 3000);
        };
      };

      // 키보드 사용하기 버튼 클릭 이벤트
      const goKeyboardSearch = () => {
        router.push({
          name: 'keyboardSearchView',
          params: {keyword: 'keyboard'},
        });
      };

      return {
        title,
        voice_result,
        goKeyboardSearch,
        passengerStore,
      };
    },
    mounted() {},
    methods: {
      readAll() {
        const text = '과장이 아니란걸 알게됐어';
        this.passengerStore.announcePageContent(text, this.$refs.voice);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .bus-search {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;

    .title {
      font-weight: 700;
      font-size: 28px;
      line-height: 34.16px;
      width: 313px;
      padding-top: 100px;
    }

    .circle {
      background-color: $gray;
      width: 210px;
      height: 210px;
      border-radius: 50%;
      border: none;
    }

    // 키보드 사용 버튼
    .keyboard-btn {
      height: 124px;
      background-color: $primary;
      color: $secondary;
      font-size: 30px;
      font-weight: 700;
      line-height: 22px;
      text-align: center;
      letter-spacing: -0.408px;
      margin-bottom: 6px;
      width: 100vw;
    }

    // 음성 버튼
    .talk-btn {
      width: 162px;
      height: 81px;
      background-color: $gray;
      border-radius: 81px 81px 0 0;
      border: none;
    }

    .contentDiv {
    }
  }
</style>
