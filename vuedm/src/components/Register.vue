<template>
  <div class="register clearfix">
    <div class="reginner">

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
        <h1>用 户 注 册</h1>
      </div>
      <div class="regform">
        <el-row type="flex" justify="center">
          <el-form ref="registerForm" :model="user" status-icon label-width="0%">
            <el-form-item prop="email" label="">
              <el-input v-model="user.email" placeholder="邮箱" class="email-in"  style="width: 128%;margin-left: -17%" clearable><i slot="prefix" class="fontReg regyouxiang"></i></el-input>
            </el-form-item>
            <hr class="belowemail">
            <el-form-item prop="college" label="">
              <el-select v-model="user.college" @change="choseCollege" placeholder="所属学院" class="college-in" style="width: 128%;margin-left: -18.5%" clearable>
                <i slot="prefix" class="fontReg regxueyuan"></i>
              <el-option v-for="item in ccollege"
                         :key="item.id"
                         :lable="item.value"
                         :value="item.value"
              ></el-option>
              </el-select>
            </el-form-item>
            <hr class="belowcollege">
            <el-form-item prop="dept_name" label="">
              <el-select v-model="user.dept_name" placeholder="组织名称" class="dept-in" style="width: 128%;margin-left: -17%"  clearable>
                <i slot="prefix" class="fontReg regbumen"></i>
              <el-option v-for="item in deptname1"
                         :key="item.id"
                         :lable="item.value"
                         :value="item.value"
              ></el-option>
              </el-select>
            </el-form-item>
            <hr class="belowdept">
            <el-form-item prop="password" label="">
              <el-input v-model="user.password" show-password placeholder="密码" style="width: 128%;margin-left: -18.3%" class="pass-in"><i slot="prefix" class="fontReg regmima"></i></el-input>
            </el-form-item>
            <hr class="belowmima">
            <el-form-item prop="cpassword" label="">
              <el-input v-model="user.cpassword" show-password placeholder="确认密码" style="width: 128%;margin-left: -19%" class="cpass-in"><i slot="prefix" class="fontReg regmimaqueren"></i></el-input>
            </el-form-item>
            <hr class="belowcmima">
            <el-form-item prop="code" label="">
              <el-input v-model="user.code"  placeholder="验证码" class="code-in" style="width: 80%;margin-left: -18%" clearable><i slot="prefix" class="fontReg regyanzhengma"></i></el-input>
            </el-form-item>
            <img id="u15" src="/api/validateCode"  @click="getCodeImg()" height="61px" width="168px">
            <hr class="belowyan">
            <el-form-item>
              <el-button type="primary"  class="regbut" @click="doRegister()" style="width: 50%;margin-top: 15%;margin-left: 25.5%;font-size: 20px" round>注  册</el-button>
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
    name: "Register",
    data() {
      return {
        user: {
          email: "",
          college:"",
          dept_name:"",
          password: "",
          cpassword: "",
          code: ""
        },
        ccollege:'',
        cdeptname:'',
        deptname1: [],
        collegeDataJson:'../static/jjson/collegeData.json',
        rules: {
          email: [{ message: "邮箱不能为空", trigger: "blur" }],
          college: [{ message: "所属学院不能为空", trigger: "blur" }],
          dept_name: [{ message: "组织名称不能为空", trigger: "blur" }],
          password: [{ message: "密码不能为空", trigger: "blur" }],
          cpassword: [{ message: "确认密码不能为空", trigger: "blur" }],
          code: [{ message: "验证码不能为空", trigger: "blur" }]
        }
      };
    },
    created() {
      // console.log($);
      // console.log("1111");
    },

    methods: {
      //获取所有的学院组织信息
      getCollegeData:function(){
        var that = this
        axios.get(this.collegeDataJson).then(function(response){
            var data = response.data
            console.log(data)
            that.ccollege = []
            that.cdeptname = []
            // 数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {//学院
                that.ccollege.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) {//组织
                that.cdeptname.push({id: item, value: data[item], children: []})
              }
            }
            // 分类组织
            for (var index in that.ccollege) {
              for (var index1 in that.cdeptname) {
                if (that.ccollege[index].id.slice(0, 2) === that.cdeptname[index1].id.slice(0, 2)) {
                  that.ccollege[index].children.push(that.cdeptname[index1])
                }
              }
            }
        }).catch(function(error){console.log(typeof+ error)})
      },
