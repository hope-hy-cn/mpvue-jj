export default {
  getEvaluation1Info : req => {
    return {
      data:{token: "token"}
    }
  },
  getReportsList : req => {
    return {
      "apiStatus": 1,
      "info": "mock",
      "success": true,
      "sysStatus": 1,
      "timestamp": 1,
      data:{
        "list": [                //类型：Array  必有字段  备注：无
          {                //类型：Object  必有字段  备注：无
            "reportId":"mock",                //类型：String  必有字段  备注：无
            "createOn":"2019-09-09",                //类型：String  必有字段  备注：无
            "title":"有营养不良风险",                //类型：String  必有字段  备注：无
            "riskType":1,                //类型：Number  必有字段  备注：0,1,2,分别对应title的三个值
            "tags": ["生活质量下降","疾病恢复减慢","住院时长增加"]
          },
          {                //类型：Object  必有字段  备注：无
            "reportId":"mock",                //类型：String  必有字段  备注：无
            "createOn":"2019-09-09",                //类型：String  必有字段  备注：无
            "title":"正常营养情况",                //类型：String  必有字段  备注：无
            "riskType":0,
            "tags": ["生活质量下降","疾病恢复减慢","住院时长增加"]
          },
          {                //类型：Object  必有字段  备注：无
            "reportId":"mock",                //类型：String  必有字段  备注：无
            "createOn":"2019-09-09",                //类型：String  必有字段  备注：无
            "title":"营养不良",                //类型：String  必有字段  备注：无
            "riskType":2,
            "tags": ["疾病恢复减慢","并发症风险增加","不好的临床解决","莫得救了"]
          }
        ],
        totalCount:20
      }
    }
  },
  getReportDetail:req => {
    return {
      "apiStatus": 1,
      "info": "mock",
      "success": true,
      "sysStatus": 1,
      "timestamp": 1,
      data:{
        title:"有营养不良风险",
        createOn:"2019-04-11 15:08",
        tags:["生活质量下降","疾病回复减慢","祝愿市场增加"],
        tips:"您的日常饮食营养不能满足疾病恢复所需，请您预定特殊膳食，避免影响疾病恢复",
        bmi:{
          value:26.3,
          proposal:"按比例摄入各级食物，并注意同组食物之间 的搭配，如粗细搭配、深色与浅色蔬菜搭配、鱼禽 肉类的搭配。"
        },
        targetIntake:{
          carbohydrate:0.15,
          fat:0.45,
          protein:0.45,
          proposal:"按比例摄入各级食物，并注意同组食物之间的搭配，建议您根据营养师建议预订特膳，均衡营摄入量"
        }
      }
    }
  },
  getDiseaseResult:req=>{
    return{
      "apiStatus":1,                //类型：Number  可有字段  备注：无
      "info":"mock",                //类型：String  必有字段  备注：无
      "success":true,                //类型：Boolean  必有字段  备注：无
      "sysStatus":1,                //类型：Number  必有字段  备注：无
      "timestamp":1,                //类型：Number  必有字段  备注：无
      "data": {                //类型：Object  必有字段  备注：无
        "tips":  [                //类型：Array  必有字段  备注：无
          "现在的病情不会有太大的营养消耗",                //类型：String  必有字段  备注：无
          "但是仍有可能存在营养不良"                //类型：String  必有字段  备注：无
        ]
      }
    }
  },
  getNutritionalRisk:req=>{
    return{
      "apiStatus":1,                //类型：Number  可有字段  备注：无
      "info":"mock",                //类型：String  必有字段  备注：无
      "success":true,                //类型：Boolean  必有字段  备注：无
      "sysStatus":1,                //类型：Number  必有字段  备注：无
      "timestamp":1,                //类型：Number  必有字段  备注：无
      "data": {                //类型：Object  必有字段  备注：无
        "tips":  [                //类型：Array  必有字段  备注：无
          "您没有营养不良的风险",                //类型：String  必有字段  备注：无
          "接下来判断您的饮食是否会导致营养不良"                //类型：String  必有字段  备注：无
        ]
      }
    }
  },
  putBaseEvaluation:(req)=>{
    return{
      "apiStatus":1,                //类型：Number  可有字段  备注：无
      "info":"mock",                //类型：String  必有字段  备注：无
      "success":true,                //类型：Boolean  必有字段  备注：无
      "sysStatus":1,                //类型：Number  必有字段  备注：无
      "timestamp":1,                //类型：Number  必有字段  备注：无
      "data":  {                //类型：Object  必有字段  备注：无
      }
    }
  }
}
