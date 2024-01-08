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
  margin-bottom: 27px
 
.text
  font-size: 35px
  font-family: 'Resist Sans'
  font-weight: 100
  margin-bottom: 20px

  &:before
    content: open-quote
    font-size: 45px
    margin-right: 10px
    position: relative
    font-family: 'Resist Sans'

  &:after
    content: close-quote
    font-size: 45px
    margin-left: 10px
    position: relative
    font-family: 'Resist Sans'


.author
  font-size: 22px
  &:before
    content: '\2014'
    margin-right: 10px
    padding-bottom: 100px
    font-family: 'Resist Sans'




</style>
