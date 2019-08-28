<template>
<div class="button">
    <el-button class="an" type="success" icon="el-icon-coordinate" circle @click="saomacode()">生成二维码</el-button>
</div>
</template>

<script>
export default {
    data(){
        return {
            token:this.$route.query.token,
            getName: this.$route.query.activity_name
        }
    },
    methods:{
        saomacode(){
            this.$router.push({ path: "/code", query: { token: this.token , activity_name: this.getName} });
        }
    }
}
</script>

<style scoped>
.button{
  background: url(../assets/afterimg/button.jpg) no-repeat;
  background-size: cover;
  height:100%;
  position: fixed;
  width:100%;
  
}
.an{
    margin-top: 200px;
    margin-left:30%;
    padding: 10% 10%;
    background-color: rgba(119, 136, 153, 0.5);
    border: 1px solid #fff;
}
</style>