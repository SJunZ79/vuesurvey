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
      <el-aside width="190px" >
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
          <el-menu-item index="/HelloWorld/home">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-menu-item index="/HelloWorld/nacty">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">新建活动</span>
          </el-menu-item>

          <el-menu-item index="/HelloWorld/qiandao">
            <i class="el-icon-mobile"></i>
            <span slot="title">活动签到器</span>
          </el-menu-item>
          <el-menu-item index="/HelloWorld/qingk">
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
      this.$router.push({ path: '/HelloWorld' }) 
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container{
  height: 600px;
}
.el-header {
  background-color:rgba(30,144,255, 0.5);
}
.name {
  float: left;
  font-weight: bold;
  font-size: 25px;
  width:168px;
  border-right:1px solid #fff;
}
.el-aside{
  height: 560px;
  background-color:rgba(0,191,255,0.5);
  border-right: 1px solid #fff;
}
.el-menu-vertical-demo{
  background-color:rgba(0,191,255,0);
  border-right: none;
}
.el-dropdown{
  float: right;
}
.el-avatar {
  
  background-color:rgba(135,206,235,0);
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
