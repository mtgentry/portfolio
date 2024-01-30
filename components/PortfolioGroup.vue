<!-- Please remove this file from your project -->
<template lang="pug">
  v-col.portfolio-group(:md="project.cover.multiple ? 6 : 12" cols=12
    :style=`{"justify-content": project.cover.position || 'center'}`)
    vue-if-bot(v-if="project.cover.forbidIndex" )
      PortfolioItem.portfolio-item(:project="project" :style=`{"width": project.cover.width || '100%'}`
        :class="{'mobileFullWidth': !project.cover.mobileInherit}")
    PortfolioItem.portfolio-item(:project="project" :style=`{"width": project.cover.width || '100%'}`
        :class="{'mobileFullWidth': !project.cover.mobileInherit}" v-else)

</template>

<script>
import VueIfBot from 'vue-if-bot/dist/vue-if-bot.es'
export default {
  props: ['project'],
  components: {
     VueIfBot
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

.portfolio-group
  padding-bottom: 20px
  display: flex
  transition: opacity 1s ease-in-out,color 2s ease-in-out!important

  @media (max-width: 768px)
    padding-bottom: 90px
    justify-content: end!important




</style>
