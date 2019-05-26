<template>
  <div class="dietEva">

     <Ruler :options="rulerOptions"
     ></Ruler>

  </div>
</template>

<script>
  import Ruler from '@/components/Ruler/Ruler.vue'
  import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'

  export default {
    components: {
      'Ruler':Ruler
    },
    data () {
      return {
        rulerOptions:{
          id:'dietRuler',
          canvasWidth:100,
          canvasHeight:200,
        }
      }
    },
    onLoad(option){
      console.log(option)
    },
    created() {

    },
    methods:{


      nextStep(){


      },

    }

  }
</script>

<style scoped lang="scss">
  .dietEva{
    position:fixed;
    height: 100%;
    width: 100%;
    border-top: 2rpx solid #EBEBEB;
  }

  .button{
    margin-top: 80rpx;
    height: 100rpx;
    margin-bottom: 40rpx;
  }

</style>
