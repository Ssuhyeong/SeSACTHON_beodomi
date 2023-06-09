<template>
  <div class="main-container">
    <div v-if="driverStore.loading" class="splash">
      <img class="image" src="@/assets/img/beodomiLogo.png" alt="버도미 아이콘" width="103" height="100" />
      <div class="motion-container">
        <h1 class="motion-text">{{ animatedText }}</h1>
      </div>
    </div>
    <div v-else class="contents">
      <header class="station-info">
        <h3>현재 정거장</h3>
        <h1>{{ driverStore.nowStationName }}</h1>
      </header>
      <main>
        <section class="board-info">
          <article class="card">
            <section class="total">
              <img src="@/assets/img/driver/Double_arrow_up.png" alt="승차 이미지" />
              <span class="card-title">승차</span>
              <span class="number">{{ driverStore.helpInfo.ridingPass }}</span>
            </section>
            <section class="help" :class="{active: isActiveHelp(driverStore.helpInfo.ridingPassHelp)}">
              <img src="@/assets/img/driver/Exclamation_mark_fill.png" alt="느낌표" />
              도움 {{ driverStore.helpInfo.ridingPassHelp }}
            </section>
          </article>
          <article class="card">
            <section class="total">
              <img src="@/assets/img/driver/Double_arrow_down.png" alt="승차 이미지" />
              <span class="card-title">하차</span>
              <span class="number">{{ driverStore.helpInfo.landingPass }}</span>
            </section>
            <section class="help" :class="{active: isActiveHelp(driverStore.helpInfo.landingPassHelp)}">
              <img src="@/assets/img/driver/Exclamation_mark_fill.png" alt="느낌표" />
              도움 {{ driverStore.helpInfo.landingPassHelp }}
            </section>
          </article>
        </section>

        <button @click="driverStore.busStop">
          {{ driverStore.isLastIndex ? '운행 완료' : '정차 완료' }}
        </button>
      </main>
      <footer class="station-info">
        <h3>다음 정거장</h3>
        <h1>{{ driverStore.nextStationName }}</h1>
      </footer>
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

      function isActiveHelp(helpNum) {
        console.log('헬프수:', helpNum);
        if (helpNum > 0) return true;
        else return false;
      }

      return {
        driverStore,
        animatedText,
        animateText,
        getStationInfo,
        isActiveHelp,
      };
    },
    unmounted() {
      clearInterval(this.getStationInfo);
    },
  };
</script>

<style lang="scss" scoped>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $black;
    background: $white;
    position: relative;
    flex-grow: 1;
    .splash {
      font-size: 1.8rem;
      word-break: keep-all;
      font-weight: bold;
      line-height: 3.5rem;
    }
    .contents {
      width: 100%;
      .station-info {
        position: absolute;
        width: 100%;
        background: $lightGray;
        padding: 1.5rem 0;
        h3 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }
        h1 {
          font-size: 1.5rem;
          font-weight: bold;
        }
      }
      header {
        top: 0;
      }
      footer {
        bottom: 0;
      }
      main {
        padding: 0 1rem;
        .board-info {
          display: flex;
          justify-content: space-between;
          .card {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            width: 49%;
            box-sizing: border-box;
            .total {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-bottom: 1rem;
              img {
                width: 3rem;
                height: 3rem;
                margin-bottom: 1rem;
              }
              .card-title {
                margin-bottom: 1rem;
                font-size: 2rem;
              }
              .number {
                font-size: 5rem;
              }
            }
            .help {
              img {
                width: 2rem;
                height: 2rem;
                margin-right: 1rem;
              }
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              padding: 10px;
              box-sizing: border-box;
              border-radius: 1rem;
              color: $white;
              &.active {
                background: $red;
              }
              background: $darkGray;
            }
          }
        }
        button {
          width: 100%;
          height: 10rem;
          box-sizing: border-box;
          font-size: 3rem;
          font-weight: bold;
          background: $secondary;
          border-radius: 1rem;
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
