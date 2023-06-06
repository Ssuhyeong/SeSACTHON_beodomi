<template>
  <div class="container">
    <div v-if="driverStore.loading" class="splash">
      <div class="motion-container">
        <h1 class="motion-text">{{ animatedText }}</h1>
      </div>
    </div>
    <div v-else class="contents">
      <header>
        <h3>현재 정거장</h3>
        <h1>{{ driverStore.nowStationName }}</h1>
      </header>
      <main>
        <article>
          <section>승차 {{ driverStore.helpInfo.ridingPass }}명</section>
          <section>도움 {{ driverStore.helpInfo.ridingPassHelp }}명</section>
        </article>
        <article>
          <section>하차 {{ driverStore.helpInfo.landingPass }}명</section>
          <section>도움 {{ driverStore.helpInfo.landingPassHelp }}명</section>
        </article>
        <button @click="driverStore.busStop">
          {{ driverStore.isLastIndex ? '운행 완료' : '정차 완료' }}
        </button>
      </main>
      <footer>
        <h3>다음 정거장</h3>
        <h1>{{ driverStore.nextStationName }}</h1>
      </footer>
      <router-link class="goToCodePage" :to="{name: 'driverEnter'}"
        >다른 코드 입력하기</router-link
      >
    </div>
  </div>
</template>

<script>
  import {ref} from 'vue';
  import {useDriverStore} from '@/store/driverStore';
  export default {
    setup() {
      const driverStore = useDriverStore();

      // 시작 - 스플래쉬 페이지
      const animatedText = ref('');
      function animateText() {
        const text = '안전한 하루 되세요!';
        let index = 0;

        setInterval(() => {
          animatedText.value = text.slice(0, index);

          if (index === text.length) {
            clearInterval();
          } else {
            index++;
          }
        }, 50);
      }
      animateText();
      // 끝 - 스플래쉬 페이지

      /** 시간초마다 이번 정류장의 요청정보 받아오기 */
      const getStationInfo = setInterval(async () => {
        console.log('인터벌');
        await driverStore.getHelpInfo();
      }, 5000);

      return {
        driverStore,
        animatedText,
        animateText,
        getStationInfo,
      };
    },
    unmounted() {
      clearInterval(this.getStationInfo);
    },
  };
</script>

<style lang="scss" scoped>
  .container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .splash {
      font-size: 2rem;
      width: 50%;
      word-break: keep-all;
      font-weight: bold;
      line-height: 3.5rem;
    }
    .contents {
      width: 100%;
      header,
      footer {
        h3 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }
        h1 {
          font-size: 1.5rem;
          font-weight: bold;
        }
      }
      main {
        padding: 0 1rem;
        article {
          margin: 3rem 0;
          font-size: 1.5rem;
          font-weight: bold;
          section {
            margin-bottom: 1.2rem;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
        button {
          width: 100%;
          height: 5rem;
          box-sizing: border-box;
          font-size: 1.5rem;
          font-weight: bold;
          background: $gray;
          border: none;
          outline: none;
          margin-bottom: 3rem;
          transition: 0.1s;
          &:active {
            background: $darkGray;
          }
        }
      }
      .goToCodePage {
        position: fixed;
        bottom: 0;
        text-decoration: none;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 3rem;
        background-color: $black;
        color: $white;
      }
    }
  }
</style>
