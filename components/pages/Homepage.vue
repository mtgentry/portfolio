<template lang="pug">
  v-row#main(justify="center" align="center" v-if="layout")
    v-col(cols="12")
      Header(:text="headerText")
    PortfolioGroup(v-for="project_name in Object.keys(projects)" :project="projects[project_name]" :key="project_name")
    //- Projects load one by one when arriving from another page; wait for them
    //- so the footer doesn't appear mid-page and then get pushed down
    Footer(v-if="Object.keys(projects).length")
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
    const meta = [
      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ]
    // The /portfolio grid is a link Mason sends directly; keep it out of search
    if (this.section === 'portfolio') {
      meta.push({ hid: 'robots', name: 'robots', content: 'noindex' })
    }
    return { meta }
  },
  data() {
    return {
      projects: {},
    }
  },
  mounted() {
    this.$store.commit('updateState', {field: 'backgroundColor', value: "#F8F7F4"})
    // Check if text animation is playing to determine delay
    const isTextAnimating = sessionStorage.getItem('textAnimationPlaying') === 'true'
    const delay = isTextAnimating ? 1200 : 100

    setTimeout(() => {
      this.$AOS.refresh()
    }, delay)
  },
  async fetch() {
    let layout
    if (!this.$store.state.layout) {
      layout = await this.$axios.$get('/homepage.json').then((response) => response)
      this.$store.commit('updateState', {field: 'layout', value: layout})
    } else {
      layout = this.$store.state.layout
    }
    // /work and /portfolio show the same projects in different orders. The
    // store caches each project's layout by name, shared by both grids and the
    // case study pages; the order decides which ones this grid shows.
    const order = (this.section === 'portfolio' ? layout.portfolioOrder : layout.order) || []
    const cache = {...(this.projectStore || {})}
    let projects = {}
    for (let i = 0; i < order.length; i++) {
      let project_name = order[i]
      let project = cache[project_name]
      if (!project) {
        project = await this.$axios.$get(`/work/${project_name}/layout.json`).then((response) => response)
        project.name = project_name
        cache[project_name] = project
      }
      projects[project_name] = this.forSection(project)
    }
    this.projects = projects
    this.$store.commit('updateState', {field: 'projects', value: cache})
  },
  methods: {
    // A project can give its /portfolio card its own size and position with
    // "portfolio": {"cover": {...}} in its layout.json
    forSection(project) {
      const cover = this.section === 'portfolio' && project.portfolio?.cover
      return cover ? {...project, cover: {...project.cover, ...cover}} : project
    }
  },
  computed: {
    // Which grid this is: the design engineer grid (/work) or the visual
    // design grid (/portfolio)
    section() {
      return this.$route.path.startsWith('/portfolio') ? 'portfolio' : 'work'
    },
    headerText() {
      return (this.section === 'portfolio' && this.layout?.portfolioHeader) || this.layout?.header
    },
    isAgency() {
      return process.env.IS_AGENCY
    },
    ...mapState({
      projectStore: state => state.projects,
      layout: state => state.layout
    })
  }
}
</script>

<style lang="sass" scoped>
.work-page-spacing
  padding-top: 40px
</style>
