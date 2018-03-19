<template>
  <div>
    <canvas id="myCanvas"></canvas>
  </div>
</template>

<script>
export default {
  mounted: function () {
    this.drawRing(100, 100, 80)
  },
  methods: {
    drawRing (w, h, val) {
    // 先创建一个canvas画布对象，设置宽高
      var c = document.getElementById('myCanvas')
      var ctx = c.getContext('2d')
      ctx.canvas.width = w
      ctx.canvas.height = h
      // 圆环有两部分组成，底部灰色完整的环，根据百分比变化的环
      // 先绘制底部完整的环
      // 起始一条路径
      ctx.beginPath()
      // 设置当前线条的宽度
      ctx.lineWidth = 10// 10px
      // 设置笔触的颜色
      ctx.strokeStyle = '#CCCCCC'
      // arc()方法创建弧/曲线（用于创建圆或部分圆）arc(圆心x,圆心y,半径,开始角度,结束角度)
      ctx.arc(50, 50, 40, 0, 2 * Math.PI)
      // 绘制已定义的路径
      ctx.stroke()

      // 绘制根据百分比变动的环
      ctx.beginPath()
      ctx.lineWidth = 10
      ctx.strokeStyle = '#d54540'
      // 设置开始处为0点钟方向（-90*Math.PI/180）
      // x为百分比值（0-100）
      ctx.arc(50, 50, 40, -90 * Math.PI / 180, (val * 3.6 - 90) * Math.PI / 180)
      ctx.stroke()
      // 绘制中间的文字
      ctx.font = '20px Arial'
      ctx.fillStyle = '#747474'
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      ctx.fillText(val + '%', 50, 50)
    }
  }
  // drawRing(100, 100, 30);
}
</script>
