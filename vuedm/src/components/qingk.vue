<template>
  <el-main>
    <!--<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>-->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm inline-block"
    >
      <el-form-item label="活动名称" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动名称" @focus="function1">
          <el-option v-for="item in data" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <br />
    <br />
    <br />
    <el-button type="primary" plain class="wor" @click="submitForm('ruleForm')"><a :href="wordhref">导出Word</a></el-button>
  </el-main>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      ruleForm: {
        region: ""
      },
      data: [],
      rules: {
        region: [
          { required: true, message: "请选择活动名称", trigger: "blur" }
        ]
      },
      wordhref:''
    };
  },
  methods: {
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.getWord();
        } else {
          alert("导出失败！");
          return false;
        }
      });
    },
    getWord() {
      this.wordhref = '/api/admin/signed/export?activity_id=' + this.ruleForm.region;
      axios
        .get("/api/admin/signed/export", {
          params: { activity_id: this.ruleForm.region }
        })
        .then(response => {
          if(response.data.status === "200"){
            this.$message.success("提交成功！");
          }
        })
        .catch(function(error) {
          console.log("error");
        });
    }
  }
};
</script>

<style scoped>
.inline-block {
  display: inline-block;
}
.check {
  background-color: dodgerblue;
}
.wor {
  margin-left: 20px;
}
a{
  text-decoration: none;
}
</style>