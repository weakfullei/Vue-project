<!-- 工具文件 -->
<template>
  <div>
    <canvas ref="canvas" class="rain"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    // 获取canvas元素
    const canvas = this.$refs.canvas;
    const ctx = canvas.getContext('2d');

    // 设置canvas元素的宽高
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 雨滴的数量
    const count = 200;
    const drops = [];

    // 初始化每个雨滴的位置和速度
    for(let i = 0; i < count; i++) {
      drops.push({
        x: Math.random() * canvas.width,  // 雨滴的横坐标
        y: Math.random() * canvas.height,  // 雨滴的纵坐标
        speed: Math.random() * 5 + 1  // 雨滴的下落速度
      });
    }

    // 绘制每个雨滴
    function drawRain() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#FFFFFF'; // 纯白色雨滴
      ctx.beginPath();
      for(let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        ctx.moveTo(drop.x, drop.y);
        ctx.arc(drop.x, drop.y, 2, 0, Math.PI * 2);
      }
      ctx.fill();

      // 更新每个雨滴的位置
      for(let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        drop.y += drop.speed;
        if(drop.y > canvas.height) {
          drop.y = -20; // 雨滴到达底部，重新从顶部开始下落
        }
      }
    }

    // 每帧绘制雨滴
    function update() {
      drawRain();
      requestAnimationFrame(update);
    }
    update();
  },

  beforeDestroy() {
    cancelAnimationFrame(this.timer);
  }
}
</script>

<style>
.rain {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  pointer-events: none;
}
</style>
