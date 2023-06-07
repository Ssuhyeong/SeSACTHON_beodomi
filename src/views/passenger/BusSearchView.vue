<template>
  <div class="bus-search" id="container">
    <ToggleComp style="margin-top: 40px" @getSearchType="getSearchType" />
    <template v-if="searchType == 'voice'">
      <h2 class="title">{{ title }}</h2>
      <VoiceComp @click="voice_result()" style="margin-top: 40px" />
      <div id="contentDiv" :aria-live="ariaLive" :aria-hidden="ariaHidden">
        {{ pageContent }}
      </div>
    </template>
    <template v-else>
      <div class="form-control">
        <input type="value" required="" placeholder="검색어를 입력하세요" @keyup.enter="search_keyboard" v-model="input" />
        <img src="@/assets/img/searchBtn.png" alt="역에서 탑승가능한 버스를 보는 버튼" width="32" height="32" style="margin-left: 20px" />
      </div>
    </template>
  </div>
</template>

<script>
  import {ref} from 'vue';
  import VoiceComp from '@/components/VoiceComp.vue';
  import ToggleComp from '@/components/ToggleComp.vue';
  import {useRouter} from 'vue-router';

  export default {
    name: 'BusSearchView',
    components: {
      VoiceComp,
      ToggleComp,
    },
    setup() {
      const title = ref('버튼을 누른 후 검색어를 말해주세요');
      const input = ref('');
      const searchType = ref('voice');
      const bg_color = ref('#fff');
      const router = useRouter();
      // 음성 검색
      const voice_result = () => {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

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

      const getSearchType = value => {
        searchType.value = value;
        if (searchType.value == 'voice') {
          bg_color.value = '#fff';
        } else {
          bg_color.value = '#082220';
        }
      };

      const search_keyboard = () => {
        router.push({
          name: 'keyboardSearchView',
          params: {keyword: input.value},
        });
      };

      return {
        title,
        searchType,
        input,
        bg_color,
        voice_result,
        ariaLive,
        ariaHidden,
        pageContent,
        readWholeText,
        getSearchType,
        search_keyboard,
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
    height: 100vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: v-bind(bg_color);
    // justify-content: space-between;

    .title {
      font-weight: 700;
      font-size: 28px;
      line-height: 34.16px;
      width: 300px;
      margin-top: 80px;
    }

    .circle {
      background-color: $primary;
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
  }

  .form-control {
    position: relative;
    display: flex;
    align-items: center;
    margin: 40px 0 40px;
    width: 340px;
  }
  .form-control input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px #fff solid;
    display: block;
    width: 100%;
    padding: 15px 0;
    font-weight: 700;
    font-size: 20px;
    color: #ffffff;
    text-align: left;
  }
  .form-control input:focus,
  .form-control input:valid {
    outline: 0;
    border-bottom-color: #ffdb1d;
  }
</style>
