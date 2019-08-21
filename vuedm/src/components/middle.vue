<template></template>

<script>
import axios from "axios";
export default {
  data() {
      return {
          activity_name: "",
          urltoken: ""
      }
  },
  methods: {
    judgeToken() {
      axios
        .get("/api/admin/signed/redirect", {
          params: { token: this.$route.query.token }
        })
        .then(response => {
            console.log(response.data);
            if(response.data.status === "302"){
                this.activity_name = response.data.activity_name;
                this.urltoken = response.data.token;
                this.$router.push({ path: '/saoma' ,query:{activity_name:this.activity_name,urltoken:this.urltoken}});
            }else if(response.data.status === "303"){
                this.$message.error("禁止跳转！");
            }
        });
    }
  },
  mounted() {
      this.judgeToken();
  }
};
</script>