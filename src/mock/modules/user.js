export default {
  login: req => {
    return {
      data: {unionId: "123123123123123123123"}
    }
  },
  getHomeInfo: req => {
    return {
      "apiStatus": 1,                //类型：Number  可有字段  备注：无
      "info": "mock",                //类型：String  必有字段  备注：无
      "success": true,                //类型：Boolean  必有字段  备注：无
      "sysStatus": 1,                //类型：Number  必有字段  备注：无
      "timestamp": 1,                //类型：Number  必有字段  备注：无
      "data": {                //类型：Object  必有字段  备注：无
        "score": 90,                //类型：Number  必有字段  备注：当前营养评分
        "scoreTarget": 120,                //类型：Number  必有字段  备注：目标营养评分
        "nutritionIntake": {                //类型：Object  必有字段  备注：营养摄入
          "energy": 1983,                //类型：Number  必有字段  备注：能量
          "fat": 92,                //类型：Number  必有字段  备注：脂肪
          "protein": 226,                //类型：Number  必有字段  备注：蛋白质
          "carbohydrate": 389,                //类型：Number  必有字段  备注：碳水化合物
          "na": 52                //类型：Number  必有字段  备注：钠
        },
        "nutritionTarget": {                //类型：Object  必有字段  备注：营养目标[最小值,正常最小值,正常最大值,最大值]
          "energy": [                //类型：Mixed  必有字段  备注：能量
            0,
            1800,
            2200,
            2800
          ],
          "fat": [                //类型：Mixed  必有字段  备注：脂肪
            0,
            120,
            240,
            170
          ],
          "protein": [                //类型：Mixed  必有字段  备注：蛋白质
            0,
            180,
            220,
            300
          ],
          "carbohydrate": [                //类型：Mixed  必有字段  备注：碳水化合物
            0,
            300,
            400,
            500
          ],
          "na": [                //类型：Mixed  必有字段  备注：钠
            0,
            70,
            90,
            120
          ]
        },
        "nutritionSource": [                //类型：Array  必有字段  备注：营养来源（列出当天订的营养餐）
          "特膳-鸡蛋虾仁饭",                //类型：String  必有字段  备注：特膳名称
          "特膳-鸡蛋虾仁饭"
        ]
      }
    }
  }
}
