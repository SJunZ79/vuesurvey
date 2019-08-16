<template>
  <div class="activate clearfix">
    <div class="reginner">
      <span class="fontReg regshequ-weijihuo"></span>
      <h2 class="tips">激活邮件已发送至您的注册邮箱<br/>请前往邮箱查看邮件并完成激活！</h2>
      <span class="fontReg regshequ-jihuo"></span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "FrontActivate"
    }
</script>

<style scoped>
  .activate {
    left: 0%;
    top: 0%;
    width: 100%;
    height: 100%;
    background: url("../assets/images/acti.jpg");
    background-size: cover;
    position: absolute;
    -webkit-background-size:cover;
    -moz-background-size:cover;
    -o-background-size:cover;
    overflow: hidden;
  }
  .regshequ-weijihuo{
    font-size: 100px;
    position: absolute;
    color: rgba(74, 182, 255, 0.9);
    left:17%;
    top:30%;

  }
  .regshequ-jihuo{
    font-size: 100px;
    position: absolute;
    color: rgba(74, 182, 255, 0.9);
    left:77%;
    top:30%;
  }
  .tips{
    color: rgba(239, 255, 255, 0.75);
    font-size: 50px;
    margin-left: 20%;
    margin-top: 9.8%;
    font-family: '华文新魏 Bold', '华文新魏 Regular', '华文新魏';
    position: absolute;
  }
  .reginner {
    background: url("../assets/images/u1.png");
    background-size: cover;
    margin-top: 5%;
    margin-left: 10%;
    height: 70%;
    width: 80%;
  }
</style>
