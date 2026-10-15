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
import { SECTIONS, sectionOf } from "@/utils/sections";
export default {
  components: {
    Header,
    PortfolioGroup,
    Footer
  },
  transition: 'fade',
  fetchOnServer: true,
  // Cards link into this grid's section, which on /hello_<name> isn't the URL's
  provide() {
    return { gridSection: () => this.section }
  },
  head() {
    const meta = [
      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ]
    // Only /work is public; the other grids are links Mason sends directly,
    // so keep them out of search
    if (this.section !== 'work') {
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
    // A static build can bake in an empty grid if its data requests failed
    // (e.g. the build server dropped connections). Load the projects here in
    // the browser instead of showing an empty page.
    if (this.$fetchState?.error || !Object.keys(this.projects).length) {
      this.$fetch()
    }
  },
  async fetch() {
    let layout
    if (!this.$store.state.layout) {
      layout = await this.$axios.$get('/homepage.json').then((response) => response)
      this.$store.commit('updateState', {field: 'layout', value: layout})
    } else {
      layout = this.$store.state.layout
    }
    // Every grid (see utils/sections.js) shows the same projects in its own
    // order. The store caches each project's layout by name, shared by all the
    // grids and the case study pages; the order decides which ones this grid shows.
    const order = layout[SECTIONS[this.section].order] || []
    const cache = {...(this.projectStore || {})}
    let projects = {}
    for (let i = 0; i < order.length; i++) {
      let project_name = order[i]
      let project = cache[project_name]
      if (!project) {
        project = await this.getWithRetry(`/work/${project_name}/layout.json`)
        project.name = project_name
        cache[project_name] = project
      }
      projects[project_name] = this.forSection(project)
    }
    this.projects = projects
    this.$store.commit('updateState', {field: 'projects', value: cache})
  },
  methods: {
    // Static generation fetches many pages' data from one local server at
    // once; a dropped connection there used to bake an empty grid into the
    // site. Retry a couple of times before giving up.
    async getWithRetry(url, attempts = 3) {
      for (let i = 1; ; i++) {
        try {
          return await this.$axios.$get(url)
        } catch (e) {
          if (i >= attempts) throw e
          await new Promise(resolve => setTimeout(resolve, 300 * i))
        }
      }
    },
    // A project can give its card in another grid its own tags, size and
    // position with e.g. "portfolio": {"cover": {...}} in its layout.json
    forSection(project) {
      const cover = this.section !== 'work' && project[this.section]?.cover
      return cover ? {...project, cover: {...project.cover, ...cover}} : project
    }
  },
  computed: {
    // Which grid this is (see utils/sections.js)
    section() {
      return sectionOf(this.$route.path)
    },
    headerText() {
      return this.layout?.[SECTIONS[this.section].header] || this.layout?.header
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
