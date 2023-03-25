export const state = () => ({
  backgroundColor: "#FFFFFF",
  homeBackgroundColor: "#282725",
  projects: null,
})

export const getters = {
  getBackgroundColor(state) {
    return state.backgroundColor
  }
}

export const mutations = {
  changeBackgroundColor(state, color) {
    state.backgroundColor = color
  },
  setProjects(state, projects) {
    state.projects = projects
  }
}
