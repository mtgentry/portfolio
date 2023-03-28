<template lang="pug">
  v-app#app(ref="app" :style="{backgroundColor: bgColor}")
    v-app-bar(fixed app :style="{backgroundColor: bgColor, color: txColor}" flat ref="navbar")
      nuxt-link(to="/")
        v-toolbar-title M
      v-spacer
      span Link 1
      span Link 2
      span Link 3

    v-main
      v-container(fluid)
        Nuxt
    v-footer#footer(absolute app)
      span &copy; #{new Date().getFullYear()}
      span.pl-5 Mason Gentry
      v-spacer
      a(href="mailto:mgentry@masongentry.com") mgentry@masongentry.com
</template>

<script>
import { mapState } from 'vuex'
import HideNavbar from "@/components/mixins/HideNavbar.vue";
export default {
  name: 'DefaultLayout',
  mixins: [HideNavbar],
  mounted() {
    this.$store.commit('setBackgroundColor', this.backgroundColor)
  },
  updated() {
    // reposition fade effect elements
    this.$AOS.refresh()
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
    ...mapState(['backgroundColor', 'homeBackgroundColor', 'textColor'])
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

  padding: 0 46px



#app
  padding: 0 46px
  transition: background-color 1s ease-in-out

  a
    color: inherit
    text-decoration: none

  header
    transition: background-color 1s ease-in-out

  main
    min-height: 200vh

#footer
  font-size: 18px
  line-height: 24px
  background-color: unset
  display: flex
  align-items: center
  height: 100px
  border-top: #FFFFFF 1px solid

</style>