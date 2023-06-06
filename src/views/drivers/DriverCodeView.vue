<template>
  <div class="container">
    <header>
      <h3>버스기사</h3>
      <h1>코드 입력</h1>
    </header>
    <main>
      <input
        v-model="driverStore.busRouteId"
        type="text"
        placeholder="노선 코드를 입력해주세요"
      />
      <input
        v-model="driverStore.vehId"
        type="text"
        placeholder="버스 코드를 입력해주세요"
      />
      <button @click="goToDriverMainPage" :disabled="driverStore.vehId == ''">
        확인
      </button>
      <button @click="goToMainPage" class="gray-button">뒤로가기</button>
    </main>
  </div>
</template>

<script>
  import router from '@/router';
  import {useDriverStore} from '@/store/driverStore';
  export default {
    setup() {
      const driverStore = useDriverStore();
      async function goToDriverMainPage() {
        await driverStore.getRouteInfo();
        router.push({name: 'driverMainView'});
      }
      function goToMainPage() {
        router.push({name: 'mainView'});
      }
      return {
        driverStore,
        goToDriverMainPage,
        goToMainPage,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    height: 100vh;
    width: 100vw;
    header {
      line-height: 4rem;
      margin-bottom: 3rem;
      h3 {
        font-size: 3rem;
        font-weight: bold;
      }
      h1 {
        font-size: 3.5rem;
        font-weight: bold;
      }
    }
    main {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      & > * {
        height: 3rem;
        font-size: 1.3rem;
        box-sizing: border-box;
        text-align: center;
        border-radius: 0.5rem;
        border: none;
        outline: none;
        font-weight: bold;
      }
      input {
        background: $gray;
        margin-bottom: 1rem;
        &::placeholder {
          color: $darkGray;
        }
      }
      button {
        background-color: $black;
        color: $white;
        transition: 0.3s;
        &:disabled {
          background-color: $gray;
        }
        &.gray-button {
          margin-top: 1rem;
          background-color: $gray;
          color: $black;
        }
      }
    }
  }
</style>
