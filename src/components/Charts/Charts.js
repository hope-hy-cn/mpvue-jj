/**
 * 名称:
 * 作者:王晨煚
 * 时间:2018/9/25/025
 * 描述: 所有尺寸均会经过rem计算
 * 示例:
 new Charts.circle('canvas',{
      height:110,
      width:110,
      count:100,
      number:30,
      startColor:"red",
      endColor:"blue",
      color:"#00D0A9",
      bgColor:"#f9f9f9",
      startAngle:0,
      lineWidth:7,
      lineCap:"butt",
      title:{
        text:"23",
        fontSize:36,
        color:"white"
      },
      subTitle:{
        text:"Remaining",
        fontSize:12,
        color:"#999"
      }
    })
 */

export {
  Pie,
  Progress
}

class Pie {
  constructor(id, opts) {
    this.ctx = wx.createCanvasContext(id)
    this.opts = opts

    this.ctx.width = (opts.width || 200)
    this.ctx.height = (opts.height || 200)

    this.percent = parseInt(opts.number) / parseInt(opts.count) * 100 // 最终百分比
    this.circleX = this.ctx.width / 2  //中心x坐标
    this.circleY = this.ctx.width / 2  //中心y坐标
    this.lineWidth = parseInt(opts.lineWidth) // 圆形线条的宽度
    this.radius = Math.floor(Math.min(this.ctx.width, this.ctx.height) / 2 - this.lineWidth) //圆环半径
    this.process = 0.0;  //进度


    this.draw()
  }

  draw() {

    var magnification = 2
    //canvas进度条
    var ctx = this.ctx
    var obj = this.opts
    if (!ctx) return
    ctx.width = this.ctx.width
    ctx.height = this.ctx.height

    var that = this
    this.circleLoading = setInterval(function () {
      that.loading();
      ctx.draw()
    }, 20);
  }

  //刷新
  loading() {
    if (this.process >= this.percent) {
      clearInterval(this.circleLoading);
    }

    //清除canvas内容
    this.ctx.clearRect(0, 0, this.circleX * 2, this.circleY * 2);

    //中间的字
    if (this.opts.title) {
      var titleFontSize = (this.opts.title.fontSize || 32)
      this.ctx.setFontSize(titleFontSize);
      this.ctx.setTextAlign('center');
      this.ctx.setTextBaseline('middle');
      this.ctx.setFillStyle(this.opts.title.color);
      if (this.opts.subTitle) {
        this.ctx.fillText(this.opts.title.text, this.circleX, this.circleY - 10);
      }
      else {
        this.ctx.fillText(this.opts.title.text, this.circleX, this.circleY);
      }
    }
    //下面的字
    if (this.opts.subTitle) {
      var subTitleFontSize = (this.opts.subTitle.fontSize || 14)
      this.ctx.setFontSize(subTitleFontSize);
      this.ctx.setTextAlign('center');
      this.ctx.setTextBaseline('middle');
      this.ctx.setFillStyle(this.opts.subTitle.color);
      this.ctx.fillText(this.opts.subTitle.text, this.circleX, this.circleY + 20);
    }

    //圆形
    this.drawCircle();

    //圆弧
    if (this.percent) this.sector();
    //控制结束时动画的速度
    if (this.process / this.percent > 0.90) {
      this.process += 0.30;
    } else if (this.process / this.percent > 0.80) {
      this.process += 0.55;
    } else if (this.process / this.percent > 0.70) {
      this.process += 0.75;
    } else {
      this.process += 1.0;
    }
  }

