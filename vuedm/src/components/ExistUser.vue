<template>
  <el-dialog title="确认组织学院信息" :visible.sync="showDialog" width="70%" :show-close="false">
    <el-form ref="tt" :model="tt" label-width="80px">
      <el-form-item label="所属学院">
        <el-input v-model="tt.college" label-width="80px" :disabled="true" class="ll">
          </el-input>
      </el-form-item>
      <el-form-item label="组织名称">
        <el-input v-model="tt.dept_name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"   size="small" @click="showDialog=false" round>取  消</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="dopost()" round>确  定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import axios from "axios";
    export default {
        name: "ExistUser",
      props:[
        'open_id',
        'account',
        'dept_name',
        'college'
      ]
      ,
      data() {
        return {
          showDialog: false,
          tt: {
            college: '',
            dept_name: ''
          }
        }
      },
      methods: {
        createex() {
          console.log(this.college);
          console.log(this.dept_name);
          this.showDialog = true;
        },
        getInfo(){

          this.$set(this.tt,'college',this.college);
          this.$set(this.tt,'dept_name',this.dept_name);
          console.log(this.college);
          console.log(this.dept_name);
},
        dopost(){
          this.showDialog = false;

          axios.post("/api/oauth/yiban/bind", {
            open_id:this.open_id,
            account:this.account
          })
            .then(res => {
              if (res.data.status === "200") {
                this.$message.success("绑定成功！");
                this.$router.push('/HelloWorld');
              } else {
                this.$message.error("绑定出错！");
              }
            });
        }
      }
    }
</script>
<style>
  .el-input.is-disabled .el-input__inner{
    color: #071d50;
  }
</style>
<style scoped>

</style>
