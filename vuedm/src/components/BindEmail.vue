<template>
  <div class="binde clearfix">
    <div class="bindein">
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
        <h1>邮 箱 绑 定</h1>
      </div>
      <div class="bindform">
        <el-row type="flex" justify="center">
          <el-form ref="bindeForm" :model="user" status-icon label-width="0%">

            <el-form-item prop="account" label="">
              <el-input v-model="user.account" placeholder="请输入邮箱" class="email-in"  style="width: 128%;margin-left: -17%" clearable><i slot="prefix" class="fontReg regyouxiang"></i></el-input>
            </el-form-item>

            <hr class="belowemail">

            <el-button type="primary"  class="checkbut" @click="check()"
                                       style="width: 40%;margin-top: 15%;margin-left: 28%;font-size: 1.2em;background:transparent " round>查 询</el-button>
          </el-form>
        </el-row>
        <el-row>
          <ExistUser ref="existuser" :open_id="op" :account="this.user.account" :dept_name="dept" :college="col"></ExistUser>
        </el-row>
        <el-row>
          <Noteu ref="noteu" :open_id="op" :account="this.user.account" ></Noteu>
        </el-row>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from "axios";
  import ExistUser from "./ExistUser";
  import Noteu from "./Noteu";
  export default {
    name: "BindEmail",
    components: {Noteu, ExistUser},
    data() {
      return {
        user: {
          account: ""
        },
        op: this.$route.query.open_id,
        dept:'',
        col:'',
        rules: {
          account: [{ message: "邮箱不能为空", trigger: "blur" }]
        }
      };
    },

    methods: {
check(){
  if (!this.user.account) {
    this.$message.error("请输入邮箱！");
    return;
  }
  else if (this.user.account != null) {
    var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!reg.test(this.user.account)) {
      this.$message.error("邮箱格式不正确，请重新输入！");
    }
    else{
      axios.post("/api/oauth/yiban/getAccount", {
        account: this.user.account
      })
        .then(res => {
          if (res.data.status === "200") {
            this.dept=res.data.data.deptName;
            this.col=res.data.data.college;
            setTimeout(()=>{this.$refs.existuser.getInfo()},100)
            //this.$refs.existuser.getInfo();
            this.$refs.existuser.createex();

          } else if (res.data.status === "201"){
            this.$refs.noteu.createno();
          }
        });
    }
  }
}
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

</style>
<style scoped>
  .bindform{
    margin-top: 15%;
  }
  .binde {
    left: 0%;
    top: 0%;
    width: 100%;
    height: 100%;
    background: url("../assets/images/fronthome.jpg");
    background-size: cover;
    position: absolute;
    -webkit-background-size:cover;
    -moz-background-size:cover;
    -o-background-size:cover;
    overflow: hidden;
  }
  .bindein {
    background: url("../assets/images/u1.png");
    background-size: cover;
    margin-right: 28%;
    margin-left: 35%;
    margin-top: 3%;
    height: 70%;
  }
  .top{
    height: 22%;
  }
  .top h1{
    left:47.2% ;
    top: 12%;
    position: absolute;
    color: #EEEEEE;
    font-family: '华文新魏 Bold', '华文新魏 Regular', '华文新魏';
    font-size: 45px;
  }
  .bindein ul{
    top: 0;
    left: 0;
    position: absolute;
    width: 97.8%;
    height: 100%;

  }
  .bindein ul li {
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
  .bindein ul li:nth-child(1) {
    left: 0;
    animation-duration: 10s;
    -moz-animation-duration: 10s;
    -o-animation-duration: 10s;
    -webkit-animation-duration: 10s;
  }
  .bindein ul li:nth-child(2) {
    width: 40px;
    height: 40px;
    left: 10%;
    animation-duration: 15s;
    animation-duration: 15s;
    -moz-animation-duration: 15s;
    -o-animation-duration: 15s;
    -webkit-animation-duration: 11s;
  }
  .bindein ul li:nth-child(3) {
    left: 20%;
    width: 25px;
    height: 25px;
    animation-duration: 12s;
    -moz-animation-duration: 12s;
    -o-animation-duration: 12s;
    -webkit-animation-duration: 12s;
  }
  .bindein ul li:nth-child(4) {
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
  .bindein ul li:nth-child(5) {
    width: 60px;
    height: 60px;
    left: 40%;
    animation-duration: 10s;
    -moz-animation-duration: 10s;
    -o-animation-duration: 10s;
    -webkit-animation-duration: 10s;
  }
  .bindein ul li:nth-child(6) {
    width: 75px;
    height: 75px;
    left: 50%;
    -webkit-animation-delay: 7s;
    -moz-animation-delay: 7s;
    -o-animation-delay: 7s;
    animation-delay: 7s;
  }
  .bindein ul li:nth-child(7) {
    left: 60%;
    width: 30px;
    height: 30px;
    animation-duration: 8s;
    -moz-animation-duration: 8s;
    -o-animation-duration: 8s;
    -webkit-animation-duration: 8s;
  }
  .bindein ul li:nth-child(8) {
    width: 90px;
    height: 90px;
    left: 70%;
    -webkit-animation-delay: 4s;
    -moz-animation-delay: 4s;
    -o-animation-delay: 4s;
    animation-delay: 4s;
  }
  .bindein ul li:nth-child(9) {
    width: 50px;
    height: 50px;
    left: 80%;
    animation-duration: 20s;
    -moz-animation-duration: 20s;
    -o-animation-duration: 20s;
    -webkit-animation-duration: 20s;
  }
  .bindein ul li:nth-child(10) {
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

