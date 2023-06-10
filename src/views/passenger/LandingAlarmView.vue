<template>
  <div class="riding-alarm-view">
    <NavCompVue :content="wholeText" backgroundColor="white" btnBackgroundColor="#152827" color="black" theme="light" title="하차 완료" />
    <main>
      <article>목적지에 도착했습니다</article>
      <section class="button-group">
        <button class="confirm-button" @click="landingSuccess()">하차 완료</button>
        <button class="additional-button" @click="busSearch()">다른 버스 검색</button>
      </section>
    </main>
  </div>
</template>

<script>
  import NavCompVue from '@/components/NavComp.vue';
  export default {
    components: {
      NavCompVue,
    },
    methods: {
      landingSuccess() {
        this.$router.push({name: 'mainView'});
      },
      busSearch() {
        this.$router.push({name: 'busSearchView'});
      },
    },
  };
</script>

<style lang="scss" scoped>
  .riding-alarm-view {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: $white;
    main {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      article {
        font-size: 2rem;
        font-weight: bold;
        word-break: keep-all;
      }
      .button-group {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        box-sizing: border-box;
        button {
          font-size: 2rem;
          height: 10vh;
          border: none;
          border-radius: 1rem;
          transition: 0.1s;
          font-weight: bold;
          cursor: pointer;
          &:active {
            transform: scale(0.98);
          }
          &.confirm-button {
            background: $primary;
            color: $secondary;
            margin-bottom: 1rem;
          }
          &.additional-button {
            background: $secondary;
          }
        }
      }
    }
  }
</style>
