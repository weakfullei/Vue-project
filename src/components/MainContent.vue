<template>
    <div class="login-wrap round-corner">
        <div class="content">
            <div class="background-kanban vertical-center">
                <div class="left-inside round-corner vertical-center">
                    <h1>让你久等了</h1>
                    <div class="eris">
                        <img 
                        src="../assets/ErisOVO.jpg" 
                        alt="signup-img" 
                        title="Meow" 
                        class="round-corner rotate"
                        @click="Meow">
                    </div>
                    <span>已有账号？才...才不会让你登录呢</span>
                    <input 
                    type="submit" value="登录" 
                    class="init-input submit round-corner " 
                    @click="change">
                </div>
                <div class="right-inside round-corner vertical-center">
                    <h1>有缘再见</h1>
                    <div class="eris">
                        <img 
                        src="../assets/ErisOVO.jpg" 
                        alt="signup-img" 
                        title="Meow" 
                        class="round-corner rotate"
                        @click="Meow">
                    </div>
                    <span>没有账号？真拿你没办法呢</span>
                    <input 
                    type="submit" value="注册"
                    class="init-input submit round-corner"
                    @click="change">
                </div>
            </div>
            <Sliding ref="slidingComponent" :sw="sw"/>
        </div>
    </div>
</template>

<script>
import Sliding from "./MainContent/Sliding.vue"
import Meow from "../assets/Music/Meow.mp3"

export default {
    name: 'MainContent',
    components: {
        Sliding,
    },
    data() {
        return {
            sw: true,
            isPlay: false,
        }
    },
    methods: {
        change() {
            this.sw = !this.sw;
            // 在登录和注册界面之间切换时 应当将Sliding.vue中data()创建的清空
            this.$refs.slidingComponent.loginUsername = '';
            this.$refs.slidingComponent.loginPassword = '';
            this.$refs.slidingComponent.signupUsername = '';
            this.$refs.slidingComponent.signupEmail = '';
            this.$refs.slidingComponent.signupPhone = '';
            this.$refs.slidingComponent.signupPassword = '';
            this.$refs.slidingComponent.signupConfirmPassword = '';
        },
        Meow() {
            const audio = new Audio(Meow);
            if (!this.isPlay) {
                audio.play();
                this.isPlay = true;
                // 防止重复播放
                audio.onended = () => this.isPlay = false;
            }
        }
    },
}
</script>

<style scoped>
    h1 {
        letter-spacing: 3px;
        color: hsla(0, 0%, 100%, 0.7);
    }
    .login-wrap {
        width: 600px;
        height: 350px;
        background: hsla(0, 0%, 100%, 0.25);
        box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.1);
    }
    .content {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .content .background-kanban {
        width: 100%;
        height: 100%;
    }
    .background-kanban img {
        display: block;
        width: 100px;
        height: 100px;
        margin: 0;
        clip-path: circle(at center);
        transition: 1s clip-path;
    }
    .background-kanban img:hover {
        cursor: pointer;
    }
    .background-kanban .right-inside,
    .background-kanban .left-inside {
        flex-flow: column nowrap;
        width: 40%;
        height: 80%;
    }
    .background-kanban .submit {
        width: 60px;
        height: 30px;
        color: #FF6666;
        border: 1px solid #FF6666;
        background-color: #FFCCCC;
    }
    .background-kanban span {
        font-size: 10px;
        color: gray;
    }
    .submit:hover {
        cursor: pointer;
        background-color: #FF6666;
        color: white;
        transition: 0.5s;
    }
</style>