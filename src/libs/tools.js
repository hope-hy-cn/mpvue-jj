/**
 * @description 获取当前设备类型
 * @author wangchenjiong
 * @overview 此处填写描述
 * @param
 * @returns {string} mobile or pc
 * @example
 * 此处书写示例
 */
export const getDevice = () => {
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    return "mobile"
  } else {
    return "pc"
  }
}

export const windowResize = (callback) => {
  callback()
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  window.addEventListener(resizeEvt, callback, false);
}

export const useRem = (deviceWidth = 320, maxWidth) => {
  var dWidth = deviceWidth, mWidth = maxWidth
  var doc = document, win = window
  var docEl = doc.documentElement
  var recalc = function () {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    if (mWidth) clientWidth = window.innerWidth > mWidth ? mWidth : window.innerWidth;
    else clientWidth = window.innerWidth > mWidth ? mWidth : window.innerWidth;
    docEl.style.fontSize = 100 * (clientWidth / dWidth) + 'px';
  };
  windowResize(recalc)
}

export const getUrlInfo = (name, url) => {
  var url = url || decodeURI(window.location);
  if (name) {
    //var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
    var r = url.match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
  } else {
    if (typeof(url) == "string" && url.length > 0) {
      var u = url.split("&"),
        getInfo = {},
        j = '';
      for (var i in u) {
        j = u[i].split("=");
        getInfo[j[0]] = j[1];
      }
      return getInfo;
    }
    return {};
  }
};
export const addClass = (ele, cls) => {
  var eleClass = ele.className
  var blank = (eleClass != '') ? ' ' : '';
  var added = eleClass + blank + cls;
  ele.className = added;
}
export const removeClass = (ele, cls) => {
  var eleClass = ' ' + ele.className + ' ';
  eleClass = eleClass.replace(/(\s+)/gi, ' ')
  var removed = eleClass.replace(' ' + cls + ' ', ' ');
  removed = removed.replace(/(^\s+)|(\s+$)/g, '');
  ele.className = removed;
}
export const deepClone = (data) => {
  var twin = clone(data)
  return twin

  function clone(dataCell) {
    if (Object.prototype.toString.call(dataCell) == '[object Array]') {
      var floor = []
      for (var i = 0; i < dataCell.length; i++) {
        floor[i] = clone(dataCell[i]);
      }
    } else if (Object.prototype.toString.call(dataCell) == '[object Object]') {
      var floor = {}
      for (var m in dataCell) {
        if (dataCell.hasOwnProperty(m)) {
          floor[m] = clone(dataCell[m]);
        }
      }
    } else {
      var floor = dataCell
    }
    return floor
  }
}

export const verify = (dom) => {
  if (!dom.verify) return  //当该节点中没有data-verify时，直接return，不对其进行验证，避免出错
  var typeArr = dom.verify.split(",")
  if (!typeArr) return
  var errorMsgs = dom.verifyErrorMsg //自定义的提示信息，可能有多条
  var errormsg
  if (errorMsgs) {
    errorMsgs = errorMsgs.split("/$$/")
  }
  var domVal = dom.value
  //var domVal = dom.value || dom.text() //表单中待验证的值
  var verifyResult = {result: true}
  var verifyFun = {
    notNull: function () {
      if (domVal === '') verifyResult = {result: false, error: errormsg ? errormsg : "内容不能为空"};
    },
    noSpace: function () {
      if (domVal.indexOf(" ") != -1) verifyResult = {result: false, error: errormsg ? errormsg : "请不要输入空格"};
    },
    //正则匹配
    reg: function (reg, error) {
      if (!reg.test(domVal)) verifyResult = {result: false, error: errormsg ? errormsg : error};
    },
    phone: function () {
      //if (domVal === '') return;
      var reg = /^((13[0-9])|(15[0-9])|(17[0-9])|(18[0-9])|(19[0-9])|(147,145))\d{8}$/;
      verifyFun.reg(reg, '手机号格式不正确');
    },
    mail: function () {
      var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+)+(\.[a-zA-Z0-9]+)+$/;
      verifyFun.reg(reg, '邮箱格式不正确');
    },
    idNum: function () {  //18位和15为身份证
      var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
      verifyFun.reg(reg, '身份证格式不正确');
    },
    isNum: function () {
    },
    length: function () {
      var max = parseInt(dom.maxLen);
      var min = parseInt(dom.minLen);
      //var msgLen = domVal.replace(/[^\x00-\xff]/g, 'xx').length; //匹配包括汉字的双字节字符
      var msgLen = domVal.length;
      if (errormsg) {
        errormsg = errormsg.split("/$/")
      }
      if (errormsg.length == 1) {
        errormsg[1] = errormsg[0]
      }
      if (max && min) {
        if (msgLen > max) return verifyResult = {result: false, error: errormsg && errormsg[0] ? errormsg[0] : "超过最大限制长度"};
        if (msgLen < min) return verifyResult = {result: false, error: errormsg && errormsg[1] ? errormsg[1] : "不足最小限制长度"};
      } else if (max && !min) {
        if (msgLen > max) return verifyResult = {result: false, error: errormsg && errormsg[0] ? errormsg[0] : "超过最大限制长度"};
      } else if (!max && min) {
        if (msgLen < min) return verifyResult = {result: false, error: errormsg && errormsg[0] ? errormsg[0] : "不足最小限制长度"};
      }
    },
    sameAs: function () {
      var asVal = dom.sameAs
      if (asVal != domVal) return verifyResult = {result: false, error: errormsg ? errormsg : "输入内容不相同"};
    },
    range: function () {
      var maxVal = parseFloat(dom.maxVal);
      var minVal = parseFloat(dom.minVal);
      var msgLen = parseFloat(domVal); //匹配包括汉字的双字节字符
      if (errormsg) {
        errormsg = errormsg.split("/$/")
      }
      if (maxVal && minVal) {
        if (msgLen > maxVal) return verifyResult = {result: false, error: errormsg && errormsg[0] ? errormsg[0] : "超出最大值"};
        if (msgLen < minVal) return verifyResult = {result: false, error: errormsg && errormsg[1] ? errormsg[1] : "超出最小值"};
      } else if (maxVal && !minVal) {
        if (msgLen > maxVal) return verifyResult = {result: false, error: errormsg && errormsg[0] ? errormsg[0] : "超出最大值"};
      } else if (!maxVal && minVal) {
        if (msgLen < minVal) return verifyResult = {result: false, error: errormsg && errormsg[0] ? errormsg[0] : "超出最小值"};
      }
    }
  }
  //判断验证条件中是否有notNull验证，如果有则优先验证notNull，如果内容为空则直接return，不再继续验证
  // if(typeArr.indexOf("notNull") != -1){
  //     verifyFun["notNull"]()
  //     if(!verifyResult.result){
  //         return verifyResult
  //     }
  // }
  //如果没有notNull验证或者notNull验证通过，则继续验证其他条件，如果遇到有一条验证未通过，则直接return，不再继续验证
  for (var i = 0; i < typeArr.length; i++) {
    if (errorMsgs) {
      if (errorMsgs.length == 1) errormsg = errorMsgs[0] //如果多个验证类型只有一个自定义提示，则所有类型都使用这个提示
      if (errorMsgs.length > 1) errormsg = errorMsgs[i]  //如果多个验证类型有多个自定义提示，则按顺序对照使用
    }
    verifyFun[typeArr[i]]()
    if (!verifyResult.result) { //验证未通过
      return verifyResult
    }
  }
  return verifyResult
}

