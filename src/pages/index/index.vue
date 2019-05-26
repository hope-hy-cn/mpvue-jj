<template>
  <div @click="clickHandle">
    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" />

      <div class="userinfo-nickname">

      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" :value="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>

    <a href="/pages/counter/main" class="counter testDom">去往Vuex示例页面</a>

    <div class="all">
      <div class="left">
      </div>
      <div class="right">
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'


  export default {
    data () {
      return {
        motto: 'Hello miniprograme',
        userInfo: {
          nickName: 'mpvue',
          avatarUrl: 'http://mpvue.com/assets/logo.png'
        }
      }
    },

    components: {

    },

    methods: {
      ...mapActions(
        {
          getEvaluation1Info: 'evaluation/getEvaluation1Info'
        }),
      bindViewTap () {
        const url = '../order/main'
        if (mpvuePlatform === 'wx') {
          mpvue.switchTab({ url })
        } else {
          mpvue.navigateTo({ url })
        }
      },
      clickHandle (ev) {
        console.log('clickHandle:', ev)
        // throw {message: 'custom test'}
      }
    },

    onLoad () {
      // let app = getApp()
      this.getEvaluation1Info({data:{
          id: "5c08fff5e3c2387a9db23574",
          userName:"wang23"
        }}).then(res => {
        console.log(res)
      },err => {
        console.log(err)
      })
    }
  }
</script>

<style scoped lang="scss">
  .testDom{
    color:$themeColor;
  }
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .userinfo-avatar {
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
  }

  .userinfo-nickname {
    color: #aaa;
  }

  .usermotto {
    margin-top: 150px;
  }

  .form-control {
    display: block;
    padding: 0 12px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
  }
  .all{
    width:7.5rem;
    height:1rem;
    background-color:blue;
  }
  .all:after{
    display:block;
    content:'';
    clear:both;
  }
  .left{
    float:left;
    width:3rem;
    height:1rem;
    background-color:red;
  }

  .right{
    float:left;
    width:4.5rem;
    height:1rem;
    background-color:green;
  }
</style>
