<template>
  <div class="mptoast" :class="{show:show}">
    <div class="content">{{text}}</div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: "mptoast",
    data() {
      return {
        show:false,
        text:" "
      }
    },
    components: {
    },
    computed: {
    },
    mounted(){
      var that = this
      Vue.prototype.$toast = (obj) => {
        that.show = true
        that.text = obj.text || ""
        setTimeout(() => {
          that.show = false
        },obj.duration || 3000)
      }
    },
    created() {
    }
  }
</script>

<style scoped lang="scss">
  .mptoast{
    opacity: 0;
    width: auto;
    @include transition("opacity");
    line-height: 34rpx;
    position: fixed;
    z-index: 9999;
    top: -1000rpx;
    left: -1000rpx;
    -webkit-transition: opacity .3s;
    transition: opacity .3s;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    overflow: hidden;
    border-radius: 12rpx;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 30rpx;
    .content{
      font-size: 28rpx;
      color: white;
      line-height: 1.3;
    }
    &.show{
      opacity: 1;
      top: 50%;
      left: 50%;
    }
  }

</style>
