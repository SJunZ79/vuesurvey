<template>
  <el-main>
    <el-form
      :model="qianForm"
      :rules="rules"
      ref="qianForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="region">
        <el-select id="sel" v-model="qianForm.region" placeholder="请选择活动区域" @focus="function1">
          <el-option v-for="item in data" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="签到截止时间" required>
        
        
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-input-number v-model="qianForm.date2" @change="handleChange" :min="1" :max="120" ></el-input-number>&nbsp;&nbsp;min
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <!--<router-link to="/code" class="text-decoration">-->
          <el-button type="primary" @click="submitForm('qianForm')">生成二维码</el-button>
        
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      qianForm: {
        region: "",
        
        date2: 1
      },
      data: [],
      rules: {
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        
        date2: [
          {
            type: "number",
            required: true,
            message: "请选择签到截止时间",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handleChange(value) {
        console.log(value);
      },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          this.sendData();
          this.toURL();
        } else {
          alert("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    function1() {
      axios.get("/api/admin/activity/upload").then(
        response => {
          console.log(response.data);
          this.data = response.data;
        },
        response => {
          console.log("error");
        }
      );
    },
    sendData() {
      var activity_id = document.getElementById("sel").value;
      axios
        .post("/api/admin/signed/create", {
          activity_id: this.activity_id,
          date2: this.qianForm.date2 *60,
          url: "http://localhost:8080/code"
        })
        .then(response => {
          response = this.active_name;
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toURL() {
      this.$router.push({ path: '/code' }) 
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #fff;
}
.router-link-active {
  text-decoration: none;
}
</style>