<!-- Please remove this file from your project -->
<template lang="pug">
  div.text(v-html="text" )
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="sass" scoped>
  .text
    font-size: 50px
    line-height: 66px
    padding-top: 100px
    padding-bottom: 160px
</style>
