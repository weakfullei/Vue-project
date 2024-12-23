<template>
  <div class="mobile-auth">
    <h1>移动端登录</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="loginUsername" placeholder="用户名或邮箱" required />
      <input v-model="loginPassword" type="password" placeholder="密码" required />
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MobileLogin',
  data() {
    return {
      loginUsername: '',
      loginPassword: '',
      users: JSON.parse(localStorage.getItem('users')) || []
    };
  },
  methods: {
      handleSubmit() {
      const user = this.users.find(user => {
        return (user.username === this.loginUsername || user.email === this.loginUsername) && user.password === this.loginPassword;
      });
      if (user) {
        alert('登录成功');
        localStorage.setItem('user', JSON.stringify(user));
        this.$router.push({ name: 'Home' });
      } else {
        alert('用户名或密码错误');
      }
    },
    checkScreenSize() {
      if (window.innerWidth >= 600) {
        this.$router.push({ name: 'Sliding' }); // 跳转到大屏幕登录界面
      }
    }
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  }
};
</script>

<style scoped>
.mobile-auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
}

h1 {
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>