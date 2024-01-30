<template lang="pug">
  v-row#main(justify="center" align="center" v-if="layout")
    v-col(cols="12")
      Header(:text="layout.header")
    PortfolioGroup(v-if="projects !== {}" v-for="project_name in Object.keys(projects)" :project="projects[project_name]" :key="project_name")
    Footer
</template>

<script>
import Header from '~/components/Header.vue'
import PortfolioGroup from "@/components/PortfolioGroup.vue";
import {mapState} from "vuex";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Header,
    PortfolioGroup,
    Footer
  },
  transition: 'fade',
  fetchOnServer: true,
  head() {
    return {
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: ''
        }
      ]
    }
  },
  data() {
    return {
      projects: {},
    }
  },
  mounted() {
    this.$store.commit('updateState', {field: 'backgroundColor', value: "#282725"})
    setTimeout(() => {
      this.$AOS.refresh()
    }, 1000)
  },
  async fetch() {
    if (this.projectStore) {
      this.projects = this.projectStore
      return
    }
    let layout
    if (!this.$store.state.layout) {
      layout = await this.$axios.$get('/homepage.json').then((response) => response)
      this.$store.commit('updateState', {field: 'layout', value: layout})
    } else {
      layout = this.$store.state.layout
    }
    let projects = {}
    for (let i = 0; i < layout.order.length; i++) {
      let project_name = layout.order[i]
      let project = await this.$axios.$get(`/work/${project_name}/layout.json`).then((response) => response)
      project.name = project_name
      projects[project_name] = project
    }
    this.projects = projects
    this.$store.commit('updateState', {field: 'projects', value: projects})
  },
  computed: {
    ...mapState({
      projectStore: state => state.projects,
      layout: state => state.layout
    })
  }
}
</script>
