<!-- Please remove this file from your project  -->
<template lang="pug">
  v-col.pa-0#footerCol(cols="12")
    v-footer#footer(:style=`{borderTopColor: mainTextColor, color: mainTextColor}` v-if="layout")
      v-row.pa-0
        v-col(cols="12" sm="6")
          span &copy; #{new Date().getFullYear()}
          span.pl-5(v-html="layout.name")
        v-col.contact(cols="12" sm="6")
          a(:href="`mailto:${layout.email}`") {{ layout.email }}
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
  width: 100%
  background-color: unset
  display: flex
  align-items: center
  height: 100px
  border-top: #948F8B 1px solid
  transition: border-top-color 1s ease-in-out, opacity 1s

  @media (max-width: 768px)
    text-align: center!important

.contact
  text-align: right!important
  @media (max-width: 768px)
    text-align: center!important
    padding: 0!important

#footerCol
  height: 100px
  width: 100%
</style>
