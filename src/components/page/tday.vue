<template>
<el-row>
  <el-col :span="4"><div class="time-graph">
          <canvas id="weather-graph-canvas" width="160" height="160"></canvas>
          <p>完成进度</p>
        </div></el-col>
</el-row>

</template>

<script>
export default {
  mounted: function () {
    // var time = document.getElementById('time-graph-canvas')
    // this.drawMain(time, 70, '#85d824', '#eef7e4')
    var weather = document.getElementById('weather-graph-canvas')
    this.drawMain(weather, 90, '#2ba0fb', '#e5f1fa')
  },
  methods: {
    drawMain (drawingelem, percent, forecolor, bgcolor) {
    /*
        @drawingelem: 绘制对象
        @percent：绘制圆环百分比, 范围[0, 100]
        @forecolor: 绘制圆环的前景色，颜色代码
        @bgcolor: 绘制圆环的背景色，颜色代码
    */
      var context = drawingelem.getContext('2d')
      var centerx = drawingelem.width / 2
      var centery = drawingelem.height / 2
      var rad = Math.PI * 2 / 100
      var speed = 0

      // 绘制背景圆圈
      function backgroundCircle () {
        context.save()
        context.beginPath()
        context.lineWidth = 8 // 设置线宽
        var radius = centerx - context.lineWidth
        context.lineCap = 'round'
        context.strokeStyle = bgcolor
        context.arc(centerx, centery, radius, 0, Math.PI * 2, false)
        context.stroke()
        context.closePath()
        context.restore()
      }

      // 绘制运动圆环
      function foregroundCircle (n) {
        context.save()
        context.strokeStyle = forecolor
        context.lineWidth = 8
        context.lineCap = 'round'
        var radius = centerx - context.lineWidth
        context.beginPath()
        context.arc(centerx, centery, radius, -Math.PI / 2, -Math.PI / 2 + n * rad, false) // 用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke()
        context.closePath()
        context.restore()
      }

      // 绘制文字
      function text (n) {
        context.save() // save和restore可以保证样式属性只运用于该段canvas元素
        context.fillStyle = forecolor
        var fontsize = 40
        context.font = fontsize + 'px Helvetica'
        var textwidth = context.measureText(n.toFixed(0) + '%').width
        context.fillText(n.toFixed(0) + '%', centerx - textwidth / 2, centery + fontsize / 2)
        context.restore()
      }
      // 执行动画
      (function drawFrame () {
        window.requestAnimationFrame(drawFrame)
        context.clearRect(0, 0, drawingelem.width, drawingelem.height)
        backgroundCircle()
        text(speed)
        foregroundCircle(speed)
        if (speed >= percent) return
        speed += 1
      }())
    }
  }
}
</script>
<style scoped>
.time-graph {
    padding-top: 20px;
    display:flex;
    display:-webkit-flex;
    justify-content: center;
    align-items: center;
}

#time-graph-canvas {
    width: 80px;
    height: 80px;
}
</style>
