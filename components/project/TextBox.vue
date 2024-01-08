<!-- Please remove this file from your project -->
<template lang="pug">
  v-row(v-if="textBox.title")
    v-col
      v-card.textBox(flat)
        v-card-text.pa-0
          p.textBoxTitle(v-html="textBox.title")
          p.textBoxText(v-html="textBox.text")
</template>

<script>
export default {
  props: ['textBox'],
}
</script>

<style lang="sass" scoped>
.textBox
  padding: 50px
  background-color: unset
  border: .5px solid  #83807C
  font-family: 'Resist Sans'

  .textBoxTitle
    color: #ffffff
    font-family: 'Resist Sans'
    font-size: 25px
    font-style: normal
    font-weight: 700
    line-height: 120%

  .textBoxText
    font-family: 'Resist Sans'
    font-size: 20px
    font-style: normal
    font-weight: 100
    line-height: 130%
    color: #ffffff

.col
  padding: 0 0 50px 0 !important
</style>
