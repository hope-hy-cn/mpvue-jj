import Mock from "../mock"

const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  //if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpBase {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
    this.timer = null
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      //Spin.hide()
    }
  }
  // 请求拦截
  before(options){
    var config = Object.assign(this.getInsideConfig(), options)
    config.url = config.baseURL + config.url
    // 添加全局loading...
    if (!Object.keys(this.queue).length) {
      // loading
    }
    this.queue[options.url] = true
    //如果使用其他的网络接口
    if(options.host){
      config.baseURL = options.host
    }
    wx.showLoading()
    return config
  }
  // 响应拦截
  after(options){
    this.destroy(options.url)
    wx.hideLoading()
  }
  requestTimer(requestTask){
    // 设置超时时间为30s
    this.timer = setTimeout(() => {
      requestTask.abort()
    },3000)
  }
  request (options) {
    var that = this
    var ajaxInfo = that.before(options)
    return new Promise((resolve, reject) => {
      if (process.env.NODE_ENV == 'testing'){
        Mock.use(options.url).then((res) => {
          that.after(options)
          resolve(res.data)
        })
      }else{
        const requestTask = wx.request({
          ...ajaxInfo,
          success(res) {
            clearTimeout(that.timer)
            that.after(options)
            resolve(res.data)
          },
          fail(err) {
            clearTimeout(that.timer)
            that.after(options)
            reject(err)
          }
        })
        that.requestTimer(requestTask)
      }
    })
  }
}
export default HttpBase
