<template>
  <div :class="{loader: true, fadeout: !isLoading, display: true}">
    <img src="@/assets/img/beodomiLogo.png" alt="버도미 아이콘" width="103" height="100" />
    <img src="@/assets/img/beodomiText.png" alt="버도미 아이콘" width="205" />

    <img src="@/assets/img/beodomiBraille.png" alt="버도미 점자 표시" width="211" />
  </div>
</template>

<script>
  export default {
    name: 'SplashComp',
    props: ['isLoading'],
  };
</script>

<style lang="scss" scoped>
  .display {
    display: flex;
    flex-direction: column;
    /* background-color: red; */
    height: 35vh;
    justify-content: space-between;
    align-items: center;
    margin-top: 50%;
  }

  .loader {
    color: $secondary;
  }

  .fadeout {
    animation: fadeout 1s forwards;
  }

  @keyframes fadeout {
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
</style>
