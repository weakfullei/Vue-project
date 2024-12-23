<template>
  <div class="home">
    <el-container class = "home">

      <!-- 顶栏容器 -->
      <el-header class = "custom-header">
        <el-row type="flex" class = "row-bg" justify = "space-between">

        <!-- 顶栏左边放入题目 -->
          <el-col :span="6" class="up_title">
            <h1>小组件管理系统</h1>
          </el-col>
        <!-- 顶栏右边放入el-icon-switch-button 进行退出操作 -->
        <el-col :span="2">
          <el-button class="login_out_button" type="text" @click="logout" icon="el-icon-switch-button"> 退出 </el-button>
        </el-col>            

        </el-row>

        <el-row type="flex" class="row-bg" justify="end" >



        </el-row>
      </el-header>
      
      <!-- 主要区域容器 -->
      <el-main class = "custom-main">
        <!-- TAB栏 -->
         <el-tabs tab-position="left" >
          <!-- 第一个tab -->
          <el-tab-pane label ="过去的大事集">
            <h1>选择日期</h1>

            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>

            <el-button type="primary" @click="A_button_click">确认查询</el-button>
            
            <el-descriptions title="大事集">
              <el-descriptions-item label="事件名称">
                <p id ="event" ref="event">事件名称</p>
              </el-descriptions-item>

              <el-descriptions-item label="事件日期">
                <p id="eventDate" ref="eventDate">事件日期</p>
              </el-descriptions-item>

              <el-descriptions-item label="关键词">
                <p id="eventKey" ref="eventKey">关键词</p>
              </el-descriptions-item>

              <el-descriptions-item label="事件链接">
                <p id="eventLink" ref="eventLink">事件链接</p>
              </el-descriptions-item>
            </el-descriptions>

          </el-tab-pane>

          <!-- 第二个tab -->
          <el-tab-pane label = "手机号属地查询">
            <h1>选择手机号</h1>
            <el-input placeholder="请输入手机号" v-model="phone"></el-input>
            <el-button type="primary" @click="B_button_click">查询</el-button>

            <el-descriptions title="手机号属地查询">
              <el-descriptions-item label="手机号">
                <p id ="phonenumber" ref="phonenumber">手机号</p>
              </el-descriptions-item>

              <el-descriptions-item label="事件日期">
                <p id="province" ref="province">省份</p>
              </el-descriptions-item>

              <el-descriptions-item label="城市">
                <p id="city" ref="city">城市</p>
              </el-descriptions-item>

              <el-descriptions-item label="运营商">
                <p id="sp" ref="sp">事件链接</p>
              </el-descriptions-item>
            </el-descriptions>

          </el-tab-pane>

          <!-- 第三个tab -->
          <el-tab-pane label = "等待开发">
            <h1>wait</h1>
          </el-tab-pane>

         </el-tabs>



      </el-main>

      <!-- 底栏容器 -->
      <el-footer class = "custom-footer">
          <h1 id="hitokoto" ref = "hitokoto">:D 获取中...</h1>
      </el-footer>

    </el-container>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Home',
  data() {
    return {
      // 日期选择器(大事集)
      value1: '',
      // 手机号(手机号属地查询)
      phone: '',
    };
  },
  methods: {
    // 获取一言数据
    async fetchHitokoto() {
      try {
        const response = await axios.get('https://v1.hitokoto.cn');
        this.$refs.hitokoto.innerText = response.data.hitokoto;
      } catch (err) {
        alert(err);
      }
    },
    // 获取大事件数据
    async fetchEvent(url) {
      try {
        const response = await axios.get(url);
        if(response.data.code != 200) {
          alert(response.data.msg);
          return;
        }
        this.$refs.event.innerText = response.data.title;
        this.$refs.eventLink.innerText = response.data.url;
        this.$refs.eventDate.innerText = response.data.y + "年" + response.data.m + "月" + response.data.d + "日";
        this.$refs.eventKey.innerText = response.data.words;
      } catch (err) {
        alert(err);
      }
    },

    async fetchPhone(url) {
      try {
        const response = await axios.get(url);
        if(response.data.code != 200) {
          alert("code不是200");
          return;
        }
        alert(response.data.data.city);

      } catch (err) {
        if (err.response) {
          console.error('Response error:', err.response.data);
          alert(`Error: ${err.response.data.message}`);
        } else if (err.request) {
          console.error('Request error:', err.request);
          alert('Network error: No response received');
        } else {
          console.error('Error:', err.message);
          alert(`Error: ${err.message}`);
        }
      }
    },

    // A按钮点击事件 点击时进行大事件链接获取
    A_button_click() {
      if (this.value1) {
        // 处理选择的日期
        const formattedDate = moment(this.value1).format('YYYY MM DD');
        // api链接拼接
        var url = "https://cn.apihz.cn/api/zici/today.php?id=88888888&key=88888888"
        url += "&y=" + formattedDate.split(" ")[0] + "&m=" + formattedDate.split(" ")[1] + "&d=" + formattedDate.split(" ")[2];
        this.fetchEvent(url);
      } else {
        alert('请选择一个日期');
      }
    },
    // B按钮点击事件 点击时进行手机号归属地查询
    B_button_click() {
      if (this.phone) {
        // api链接拼接
        var url = "https://cx.shouji.360.cn/phonearea.php?number=" + this.phone;
        alert(url);
        this.fetchPhone(url);
      } else {
        alert('请输入一个手机号');
      }
    },
    // 登出方法 随意使用
    logout() {
      localStorage.removeItem('user');
      this.$router.push({ name: 'MainContent' });
    }
  },
  mounted() {
    // 下方调用api请在使用时打开注释 容易被ban掉ip
    
    //this.fetchHitokoto();
  }
};
</script>

<style scoped>
.home{
  height: 100%;
  width: 100%;
  background-color: white;
}

.custom-header {
  background-color: #3498db; /* 设置你想要的背景颜色 */
  color: white; /* 设置文本颜色 */
  height: 20%;
}

.row-bg {
  background-color: transparent; /* 确保行背景透明以显示顶栏背景颜色 */
    height: 100%;
}

.login_out_button {
  color: white;
  height: 100%; /* 占满父容器高度 */
  width: 100%; /* 占满父容器宽度 */
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

.up_title {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}


.custom-main{
  display: flex;
  background-color: white;
  height: 70%;
  width: 100%;
}




/* 底栏 */
.custom-footer {
  background-color: #3498db; /* 设置你想要的背景颜色 */
  color: white; /* 设置文本颜色 */
  height: 30%;
}
.custom-footer h1 {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  height: 100%; /* 占满父容器高度 */
  width: 100%; /* 占满父容器宽度 */

}
</style>
