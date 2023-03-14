<template>
  <div>
    <el-form  ref="queryForm" :inline="true" :model="select">
      <el-form-item label="年级：">
        <el-select v-model="select.level" placeholder="请选择" @change="levelChange" clearable="">
          <el-option v-for="item in levelEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="学科：" style="margin-right: 400px">
        <el-select v-model="select.subject" placeholder="请选择" clearable="">
          <el-option v-for="item in subjectLevel" :key="item.id" :value="item.id" :label="item.name+'('+item.levelName+')'"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="题型：">
        <el-select v-model="select.questionType" placeholder="请选择" clearable="">
          <el-option v-for="item in question.typeEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="selectBtn()">查询</el-button>
      </el-form-item>

<!--      导入-->
      <el-popover
        placement="bottom"
        width="100"
        trigger="click">
        <el-form-item style="margin-bottom: 0;margin-right: 0">
          <el-button type="success"><a :href='"dev-api/excel/downloadExcel"' >模板下载</a></el-button>
        </el-form-item>
        <el-form-item  style="margin-bottom: 0">
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
            <el-button type="success">模板导入</el-button>
          </el-upload>
        </el-form-item>
        <el-button slot="reference" type="primary">导入</el-button>
      </el-popover>
    </el-form>

    <el-table
      :data="list"
      border
      style="width: 100%;">
      <el-table-column
        prop="subjectId"
        label="学科"
        width="120">
        <template slot-scope="{row}">
          {{formatSubjectLevel(row)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="questionType"
        label="题型"
        width="120"
      >
        <template slot-scope="{row}">
          {{formatType(row.questionType)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="题干"
        width="60"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="score"
        label="分数"
        width="50">
      </el-table-column>
      <el-table-column
        prop="difficult"
        label="难度">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作"
        width="280"
      >
        <template slot-scope="{row}">
          <el-button type="" size="small" >预览</el-button>
          <el-button type="" size="small" @click="editStuBtn(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteStuBtn(row)">删除</el-button>
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
  </div>
</template>

<script>
import {mapState} from "vuex";
import {selectSubjectByLevel} from "@/api/Subject/subject";
import {reqGetSubjectPageList} from "@/api/Question/quesyion";

export default {
  mounted() {
    this.getPageList(this.page)
  },
  name: 'questionList',
  data(){
    return{
      //分页
      page:1,
      limit:3,
      total:0,
      //查询年级
      select:{
        //年级id
        level:'',
        //学科id
        subject:'',
        questionType:'',
      },

      //学科实体类的集合
      subjectLevel:'',
      //table
      list:[],
    }
  },
  methods:{

    //分页查询
    async getPageList(pager){
      let page = pager;
      const query = {
        level:this.select.level,
        subject:this.select.subject,
        questionType:this.select.questionType,
        page:page,
        limit:this.limit,
      }
      const result = await this.$API.question.reqGetSubjectPageList(query)
      if(result.code == 200){
        this.total = result.data.total;
        this.list = result.data.records;

      }
    },

    //查询按钮
    selectBtn(){
      this.getPageList(this.page);
    },

    //编辑题目
    editStuBtn(row) {
      console.log(row)
      let url = this.formatRouter(row.questionType)
      this.$router.push({ path: url, query: { row: row } })
    },

    //删除题目
    deleteStuBtn(){

    },

    //格式化路由地址
    formatRouter(questionType){
      for(let item of this.question.editUrlEnum){
        if(item.key === questionType){
          return item.value
        }
      }
    },
    //格式化题目类型
    formatType(id){
      for(let item of this.question.typeEnum){
        if(item.key === id){
          return item.value
        }
      }
    },

    //格式化学科年级
    formatSubjectLevel(row){
      for(let item of this.levelEnum){
        if(item.key === row.gradeLevel){
          return row.name+'('+item.value+')'

        }
      }
    },

    //根据年级查询学科
    async levelChange(){
      this.select.subject = ''
      if(this.select.level === ''){
        return
      }
      const result = await this.$API.subject.selectSubjectByLevel(this.select.level)
      if(result.code === 200){
        this.subjectLevel = result.data
      }
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
    ...mapState('subject', ['levelEnum','sexEnum','statusEnum','roleEnum','statusTag','statusBtn','question']),
  }
}
</script>

<style>

</style>
