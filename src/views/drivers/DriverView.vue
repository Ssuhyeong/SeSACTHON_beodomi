<template>
  <div class="container">
    <header>
      <h1>운행 준비!</h1>
      <h3>운행할 버스 정보를 입력해주세요</h3>
    </header>
    <main>
      <router-view></router-view>
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
    box-sizing: border-box;
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
      background: $white;
      border-radius: 1rem 1rem 0 0;
      flex-grow: 1;
    }
  }
</style>
