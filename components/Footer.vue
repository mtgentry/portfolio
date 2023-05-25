<!-- Please remove this file from your project -->
<template lang="pug">
  v-footer#footer(absolute app :style=`{borderTopColor: mainTextColor, color: mainTextColor}`)
    span &copy; #{new Date().getFullYear()}
    span.pl-5(v-html="name")
    v-spacer
    a(:href="email") {{ email }}
</template>

<script>
export default {
  name: 'Footer',
  props: {
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    }
  },
  computed: {
    mainTextColor() {
      let color;
      if (this.$route.path === "/") {
        color = "#FFFFFF"
      } else {
        color = "#282725"
      }
      return color
    }
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
  border-top: #FFFFFF 1px solid
  transition: border-top-color 1s ease-in-out, opacity 1s
</style>
