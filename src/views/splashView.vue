<template>
  <div class="splash">
    <SplashComp :isLoading="isLoading" />

    <div v-if="!isLoading" class="container">
      <img src="@/assets/img/beodomiText.png" alt="버도미" width="120" />

      <button class="passenger" @click="passenger">승객</button>
      <button class="driver" @click="driver">버스 기사</button>
    </div>
  </div>
</template>

<script>
  import SplashComp from '@/components/SplashComp.vue';
  import {onMounted, ref} from 'vue';
  import {useRouter} from 'vue-router';

  export default {
    name: 'splashView',
    components: {
      SplashComp,
    },
    setup() {
      const router = useRouter();
      const isLoading = ref(true);

      onMounted(() => {
        setTimeout(() => {
          isLoading.value = false;
        }, 1000);
      });

      // 승객 버튼 클릭 이벤트
      const passenger = () => {
        router.push('/main');
      };

      // 버스기사 버튼 클릭 이벤트
      const driver = () => {
        router.push('/driver/code');
      };

      return {
        isLoading,
        passenger,
        driver,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    /* Firefox */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    /* Safari and Chrome */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    /* Opera */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .container {
    position: absolute;
    top: 0;
    width: calc(100vw - 32px);
    color: $secondary;
    animation: fadein 4s;
    -moz-animation: fadein 4s; /* Firefox */
    -webkit-animation: fadein 4s; /* Safari and Chrome */
    -o-animation: fadein 4s; /* Opera */

    align-items: center;
    padding: 0px 16px;
    margin-top: auto;
    margin-bottom: auto;

    img {
      margin-top: 112px;
      margin-bottom: 112px;
    }

    .passenger {
      margin-bottom: 32px;
    }

    button {
      text-align: center;
      height: 140px;
      padding: 59px 0px;
      background-color: $secondary;
      border-radius: 20px;
      color: black;
      font-weight: 700;
      font-size: 36px;
      line-height: 22px;
      width: 100%;
    }
  }
</style>
