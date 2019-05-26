import HttpBase from './httpBase'

import config from '../config'
var baseUrl = ""

if(process.env.NODE_ENV == "development"){
  baseUrl = config.baseUrl.test
}else if(process.env.NODE_ENV == "production"){
  baseUrl = config.baseUrl.pro
}else if(process.env.NODE_ENV == "testing"){
  baseUrl = config.baseUrl.test
}

const http = new HttpBase(baseUrl)
export default http
