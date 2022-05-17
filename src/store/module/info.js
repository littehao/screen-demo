/**
 * 登录信息
 */

const state = {
  currentTheme: 1 // 当前主题
}
const getters = {
  getTheme: state => state.currentTheme, // 获取当前主题
}
const actions = {

}
const mutations = {
  setTheme: (state, theme) => { state.currentTheme = theme }, // 设置主题
}
export default {
  state,
  getters,
  actions,
  mutations
}
