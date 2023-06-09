<template>
  <div class="container">
    <header>
      <h1>운행 준비!</h1>
      <h3>운행할 버스 정보를 입력해주세요</h3>
    </header>
    <main>
      <input v-model="driverStore.busRouteId" type="text" placeholder="| 노선 코드를 입력해주세요" />
      <input v-model="driverStore.vehId" type="text" placeholder="| 버스 코드를 입력해주세요" />
      <button @click="goToDriverMainPage" :disabled="driverStore.vehId == ''">확인</button>
      <section class="logo">
        <div>
          <img class="image" src="@/assets/img/beodomiLogo.png" alt="버도미 아이콘" width="103" height="100" />
        </div>
        <img class="name" src="@/assets/img/beodomiText.png" alt="버도미 아이콘" width="205" />
        <img class="dot" src="@/assets/img/beodomiBraille.png" alt="버도미 점자 표시" width="211" />
      </section>
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
      return {
        driverStore,
        goToDriverMainPage,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    header {
      margin: 3rem 0;
      h1 {
        font-size: 3.5rem;
        font-weight: bold;
        color: $secondary;
        margin-bottom: 1rem;
      }
      h3 {
        font-size: 1.5rem;
        color: $white;
      }
    }
    main {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      padding-top: 2rem;
      background: $white;
      border-radius: 1rem 1rem 0 0;
      flex-grow: 1;
      & > * {
        height: 3rem;
        font-size: 1.3rem;
        box-sizing: border-box;
        border: none;
        outline: none;
        font-weight: bold;
      }
      input {
        border-bottom: 2px solid $gray;
        margin-bottom: 1rem;
        padding: 0 1rem;
        text-align: start;
        &::placeholder {
          color: $darkGray;
        }
      }
      button {
        margin-top: 1rem;
        background-color: $primary;
        color: $secondary;
        transition: 0.3s;
        border-radius: 0.5rem;
        &:disabled {
          background-color: $gray;
          color: $white;
        }
        &.gray-button {
          margin-top: 1rem;
          background-color: $gray;
          color: $black;
        }
      }
      .logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        $logo-size: 6rem;
        flex-grow: 1;
        .image {
          width: $logo-size;
          height: $logo-size;
          margin-bottom: 1rem;
        }
        .name {
          margin-bottom: 1rem;
        }
        .name,
        .dot {
          width: $logo-size;
          height: var(2/5 * $logo-size);
        }
      }
    }
  }
</style>
