<template>
  <div>
    <div class="container">
      <NavCompVue
        :content="wholeText"
        :backgroundColor="fullView ? 'white' : '#152827'"
        :btnBackgroundColor="fullView ? '#152827' : '#FFDB1D'"
        :color="fullView ? 'black' : '#FFDB1D'"
        :theme="fullView ? 'light' : 'dark'"
        :driver="true"
        title="운행정보"
      />
      <header :class="{'full-view': fullView}">
        <h1>운행 준비!</h1>
        <h3>운행할 버스 정보를 입력해주세요</h3>
      </header>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
  import router from '@/router';
  import {useDriverStore} from '@/store/driverStore';
  import {useRoute} from 'vue-router';
  import {ref, watch} from 'vue';
  import NavCompVue from '@/components/NavComp.vue';

  export default {
    components: {
      NavCompVue,
    },
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
    box-sizing: border-box;
    position: relative;
    nav {
      border-bottom: 1px solid $darkGray;
    }
    header {
      transition: 0.1s;
      margin: 3rem 0;
      &.full-view {
        height: 0;
        margin: 0;
      }
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
      top: 25vh;
      width: 100%;
    }
  }
</style>
