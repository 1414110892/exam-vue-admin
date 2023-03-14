<template>
  <div>
    <el-form  ref="queryForm" :inline="true" :model="select" >
      <el-form-item label="用户编号：">
        <el-input v-model="select.userSearch" maxlength="11"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="selectBtn()">查询</el-button>
          <el-button type="primary" @click="addStuBtn">添加</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格组件
          width: 对应的列宽
     -->
    <el-table
      v-loading="formLoading"
      :data="list"
      border
      style="width: 100%;">
<!--      <el-table-column-->
<!--        prop="id"-->
<!--        label="Id"-->
<!--        width="180">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="userNo"
        label="用户编号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="真实姓名"
        width="120"
        >
      </el-table-column>
      <el-table-column
        prop="userLevel"
        label="学籍"
        width="60">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="50">
        <template slot-scope="{row}">
          {{row.sex == 0 ? '男' : '女'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="80">
        <template slot-scope="{row}">
          <el-button :type="row.status===0?'success':'danger'" size="small" plain disabled>{{row.status === 0 ? '启用' : '禁用'}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="280"
       >
        <template slot-scope="{row}">
          <el-button type="" size="small" @click="editStatus(row.id)">{{row.status===0?'禁用':'启用'}}</el-button>
          <el-button type="" size="small" @click="editStuBtn(row)">编辑</el-button>
          <el-button type="" size="small">日志</el-button>
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

<!--  添加框  -->
    <el-dialog :title="stuForm.id?'修改学生':'添加学生'" :visible.sync="dialogFormVisible">
      <el-form style="width:80%" :model="stuForm" :rules="rules" ref="ruleForm">
        <el-form-item label="学号" :label-width="formLabelWidth" prop="userNo">
          <el-input  autocomplete="off" v-model="stuForm.userNo" :disabled="stuForm.id?true:false" maxlength="11"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input  autocomplete="off" v-model="stuForm.password"></el-input>
        </el-form-item>

        <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="userName">
          <el-input  autocomplete="off" v-model="stuForm.userName"></el-input>
        </el-form-item>

        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input  autocomplete="off" v-model="stuForm.age"></el-input>
        </el-form-item>

        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select  placeholder="请选择" v-model="stuForm.sex">
            <el-option v-for="item in sexEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
<!--            <el-option v-for="item in roleOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>-->
          </el-select>
        </el-form-item>

<!--        <el-form-item label="出生日期" :label-width="formLabelWidth">-->
<!--          <div class="block">-->
<!--            <el-date-picker-->
<!--              ref="calendar"-->
<!--              v-model="stuForm.birthDay"-->
<!--              value-format="yyyy-MM-dd" type="date"-->
<!--              placeholder="选择日期时间"-->
<!--              align="right"-->
<!--              :picker-options="pickerOptions">-->
<!--            </el-date-picker>-->
<!--          </div>-->
<!--        </el-form-item>-->

        <el-form-item :label-width="formLabelWidth" label="出生日期">
          <el-date-picker v-model="stuForm.birthDay" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
        </el-form-item>

        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input  autocomplete="off" v-model="stuForm.phone" maxlength="11"></el-input>
        </el-form-item>

        <el-form-item label="年级" :label-width="formLabelWidth" >
          <el-select  placeholder="请选择" v-model="stuForm.userLevel">
            <el-option v-for="item in levelEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select  placeholder="请选择" v-model="stuForm.status">
            <el-option v-for="item in statusBtn" :key="item.key" :value="item.key" :label="item.value"></el-option>
          </el-select>
<!--          <el-input  autocomplete="off" v-model="stuForm.status"></el-input>-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateStudent()" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {reqAddOrUpdateStudent} from "@/api/User/student";
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
    name:'student',
    mounted() {
      // console.log(this.$API)
      //获取列表数据
      this.getPageList();

    },
    data(){
      //自定义校验规则
      var validatePass = (rule, value, callback) => {
        if (value.length < 6 ) {
          callback(new Error('密码长度不能小于六位'));
        } else {
          callback();
        }
      };
      return {
        page:1,
        limit:3,
        total:0,
        list:[],
        status:'',
        //日历
        // pickerOptions: {
        //   shortcuts: [{
        //     text: '今天',
        //     onClick(picker) {
        //       picker.$emit('pick', new Date());
        //     }
        //   }, {
        //     text: '昨天',
        //     onClick(picker) {
        //       const date = new Date();
        //       date.setTime(date.getTime() - 3600 * 1000 * 24);
        //       picker.$emit('pick', date);
        //     }
        //   }, {
        //     text: '一周前',
        //     onClick(picker) {
        //       const date = new Date();
        //       date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
        //       picker.$emit('pick', date);
        //     }
        //   }]
        // },

        //添加相应元素
        formLabelWidth: '120px',
        // 添加框隐藏不隐藏
        dialogFormVisible: false,

        stuForm:{
          userNo:'',
          password:'',
          userName:'',
          age:'',
          sex:'',
          birthDay:null,
          phone:'',
          userLevel:'',
          status:'',
        },

        select:{
          userSearch:'',
        },
        // console.log(isNaN(this.stuForm.userNo))

        //等待
        formLoading:true,
        //表单验证规则
        rules: {
          userNo: [
            { required: true, message: '请输入用户编号', trigger: 'blur' },
            { min: 11, max: 11, message: '长度为11的数字', trigger: 'change' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            { validator: validatePass, trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
        }
      }
    },
    methods:{
      //获取数据
      async getPageList(){

        // const {page,limit,userSearch} = this;
        //获取学生列表的接口
        let result = await this.$API.student.reqStudentList(this.page,this.limit,this.select.userSearch);
          if(result.code == 200){
            this.total = result.data.total;
            this.list = result.data.records;
            this.status = result.data.records.status
            this.formLoading=false
          }
      },

      handleCurrentChange(pager){

        this.page = pager;
        this.getPageList();
      },

      //当分页器某一页需要展示数据条数发生变化的时候会触发
      handleSizeChange(limit){
        this.limit = limit;
        this.getPageList();
      },

      //点击添加按钮
      addStuBtn(){
        //显示对话框
        this.dialogFormVisible = true

        //清除校验规则
        console.log(this.$refs.ruleForm)
        this.$nextTick(() => {
          //清除数据
          this.stuForm={
            userNo:'',
            password:'',
            userName:'',
            age:'',
            sex:'',
            birthDay:'',
            phone:'',
            userLevel:'',
            status:'',}
          this.$refs.ruleForm.resetFields()
        })
      },

      //点击编辑按钮
      editStuBtn(row){
        this.dialogFormVisible = true
        this.$nextTick(() => {
          //将已有的品牌信息赋值给stuForm展示
          this.stuForm = {...row}
          this.$refs.ruleForm.resetFields()
        })

      },

      //添加按钮(添加或者删除)
      addOrUpdateStudent(){

        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            this.dialogFormVisible = false;
            //发请求（添加或者修改）
            let result = await this.$API.student.reqAddOrUpdateStudent(this.stuForm);
            if(result.code == 200){
              //弹出信息
              this.$message({
                type:"success",
                message:this.stuForm.id ? '修改成功' : '添加成功'
              });
              //添加或者修改成功后，继续获取列表
              //如果添加品牌：停在第一页，修改品牌留在当页
              this.getPageList(this.stuForm.id?this.page:1);
            }
          }else {
            return false;
          }
        });

      },

      //删除学生
      deleteStuBtn(row){
          this.$confirm(`你确定删除编号为:${row.userNo}的学生吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            //当用户点击确定按钮的时候会发出
            //点击确定触发
            let request = await this.$API.student.reqDeleteStudent(row.id)
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
      //点击查询按钮进行查询
      //若没有进行模糊查询，则为查询全部，显示在第一页
      async selectBtn(){
        // if(this.select.userSearch === ''){
          let result = await this.$API.student.reqStudentList(1,this.limit,this.select.userSearch);
          if(result.code == 200){
            this.total = parseInt(result.data.total);
            this.list = result.data.records;
          }
        // }
      },
      //禁用按钮
      async editStatus(id){
        console.log("111")
        const request = await this.$API.student.editStatus(id);
        if(request.code === 200){
          this.$message({
            type: 'success',
            message: request.data
          });
          this.getPageList();
        }
      }
    },
    computed:{
      ...mapState('subject', ['levelEnum','sexEnum','statusEnum','roleEnum','statusTag','statusBtn']),
    }
}
</script>

<style>

</style>
