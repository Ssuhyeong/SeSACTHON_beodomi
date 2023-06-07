<template>
  <div class="switches-container">
    <input type="radio" id="switchMonthly" name="switchPlan" value="Monthly" checked="checked" />
    <input type="radio" id="switchYearly" name="switchPlan" value="Yearly" />
    <label for="switchMonthly" @click="voice()">음성</label>
    <label for="switchYearly" @click="keyboard()">키보드</label>
    <div class="switch-wrapper">
      <div class="switch">
        <div>음성</div>
        <div>키보드</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ToggleComp',
    methods: {
      voice() {
        this.$emit('getSearchType', 'voice');
      },
      keyboard() {
        this.$emit('getSearchType', 'keyboard');
      },
    },
  };
</script>

<style lang="scss" scoped>
  p {
    margin-top: 2rem;
    font-size: 0.75rem;
    text-align: center;
  }

  .switches-container {
    width: 16rem;
    position: relative;
    display: flex;
    padding: 0;
    position: relative;
    background: #f0f0f0;
    line-height: 3rem;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
  }

  .switches-container input {
    visibility: hidden;
    position: absolute;
    top: 0;
  }

  /* labels for the input (radio) boxes - something to click on */
  .switches-container label {
    width: 50%;
    padding: 0;
    margin: 0;
    text-align: center;
    cursor: pointer;
    color: white;
  }

  /* switch highlighters wrapper (sliding left / right)
      - need wrapper to enable the even margins around the highlight box
  */
  .switch-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 4px;
    width: 47%;
    padding: 0.15rem;
    z-index: 3;
    transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
    /* transition: transform 1s; */
  }

  /* switch box highlighter */
  .switch {
    border-radius: 10px;
    background: #152827;
    height: 100%;
  }

  /* switch box labels
      - default setup
      - toggle afterwards based on radio:checked status
  */
  .switch div {
    width: 100%;
    text-align: center;
    opacity: 0;
    display: block;
    color: #ffdb1d;
    transition: opacity 0.2s cubic-bezier(0.77, 0, 0.175, 1) 0.125s;
    will-change: opacity;
    position: absolute;
    top: 0;
    left: 0;
  }

  /* slide the switch box from right to left */
  .switches-container input:nth-of-type(1):checked ~ .switch-wrapper {
    transform: translateX(0%);
  }

  /* slide the switch box from left to right */
  .switches-container input:nth-of-type(2):checked ~ .switch-wrapper {
    transform: translateX(100%);
  }

  /* toggle the switch box labels - first checkbox:checked - show first switch div */
  .switches-container input:nth-of-type(1):checked ~ .switch-wrapper .switch div:nth-of-type(1) {
    opacity: 1;
  }

  /* toggle the switch box labels - second checkbox:checked - show second switch div */
  .switches-container input:nth-of-type(2):checked ~ .switch-wrapper .switch div:nth-of-type(2) {
    opacity: 1;
  }
</style>
