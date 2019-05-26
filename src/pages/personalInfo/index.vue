<template>
  <div class="personal flexColAroundRowStretch">
   <div class="personalInfo">
     <div class="birth flexRowBetweenColCenter">
       <lable>生日</lable>
       <view class="section">
         <picker
           mode="date"
           :value="userInfo.brithday"
           start="1920-01-01"
           end="endDate"
           @change="bindDateChange"
         >
           <view class="picker">
              <span v-show="isShowSelectDate">请选择 <img class="icon" src="../../../static/images/ic_more.png"></span>{{userInfo.brithday}}
           </view>
         </picker>
       </view>
     </div>

     <div class="height flexRowBetweenColCenter">
       <lable>身高</lable>
       <input type="digit" placeholder="请输入" v-model="userInfo.height" :value="originalUserInfo.height">
     </div>
     <div class="weight flexRowBetweenColCenter">
       <lable>体重</lable>
       <input type="digit"placeholder="请输入" v-model="userInfo.weight">
     </div>
     <div class="admissionNumber flexRowBetweenColCenter">
       <lable>性别</lable>
       <view class="section">
         <picker @change="bindSexChange" :value="sexIndex" :range="sexArray">
           <view class="picker">
             <span v-show="isShowSelectSex">请选择<img class="icon" src="../../../static/images/ic_more.png"> </span>{{sexArray[sexIndex]}}
           </view>
         </picker>
       </view>
     </div>
   </div>

    <div class="button">
      <next-button :text="'下一步'"
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
      endDate:'',
      isShowSelectDate:true,
      isShowSelectSex:true,
      sexArray:['男','女'],
      sexIndex:-1,
      userInfo:{
        brithday:"",
        height:"",
        weight:"",
        sex:""
      },
      originalUserInfo:{},
      baseUserInfo:{},
      nextPath:'/pages/diseaseType/main',
    }
  },
  onload(){
      this.endDate= new Date()
      this.clickButton()
  },
  created() {
  },
  computed:{
  ...mapState({
      hospitalInfoBlank: state => state.userInfo.hospitalInfoBlank,
    })
  },
  methods:{
    ...mapActions({
      putUserInfo:"userInfo/putUserInfoAsync"
    }),
    clickButton(){
      // console.log("store里的"+this.hospitalInfoBlank)
      this.baseUserInfo=Object.assign(this.hospitalInfoBlank,this.userInfo)//医院信息和个人信息
      // this.originalUserInfo=JSON.parse(JSON.stringify(this.userInfo)) //保存填写信息

      // console.log(this.baseUserInfo)
      this.putUserInfo({
        data:{
          hospitalId:this.baseUserInfo.hospitalId,
          departmentId:this.baseUserInfo.departmentId,
          bedNumber:this.baseUserInfo.bedNumber,
          userName:this.baseUserInfo.userName,
          admissionNumber:this.baseUserInfo.admissionNumber,
          birthday:this.baseUserInfo.birthday,
          height:this.baseUserInfo.height,
          weight:this.baseUserInfo.weight,
          sex:this.baseUserInfo.sex
        }
      }).then((res)=>{
        console.log(res)
          if(res.success==true){
            wx.navigateTo({
              url:this.nextPath
            })
          }else{
            wx.showToast({
              title: "请重新填写信息",
              icon: "none",
              duration: 2000
            })
          }
      })

    },
    bindDateChange(e) {
      // console.log('picker发送选择改变，携带值为', e.target.value)
      this.userInfo.brithday = e.target.value
      this.isShowSelectDate = false
    },
    bindSexChange(e){
      this. sexIndex= e.target.value
      this.userInfo.sex=this.sexArray[this. sexIndex]
      this.isShowSelectSex = false
    }
  }

}
</script>

<style scoped lang="scss">
.personal{
  position:fixed;
  height: 100%;
  width: 100%;
  border-top: 2rpx solid #EBEBEB;
}
.personalInfo{
  flex:1;
  margin:0 20rpx -40rpx 20rpx;
  .picker{
    height: 100%;
    span{
      font-size: 36rpx;
      color: #999;
      padding-right: 30rpx;
    }
    .icon{
      position:absolute;
      top:0rpx;
      right: 15rpx;
      height: 32rpx;
      width:26rpx;
    }
  }
  div{
    width:100%;
    height: 100rpx;
    margin:20rpx auto;
    border-bottom: 2rpx solid #EBEBEB;
    position: relative;
lable{
  padding-left:20rpx;
  font-size: 36rpx;
  color: #333;
  font-weight:600;
  width: 200rpx;
}
    .section{
      position: absolute;
      width: 100%;
      text-align: right;
      padding-right: 20rpx;
      font-size: 36rpx;
      color: #333333;
    }
    input{
      border:none;
      text-align: right;
      color: #999;
      font-size: 36rpx;
    }
  }
}
  .button{
    margin-bottom:40rpx;
  }

</style>
