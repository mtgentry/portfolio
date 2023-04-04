<template lang="pug">
  v-app#app.display-animation(ref="app" :style=`{backgroundColor: bgColor, color: mainTextColor}` :class="{'loaded': !loading}")
    v-app-bar(fixed app :style=`{backgroundColor: bgColor, color: txColor}` flat ref="navbar")
      nuxt-link(to="/")
        v-toolbar-title M
      v-spacer
    // span.pr-3 Link 1
    // span.pr-3 Link 2
    // span.pr-3 Link 3
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
    setTimeout(() => {
      this.$AOS.refresh()
    }, 1000)
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


#app
  padding: 0 34px
  transition: background-color 1s ease-in-out, opacity 1s ease-in-out, color 2s ease-in-out


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

.theme--dark.v-footer
  color: inherit

.display-animation
  opacity: 0

  &.loaded
    opacity: 1

body
  background-color: #C1C1C1

html, body
  scrollbar-color: #C1C1C1 #F1F1F1
  background: #C1C1C1 //safari settings
</style>
