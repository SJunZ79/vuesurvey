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
              <el-dropdown-item @click="tuichu()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </span>
        </el-dropdown>
      </div>
    </el-header>
    <el-main>
      <div>
        <el-form ref="newform" :model="newform" :rules="rules" label-width="150px">
          <el-form-item prop="expName" label="活动名称" required>
            <el-input v-model="newform.expName" placeholder style="width:75%"></el-input>
          </el-form-item>
          <el-form-item prop="expSn" label="活动时间" required>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="newform.expSn"
              style="width: 75%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="活动材料:" prop="expvmInstruction">{{ isupload }}
            <el-upload
              class="upload-demo"
              drag
              ref="uploadhtml"
              :action="upload_url"
              :auto-upload="false"
              :before-upload="newHtml"
              accept=".zip"
            >
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div slot="tip" class="el-upload__tip">活动材料上传，只能传(.zip)文件</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="志愿时证明材料:" prop="expvmFiles">{{ isup }}
            <el-upload
              class="upload-demo"
              drag
              ref="uploadfile"
              :action="upload_url"
              :auto-upload="false"
              :before-upload="newFiles"
              accept=".doc, .docx"
            >
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div slot="tip" class="el-upload__tip">志愿时证明材料上传，只能传(.doc/.docx)文件</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="活动分证明材料:" prop="expvmVideo">{{ isu }}
            <el-upload
              class="upload-demo"
              drag
              ref="uploadvideo"
              :action="upload_url"
              :auto-upload="false"
              :before-upload="newVideo"
              accept=".doc, .docx"
            >
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div slot="tip" class="el-upload__tip">活动分证明材料上传，只能传(.doc/.docx)文件</div>
            </el-upload>
          </el-form-item>
          <el-form-item style="text-align:center">
            <el-button type="primary" @click="newSubmitForm()" class="yes-btn">确 定</el-button>
            <el-button @click="resetForm('newform')">重 置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import axios from "axios";
  export default {
    name: "Ha",
    data () {

      return {
        
        upload_url: 'aaa',       // 随便填一个，但一定要有
        uploadForm: new FormData(),   // 一个formdata
        newform: {
          expName: '',
          expSn: '',
        },
        isupload:'',
        isup:'',
        isu:'',
        rules: {
        expName: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        expSn: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ]
      },
      }
    },


    methods: {
      newSubmitForm () {          //按钮确定 对应的函数
        this.$refs['newform'].validate((valid) => {
          if (valid) {
            this.uploadForm.append('activity_id',this.$route.query.activity_id)
            this.uploadForm.append('activity_name', this.newform.expName)         //这些就是你要附加的参数啦，那个uploadForm 在前面return里面就定义了，自己不要忘了
            this.uploadForm.append('time', this.newform.expSn)

            axios.post('/api/admin/activity/editActivity',this.uploadForm).then(res => {
              if (res.code === 400) {
                this.$message.error(res.error)
              } else if (res.code === 200) {
                this.$message.success('上传成功！')

              }
            });
            this.$refs.uploadhtml.submit()   // 这个就是前面说的“ref”对应的函数，有文件上传时就会触发，提交时先触发了before-upload函数往表单里面增加文件，接下面注释
            this.$refs.uploadfile.submit()  //，增加完等确认按钮按下去就会一起提交过去，没有上传文件时是不会被触发的，也就不会往表单里面增加文件
            this.$refs.uploadvideo.submit()

          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      newHtml (file) {   //三个upload  对应的 before-upload 函数，主要是用来append  文件的
        this.uploadForm.append('material', file)//里面‘html’自己取名字，是文件的参数名！！!!!！！！！1!!!
        return false
      },
      newFiles (file) {
        this.uploadForm.append('volun_doc', file)//如果某一个upload可以同时选择多个文件的话，一定要用数组！！！！！
        return false
      },
      newVideo (file) {
        this.uploadForm.append('act_doc', file)
        return false
      },
      judgeload1(){
        if(this.$route.query.material === null){
          this.isupload = "未上传"
        }else{
          this.isupload = "重新上传"
        }
      },
      judgeload2(){
        if(this.$route.query.volunteer_time === null){
          this.isup = "未上传"
        }else{
          this.isup = "重新上传"
        }
      },
      judgeload3(){
        if(this.$route.query.activity_prove === null){
          this.isu = "未上传"
        }else{
          this.isu = "重新上传"
        }
      }
    },
    mounted(){
      judgeload1(),
      judgeload2(),
      judgeload3()
    }
  }
</script>

<style>
.el-form-item__label{
  color:#fff;
}
</style>
<style scoped>
.el-header {
  background-color:rgba(135,206,235,0.5);
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
  background-color:rgba(255,182,193,0.5);
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.el-input {
  width: 350px;
}
.material {
  margin-left: 30px;
}
.upload-demo {
  width: 350px;
}
</style>