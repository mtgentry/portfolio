<template lang="pug">
  v-app#app.display-animation(ref="app" :style=`{backgroundColor: bgColor, color: mainTextColor}` :class="{'loaded': !loading}")
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
  data() {
    return {
      navBar: [],
    }
  },
  components: {
    Logo,
  },
  async mounted() {
    this.navBar = await this.$axios.$get('/homepage.json').then((response) => response.navBar) || []
    this.$store.commit('setBackgroundColor', this.backgroundColor)
    setTimeout(() => {
      this.$AOS.refresh()
    }, 1000)
  },
  async head() {
    this.$store.commit('setLoading', false)
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
      if (this.$route.path === "/") {
        backgroundColor = this.homeBackgroundColor
      } else {
        backgroundColor = this.backgroundColor
      }
      return backgroundColor
    },
    txColor() {
      let textColor;
      if (this.$route.path === "/") {
        textColor = this.homeTextColor
      } else {
        textColor = this.textColor
      }
      return textColor
    },
    mainTextColor() {
      let color;
      if (this.$route.path === "/") {
        color = "#FFFFFF"
      } else {
        color = "#282725"
      }
      return color
    },
    getUrls() {
      return this.sortArray(this.$router.getRoutes().map((route) => route.path).filter(
        (path) => path !== '/work/:project?' && this.navBar.includes(path.replace('/', ''))
      ), this.navBar)
    },
    ...mapState(['backgroundColor', 'homeBackgroundColor', 'textColor', 'loading'])
  },

}
</script>

<style lang="sass">
@font-face
  font-family: 'Resist Sans'
  src: url('/fonts/resist-sans-text-regular.ttf')
  font-weight: 300

@font-face
  font-family: 'Resist Sans'
  src: url('/fonts/resist-sans-text-medium.ttf')
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
  font-size: 18px


#app
  padding: 0 34px
  transition: background-color 1s ease-in-out, opacity 1s ease-in-out, color 1s ease-in-out

  @media (max-width: 768px)
    padding: 0 10px

  a
    color: inherit
    text-decoration: none

  header
    transition: background-color 1s ease-in-out

  main
    min-height: 200vh



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
</style>
