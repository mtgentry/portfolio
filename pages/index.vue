<template lang="pug">
  v-row(justify="center" align="center")
    v-col(cols="12")
      Header
      v-row
        PortfolioGroup(v-if="projects !== {}" v-for="project_name in Object.keys(projects)" :project="projects[project_name]" :key="project_name")

</template>

<script>
import Header from '~/components/Header.vue'
import PortfolioGroup from "@/components/PortfolioGroup.vue";
import {mapState} from "vuex";
export default {
  name: 'IndexPage',
  components: {
    Header,
    PortfolioGroup
  },
  transition: 'fade',
  data() {
    return {
      projects: {},
    }
  },
  mounted() {
    this.$store.commit('setBackgroundColor', "#282725")
    setTimeout(() => {
      this.$AOS.refresh()
    }, 1000)
  },
  async fetch() {
    if (this.projectStore) {
      this.projects = this.projectStore
      return
    }
    this.order = await this.$axios.$get('/work/order.json').then((response) => response.order)
    let projects = {}
    //loop order
    for (let i = 0; i < this.order.length; i++) {
      //get project name
      let project_name = this.order[i]
      //get project data
      let project = await this.$axios.$get(`/work/${project_name}/layout.json`).then((response) => response)
      project.name = project_name
      //add project to projects
      projects[project_name] = project
    }
    this.projects = projects
    this.$store.commit('setProjects', projects)
  },
  computed: {
    ...mapState({
      projectStore: state => state.projects
    })
  }
}
</script>

<style lang="sass">
  .fade-enter-active, .fade-leave-active
    transition: opacity 1s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>