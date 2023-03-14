<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-dialog title="提示" :visible.sync="tipsFlag" width="480px" class="commonDialog multi clickLight" center :close-on-click-modal="false">
      <div class="dialogTipsbox" v-if="tips===1">你还有试题未作答，确认要交卷？</div>
      <div class="dialogTipsbox" v-if="tips===2">
        最多只能切屏{{switchPage.switchPageTimes}}次，你还可切换{{switchPage.remaTimes}}次，
        <br />
        超过{{switchPage.switchPageTimes}}次将强行交卷！
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tipsFlag = false" v-if="tips===1">取 消</el-button>
        <el-button type="primary" @click="onConfirmTip" v-if="tips===1">确 定</el-button>
        <el-button type="primary" @click="onConfirmTip" v-if="tips===2">我知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  name: 'Dashboard',
  mounted() {
    // 监听滚动
    window.addEventListener("scroll", this.handleScroll);
    // 监听浏览器窗口变化
    window.addEventListener("resize", this.getLfetDistance);
    // 监听页面可见性
    window.addEventListener("visibilitychange", this.pageHidden);
    this.$nextTick(function () {
      let body = document.querySelector("body");
      body.style.overflow = "auto";
      this.flexLeft = (body.offsetWidth - 1200) / 2;
    });
  },
  data(){
    return{
      onConfirmTip:'',
      tips:2,
      tipsFlag:2,
      switchPage:{
        switchPageTimes:5,
        remaTimes:3,
      },
      countdownTime:'',
      // getLfetDistance:'',
      isStop:'',

    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods:{
    //切换页面检测
    //isReduce 0扣次数 1不扣次数 router 判断是否为路由转跳
    //事件默认参数
    pageHidden(e = null, isReduce = 0, router = false) {
      return new Promise((resolve, reject) => {
        if (document.visibilityState === "hidden" || router) {
          this.axios({
            method: "post",
            url: "/knowledge/exam/saveSwitchPageCount",
            data: {
              pkExam: this.testData.pkExam,
              pkPaper: this.testData.pkPaper,
              startTime: this.testData.startTime,
              pkCurExam: this.testData.pkCurExam,
              isFirst: isReduce,
              endTime: this.testData.endTime
            }
          }).then(res => {
            let data = res.data;
            if (data.code == "0") {
              this.switchPage = data.data;
              //remaTimes 可切片次数大于0
              if (
                this.switchPage.remaTimes >= 0 &&
                !this.isStop &&
                (this.switchPage.remaTimes != this.switchPage.switchPageTimes ||
                  (this.switchPage.remaTimes != 0 &&
                    this.switchPage.switchPageTimes != 0)) &&
                this.switchPage.switchPageTimes != 1000
              ) {
                this.tipsFlag = true;
                this.tips = 2;
              } else if (this.switchPage.remaTimes < 0 && !this.isStop) {
                this.submitTest();
              }
              resolve();
            } else {
              reject();
            }
          });
        }
      });
    },
    // submitTest() {
    //   this.loading = true;
    //   this.axios({
    //     method: "post",
    //     url: "/knowledge/exam/submitPaper",
    //     data: {
    //       pkExam: this.pkExam,
    //       pkPaper: this.testData.pkPaper,
    //       startTime: this.testData.startTime,
    //       endTime: this.testData.endTime,
    //       pkCurExam: this.testData.pkCurExam
    //     }
    //   }).then(res => {
    //     let data = res.data;
    //     this.loading = false;
    //     if (data.code == "0") {
    //       this.isStop = true;
    //       this.tipsFlag = false;
    //       this.testResult = data.data;
    //       clearInterval(this.countdownTime);
    //     } else {
    //       this.MixerrorMes(data.message);
    //     }
    //   });
    // },
    destroyed() {
      window.removeEventListener("visibilitychange", this.pageHidden);
      window.removeEventListener("scroll", this.handleScroll);
      window.removeEventListener("resize", this.getLfetDistance);
      clearInterval(this.countdownTime); // 计时器
    }
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
