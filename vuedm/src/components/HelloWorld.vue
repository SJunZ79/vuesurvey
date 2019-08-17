<template>
  <el-container>
    <el-header fixed height="40px">
      <div class="name">后台管理界面</div>
      <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <i class="el-icon-arrow-down "></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="fanhui()">返回首页</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </span>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
          <el-menu-item index="/home">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-menu-item index="/nacty">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">新建活动</span>
          </el-menu-item>

          <el-menu-item index="/qiandao">
            <i class="el-icon-mobile"></i>
            <span slot="title">活动签到器</span>
          </el-menu-item>
          <el-menu-item index="/qingk">
            <i class="el-icon-document"></i>
            <span slot="title">签到情况查看</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-calendar v-model="value" v-if="uis"></el-calendar>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      uis: false,
      value: new Date()
    };
  },
  methods: {
    fanhui(){
      this.$router.push({ path: '/' }) 
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  background-color: #1e90ff;
}
.name {
  float: left;
  font-weight: bold;
  font-size: 25px;
}
.el-dropdown{
  float: right;
}
.el-avatar {
  
  background-color: #1e90ff;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>
