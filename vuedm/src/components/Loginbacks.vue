<template>
  <div class="login clearfix">
    <div class="loginner">

      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div class="top">
        <img id="u3" src="../assets/images/u3.png" height="105" width="106">
        <img id="u4" src="../assets/images/u4.png" height="65" width="63">
        <h1>用 户 登 录</h1>
      </div>
      <div class="logform">
        <el-row type="flex" justify="center">
          <el-form ref="loginForm" :model="user" status-icon label-width="0%">

            <el-form-item prop="username" label="">
              <el-input v-model="user.username" placeholder="用户名 / 邮箱" class="username-in"  style="width: 128%;margin-left: -17%" clearable><i slot="prefix" class="fontReg reguser-fill"></i></el-input>
            </el-form-item>
            <hr class="belowusername">

            <el-form-item prop="type" label="">
              <el-select v-model="user.type" placeholder="用户类型" class="type-in" style="width: 128%;margin-left: -17%" clearable>
                <i slot="prefix" class="fontReg regyonghuleixing"></i>
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <hr class="belowtype">

            <el-form-item prop="password" label="">
              <el-input v-model="user.password" show-password placeholder="密码" style="width: 128%;margin-left: -18.3%" class="pass-in"><i slot="prefix" class="fontReg regmima"></i></el-input>
            </el-form-item>
            <hr class="belowmima">

            <el-form-item prop="code" label="">
              <el-input v-model="user.code"  placeholder="验证码" class="code-in" style="width: 80%;margin-left: -18%" clearable><i slot="prefix" class="fontReg regyanzhengma"></i></el-input>
            </el-form-item>

            <img id="u15" src="/api/validateCode"  @click="getCodeImg()" height="61px" width="168px">
            <hr class="belowyan">
            <el-form-item>
              <el-button type="primary"  class="logbut" @click="doLogin()" style="width: 65%;margin-top: 15.8%;margin-left: -17%;font-size: 20px" round>登  录</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary"  class="regbut" @click="goRegister()" style="width: 65%;margin-top: -26.5%;margin-left: 57%;font-size: 20px;position: absolute" round>未  注  册？</el-button>
            </el-form-item>

          </el-form>
        </el-row>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from "axios";
  export default {
    name: "Loginbacks",
    data() {
      return {
        options: [{
          value: '0',
          label: '管理员'
        }, {
          value: '1',
          label: '组织'
        }, {
          value: '2',
          label: '部门'
        }, {
          value: '3',
          label: '学生'
        }, {
          value: '4',
          label: '老师'
        }],
        user: {
          username: "",
          type: "",
          password: "",
          code: ""
        },
        rules: {
          username: [{message: "用户名不能为空", trigger: "blur"}],
          type: [{message: "用户类型不能为空", trigger: "blur"}],
          password: [{message: "密码不能为空", trigger: "blur"}],
          code: [{message: "验证码不能为空", trigger: "blur"}]
        }
      };
    },

    methods: {
      //获取验证码
      getCodeImg() {
        var getimagecode = document.getElementById("u15");
        getimagecode.src = "/api/validateCode?sid=" + Math.random();
      },
      //注册按钮事件
      doLogin() {
        if (!this.user.username) {
          this.$message.error("请输入用户名！");
          return;
        } else if (!this.user.type) {
          this.$message.error("请选择用户类型！");
          return;
        } else if (!this.user.password) {
          this.$message.error("请输入密码！");
          return;
        } else if (!this.user.code) {
          this.$message.error("请输入验证码！");
          return;
        } else {
          // 接口
          console.log(this.user.type);
          axios.post("/api/checkCode", {
            code: this.user.code
          })
            .then(res => {
              if (res.data.status === 1) {
                this.$message.error("验证失败,请重新输入验证码！");
              } else {
                axios
                  .post("/api/admin/login", {
                    username: this.user.username,
                    type: this.user.type,
                    password: this.user.password,
                    code: this.user.code
                  })
                  .then(res => {
                    if (res.data.status === "500") {
                      this.$router.push('/helloWorld');
                    } else if (res.data.status === "401") {
                      this.$message.error("账号密码错误！");
                      this.$router.push('/loginbacks');
                    }
                  });
              }

            });
        }
      },
      goRegister(){
        this.$router.push('/register');
      }
    }
  }
</script>
<style>
  .el-input__inner::-webkit-input-placeholder{
    color: rgb(153, 153, 153);
    background: transparent;
    font-size: 1.2em;
  }
  .reguser-fill{
    font-size: 28px;
    position: absolute;
  }
  .username-in .el-input__inner{
    background: transparent;
    font-size: 1.2em;
    border:0 !important;
    height:1.7em;
    margin-left: 12%;
    border-radius:4px;
    color:#f4f6fa;
    outline:0;
  }
  .belowusername{
    width: 145%;
    background-color: #444;
    margin-left: -20%;
    margin-top: -5%;
  }

  .regyonghuleixing{
    font-size: 32px;
    position: absolute;
  }
  .type-in .el-input__inner{
    background: transparent;
    font-size: 1.2em;
    border:0 !important;
    height:1.7em;
    margin-left: 12.5%;
    border-radius:4px;
    color:#f4f6fa;
    outline:0;
  }
  .belowtype{
    width: 145%;
    background-color: #444;
    margin-left: -20%;
    margin-top: -5%;
  }
  .regmima{
    font-size: 38px;
    position: absolute;
  }
  .pass-in .el-input__inner{
    background: transparent;
    font-size: 1.2em;
    border:0 !important;
    height:1.7em;
    margin-left: 13.8%;
    border-radius:4px;
    color:#f4f6fa;
    outline:0;
  }
  .belowmima{
    width: 145%;
    background-color: #444;
    margin-left: -20%;
    margin-top: -5%;
  }
  .regyanzhengma{
    font-size: 40px;
    position: absolute;

  }
  .code-in .el-input__inner{
    background: transparent;
    font-size: 1.2em;
    border:0 !important;
    height:1.7em;
    width: 60%;
    margin-left: 22.5%;
    border-radius:4px;
    color:#f4f6fa;
    outline:0;
  }
  .belowyan{
    width: 75%;
    background-color: #444;
    margin-left: -20%;
    margin-top: -3%;

  }
