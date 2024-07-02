<template lang="pug">
  v-app#app.display-animation(ref="app" :style=`{backgroundColor: bgColor, color: mainTextColor}`
    :class="{'loaded': !loading, 'paddingLayout': paddingLayout}")
    v-app-bar(fixed app :style=`{backgroundColor: bgColor, color: txColor}` flat ref="navbar")
      nuxt-link(to="/")
        v-toolbar-title
          Logo(:color="txColor")
      v-spacer
      span.pr-3(v-for="url in getUrls" :key="url")
        NuxtLink(:to="url") {{ formatUrl(url) }}
    v-main.pa-0
      v-container(fluid)
        Nuxt
</template>

<script>
import { mapState } from 'vuex'
import HideNavbar from "@/components/mixins/HideNavbar.vue";
import Logo from "@/components/Logo.vue";
export default {
  name: 'DefaultLayout',
  mixins: [HideNavbar],
  components: {
    Logo,
  },
  async fetch() {
    if (!this.$store.state.layout) {
      let layout = await this.$axios.$get('/homepage.json').then((response) => response)
      this.$store.commit('updateState', {field: 'layout', value: layout})
    }
  },
  async mounted() {
    this.$store.commit('updateState', {field: 'backgroundColor', value: this.backgroundColor})
    setTimeout(() => {
      this.$AOS.refresh()
    }, 1000)
  },
  head() {
    this.$store.commit('updateState', {field: 'loading', value: false})
  },
  methods:{
    formatUrl(s) {
      return s.substring(1).replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase())
    },
    sortArray(array, sortArray) {
      return [...array].sort(
        (a, b) => sortArray.indexOf(a.replace('/', '')) - sortArray.indexOf(b.replace('/', ''))
      )},
  },
  computed: {
    bgColor() {
      let backgroundColor;
      if (this.homePage) {
        backgroundColor = this.homeBackgroundColor
      } else {
        backgroundColor = this.backgroundColor
      }
      return backgroundColor
    },
    txColor() {
      let textColor;
      if (this.homePage) {
        textColor = this.homeTextColor
      } else {
        textColor = this.textColor
      }
      return textColor
    },
    mainTextColor() {
      let color;
      if (this.homePage) {
        color = "#FFFFFF"
      } else {
        color = "#282725"
      }
      return color
    },
    getUrls() {
      if (!this.layout?.navBar) {
        return []
      }
      return this.sortArray(this.$router.getRoutes().map((route) => route.path).filter(
        (path) => path !== '/work/:project?' && this.layout.navBar.includes(path.replace('/', ''))
      ), this.layout.navBar)
    },
    homePage() {
      return this.$route.path === "/" || this.$route.path === "/work"
    },
    ...mapState(['backgroundColor', 'homeBackgroundColor', 'textColor', 'loading', 'layout', 'paddingLayout'])
  },

}
</script>

<style lang="sass">


@font-face
  font-family: 'Resist Sans'
  src: url('/fonts/resist-sans-text-light.ttf')
  font-weight: 100

@font-face
  font-family: 'Resist Sans'
  src: url('/fonts/resist-sans-text-regular.ttf')
  font-weight: 300

@font-face
  font-family: 'Resist Sans'
  src: url('/fonts/resist-sans-text-medium.ttf')
  font-weight: 600

@font-face
  font-family: 'Inter'
  src: url('/fonts/Inter-Regular.ttf')
  font-weight: 300

@font-face
  font-family: 'Inter'
  src: url('/fonts/Inter-Medium.ttf')
  font-weight: 600

@font-face
  font-family: 'Work Sans'
  src: url('/fonts/WorkSans-Regular.ttf')
  font-weight: 300

@font-face
  font-family: 'Work Sans'
  src: url('/fonts/WorkSans-Medium.ttf')
  font-weight: 600

.v-application
  font-family: 'Resist Sans', sans-serif

.theme--dark.v-app-bar.v-toolbar.v-sheet
  padding: 0 34px

  @media (max-width: 768px)
    padding: 0 10px

.v-toolbar__title
  user-select: none

p
  font-family: Resist Sans
  font-size: 20px
  text-align: left
  font-weight: 300
  line-height: 140%
  margin-bottom: 50px


#app
  transition: background-color 1s ease-in-out, opacity 1s ease-in-out, color 1s ease-in-out

  a
    color: inherit
    text-decoration: none

  header
    transition: background-color 1s ease-in-out

  main
    min-height: 100vh

.theme--dark.v-footer
  color: inherit

.display-animation
  opacity: 0

  &.loaded
    opacity: 1

html, body
  scrollbar-color: #C1C1C1 #F1F1F1
  background-color: #282725 //safari settings

.fade-enter-active, .fade-leave-active
  transition: opacity 1s
.fade-enter, .fade-leave-to
  opacity: 0

.paddingLayout
  padding: 0 34px

  @media (max-width: 768px)
    padding: 0 10px
</style>
