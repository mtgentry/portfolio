<template lang="pug">
  v-app#app(ref="app" :style="style")
    v-app-bar(fixed app :style="style" flat ref="navbar")
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
    this.$store.commit('changeBackgroundColor', this.backgroundColor)
  },
  updated() {
    this.$AOS.refresh()
  },
  computed: {
    style() {
      let backgroundColor;
      if (this.$route.path === "/") {
        backgroundColor = this.homeBackgroundColor
      } else {
        backgroundColor = this.backgroundColor
      }
      return `background-color: ${backgroundColor}; transition: background-color 1s;`
    },
    ...mapState(['backgroundColor', 'homeBackgroundColor', 'fontColor'])
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

  a
    color: #FFFFFF
    text-decoration: none

header
  &.whiteBG
    color: #282725!important

    a
      color: #282725!important

#footer
  font-size: 18px
  line-height: 24px
  background-color: unset
  display: flex
  align-items: center
  height: 100px
  border-top: #FFFFFF 1px solid

</style>