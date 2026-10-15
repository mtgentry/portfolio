<script>
// /hello_<name>: a personal video for one person (static/domains/portfolio/
// hello_there/hellos.json), shown over one of the portfolio grids. The grid is the
// person's "section" (work, portfolio or projects; defaults to work). The
// player itself lives in layouts/default.vue (HelloVideo) so it keeps playing,
// minimized, when they click into a case study.
import Homepage from "@/components/pages/Homepage.vue"
import { SECTIONS } from "@/utils/sections"

export default {
  extends: Homepage,
  async asyncData({ $axios, params, store, error }) {
    if (process.env.IS_AGENCY) {
      return error({ statusCode: 404, message: 'Page not found' })
    }
    const hellos = await $axios.$get('/hello_there/hellos.json').catch(() => ({}))
    const hello = hellos[params.name]
    if (!hello) {
      return error({ statusCode: 404, message: 'Page not found' })
    }
    const entry = { ...hello, slug: params.name }
    store.commit('updateState', { field: 'hello', value: entry })
    // HelloVideo opens it once the portfolio has loaded underneath
    store.commit('updateState', { field: 'helloMode', value: 'pending' })
    return { hello: entry }
  },
  head() {
    return {
      title: `Hi ${this.hello?.name}`,
      // Personal links: keep names out of search results
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
      // Fetch the poster right away, ahead of the grid's videos, so the circle
      // never sits empty waiting for it
      link: this.hello?.poster ? [{ hid: 'hello-poster', rel: 'preload', as: 'image', fetchpriority: 'high',
        href: `/domains/portfolio/hello_there/${this.hello.poster}` }] : []
    }
  },
  data() {
    return {
      hello: null
    }
  },
  computed: {
    // Show this person's grid instead of the one the URL would imply
    section() {
      const section = this.hello?.section
      return SECTIONS[section] ? section : 'work'
    }
  }
}
</script>
