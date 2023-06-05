<template>
  <div class="bus-search" id="container">
    <h2 class="title">{{ title }}</h2>
    <button aria-label="음성검색 버튼" class="circle" @click="record"></button>
    <button aria-label="키보드 사용하기 버튼" class="keyboard-btn">
      키보드 사용하기
    </button>

    <div id="contentDiv" :aria-live="ariaLive" :aria-hidden="ariaHidden">
      {{ pageContent }}
    </div>
    <button
      aria-label="전체 글을 읽어주는 버튼"
      class="talk-btn"
      @click="readWholeText"
    >
      음성버튼
    </button>
  </div>
</template>

<script>
  import {onMounted, ref} from 'vue';
  export default {
    name: 'BusSearchView',
    setup() {
      const title = ref('버스 노선 혹은 정류장 이름을 입력하세요.');

      // 음성 검색
      function record() {
        const self = this;

        self.speechRecognition.onresult = function (event) {
          self.recognizedText =
            self.recognizedText + ' ' + event.results[0][0].transcript;
        };

        this.speechRecognition.start();
      }

      onMounted(() => {
        var SpeechRecognition = SpeechRecognition;
        this.speechRecognition = new SpeechRecognition();
      });

      // 전체 읽어주기 기능
      const ariaLive = ref('polite');
      const ariaHidden = ref('');
      const pageContent = ref('');

      const readWholeText = () => {
        const contentElement = document.getElementById('container');
        const content = contentElement.innerText;

        // 읽어주기 전 잠시 숨김처리
        ariaHidden.value = true;

        // 스크린 리더에게 전체 내용을 읽어달라는 요청
        ariaLive.value = 'assertive';
        pageContent.value = content;

        console.log(pageContent.value);
        // pageContent.value = '';

        // 읽기가 완료된 후 다시 숨김처리 해제
        setTimeout(() => {
          ariaLive.value = 'polite';
          ariaHidden.value = '';
        }, 100);
      };

      return {
        title,
        record,
        ariaLive,
        ariaHidden,
        pageContent,
        readWholeText,
      };
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
      padding-top: 124px;
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
