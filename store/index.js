export const state = () => ({
  backgroundColor: "#ffffff",
  textColor: "#ffffff",
  homeBackgroundColor: "#282725",
  homeTextColor: "#ffffff",
  projects: null,
})

export const mutations = {
  setBackgroundColor(state, color) {
    state.backgroundColor = color
  },
  setProjects(state, projects) {
    state.projects = projects
  },
  setTextColor(state, color) {
    state.textColor = color
  }
}
