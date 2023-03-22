<template lang="pug">
  v-app#app(dark)
    v-app-bar(fixed app)
      v-toolbar-title M
      v-spacer
      span Link 1
      span Link 2
      span Link 3
    v-main
      v-container(fluid)
        Nuxt
    v-footer#footer(:absolute="!fixed" app)
      span &copy; #{new Date().getFullYear()}
      span.pl-5 Mason Gentry
      v-spacer
      span mgentry@masongentry.com
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      fixed: false,
      title: 'Vuetify.js'
    }
  }
}
</script>

<style lang="sass">
@font-face
  font-family: 'Resist Sans'
  src: url('/fonts/resist-sans-text-light.otf')
  font-weight: 300

@font-face
  font-family: 'Resist Sans'
  src: url('/fonts/ResistSansText-Medium.ttf')
  font-weight: 600

.v-application
  font-family: 'Resist Sans', sans-serif

.theme--dark.v-app-bar.v-toolbar.v-sheet
  background-color: unset !important
  box-shadow: unset !important

#app
  padding: 0 46px

#footer
  font-size: 18px
  line-height: 24px
  background-color: unset
  display: flex
  align-items: center
  height: 100px
  border-top: #FFFFFF 1px solid
</style>