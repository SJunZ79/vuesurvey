<template>

</template>

<script>
  import axios from "axios";
    export default {
        name: "Activate",
      methods: {
        getData: function () {
          var email = this.$route.query.email
          var validateCode = this.$route.query.validateCode
          axios.post("/api/register/department/activate", {
              email: email,
              validate_Code:validateCode
            })
            .then(res => {
              if (res.data.status === "200") {
                this.$message.success("激活成功！");
                setTimeout(()=>{this.$router.push('/')},3000)

              } else {
                this.$message.error("该邮箱尚未注册或者(激活码错误或者已经超时，请重新注册)！");
                setTimeout(()=>{this.$router.push('/register')},2000)
              }
            });
        }
      }
      ,created:function(){
      this.getData()
    }
    }
</script>

<style scoped>

</style>
