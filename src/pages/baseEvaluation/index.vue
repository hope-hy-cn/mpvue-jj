<template>
  <div class="baseEvaluation">
    <div class="main">
      <div class="item first">
        <div class="question"> 1.近期（1-3个月）体重是否下降？</div>
        <div class="radioBox">
          <radio-group class="radio-group" @change="radioChangeWeight">
            <label class="answerBox flexRowStartColCenter" >
              <radio value=0  class="radioBtn flexItem000" color="#00D0AA" />
                <div class="answer">是</div>
            </label>
            <label class="answerBox flexRowStartColCenter" >
              <radio value=1  class="radioBtn flexItem000" color="#00D0AA"/>
                <div class="answer">否</div>
            </label>
          </radio-group>
          <div class="moreQ" v-if="isShowWeight">
            <div class="weight">体重下降了多少？(kg)</div>
            <input type="digit"  maxlength="2" v-model="baseEvaluation.loseWeight">
          </div>
        </div>
      </div>
      <div class="item second">
        <div class="question"> 2.一个月内进食量是否减少？</div>
        <div class="radioBox">
          <radio-group class="radio-group" @change="radioChangeIsDietLose">
            <label class="answerBox flexRowStartColCenter" >
              <radio value=0  class="radioBtn flexItem000" color="#00D0AA"/>
              <div class="answer">是</div>
            </label>
            <label class="answerBox flexRowStartColCenter" >
              <radio value=1  class="radioBtn flexItem000" color="#00D0AA"/>
              <div class="answer">否</div>
            </label>
          </radio-group>
        </div>
        <div class="moreQ" v-if="isShowDiet">
          <div class="weight">食量下降了多少？</div>
          <radio-group class="radio-group" @change="radioChange($event,'loseEat')">
            <label class="answerBox flexRowStartColCenter" >
              <radio value=0  class="radioBtn flexItem000" color="#00D0AA"/>
              <div class="answer">25%-50%</div>
            </label>
            <label class="answerBox flexRowStartColCenter" >
              <radio value=1  class="radioBtn flexItem000" color="#00D0AA"/>
              <div class="answer">51%-75%</div>
            </label>
            <label class="answerBox flexRowStartColCenter" >
              <radio value=2  class="radioBtn flexItem000" color="#00D0AA"/>
              <div class="answer">76%-100%</div>
            </label>
          </radio-group>
        </div>

      </div>
      <div class="item third">
        <div class="question"> 3.过去3个月，我的日常活动量为</div>
        <div class="radioBox">
          <radio-group class="radio-group" @change="radioChange($event,'activity')">
            <label class="answerBox flexRowStartColCenter" >
              <radio value=0  class="radioBtn flexItem000" color="#00D0AA" />
              <div class="answer">卧床或坐轮椅</div>
            </label>
            <label class="answerBox flexRowStartColCenter" >
              <radio value=1  class="radioBtn flexItem000" color="#00D0AA"/>
              <div class="answer">能下地但不出门活动</div>
            </label>
            <label class="answerBox flexRowStartColCenter" >
              <radio value=2  class="radioBtn flexItem000" color="#00D0AA"/>
              <div class="answer">能出门活动</div>
            </label>
          </radio-group>
        </div>
      </div>
      <div class="item fourth">
        <div class="question"> 4.过去3个月，有没有受过心理创伤？</div>
        <div class="radioBox">
          <radio-group class="radio-group" @change="radioChange($event,'psychic')">
            <label class="answerBox flexRowStartColCenter" >
              <radio value=0  class="radioBtn flexItem000" color="#00D0AA" />
              <div class="answer">有</div>
            </label>
            <label class="answerBox flexRowStartColCenter" >
              <radio value=1  class="radioBtn flexItem000" color="#00D0AA"/>
              <div class="answer">没有</div>
            </label>
          </radio-group>
        </div>
      </div>
      <div class="item fifth">
        <div class="question"> 5.是否存在这些精神问题</div>
        <div class="radioBox">
          <radio-group class="radio-group" @change="radioChange($event,'mental')">
            <label class="answerBox flexRowStartColCenter" >
              <radio value=0  class="radioBtn flexItem000" color="#00D0AA" />
              <div class="answer">没有心理问题</div>
            </label>
            <label class="answerBox flexRowStartColCenter" >
              <radio value=1  class="radioBtn flexItem000" color="#00D0AA"/>
              <div class="answer">轻度痴呆</div>
            </label>
            <label class="answerBox flexRowStartColCenter" >
              <radio value=2  class="radioBtn flexItem000" color="#00D0AA"/>
              <div class="answer">严重痴呆或抑郁</div>
            </label>
          </radio-group>
        </div>
      </div>

    </div>
    <div class="button">
      <next-button :text="'提交问卷'"
                   @clickBtn="clickButton"
      >
      </next-button>
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
      isShowWeight:false,
      isShowDiet:false,
      nextPath:"/pages/thirdTip/main",
      baseEvaluation:{
        isLoseWeight:null,
        loseWeight:null,
        isLoseEat:null,
        loseEat:null,
        activityLevel:null,
        hasPsychicTrauma:null,
        hasMentalProblem:null,
      },
    }
  },

  created() {

  },
  computed:{
    ...mapState({
      selectedDiseases:state => state.userInfo.selectedDiseases
    })
  },
  methods:{
    ...mapActions({
      putBaseEvaluation:"evaluation/putBaseEvaluation"
    }),
    clickButton(){
      let diseases=[]
      diseases.push(this.selectedDiseases)
      //合并疾病类型和问卷答案
      this.baseEvaluation.diseases=diseases

      //判断是否做完
      let selectedArr=[]
      for( var item in this.baseEvaluation){
        if(item == 'loseWeight' && this.isShowWeight == false) continue
        else if(item == "loseEat" && this.isShowDiet == false) continue
        else selectedArr.push(this.baseEvaluation[item])
      }
     let ifDoAll=selectedArr.every((item)=>{
        return item!==null
      })

      if(ifDoAll){
        this.putBaseEvaluation({
          data:{
            isLoseWeight:this.baseEvaluation.isLoseWeight,
            loseWeight:this.baseEvaluation.loseWeight,
            isLoseEat: this.baseEvaluation.isLoseEat,
            loseEat: this.baseEvaluation.loseEat,
            activityLevel:this.baseEvaluation.activityLevel,
            hasPsychicTrauma:this.baseEvaluation.hasPsychicTrauma,
            hasMentalProblem: this.baseEvaluation.hasMentalProblem,
            diseases:this.baseEvaluation.diseases
          }
        }).then((res)=>{
          if(res.success==true){
            wx.navigateTo({
              url:this.nextPath
            })
          }else {
            wx.showToast({
              title: '上传失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }else{
        wx.showToast({
          title: '请填写完后再提交',
          icon: 'none',
          duration: 2000
        })
      }

    },
    radioChangeWeight(e){
      let select
      select=parseInt(e.target.value)
      this.baseEvaluation.isLoseWeight=select
      if(select == 0){
        this.isShowWeight=true
      }else {
        this.isShowWeight=false
      }
    },
    radioChangeIsDietLose(e){
      let select
      select=parseInt(e.target.value)
      this.baseEvaluation.isLoseEat=select
      if(select == 0){
        this.isShowDiet=true
      }else {
        this.isShowDiet=false
      }
    },
    radioChange(e,type){
      switch (type){
        case "loseEat":
          this.baseEvaluation.loseEat=parseInt(e.target.value);
          break
        case "activity":
          this.baseEvaluation.activityLevel=parseInt(e.target.value)
          break
        case "psychic":
          this.baseEvaluation.hasPsychicTrauma=parseInt(e.target.value)
          break
        case "mental":
          this.baseEvaluation.hasMentalProblem=parseInt(e.target.value)
          break
      }
    }
  }

}
</script>

<style scoped lang="scss">
.baseEvaluation{
  width: 100%;
  border-top: 2rpx solid #EBEBEB;
  background-color: #f6f6f6;
  .main{
    .item{
      padding:40rpx 26rpx 30rpx 26rpx;
      background-color: white;
      color: #666;
      margin-bottom: 22rpx;
      .question{
        color: #333;
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 20rpx;
      }
      .answerBox{
        padding: 10rpx 0;
        .radioBtn{
          transform: scale(0.8);
          margin-right: 16rpx;
        }
        .answer{
          font-size: 36rpx;
          color: #666;
        }
      }
      .moreQ{
        margin-top: 40rpx;
        .weight{
          font-size: 36rpx;
          color: #666;
          padding-top: 30rpx;
          margin-bottom: 30rpx;
          border-top:2rpx solid #EBEBEB;
          font-weight: bold;
        }
        input{
          width: 685rpx;
          height: 90rpx;
          border:2rpx solid #EBEBEB;
          padding-left: 10rpx;
        }
      }
    }
    .second .moreQ{
      .weight{
        padding-top:30rpx;
        padding-bottom: 0;
      }
    }
    .fifth {
      margin-bottom: 0;
    }

  }
  .button{
    margin-bottom:40rpx;
    margin-top: 40rpx;
  }
}

</style>
