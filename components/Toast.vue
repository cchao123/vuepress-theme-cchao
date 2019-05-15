<template>
  <div class="toast" v-show="flag">{{ msg }}</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      msg: ''
    };
  },
  methods: {
    show(msg) {
      this.msg = msg;
      if (!this.flag) {
        this.flag = true
      } else {
        return
      }
      setTimeout(() => {
        this.flag = false;
      }, 2000);
    }
  }
};
</script>

<style lang="stylus">
@import './../styles/config.styl';

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
  opacity: 0;
}

.toast {
  padding: 18px 12px;
  min-width: 196px;
  position: fixed;
  top: 40%;
  left: 50%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  color: #fff;
  max-width: 70%;
  font-size: 14px;
  line-height: 20px;
  border-radius: 4px;
  word-break: break-all;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  box-sizing: content-box;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  background-color: rgba(50, 50, 51, 0.88);
  width: -webkit-fit-content;
  width: fit-content;
  white-space: pre-wrap;

  @media (max-width: $MQMobile) {
    top: 50%;
    padding: 8px 12px;
    min-width: 96px;
  }
}
</style>
