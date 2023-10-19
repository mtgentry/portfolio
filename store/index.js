const STATE_FIELDS = [
  "backgroundColor",
  "textColor",
  "homeBackgroundColor",
  "homeTextColor",
  "projects",
  "loading",
  "project",
  "layout",
  "audits",
  "auditLayout",
  "auditClicked",
  "paddingLayout"
];

export const state = () => ({
  backgroundColor: "#282725",
  textColor: "#ffffff",
  homeBackgroundColor: "#282725",
  homeTextColor: "#ffffff",
  projects: null,
  loading: false,
  project: null,
  layout: null,
  audits: null,
  auditLayout: null,
  auditClicked: 1,
  paddingLayout: true
})

export const mutations = {
  updateState(state, payload) {
    if (STATE_FIELDS.includes(payload.field)) {
      state[payload.field] = payload.value;
    }
  }
}

export const actions = {
  async fetchAuditLayout({ dispatch, commit }) {
    if (this.state.audits && this.state.auditLayout) return
    const auditLayout = await dispatch('getAuditLayout')
    const audits = await dispatch('getAudits', auditLayout.order)

    commit('updateState', { field: 'auditLayout', value: auditLayout })
    commit('updateState', { field: 'audits', value: audits })
  },

  getAuditLayout() {
    return this.$axios.$get('/audits/layout.json')
  },

  async getAudits({ dispatch }, order) {
    const auditRequests = order.map(async auditName => {
      const audit = await this.$axios.$get(`/audits/${auditName}/layout.json`);
      return { name: auditName, ...audit };
    });
    return await Promise.all(auditRequests);
  }
}