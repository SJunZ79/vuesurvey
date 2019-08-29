<template>
  <el-main>
    <div class="title">
      <div class="demo-input-suffix fl">
        <el-input placeholder="请输入活动名称" prefix-icon="el-icon-search" v-model="input21"></el-input>
      </div>
      <br />
      <div>
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          style="width: 100%"
        >
          <el-table-column prop="id" label="序号" width="80"></el-table-column>
          <el-table-column prop="name" label="活动名称" width="180"></el-table-column>
          <el-table-column prop="material" label="活动材料" width="220"></el-table-column>
          <el-table-column prop="material_uuid" label width="0" v-if="false"></el-table-column>
          <el-table-column prop="volunteer_time" label="志愿时文档" width="192"></el-table-column>
          <el-table-column prop="volunteer_time_uuid" label width="0" v-if="false"></el-table-column>
          <el-table-column prop="activity_prove" label="活动分文档" width="192"></el-table-column>
          <el-table-column prop="activity_prove_uuid" label width="0" v-if="false"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope" class="text-decoration">
              <el-button type="text" size="small">
                <router-link
                  :to="{path:'/visit', query : { material_uuid:scope.row.material_uuid , volunteer_time_uuid:scope.row.volunteer_time_uuid , activity_prove_uuid:scope.row.activity_prove_uuid , activity_id:scope.row.id,material:scope.row.material,volunteer_time:scope.row.volunteer_time,activity_prove:scope.row.activity_prove,name:scope.row.name}}"
                >查看</router-link>
              </el-button>
              <el-button type="text" size="small">
                <router-link
                  :to="{path:'/edit', query : { activity_id:scope.row.id,activity_name:scope.row.name,material:scope.row.material,volunteer_time:scope.row.volunteer_time,activity_prove:scope.row.activity_prove}}"
                >编辑</router-link>
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="delVisible=true"
              >删除</el-button>
              <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
                <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="delVisible = false">取 消</el-button>
                  <el-button type="primary" @click.native.prevent="deleteRow(scope.$index, tableData)" >确 定</el-button>
                </span>
              </el-dialog>
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
      tableData: [],
      delVisible:false
    };
  },
  methods: {
    /*headerStyle({row, column, rowIndex, columnIndex}){
      if(rowIndex === 0) {
        return 'background:transparent;color:#000;border:1px solid #fff;'
      }else{
        return ''
      }
    },
    cellStyle({row, column, rowIndex, columnIndex}){
      if(rowIndex !== 0){
        return 'background:rgba(119,136,153,0.5);color:#000;border:1px solid #fff;'
      }else{
        return ''
      }
    },*/
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(row) {
      console.log(row);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
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
          if (response.data.status === "403") {
            this.$message.error("用户未登录！");
            this.$router.push("/");
          } else {
            console.log(response.data);
            this.tableData = response.data.activities;
            this.tableData.forEach(item => {
              this.$set(item, "material_uuid", item.material);
              axios
                .post("/api/admin/activity/file/get", {
                  uuid: item.material
                })
                .then(response => {
                  this.$set(item, "material", response.data.name);
                })
                .catch(function(error) {
                  console.log(error);
                });
            });
            this.tableData.forEach(item => {
              this.$set(item, "volunteer_time_uuid", item.volunteer_time);
              axios
                .post("/api/admin/activity/file/get", {
                  uuid: item.volunteer_time
                })
                .then(response => {
                  this.$set(item, "volunteer_time", response.data.name);
                })
                .catch(function(error) {
                  console.log(error);
                });
            });
            this.tableData.forEach(item => {
              this.$set(item, "activity_prove_uuid", item.activity_prove);
              axios
                .post("/api/admin/activity/file/get", {
                  uuid: item.activity_prove
                })
                .then(response => {
                  this.$set(item, "activity_prove", response.data.name);
                })
                .catch(function(error) {
                  console.log(error);
                });
            });
          }
        },
        response => {
          console.log("error");
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
  }
};
</script>

<!--
<style>
.el-table th,
.el-table tr {
  background: transparent;
  color: #000;
  border: 1px solid #000;
}
.el-table,
.el-table__expanded-cell {
  background: transparent;
  border: 1px solid #000;
  color: #000;
}
</style>
-->
<style scoped>
a {
  text-decoration: none;
  color: #1e90ff;
}
.router-link-active {
  text-decoration: none;
  color: pink;
}
.el-input >>> .el-input__inner {
  -webkit-appearance: none;
  -moz-appearance: none;
  font-size: 1.2em;
  border-radius: 4px;
  border: 1px solid #000;
  color: #000;
  outline: 0;
}
</style>