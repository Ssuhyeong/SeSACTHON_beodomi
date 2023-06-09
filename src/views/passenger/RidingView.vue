<template>
  <div class="riding-view">
    <NavCompVue :content="wholeText" backgroundColor="#152827" btnBackgroundColor="#FFDB1D" color="#FFDB1D" theme="dark" title="승차 예약 확인" />
    <main>
      <article class="information">
        <h3>승차 정류장</h3>
        <h1>왕십리역 6-1번출구</h1>
      </article>
      <article class="information">
        <h3>승차 버스</h3>
        <h1>501 새싹행</h1>
      </article>
      <article class="remain">5 정거장 전</article>
      <button class="help-button">승차 도움 요청</button>
      <button class="book-button">예약 취소/변경</button>
    </main>
  </div>
</template>

<script>
  import NavCompVue from '@/components/NavComp.vue';
  import {ref} from 'vue';

  export default {
    components: {
      NavCompVue,
    },
    setup() {
      // 버스 도착 여부
      const isBusArrive = ref(false);
      return {
        isBusArrive,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .riding-view {
    color: $white;
    height: 100vh;
    display: flex;
    flex-direction: column;
    main {
      flex-grow: 1;
      padding: 1rem;
      display: grid;
      grid-template: 21fr 21fr 16fr 21fr 21fr / 1fr;
      & > * {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        // background: skyblue;
      }
      .information {
        border-bottom: 1px solid $gray;
        h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        h1 {
          font-size: 2rem;
          color: $secondary;
          font-weight: bold;
        }
      }
      .remain {
        font-size: 1.5rem;
        font-weight: bold;
      }
      button {
        border-radius: 1rem;
        background: transparent;
        font-size: 2rem;
        font-weight: bold;
        transition: 0.1s;
        &:active {
          transform: scale(0.98);
        }
        &.help-button {
          margin-bottom: 0.5rem;
          border: 5px solid $red;
          color: $red;
          &:hover {
            background: $red;
            color: $white;
          }
        }
        &.book-button {
          margin-top: 0.5rem;
          background: $secondary;
        }
      }
    }
  }
</style>
