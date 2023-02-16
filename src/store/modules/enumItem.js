const state = {
  levelEnum: [{ key: 1, value: '一年级' }, { key: 2, value: '二年级' }, { key: 3, value: '三年级' }, { key: 4, value: '四年级' }, { key: 5, value: '五年级' }, { key: 6, value: '六年级' },
    { key: 7, value: '初一' }, { key: 8, value: '初二' }, { key: 9, value: '初三' },
    { key: 10, value: '高一' }, { key: 11, value: '高二' }, { key: 12, value: '高三' }],
  sexEnum: [{ key: 0, value: '男' }, { key: 1, value: '女' }],
  statusEnum: [{ key: 1, value: '启用' }, { key: 2, value: '禁用' }],
  roleEnum: [{ key: 1, value: '学生' }, { key: 2, value: '教师' }, { key: 3, value: '管理员' }],
  statusTag: [{ key: 1, value: 'success' }, { key: 2, value: 'danger' }],
  statusBtn: [{ key: 1, value: '禁用' }, { key: 2, value: '启用' }]
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
