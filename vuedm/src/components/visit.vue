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
          <el-button type="primary" icon="el-icon-view" @click="getZip();dialogVisible = true">预览图片</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-dialog title="图片预览" :visible.sync="dialogVisible" width="600px">
            <el-carousel :interval="4000" height="700px" indicator-position="none">
              <el-carousel-item v-for="item in images" :key="item.contentType">
                
                <el-image
                  :src="'data:image/jpeg;base64,'+item.base64Str"
                  fit="contain"
                  style="width:500px;height:700px;"
                  :preview-src-list="images"
                ></el-image>
                
              </el-carousel-item>
            </el-carousel>
          </el-dialog>
          <!--
          <el-dialog title="图片预览" :visible.sync="dialogTableVisible" :width="width">
            <img
              v-for="item in images"
              :key="item.contentType"
              :src="'data:image/jpeg;base64,'+item.base64Str"
              @load="onLoad"
            />
          </el-dialog>
          -->
          <el-button type="primary" icon="el-icon-download">下载文档</el-button>
          <br />
          <br />
          <p class="inline-block">志愿时证明材料：{{ volunteer_prove }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <el-button type="primary" icon="el-icon-view" @click="getVolun();dialogTable=true">预览数据</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-dialog title="预览数据" :visible.sync="dialogTable" width="700px">
            <el-table :data="volunteerData" height="250" border style="width: 100%;height:700px;">
              <el-table-column prop="stuNum" label="学号" width="180"></el-table-column>
              <el-table-column prop="stuName" label="姓名" width="180"></el-table-column>
              <el-table-column prop="stuClass" label="班级"></el-table-column>
            </el-table>
          </el-dialog>
          <el-button type="primary" icon="el-icon-picture-outline">下载图片</el-button>
          <br />
          <br />
          <p class="inline-block">活动分证明材料：{{ activity_prove }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <el-button type="primary" icon="el-icon-view" @click="getActivity();Table=true">预览数据</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-dialog title="预览数据" :visible.sync="Table" width="700px">
            <el-table :data="activityData" height="250" border style="width: 100%;height:700px;">
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
      
      dialogTableVisible: false,
      images: [],
      volunteerData: [],
      activityData: [],
      dialogTable: false,
      Table: false,
      dialogVisible: false
    };
  },
  methods: {
    /*onLoad() {
      this.$nextTick(() => {
        this.width = this.$refs.bannerHeight[0].width;
        this.bannerHeight = this.$refs.bannerHeight[0].height;
        console.log(this.$refs.bannerHeight[0].height);
      });
    },*/
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
          file_type: 1,
          activity_id: this.$route.query.activity_id
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
          file_type: 0,
          activity_id: this.$route.query.activity_id
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
  },
  /*mounted() {
    this.onLoad();
    window.addEventListener(
      "resize",
      () => {
        this.width = this.$refs.bannerHeight[0].width;
        this.bannerHeight = this.$refs.bannerHeight[0].height;
        this.onLoad();
      },
      false
    );
  }*/
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