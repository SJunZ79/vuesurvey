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
        <el-select id="sel" v-model="qianForm.region" placeholder="请选择活动名称" @focus="function1">
          <el-option v-for="item in data" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="签到截止时间" required>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-input-number v-model="qianForm.date2" @change="handleChange" :min="1" :max="120"></el-input-number>&nbsp;&nbsp;min
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
          { required: true, message: "请选择活动名称", trigger: "change" }
        ],

        date2: [
          {
            type: "number",
            required: true,
            message: "请选择签到截止时间",
            trigger: "change"
          }
        ]
      },
      token: "",
      validaty: 0
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
      axios.get("/api/admin/activity/getAllActivity").then(
        response => {
          console.log(response.data.activities);
          this.data = response.data.activities;
        },
        response => {
          console.log("error");
        }
      );
    },
    sendData() {
      axios
        .post("/api/admin/signed/create", {
          id: this.qianForm.region,
          validity: this.qianForm.date2 * 60,
          url: "http://localhost:8080/middle"
        })
        .then(response => {
          if (response.data.status === 200) {
            this.$message.success("提交成功！");
            this.token = response.data.token;
            this.validaty = response.data.validaty;
            console.log(response);
            this.toURL();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toURL() {
      this.$router.push({ path: "/code", query: { token: this.token } });
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