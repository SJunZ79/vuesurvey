<template>
  <el-main>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="name" >
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
      <div class="material">
        <p>活动材料上传：</p>
        <el-upload
          class="upload-demo"
          action
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :beforeUpload="beforeFirstUpload"
          :http-request="loadZip"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传zip文件，且不超过10MB</div>
        </el-upload>
      </div>
      <div class="material">
        <p>志愿时证明材料上传：</p>
        <el-upload
          class="upload-demo"
          action
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :beforeUpload="beforeAvatarUpload"
          :http-request="uploadImg"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传doc/docx文件，且不超过10MB</div>
        </el-upload>
      </div>
      <div class="material">
        <p>活动分证明材料上传：</p>
        <el-upload
          class="upload-demo"
          action
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :beforeUpload="beforeAvatarUpload"
          :http-request="uploadImg"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传doc/docx文件，且不超过10MB</div>
        </el-upload>
        <br>
      </div>
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
        date1: ""
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
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
      axios
        .post("/api/admin/activity/upload", {
          activity_name: this.ruleForm.name,
          time: this.ruleForm.date1
        })
        .then(response => {
          if (response.data.status === "200") {
            console.log(response.data);
            this.$message.success("请求成功！");
          } else {
            this.$message.error("请求失败！");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeFirstUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "zip";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!extension && !extension2) {
        this.$message({
          message: "上传文件只能是 zip格式!",
          type: "warning"
        });
      }
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 10MB!",
          type: "warning"
        });
      }
      return extension || (extension2 && isLt2M);
    },
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "doc";
      const extension2 = testmsg === "docx";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!extension && !extension2) {
        this.$message({
          message: "上传文件只能是 doc、docx格式!",
          type: "warning"
        });
      }
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 10MB!",
          type: "warning"
        });
      }
      return extension || (extension2 && isLt2M);
    },

    uploadZip(fileObj) {
      let formData = new FormData();
      formData.set("file", fileObj.file);
      axios
        .post("/api/admin/activity/editActivity", formData, {
          headers: {
            "Content-type": "multipart/form-data"
          }
        })
        .then()
        .catch();
      //POST传参序列化
      axios.interceptors.request.use(
        config => {
          console.log(config, "request");
          if (config.method === "post") {
            let curPost = config.url.split("/")[
              config.url.split("/").length - 1
            ];
            if (curPost === "uploadpicture" || curPost === "uploadfile") {
              return config; // 这里对上传文件/图片的 api 不做传参序列化处理
            } else {
              config.data = qs.stringify(config.data);
              return config;
            }
          }
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  }
};
</script>

<style scoped>
.el-input {
  width: 395px;
}
.material {
  margin-left: 30px;
}
.upload-demo {
  width: 350px;
}
</style>