<template>
  <div class="nav">
    <div class="wholeText" ref="htmlElement"></div>
    <img
      class="backBtn"
      @click="goBack"
      v-if="pageName !== 'main'"
      :src="theme === 'light' ? require('@/assets/img/backBtn.png') : require('@/assets/img/backBtnWhite.png')"
      alt="뒤로가기 버튼"
      height="15"
    />
    <img v-if="pageName === 'main'" class="beodomi" src="@/assets/img/beodomiLogoText.png" alt="버도미 로고와 텍스트" width="89" />
    <span v-else class="beodomi">{{ title }}</span>
    <img
      @click="readWholeText"
      class="wholeBtn"
      :src="theme === 'dark' ? require('@/assets/img/wholeTextIcon.png') : require('@/assets/img/wholeTextIconYellow.png')"
      alt="전체 읽어주는 버튼"
      height="20"
    />
  </div>
</template>

<script>
  import {computed, ref} from 'vue';
  import {useRouter} from 'vue-router';
  export default {
    name: 'NavComp',
    props: {
      content: {
        type: String,
        default: '',
      },
      backgroundColor: {
        type: String,
        default: '#152827',
      },
      btnBackgroundColor: {
        type: String,
        default: '#FFDB1D',
      },
      color: {
        type: String,
        default: 'white',
      },
      pageName: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
      theme: {
        type: String,
        default: 'dark',
      },
    },
    setup(props) {
      const htmlElement = ref(null);

      // 전체 읽어주는 버튼 클릭 이벤트
      const readWholeText = async () => {
        console.log(props.content);
        htmlElement.value.setAttribute('aria-live', 'assertive');
        htmlElement.value.innerText = props.content;

        setTimeout(function () {
          htmlElement.value.removeAttribute('aria-live');
          htmlElement.value.innerText = '';
        }, 1);
      };

      console.log(props.btnBackgroundColor);

      // 뒤로 가기 버튼 클릭 이벤트
      const router = useRouter();
      const goBack = () => {
        router.go(-1);
      };

      return {
        htmlElement,
        readWholeText,
        goBack,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .nav {
    height: 60px;
    position: relative;
    border-bottom: 2px solid #8d8d8d;
    background-color: v-bind(backgroundColor);

    //뒤로가기 버튼
    .backBtn {
      position: absolute;
      top: 50%;
      left: 25px;
      transform: translate(-50%, -50%);
    }

    .beodomi {
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;

      color: v-bind(color);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .wholeBtn {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(-50%, -50%);
      background-color: v-bind(btnBackgroundColor);
      border-radius: 5px;
      border: none;
      padding: 6px 12px;
    }
  }
</style>
