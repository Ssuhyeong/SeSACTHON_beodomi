<template>
  <div class="nav">
    <div class="wholeText" ref="htmlElement"></div>
    <img class="beodomi" src="@/assets/img/beodomiLogoText.png" alt="버도미 로고와 텍스트" width="89" />
    <img @click="readWholeText" class="wholeBtn" src="@/assets/img/wholeTextIcon.png" alt="전체 읽어주는 버튼" height="20" />
  </div>
</template>

<script>
  import {ref} from 'vue';
  export default {
    name: 'NavComp',
    props: {
      content: {
        type: String,
        default: '',
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

      return {
        htmlElement,
        readWholeText,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .nav {
    height: 60px;
    position: relative;
    border-bottom: 2px solid #565656;

    .beodomi {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .wholeBtn {
      position: absolute;
      top: 50%;
      right: 18px;
      transform: translate(-50%, -18px);
      background-color: $secondary;
      border-radius: 5px;
      border: none;
      padding: 6px 12px;
    }
  }
</style>
