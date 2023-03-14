<template>
  <div class="app-container">
    <el-form  ref="queryForm" :inline="false" :model="form">
      <el-form-item label="年级：" label-width="">
        <el-select v-model="form.gradeLevel" placeholder="请选择" ref="changeLevel" @change="levelChange" clearable="">
          <el-option v-for="item in levelEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="学科：" >
        <el-select v-model="form.subject" placeholder="请选择" clearable="">
          <el-option v-for="item in subjectLevel" :key="item.id" :value="item.id" :label="item.name+'('+item.levelName+')'"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="题干：" >
        <el-input v-model="form.title" style="width: 900px"/>
      </el-form-item>

      <el-form-item label="选项：" required>
        <el-form-item :label="item.prefix" :key="item.prefix"  v-for="(item,index) in form.items"  label-width="50px" class="question-item-label">
          <el-input v-model="item.content"  class="question-item-content-input" />
          <el-button type="danger" size="medium"  @click="questionItemRemove(index)">删除</el-button>
        </el-form-item>
      </el-form-item>
      <el-form-item label="正确答案：" prop="correct">
        <el-radio-group v-model="form.correct">
          <el-radio  v-for="item in form.items"  :key="item.prefix"  :label="item.prefix">{{item.prefix}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="解析：" prop="analyze">
        <el-input v-model="form.analysis" style="width: 900px"/>
      </el-form-item>
      <el-form-item label="分数：" prop="score">
        <el-select v-model="form.score" placeholder="请选择" clearable="">
          <el-option v-for="item in scoreEnum" :key="item.key" :value="item.key" :label="item.value+'分'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="难度：">
        <el-rate v-model="form.difficult" class="question-item-rate"></el-rate>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="success" @click="addBtn()">添加选项</el-button>
        <el-button type="success" @click="">预览</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'multiple-choice',
  created() {
    this.$nextTick(() => {
      // 在此处执行你要执行的函数
      let row = this.$route.query.row
      if(typeof(row) !== typeof(undefined)){
        this.form.gradeLevel = row.gradeLevel
        this.form.subject = row.subjectId
        this.form.title = row.title
        this.form.analysis = row.analysis
        this.form.score = row.score
        this.form.difficult = row.difficult
        this.form.correct = row.correct
        this.infoTextContentId = row.infoTextContentId
        this.StartlevelChange(this.form.gradeLevel)
      }
    });

  },
  data(){
    return{
      form:{
        //题型
        questionType: 1,
        //年级id
        gradeLevel:'',
        //学科id
        subject:'',
        //题干
        title:'',
        //解析
        analysis:'',
        //选项
        items: [
          { prefix: 'A', content: '' },
          { prefix: 'B', content: '' },
          { prefix: 'C', content: '' },
          { prefix: 'D', content: '' }
        ],
        //分数
        score:'',
        //难度
        difficult:1,
        //正确答案
        correct:'',
      },

      // 文本表id
      infoTextContentId:'',

      //学科实体类的集合
      subjectLevel:'',

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

    //重置按钮
    resetForm () {
      //let lastId = this.form.id
      this.$refs['queryForm'].resetFields()
      this.form = {
        //id: null,
        questionType: 1,
        gradeLevel: null,
        subject: null,
        title: '',
        items: [
          { prefix: 'A', content: '' },
          { prefix: 'B', content: '' },
          { prefix: 'C', content: '' },
          { prefix: 'D', content: '' }
        ],
        analysis: '',
        correct: '',
        score: '',
        difficult: 1
      }
      //this.form.id = lastId
    },

    //删除选项
    questionItemRemove(index){
      this.form.items.splice(index, 1)
    },

    //添加选项
    addBtn(){
      let items = this.form.items
      let newLastPrefix
      if (items.length > 0) {
        let last = items[items.length - 1]
        newLastPrefix = String.fromCharCode(last.prefix.charCodeAt() + 1)
      } else {
        newLastPrefix = 'A'
      }
      items.push({  prefix: newLastPrefix, content: '' })
    },


    //初始化根据年级查询学科
    async StartlevelChange(gradeLevel){
      let _gradeLevel = gradeLevel
      if(_gradeLevel === ''){
        return
      }
      const result = await this.$API.subject.selectSubjectByLevel(_gradeLevel)
      if(result.code === 200){
        this.subjectLevel = result.data
      }
    },

    //根据年级查询学科
    async levelChange(){
      this.form.subject = ''
      if(this.form.gradeLevel === ''){
        this.form.subject = ''
        this.subjectLevel = ''
        return
      }
      const result = await this.$API.subject.selectSubjectByLevel(this.form.gradeLevel)
      if(result.code === 200){
        this.subjectLevel = result.data
      }
    },
  },
  computed:{
    ...mapState('subject', ['levelEnum','sexEnum','statusEnum','roleEnum','statusTag','statusBtn','scoreEnum']),
  }
}
</script>

<style>
.question-item-label {
  margin-top: 10px;
  margin-left: 100px;
}

.question-item-content-input {
  margin-left: 8px;
  width: 60%;
}
</style>
