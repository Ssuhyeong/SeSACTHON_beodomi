<template>
  <div>
    <NavComp
      :content="wholeText"
      :backgroundColor="searchType === 'voice' ? 'white' : '#152827'"
      :btnBackgroundColor="searchType === 'voice' ? '#152827' : '#FFDB1D'"
      :color="searchType === 'voice' ? 'black' : '#FFDB1D'"
      :theme="searchType === 'voice' ? 'light' : 'dark'"
      title="하차 정류장 미리 등록"
    />
    <div class="bus-search" id="container">
      <ToggleComp style="margin-top: 40px" @getSearchType="getSearchType" />
      <template v-if="searchType == 'voice'">
        <h2 class="title">{{ title }}</h2>
        <VoiceComp @click="voice_result()" style="margin-top: 40px" />
      </template>
      <template v-else>
        <div class="form-control">
          <input type="value" required="" placeholder="검색어를 입력하세요" @keyup.enter="search_keyboard" v-model="input" />
          <img src="@/assets/img/searchBtn.png" alt="역에서 탑승가능한 버스를 보는 버튼" width="32" height="32" style="margin-left: 20px" @click="search_keyboard" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import {ref} from 'vue';
  import VoiceComp from '@/components/VoiceComp.vue';
  import ToggleComp from '@/components/ToggleComp.vue';
  import {useRouter} from 'vue-router';
  import NavComp from '@/components/NavComp.vue';

  export default {
    name: 'BusLandingSearch',
    components: {
      VoiceComp,
      ToggleComp,
      NavComp,
    },
    setup() {
      // 읽어줄 전체 텍스트
      const wholeText = ref('음성으로 버스 노선 검색. 버튼을 누른 후 검색어를 말해주세요. 음성 검색 버튼 ');

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
              name: 'KeyboardLandingSearchView',
              params: {keyword: title.value},
            });
          }, 3000);
        };
      };
      const getSearchType = value => {
        searchType.value = value;
        if (searchType.value == 'voice') {
          bg_color.value = '#fff';
          wholeText.value = '음성으로 버스 노선 검색. 버튼을 누른 후 검색어를 말해주세요. 음성 검색 버튼 ';
        } else {
          bg_color.value = '#082220';
          wholeText.value = '키보드로 버스 노선 검색. 검색어를 입력하세요.';
        }
      };

      const search_keyboard = () => {
        router.push({
          name: 'KeyboardLandingSearchView',
          params: {keyword: input.value},
        });
      };

      return {
        wholeText,
        title,
        searchType,
        input,
        bg_color,
        voice_result,
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
