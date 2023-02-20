<template>
  <div>
    <el-form  ref="queryForm" :inline="true" :model="select">
      <el-form-item label="年级：">
        <el-select v-model="select.subjectSearch" placeholder="年级" clearable="">
          <el-option v-for="item in levelEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="selectBtn()">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="createBtn()">创建</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"><a :href='"dev-api/excel/downloadExcel"' >模板下载</a></el-button>
      </el-form-item>

      <el-form-item>
        <el-upload
          ref="upload"
          class="upload-demo"
          action="dev-api/excel/uploadExcel"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-exceed="handleExceed"
          :on-success="onSuccessFile"
          :on-error="onErrorFile"
          :show-file-list="false"
          accept=".xlsx, .xls"
          >
          <el-button type="primary">模板导入</el-button>
        </el-upload>
      </el-form-item>


    </el-form>

    <el-table
      :data="list"
      border
      style="width: 100%;">
      <el-table-column
        prop="id"
        label="id"
        width="240">
      </el-table-column>
      <el-table-column
        prop="name"
        label="学科"
        width="240"
      >
      </el-table-column>
      <el-table-column
        prop="levelName"
        label="年级"
        width="240">
      </el-table-column>
      <el-table-column
        label="操作"
        width=""
      >
        <template slot-scope="{row}">
          <el-button type="" size="small" @click="editStuBtn(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteStuBtn(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--  分页器
        当前第几页、数据总页数、每一页展示条数
    -->
    <el-pagination style="margin-top: 20px;text-align: center"
                   :current-page="page"
                   :total="parseInt(total)"
                   :page-size="limit"
                   :pager-count="5"
                   :page-sizes="[3,5,10]"
                   @current-change="handleCurrentChange"
                   @size-change="handleSizeChange"
                   layout="prev, pager, next,jumper,->,sizes,total"
    >
    </el-pagination>

    <!--  添加框  -->
    <el-dialog title="学科编创" :visible.sync="dialogFormVisible">
      <el-form style="width:80%" :model="subjectForm" :rules="rules" ref="ruleForm">
        <el-form-item label="学科" :label-width="formLabelWidth" prop="name">
          <el-input  autocomplete="off" v-model="subjectForm.name" ></el-input>
        </el-form-item>

        <el-form-item label="年级" :label-width="formLabelWidth" prop="levelName" >
          <el-select  placeholder="请选择年级" v-model="subjectForm.levelName">
            <el-option v-for="item in levelEnum" :key="item.key" :value="item.value" :label="item.value"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateSubject()" >确 定</el-button>
      </div>
<!--      <vue-tinymce-->
<!--        v-model="content"-->
<!--        :setting="setting"-->
<!--      />-->
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'subjectList',
  mounted() {
    this.getPageList(this.page);
  },
  data(){
    return {

      //分页
      page:1,
      limit:3,
      total:0,

      //查询年级
      select:{
        subjectSearch:'',
      },

      subjectForm:{
        name:'',
        level:1,
        levelName:''
      },

      //添加相应元素
      formLabelWidth: '120px',
      // 添加框隐藏不隐藏
      dialogFormVisible: false,
      //表单验证规则
      rules: {
        name: [
          { required: true, message: '请输入学科名称', trigger: 'blur' },
        ],
        levelName: [
          { required: true,},
        ],
      },
      list:[],
      //文件上传
      fileList:[],

      //富文本编辑器
      // content: '',
      // setting: {
      //   menubar: false,
      //   language: 'zh-Hans', //本地化设置
      //   height: 350,
      //   width: 600,
      // }
    }

  },
  methods:{

    async getPageList(pager){
      let page = pager
      let result = await this.$API.subject.reqGetSubjectPageList(page,this.limit,this.select.subjectSearch)
      if(result.code == 200){
        this.total = result.data.total;
        this.list = result.data.records;
        this.status = result.data.records.status
      }
    },

    //点击查询按钮进行查询
    //若没有进行模糊查询，则为查询全部，显示在第一页
    async selectBtn(){
      // if(this.select.userSearch === ''){
      let result = await this.$API.subject.reqGetSubjectPageList(1,this.limit,this.select.subjectSearch);
      if(result.code == 200){
        this.total = result.data.total;
        this.list = result.data.records;
      }
      // }
    },

    //学科编创
    createBtn(){
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.subjectForm={
          name:'',
          level:'',
          levelName:''
        }
        this.$refs.ruleForm.resetFields()
      })
    },

    //点击编辑按钮
    editStuBtn(row){
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        //将已有的品牌信息赋值给stuForm展示
        this.subjectForm = {...row}
        this.$refs.ruleForm.resetFields()
      })
    },

    //点击删除按钮
    async deleteStuBtn(id){
      this.$confirm(`你确定要删除吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        //当用户点击确定按钮的时候会发出
        //点击确定触发
        let request = await this.$API.subject.deleteSubject(id)
        if(request.code === 200){
          this.$message({
            type: 'success',
            message: request.data
          });
          //再次获取学生列表
          this.getPageList(this.list.length>1?this.page:this.page-1)
        }
      }).catch(() => {
        //点击取消触发
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    handleCurrentChange(pager){
      this.page = pager;
      this.getPageList(this.page);
    },

    //当分页器某一页需要展示数据条数发生变化的时候会触发
    handleSizeChange(limit){
      this.limit = limit;
      this.getPageList(this.page);
    },

    addOrUpdateSubject(){
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          //发请求（添加或者修改）
          let result = await this.$API.subject.reqAddOrUpdateSubject(this.subjectForm);
          if(result.code == 200){
            //弹出信息
            this.$message({
              type:"success",
              message:this.subjectForm.id ? '修改成功' : '添加成功'
            });
            //添加或者修改成功后，继续获取列表
            //如果添加品牌：停在第一页，修改品牌留在当页
            this.getPageList(this.subjectForm.id?this.page:1);
          }
        }else {
          return false;
        }
      });
    },



    //文件上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.$refs.upload.clearFiles();
    },
    handlePreview(file) {
      console.log(file);
      this.$refs.upload.clearFiles();
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      this.$refs.upload.clearFiles();
      },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
      this.$refs.upload.clearFiles();
    },
    onErrorFile(){
      this.$message({type:"info",message:"导入失败！"});
      this.$refs.upload.clearFiles(); //去掉文件列表
    },
    onSuccessFile(response) {
      // 你的代码
      this.$message({type:response.code === 0?'info':'success',message:response.msg});
      this.$refs.upload.clearFiles(); //去掉文件列表
    },

  },
  computed:{
    ...mapState('subject', ['levelEnum','sexEnum','statusEnum','roleEnum','statusTag','statusBtn']),
  }
}
</script>

<style>

</style>
