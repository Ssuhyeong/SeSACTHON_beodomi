<template>
  <div class="container">
    <header>
      <h1>운행 준비!</h1>
      <h3>운행할 버스 정보를 입력해주세요</h3>
    </header>
    <main :class="{'full-view': fullView}">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import router from '@/router';
  import {useDriverStore} from '@/store/driverStore';
  import {useRoute} from 'vue-router';
  import {ref, watch} from 'vue';
  export default {
    setup() {
      const driverStore = useDriverStore();
      async function goToDriverMainPage() {
        await driverStore.getRouteInfo();
        router.push({name: 'driverMainView'});
      }

      const route = useRoute();
      watch(
        () => route.name,
        (newName, oldName) => {
          console.log('라우트 변경됨', newName, oldName);
          if (newName == 'driverMainView') {
            fullView.value = true;
          } else {
            fullView.value = false;
          }
        },
      );
      const fullView = ref(false);
      return {
        driverStore,
        goToDriverMainPage,
        fullView,
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
    position: relative;
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
      flex-grow: 1;
      transition: 0.5s;
      position: absolute;
      width: 100vw;
      top: 25vh;
      height: 75vh;
      &.full-view {
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 0;
      }
    }
  }
</style>
