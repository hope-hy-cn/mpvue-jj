export default {
  getHospital: req => {
    return {
      "apiStatus": 1,                //类型：Number  可有字段  备注：无
      "info": "mock",                //类型：String  必有字段  备注：无
      "success": true,                //类型：Boolean  必有字段  备注：无
      "sysStatus": 1,                //类型：Number  必有字段  备注：无
      "timestamp": 1,                //类型：Number  必有字段  备注：无
      "data": {                //类型：Object  必有字段  备注：无
        "hospitalList": [                //类型：Array  必有字段  备注：无
          {                //类型：Object  必有字段  备注：无
            "hospitalId": "1661",                //类型：String  必有字段  备注：医院id
            "hospitalName": "成办医院",                //类型：String  必有字段  备注：医院名称
            "departmentList": [                //类型：Array  必有字段  备注：无
              {                //类型：Object  必有字段  备注：无
                "departmentId": "1110",                //类型：String  必有字段  备注：无
                "departmentName": "骨科"                //类型：String  必有字段  备注：无
              },
              {
                "departmentId": "1111",
                "departmentName": "肿瘤科"
              }
            ]
          },
          {
            "hospitalId": "1142",
            "hospitalName": "华西医院",
            "departmentList": [
              {
                "departmentId": "1110",
                "departmentName": "骨科"
              },
              {
                "departmentId": "1112",
                "departmentName": "心内科"
              }
            ]
          },
          {
            "hospitalId": "1146",
            "hospitalName": "重庆医院",
            "departmentList": [
              {
                "departmentId": "1115",
                "departmentName": "肿瘤科"
              },
              {
                "departmentId": "1112",
                "departmentName": "心内科"
              }
            ]
          }
        ],
        "checkedInfo": [                //类型：Array  必有字段  备注：无
          {                //类型：Object  必有字段  备注：无
            "checkedHospitalId": "1146",                //类型：String  必有字段  备注：选择的医院ID
            "checkedDepartmentId": "1301"                //类型：String  必有字段  备注：选择的科室ID
          }
        ]
      }
    }
  },
  putUserInfo: (req) => {
    return {
      "apiStatus": 1,                //类型：Number  可有字段  备注：无
      "info": "mock",                //类型：String  必有字段  备注：无
      "success": true,                //类型：Boolean  必有字段  备注：无
      "sysStatus": 1,                //类型：Number  必有字段  备注：无
      "timestamp": 1,                //类型：Number  必有字段  备注：无
      "data": {                //类型：Object  必有字段  备注：无
      }
    }
  },

}
