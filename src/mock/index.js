import Mock from 'mockjs'
import evaluation from './modules/evaluation'
import user from './modules/user'
import userInfo from './modules/userInfo'
import disease from './modules/disease'
import mall from './modules/mall'

// 配置请求延时，模拟弱网延时场景
const timeout = 1000
Mock.use = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var res = null

      switch (url){
        case "/user/lastHabitsEvaluation":
          res = Mock.mock(evaluation.getEvaluation1Info);
          break;
        case "/user/login":
          res = Mock.mock(user.login);
          break;
        case "/user/getHomeInfo":
          res = Mock.mock(user.getHomeInfo);
          break;
        case"/userInfo/getHospital":
          res=Mock.mock(userInfo.getHospital);
          break;

        case "/mall/getOrderList":
          res = Mock.mock(mall.getOrderList);
          break;
        case "/mall/getOrderDetail":
          res = Mock.mock(mall.getOrderDetail);
          break;
        case "/evaluation/getHomeInfo":
          res = Mock.mock(evaluation.getReportsList());
          break;
        case "/evaluation/getEvaluationReport":
          res = Mock.mock(evaluation.getReportDetail());
          break;
        case"/disease/getDiseaseType":
          res=Mock.mock(disease.getDiseaseType());
          break
        case "/mall/getOrderListByDate":
          res = Mock.mock(mall.getOrderListByDate());
          break;
        case "/mall/getProducts":
          res = Mock.mock(mall.getProducts());
          break;
        case "/mall/login":
          res = Mock.mock(mall.mallLogin());
          break;
        case "/mall/createOrder":
          res = Mock.mock(mall.createOrder());
          break;
        case "/mall/getAddress":
          res = Mock.mock(mall.getMallAddress());
          break;
        case "/mall/updateAddress":
          res = Mock.mock(mall.updateAddress());
          break;
        case "/mall/insertAddress":
          res = Mock.mock(mall.insertAddress());
          break;
        case"/evaluation/getDiseaseResult":
          res=Mock.mock(evaluation.getDiseaseResult);
          break;
        case"/evaluation/getNutritionalRisk":
          res = Mock.mock(evaluation.getNutritionalRisk);
          break;
        case"/userInfo/putUserInfo":
          res=Mock.mock(userInfo.putUserInfo);
          break;
        case"/evaluation/putBaseEvaluation":
          res=Mock.mock(evaluation.putBaseEvaluation);
          break;
      }

      resolve({data:res})
    },timeout)
  })
}

export default Mock
