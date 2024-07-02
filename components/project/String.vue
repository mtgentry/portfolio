<!-- Please remove this file from your project -->
<template lang="pug">
  v-row#string
    v-col(:class="`text-${align || 'left'}`")
      h1.font-weight-bold(v-if="size === 'h1'" v-html="title")
      h2.font-weight-bold(v-else-if="size === 'h2'" v-html="title")
      h3.font-weight-bold(v-else-if="size === 'h3'" v-html="title")
      h4.font-weight-bold(v-else-if="size === 'h4'" v-html="title")
      h5(v-else-if="size === 'h5'" v-html="title")
      h6.font-weight-bold(v-else-if="size === 'h6'" v-html="title")
      p(v-for="text in texts" v-html="text")

</template>

<script>
export default {
  props: {
    texts: {
      type: Array,
      required: false
    },
    size: {
      type: String,
      default: 'h3'
    },
    title: {
      type: String,
    },
    align: {
      type: String,
      default: 'left'
    }
  },
}
</script>

<style lang="sass" scoped>


h1

h2
  font-size: 35px
  line-height: 120%
  padding-bottom: 5px
h3
  font-weight: 100
  font-size: 27px
  line-height: 100%
  padding-bottom: 20px
  margin-top: 100px
h4
  font-weight: 500
  font-size: 33px !important

h5
  font-family: Resist Sans
  font-size: 30px
  font-style: normal
  font-weight: 200
  line-height: 120%
  text-align: center
  margin-top: 50px
  padding-bottom: 50px





</style>