  drawCircle() {
    this.ctx.beginPath();
    this.ctx.setLineWidth(this.lineWidth);
    this.ctx.setStrokeStyle(this.opts.bgColor || '#ccc');
    this.ctx.arc(this.circleX, this.circleY, this.radius, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  //画弧线
  sector() {
    this.ctx.beginPath();
    //ctx.moveTo(cx, cy + r); // 从圆形底部开始画
    this.ctx.setLineWidth(this.lineWidth);

    // 渐变色 - 可自定义
    var linGrad = this.ctx.createLinearGradient(
      this.circleX - this.radius - this.lineWidth, this.circleY, this.circleX + this.radius + this.lineWidth, this.circleY
    );
    linGrad.addColorStop(0.0, this.opts.color || this.opts.startColor);
    linGrad.addColorStop(1.0, this.opts.color || this.opts.endColor);
    this.ctx.setStrokeStyle(linGrad);

    //圆弧两端的样式
    if (["butt", "round", "square"].indexOf(this.opts.lineCap) != -1) this.ctx.setLineCap(this.opts.lineCap);
    else this.ctx.setLineCap('round');

    //圆弧
    this.ctx.arc(
      this.circleX, this.circleY, this.radius,
      -Math.PI / 2,
      Math.PI * 2 * this.process / 100 - Math.PI / 2,
      false
    );
    this.ctx.stroke();
  }
}

class Progress{
  constructor(id,opts){
    this.id = id
    this.ctx = wx.createCanvasContext(id)
    this.opts = opts

    this.lineWidth = opts.lineWidth || 6
    this.width = opts.width || 244
    this.height = opts.height || 6
    this.lineColor = opts.lineColor || "#00D1AC"
    this.bgColor = opts.bgColor || "#F2F2F2"
    this.percentage = opts.percentage || 0
    this.text = opts.text || ""
    this.textColor = opts.textColor || "#999"
    this.textSize = opts.textSize || 12
    this.textPosition = opts.textPosition || "center"
    this.hasCutLine = opts.hasCutLine || false
    this.cutLineColor = opts.cutLineColor || "white"
    this.cutNum = opts.cutNum || 0

    this.nowPercentage = 0

    this.draw()
  }

  drawBgLine(){
    this.ctx.beginPath()
    this.ctx.moveTo(this.lineWidth / 2, this.height - this.lineWidth / 2)
    this.ctx.lineTo(this.width - this.lineWidth / 2, this.height - this.lineWidth / 2)
    this.ctx.setLineWidth(this.lineWidth)
    this.ctx.setLineCap('round')
    this.ctx.setStrokeStyle(this.bgColor)
    this.ctx.stroke()
  }
  drawLine(){
    this.ctx.beginPath()
    this.ctx.moveTo(this.lineWidth / 2, this.height - this.lineWidth / 2)
    this.ctx.lineTo((this.width - this.lineWidth / 2) * this.nowPercentage, this.height - this.lineWidth / 2)
    this.ctx.setLineWidth(this.lineWidth)
    this.ctx.setLineCap('round')
    this.ctx.setStrokeStyle(this.lineColor)
    this.ctx.stroke()
  }
  drawCutLine(){
    this.ctx.beginPath()
    for(var i = 0 ; i < this.cutNum ; i ++){
      this.ctx.moveTo(this.width / 4 * (i + 1), this.height - this.lineWidth)
      this.ctx.lineTo(this.width / 4 * (i + 1), this.height)
    }
    this.ctx.setLineWidth(1)
    this.ctx.setLineCap('round')
    this.ctx.setStrokeStyle(this.cutLineColor)
    this.ctx.stroke()
  }
  drawText(){
    var subTitleFontSize = (this.textSize || 14)
    this.ctx.setFontSize(subTitleFontSize);
    this.ctx.setTextAlign('center');
    this.ctx.setTextBaseline('middle');
    this.ctx.setFillStyle(this.textColor);
    const metrics = this.text ? this.ctx.measureText(this.text) : 0
    var drowX = (this.width - this.lineWidth / 2) * this.nowPercentage
    if(drowX <= metrics.width / 2){
      drowX += metrics.width / 2
    }else if(drowX >= (this.width - this.lineWidth / 2) - metrics.width / 2){
      drowX = (this.width - this.lineWidth / 2) - metrics.width / 2
    }
    this.ctx.fillText(this.text,drowX, subTitleFontSize / 2);
  }

  loading(){
    if (this.nowPercentage >= this.percentage) {
      clearInterval(this.timer);
    }

    //清除canvas内容
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawBgLine()
    this.drawLine()
    this.drawText()
    if(this.hasCutLine === true) this.drawCutLine()

    //控制结束时动画的速度
    if (this.nowPercentage / this.percentage > 0.90) {
      this.nowPercentage += 0.004;
    } else if (this.nowPercentage / this.percentage > 0.80) {
      this.nowPercentage += 0.006;
    } else if (this.nowPercentage / this.percentage > 0.70) {
      this.nowPercentage += 0.008;
    } else {
      this.nowPercentage += 0.01;
    }
  }

  draw(){
    if(this.percentage > 0){
      var that = this
      this.timer = setInterval(function () {
        that.loading();
        that.ctx.draw()
      }, 20);
    }else{
      this.drawBgLine()
      this.drawText()
      if(this.hasCutLine === true) this.drawCutLine()
      this.ctx.draw()
    }
  }
}




function bar(id, obj) {
  var magnification = 2
  var rootFontSizeMultiple = parseFloat(document.getElementsByTagName('html')[0].style.fontSize) / 100 * magnification || 1 * magnification

  var canvas = document.getElementById(id)
  if (!canvas) return
  canvas.width = (obj.width || 120) * rootFontSizeMultiple
  canvas.height = (obj.height || 280) * rootFontSizeMultiple
  var ctx = canvas.getContext("2d")
  var barHeight = canvas.height - 22 * rootFontSizeMultiple  //此处20是文字区域高度
  var maxValue = 0

  function drawCutLine() {
    var cutLineNum = obj.cut
    var cutLineColor = obj.cutLineColor
    for (var i = 0; i <= cutLineNum; i++) {
      //ctx.translate(0.5,0.5);
      // + 0.5 为了防止线条变粗
      ctx.moveTo(0, (barHeight / cutLineNum) * i + 0.5);
      ctx.lineTo(canvas.width + 0.5, (barHeight / cutLineNum) * i + 0.5);
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = cutLineColor
    ctx.stroke();
  }

  function drawBar() {
    var itemsNum = obj.items.length
    var canvasW = (obj.width || 120)
    var margin = (canvasW - itemsNum * 20) / (itemsNum * 2) * rootFontSizeMultiple
    var barWidth = obj.barWidth * rootFontSizeMultiple
    for (var i = 0; i < obj.items.length; i++) {
      if (maxValue < obj.items[i].value) maxValue = obj.items[i].value
    }
    //maxValue = obj.items[i].targetValue

    for (var i = 0; i < itemsNum; i++) {
      //背景
      ctx.fillStyle = obj.barBgColor || "rgba(255,255,255,0.2)";
      ctx.fillRect(margin * (2 * i + 1) + barWidth * i, barHeight, barWidth, -barHeight);

      // 渐变色 - 可自定义
      var linGrad = ctx.createLinearGradient(
        0, barHeight, 20 * rootFontSizeMultiple, -barHeight
      );
      linGrad.addColorStop(0.0, obj.barColor || obj.startColor);
      linGrad.addColorStop(1.0, obj.barColor || obj.endColor);
      ctx.fillStyle = linGrad;
      var thisHeight = -(obj.items[i].value / obj.items[i].targetValue) * barHeight
      ctx.fillRect(margin * (2 * i + 1) + barWidth * i, barHeight, barWidth, thisHeight * (process / maxValue));

      //文字
      var fontSize = (obj.fontSize || 12) * rootFontSizeMultiple
      ctx.font = fontSize + 'px April';
      ctx.textAlign = 'center';
      //ctx.textBaseline = 'middle';
      ctx.fillStyle = obj.fontColor;
      ctx.fillText(obj.items[i].title, margin * (2 * i + 1) + barWidth * i + barWidth / 2, barHeight + 20 * rootFontSizeMultiple);
    }

  }

  var process = 0.0;  //进度
  function loading() {
    //清除canvas内容
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (process / maxValue > 0.90) {
      process += (maxValue / 80);
    } else if (process / maxValue > 0.80) {
      process += (maxValue / 60);
    } else if (process / maxValue > 0.70) {
      process += (maxValue / 40);
    } else {
      process += (maxValue / 20);
    }
    drawCutLine()
    drawBar()
    if (process >= maxValue) {
      clearInterval(barLoading);
    }
  }

  var barLoading = window.setInterval(function () {
    loading();
  }, 20);
}



