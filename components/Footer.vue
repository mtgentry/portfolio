<!-- Please remove this file from your project  -->
<template lang="pug">
  v-col.pa-0#footerCol(cols="12")
    v-footer#footer(:style=`{color: mainTextColor}` :class="{ 'agency-footer': isAgency }" v-if="layout")
      //- Copyright and contact on the portfolio site only; the agency site stays minimal
      v-row.pa-0(v-if="!isAgency")
        v-col(cols="12" sm="6")
          span &copy; {{ year }}
          span.pl-5(v-html="layout.name")
        v-col.contact(cols="12" sm="6")
          a(:href="`mailto:${layout.email}`") {{ layout.email }}
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'Footer',
  async mounted() {
    // Visitors who land directly on a project page haven't loaded the site
    // data (homepage.json) yet, and the footer and its contact email depend on it
    if (!this.layout) {
      try {
        const layout = await this.$axios.$get('/homepage.json')
        this.$store.commit('updateState', { field: 'layout', value: layout })
      } catch (e) {
        // Leave the footer hidden if the site data can't be loaded
      }
    }
  },
  computed: {
    year() {
      return new Date().getFullYear()
    },
    mainTextColor() {
      let color;
      if (this.$route.path.includes('work')) {
        // Use pageTextColor from JSON if defined, otherwise default to dark
        color = this.$store.state.pageTextColor || this.$store.state.textColor || "#282725"
      } else {
        color = "#948F8B"
      }
      return color
    },
    isAgency() {
      return process.env.IS_AGENCY
    },
    ...mapState(['layout'])
  }
}
</script>

<style lang="sass" scoped>
#footer
  font-size: 18px
  font-weight: 100  // Resist Sans Light
  line-height: 24px
  width: 100%
  background-color: unset
  display: flex
  align-items: center
  height: 100px
  border-top: #808080 1px solid  // Same grey as the rule above the project summary
  transition: border-top-color 1s ease-in-out, opacity 1s

  @media (max-width: 768px)
    text-align: center!important

  // &.agency-footer
  //   border-top: none

#footer.agency-footer
  border-top: none

#footer a
  font-weight: inherit

.contact
  text-align: right!important
  @media (max-width: 768px)
    text-align: center!important
    padding: 0!important

#footerCol
  height: 100px
  width: 100%
  margin-top: 50px  // Minimum space above footer

@keyframes footerFadeIn
  from
    opacity: 0
  to
    opacity: 1
</style>