</style>
<style scoped>
  .login {
    left: 0%;
    top: 0%;
    width: 100%;
    height: 100%;
    background: url("../assets/images/u0.png");
    background-size: cover;
    position: absolute;
    -webkit-background-size:cover;
    -moz-background-size:cover;
    -o-background-size:cover;
    overflow: hidden;
  }
  .loginner {
    background: url("../assets/images/u1.png");
    background-size: cover;
    margin-right: 12%;
    margin-left: 60%;
    margin-top: 4%;
    height: 60%;
  }
  .logform{
    margin-top: 6.5%;
  }
  .top{
    height: 22%;
  }
  #u3{
    margin-left: 3%;
    margin-top:1%;
    position: absolute;
  }
  #u4{
    left:64.8% ;
    top: 13.8%;
    position: absolute;
  }
  #u15{
    left:55% ;
    top: 47%;
    position: absolute;
  }
  .top h1{
    left:70.9% ;
    top: 11.3%;
    position: absolute;
    color: #EEEEEE;
  }
  .loginner ul{
    top: 0;
    left: 0;
    position: absolute;
    width: 97.8%;
    height: 100%;

  }
  .loginner ul li {
    list-style-type: none;
    display: block;
    position: absolute;
    bottom: -120px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color:rgba(255, 255, 255, 0.15);
    animation: square 25s infinite;
    -webkit-animation: square 25s infinite;
    transition-timing-function: linear;
  }
  .loginner ul li:nth-child(1) {
    left: 0;
    animation-duration: 10s;
    -moz-animation-duration: 10s;
    -o-animation-duration: 10s;
    -webkit-animation-duration: 10s;
  }
  .loginner ul li:nth-child(2) {
    width: 40px;
    height: 40px;
    left: 10%;
    animation-duration: 15s;
    animation-duration: 15s;
    -moz-animation-duration: 15s;
    -o-animation-duration: 15s;
    -webkit-animation-duration: 11s;
  }
  .loginner ul li:nth-child(3) {
    left: 20%;
    width: 25px;
    height: 25px;
    animation-duration: 12s;
    -moz-animation-duration: 12s;
    -o-animation-duration: 12s;
    -webkit-animation-duration: 12s;
  }
  .loginner ul li:nth-child(4) {
    width: 50px;
    height: 50px;
    left: 30%;
    -webkit-animation-delay: 3s;
    -moz-animation-delay: 3s;
    -o-animation-delay: 3s;
    animation-delay: 3s;
    animation-duration: 12s;
    -moz-animation-duration: 12s;
    -o-animation-duration: 12s;
    -webkit-animation-duration: 12s;
  }
  .loginner ul li:nth-child(5) {
    width: 60px;
    height: 60px;
    left: 40%;
    animation-duration: 10s;
    -moz-animation-duration: 10s;
    -o-animation-duration: 10s;
    -webkit-animation-duration: 10s;
  }
  .loginner ul li:nth-child(6) {
    width: 75px;
    height: 75px;
    left: 50%;
    -webkit-animation-delay: 7s;
    -moz-animation-delay: 7s;
    -o-animation-delay: 7s;
    animation-delay: 7s;
  }
  .loginner ul li:nth-child(7) {
    left: 60%;
    width: 30px;
    height: 30px;
    animation-duration: 8s;
    -moz-animation-duration: 8s;
    -o-animation-duration: 8s;
    -webkit-animation-duration: 8s;
  }
  .loginner ul li:nth-child(8) {
    width: 90px;
    height: 90px;
    left: 70%;
    -webkit-animation-delay: 4s;
    -moz-animation-delay: 4s;
    -o-animation-delay: 4s;
    animation-delay: 4s;
  }
  .loginner ul li:nth-child(9) {
    width: 50px;
    height: 50px;
    left: 80%;
    animation-duration: 20s;
    -moz-animation-duration: 20s;
    -o-animation-duration: 20s;
    -webkit-animation-duration: 20s;
  }
  .loginner ul li:nth-child(10) {
    width: 75px;
    height: 75px;
    left: 90%;
    -webkit-animation-delay: 6s;
    -moz-animation-delay: 6s;
    -o-animation-delay: 6s;
    animation-delay: 6s;
    animation-duration: 30s;
    -moz-animation-duration: 30s;
    -o-animation-duration: 30s;
    -webkit-animation-duration: 30s;
  }

  @keyframes square {
    0%  {
      -webkit-transform: translateY(0);
      transform: translateY(0)
    }
    100% {
      bottom: 600px;
      -webkit-transform: translateY(-500);
      transform: translateY(-500)
    }
  }
  @-webkit-keyframes square {
    0%  {
      -webkit-transform: translateY(0);
      transform: translateY(0)
    }
    100% {
      bottom: 600px;
      -webkit-transform: translateY(-500);
      transform: translateY(-500)
    }
  }
</style>
