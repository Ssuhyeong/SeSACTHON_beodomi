<template>
  <div class="keyboard-search">
    <input
      class="search-input"
      @input="onChange"
      type="text"
      placeholder="검색어를 입력하세요"
    />
    <div class="search-result"><span>(검색 결과)</span></div>
  </div>
</template>

<script>
  export default {
    name: 'KeyboardSearchView',
    setup() {
      // 키보드 검색어 input 이벤트
      const onChange = e => {
        console.log(e.target.value);
      };

      return {
        onChange,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .keyboard-search {
    padding-top: 100px;
    .search-input {
      height: 98px;
      width: calc(100vw - 32px);
      border-radius: 10px;
      background-color: $lightGray;
      border: none;
      font-weight: 700;
      font-size: 28px;
      line-height: 34.16px;
      margin-bottom: 31px;
    }

    .search-result {
      background-color: $lightGray;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
      text-align: center;
    }
  }
</style>
