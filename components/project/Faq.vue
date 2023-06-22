<!-- Please remove this file from your project -->
<template lang="pug">
  v-row
    v-col.faq-title(cols="12")
    v-col(cols="12")
      v-expansion-panels(v-model="panel" multiple flat)
        v-expansion-panel(v-for="(faq, i) in faqs" :key="i" :title="faq.question" :text="faq.answer" readonly)
          v-expansion-panel-header
            span(v-html="faq.question")
          v-expansion-panel-content
            span(v-html="faq.answer")


</template>

<script>
export default {
  props: ['faqs'],
  data() {
    return {
      panel: Array.from({ length: this.faqs.length }, (value, index) => index)
    }
  }
}
</script>

<style lang="sass">
#faq
  color: #FFFFFF

.faq-title
  font-size: 40px
  line-height: 160%
  color: #FFFFFF

v-expansion-panels
  width: 600px

.v-expansion-panel--active > .v-expansion-panel-header
  min-height: 0

.v-expansion-panel--active:not(:first-child), .v-expansion-panel--active + .v-expansion-panel
  margin-top: 0


.v-expansion-panel
  border-bottom: white 1px solid
  padding: 21px 0 36px 0


  &:first-child
    padding: 0 0 36px 0


.v-expansion-panel-header
  min-height: 0
  padding: 0
  margin-bottom: 10px
  font-weight: 500
  font-size: 25px
  line-height: 33px

.v-expansion-panel-content
  font-weight: 400
  font-size: 18px
  line-height: 24px


.v-expansion-panel-content__wrap
  padding: 0!important

.theme--dark.v-expansion-panels .v-expansion-panel
  background-color: inherit

.v-expansion-panel::before
  box-shadow: unset

.theme--dark.v-expansion-panels .v-expansion-panel:not(:first-child)::after
  border-color: transparent

.v-expansion-panel-header__icon
  display: none
</style>
