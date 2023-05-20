<template lang="pug">
  v-app#app.display-animation(ref="app" :style=`{backgroundColor: bgColor, color: mainTextColor}` :class="{'loaded': !loading}")
    v-app-bar(fixed app :style=`{backgroundColor: bgColor, color: txColor}` flat ref="navbar")
      nuxt-link(to="/")
        v-toolbar-title
          img#logo(src="/images/logo.svg" alt="Mason Gentry Logo" height="50px")
      v-spacer
      div(v-if="is_agency")
        span.pr-3
          NuxtLink(to="/unlimited_design") Unlimited Design
        span.pr-3
          NuxtLink(to="/pricing") Pricing
    v-main.pa-0
      v-container(fluid)
        Nuxt
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
  async head() {
    this.$store.commit('setLoading', false)
  },
  computed: {
    is_agency() {
      return process.env.IS_AGENCY
    },
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

#logo
  width: 27px
</style>
