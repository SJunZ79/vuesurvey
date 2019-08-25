<template>
  <el-container>
    <el-header fixed height="40px">
      <div class="name">后台管理界面</div>
      <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <i class="el-icon-arrow-down"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="fanhui()">返回首页</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </span>
        </el-dropdown>
      </div>
    </el-header>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>活动名称：{{ activity }}</span>
        </div>
        <div class="text item">
          <p class="inline-block">活动材料：{{ material }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <el-button
            type="primary"
            icon="el-icon-view"
            @click="getZip();dialogTableVisible = true"
          >预览图片</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-dialog title="图片预览" :visible.sync="dialogTableVisible" :width="width">
            <img
              v-for="item in images"
              :key="item.contentType"
              :src="'data:image/jpeg;base64,'+item.base64Str"
              @load="onLoad"
            />
          </el-dialog>
          <el-button type="primary" icon="el-icon-download">下载文档</el-button>
          <br />
          <br />
          <p class="inline-block">志愿时证明材料：{{ volunteer_prove }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <el-button type="primary" icon="el-icon-view" @click="dialogTable=true">预览图片</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-dialog title="图片预览" :visible.sync="dialogTable" :width="width">
            <el-table :data="volunteerData" height="250" border style="width: 100%">
              <el-table-column prop="stuNum" label="学号" width="180"></el-table-column>
              <el-table-column prop="stuName" label="姓名" width="180"></el-table-column>
              <el-table-column prop="stuClass" label="班级"></el-table-column>
            </el-table>
          </el-dialog>
          <el-button type="primary" icon="el-icon-picture-outline">下载图片</el-button>
          <br />
          <br />
          <p class="inline-block">活动分证明材料：{{ activity_prove }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <el-button type="primary" icon="el-icon-view" @click="Table=true">预览图片</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-dialog title="图片预览" :visible.sync="Table" :width="width">
            <el-table :data="activityData" height="250" border style="width: 100%">
              <el-table-column prop="stuNum" label="学号" width="180"></el-table-column>
              <el-table-column prop="stuName" label="姓名" width="180"></el-table-column>
              <el-table-column prop="stuClass" label="班级"></el-table-column>
            </el-table>
          </el-dialog>
          <el-button type="primary" icon="el-icon-picture-outline">下载图片</el-button>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activity: this.$route.query.name,
      material: this.$route.query.material,
      volunteer_prove: this.$route.query.volunteer_time,
      activity_prove: this.$route.query.activity_prove,
      width: "",
      dialogTableVisible: false,
      images: [],
      volunteerData: [],
      activityData: [],
      dialogTable: false,
      Table: false
    };
  },
  methods: {
    onLoad(e) {
      const img = e.target;
      let width = 0;
      if (img.fileSize > 0 || (img.width > 1 && img.height > 1)) {
        width = img.width + 40;
      }
      this.width = width + "px";
    },
    getZip() {
      axios
        .post("/api/admin/activity/getZipContent", {
          uuid: this.$route.query.material_uuid
        })
        .then(response => {
          this.images = response.data.images;
        })
        .catch(function(error) {
          console.log("error");
        });
    },
    getVolun() {
      axios
        .post("/api/admin/activity/getDocParseData", {
          uuid: this.$route.query.volunteer_time_uuid,
          file_type:1,
          activity_id:this.$route.query.activity_id
        })
        .then(response => {
          this.volunteerData = response.data.parse_data;
        })
        .catch(function(error) {
          console.log("error");
        });
    },
    getActivity() {
      axios
        .post("/api/admin/activity/getDocParseData", {
          uuid: this.$route.query.activity_prove_uuid,
          file_type:0,
          activity_id:this.$route.query.activity_id
        })
        .then(response => {
          this.activityData = response.data.parse_data;
        })
        .catch(function(error) {
          console.log("error");
        });
    },
    fanhui() {
      this.$router.push({ path: "/HelloWorld" });
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #1e90ff;
}
.name {
  float: left;
  font-weight: bold;
  font-size: 25px;
}
.el-dropdown {
  float: right;
}
.el-avatar {
  background-color: #1e90ff;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.visited {
  margin-left: 450px;
}
.inline-block {
  display: inline-block;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>