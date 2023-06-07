<template>
  <section>
    <div class="voice" @click="test()">
      <img src="@/assets/img/voiceBtn.png" alt="역에서 탑승가능한 버스를 보는 버튼" width="16" />
    </div>
    <div class="circle1" :class="{ani: flag}"></div>
    <div class="circle2" :class="{ani: flag}"></div>
  </section>
</template>

<script>
  export default {
    name: 'VoiceComp',
    components: {},
    data() {
      return {
        flag: false,
      };
    },
    methods: {
      test() {
        this.flag = !this.flag;
      },
    },
  };
</script>

<style lang="scss" scoped>
  section {
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .voice {
    z-index: 2;
    background: linear-gradient(to bottom, #464646 5%, #082220 100%);
    animation: phone 1s cubic-bezier(0.12, 0.7, 0.74, 0.71) infinite alternate-reverse;
    display: grid;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 10px 14px -7px #777777;
    cursor: pointer;
  }

  div {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: #d9d9d9;
    position: absolute;
  }

  p {
    font-size: 0.1px;
  }

  .ani {
    animation: scaling 2s cubic-bezier(0.12, 0.7, 0.74, 0.71) infinite;
  }

  @keyframes scaling {
    0% {
      transform: scale(4);
      background-color: #e5e5e5;
    }
    100% {
      transform: scale(7);
      background-color: rgba(245, 0, 182, 0);
    }
  }

  @keyframes phone {
    0% {
      transform: scale(4);
    }
    100% {
      transform: scale(4.5);
    }
  }
  .circle1 {
    animation-delay: 0s;
  }
  .circle2 {
    animation-delay: 1s;
  }
</style>
