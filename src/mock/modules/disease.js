export default {
  getDiseaseType:req=>{
    return{
      "apiStatus":1,                //类型：Number  可有字段  备注：无
      "info":"mock",                //类型：String  必有字段  备注：无
      "success":true,                //类型：Boolean  必有字段  备注：无
      "sysStatus":1,                //类型：Number  必有字段  备注：无
      "timestamp":1,                //类型：Number  必有字段  备注：无
      "data":  {                //类型：Object  必有字段  备注：无
        "diseaseList":  [                //类型：Array  必有字段  备注：疾病类型（根据科室返回）
           {                //类型：Object  必有字段  备注：无
            "diseaseId":"90807",                //类型：String  必有字段  备注：无
            "diseaseName":"亚健康",                //类型：String  必有字段  备注：无
            "diseaseScore":0                //类型：Number  必有字段  备注：无
          },
           {
            "diseaseId":"10411",
            "diseaseName":"便秘",
            "diseaseScore":0
          },
           {
            "diseaseId":"87670",
            "diseaseName":"高血压",
            "diseaseScore":0
          },
           {
            "diseaseId":"91323",
            "diseaseName":"糖尿病",
            "diseaseScore":1
          },
           {
            "diseaseId":"31714",
            "diseaseName":"关节炎",
            "diseaseScore":2
          },
           {
            "diseaseId":"47923",
            "diseaseName":"糖尿病",
            "diseaseScore":0
          },
           {
            "diseaseId":"96064",
            "diseaseName":"便秘",
            "diseaseScore":2
          },
           {
            "diseaseId":"54285",
            "diseaseName":"亚健康",
            "diseaseScore":3
          },
           {
            "diseaseId":"34277",
            "diseaseName":"关节炎",
            "diseaseScore":1
          },
           {
            "diseaseId":"86655",
            "diseaseName":"糖尿病",
            "diseaseScore":1
          },
           {
            "diseaseId":"73957",
            "diseaseName":"高血压",
            "diseaseScore":2
          },
           {
            "diseaseId":"47493",
            "diseaseName":"高血压",
            "diseaseScore":2
          },
           {
            "diseaseId":"26645",
            "diseaseName":"糖尿病",
            "diseaseScore":2
          },
           {
            "diseaseId":"72304",
            "diseaseName":"关节炎",
            "diseaseScore":1
          },
           {
            "diseaseId":"57707",
            "diseaseName":"便秘",
            "diseaseScore":2
          },
           {
            "diseaseId":"92947",
            "diseaseName":"高血压",
            "diseaseScore":2
          },
           {
            "diseaseId":"76046",
            "diseaseName":"亚健康",
            "diseaseScore":2
          },
           {
            "diseaseId":"46437",
            "diseaseName":"关节炎",
            "diseaseScore":3
          },
           {
            "diseaseId":"93508",
            "diseaseName":"便秘",
            "diseaseScore":3
          }
        ]
      }
    }
  }
}
