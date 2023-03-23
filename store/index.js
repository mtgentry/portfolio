export const state = () => ({
  backgroundColor: "#282725"
})

export const getters = {
  getBackgroundColor(state) {
    return state.backgroundColor
  }
}

export const mutations = {
  changeBackgroundColor(state, color) {
    state.backgroundColor = color
  }
}
