<template>
  <el-container>
    <el-container style="width:50%;border-right:1px solid #000;height:600px;">
      <el-header class="header">
        <span class="name">{{ activity_name }}</span>
      </el-header>
      <el-main>
        <el-table :data="tableData" height="420px" border style="width: 100%;">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </el-main>
      <el-footer style="text-align:center;">
        <span class="footer">一分钟刷新一次</span>
      </el-footer>
    </el-container>
    <el-container style="width:50%;">
      <el-main>
        <div class="img">
          <img :src="srbase" width="300px" height="300px" />
        </div>
        <br />
        <div class="codename">
          <span>签到二维码 （1s刷新1次）</span>
        </div>
      </el-main>
      <el-footer class="btn">
        <el-button type="primary" plain @click="stopcode">点击停止签到</el-button>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activity_name: "",
      srbase: "",
      validity: 0,
      codeid: "",
      tableid:"",
      tableData: []
    };
  },
  methods: {
    getData() {
      this.activity_name = this.$route.query.activity_name;
      axios
        .get("/api/admin/signed/getQRCode", {
          params: { token: this.$route.query.token }
        })
        .then(response => {
          if (response.data.status === "201") {
            clearInterval(this.codeid);
            clearInterval(this.tableid);
            this.$message.error("签到结束！");
          } else {
            console.log(response.data);
            this.validity = response.data.validity;
            this.srbase = "data:image/jpeg;base64," + response.data.qr_code;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getTable() {
      axios
        .get("/api/admin/signed/signInList", {
          params: { token: this.$route.query.token }
        })
        .then(response => {
          this.tableData = response.data.data;
          console.log(response.data.data);
        })
        .catch(function(error) {
          this.$message.error("请求失败！");
        });
    },
    stopcode() {
        axios.post("/api/admin/signed/stop",
        {token: this.$route.query.token}
        ).then(response => {
            if(response.data.status === "200"){
                this.$message.success("请求成功！");
                clearInterval(this.codeid);
                clearInterval(this.tableid);
            }else{
                this.$message.error("请求失败！");
            }
        })
      
    }
  },
  mounted() {
    this.getTable();
    this.getData();
    this.codeid = setInterval(this.getData, 1000);
    this.tableid = setInterval(this.getTable,60000);
  }
};
</script>

<style scoped>
.header {
  margin-top: 10px;
  margin-bottom: 0px;
  text-align: center;
  border-bottom: 1px solid #000;
}
.name {
  margin-top: 30px;
  margin-bottom: 0px;
  font-size: 25px;
}
.footer {
  text-align: center;
  font-size: 20px;
}
.img {
  margin-top: 10%;
  margin-left: 25%;
}
.codename {
  text-align: center;
}
.btn {
  text-align: center;
  margin-bottom: 20px;
}
</style>