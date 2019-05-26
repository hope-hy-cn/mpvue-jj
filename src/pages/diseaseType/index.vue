<template>
  <div class="disease flexColBetweenRowStretch">
    <div class="main flexColBetweenRowStretch">
        <div class="header flexColCenterRowCenter">
          <h1>请选择你的疾病类型（多选）</h1>
          <p>我们会根据你的疾病类型精准推荐</p>
        </div>
      <div class="typeWrap" :class="{showMore:showMore}">
        <ul class="type">
          <li
             v-for="(type,index) in diseaseTypes" :key="type.diseaseId"
            @click="selectDisease(index)" :class="{chooseLi:type.selected==true}">
            {{type.diseaseName}}
          </li>
        </ul>
        <div class="more" @click="show" v-show="showIcon">
          <p >其他疾病</p>
          <img src="/static/images/arrow_down.png">
        </div>
      </div>

    </div>
    <div class="button" @click="test">
      <next-button :text="'下一步'"
                   @clickBtn="nextPage"
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
      diseaseTypes:[],
      selectedDiseases:[],
      showIcon:false,
      showMore:false,
      nextPath:"/pages/secondTip/main"
    }
  },
  onLoad(option){
      this.getDiseaseTypes()
    // console.log(option.query)
  },
  created() {

  },
  methods:{
    ...mapActions({
      getDiseaseTypeAsync:'disease/getDiseaseTypeAsync'
    }),
    getDiseaseTypes(){
      this.getDiseaseTypeAsync(
        {
          data: {
            id: "",
          }
        })
        .then(res=>{
            // console.log(res.data)
            this.$nextTick(()=>{
              let disease
              disease=res.data.diseaseList
              //增加selected属性
              disease.map((item,index)=>{
                this.diseaseTypes.push(
                  Object.assign({},item,{selected:false})
                )
              })
              this.showIcon=true
            })
    })
    },
    nextPage(){
      //选中的疾病（对象）
      this.selectedDiseases= this.diseaseTypes.filter((item)=>{
        return item.selected==true
      })
      // console.log(this.selectedDiseases)
      if(this.selectedDiseases.length==0){
        wx.showToast({
          title: '请选择疾病',
          icon: 'none',
          duration: 2000
        })

      }else {
        this.$store.commit('userInfo/selectedDiseases',this.selectedDiseases)
        wx.navigateTo({
          url:this.nextPath
        })
      }
    },
    selectDisease(index){
     for(let i=0;i<this.diseaseTypes.length;i++){
       if(i==index){
         this.diseaseTypes[i].selected=!this.diseaseTypes[i].selected
       }
     }
     // console.log(this.diseaseTypes)
    },
    show(){
      this.showMore=true
    }
  }

}
</script>

<style scoped lang="scss">
.disease{
  position:fixed;
  height: 100%;
  width: 100%;
  border-top: 2rpx solid #EBEBEB;
}
.main{
  flex: 1;
  margin:0 20rpx -40rpx 20rpx;
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
    .type{
      height: 500rpx;
      overflow: hidden;
     @include transition(height);
      /*transition: height 1s linear 2s;*/
    }
    .more{
      margin-top: 15rpx;
      font-size: 28rpx;
      color: $themeColor;
      p{
        display: inline-block;
      }
      img{
        width:26rpx;
        height: 24rpx;
        display: inline-block;
        margin-left: 10rpx;
      }
    }
  }
  .showMore{
    overflow-y: auto;
    .type{
      height: 1000rpx;
    }
    .more{
      display: none;
    }
  }
.type{
  /*flex:1;*/
  /*font-size:30rpx;*/
  /*color:#999;*/
  /*text-align: center ;*/
  /*overflow-y: auto;*/
  li{
    display: inline-block;
    height:80rpx;
    line-height: 80rpx;
    padding: 0 40rpx;
    border:2rpx solid #EBEBEB;
    border-radius: 200rpx;
    margin: 40rpx 0 0 20rpx;
  }
  .chooseLi{
    background-color: $themeColor;
    color: #fff;
  }
}

}
  .button{
    margin-top: 80rpx;
    height: 100rpx;
    margin-bottom: 40rpx;
  }

</style>
