<template>
  <div class="bus-search" id="container" ref="root">
    <h2 class="title">{{ title }}</h2>
    <button aria-label="음성검색 버튼" class="circle" @click="record"></button>
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
  import {onMounted, ref} from 'vue';
  import {usePassengerStore} from '@/store/passsengerStore';
  export default {
    name: 'BusSearchView',
    setup() {
      const passengerStore = usePassengerStore();

      const title = ref('버스 노선 혹은 정류장 이름을 입력하세요.');

      // 음성 검색
      function record() {
        // const self = this;
        // self.speechRecognition.onresult = function (event) {
        //   self.recognizedText =
        //     self.recognizedText + ' ' + event.results[0][0].transcript;
        // };
        // this.speechRecognition.start();
      }

      //   onMounted(() => {
      //     var SpeechRecognition = SpeechRecognition;
      //     this.speechRecognition = new SpeechRecognition();
      //   });

      // 키보드 사용하기 버튼 클릭 이벤트
      const goKeyboardSearch = () => {
        router.push('/keyboardSearch');
      };

      return {
        title,
        record,
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
