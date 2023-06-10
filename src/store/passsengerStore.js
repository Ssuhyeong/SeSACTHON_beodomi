import {defineStore} from 'pinia';
import {ref} from 'vue';

export const usePassengerStore = defineStore(
  'passenger',
  () => {
    /** 커스텀 콘텐츠를 읽어주는 함수
     * 읽어줄 HTML 요소가 view 페이지에 하나 있어야된다.
     * innerText에 넣어줘야만 읽어주므로 해당 요소는 화면에서 보이지 않아야 한다.
     * html 요소 속성에 ref='요소명'을 한 뒤 호출할 때 methods에서 this.$refs.요소명 으로 접근하면 된다.
     *
     * @param {*} content 읽어줄 텍스트 컨텐츠
     * @param {*} htmlElement 텍스트를 담을 HTML 요소
     */
    function announcePageContent(content, htmlElement) {
      htmlElement.setAttribute('aria-live', 'assertive');

      setTimeout(function () {
        htmlElement.removeAttribute('aria-live');
      }, 100);
    }

    // 시작 - 버스 위치
    const startStation = ref({}); // 승차 정거장
    const endStation = ref({}); // 하차 정거장

    // 끝 - 버스 위치

    return {
      announcePageContent,
      startStation,
      endStation,
    };
  },
  {
    persist: true,
  },
);