//使组织选择器跟着变化事件
      choseCollege:function(e) {
        for (var index2 in this.ccollege) {
          if (e === this.ccollege[index2].value) {
            this.deptname1 = this.ccollege[index2].children
            this.user.dept_name = this.ccollege[index2].children[0].value
          }
        }
      },
      //获取验证码
      getCodeImg(){
var getimagecode=document.getElementById("u15");
getimagecode.src="/api/validateCode?sid="+Math.random();
      },
      //注册按钮事件
      doRegister() {
        if (!this.user.email) {
          this.$message.error("请输入邮箱！");
          return;
        } else if (!this.user.college) {
          this.$message.error("请输入所属学院名称！");
          return;
        } else if (!this.user.dept_name) {
          this.$message.error("请输入组织名称！");
          return;
        }else if (this.user.email != null) {
          var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!reg.test(this.user.email)) {
            this.$message.error("请输入有效的邮箱！");
          } else if (!this.user.password) {
            this.$message.error("请输入密码！");
            return;
          }
          else if (!this.user.cpassword) {
            this.$message.error("请再次输入密码！");
            return;
          }
          else if (!this.user.code) {
            this.$message.error("请输入验证码！");
            return;
          }
          else if (this.user.cpassword!=this.user.password) {
            this.$message.error("两次输入密码不一致！");
            return;
          }
          else {
            // 接口
            axios.post("/api/checkCode", {
                code: this.user.code
              })
              .then(res => {
                if (res.data.status === 1) {
                  this.$message.error("验证失败,请重新输入验证码！");
                } else {
                  axios.get('https://www.easy-mock.com/mock/5d3b5a681e44e31e2a64701a/usersfa/checkEmail').then(response=>{
                    var res =response.data.data,
                      len = res.length,
                      allEmail= []
                    // 拿到所有的username
                    for(var i=0; i<len; i++){
                      allEmail.push(res[i].email);
                    }
                    console.log(allEmail);
                    if(allEmail.indexOf(this.user.email) === -1){
                      axios
                        .post("/api/register/department/doRegister", {
                          email: this.user.email,
                          college: this.user.college,
                          dept_name:this.user.dept_name,
                          password:this.user.password,
                          code: this.user.code
                        })
                        .then(res => {
                          if (res.data.status === "004") {
                            this.$message.success("注册成功！");
                            this.$router.push('/frontActivate');
                          } else {
                            alert("注册出错！");
                          }
                        });
                    }
                    else{
                      this.$message.error("该邮箱已被注册！");
                    }
                  });
                }
              });

          }
        }
      }
    }
    ,created:function(){
      this.getCollegeData()
    }
  };
