<template>
  <el-main>
    <div class="title">
      <div class="demo-input-suffix fl">
        <el-input placeholder="请输入活动名称" prefix-icon="el-icon-search" v-model="input21"></el-input>
      </div>
      <div>
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          style="width: 100%"
        >
          <el-table-column prop="id" label="序号" width="80"></el-table-column>
          <el-table-column prop="name" label="活动名称" width="180"></el-table-column>
          <el-table-column prop="material" label="活动材料" width="220"></el-table-column>
          <el-table-column prop="volunteer_prove" label="志愿时文档" width="180"></el-table-column>
          <el-table-column prop="activity_prove" label="活动分文档" width="180"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope class="text-decoration">
              <el-button type="text" size="small">
                <router-link to="/visit">查看</router-link>
              </el-button>
              <el-button type="text" size="small">
                <router-link to="/edit">编辑</router-link>
              </el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pagesize"
            layout="total, sizes,prev, pager, next"
            :total="tableData.length"
            prev-text="上一页"
            next-text="下一页"
          ></el-pagination>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
import axios from "axios";
export default {
  name: "list11",
  data() {
    return {
      isCollapse: true,

      total: 1000, //默认数据总数
      pagesize: 7, //每页的数据条数
      currentPage: 1, //默认开始页面
      istag: true,
      input: "",
      input21: "",
      tableData: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(row) {
      console.log(row);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "th";
      }
      return "";
    },
    switchChange() {
      this.istag = !this.istag;
    },
    created: function() {
      this.total = this.tableData.length;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    getData() {
      axios.get("/api/admin/activity/getAllActivity").then(
        response => {
          console.log(response.data);
          this.tableData = response.data
        },
        response => {
          console.log("error");
        }
      );
    },
    postData() {
      axios.post('/api/admin/file/get',{
        material: this.tableData.material,
        volunteer_prove: this.tableData.volunteer_prove,
        activity_prove: this.tableData.activity_prove
      }).then(response => {
        response = this.tableData;
        console.log(response);
      }).catch(function(error){
        console.log(error);
      });
    },
    getthree() {
      axios.get("/api/admin/file/get").then(
        response => {
          console.log(response.data);
          this.tableData = response.data;
        },
        response => {
          console.log(error);
        }
      );
    },
    //每页下拉显示数据
    handleSizeChange: function(size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      /*console.log(this.currentPage) */
    }
  },
  mounted() {
    this.getData();
    this.postData();
    this.getthree();
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #1e90ff;
}
.router-link-active {
  text-decoration: none;
  color: pink;
}
</style>