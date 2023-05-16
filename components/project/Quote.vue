<!-- Please remove this file from your project -->
<template lang="pug">
  v-row.quote
    v-col(v-if="quote.text" data-aos="fade-up")
      div.quote
        p.text(v-html="quote.text")
        p.author(v-html="quote.author")
</template>

<script>
export default {
  props: ['quote'],
}
</script>

<style lang="sass" scoped>

.quote
  text-align: center
.text
  font-size: 35px

  &:before
    content: open-quote
    font-size: 45px
    margin-right: 10px

  &:after
    content: close-quote
    font-size: 45px
    margin-left: 10px


.author
  font-size: 18px
  &:before
    content: '\2014'
    margin-right: 10px




</style>
