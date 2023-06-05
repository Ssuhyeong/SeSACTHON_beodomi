<template>
  <section>
    <div class='phone'>
      <p>voice</p>
    </div>
    <div class="circle1"></div>
    <div class="circle2"></div>
  </section>
</template>

<script>
export default {
  name: 'VoiceComp',
  components: {
    
  }
}
</script>

<style lang="scss" scoped>

section {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.phone {
  z-index: 2;
  background-color: #D9D9D9;
  animation: phone 1s cubic-bezier(0.12, 0.7, 0.74, 0.71) infinite alternate-reverse;
  display: grid;
  justify-content: center;
  align-items: center;
  border: 0.5px white solid;
}

div {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #D9D9D9;
  position: absolute;
  animation: scaling 2s cubic-bezier(0.12, 0.7, 0.74, 0.71) infinite;
}

p{
  font-size: 0.1px;
}

@keyframes scaling {
  0% {
    transform: scale(4);
    background-color: #E5E5E5;
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
