<template>
    
</template>

<script>
  import axios from "axios";
  export default {
    name: "Redirect",
    methods: {
      getCode: function () {
        var code = this.$route.query.code
        axios.post("/api/oauth/yiban/login", {
          code: code
        })
          .then(res => {
            if (res.data.status === "201") {
              this.$message.error("令牌已失效，请重新进行登录！");
              setTimeout(()=>{this.$router.push('/')},2000)
            } else if (res.data.status === "101"){
             this.$message.success("登录成功！");
              setTimeout(()=>{this.$router.push('/HelloWorld')},2000)
            }else if (res.data.status === "302"){
              this.$message.success("首次登录需绑定邮箱！");
              this.$router.push({ path:'/bindEmail' ,query:{open_id: res.data.data.open_id}});
            }
          });
      }
    }
    ,created:function(){
      this.getCode()
    }
  }
</script>

<style scoped>

</style>
