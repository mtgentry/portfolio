<template lang="pug">
  v-app(dark)
    v-app-bar(fixed app)
      v-toolbar-title M
      v-spacer
      span Link 1
      span Link 2
      span Link 3
    v-main
      v-container#main(fluid)
        Nuxt
    v-footer(:absolute="!fixed" app)
      span &copy; #{new Date().getFullYear()}
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

#main
  padding: 0 46px
</style>