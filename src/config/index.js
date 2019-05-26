var env = process.env.NODE_ENV

var cashPayWxList = [
  {unionId:"oncDLvsx8M62_0s3VS8HI1Vb90xQ",openId: "odnCu4iopnG26N7xa7bH6hTY0FMc",qrCodeId:"0100101000"},
  {unionId:"oncDLvun8-OKjRl5HrUYFAIzo2_c",openId: "od2m4uPomoq_8IbLp_zOxLVbDM3A",qrCodeId:"0100101000"},  //小霞
  {unionId:"oncDLvkau5D9Qtai8wtyB0Zzt4oo",openId: "",qrCodeId:"0100101000"},  //刘璐
  ]  //成办医院
if(env == "development" || env == "testing"){
  cashPayWxList=[
    ...cashPayWxList,  //成办医院
    {unionId:"oncDLvmattURGkmLublXMw5cdqWA",openId: "odnCu4vb-LDgdxUMXVcgJeHRh5vQ",qrCodeId:"0100101000"},  //成办医院
  ]
}

export default {
  baseUrl: {
    dev: 'https://miniprogram.shukangyun.com/api/',
    pro: 'https://cbdiet.postop.cn/api/',
    test:'https://cbdiet.suifangyun.com/api/'
  },
  version_web:"1.0.0",
  env:env,
  orderDayNumber:11
}
