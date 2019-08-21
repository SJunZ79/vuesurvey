<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>签到填写：{{ activity_name }}</span>
    </div>
    <div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="学号" prop="stuID">
          <el-input v-model="ruleForm.stuID"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="stuName">
          <el-input v-model="ruleForm.stuName"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="stuProfessionAndClass">
          <el-input v-model="ruleForm.stuProfessionAndClass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="text-align:center;">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      ruleForm: {
        activity_name: this.$route.query.activity_name,
        stuName: "",
        stuID: "",
        stuProfessionAndClass: ""
      },
      rules: {
        stuID: [{ required: true, message: "请输入学号", trigger: "blur" }],
        stuName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        stuProfessionAndClass: [
          { required: true, message: "请输入年级班级", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postData();
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    postData() {
      axios
        .post("/api/admin/signed/doSignedIn", {
          token: this.$route.query.urltoken,
          stuName: this.ruleForm.stuName,
          stuID: this.ruleForm.stuID,
          stuProfessionAndClass: this.ruleForm.stuProfessionAndClass
        })
        .then(response => {
          if(response.data.status === "200"){
            this.$message.success("提交成功！");
            console.log(response.data);
          }else{
            this.$message.error("提交失败！");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.clearfix {
  text-align: center;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>