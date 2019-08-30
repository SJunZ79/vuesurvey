<template>
  <el-dialog title="请补充以下信息" :visible.sync="showDialog" width="70%" :show-close="false">
    <el-form ref="ttt" :model="ttt" label-width="80px">
      <el-form-item label="所属学院">
        <el-select v-model="ttt.college" @change="choseCollege" placeholder="所属学院" class="college-in" clearable>
          <el-option v-for="item in ccollege"
                     :key="item.id"
                     :lable="item.value"
                     :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组织名称">
        <el-select v-model="ttt.dept_name" placeholder="组织名称" class="dept-in" clearable>
          <el-option v-for="item in deptname1"
                     :key="item.id"
                     :lable="item.value"
                     :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="ttt.password" show-password placeholder="密码"  class="pass-in"></el-input>
      </el-form-item>
      <el-form-item prop="cpassword" label="确认密码">
        <el-input v-model="ttt.cpassword" show-password placeholder="确认密码"  class="cpass-in"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="showDialog=false" round>取  消</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dopost()" round>确  定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import axios from "axios";
  export default {
    name: "ExistUser",
    props:[
      'open_id',
      'account'
    ]
    ,
    data() {
      return {
        ttt: {
          college:"",
          dept_name:"",
          password: "",
          cpassword: "",
        },
        showDialog: false,
        ccollege:'',
        cdeptname:'',
        deptname1: [],
        collegeDataJson:'../../static/jjson/collegeData.json',
        rules: {
          college: [{ message: "所属学院不能为空", trigger: "blur" }],
          dept_name: [{ message: "组织名称不能为空", trigger: "blur" }],
          password: [{ message: "密码不能为空", trigger: "blur" }],
          cpassword: [{ message: "确认密码不能为空", trigger: "blur" }]
        }
      }
    },
    methods: {
      //获取所有的学院组织信息
      getCollegeData:function(){
        var that = this
        axios.get(this.collegeDataJson).then(function(response){
          var data = response.data
          console.log(data)
          that.ccollege = []
          that.cdeptname = []
          // 数据分类
          for (var item in data) {
            if (item.match(/0000$/)) {//学院
              that.ccollege.push({id: item, value: data[item], children: []})
            } else if (item.match(/00$/)) {//组织
              that.cdeptname.push({id: item, value: data[item], children: []})
            }
          }
          // 分类组织
          for (var index in that.ccollege) {
            for (var index1 in that.cdeptname) {
              if (that.ccollege[index].id.slice(0, 2) === that.cdeptname[index1].id.slice(0, 2)) {
                that.ccollege[index].children.push(that.cdeptname[index1])
              }
            }
          }
        }).catch(function(error){console.log(typeof+ error)})
      },
//使组织选择器跟着变化事件
      choseCollege:function(e) {
        for (var index2 in this.ccollege) {
          if (e === this.ccollege[index2].value) {
            this.deptname1 = this.ccollege[index2].children
            this.ttt.dept_name = this.ccollege[index2].children[0].value
          }
        }
      },
      createno() {
        this.showDialog = true;
      },
      dopost() {
        if (!this.ttt.college) {
          this.$message.error("请输入所属学院名称！");
          return;
        } else if (!this.ttt.dept_name) {
          this.$message.error("请输入组织名称！");
          return;
        } else if (!this.ttt.password) {
          this.$message.error("请输入密码！");
          return;
        } else if (!this.ttt.cpassword) {
          this.$message.error("请再次输入密码！");
          return;
        } else if (this.ttt.cpassword != this.ttt.password) {
          this.$message.error("两次输入密码不一致！");
          return;
        }else{
        this.showDialog = false;
        axios.post("/api/oauth/yiban/bind", {
          open_id: this.open_id,
          account: this.account,
          password: this.ttt.password,
          college: this.ttt.college,
          dept_name: this.ttt.dept_name

        })
          .then(res => {
            if (res.data.status === "200") {
              this.$message.success("登录成功！");
              this.$router.push('/HelloWorld');
            } else {
              this.$message.error("绑定出错！");
            }
          });
      }
      }
    }
    ,created:function(){
      this.getCollegeData()
    }
  }
</script>

<style scoped>

</style>