</script>
<style>
  .el-input__inner::-webkit-input-placeholder{
    color: rgb(153, 153, 153);
    background: transparent;
    font-size: 1.2em;
  }
  .regyouxiang {
    font-size: 28px;
    position: absolute;
  }
  .email-in .el-input__inner{
    background: transparent;
    font-size: 1.2em;
    border:0 !important;
    height:1.7em;
    margin-left: 12%;
    border-radius:4px;
    color:#f4f6fa;
    outline:0;
  }
  .belowemail{
    width: 145%;
    background-color: #444;
    margin-left: -20%;
    margin-top: -5%;
  }

  .regxueyuan{
    font-size: 40px;
    position: absolute;
  }
  .college-in .el-input__inner{
    background: transparent;
    font-size: 1.2em;
    border:0 !important;
    height:1.7em;
    margin-left: 13.2%;
    border-radius:4px;
    color:#f4f6fa;
    outline:0;
  }
  .belowcollege{
    width: 145%;
    background-color: #444;
    margin-left: -20%;
    margin-top: -5%;
  }
  .regbumen{
    font-size: 32px;
    position: absolute;
  }
  .dept-in .el-input__inner{
    background: transparent;
    font-size: 1.2em;
    border:0 !important;
    height:1.7em;
    margin-left: 12.5%;
    border-radius:4px;
    color:#f4f6fa;
    outline:0;
  }
  .belowdept{
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
  .regmimaqueren{
    font-size: 45px;
    position: absolute;
  }
  .cpass-in .el-input__inner{
    background: transparent;
    font-size: 1.2em;
    border:0 !important;
    height:1.7em;
    margin-left: 14.6%;
    border-radius:4px;
    color:#f4f6fa;
    outline:0;
  }
  .belowcmima{
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
  .register {
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
  .reginner {
    background: url("../assets/images/u1.png");
    background-size: cover;
    margin-right: 12%;
    margin-left: 60%;
    margin-top: 3%;
    height: 70%;
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
    top: 11.8%;
    position: absolute;
  }
  #u15{
    left:55% ;
    top: 62.5%;
    position: absolute;
  }
  .top h1{
    left:70.5% ;
    top: 9%;
    position: absolute;
    color: #EEEEEE;
  }
  .reginner ul{
    top: 0;
    left: 0;
    position: absolute;
    width: 97.8%;
    height: 100%;

  }
  .reginner ul li {
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
  .reginner ul li:nth-child(1) {
    left: 0;
    animation-duration: 10s;
    -moz-animation-duration: 10s;
    -o-animation-duration: 10s;
    -webkit-animation-duration: 10s;
  }
  .reginner ul li:nth-child(2) {
    width: 40px;
    height: 40px;
    left: 10%;
    animation-duration: 15s;
    animation-duration: 15s;
    -moz-animation-duration: 15s;
    -o-animation-duration: 15s;
    -webkit-animation-duration: 11s;
  }
  .reginner ul li:nth-child(3) {
    left: 20%;
    width: 25px;
    height: 25px;
    animation-duration: 12s;
    -moz-animation-duration: 12s;
    -o-animation-duration: 12s;
    -webkit-animation-duration: 12s;
  }
  .reginner ul li:nth-child(4) {
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
  .reginner ul li:nth-child(5) {
    width: 60px;
    height: 60px;
    left: 40%;
    animation-duration: 10s;
    -moz-animation-duration: 10s;
    -o-animation-duration: 10s;
    -webkit-animation-duration: 10s;
  }
  .reginner ul li:nth-child(6) {
    width: 75px;
    height: 75px;
    left: 50%;
    -webkit-animation-delay: 7s;
    -moz-animation-delay: 7s;
    -o-animation-delay: 7s;
    animation-delay: 7s;
  }
  .reginner ul li:nth-child(7) {
    left: 60%;
    width: 30px;
    height: 30px;
    animation-duration: 8s;
    -moz-animation-duration: 8s;
    -o-animation-duration: 8s;
    -webkit-animation-duration: 8s;
  }
  .reginner ul li:nth-child(8) {
    width: 90px;
    height: 90px;
    left: 70%;
    -webkit-animation-delay: 4s;
    -moz-animation-delay: 4s;
    -o-animation-delay: 4s;
    animation-delay: 4s;
  }
  .reginner ul li:nth-child(9) {
    width: 50px;
    height: 50px;
    left: 80%;
    animation-duration: 20s;
    -moz-animation-duration: 20s;
    -o-animation-duration: 20s;
    -webkit-animation-duration: 20s;
  }
  .reginner ul li:nth-child(10) {
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
