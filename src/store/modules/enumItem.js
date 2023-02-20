const state = {
  levelEnum: [{ key: 1, value: '一年级' }, { key: 2, value: '二年级' }, { key: 3, value: '三年级' }, { key: 4, value: '四年级' }, { key: 5, value: '五年级' }, { key: 6, value: '六年级' },
    { key: 7, value: '初一' }, { key: 8, value: '初二' }, { key: 9, value: '初三' },
    { key: 10, value: '高一' }, { key: 11, value: '高二' }, { key: 12, value: '高三' }],
  sexEnum: [{ key: 0, value: '男' }, { key: 1, value: '女' }],
  // statusEnum: [{ key: 0, value: '启用' }, { key: 1, value: '禁用' }],
  roleEnum: [{ key: 0, value: '管理员' }, { key: 1, value: '学生' }],
  statusTag: [{ key: 0, value: 'success' }, { key: 1, value: 'danger' }],
  statusBtn: [{ key: 0, value: '启用' }, { key: 1, value: '禁用' }],
  examPaper: {
    paperTypeEnum: [{ key: 1, value: '固定试卷' }, { key: 4, value: '时段试卷' }, { key: 6, value: '任务试卷' }]
  },
  question: {
    typeEnum: [{ key: 1, value: '单选题' }, { key: 2, value: '多选题' }, { key: 3, value: '判断题' }, { key: 4, value: '填空题' }, { key: 5, value: '简答题' }],
    editUrlEnum: [{ key: 1, value: '/exam/question/edit/singleChoice', name: '单选题' },
      { key: 2, value: '/exam/question/edit/multipleChoice', name: '多选题' },
      { key: 3, value: '/exam/question/edit/trueFalse', name: '判断题' },
      { key: 4, value: '/exam/question/edit/gapFilling', name: '填空题' },
      { key: 5, value: '/exam/question/edit/shortAnswer', name: '简答题' }]
  }
}

const getters= {

}

const actions = {}

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
