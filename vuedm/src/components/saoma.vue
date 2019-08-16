<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>签到填写：</span>
    </div>
    <div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="number">
            <el-input v-model="ruleForm.number"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="stri">
            <el-input v-model="ruleForm.stri"></el-input>
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
        name: "",
        number: "",
        stri: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        number: [
            { required: true, message: "请输入学号",trigger: "blur"}
        ],
        stri: [
            { required: true, message: "请输入年级班级", trigger: "blur"}
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
      axios.post('/user/newActivity',{
        name: this.ruleForm.name,
        number: this.ruleForm.number,
        stri: this.ruleForm.stri
      }).then(response => {
        response = this.ruleForm;
        console.log(response);
      }).catch(function (error){
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
.clearfix{
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