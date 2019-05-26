<template>
  <div class="dietEva">
    <div class="diet flexColBetweenRowStretch">
      <div class="main flexColBetweenRowStretch">
        <div class="header flexColCenterRowCenter">
          <h1>你日常吃的主食有哪些?(多选)</h1>
          <p>我们会根据你的饮食习惯调整营养处方</p>
        </div>

          <div class="mainFood">
            <checkbox-group @change="checkboxChange" class="mainFoodBox flexRowBetweenColCenter">
              <label class="checkbox flexRowAroundColCenter" v-for="item in mainFood" :key="item.name">
                <span>{{item.value}}</span>
<!--                <img :src="item.imgSrc">-->
                <checkbox :value="item .name" :checked="item.checked" />
              </label>
            </checkbox-group>
          </div>

      </div>
      <div class="button" @click="test">
        <next-button :text="'下一步'"
                     :Opacity="showBtnOpacity ? 0.5:1"
                     @clickBtn="nextStep"
        >
        </next-button>
      </div>

    </div>

  </div>
</template>

<script>
  import NextButton from '@/components/NextButton/NextButton.vue'
  import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'

  export default {
    components: {
      'next-button':NextButton
    },
    data () {
      return {
        showBtnOpacity:true,
        mainFood:[
          {name: 'rice', value: '米饭',imgSrc:'../../../static/images/ic_normal.png',checked: false},
          {name: '1', value: '面条',imgSrc:'../../../static/images/ic_bad.png',checked: false},
          {name: '2', value: '包子',imgSrc:'../../../static/images/ic_normal.png',checked: false},
          {name: '3', value: '饺子',imgSrc:'../../../static/images/ic_normal.png',checked: false},
          {name: '4', value: '糌粑',imgSrc:'../../../static/images/ic_normal.png',checked: false},
          {name: '5', value: '稀饭',imgSrc:'../../../static/images/ic_normal.png',checked: false},
        ],
        // selectMainFood:[],
        nextPath:"/pages/secondTip/main"
      }
    },
    onLoad(option){
      console.log(option)
    },
    created() {

    },
    methods:{
      ...mapActions({
        // getDiseaseTypeAsync:'disease/getDiseaseTypeAsync'
      }),

      nextStep(){


      },
      checkboxChange(e) {
        //console.log( e.target.value)//选择的数组
          // this.selectMainFood=e.target.value
        this.selectedArr= e.target.value
        console.log(this.selectedArr)
        for(var cell of this.mainFood){
          cell.checked = false
        }
        for(var item of this.selectedArr){
          for(var cell of this.mainFood){
            if(item == cell.name){
              cell.checked = true
              continue
            }
          }
        }
        if(this.selectedArr.length>0){
            this.showBtnOpacity=false
        }else{
          this.showBtnOpacity=true
        }
      }
    }

  }
</script>

<style scoped lang="scss">
  .diet{
    position:fixed;
    height: 100%;
    width: 100%;
    border-top: 2rpx solid #EBEBEB;
  }
  .main{
    flex: 1;
    margin:0 20rpx 160rpx 20rpx;
    font-size:36rpx;
    overflow-y: auto;
    .header{
      height: 200rpx;
      text-align: center;
      h1{
        font-size:40rpx;
        font-weight:600;
        color: #333;
      }
      p{
        font-size:30rpx;
        color:#999;
        margin-top:20rpx;
      }
    }
    .typeWrap{
      flex:1;
      font-size:30rpx;
      color:#999;
      text-align: center ;
      overflow-y: auto;
    }
    .mainFoodBox{
      flex-wrap: wrap;
      .checkbox{
        display: inline-block;
        width: 320rpx;
        height: 160rpx;
        background-color: #F5F6FA;
        border-radius:20rpx;
        margin:15rpx;
        position: relative;
        display: flex;
        justify-content: space-between;
        img{
          position: absolute;
          right: 0;
          top: 0;
          width:212rpx;
          height: 160rpx;
        }
        span{
          margin-left: 20rpx;
        }
        checkbox{
          transform: scale(0.7);

        }
      }
    }


  }
  .button{
    margin-top: 80rpx;
    height: 100rpx;
    margin-bottom: 40rpx;
  }

</style>
