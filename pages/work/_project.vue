<template lang="pug">
  v-row(justify="center" align="center" v-if="project")
    div.project-header-container
      div.project-header(v-html="project.header"
        :style="{color: textColor, maxWidth: '80%', fontWeight: '300'}")
    v-col.project-body(cols="12")
      Section(v-for="(section, index) in project.layout" :section="section" :key="`section-${index}`")
      //- Role, team and results close out the case study, under the closing rule
      ProjectSummary(v-if="project.summary" :summary="project.summary" :style="{color: textColor}")
    Footer

</template>

<script>
import Section from "@/components/project/Section.vue";
import ProjectSummary from "@/components/project/ProjectSummary.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from 'vuex';

export default {
  components: {
    Section,
    ProjectSummary,
    Footer
  },
  fetchOnServer: true,
  transition: 'fade',
  // Each project gets a fresh page instance, so going straight from one
  // project to another doesn't keep showing the previous one's content
  key: to => to.fullPath,
  // Runs on the server for the first load (and before client-side navigation),
  // so the case study is in the rendered HTML for search engines and link previews
  async asyncData({ $axios, params, store, error }) {
    let project = store.state.projects?.[params.project]
    if (!project) {
      project = await $axios.$get(`/work/${params.project}/layout.json`).catch(() => null)
    }
    if (!project) {
      return error({ statusCode: 404, message: 'Project not found' })
    }
    store.commit('updateState', {field: 'backgroundColor', value: project.backgroundColor})
    store.commit('updateState', {field: 'textColor', value: project.textColor})
    store.commit('updateState', {field: 'pageBackgroundColor', value: project.pageBackgroundColor || null})
    store.commit('updateState', {field: 'pageTextColor', value: project.pageTextColor || null})
    store.commit('updateState', {field: 'project', value: project})
    return { project }
  },
  head() {
    return {
      title: this.project?.cover?.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: this.project?.seo_description
        }
      ]
    }
  },
  data() {
    return {
      project: null,
    }
  },
  computed: {
    ...mapState(['textColor']),
  }
}
</script>

<style lang="sass" scoped>
.col
  display: flex
  align-items: center
  flex-direction: column

// How much of the hero media shows at the bottom of the first screen
$hero-peek: 90px

// Fills the first screen minus the peek, with the header centered in it
.project-header-container
  width: 100%
  min-height: calc(100vh - #{$hero-peek})
  min-height: calc(100svh - #{$hero-peek})
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: 80px 0

// Hero media starts right where the header area ends
.project-body
  padding-top: 0

  ::v-deep > .section:first-child
    padding-top: 0

.project-header
  font-size: 40px
  line-height: 130%
  // Avoid a lone word on the last line
  text-wrap: pretty
  margin-bottom: 0

  @media (max-width: 768px)
    font-size: 32px
    line-height: 125%
</style>
