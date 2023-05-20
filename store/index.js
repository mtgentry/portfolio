export const state = () => ({
  backgroundColor: "#282725",
  textColor: "#ffffff",
  homeBackgroundColor: "#282725",
  homeTextColor: "#ffffff",
  projects: null,
  loading: true,
  project: null,
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
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setProject(state, project) {
    state.project = project
  }
}
