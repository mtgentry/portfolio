<!-- Please remove this file from your project -->
<template lang="pug">
  v-row
    v-col
      h1.font-weight-bold(v-if="size === 'h1'" v-html="title")
      h2.font-weight-bold(v-else-if="size === 'h2'" v-html="title")
      h3.font-weight-bold(v-else-if="size === 'h3'" v-html="title")
      h4.font-weight-bold(v-else-if="size === 'h4'" v-html="title")
      h5.font-weight-bold(v-else-if="size === 'h5'" v-html="title")
      h6.font-weight-bold(v-else-if="size === 'h6'" v-html="title")
      p(v-for="text in texts" v-html="text")

</template>

<script>
export default {
  props: {
    texts: {
      type: Array,
      required: true
    },
    size: {
      type: String,
      default: 'h3'
    },
    title: {
      type: String,

    }
  },
}
</script>

<style lang="sass" scoped>
h1
  font-weight: 500
  font-size: 50px
  line-height: 120%
  padding-bottom: 10px
h2
  font-size: 35px
  line-height: 120%
  padding-bottom: 5px
h3
  font-weight: 500
  font-size: 24px
  line-height: 100%
  padding-bottom: 10px
h4
  font-weight: 500
  font-size: 33px !important

 



</style>
