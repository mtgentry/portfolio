<template lang="pug">
  v-row(justify="center" align="center" v-if="project")
    //- Projects without a problem statement (e.g. motion reels) skip the
    //- full-screen header and start the work just below the nav
    div.project-header-container(v-if="project.header && project.header.trim()")
      div.project-header(v-html="project.header"
        :style="{color: textColor, maxWidth: '80%', fontWeight: '300'}")
    v-col.project-body(cols="12" :class="{ 'no-header': !(project.header && project.header.trim()) }")
      Section(v-for="(section, index) in project.layout" :section="section" :key="`section-${index}`")
      //- Role, team and results close out the case study, under the closing rule
      //- Same row/column structure as the text sections (Section.vue .slim), so
      //- the summary lines up with the copy at every width
      v-row.section.slim.summary-section(v-if="project.summary")
        v-col
          ProjectSummary(:summary="project.summary" :style="{color: textColor}")
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
  async asyncData({ $axios, params, store, error, route }) {
    let project = store.state.projects?.[params.project]
    if (!project) {
      project = await $axios.$get(`/work/${params.project}/layout.json`).catch(() => null)
    }
    if (!project) {
      return error({ statusCode: 404, message: 'Project not found' })
    }
    // The same case study is also served under /portfolio (the visual design
    // portfolio). A project can swap in a different intro and summary there with
    // "portfolio": {"header": "...", "summary": {...}} in its layout.json.
    const visual = route.path.startsWith('/portfolio') && project.portfolio
    if (visual) {
      project = {
        ...project,
        header: visual.header ?? project.header,
        summary: visual.summary ? {...project.summary, ...visual.summary} : project.summary
      }
    }
    store.commit('updateState', {field: 'backgroundColor', value: project.backgroundColor})
    store.commit('updateState', {field: 'textColor', value: project.textColor})
    store.commit('updateState', {field: 'pageBackgroundColor', value: project.pageBackgroundColor || null})
    store.commit('updateState', {field: 'pageTextColor', value: project.pageTextColor || null})
    store.commit('updateState', {field: 'project', value: project})
    return { project }
  },
  head() {
    // Scrolled-state colors, same fallbacks as makeBackgroundWhite in HideNavbar
    const pageBg = this.project?.pageBackgroundColor || '#ffffff'
    const pageText = this.project?.pageTextColor || '#282725'
    return {
      title: this.project?.cover?.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: this.project?.seo_description
        },
        // Keep case studies (client work) out of search results; links and
        // link previews still work. robots.txt must not block /work/ pages, or
        // crawlers never see this tag.
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ],
      // A refresh partway down a case study should open in the scrolled colors,
      // not flash the top-of-page color. The server can't know the scroll
      // position, so the colors ship as variables and this script, which runs
      // before the first paint, checks whether the visitor was scrolled past
      // the switch point (recorded by HideNavbar) when they left.
      style: [
        { hid: 'page-colors', cssText: `:root { --page-bg: ${pageBg}; --page-text: ${pageText}; }` }
      ],
      script: [
        { hid: 'start-scrolled', innerHTML: "try{if(sessionStorage.getItem('scrolledPast')===location.pathname)document.documentElement.classList.add('start-scrolled')}catch(e){}" }
      ],
      __dangerouslyDisableSanitizersByTagID: { 'page-colors': ['cssText'], 'start-scrolled': ['innerHTML'] }
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

  // No header area: clear the fixed nav instead
  &.no-header
    padding-top: 120px

    @media (max-width: 768px)
      padding-top: 90px

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
