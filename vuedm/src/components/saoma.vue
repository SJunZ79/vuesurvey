<template>
  <div class="saoma">
    <div slot="header" class="clearfix">
      <span>签到填写：{{ activity_name }}</span>
    </div>
    <br />
    <div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        style="width:90%;"
      >
        <el-form-item label="学号" prop="stuID">
          <el-input v-model="ruleForm.stuID"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="stuName">
          <el-input v-model="ruleForm.stuName"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="stuProfession">
          <el-input v-model="ruleForm.stuProfession"></el-input>
        </el-form-item>
        <el-form-item label="专业班级" prop="stuClass">
          <el-input v-model="ruleForm.stuClass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="text-align:center;">签到</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
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
        stuProfession: "",
        stuClass: ""
      },
      rules: {
        stuID: [{ required: true, message: "请输入学号", trigger: "blur" }],
        stuName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        stuProfession: [
          { required: true, message: "请输入年级", trigger: "blur" }
        ],
        stuClass: [
          { required: true, message: "请输入专业班级", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postData();
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
          stuProfessionAndClass:
            this.ruleForm.stuProfession + this.ruleForm.stuClass
        })
        .then(response => {
          if (response.data.status === "200") {
            this.$message.success("提交成功！");
            console.log(response.data);
          } else {
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
.saoma{
  background: url(../assets/afterimg/saoma.jpg) no-repeat;
  background-size: cover;
  height:100%;
  position: fixed;
  width:100%;
  
}
.demo-ruleForm >>> .el-form-item__label{
  color:#fff;
}
.text {
  font-size: 14px;
}
.clearfix {
  text-align: center;
  padding-top: 180px;
  color: #fff;
}
.el-input >>> .el-input__inner {
  -webkit-appearance: none;
  -moz-appearance: none;
  font-size: 1.2em;
  border-radius: 4px;
  border: 1px solid #fff;
  background-color: rgba(119, 136, 153, 0.5);
  color: #fff;
  outline: 0;
}

</style>