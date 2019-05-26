export default {
  getOrderList : req => {
    return {
      "apiStatus": 1,                //类型：Number  可有字段  备注：无
      "info": "mock",                //类型：String  必有字段  备注：无
      "success": true,                //类型：Boolean  必有字段  备注：无
      "sysStatus": 1,                //类型：Number  必有字段  备注：无
      "timestamp": 1,                //类型：Number  必有字段  备注：无
      "data":{
        list:[
          {
            id:999,
            hospitalName:"成办医院",
            orderImage:"",
            beginDate:"2019-04-26",
            endDate:"2019-05-03",
            count:5,
            price:199
          },
          {
            id:999,
            hospitalName:"成办医院",
            orderImage:"",
            beginDate:"2019-04-26",
            endDate:"2019-04-26",
            count:5,
            price:199
          },
          {
            id:999,
            hospitalName:"成办医院",
            orderImage:"",
            beginDate:"2019-04-23",
            endDate:"2019-04-18",
            count:6,
            price:190
          },
          {
            id:999,
            hospitalName:"成办医院",
            orderImage:"",
            beginDate:"2019-04-23",
            endDate:"2019-04-18",
            count:6,
            price:190
          },
          {
            id:999,
            hospitalName:"成办医院",
            orderImage:"",
            beginDate:"2019-04-23",
            endDate:"2019-04-18",
            count:6,
            price:190
          },
          {
            id:999,
            hospitalName:"成办医院",
            orderImage:"",
            beginDate:"2019-04-23",
            endDate:"2019-04-18",
            count:6,
            price:190
          },
          {
            id:999,
            hospitalName:"成办医院",
            orderImage:"",
            beginDate:"2019-04-23",
            endDate:"2019-04-18",
            count:6,
            price:190
          },
          {
            id:999,
            hospitalName:"成办医院",
            orderImage:"",
            beginDate:"2019-04-23",
            endDate:"2019-04-18",
            count:6,
            price:190
          },
          {
            id:999,
            hospitalName:"成办医院",
            orderImage:"",
            beginDate:"2019-04-23",
            endDate:"2019-04-18",
            count:6,
            price:190
          },
          {
            id:999,
            hospitalName:"成办医院",
            orderImage:"",
            beginDate:"2019-04-23",
            endDate:"2019-04-18",
            count:6,
            price:190
          },
          {
            id:999,
            hospitalName:"成办医院",
            orderImage:"",
            beginDate:"2019-04-23",
            endDate:"2019-04-18",
            count:6,
            price:190
          },
        ],
        totalCount:20
      }
    }
  },
  getOrderDetail(res){
    return {
      "apiStatus": 1,
      "info": "mock",
      "success": true,
      "sysStatus": 1,
      "timestamp": 1,
      data:{
        buyerNote:{
          nutritiouMeals: {
            date: ["2019-04-27","2019-04-27","2019-04-29"],
            typeIndex: [1,2,1],  //0、1、2  ,  分别表示"早餐"  "午餐"  "晚餐"
            product: "",
            quantity: [1,1,1],
            address: "这是收货地址",
            userId: "",
            openId: "",   //openId要在管理系统中用来获取测评信息
            unionId: "",
            spec: ["A","B","C"],  //A、B、C
            qrCodeId: "",
            userName: "",
            preference: {
              rice: 0,   // 0 杂粮饭   1 白米饭
              spicy: 0,   // 0 不吃辣   1 吃辣
              egg: 0   // 0 吃鸡蛋   1 不吃鸡蛋
            },
            mealName:["虾仁滑蛋","虾仁滑蛋","红烧牛肉饭"]
          }
        }
      }
    }
  },
  getProducts(res){
    return {
      "apiStatus": 1,
      "info": "mock",
      "success": true,
      "sysStatus": 1,
      "timestamp": 1,
      data:{
      }
    }
  },
  getOrderListByDate(res){
    return {
      "apiStatus": 1,
      "info": "mock",
      "success": true,
      "sysStatus": 1,
      "timestamp": 1,
      data:{
      }
    }
  },
  mallLogin(res){
    return {
      "apiStatus": 1,
      "info": "mock",
      "success": true,
      "sysStatus": 1,
      "timestamp": 1,
      data:{
      }
    }
  },
  getMallAddress(res){
    return {
      "apiStatus": 1,
      "info": "mock",
      "success": true,
      "sysStatus": 1,
      "timestamp": 1,
      data:{
      }
    }
  },
  createOrder(res){
    return {
      "apiStatus": 1,
      "info": "mock",
      "success": true,
      "sysStatus": 1,
      "timestamp": 1,
      data:{
      }
    }
  },
  updateAddress(res){
    return {
      "apiStatus": 1,
      "info": "mock",
      "success": true,
      "sysStatus": 1,
      "timestamp": 1,
      data:{
      }
    }
  },
  insertAddress(res){
    return {
      "apiStatus": 1,
      "info": "mock",
      "success": true,
      "sysStatus": 1,
      "timestamp": 1,
      data:{
      }
    }
  }
}
