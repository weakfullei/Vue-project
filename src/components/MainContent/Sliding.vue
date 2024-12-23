<template>
    <div class="login-submit round-corner" ref="slide">
        <form @submit.prevent="handleSubmit">
            <!-- 以下是登录界面 -->
            <div class="left-login vertical-center" v-show="this.sw">
                <h1>log in</h1>
                <div class="count">
                    <input type="text" v-model="loginUsername" placeholder="用户名/邮箱" class="init-input untize-input underline" >
                </div>
                <div>
                    <input type="password" v-model="loginPassword" placeholder="密码" class="init-input untize-input underline">
                </div>
                <input type="submit" @click="login" value="登录" class="init-input untize-input login-button round-corner" >
            </div>

            <!-- 以下是注册界面 -->
            <div class="right-signup vertical-center" v-show="!this.sw">
                <h1>sign up</h1>
                <div class="count">
                    <input type="text" v-model="signupUsername" placeholder="用户名" class="init-input untize-input underline">
                </div>
                <div>
                    <input type="text" v-model="signupEmail" placeholder="邮箱" class="init-input untize-input underline" >
                </div>
                <div>
                    <input type="text" v-model="signupPhone" placeholder="电话" class="init-input untize-input underline" >
                </div>
                <div>
                    <input type="password" v-model="signupPassword" placeholder="密码" class="init-input untize-input underline" >
                </div>
                <div>
                    <input type="password" v-model="signupConfirmPassword" placeholder="确认密码" class="init-input untize-input underline">
                </div>
                <input type="submit" @click="register" value="注册" class="init-input untize-input login-button round-corner">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: ["sw"],
    data() {
        return {
            loginUsername: '',
            loginPassword: '',
            signupUsername: '',
            signupEmail: '',
            signupPhone: '',
            signupPassword: '',
            signupConfirmPassword: '',
            // 用户信息 用于登录和注册
            users: JSON.parse(localStorage.getItem('users')) || [{
            username: 'admin',
            password: 'admin',
            email: 'admin@mail.com',
            phone: '123456789'
            }]
        }
    },
    methods: {
        handleSubmit() {
            if (this.sw) {
                this.login();
            } else {
                this.register();
            }
        },
        login() {
            // 因为输入框要求是邮箱或者用户名所以需要都判断
            const user = this.users.find(user => {
                return (user.username === this.loginUsername || user.email === this.loginUsername) && user.password === this.loginPassword;
            });
            if (user) {
                // 登录成功,处理逻辑
                // alert('登录成功');
                // 储存已登录用户信息
                localStorage.setItem('user', JSON.stringify(user));
                this.$router.push({ name: 'Home' });

            } else {
                alert('用户名或密码错误');
            }
        },
        register() {
            // 判断用户是否存在
            if (this.users.find(user => user.username === this.signupUsername)) {
                alert('用户已存在');
                return;
            }
            // 判断密码和确认密码是否一致
            if (this.signupPassword !== this.signupConfirmPassword) {
                alert('密码和确认密码不一致');
                return;
            }
            // 判断是否有空字段
            if (this.signupUsername && this.signupPassword && this.signupEmail && this.signupPhone) {
                const newusers = ({
                    username: this.signupUsername,
                    password: this.signupPassword,
                    email: this.signupEmail,
                    phone: this.signupPhone
                });
                this.users.push(newusers);
                alert('注册成功');
                this.$emit('update:sw', true); // 切换到登录界面
            } else {
                alert('请填写所有字段');
            }
        },
        // 检查屏幕大小
        checkScreenSize() {
            if(window.innerWidth < 600) {
                this.$router.push({ name: 'MobileLogin' });
            }
        }
    },
    // 监听users的变化 并将其存储到localStorage中
    watch: {
        users: {
      handler(newUsers) {
        localStorage.setItem('users', JSON.stringify(newUsers));
      },
      deep: true
    }
    },
    // 实现滑动效果
    updated() {
        let slide = this.$refs.slide;
        this.sw
            ? slide.style.transform = 'translateX(0)'
            : slide.style.transform = "translateX(80%)";
        slide.style.transition = "transform 0.5s ease-in-out"
    },
    mounted() {
        this.checkScreenSize();
        window.addEventListener('resize', this.checkScreenSize);

        // 登录注册界面颜色调整
        let input = document.querySelectorAll(".underline");
        input.forEach(e => {
            e.addEventListener("blur", () => {
                e.style.color = "#FF6666";
            });
            e.addEventListener("focus", () => {
                e.style.color = "red";
            });
        })
    },
    beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  }
}
</script>

<style scoped>
form {
    height: 100%;
}
h1 {
    /* 文本居中 */
    text-align: center;
    /* 转换大写 */
    text-transform: uppercase;
    color: hsla(0, 0%, 100%, 0.5);
    /* 字间距 */
    letter-spacing: 5px;
}

input::placeholder {
    letter-spacing: 2px;
}
input:focus {
    border-bottom: 1px solid red !important;
}
input:focus::placeholder {
    color: red;
}

.untize-input {
    width: 210px;
    height: 45px;
    font-size: 14px;
}
.underline {
    border-bottom: 1px solid #FF6666 !important;
}
.underline::placeholder {
    color: #FF6666;
}

.login-submit {
    position: absolute;
    left: 30px;
    top: -50px;
    width: 300px;
    height: 450px;
    background-color: #FFCCCC;
    box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.1);
}
.login-submit .left-login,
.login-submit .right-signup {
    height: 100%;
    flex-flow: column nowrap;
}
.login-submit .login-button {
    background-color: hsla(0, 0%, 100%, 0.5);
    color: #FF6666;
}
.login-submit .login-button:hover {
    background-color: #FF6666;
    color: white;
    transition: 0.5s;
}
</style>