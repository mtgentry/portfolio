<!-- Please remove this file from your project -->
<template lang="pug">
  v-footer#footer(absolute app :style=`{borderTopColor: mainTextColor, color: mainTextColor}` v-if="layout")
    span &copy; #{new Date().getFullYear()}
    span.pl-5(v-html="layout.name")
    v-spacer
    a(:href="layout.email") {{ layout.email }}
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'Footer',
  computed: {
    mainTextColor() {
      let color;
      if (this.$route.path.includes('work')) {
        color = "#282725"
      } else {
        color = "#948F8B"
      }
      return color
    },
    ...mapState(['layout'])
  }
}
</script>

<style lang="sass" scoped>
#footer
  font-size: 18px
  line-height: 24px
  background-color: unset
  display: flex
  align-items: center
  height: 100px
  border-top: #948F8B 1px solid
  transition: border-top-color 1s ease-in-out, opacity 1s
</style>
