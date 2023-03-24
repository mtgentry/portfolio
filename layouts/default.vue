<template lang="pug">
  v-app#app(ref="app" :style="style")
    v-app-bar(fixed app :style="style")
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
export default {
  name: 'DefaultLayout',
  mounted() {
    this.$store.commit('changeBackgroundColor', this.backgroundColor)
  },
  computed: {
    style() {
      if (this.$route.path === '/') {
        return `background-color: ${this.backgroundColor}`
      } else {
        return `background: linear-gradient(to bottom, ${this.backgroundColor}, #FFFFFF) no-repeat top; background-size: 100% 4000px;`
      }
    },
    ...mapState(['backgroundColor',])
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
  box-shadow: unset !important
  padding: 0 46px

#app
  padding: 0 46px
  a
    color: #FFFFFF
    text-decoration: none

#footer
  font-size: 18px
  line-height: 24px
  background-color: unset
  display: flex
  align-items: center
  height: 100px
  border-top: #FFFFFF 1px solid



</style>