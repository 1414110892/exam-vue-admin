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
          <el-button type="danger" size="small" @click="deleteStuBtn(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--  分页器
        当前第几页、数据总页数、每一页展示条数
    -->
    <el-pagination style="margin-top: 20px;text-align: center"
                   :current-page="page"
                   :total="total"
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

export default {
  name: 'subjectList',
  mounted() {
    this.getPageList();
  },
  data(){
    return {
      //分页
      page:1,
      limit:3,
      total:0,

      //查询年级
      select:{
        subjectSearch:1,
      },

      list:[]
    }
  },
  methods:{

    async getPageList(){
      let result = await this.$API.subject.reqGetSubjectPageList(this.page,this.limit,this.select.subjectSearch)
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

    //点击编辑按钮
    editStuBtn(){

    },
    //点击删除按钮
    deleteStuBtn(){

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

  },
  computed:{
    ...mapState('subject', ['levelEnum','sexEnum','statusEnum','roleEnum','statusTag','statusBtn']),
  }
}
</script>

<style>

</style>
