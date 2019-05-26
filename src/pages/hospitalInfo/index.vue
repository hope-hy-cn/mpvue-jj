<template>
  <div class="hospital flexColAroundRowStretch">
   <div class="hospitalInfo">
     <div class="hospitalName flexRowBetweenColCenter">
       <lable>医院</lable>
       <view class="section">
         <picker @change="bindHospitalChange" :value="hospitalIndex" :range="hospitalList"  :range-key="'hospitalName'">
           <view class="picker">
             <span v-show="isSelectHospital">请选择<img class="icon" src="../../../static/images/ic_more.png"> </span>
             {{hospitalList[hospitalIndex]}}
           </view>
         </picker>
       </view>
     </div>
     <div class="department flexRowBetweenColCenter">
       <lable>科室</lable>
       <view class="section">
         <picker @change="bindDepartmentChange" :value="departmentIndex" :range="departmentArray">
           <view class="picker">
             <span v-show="isSelectPart" @click="choosePart">请选择<img class="icon"src="../../../static/images/ic_more.png"/> </span>
             {{departmentArray[departmentIndex]}}
           </view>
         </picker>
       </view>
     </div>
     <div class="bedNumber flexRowBetweenColCenter">
       <lable>床号</lable>
       <input type="text" placeholder="请输入"  v-model="userInfo.bedNumber">
     </div>
     <div class="userName flexRowBetweenColCenter" >
       <lable>姓名</lable>
       <input type="text"placeholder="请输入" v-model="userInfo.userName" >
     </div>
     <div class="admissionNumber flexRowBetweenColCenter">
       <lable>住院号</lable>
       <input type="text" placeholder="请输入"  v-model="userInfo.admissionNumber">
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
      // hospitalArray: ['华西医院', '成办医院', '重庆二人医', '人民医院'],
      hospitalArray: [],
      hospitalList:[],
      // departmentArray:['心内科', '泌尿科', '骨科', '眼科'],
      departmentArray:[],
      isSelectHospital:true,
      isSelectPart:true,
      hospitalIndex:-1,
      departmentIndex:-1,
      userInfo:{
        hospital: "",
        hospitalId:"",
        department: "",
        departmentId:"",
        bedNumber: "",
        userName: "",
        admissionNumber: "",
      },
      resData:[],
      nextPath:'/pages/firstTip/main'
    }
  },

  onLoad() {
    this.$nextTick(()=>{
      this.setHospitalData()
    })
  },

  created(){

  },

  computed:{
    ...mapGetters({
      hospitalInfo:'userInfo/hospitalInfo'
    })
  },
  methods:{
    ...mapActions({
      getHospitalInfoAsync:'userInfo/getHospitalInfoAsync'
    }),
    setHospitalData(){
      this.getHospitalInfoAsync(
        {
          data: {
            id: "",
          }
        })
        .then(res=>{
          // console.log(res)
          this.$nextTick(()=>{
            this.resData=res.data
            console.log(this.resData.hospitalList)
            //获取医院
            this.resData.hospitalList.map((item)=>{
              this.hospitalArray.push(item)

            })
            this.hospitalList=res.data.hospitalList
          })
        })
    },
    clickButton(){
    console.log(this.userInfo)
      this.$store.commit("userInfo/hospitalInfoBlank",this.userInfo)
      wx.navigateTo({
        url:this.nextPath
      })
    },
    bindHospitalChange(e) {
    //  console.log('picker发送选择改变，携带值为', e.target.value)
      this. hospitalIndex= e.target.value
      this.userInfo.hospital=this.hospitalList[this. hospitalIndex].hospitalName
      this.userInfo.hospitalId=this.hospitalList[this. hospitalIndex].hospitalId

      this.isSelectHospital=false
      console.log(this.userInfo.hospital)
      // console.log(this.resData)
      //获取医院对应科室
      this.departmentArray=[]
     let chooseHospital= this.resData.hospitalList.filter((item)=>{
       return  item.hospitalName == this.userInfo.hospital
      })
      // console.log(chooseHospital[0])
      let departmentArrays=chooseHospital[0].departmentList
      departmentArrays.map((item)=>{
        this.departmentArray.push((item.departmentName))
      })
      // console.log(this.departmentArray)
    },
    bindDepartmentChange(e) {
        this. departmentIndex= e.target.value
        this.userInfo.department=this.departmentArray[this. departmentIndex]
        this.isSelectPart=false
    },
    choosePart(){
      if(this.departmentArray.length==0){
        wx.showToast({
          title: '请先选择医院',
          icon: 'none',
          duration: 2000,
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.hospital{
  position:fixed;
  height: 100%;
  width: 100%;
  border-top: 2rpx solid #EBEBEB;
}
.hospitalInfo{
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
      /*font-size: 50rpx;*/
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
  width:150rpx;
  }
    .section{
      position: absolute;
      width:100%;
      text-align: right;
      padding-right: 20rpx;
      font-size: 36rpx;
      color: #333333;
    }
    input{
      /*position: absolute;*/
      /*left:0;top:0;*/
      width:100%;
      border:none;
      text-align: right;
      padding-right: 20rpx;
      /*color: #333;*/
      font-size: 36rpx;
    }
  }
}
  .button{
    margin-bottom:40rpx;
  }

</style>
