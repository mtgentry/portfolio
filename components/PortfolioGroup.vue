<!-- Please remove this file from your project -->
<template lang="pug">
  v-col.portfolio-group(:md="project.cover.multiple ? 6 : 12" cols=12
    :style=`{"justify-content": project.cover.position || 'center'}`)
    vue-if-bot(v-if="project.cover.forbidIndex" )
      PortfolioItem.portfolio-item(:project="project" :style="itemStyle"
        :class="{'mobileFullWidth': !project.cover.mobileInherit}")
    PortfolioItem.portfolio-item(:project="project" :style="itemStyle"
        :class="{'mobileFullWidth': !project.cover.mobileInherit}" v-else)

</template>

<script>
import VueIfBot from 'vue-if-bot/dist/vue-if-bot.es'
export default {
  props: ['project'],
  components: {
     VueIfBot
  },
  computed: {
    // cover.offset pulls a left- or right-aligned card in from its edge (e.g. "10%")
    itemStyle() {
      const cover = this.project.cover
      return {
        width: cover.width || '100%',
        marginLeft: cover.position === 'left' ? cover.offset : null,
        marginRight: cover.position === 'right' ? cover.offset : null,
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.portfolio-item

  @media (max-width: 768px)
    img
      max-height: 400px

  &.mobileFullWidth
    @media (max-width: 768px)
      width: 100%!important

  @media (max-width: 768px)
    margin-left: 0!important
    margin-right: 0!important

// vue-if-bot wraps forbidIndex cards in a plain full-width div (it doesn't
// take a class), which made cover.position ignored: those cards always sat on
// the left. Let the card itself be the flex item instead.
.portfolio-group > div:not(.portfolio-item)
  display: contents

.portfolio-group
  // Space between projects: the fluid --space-l step (layouts/default.vue),
  // floored at 72px so phones keep room around the stacked cards. The plain
  // 90px line is the fallback for browsers without CSS variables or max().
  padding-bottom: 90px
  padding-bottom: max(72px, var(--space-l))
  display: flex
  transition: opacity 1s ease-in-out,color 2s ease-in-out!important

    justify-content: end!important




</style>