/**
 * @description 获取某个日期的信息
 * @author wangchenjiong
 * @overview 此处填写描述
 * @param {string} dateStr 例如"2019-04-04" 表示计算当前日期的日期信息 默认计算今天
 * @param {number} n 表示计算当前日期后第n天的日期信息
 * @returns {object}
 * @example  getDateInfo() 今天的日期信息
 * @example  getDateInfo("2019-04-04")   2019年4月4日的日期信息
 * @example  getDateInfo(1) 明天的日期信息
 * @example  getDateInfo("2019-04-04",1)  2019年4月5日的日期信息
 */
export const getDateInfo = function(){
  var dateStr = null, n = 0
  if(arguments.length == 0){
    dateStr = null
    n = 0
  }else if(arguments.length == 1){
    if(objType(arguments[0]) == "number"){
      dateStr = null
      n = arguments[0]
    }else if(objType(arguments[0]) == "string"){
      dateStr = arguments[0]
      n = 0
    }else{
      console.error("getDateInfo(String || Number)：参数类型错误")
    }
  }else if(arguments.length == 2){
    if(objType(arguments[0]) == "string" && objType(arguments[1]) == "number"){
      dateStr = arguments[0]
      n = arguments[1]
    }else{
      console.error("getDateInfo(String, Number)：参数类型错误")
    }
  }
  var day = new Date(dateStr)
  day.setTime(day.getTime() + n * 24 * 60 * 60 * 1000);
  var s = day.getFullYear() + "-" + (day.getMonth() + 1 > 9 ? day.getMonth() + 1 : "0" + (day.getMonth() + 1)) + "-" + (day.getDate() > 9 ? day.getDate() : "0" + day.getDate());
  var week = null
  var hour = day.getHours();
  switch (day.getDay()) {
    case 0:
      week = "周日";
      break;
    case 1:
      week = "周一";
      break;
    case 2:
      week = "周二";
      break;
    case 3:
      week = "周三";
      break;
    case 4:
      week = "周四";
      break;
    case 5:
      week = "周五";
      break;
    case 6:
      week = "周六";
      break;
  }
  return {
    year: day.getFullYear(),
    month: day.getMonth() + 1,
    day: day.getDate(),
    hour: hour,
    week: week,
    date: s,
    weekNum: day.getDay()
  }
}

/**
 * @description 获取数据类型
 * @author wangchenjiong
 * @overview 此处填写描述
 * @param {arg}
 * @returns {string} object || number || string || function || array
 * @example
 * 此处书写示例
 */
export const objType = (arg) => {
  if (Object.prototype.toString.call(arg) == '[object Object]') return "object"
  if (Object.prototype.toString.call(arg) == '[object Number]') return "number"
  if (Object.prototype.toString.call(arg) == '[object String]') return "string"
  if (Object.prototype.toString.call(arg) == '[object Function]') return "function"
  if (Object.prototype.toString.call(arg) == '[object Array]') return "array"
}

/**
 * @description 此处填写方法名称
 * @author wangchenjiong
 * @overview 此处填写描述
 * @param {paramType} paramName
 * @returns
 * @example
 * 此处书写示例
 */
export const formVerifyBlock = (verifyData) => {
  for (var i = 0; i < verifyData.length; i++) {
    var data = verifyData[i]
    var verifyResult = verify(data)
    if (verifyResult && !verifyResult.result) { //如果当前节点没有data-verify，则verifyResult为undefined，因此if中要判断verifyResult，避免报错
      return {status:false,msg:verifyResult.error}
    }
  }
  return {status:true,msg:null}
}

/**
 * @description 获取对象长度
 * @author wangchenjiong
 * @overview 此处填写描述
 * @param {paramType} paramName
 * @returns
 * @example
 * 此处书写示例
 */
export const getLength = (obj) => {
  var n = 0;
  for (var i in obj) {
    n++;
  }
  return n;
};
