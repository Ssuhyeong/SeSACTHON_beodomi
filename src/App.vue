<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
  body {
    background: $primary;
  }

  @import url('https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css');
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;

    html {
      height: 100vh;
    }
  }

  @font-face {
    font-family: 'KoddiUDOnGothic-Regular';
    src: url('../src/assets/font/KoddiUDOnGothic-Regular.woff');
  }

  @font-face {
    font-family: 'KoddiUDOnGothic-Bold';
    src: url('../src/assets/font/KoddiUDOnGothic-Bold.woff');
  }

  @font-face {
    font-family: 'KoddiUDOnGothic-ExtraBold';
    src: url('../src/assets/font/KoddiUDOnGothic-ExtraBold.woff');
  }

  * {
    text-align: center;
  }

  html {
    height: 100vh;
  }

  #app {
    font-family: 'KoddiUDOnGothic-Regular';
  }
</style>
