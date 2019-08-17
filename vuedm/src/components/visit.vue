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
          <el-button type="primary" icon="el-icon-download">下载文档</el-button>
          <br />
          <br />
          <p class="inline-block">志愿时证明材料：{{ volunteer_prove }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <el-button type="primary" icon="el-icon-view" @click="dialogTableVisible = true">预览图片</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-dialog title="图片预览" :visible.sync="dialogTableVisible" :width="width">
            <img src="../assets/心理知识竞赛活动证明.jpg" @load="onLoad" />
          </el-dialog>

          <el-button type="primary" icon="el-icon-picture-outline">下载图片</el-button>
          <br />
          <br />
          <p class="inline-block">活动分证明材料：{{ activity_prove }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <el-button type="primary" icon="el-icon-view">预览图片</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="primary" icon="el-icon-picture-outline">下载图片</el-button>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activity: "年年有余！",
      material: "enough.word",
      volunteer_prove: "enough.jpg",
      activity_prove: "satisfaction.jpg",
      width: "",
      dialogTableVisible: false
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
    fanhui(){
      this.$router.push({ path: '/' }) 
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