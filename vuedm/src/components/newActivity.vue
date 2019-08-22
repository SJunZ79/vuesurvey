<template>
  <el-main>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        date1: "",
        
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          this.postData();
        } else {
          alert("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    postData() {
      axios.post('/api/admin/activity/upload',{
        activity_name: this.ruleForm.name,
        time: this.ruleForm.date1,
        
      }).then(response => {
        if(response.data.status === 200){
          console.log(response.data);
          this.$message.success("请求成功！");
        }else{
          this.$message.error("请求失败！");
        }
      }).catch(function (error){
        console.log(error);
      });
    }
  }
};
</script>
